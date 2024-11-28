// ==UserScript==
// @name         Jav小司机
// @namespace    wddd
// @version      1.0.0
// @author       wddd
// @license      MIT
// @include      http*://*javlibrary.com/*
// @include      http*://*javlib.com/*
// @description  Jav小司机。简单轻量速度快！
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @homepage     https://github.com/wdwind/JavMiniDriver
// ==/UserScript==

// Credit to
//  * https://greasyfork.org/zh-CN/scripts/25781
//  * https://greasyfork.org/zh-CN/scripts/37122

// Utils

function setCookie(cookieName, cookieValue, expireDays) {
    let expireDate =new Date();
    expireDate.setDate(expireDate.getDate() + expireDays);
    let expires = "expires=" + ((expireDays == null) ? '' : expireDate.toUTCString());
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function parseHTMLText(text) {
    try {
        let doc = document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = text;
        return doc;
    } catch (e) {
        console.error('Parse error');
    }
}

// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
function createElementFromHTML(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function getLoadMoreButton(buttonId, callback) {
    let loadMoreButton = createElementFromHTML('<input type="button" class="largebutton" value="加载更多 &or;">');
    loadMoreButton.addEventListener('click', callback);

    buttonId = (buttonId != null) ? buttonId : 'load_more';
    let loadMoreDiv = createElementFromHTML(`<div id="${buttonId}" class="load_more"></div>`);
    loadMoreDiv.appendChild(loadMoreButton);
    return loadMoreDiv;
}

// For the requests in different domains
// GM_xmlhttpRequest is made from the background page, and as a result, it
// doesn't have cookies in the request header
function gmFetch(obj) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: obj.method || 'GET',
            // timeout in ms
            timeout: obj.timeout,
            url: obj.url,
            headers: obj.headers,
            data: obj.data,
            onload: (result) => {
                if (result.status >= 200 && result.status < 300) {
                    resolve(result);
                } else {
                    reject(result);
                }
            },
            onerror: reject,
            ontimeout: reject,
        });
    });
}

// For the requests in the same domain
// XMLHttpRequest is made within the page, so it will send the cookies
function xhrFetch(obj) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || 'GET', obj.url);
        // timeout in ms
        xhr.timeout = obj.timeout;
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.withCredentials = true;
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr);
            } else {
                reject(xhr);
            }
        };
        xhr.onerror = () => reject(xhr);
        xhr.ontimeout = () => reject(xhr);
        xhr.send(obj.data);
    });
};

// Style

function addStyle() {
    // social media
    GM_addStyle(`
        #toplogo {
            height: 55px;
        }
        .socialmedia {
            display: none !important;
            width: 0% !important;
            height: 0% !important;
        }
        .videothumblist .videos .video {
            height: 290px;
        }
    `);

    // left menu
    if (window.location.href.includes('?v=')) {
        GM_addStyle(`
            #leftmenu {
                display: none;
                width: 0%;
            }
            #rightcolumn {
                margin-left: 10px;
            }
            /*
            #video_title .post-title:hover {
                text-decoration: underline;
                text-decoration-color: #CCCCCC;
            }
            */
            #video_id .text {
                color: red;
            }
            #torrents > table {
                width:100%;
                text-align: center;
                border: 2px solid grey;
            }
            #torrents tr td + td {
                border-left: 2px solid grey;
            }
            #video_favorite_edit {
                margin-bottom: 20px;
            }
            #torrents {
                margin-bottom: 20px;
            }
            #preview {
                margin-bottom: 20px;
            }
            #preview video {
                max-width: 100%;
            }
            #full_screenshot {
                cursor: pointer;
                width: 15%;
            }
            .clickToCopy {
                cursor: pointer;
            }
            .load_more {
                text-align: center;
            }
        `);
    }

    // Homepage
    if (!window.location.href.includes('.php')) {
        GM_addStyle(`
            .videothumblist {
                height: 645px !important;
            }
        `);
    }
}

// Thumbnail

class MiniDriverThumbnail {

