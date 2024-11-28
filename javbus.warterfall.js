// ==UserScript==
// @name        javbus.waterfall
// @description Infinite scroll @ javbus.com
// @namespace   https://github.com/FlandreDaisuki
// @include     *://*.javbus.*/*
// @version     2019.10.16
// @grant       none
// @license     MIT
// @noframes
// ==/UserScript==

/* global jQuery */

// Configuration
const FETCH_TRIG = '400px';
const COL_CNT = 10;
const IS_DENSE = true;

// Utilities
const $ = jQuery;

const global = {
    pageCount: 0,
    itemCount: 0,
    parent: $('#waterfall'),
    columnParents: Array(COL_CNT).fill().map(() => $('<div class="column">')),
    columnHeights: Array(COL_CNT).fill(0),
    nextURL: location.href,
    locked: false,
    baseURI: location.origin,
    selector: {
        next: 'a#next',
        item: '.item',
    },
};

const addStyle = (styleStr) => {
    $('head').append(`<style>${styleStr}</style>`);
};

const getNextURL = (href) => {
    const a = document.createElement('a');
    a.href = href;
    return `${global.baseURI}${a.pathname}${a.search}`;
};

const fetchURL = async(url) => {
    console.log(`fetchUrl = ${url}`);

    const resp = await fetch(url, { credentials: 'same-origin' });
    const html = await resp.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const $doc = $(doc);

    const href = $doc.find(global.selector.next).attr('href');
    const nextURL = href ? getNextURL(href) : null;
    const elems = $doc.find(global.selector.item);

    return {
        nextURL,
        elems,
    };
};

const intersectionObserverOptions = {
    rootMargin: `0px 0px ${FETCH_TRIG} 0px`,
    threshold: Array(5).fill().map((_, index, arr) => index / arr.length),//[0, 0.2, 0.4, 0.6, 0.8]
};

const intersectionObserver = new IntersectionObserver(async() => {
    if (global.locked) { return; }
    global.locked = true;
    const { nextURL, elems } = await fetchURL(global.nextURL);

    if (global.pageCount === 0) {
        global.parent.empty().append(global.columnParents);
    }

    const items = elems.toArray();
    if (global.pageCount > 0 && location.pathname.includes('/star/')) {
        items.shift();
    }

    for (const item of items) {
        if (IS_DENSE) {
            const idx = global.columnHeights.indexOf(Math.min(...global.columnHeights));
            global.columnParents[idx].append(item);
            global.columnHeights[idx] += item.clientHeight;
        } else {
            global.columnParents[global.itemCount % COL_CNT].append(item);
        }

        global.itemCount += 1;
    }

    // finally
    global.pageCount += 1;
    global.nextURL = nextURL;
    global.locked = false;

    if (!global.nextURL) {
        console.info('The End');
        global.parent.after($('<h1 id="end">The End</h1>'));
        intersectionObserver.disconnect();
        return;
    }
}, intersectionObserverOptions);

intersectionObserver.observe($('footer').get(0));

const SHARED_STYLE = `
#waterfall {
  height: initial !important;
  width: initial !important;
  display: flex;
}
#waterfall .item.item {
  position: relative !important;
  top: initial !important;
  left: initial !important;
  float: none;
}
h1#end {
  text-align: center;
}`;

const GRID_STYLE = `
#waterfall > .column {
  flex: 1;
}
#waterfall .movie-box,
#waterfall .avatar-box {
  width: initial !important;
  display: flex;
}
#waterfall .movie-box .photo-frame {
  overflow: visible;
}`;

const DENSE_STYLE = `
#waterfall {
  justify-content: center;
}
#waterfall > .column {
  display: flex;
  flex-direction: column;
}
#waterfall .item.item {
  position: relative !important;
  top: initial !important;
  left: initial !important;
  float: none;
}`;

addStyle(SHARED_STYLE);
addStyle(IS_DENSE ? DENSE_STYLE : GRID_STYLE);