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
    // 当前网页域名
    let domain = location.host;

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
    addColumn('release_date', lf.Type.STRING).
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
    addColumn('add_time', lf.Type.STRING).
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

    var javDb;
    var myMovie;
    var pm_mater = schemaBuilder.connect({
        storeType: lf.schema.DataStoreType.INDEXED_DB
    }).then(function(database) {
        javDb = database;
        myMovie = database.getSchema().table('MyMovie1');
    }).then(function() {
        javDb.delete().from(myMovie).exec();// 清空MyMovie表数据.
        return javDb.select().from(myMovie).where(myMovie.is_browse.eq(true)).exec();
    }).then(function(results) {
        console.log("已经保存已阅影片数量:"+results.length);
        results.forEach(function(row) {
            console.log(row['index_cd'],'|',row['code'],'|', row['add_time'],'|',row['movie_name']);
        });
    });

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，/';
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423f
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     * @param fmt 日期格式
     * @returns {void | string} 格式化后的日期字符串
     */
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1,                    //月份
            "d+": this.getDate(),                         //日
            "h+": this.getHours(),                        //小时
            "m+": this.getMinutes(),                      //分
            "s+": this.getSeconds(),                      //秒
            "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
            "S": this.getMilliseconds()                   //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

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
     * JSON数组去重
     * @param: [array] json Array
     * @param: [string] 唯一的key名，根据此键名进行去重
     */
    function uniqueArray(array, key, func) {
        var result = [array[0]];
        for (var i = 1; i < array.length; i++) {
            var item = array[i];
            var repeat = false;
            for (var j = 0; j < result.length; j++) {
                if (item[key] == result[j][key]) {
                    func(item, result[j]);
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                result.push(item);
            }
        }
        return result;
    }



    /**
     * 合并json数据
     * @param pageName 访问网页名
     */
    function mergeJson(pageName) {
        // 读取访问指定网页的页数量
        var p = GM_getValue(pageName + "_pageNum");
        if (p > 0) {
            GM_setValue(pageName + "_myBrowseJsonAll", "");
            // 循环合并Json,以同步方式保存.
            let loopMerge = async () => {
                for (let i = 1; i < p; i++) {
                    let tempJson = GM_getValue(pageName + "_myBrowseJson" + i);
                    if (tempJson && tempJson !== "") {
                        await new Promise(resolve => {
                            GM_setValue(pageName + "_myBrowseJsonAll", GM_getValue(pageName + "_myBrowseJsonAll") + tempJson);
                            //console.log(pageName +"_myBrowseJson i:" + i);
                            resolve();
                        })
                    }
                }
            };
            return loopMerge().then(()=>{
                console.log("doNum:" + (GM_getValue("doNum") + 1) + "  --" +pageName);
                GM_setValue("doNum", GM_getValue("doNum") + 1);
            });
        }
    }

    /**
     * 加载数据  todo 改进
     * @param pageName 访问网页名
     */
    function loadData(pageName , queue) {
        Common.toString();// 无此步骤Common作用域失效,暂时未知原因
        let todo = async ()=>{    // todo 190628
            await loadPageNumData(pageName, 1);
            for (let i = 2; i < GM_getValue(pageName + "_pageNum") + 1; i++) {
                queue.push(()=>{
                    let defer = $.Deferred();
                    loadPageNumData(pageName, i).then(() => {
                        defer.resolve();
                    });
                    return defer.promise();
                });
            }
        };
        return todo();
    }

    function request(url) {
        return new Promise(resolve => {
            //let time1 = new Date();
            GM_xmlhttpRequest({
                url,
                method: 'GET',
                headers:  {
                    "Cache-Control": "no-cache"
                },
                timeout: 30000,
                onload: response => { //console.log(url + " reqTime:" + (new Date() - time1));
                    resolve(response);
                },
                onabort: (e) =>{
                    console.log(url + " abort");
                    resolve("wrong");
                },
                onerror: (e) =>{
                    console.log(url + " error");
                    resolve("wrong");
                },
                ontimeout: (e) =>{
                    console.log(url + " timeout");
                    resolve("wrong");
                },
            });
        });
    }

    /**
     * 添加movie信息到myMovie表中
     * @param index_cd 索引编码(网页)
     */
    function addMovie(index_cd) {
        let url = location.origin + "/ja/?v=" + index_cd;
        let commonClass = Common;// 无此步骤Common作用域失效,暂时未知原因
        let promise1 = request(url);
        promise1.then((result) => {
            //debugger;
            if($.type(result) !== "function" && result === "wrong"){
                return Promise.resolve();
            }
            let doc = result.responseText;
            let movie_name = doc.substring(doc.search(/<title>/) + 7, doc.search(/ - JAVLibrary<\/title>/));
            let movie_info = doc.substring(doc.search(/<table id="video_jacket_info">/), doc.search(/<div id="video_favorite_edit" class="">/));
            movie_info = movie_info.replace("src", "hobbysrc");
            let $doc = $(commonClass.parsetext(movie_info));
            let movie = {};
            //console.log($doc); // todo
            movie.index_cd = result.finalUrl.split("v=")[1];
            movie.code = $('.header', $doc)[0].nextElementSibling.textContent;
            movie.release_date = $('#video_date .text', $doc).text();
            movie.duration = $('#video_length .text', $doc).text();
            movie.director = $('#video_director .text', $doc).text();
            movie.maker = $('#video_maker .text', $doc).text();
            movie.score = $('#video_review .text .score', $doc).text();
            movie.actor = $('#video_cast .text', $doc).text();
            movie.cover_img_url = $('#video_jacket_img', $doc).attr("hobbysrc").replace("//", "");
            movie.thumbnail_url = movie.cover_img_url.replace("pl", "ps");
            movie.movie_name = movie_name;
            movie.publisher = $('#video_label .text a', $doc).text();
            movie.add_time = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
            movie.is_browse = true;
            movie.is_want = ($('#subscribed .smalldarkbutton', $doc).length > 0) ? true : false;
            movie.is_seen = ($('#watched .smalldarkbutton', $doc).length > 0) ? true : false;
            movie.is_have = ($('#owned .smalldarkbutton', $doc).length > 0) ? true : false;

            let myBrowseJsonArray = JSON.parse(GM_getValue("myBrowseAllData"));
            let jsonObj = myBrowseJsonArray.filter((p) => {
                return p.index_cd == result.finalUrl.split("v=")[1];
            });
            movie.add_time = jsonObj[0].add_time;
            let row = myMovie.createRow(movie);
            javDb.insertOrReplace().into(myMovie).values([row]).exec();
            return Promise.resolve();
        }).catch((e)=>{
            console.log(e);//debugger;
        });
        return promise1;
    }

    function loadPageNumData(pageName, PageNum) {
        let url = location.origin + "/cn/" + pageName + ".php?&sort=added&page=" + PageNum;// console.log("打开链接url:" + url);
        let commonClass = Common;// 无此步骤Common作用域失效,暂时未知原因
        let promise1 = request(url);
        promise1.then((result) => {
            return new Promise(resolve => {
                if($.type(result) !== "function" && result === "wrong"){
                    return resolve();
                }
                let doc = result.responseText;
                //设置初始化总页数
                if(PageNum == 1){
                    let docArr = doc.split("的影片: ");
                    let totalNum = parseInt(docArr[1].substring(0, docArr[1].search(/<\/div/)));
                    GM_setValue(pageName + "_pageNum", parseInt((totalNum + 19) / 20));
                }
                let tableText = doc.substring(doc.search(/<table class="videotextlist">/), doc.search(/<table style="width: 95%; margin: 10px auto;">/));
                //<table class="videotextlist">  //<table style="width: 95%; margin: 10px auto;">
                let $movList = $(commonClass.parsetext(tableText)).find("tr");
                let indexArrStr = "0";
                let timeArrStr = "0";
                let myBrowseJson = "";
                for (let i = 1; i < $movList.length; i++) {
                    let movie = $movList.get(i);
                    let $aEle = $($(movie).children("td.title").find("a").get(0));
                    // 索引编码
                    let index_cd = $aEle.attr("href").split("=")[1];
                    // 创建时间
                    let add_time = $($(movie).children("td").get(2)).text();
                    indexArrStr = indexArrStr + index_cd + ',';
                    timeArrStr = timeArrStr + add_time + "|";
                    myBrowseJson = myBrowseJson + '{"index_cd":"' + index_cd + '","add_time":"' + add_time + '"},';
                }

                // 保存当前页的json格式数据
                GM_setValue(pageName + "_myBrowseJson" + result.finalUrl.split("page=")[1], myBrowseJson);
                console.log("处理完url:" + location.origin + "/ja/" + pageName + ".php?&sort=added&page=" + PageNum);
                resolve();
            });
        });
        return promise1;
    }

    /**
     * 多线程异步队列 依赖 jQuery 1.8+
     * @n {Number} 正整数, 线程数量
     */
    function Queue (n) {
        n = parseInt(n, 10);
        return new Queue.prototype.init( (n && n > 0) ? n : 1 )
    }

    Queue.prototype = {
        init: function (n) {
            this.threads = [];
            this.taskList = [];
            while (n--) {
                this.threads.push(new this.Thread)
            }
        },

        /**
         * @callback {Fucntion} promise对象done时的回调函数，它的返回值必须是一个promise对象
         */
        push: function (callback) {
            if (typeof callback !== 'function') return;
            var index = this.indexOfIdle();
            if (index != -1) {
                this.threads[index].idle(callback);
                try { console.log('Thread-' + (index+1) + ' accept the task!') } catch (e) {}
            }
            else {
                this.taskList.push(callback);

                for (var i = 0, l = this.threads.length; i < l; i++) {

                    (function(thread, self, id){
                        thread.idle(function(){
                            if (self.taskList.length > 0) {
                                //try { console.log('Thread-' + (id+1) + ' accept the task!') } catch (e) {}
                                let promise = self.taskList.shift()();    // 正确的返回值应该是一个promise对象
                                return promise.promise ? promise : $.Deferred().resolve().promise();
                            } else {
                                return $.Deferred().resolve().promise();
                            }
                        })
                    })(this.threads[i], this, i);

                }
            }
        },
        indexOfIdle: function () {
            var threads = this.threads,
                thread = null,
                index = -1;
            for (var i = 0, l = threads.length; i < l; i++) {
                thread = threads[i];
                if (thread.promise.state() === 'resolved') {
                    index = i;
                    break;
                }
            }
            return index;
        },
        Thread: function () {
            this.promise = $.Deferred().resolve().promise();
            this.idle = function (callback) {
                this.promise = this.promise.then(callback)
            }
        }
    };
    Queue.prototype.init.prototype = Queue.prototype;

    function saveData() {
        GM_setValue("doNum", 0);//console.log("saveData");
        let  pm1 = mergeJson("mv_wanted");
        let  pm2 = mergeJson("mv_watched");
        let  pm3 = mergeJson("mv_owned");

        Promise.all([pm1,pm2,pm3]).then(()=>{
            console.log("mergeJson处理完毕");
            if (GM_getValue("doNum") === 3) {
                let j1 = GM_getValue("mv_wanted_myBrowseJsonAll");
                let j2 = GM_getValue("mv_watched_myBrowseJsonAll");
                let j3 = GM_getValue("mv_owned_myBrowseJsonAll");
                //let myBrowseAll = j3.substring(0, j3.length - 1);
                let myBrowseAll = j1 + j2 + j3.substring(0, j3.length - 1);
                let myBrowseArray = JSON.parse("[" + myBrowseAll + "]");

                myBrowseArray = uniqueArray(myBrowseArray, "index_cd", function (item, resultObj) {
                    if (item["add_time"] < resultObj["add_time"]) {
                        resultObj["add_time"] = item["add_time"];
                    }
                });
                GM_setValue("myBrowseAllData", JSON.stringify(myBrowseArray));
                GM_setValue("myBrowseAllNum", myBrowseArray.length);//console.log(JSON.stringify(myBrowseArray));

                let startTime = new Date();//console.log("startTime: " + startTime);
                let b = GM_getValue(domain + "_stepTwo", false);
                if (!b) {
                    GM_setValue(domain + "_addMovieNum", 0);
                    // 创建请求队列  //浏览器对同一域名进行请求的最大并发连接数:chrome为6
                    let queue2 = new Queue(7);
                    // 循环数组,将请求数据数组全部添加到并发处理队列中,然后并发执行指定数量的多线程.
                    for (let i = 0; i < myBrowseArray.length; i++) {
                        let jsonObj = myBrowseArray[i];
                        queue2.push(function(){
                            let defer = $.Deferred();
                            javDb.select().from(myMovie).where(myMovie.index_cd.eq(jsonObj.index_cd)).exec()
                                .then((results)=>{
                                    let log = ()=>{
                                        console.log(domain + "_addmovieNum:" + (GM_getValue(domain + "_addMovieNum") + 1));
                                        GM_setValue(domain + "_addMovieNum", (GM_getValue(domain + "_addMovieNum") + 1));
                                    };
                                    if (results.length == 0){
                                        return addMovie(jsonObj.index_cd).then(()=>{
                                            log();
                                            defer.resolve();
                                            return Promise.resolve();
                                        });
                                    }
                                    else {
                                        log();
                                        defer.resolve();
                                        return Promise.resolve();
                                    }
                                });
                            return defer.promise();
                        });
                    }
                    var s4 = setInterval(function () {
                        if(GM_getValue(domain + "_addMovieNum",0) == myBrowseArray.length){
                            console.log(domain + "_stepTwoTime:" + (new Date() - startTime));
                            //alert(domain + "_stepTwoTime:" + (new Date() - startTime));
                            //GM_setValue(domain + "_stepTwo", true);  // todo 需使用
                            GM_setValue(domain + "_doDataSyncStepAll", true); // todo 需使用
                            clearInterval(s4);
                        }
                    }, 500);
                }
            }
        });
    }

    if ($('a[href="myaccount.php"]').length) {
        // 已经登录
        // 从未同步过,同步云数据到本地数据库
        let isSync = GM_getValue(domain + "_doDataSyncStepAll", false);
        console.log(domain + "  是否同步过：" + isSync);
        if (!isSync) {
            pm_mater.then(()=>{
                return new Promise( resolve => {
                    var hasStepOne = GM_getValue(domain + "_stepOne", false);
                    let stepOneStartTime = new Date();
                    console.log(domain + "  同步是否完成第一步：" + hasStepOne);
                    if(!hasStepOne){
                        // 立即下载数据
                        GM_setValue("mv_wanted_pageNum", 0);
                        GM_setValue("mv_watched_pageNum", 0);
                        GM_setValue("mv_owned_pageNum", 0);

                        //start02 todo lovefieldDB
                        // 创建请求队列  //浏览器对同一域名进行请求的最大并发连接数:chrome为6
                        let queue = new Queue(7);
                        // 读取想要的影片
                        loadData("mv_wanted",queue);
                        // 读取看过的影片
                        loadData("mv_watched",queue);
                        // 读取拥有的影片
                        loadData("mv_owned",queue);
                        // 延迟1秒运行定时循环函数
                        setTimeout(()=>{
                            // 定时循环函数,当队列执行完成时结束
                            var s4 = setInterval(function () {
                                //console.log("queue.taskList.length : " + queue.taskList.length);
                                if(queue.taskList.length == 0){
                                    let end_num = 0;
                                    for (let i = 0, l = queue.threads.length; i < l; i++){
                                        if (queue.threads[i].promise.state() === 'resolved') {
                                            end_num++;
                                        }
                                    }
                                    if(end_num == queue.threads.length){
                                        GM_setValue(domain + "_stepOne", true);  // todo 需打开
                                        console.log(domain + "_stepOneTime:" + (new Date() - stepOneStartTime));
                                        //alert(location.host + "_stepOneTime:" + (new Date() - stepOneStartTime));
                                        clearInterval(s4);
                                        resolve();
                                    }
                                }
                            }, 300);
                        },1000);
                    }
                    else{
                        resolve();
                    }
                });
            }).then(()=>{
                    saveData();
                }
            );
        }
        // 增加同步数据到本地的触发按钮
    }
})();