    constructor() {
        this.nextPageSelectorId = 'load_next_page';
    }

    execute() {
        this.updateVideoDetails(document);
        this.updateNextPage();
    }

    updateVideoDetails(doc) {
        let videos = doc.querySelectorAll('.videothumblist .videos .video');
        Array.from(videos).forEach(async video => {
            if (video.id.includes('vid_')) {
                let request = {url: `http://www.javlibrary.com/cn/?v=${video.id.substring(4)}`};
                let result = await xhrFetch(request).catch(err => {console.log(err); return;});
                let videoDetailsDoc = parseHTMLText(result.responseText);

                // Video date
                let videoDate = '';
                if (videoDetailsDoc.getElementById('video_date')) {
                    videoDate = videoDetailsDoc.getElementById('video_date').getElementsByClassName('text')[0].innerText;
                }

                // Video score
                let videoScore = '';
                if (videoDetailsDoc.getElementById('video_review')) {
                    let videoScoreStr = videoDetailsDoc.getElementById('video_review').getElementsByClassName('score')[0].innerText;
                    videoScore = videoScoreStr.substring(1, videoScoreStr.length - 1);
                }

                // Video watched
                let videoWatched = '';
                if (videoDetailsDoc.getElementById('watched')) {
                    videoWatched = videoDetailsDoc.getElementById('watched').getElementsByTagName('a')[0].innerText;
                }

                let videoDetailsHtml = `
                    <div>
                        <span>${videoDate}</span>&nbsp;&nbsp;<span style='color:red;'>${videoScore}</span>
                        <br/>
                        <span>${videoWatched} 人看过</span>
                    </div>
                `;
                let videoDetails = createElementFromHTML(videoDetailsHtml);
                video.insertBefore(videoDetails, video.getElementsByClassName('toolbar')[0]);
            }
        });
    }

    async getNextPage(url) {
        // Fetch next page
        let result = await xhrFetch({url: url}).catch(err => {console.log(err); return;});
        let nextPageDoc = parseHTMLText(result.responseText);
        this.updateVideoDetails(nextPageDoc);

        // Update current page
        let videos = document.getElementsByClassName('videos');
        let nextPageVideos = nextPageDoc.getElementsByClassName('videos');
        if (nextPageVideos.length > 0) {
            Array.from(nextPageVideos[0].children).forEach(video => {
                videos[0].appendChild(video);
            });
        }

        let pageSelectorDiv = document.getElementsByClassName('page_selector')[0];
        pageSelectorDiv.innerText = '';

        // Add next page button
        let nextPage = nextPageDoc.getElementsByClassName('page next');
        if (nextPage.length > 0) {
            let nextPageUrl = nextPage[0].href;
            let nextPageButton = getLoadMoreButton(this.nextPageSelectorId, async () => this.getNextPage(nextPageUrl));
            pageSelectorDiv.appendChild(nextPageButton);
        }
    }

    updateNextPage() {
        let nextPage = document.getElementsByClassName('page next');
        if (nextPage.length > 0) {
            let nextPageUrl = nextPage[0].href;
            let nextPageButton = getLoadMoreButton('load_next_page', async () => this.getNextPage(nextPageUrl));

            let pageSelectorDiv = document.getElementsByClassName('page_selector')[0];
            pageSelectorDiv.innerText = '';
            pageSelectorDiv.appendChild(nextPageButton);
        }
    }
}

class MiniDriver {

    constructor() {
        this.javUrl = new URL(window.location.href);
    }

    execute() {
        if (!this.javUrl.pathname.includes('.php')) {
            // Homepage or video page
            this.javVideoId = this.javUrl.searchParams.get('v');

            // Video page
            if (this.javVideoId != null) {
                this.setEditionNumber();
                this.updateTitle();
                this.addScreenshot();
                this.addTorrentLinks();
                this.updateReviews();
                this.updateComments();
                this.getPreview();
            }
        }
    }

