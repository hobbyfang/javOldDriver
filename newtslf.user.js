// ==UserScript==
// @name         测试脚本
// @namespace    https://sleazyfork.org/zh-CN/users/25794
// @version      0.0.2
// @supportURL
// @source
// @description  测试
// @author       Hobby

// @require      https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/lovefield@2.1.12/dist/lovefield.min.js

// @include     http*://*javlibrary.com/*

// @include     http*://*/vl_update*
// @include     http*://*/vl_newrelease*
// @include     http*://*/vl_newentries*
// @include     http*://*/vl_mostwanted*
// @include     http*://*/vl_bestrated*
// @include     http*://*/vl_genre*
// @include     http*://*/vl_star*
// @include     http*://*/?v=jav*
// @include     http*://*/mv_owned*
// @include     http*://*/mv_watched*
// @include     http*://*/mv_wanted*
// @include     http*://*/mv_visited*

// @include     http*://www.*bus*/*
// @include     http*://www.*dmm*/*

// @include     http*://*/movie/*
// @include     http*://*/cn*
// @include     http*://*/tw*
// @include     http*://*/ja*
// @include     http*://*/en*

// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_getResourceURL

// @connect      *
// @copyright    hobby 2019-06-04

// v1.0.0 支持第一版发布。

// ==/UserScript==
/* jshint -W097 */
(function () {
    'use strict';
    var schemaBuilder = lf.schema.create('jav', 1);

    schemaBuilder.createTable('MyMovie').
    //addColumn('id', lf.Type.INTEGER).
    //索引编码 如javlikqu54
    addColumn('index_cd',lf.Type.STRING).
    //识别编码 如CHN-141
    addColumn('code', lf.Type.STRING).
    //缩略图路径
    addColumn('thumbnail_url', lf.Type.STRING).
    //片名
    addColumn('movie_name', lf.Type.STRING).
    //演员
    addColumn('actor', lf.Type.STRING).
    //封面图路径
    addColumn('cover_img_url', lf.Type.STRING).
    //发布日期
    addColumn('release_date', lf.Type.DATE_TIME).
    //评分
    addColumn('score', lf.Type.INTEGER).
    //片长(分钟)
    addColumn('duration', lf.Type.INTEGER).
    //导演
    addColumn('director', lf.Type.STRING).
    //制作商
    addColumn('maker', lf.Type.STRING).
    //发行商
    addColumn('publisher', lf.Type.STRING).
    //加入时间
    addColumn('add_time', lf.Type.DATE_TIME).
    //是否已阅
    addColumn('is_browse', lf.Type.BOOLEAN).
    //是否想要
    addColumn('is_want', lf.Type.BOOLEAN).
    //是否看过
    addColumn('is_seen', lf.Type.BOOLEAN).
    //是否拥有
    addColumn('is_have', lf.Type.BOOLEAN).
    //定义主键
    addPrimaryKey(['index_cd']).
    //定义索引
    addIndex('idxaddtime', ['add_time'], false, lf.Order.DESC);

    let javDb;
    let myMovie;
    schemaBuilder.connect().then(function(database) {
        javDb = database;
        myMovie = database.getSchema().table('MyMovie');
    }).then(function() {
        return javDb.select().from(myMovie).where(myMovie.is_browse.eq(true)).exec();
    }).then(function(results) {
        results.forEach(function(row) {
            console.log(row['code'], 'before', row['add_time']);
        });
    });

    /**
     * 公用类
     * @Class
     */
    var Common = {
        /**
         * html文本转换为Document对象
         * @param {String} text
         * @returns {Document}
         */
        parsetext: function (text) {
            let doc = null;
            try {
                doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = text;
                return doc;
            } catch (e) {
                alert('parse error');
            }
        },
    };

    /**
     * 加载数据
     * @param pageName 访问网页名
     */
    function loadData(pageName) {
        debugger;
    }

    if ($('a[href="myaccount.php"]').length) {
        debugger;
        loadData("mv_wanted");
    }

    // function loadData(pageName) {
    //     debugger;
    //     Common.parsetext("abc");
    // }
    //
    // loadData("mv_wanted");

})();