    setEditionNumber() {
        let edition = document.getElementById('video_id').getElementsByClassName('text')[0];
        this.editionNumber = edition.innerText;
    }

    async updateTitle() {
        let videoTitle = document.getElementById('video_title');
        let postTitle = videoTitle.getElementsByClassName('post-title')[0];
        postTitle.innerText = postTitle.getElementsByTagName('a')[0].innerText;

        // Add English title
        if (!window.location.href.includes('/en/')) {
            let request = {url: `http://www.javlibrary.com/en/?v=${this.javVideoId}`};
            let result = await xhrFetch(request).catch(err => {console.log(err); return;});
            let videoDetailsDoc = parseHTMLText(result.responseText);
            let englishTitle = videoDetailsDoc.getElementById('video_title')
                .getElementsByClassName('post-title')[0]
                .getElementsByTagName('a')[0].innerText;
            postTitle.innerHTML = `${postTitle.innerText}<br/>${englishTitle}`;
        }
    }

    addScreenshot() {
        let imgUrl = `http://javscreens.com/images/${this.editionNumber}.jpg`;
        let img = createElementFromHTML(`<img src="${imgUrl}" id="full_screenshot" title="">`);
        insertAfter(img, document.getElementById('video_favorite_edit'));

        img.addEventListener('click', function() {
            if (img.style.width != '100%') {
                img.style.width = '100%';
            } else {
                img.style.width = '15%';
                if (document.getElementById('full_screenshot').getBoundingClientRect().y < 0) {
                    location.hash = '#full_screenshot';
                    location.href = '#full_screenshot';
                }
            }
        });
    }

    addTorrentLinks() {
        let sukebei = `https://sukebei.nyaa.si/?f=0&c=0_0&q=${this.editionNumber}`;
        let btsow = `https://btsow.pw/search/${this.editionNumber}`;
        let belibrary = `https://www.btlibrary.info/btlibrary/${this.editionNumber}/1-1-1-1.html`;
        let torrentKitty = `https://www.torrentkitty.tv/search/${this.editionNumber}`;
        let tokyotosho = `https://www.tokyotosho.info/search.php?terms=${this.editionNumber}`;

        let torrentsHTML = `
            <div id="torrents">
                <form id="form-btkitty" method="post" target="_blank" action="http://btkittyba.co/">
                    <input type="hidden" name="keyword" value="${this.editionNumber}">
                    <input type="hidden" name="hidden" value="true">
                </form>
                <form id="form-btdiggs" method="post" target="_blank" action="http://btdiggba.me/">
                    <input type="hidden" name="keyword" value="${this.editionNumber}">
                </form>
                <table>
                    <tr>
                        <td><strong>种子:</strong></td>
                        <td><a href="${sukebei}" target="_blank">sukebei</a></td>
                        <td><a href="${btsow}" target="_blank">btsow</a></td>
                        <td><a href="${belibrary}" target="_blank">belibrary</a></td>
                        <td><a href="${torrentKitty}" target="_blank">torrentKitty</a></td>
                        <td><a href="${tokyotosho}" target="_blank">tokyotosho</a></td>
                        <td><a id="btkitty" href="JavaScript:Void(0);" onclick="document.getElementById('form-btkitty').submit();">btkitty</a></td>
                        <td><a id="btdiggs" href="JavaScript:Void(0);" onclick="document.getElementById('form-btdiggs').submit();">btdiggs</a></td>
                    </tr>
                </table>
            </div>
        `;

        let torrents = createElementFromHTML(torrentsHTML);
        insertAfter(torrents, document.getElementById('video_favorite_edit'));
    }

    updateReviews() {
        // Remove existing reviews
        let videoReviews = document.getElementById('video_reviews');
        Array.from(videoReviews.children).forEach(child => {
            if (child.id.includes('review')) {
                child.parentNode.removeChild(child);
            }
        });

        // Add all reviews
        this.getReviews(1);
    }

    async getReviews(page) {
        // Update current page
        let loadMoreId = 'load_more_reviews';
        let loadMoreDiv = document.getElementById(loadMoreId);
        if (loadMoreDiv != null) {
            loadMoreDiv.parentNode.removeChild(loadMoreDiv);
        }

        // Load more reviews
        let request = {url: `http://www.javlibrary.com/cn/videoreviews.php?v=${this.javVideoId}&mode=2&page=${page}`};
        let result = await xhrFetch(request).catch(err => {console.log(err); return;});
        let reviewsDoc = parseHTMLText(result.responseText);

        let videoReviews = reviewsDoc.getElementById('video_reviews');
        if (videoReviews.getElementsByClassName('t').length == 0 ||
            reviewsDoc.getElementsByClassName('page_selector').length == 0) {
            return;
        }
        // Set review texts
        Array.from(videoReviews.getElementsByClassName('t')).forEach(review => {
            review.getElementsByClassName('text')[0].innerHTML = parseBBCode(escapeHtml(review.getElementsByTagName('textarea')[0].innerText));
        });

        // Append reviews to the page
        let currentVideoReviews = document.getElementById('video_reviews');
        let bottomLine = currentVideoReviews.getElementsByClassName('grey')[0];
        Array.from(videoReviews.children).forEach(element => {
            if (element.tagName == 'TABLE') {
                currentVideoReviews.insertBefore(element, bottomLine);
            }
        });

        // Append load more if there are more reviews
        let nextPage = reviewsDoc.getElementsByClassName('page next');
        if (nextPage.length > 0) {
            let loadMoreReviews = getLoadMoreButton(loadMoreId, async () => this.getReviews(page + 1));
            insertAfter(loadMoreReviews, currentVideoReviews);
        }
    }

    updateComments() {
        // Remove existing comments
        let videoComments = document.getElementById('video_comments');
        Array.from(videoComments.children).forEach(child => {
            if (child.id.includes('comment')) {
                child.parentNode.removeChild(child);
            }
        });

        // Add all comments
        this.getComments(1);
    }

    async getComments(page) {
        // Update current page
        let loadMoreId = 'load_more_comments';
        let loadMoreDiv = document.getElementById(loadMoreId);
        if (loadMoreDiv != null) {
            loadMoreDiv.parentNode.removeChild(loadMoreDiv);
        }

        // Load more comments
        let request = {url: `http://www.javlibrary.com/cn/videocomments.php?v=${this.javVideoId}&mode=2&page=${page}`};
        let result = await xhrFetch(request).catch(err => {console.log(err); return;});
        let commentsDoc = parseHTMLText(result.responseText);

        let videoComments = commentsDoc.getElementById('video_comments');
        if (videoComments.getElementsByClassName('t').length == 0 ||
            commentsDoc.getElementsByClassName('page_selector').length == 0) {
            return;
        }

        // Set comment texts
        Array.from(videoComments.getElementsByClassName('t')).forEach(comment => {
            comment.getElementsByClassName('text')[0].innerHTML = parseBBCode(escapeHtml(comment.getElementsByTagName('textarea')[0].innerText));
        });

        // Append comments to the page
        let currentVideoComments = document.getElementById('video_comments');
        let bottomLine = currentVideoComments.getElementsByClassName('grey')[0];
        Array.from(videoComments.children).forEach(element => {
            if (element.tagName == 'TABLE') {
                currentVideoComments.insertBefore(element, bottomLine);
            }
        });

        // Append load more if there are more comments
        let nextPage = commentsDoc.getElementsByClassName('page next');
        if (nextPage.length > 0) {
            let loadMoreComments = getLoadMoreButton(loadMoreId, async () => this.getComments(page + 1));
            insertAfter(loadMoreComments, currentVideoComments);
        }
    }

    getPreview() {
        let includesEditionNumber = (str) => {
            return str != null
                // && str.includes(this.editionNumber.toLowerCase().split('-')[0])
                && str.includes(this.editionNumber.toLowerCase().split('-')[1]);
        }

        let r18 = async () => {
            let request = {url: `https://www.r18.com/common/search/order=match/searchword='${this.editionNumber}'/`};
            let result = await gmFetch(request).catch(err => {console.log(err); return;});
            let video_tag = parseHTMLText(result.responseText).querySelector('.js-view-sample');
            let src = ['high', 'med', 'low']
                .map(i => video_tag.getAttribute('data-video-' + i))
                .find(i => i);
            return src;
        }

        let dmm = async () => {
            // Find dmm cid
            let bingRequest = {url: `https://www.bing.com/search?q=${this.editionNumber.toLowerCase()}+site%3awww.dmm.co.jp`}
            let bingResult = await gmFetch(bingRequest).catch(err => {console.log(err); return;});
            let bingDoc = parseHTMLText(bingResult.responseText);
            let pattern = /(cid=[\w]+|pid=[\w]+)/g;
            let dmmCid = '';
            for (let match of bingDoc.body.innerHTML.match(pattern)) {
                if (includesEditionNumber(match)) {
                    dmmCid = match.replace(/(cid=|pid=)/, '');
                    break;
                }
            }

            if (dmmCid == '') {
                return;
            }

            let request = {url: `https://www.dmm.co.jp/service/digitalapi/-/html5_player/=/cid=${dmmCid}/mtype=AhRVShI_/service=litevideo/mode=/width=560/height=360/`};
            let result = await gmFetch(request).catch(err => {console.log(err); return;});
            let doc = parseHTMLText(result.responseText);

            // Very hacky... Didn't find a way to parse the HTML with JS.
            for (let script of doc.getElementsByTagName('script')) {
                if (script.innerText != null && script.innerText.includes('.mp4')) {
                    for (let line of script.innerText.split('\n')) {
                        if (line.includes('var params')) {
                            line = line.replace('var params =', '').replace(';', '');
                            let videoSrc = JSON.parse(line).src;
                            if (!videoSrc.startsWith('http')) {
                                videoSrc = 'http:' + videoSrc;
                            }
                            return videoSrc;
                        }
                    }
                }
            }
        }

        let sod = async () => {
            // Adult check
            await gmFetch({url: `https://ec.sod.co.jp/prime/_ontime.php`});

            let request = {url: `https://ec.sod.co.jp/prime/videos/sample.php?id=${this.editionNumber}`};
            let result = await gmFetch(request).catch(err => {console.log(err); return;});
            let doc = parseHTMLText(result.responseText);
            return doc.getElementsByTagName('source')[0].src;
        }

        let jav321 = async () => {
            let request = {
                url: `https://www.jav321.com/search`,
                method: 'POST',
                data: `sn=${this.editionNumber}`,
                headers: {
                    referer: 'https://www.jav321.com/',
                    'content-type': 'application/x-www-form-urlencoded',
                },
            };

            let result = await gmFetch(request).catch(err => {console.log(err); return;});
            let doc = parseHTMLText(result.responseText);
            return doc.getElementsByTagName('source')[0].src;
        }

        let kv = async () => {
            if (this.editionNumber.includes('KV-')) {
                return `http://fskvsample.knights-visual.com/samplemov/${this.editionNumber.toLowerCase()}-samp-st.mp4`;
            }

            return;
        }

        Promise.all(
            [jav321, r18, dmm, sod, kv].map(source => source().catch(err => {console.log(err); return;}))
        ).then(responses => {
            console.log(responses);

            let videoHtml = responses
                .filter(response => response != null
                    && includesEditionNumber(response)
                    && !response.includes('//_sample.mp4'))
                .map(response => `<source src="${response}">`)
                .join('');
            if (videoHtml != '') {
                let previewHtml = `
                    <div id="preview">
                        <video controls>
                            ${videoHtml}
                        </video>
                    </div>
                `;
                insertAfter(createElementFromHTML(previewHtml), document.getElementById('torrents'));
            }
        });
    }
}

// Adult check
setCookie('over18', 18);

// Style change
addStyle();

new MiniDriver().execute();
new MiniDriverThumbnail().execute();