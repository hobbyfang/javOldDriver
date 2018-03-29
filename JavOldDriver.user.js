// ==UserScript==
// @name         JAV老司机
// @namespace    https://sleazyfork.org/zh-CN/users/85065
// @version      2.0.14
// @description  JAV老司机神器,支持各Jav老司机站点。拥有高效浏览Jav的页面排版，JAV高清预览大图，JAV列表无限滚动自动加载，合成“挊”的自动获取JAV磁链接，一键自动115离线下载,自动获取JAVLIB的字幕。。。。没时间解释了，快上车！
// @author       Hobby

// @require      https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js
//               http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery.cookie@1.4.1/jquery.cookie.min.js
// @require      https://cdn.jsdelivr.net/npm/persistencejs@0.3.0/lib/persistence.js
// @require      https://cdn.jsdelivr.net/npm/persistencejs@0.3.0/lib/persistence.store.sql.js
// @require      https://cdn.jsdelivr.net/npm/persistencejs@0.3.0/lib/persistence.store.websql.js
// @resource     icon http://geekdream.com/image/115helper_icon_001.jpg

// @include     http*://*javlibrary.com/*
// @include     http*://*javlib.com/*
// @include     http*://*5avlib.com/*
// @include     http*://*look4lib.com/*
// @include     http*://*javlib3.com/*
// @include     http*://*javli6.com/*
// @include     http*://*j8vlib.com/*
// @include     http*://*j9lib.com/*
// @include     http*://*jav11b.com/*
// @include     http*://*ja14b.com/*
// @include     http*://*13vlib.com/*
// @include     http*://*j17v.com/*
// @include     http*://*j18ib.com/*

// @include     https://www.javbus.com/*
// @include     https://www.javbus2.com/*
// @include     https://www.javbus3.com/*
// @include     https://www.javbus5.com/*
// @include     https://www.javbus.me/*
// @include     http*://www.javbus.com/*

// @include     http*://*avmoo.com/*
// @include     http*://*avmo.pw/*
// @include     http*://*avso.pw/*
// @include     http*://*avmo.club/*
// @include     http*://*javtag.com/*
// @include     http*://*javmoo.net/*

// @include     http*://*avsox.com/*
// @include     http*://*avio.pw/*
// @include     http*://*avso.club/*
// @include     http*://*javfee.com/*

// @include     http*://*avmemo.com/*
// @include     http*://*avxo.pw/*

// @include     http://115.com/*

// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_getResourceURL

// @connect      blogjav.net
// @connect      pixhost.to
// @connect      115.com
// @connect      btso.pw
// @connect      btdb.to
// @connect      sukebei.nyaa.si
// @connect      btkitty.pet
// @connect      cnbtkitty.com
// @connect      cnbtkitty.net
// @connect      www.torrentkitty.tv
// @connect      btlibrary.pw
// @connect      ja14b.com
// @connect      www.163sub.com

// @copyright    hobby 2016-12-18

// 大陆用户推荐Chrome(V41+) + Tampermonkey（必须扩展） + ShadowsocksR/XX-Net(代理) + Proxy SwitchyOmega（扩展）的环境下配合使用。
// 上车请使用chrome浏览器，其他浏览器的问题本人不支持发现和修复相关问题。

// 注意:2.0在每个版本号更新后,javlibrary每个不同域名站点在登录javlibrary的情况下，都会分别首次运行此脚本,根据电脑性能情况不同,需消耗约2分钟以上(以1000个车牌量计算)缓存个人数据到本地浏览器中.
// 此目的用于过滤个人已阅览过的内容提供快速判断.目前在同步过程中根据电脑性能不同情况,会有页面消耗CPU资源不同程度的较高占比.
// 当然如果不登录javlibrary或同版本号已经同步过,则无此影响.后续版本更新中将计划优化此性能.

//v2.0.14 修复缩略图域名失效问题。
//v2.0.13 修复已知问题。
//v2.0.12 修复已知问题。
//v2.0.11 更新两个站点域名。
//v2.0.10 修复已知问题。
// v2.0.9 修复已知问题。
// v2.0.8 修复已知问题。
// v2.0.7 增加一种情况Jav列表排序功能支持(仅javlib)。
// v2.0.6 修复已知问题。
// v2.0.5 增加Jav列表“按评分排序”、“按时间排序”功能(仅javlib)，及更新Jav站点域名。
// v2.0.4 2.0版本性能优化。
// v2.0.3 修复已知问题。
// v2.0.2 修复已知问题。
// v2.0.1 修复已知问题,增加amvoo、avsox新域名。
// v2.0.0 增加自动同步个人数据缓存到本地,jav列表能识别个人已阅览过的内容(需登录javlibray),针对javlibrary的高评价栏目,增加过滤"不看我阅览过"功能。

// v1.2.3 更新avmo域名。
// v1.2.2 修复了已知问题。
// v1.2.1 修复了新近产生的问题。
// v1.2.0 针对javlibrary的高评价栏目，增加过滤“只看当前月份”、“只看近两月份”功能。另默认此栏目近两月份的内容增加背景颜色区分。
// v1.2.0 更新了合成“挊”脚本的更多网站的支持，感谢作者thunderhit，同时修复原脚本部分网站功能失效问题。
// v1.1.4 原j12lib.com(大陆)访问失效，改为ja14b.com的支持，还有btdb.in改为btdb.to
// v1.1.3 原avmo.pw访问失效,改增加avio.pw的支持。
// v1.1.2 修复已知问题。
// v1.1.1 修复已知问题。
// v1.1.0 优化更新了JAV列表无限滚动自动加载的代码,增加JAV列表中显示"发行日期"和"评分"的排版,以及修复了已知问题。
// v1.0.3 优化了高清预览大图的获取。
// v1.0.2 优化了javlibrary排版,做了最低分辨率1280x800的排版适配调整，及修复了已知问题。
// v1.0.1 修复已知问题。
// v1.0.0 支持javlibrary.com、javbus.com、avmo.pw、avso.pw等老司机站点，第一版发布。

// ==/UserScript==
/* jshint -W097 */
(function () {
    'use strict';
    let jav_userID = GM_getValue('jav_user_id', 0); //115用户ID
    //icon图标
    let icon = GM_getResourceURL('icon');

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，/';
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
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
    let Common = {
        /**
         * html文本转换为Document对象
         * @param {String} text
         * @returns {Document}
         */
        parsetext: function (text) {
            var doc = null;
            try {
                doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = text;
                return doc;
            }
            catch (e) {
                alert('parse error');
            }
        },

        /**
         * 判断日期是否最近X个月份的日期
         * @param {String} DateStr 日期
         * @param {Number} MonthNum 月数(X)
         * @returns {boolean}
         */
        isLastXMonth: function (DateStr, MonthNum) {
            let now = new Date(); //当前日期
            let compDate = new Date(DateStr);
            let m2 = now.getFullYear() * 12 + now.getMonth();
            let m1 = compDate.getFullYear() * 12 + compDate.getMonth();
            if ((m2 - m1) < MonthNum) {
                return true;
            }
            return false;
        },

        /**
         * 方法: 通用chrome通知
         * @param title
         * @param body
         * @param icon
         * @param click_url
         */
        notifiy: function (title, body, icon, click_url) {
            var notificationDetails = {
                text: body,
                title: title,
                timeout: 10000,
                image: icon,
                onclick: function () {
                    window.open(click_url);
                }
            };
            GM_notification(notificationDetails);
        },
        /**
         * 加入AV预览内容图
         * @param avid av唯一码
         * @param @function func 函数
         */
        addAvImg: function (avid, func) {
            //异步请求搜索blogjav.net的番号
            GM_xmlhttpRequest({
                method: "GET",
                //大图地址
                url: 'http://blogjav.net/?s=' + avid,
                onload: function (result) {
                    //console.log("时间111111:"+ new Date().getTime());
                    var doc = Common.parsetext(result.responseText);
                    //console.log("时间222222:"+ new Date().getTime());
                    let a_array = $(doc).find(".more-link");
                    let a = a_array[0];
                    for (let i = 0; i < a_array.length; i++) {
                        var fhd_idx = a_array[i].innerHTML.search(/FHD/);
                        //debugger;
                        if (fhd_idx > 0) {
                            a = a_array[i];
                            break;
                        }
                    }

                    if (a) {
                        //异步请求调用内页详情的访问地址
                        GM_xmlhttpRequest({
                            method: "GET",
                            //大图地址
                            url: a.href,
                            headers: {
                                referrer: "http://pixhost.to/" //绕过防盗图的关键
                            },
                            onload: function (XMLHttpRequest) {
                                //console.log("时间333333:"+ new Date().getTime());
                                var bodyStr = XMLHttpRequest.responseText;
                                var yixieBody = bodyStr.substring(bodyStr.search(/<span id="more-(\S*)"><\/span>/), bodyStr.search(/<div class="category/));

                                var img_start_idx = yixieBody.search(/"><img .*src="https*:\/\/(\S*)pixhost.to\/thumbs\//);
                                //如果找到内容大图
                                if (img_start_idx > 0) {
                                    var new_img_src = yixieBody.substring(yixieBody.indexOf('src', img_start_idx) + 5, yixieBody.indexOf('alt') - 2);
                                    var targetImgUrl = new_img_src.replace('thumbs', 'images').replace('//t', '//img').replace(/[\?*\"*]/, '');

                                    //如果找到全高清大图优先显示全高清的
                                    console.log("图片地址:" + targetImgUrl);

                                    //创建img元素,加载目标图片地址
                                    //创建新img元素
                                    var $img = $('<img name="javRealImg" title="点击可放大缩小 (图片正常时)"></img>');
                                    $img.attr("src", targetImgUrl);
                                    $img.attr("style", "float: left;cursor: pointer;");

                                    //将新img元素插入指定位置
                                    func($img);
                                    console.log("时间444444:" + new Date().getTime());
                                }
                            },
                            onerror: function (e) {
                                console.log(e);
                            }
                        });//end  GM_xmlhttpRequest
                    }
                },
                onerror: function (e) {
                    console.log(e);
                }
            });//end  GM_xmlhttpRequest
        },
    };

    //定义函数全局变量
    let MyMovie;
    let MyBrowse;
    let MyWant;
    let MySeen;
    let MyHave;

    /**
     * websql数据库类
     * @type {{DBinit: DBinit}
     */
    let JavWebSql = {
        /**
         * 数据库初始化
         * @constructor
         */
        DBinit: function () {

            // 配置
            persistence.store.websql.config(persistence, "MyMovie1021", 'database', 5 * 1024 * 1024);

            // 我的影片
            MyMovie = persistence.define('my_movie', {
                //影片id
                //movie_id: "INTEGER",
                //索引编码 如javlikqu54
                index_cd: "VARCHAR(20)",
                //识别编码 如CHN-141
                code: "VARCHAR(20)",
                //缩略图路径
                thumbnail_url: "VARCHAR(200)",
                //片名
                movie_name: "VARCHAR(300)",
                //演员
                actor: "VARCHAR(50)",
                //封面图路径
                cover_img_url: "VARCHAR(200)",
                //发布日期
                release_date: "DATETIME",
                //评分
                score: "INTEGER",
                //片长(分钟)
                duration: "INTEGER",
                //导演
                director: "VARCHAR(50)",
                //制作商
                maker: "VARCHAR(50)",
                //发行商
                publisher: "VARCHAR(50)",
                //创建时间
                add_time: "DATETIME"
            });

            // 我浏览过(网页)
            MyBrowse = persistence.define('my_browse', {
                //浏览id
                //browse_id: "INTEGER",
                //索引编码
                index_cd: "TEXT",
                //创建时间
                add_time: "DATETIME"
            });

            // 我想要的
            MyWant = persistence.define('my_want', {
                //想要id
                //want_id: "INTEGER",
                //索引编码
                index_cd: "TEXT",
                //创建时间
                add_time: "DATETIME"
            });

            // 我看过影片
            MySeen = persistence.define('my_seen', {
                //看过id
                //seen_id: "INTEGER",
                //索引编码
                index_cd: "TEXT",
                //创建时间
                add_time: "DATETIME"
            });

            // 我已拥有
            MyHave = persistence.define('my_have', {
                //拥有id
                //have_id: "INTEGER",
                //索引编码
                index_cd: "TEXT",
                //创建时间
                add_time: "DATETIME"
            });

            MyMovie.index(['index_cd', 'code'], {unique: true});
            MyBrowse.index(['index_cd'], {unique: true});
            MyWant.index(['index_cd'], {unique: true});
            MySeen.index(['index_cd'], {unique: true});
            MyHave.index(['index_cd'], {unique: true});
            //MyBrowse.hasOne('movie',MyMovie,'myBrowse');

            persistence.schemaSync();
        },
    };

    let main = {
        //av信息查询 类
        jav: {
            type: 0,
            re: /(avio|avmo|avso|avxo|javtag|javfee|javmoo).*movie.*/,
            vid: function () {
                return $('.header_hobby')[0].nextElementSibling.innerHTML;
            },
            proc: function () {
                //insert_after('#movie-share');
                var divE = $("div[class='col-md-3 info']")[0];
                $(divE).after(main.cur_tab);
                //$(main.cur_tab).before($('#movie-share')[0]);
            }
        },
        javbus: {
            type: 0,
            re: /javbus/,
            vid: function () {
                var a = $('.header_hobby')[0].nextElementSibling;
                return a ? a.textContent : '';
            },
            proc: function () {
                var divE = $("div[class='col-md-3 info']")[0];
                //var p = document.createElement('p');
                //p.className = 'hobby';
                //divE.parentElement.appendChild(p);
                $(divE).after(main.cur_tab);
            }
        },
        javlibrary: {
            type: 0,
            re: /(javlibrary|javlib3|look4lib|5avlib|javli6|j8vlib|j9lib|jav11b|ja14b|13vlib|j17v|j18ib).*\?v=.*/,
            vid: function () {
                return $('#video_id')[0].getElementsByClassName('text')[0].innerHTML;
            },
            proc: function () {
                //insert_after('#video_info');
                //<td style="vertical-align: top;">
                //去十八岁警告
                setCookie("over18", 18);
                $('.socialmedia').remove();
                GM_addStyle([
                    '#video_info{text-align: left;font: 14px Arial;min-width: 230px;max-width: 230px;padding: 0px 0px 0px 0px;}',
                    '#video_jacket_info {width: 100%;overflow: hidden;}',//table-layout: fixed;
                    '#coverimg {vertical-align: top;overflow: hidden;max-width: 50%;}',
                    '#javtext {vertical-align: top;width: 230px;}',
                    '#video_info td.header {width: 75px;}',
                    '#video_info td.icon {width: 0px;}',
                    '#content {padding-top: 0px;}',
                ].join(''));

                var tdE = $("td[style='vertical-align: top;']")[0];
                tdE.id = "coverimg";
                $("td[style='vertical-align: top;']")[1].id = 'javtext';
                $('#leftmenu').remove();
                $('#rightcolumn').attr("style", "margin: 0px 0px 0px 0px;width: 100%;padding: initial;");
                $(tdE.parentElement).append('<td id="hobby" style="vertical-align: top;width: 100%;"></td>');
                $('#hobby').append(main.cur_tab);
            }
        },
    };

    // 挊
    let main_keys = Object.keys(main); //下面的不要出现
    main.cur_tab = null;
    main.cur_vid = '';

    // 瀑布流脚本使用类
    class Lock {
        constructor(d = false) {
            this.locked = d;
        }

        lock() {
            this.locked = true;
        }

        unlock() {
            this.locked = false;
        }
    }

    // 第三方脚本调用
    var thirdparty = {
        // 挊
        nong: {
            offline_sites: {
                115: {
                    name: '115离线',
                    url: 'http://115.com/?tab=offline&mode=wangpan',
                    enable: true,
                },
            },
            // 挊
            search_engines: {
                switch_engine: function (i) {
                    // var index = GM_getValue("search_index",0);
                    GM_setValue('search_index', i);
                    return i;
                },
                cur_engine: function (kw, cb) {
                    var z = this[GM_getValue('search_index', 0)];
                    if (!z) {
                        alert("search engine not found");
                    }
                    return z(kw, cb);
                },
                parse_error: function (a) {
                    alert("调用搜索引擎错误，可能需要更新，请向作者反馈。i=" + a);
                },
                full_url: '',
                0: function (kw, cb) {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'https://btso.pw/search/' + kw,
                        onload: function (result) {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            var doc = Common.parsetext(result.responseText);
                            if (!doc) {
                                thirdparty.nong.search_engines.parse_error(GM_getValue('search_index'));
                            }
                            var data = [];
                            var t = doc.getElementsByClassName('data-list')[0];
                            if (t) {
                                var a = t.getElementsByTagName('a');
                                for (var i = 0; i < a.length; i++) {
                                    if (!a[i].className.match('btn')) {
                                        data.push({
                                            'title': a[i].title,
                                            'maglink': 'magnet:?xt=urn:btih:' + a[i].outerHTML.replace(/.*hash\//, '').replace(/" .*\n.*\n.*\n.*/, ''),
                                            'size': a[i].nextElementSibling.textContent,
                                            'src': a[i].href,
                                        });
                                    }
                                }
                            }
                            cb(result.finalUrl, data);
                        },
                        onerror: function (e) {
                            console.log(e);
                        }
                    });
                },
                1: function (kw, cb) {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://btdb.to/q/' + kw + '/',
                        onload: function (result) {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            var doc = Common.parsetext(result.responseText);
                            if (!doc) {
                                thirdparty.nong.search_engines.parse_error(GM_getValue('search_index'));
                            }
                            var data = [];
                            var elems = doc.getElementsByClassName('item-title');
                            for (var i = 0; i < elems.length; i++) {
                                data.push({
                                    'title': elems[i].firstChild.title,
                                    'maglink': elems[i].nextElementSibling.firstElementChild.href,
                                    'size': elems[i].nextElementSibling.children[1].textContent,
                                    'src': 'https://btdb.to' + elems[i].firstChild.getAttribute('href'),
                                });
                            }
                            console.log(data);
                            cb(result.finalUrl, data);
                        },
                        onerror: function (e) {
                            console.log(e);
                        }
                    });
                },
                2: function (kw, cb) {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "https://sukebei.nyaa.si/?f=0&c=0_0&q=" + kw,
                        onload: function (result) {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            let doc = Common.parsetext(result.responseText);
                            if (!doc) {
                                thirdparty.nong.search_engines.parse_error(GM_getValue('search_index'));
                            }
                            let data = [];
                            let t = doc.querySelectorAll("tr.default,tr.success");
                            if (t.length !== 0) {
                                for (let elem of t) {
                                    //debugger;
                                    data.push({
                                        "title": elem.querySelector("td:nth-child(2)>a:nth-child(1)").title,
                                        "maglink": elem.querySelector("td:nth-child(3)>a:nth-last-child(1)").href,
                                        //"torrent_url": "https://nyaa.si" + elem.querySelector("td:nth-child(3)>a:nth-child(1)").href,
                                        "size": elem.querySelector("td:nth-child(4)").textContent,
                                        "src": "https://sukebei.nyaa.si" + elem.querySelector("td:nth-child(2)>a:nth-child(1)").getAttribute('href'),
                                    });
                                }
                            }
                            else {
                                data.push({
                                    "title": "没有找到磁链接",
                                    "maglink": "",
                                    //"torrent_url": "",
                                    "size": "0",
                                    "src": result.finalUrl,
                                });
                            }

                            cb(result.finalUrl, data);
                        },
                        onerror: function (e) {
                            console.error(e);
                            throw "search error";
                        }
                    });
                },
                3: function (kw, cb) {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "https://cnbtkitty.net/",
                        data: "keyword=" + kw + "&hidden=true",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        onload: function (result) {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            let doc = Common.parsetext(result.responseText);
                            let data = [];
                            let t = doc.getElementsByClassName("list-con");
                            if (t) {
                                for (let elem of t) {
                                    data.push({
                                        "title": elem.querySelector("dt a").textContent,
                                        "maglink": elem.querySelector("dd a").href,
                                        "size": elem.querySelector(".option span:nth-child(3) b").textContent,
                                        "src": elem.querySelector("dt a").href,
                                    });
                                }
                            }
                            else {
                                data.push({
                                    "title": "没有找到磁链接",
                                    "maglink": "",
                                    "size": "0",
                                    "src": result.finalUrl,
                                });
                            }
                            cb(result.finalUrl, data);
                        },
                        onerror: function (e) {
                            console.error(e);
                            throw "search error";
                        }
                    });
                },
                4: function (kw, cb) {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "https://www.torrentkitty.tv/search/" + kw,
                        onload: function (result) {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            let doc = Common.parsetext(result.responseText);
                            let data = [];
                            let t = doc.querySelectorAll("#archiveResult tr");
                            if (t) {
                                t = Array.slice(t, 1, t.length);
                                for (let elem of t) {
                                    data.push({
                                        "title": elem.querySelector(".name").textContent,
                                        "maglink": elem.querySelector(".action>a:nth-child(2)").href,
                                        "size": elem.querySelector(".size").textContent,
                                        "src": "https://www.torrentkitty.tv" + elem.querySelector(".action>a:nth-child(1)").getAttribute('href'),
                                    });
                                }
                            }
                            else {
                                data.push({
                                    "title": "没有找到磁链接",
                                    "maglink": "",
                                    "size": "0",
                                    "src": result.finalUrl,
                                });
                            }
                            cb(result.finalUrl, data);
                        },
                        onerror: function (e) {
                            console.error(e);
                            throw "search error";
                        }
                    });
                },
                5: function (kw, cb) {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://btlibrary.pw",
                        data: "keyword=" + kw,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        onload: function (result) {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            let doc = Common.parsetext(result.responseText);
                            let data = [];
                            let t = doc.querySelectorAll(".item");
                            if (t) {
                                for (let elem of t) {
                                    data.push({
                                        "title": elem.querySelector(".item-title>a").textContent,
                                        "maglink": elem.querySelector(".item-detail>span:nth-child(1)>a").href,
                                        "size": elem.querySelector(".item-detail>span:nth-child(3)>b").textContent,
                                        "src": elem.querySelector(".item-title>a").href,
                                    });
                                }
                            }
                            else {
                                data.push({
                                    "title": "没有找到磁链接",
                                    "maglink": "",
                                    "size": "0",
                                    "src": result.finalUrl,
                                });
                            }
                            cb(result.finalUrl, data);
                        },
                        onerror: function (e) {
                            console.error(e);
                            throw "search error";
                        }
                    });
                },
            },
            // 挊
            magnet_table: {
                template: {
                    create_head: function () {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        a.id = 'jav-nong-head';
                        var list = [
                            '标题',
                            '大小',
                            '操作',
                            '离线下载'
                        ];
                        for (var i = 0; i < list.length; i++) {
                            var b = this.head.cloneNode(true);
                            if (i === 0) {
                                var select = document.createElement("select");
                                var ops = ["btso", "btdb", "nyaa.si", "btkitty", "torrentkitty", "btlibrary"];
                                var cur_index = GM_getValue("search_index", 0);
                                for (var j = 0; j < ops.length; j++) {
                                    var op = document.createElement("option");
                                    op.value = j.toString();
                                    op.textContent = ops[j];
                                    if (cur_index == j) {
                                        op.setAttribute("selected", "selected");
                                    }
                                    select.appendChild(op);
                                }
                                b.removeChild(b.firstChild);
                                b.appendChild(select);
                                a.appendChild(b);
                                continue;
                            }
                            b.firstChild.textContent = list[i];
                            a.appendChild(b);
                        }
                        // var select_box = this.create_select_box();
                        // a.firstChild.appendChild(select_box);

                        return a;
                    },
                    create_row: function (data) {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        a.setAttribute('maglink', data.maglink);
                        var b = document.createElement('td');
                        var list = [
                            this.create_info(data.title, data.maglink),
                            this.create_size(data.size, data.src),
                            this.create_operation(data.maglink),
                            this.create_offline()
                        ];
                        for (var i = 0; i < list.length; i++) {
                            var c = b.cloneNode(true);
                            c.appendChild(list[i]);
                            a.appendChild(c);
                        }
                        return a;
                    },
                    create_loading: function () {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        var p = document.createElement('p');
                        p.textContent = 'Loading';
                        p.id = 'notice';
                        a.appendChild(p);
                        return a;
                    },
                    create_info: function (title, maglink) {
                        var a = this.info.cloneNode(true);
                        a.firstChild.textContent = title.length < 20 ? title : title.substr(0, 20) + '...';
                        a.firstChild.href = maglink;
                        a.title = title;
                        return a;
                    },
                    create_size: function (size, src) {
                        var a = this.size.cloneNode(true);
                        a.textContent = size;
                        a.href = src;
                        return a;
                    },
                    create_operation: function (maglink) {
                        var a = this.operation.cloneNode(true);
                        a.firstChild.href = maglink;
                        return a;
                    },
                    create_offline: function () {    //有用 hobby
                        var a = this.offline();
                        a.className = 'nong-offline';
                        return a;
                    },
                    create_select_box: function () {
                        var select_box = document.createElement('select');
                        select_box.id = 'nong-search-select';
                        select_box.setAttribute('title', '切换搜索结果');
                        var search_name = GM_getValue('search', default_search_name);
                        for (var k in thirdparty.nong.search_engines) {
                            var o = document.createElement('option');
                            if (k == search_name) {
                                o.setAttribute('selected', 'selected');
                            }
                            o.setAttribute('value', k);
                            o.textContent = k;
                            select_box.appendChild(o);
                        }
                        return select_box;
                    },
                    head: (function () {
                        var a = document.createElement('th');
                        var b = document.createElement('a');
                        a.appendChild(b);
                        return a;
                    })(),
                    info: (function () {
                        var a = document.createElement('div');
                        var b = document.createElement('a');
                        b.textContent = 'name';
                        b.href = 'src';
                        a.appendChild(b);
                        return a;
                    })(),
                    size: function () {
                        var a = document.createElement('a');
                        a.textContent = 'size';
                        return a;
                    }(),
                    operation: (function () {
                        var a = document.createElement('div');
                        var copy = document.createElement('a');
                        copy.className = 'nong-copy';
                        copy.textContent = '复制';
                        a.appendChild(copy);
                        return a;
                    })(),
                    offline: function () {
                        var a = document.createElement('div');
                        var b = document.createElement('a');
                        b.className = 'nong-offline-download';
                        b.target = '_blank';
                        //debugger;
                        for (var k in thirdparty.nong.offline_sites) {
                            if (thirdparty.nong.offline_sites[k].enable) {
                                var c = b.cloneNode(true);
                                c.href = thirdparty.nong.offline_sites[k].url;
                                c.textContent = thirdparty.nong.offline_sites[k].name;
                                a.appendChild(c);
                            }
                        }
                        return a;
                    },
                },
                create_empty_table: function () {   //有用 hobby
                    var a = document.createElement('table');
                    a.id = 'nong-table-new';
                    return a;
                },
                updata_table: function (src, data, type) {
                    if (type == 'full') {
                        var tab = $('#nong-table-new')[0];
                        tab.removeChild(tab.querySelector("#notice").parentElement);
                        for (var i = 0; i < data.length; i++) {
                            tab.appendChild(thirdparty.nong.magnet_table.template.create_row(data[i]));
                        }
                    }
                    // else if(type =='mini'){
                    // }

                    this.reg_event();
                },
                full: function (src, data) {
                    var tab = this.create_empty_table();
                    tab.appendChild(thirdparty.nong.magnet_table.template.create_head());
                    // for (var i = 0; i < data.length; i++) {
                    //     tab.appendChild(thirdparty.nong.magnet_table.template.create_row(data[i]))
                    // }
                    var loading = thirdparty.nong.magnet_table.template.create_loading();
                    tab.appendChild(loading);
                    return tab;
                },
                handle_event: function (event) {
                    if (event.target.className == 'nong-copy') {
                        event.target.innerHTML = '成功';
                        GM_setClipboard(event.target.href);
                        setTimeout(function () {
                            event.target.innerHTML = '复制';
                        }, 1000);
                        event.preventDefault(); //阻止跳转
                    }
                    else if (event.target.className == 'nong-offline-download') {
                        var maglink = event.target.parentElement.parentElement.getAttribute('maglink') || event.target.parentElement.parentElement.parentElement.getAttribute('maglink');
                        GM_setValue('magnet', maglink);

                        var token_url = 'http://115.com/?ct=offline&ac=space&_='; //获取115 token接口
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: token_url + new Date().getTime(),
                            onload: function (responseDetails) {
                                if (responseDetails.responseText.indexOf('html') >= 0) {
                                    //未登录处理
                                    Common.notifiy("115还没有登录",
                                        '请先登录115账户后,再离线下载！',
                                        icon,
                                        'http://115.com/?mode=login'
                                    );
                                    return false;
                                }
                                var sign115 = JSON.parse(responseDetails.response).sign;
                                var time115 = JSON.parse(responseDetails.response).time;
                                console.log("uid=" + jav_userID + " sign:" + sign115 + " time:" + time115);
                                console.log("rsp:" + responseDetails.response);
                                GM_xmlhttpRequest({
                                    method: 'POST',
                                    url: 'http://115.com/web/lixian/?ct=lixian&ac=add_task_url', //添加115离线任务接口
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    data: "url=" + encodeURIComponent(maglink) + "&uid=" + jav_userID + "&sign=" + sign115 + "&time=" + time115, //uid=1034119 ,hobby的
                                    onload: function (responseDetails) {
                                        var lxRs = JSON.parse(responseDetails.responseText); //离线结果
                                        if (lxRs.state) {
                                            //离线任务添加成功
                                            Common.notifiy("115老司机自动开车",
                                                '离线任务添加成功',
                                                icon,
                                                'http://115.com/?tab=offline&mode=wangpan'
                                            );
                                        }
                                        else {
                                            //离线任务添加失败
                                            if (lxRs.errcode == '911') {
                                                lxRs.error_msg = '你的帐号使用异常，需要在线手工重新验证即可正常使用。';
                                            }
                                            Common.notifiy("失败了",
                                                '请重新打开115,' + lxRs.error_msg,
                                                icon,
                                                'http://115.com/?tab=offline&mode=wangpan'
                                            );
                                        }
                                        console.log("sign:" + sign115 + " time:" + time115);
                                        console.log("磁链:" + maglink + " 下载结果:" + lxRs.state + " 原因:" + lxRs.error_msg);
                                        console.log("rsp:" + responseDetails.response);
                                    }
                                });
                            }
                        });
                        event.preventDefault(); //阻止跳转
                    }
                },
                reg_event: function () { // target 处理 更精准
                    var list = [
                        '.nong-copy',
                        '.nong-offline-download'
                    ];
                    for (var i = 0; i < list.length; i++) {
                        var a = document.querySelectorAll(list[i]);
                        for (var u = 0; u < a.length; u++) {
                            a[u].addEventListener('click', this.handle_event, false);
                        }
                    }
                    // var b = document.querySelectorAll('#nong-search-select')[0];
                    // b.addEventListener('change', this.handle_event, false);

                },
            },
            // 挊
            searchMagnetRun: function () {
                for (var i = 0; i < main_keys.length; i++) {
                    var v = main[main_keys[i]];

                    //for javlibrary
                    if ($("#adultwarningprompt")[0] !== null) {
                        //$("#adultwarningprompt input")[0].click();
                    }

                    if (v.re.test(location.href)) {
                        if (v.type === 0) {
                            try {
                                main.cur_vid = v.vid();
                            }
                            catch (e) {
                                main.cur_vid = '';
                            }
                            if (main.cur_vid) {
                                GM_addStyle([
                                    '#nong-table-new{margin:10px auto;color:#666 !important;font-size:13px;text-align:center;background-color: #F2F2F2;}',
                                    '#nong-table-new th,#nong-table-new td{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}',
                                    '.jav-nong-row{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}',
                                    '.nong-copy{color:#08c !important;}',
                                    '.nong-offline{text-align: center;}',
                                    '#jav-nong-head a {margin-right: 5px;}',
                                    '.nong-offline-download{color: rgb(0, 180, 30) !important; margin-right: 4px !important;}',
                                    '.nong-offline-download:hover{color:red !important;}',

                                ].join(''));
                                main.cur_tab = thirdparty.nong.magnet_table.full();
                                console.log('挊的番号：', main.cur_vid);
                                v.proc();

                                // console.log(main.cur_tab)
                                let t = $('#jav-nong-head')[0].firstChild;
                                t.firstChild.addEventListener('change', function (e) {
                                    console.log(e.target.value);
                                    GM_setValue('search_index', e.target.value);
                                    let s = $('#nong-table-new')[0];
                                    s.parentElement.removeChild(s);
                                    thirdparty.nong.searchMagnetRun();
                                });

                                thirdparty.nong.search_engines.cur_engine(main.cur_vid, function (src, data) {
                                    if (data.length === 0) {
                                        $('#nong-table-new')[0].querySelectorAll('#notice')[0].textContent = 'No search result';
                                    }
                                    else {
                                        thirdparty.nong.magnet_table.updata_table(src, data, 'full');
                                        /*display search url*/
                                        var y = $('#jav-nong-head th')[1].firstChild;
                                        y.href = thirdparty.nong.search_engines.full_url;
                                    }
                                });
                            }
                        }
                        break;
                    }
                }
            },
        },
        // 登录115执行脚本，自动离线下载准备步骤
        login115Run: function () {
            jav_userID = GM_getValue('jav_user_id', 0); //115用户ID缓存
            //获取115ID
            if (jav_userID === 0) {
                if (location.host.indexOf('115.com') >= 0) {
                    if (typeof (window.wrappedJSObject.user_id) != 'undefined') {
                        jav_userID = window.wrappedJSObject.user_id;
                        GM_setValue('jav_user_id', jav_userID);
                        alert('115登陆成功！');
                        return;
                    }
                } else {
                    //alert('请先登录115账户！');
                    Common.notifiy("115还没有登录",
                        '请先登录115账户后,再离线下载！',
                        icon,
                        'http://115.com/?mode=login'
                    );
                    GM_setValue('jav_user_id', 0);
                }
            }

            if (location.host.indexOf('115.com') >= 0) {
                /*if(location.href.indexOf('#115helper') < 0)
                {
                    console.log("jav老司机:115.com, 不初始化.");
                    return false;
                }*/
                console.log('jav老司机:115.com,尝试获取userid.');
                jav_userID = GM_getValue('jav_user_id', 0);
                //debugger;
                if (jav_userID !== 0) {
                    console.log("jav老司机: 115账号:" + jav_userID + ",无需初始化.");
                    return false;
                }
                jav_userID = $.cookie("OOFL");
                console.log("jav老司机: 115账号:" + jav_userID);
                if (!jav_userID) {
                    console.log("jav老司机: 尚未登录115账号");
                    return false;
                } else {
                    console.log("jav老司机: 初始化成功");
                    Common.notifiy('老司机自动开车', '登陆初始化成功,赶紧上车把!', icon, "");
                    GM_setValue('jav_user_id', jav_userID);
                }
                return false;
            }
        },
        // 瀑布流脚本
        waterfall: (function () {
            function waterfall(selectorcfg = {}) {
                this.lock = new Lock();
                this.baseURI = this.getBaseURI();
                this.selector = {
                    next: 'a.next',
                    item: '',
                    cont: '', //container
                    pagi: '.pagination',
                };
                Object.assign(this.selector, selectorcfg);
                this.pagegen = this.fetchSync(location.href);
                this.anchor = $(this.selector.pagi)[0];
                this._count = 0;
                this._1func = function (cont, elems) {
                    cont.empty().append(elems);
                };
                this._2func = function (cont, elems) {
                    cont.append(elems);
                };
                this._3func = function (elems) {
                };

                if ($(this.selector.item).length) {
                    document.addEventListener('scroll', this.scroll.bind(this));
                    document.addEventListener('wheel', this.wheel.bind(this));
                    this.appendElems(this._1func);
                }
            }

            waterfall.prototype.getBaseURI = function () {
                let _ = location;
                return `${_.protocol}//${_.hostname}${(_.port && `:${_.port}`)}`;
            };
            waterfall.prototype.getNextURL = function (href) {
                let a = document.createElement('a');
                a.href = href;
                return `${this.baseURI}${a.pathname}${a.search}`;
            };
            // 瀑布流脚本
            waterfall.prototype.fetchURL = function (url) {
                console.log(`fetchUrl = ${url}`);
                const fetchwithcookie = fetch(url, {credentials: 'same-origin'});
                return fetchwithcookie.then(response => response.text())
                    .then(html => new DOMParser().parseFromString(html, 'text/html'))
                    .then(doc => {
                        let $doc = $(doc);
                        let href = $doc.find(this.selector.next).attr('href');
                        let nextURL = href ? this.getNextURL(href) : undefined;
                        let elems = $doc.find(this.selector.item);
                        return {
                            nextURL,
                            elems
                        };
                    });
            };
            // 瀑布流脚本
            waterfall.prototype.fetchSync = function* (urli) {
                let url = urli;
                do {
                    yield new Promise((resolve, reject) => {
                        if (this.lock.locked) {
                            reject();
                        }
                        else {
                            this.lock.lock();
                            resolve();
                        }
                    }).then(() => {
                        return this.fetchURL(url).then(info => {
                            url = info.nextURL;
                            return info.elems;
                        })
                            ;
                    }).then(elems => {
                        this.lock.unlock();
                        return elems;
                    }).catch((err) => {
                            // Locked!
                        }
                    )
                    ;
                } while (url);
            };
            // 瀑布流脚本
            waterfall.prototype.appendElems = function () {
                let nextpage = this.pagegen.next();
                if (!nextpage.done) {
                    nextpage.value.then(elems => {
                        const cb = (this._count === 0) ? this._1func : this._2func;
                        cb($(this.selector.cont), elems);
                        this._count += 1;
                        // hobby mod script
                        this._3func(elems);
                    })
                    ;
                }
                return nextpage.done;
            };
            // 瀑布流脚本
            waterfall.prototype.end = function () {
                console.info('The End');
                document.removeEventListener('scroll', this.scroll.bind(this));
                document.removeEventListener('wheel', this.wheel.bind(this));
                let $end = $(`<h1>The End</h1>`)
                $(this.anchor).replaceWith($end);
            };
            waterfall.prototype.reachBottom = function (elem, limit) {
                return (elem.getBoundingClientRect().top - $(window).height()) < limit;
            };

            waterfall.prototype.scroll = function () {
                if (this.reachBottom(this.anchor, 500) && this.appendElems(this._2func)) {
                    this.end();
                }
            };

            waterfall.prototype.wheel = function () {
                if (this.reachBottom(this.anchor, 1000) && this.appendElems(this._2func)) {
                    this.end();
                }
            };
            waterfall.prototype.setFirstCallback = function (f) {
                this._1func = f;
            };
            waterfall.prototype.setSecondCallback = function (f) {
                this._2func = f;
            };
            waterfall.prototype.setThirdCallback = function (f) {
                this._3func = f;
            };

            return waterfall;
        })(),
        // 瀑布流脚本
        waterfallScrollInit: function () {
            var w = new thirdparty.waterfall({});
            // javbus.com、avmo.pw、avso.pw
            var $pages = $('div#waterfall div.item');
            if ($pages.length) {
                // javbus.com
                if ($('a#next').length) {
                    w = new thirdparty.waterfall({
                        next: 'a#next',
                        item: 'div#waterfall div.item',
                        cont: '#waterfall',
                        pagi: '.pagination-lg',
                    });
                }
                //avmo.pw、avso.pw
                if ($('a[name="nextpage"]').length) {
                    w = new thirdparty.waterfall({
                        next: 'a[name="nextpage"]',//nextpage
                        item: 'div#waterfall div.item',
                        cont: '#waterfall',
                        pagi: '.pagination',
                    });
                }
            }

            // javlibrary
            var $pages2 = $('div.videos div.video');
            if ($pages2.length) {
                GM_addStyle([
                    '.videothumblist .videos .video {height: 265px;padding: 0px;margin: 4px;}',
                ].join(''));
                $pages2[0].parentElement.id = "waterfall";
                w = new thirdparty.waterfall({
                    next: 'a[class="page next"]',
                    item: 'div.videos div.video',
                    cont: '#waterfall',
                    pagi: '.page_selector',
                });
            }

            w.setSecondCallback(function (cont, elems) {
                if (location.pathname.includes('/star/')) {
                    cont.append(elems.slice(1));
                } else {
                    cont.append(elems);
                }
            });

            w.setThirdCallback(function (elems) {
                // hobby mod script
                function filerMonth(indexCd_id, dateString) {
                    //过滤最新X月份的影片
                    if ($(indexCd_id).context.URL.indexOf("bestrated.php?delete") > 0) {
                        if ($(indexCd_id).context.URL.indexOf("bestrated.php?deleteOneMonthAway") > 0 && !Common.isLastXMonth(dateString, 1)) {
                            $(indexCd_id).remove();
                        }
                        else if ($(indexCd_id).context.URL.indexOf("bestrated.php?deleteTwoMonthAway") > 0 && !Common.isLastXMonth(dateString, 2)) {
                            $(indexCd_id).remove();
                        }
                    }
                };

                function filerScore(indexCd_id, pingfengString) {
                    //过滤X评分以下的影片
                    //if(vid == 'javlikq7qu')debugger;
                    if ($(indexCd_id).context.URL.indexOf("?delete") > 0) {
                        if ($(indexCd_id).context.URL.indexOf("php?delete8down") > 0 && Number(pingfengString.replace('(', '').replace(')', '')) <= 8) {
                            //debugger;
                            $(indexCd_id).remove();
                        }
                        else if ($(indexCd_id).context.URL.indexOf("php?delete9down") > 0 && Number(pingfengString.replace('(', '').replace(')', '')) <= 9) {
                            $(indexCd_id).remove();
                        }
                    }
                };

                function setbgcolor(indexCd_id, dateString) {
                    // 如果是最近两个月份的影片标上背景色
                    if ($(indexCd_id).context.URL.indexOf("bestrated") > 0 && Common.isLastXMonth(dateString, 2)) {
                        //$(indexCd_id).css("background-color", "blanchedalmond");
                        $('div[style="color: red;"]', $(indexCd_id)).css("background-color", "yellow");
                        //debugger;
                    }
                };

                if (document.title.search(/JAVLibrary/) > 0 && elems) {
                    for (let i = 0; i < elems.length; i++) {
                        let _vid = $(elems[i]).attr("id").replace('vid_', '');//vid_javlikd42y
                        // 给列表中的影片添加鼠标点击事件
                        $("a", $("#vid_" + _vid)).first().mousedown(function (event) {
                            // 判断鼠标左键或中间才执行
                            if (event.button < 2) {
                                // 设置点击后填充新的背景色peachpuff
                                $("#vid_" + _vid).css("background-color", "peachpuff");
                            }
                        });

                        // 查找影片是否存在我浏览过的表中
                        MyBrowse.findBy(persistence, null, 'index_cd', _vid, function (findObj) {
                            //debugger;
                            if (findObj) {//存在
                                //debugger;
                                let indexCd_id = "#vid_" + findObj.index_cd;
                                if ($(indexCd_id).context.URL.indexOf("bestrated.php?filterMyBrowse") > 0) {
                                    $(indexCd_id).remove();
                                }
                                else {
                                    // 查找影片是否存在我的影片资料表中
                                    MyMovie.findBy(persistence, null, 'index_cd', findObj.index_cd, function (findObj) {
                                        if (findObj) {//存在
                                            let indexCd_id = "#vid_" + findObj.index_cd;
                                            $(indexCd_id).css("background-color", "peachpuff");//hotpink,khaki,indianred,peachpuff
                                            $(indexCd_id).children("a").append("<div class='id'style='color: red;'>" + findObj.release_date + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + findObj.score + "</div>");
                                            $(indexCd_id).children("a").attr("release_date", findObj.release_date);

                                            let r = Math.random() / 100;
                                            let s = 0;
                                            if (findObj.score.replace(/[\\(\\)]/g, "") != '') {
                                                s = r + parseFloat(findObj.score.replace(/[\\(\\)]/g, ""));
                                            }
                                            else {
                                                s = 0 + r;
                                            }
                                            $(indexCd_id).children("a").attr("score", s);

                                            setbgcolor(indexCd_id, findObj.release_date);
                                            filerMonth(indexCd_id, findObj.release_date);
                                            filerScore(indexCd_id, findObj.score);
                                        }
                                        else {//不存在
                                            // 加入影片资料到表中
                                            //debugger;
                                            addMovie(_vid);
                                            persistence.flush();
                                        }
                                    });
                                }
                            }
                            else {//不存在
                                //console.log(`vid = ${_vid}`);
                                //debugger;
                                //异步请求调用内页详情的访问地址
                                //debugger;
                                GM_xmlhttpRequest({
                                    method: "GET",
                                    //内页地址
                                    url: location.origin + "/cn/?v=" + _vid,
                                    onload: function (result) {
                                        let vid = result.finalUrl.split("=")[1];//例如：http://www.j12lib.com/cn/?v=javlikd42a
                                        let bodyStr = result.responseText;
                                        let date_idx = bodyStr.search(/"video_date" class="item"/);//<span class="score">(9.70)</span>
                                        let yixieBody = bodyStr.substring(date_idx, bodyStr.search(/"video_genres"/));
                                        let dateString = yixieBody.substring(yixieBody.indexOf('video_date') + 92, yixieBody.indexOf('video_date') + 102);
                                        let pingfengString = "";
                                        if (yixieBody.indexOf('score">') > 0) {
                                            pingfengString = yixieBody.substring(yixieBody.indexOf('score">') + 7, yixieBody.indexOf('score">') + 14).replace('</span>', '').replace('<', '');
                                        }
                                        let indexCd_id = "#vid_" + vid;
                                        $(indexCd_id).children("a").append("<div class='id'style='color: red;'>" + dateString + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + pingfengString + "</div>");

                                        $(indexCd_id).children("a").attr("release_date", dateString);

                                        let r = Math.random() / 100;
                                        let s = 0;
                                        if (pingfengString.replace(/[\\(\\)]/g, "") != '') {
                                            s = r + parseFloat(pingfengString.replace(/[\\(\\)]/g, ""));
                                        }
                                        else {
                                            s = 0 + r;
                                        }
                                        $(indexCd_id).children("a").attr("score", s);

                                        setbgcolor(indexCd_id, dateString);
                                        filerMonth(indexCd_id, dateString);
                                        filerScore(indexCd_id, pingfengString);
                                    },
                                    onerror: function (e) {
                                        console.log(e);
                                    }
                                });//end  GM_xmlhttpRequest
                            }
                        });

                    }
                }
            });
            // javbus.com、avmo.pw、avso.pw 样式
            GM_addStyle([
                '#waterfall {height: initial !important;width: initial !important;display: flex;flex-direction: row;flex-wrap: wrap;}',
                '#waterfall .item.item {position: relative !important;top: initial !important;left: initial !important;float: none;flex: 20%;}',
                '#waterfall .movie-box,#waterfall .avatar-box {width: initial !important;display: flex;}',
                '#waterfall .movie-box .photo-frame {overflow: visible;}',
            ].join(''));
        },
        // 字幕下载
        subDown: function (AVID) {
            //debugger;
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.163sub.com/Search?id=" + AVID,
                onload: function (result) {
                    let doc = result.responseText;
                    let re = /download\/\w+-\w+-\w+-\w+-\w+'/;
                    //download/ + 多个字母或数字 + 符号‘-’ + 多个字母或数字 + 符号‘-’ + 多个字母或数字 + 符号‘-’ + 多个字母或数字 + 符号‘-’ + 多个字母或数字 + 符号'
                    let arr = re.exec(doc);
                    if (!arr) {
                        $("#video_info").append("<div id='divZm' class='item'><table><tbody><tr><td class='header'>外挂字幕:</td><td style='color: red;'>&nbsp;暂无字幕</td></tr></tbody></table></div></div>");
                        return;
                    }
                    //debugger;
                    let zm = arr[0].slice(8, -1);
                    $("#video_info").append("<div id='divZm' class='item'><table><tbody><tr><td class='header'>外挂字幕:</td><td><a href='http://www.163sub.com/LinkInfo" + zm + "' target='_blank' style='color: red;'>&nbsp;下载</a></td></tr></tbody></table></div>");
                },
                onerror: function (e) {
                    console.log('搜索字幕出现错误');
                }
            });
        },

    };

    function loadData(pageName, func) {
        var loadPageNumData = function (pageName, PageNum, func) {
            console.log("打开链接url:" + location.origin + "/cn/" + pageName + ".php?&sort=added&page=" + PageNum);
            // 浏览器对同一域名进行请求的最大并发连接数:chrome为6
            GM_xmlhttpRequest({
                method: "GET",
                url: location.origin + "/cn/" + pageName + ".php?&sort=added&page=" + PageNum,
                onload: function (result) {
                    let doc = result.responseText;
                    let docArr = doc.split("的影片: ");
                    //debugger;
                    let totalNum = parseInt(docArr[1].substring(0, docArr[1].search(/<\/div/)));
                    //设置初始化总页数
                    GM_setValue(pageName + "_pageNum", parseInt((totalNum + 19) / 20));

                    //GM_setValue(pageName + "_next", true);

                    let tableText = doc.substring(doc.search(/<table class="videotextlist">/), doc.search(/<table style="width: 95%; margin: 10px auto;">/));
                    //<table class="videotextlist">  //<table style="width: 95%; margin: 10px auto;">
                    let $movList = $(Common.parsetext(tableText)).find("tr");

                    let indexArrStr = "0";
                    let timeArrStr = "0";
                    var myBrowseJson = "";

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

                    // debugger;
                    GM_setValue(pageName + "_myBrowseJson" + result.finalUrl.split("page=")[1], myBrowseJson);
                    //GM_setValue(pageName + "_indexArr" + result.finalUrl.split("page=")[1], indexArrStr);
                    //GM_setValue(pageName + "_timeArr" + result.finalUrl.split("page=")[1], timeArrStr);

                    if (PageNum === 1) {
                        func();
                    }
                },
                onerror: function (e) {
                    console.log('打开我想要的页面出现错误');
                }
            });
        }

        loadPageNumData(pageName, 1, function () {
            for (let i = 2; i < GM_getValue(pageName + "_pageNum") + 1; i++) {
                // 每读取6页数据暂停一些时间
                let j = parseInt(i / 6);
                console.log("j=" + j);

                setTimeout(function () {
                    loadPageNumData(pageName, i, function () {
                    });
                }, j * 500);


                if (i == GM_getValue(pageName + "_pageNum")) {
                    setTimeout(function () {
                        console.log("parseInt(i / 6):" + parseInt(i / 6));
                        func();
                    }, parseInt(i / 6) * 500);
                }

            }
        });
    }

    /**
     *
     * @param pageName
     */
    function mergeJson(pageName) {
        // 循环执行,每次延迟执行
        var s1 = setInterval(function () {
            var p = GM_getValue(pageName + "_pageNum");
            if (p > 0) {
                var i = 1;
                GM_setValue(pageName + "_myBrowseJsonAll", "");
                var s2 = setInterval(function () {
                    let tempJson = GM_getValue(pageName + "_myBrowseJson" + i);
                    //console.log("i = " + i )
                    if (tempJson && tempJson !== "") {
                        GM_setValue(pageName + "_myBrowseJsonAll", GM_getValue(pageName + "_myBrowseJsonAll") + tempJson);
                        if (i < p) {
                            i++;
                        }
                        else {
                            //停止s2循环
                            //console.log(pageName + "Json:" + GM_getValue(pageName + "_myBrowseJsonAll"));
                            console.log(pageName + "doNum:" + (GM_getValue("doNum") + 1));
                            GM_setValue("doNum", GM_getValue("doNum") + 1);
                            clearInterval(s2);
                        }
                    }
                }, 50);
                //停止s1循环
                clearInterval(s1);
            }
        }, 100);
    }

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

    function addJsonsToDB(hasDo, jsons, func, callback) {
        if (!hasDo) {
            for (let i = 0; i < jsons.length; i++) {
                let jsonObj = jsons[i];
                let abc = func();
                abc.index_cd = jsonObj.index_cd;
                abc.add_time = jsonObj.add_time;
                persistence.add(abc);
                persistence.flush();
                //debugger;
            }
            //debugger;
        }
        persistence.flush(callback);
    }

    function addMovie(index_cd) {
        var index_cc = index_cd;
        GM_xmlhttpRequest({
            method: "GET",
            url: location.origin + "/cn/?v=" + index_cd,
            onload: function (result) {
                let doc = result.responseText;

                let movie_name = doc.substring(doc.search(/<title>/) + 7, doc.search(/ - JAVLibrary<\/title>/));
                let movie_info = doc.substring(doc.search(/<table id="video_jacket_info">/), doc.search(/<div id="video_favorite_edit" class="">/));
                movie_info = movie_info.replace("src", "hobbysrc");
                let $doc = $(Common.parsetext(movie_info));

                let movie = new MyMovie();
                movie.index_cd = index_cc;
                //debugger;
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

                let myBrowseJsonArray = JSON.parse(GM_getValue("myBrowseAll"));
                let jsonObj = myBrowseJsonArray.filter((p) => {
                    return p.index_cd == result.finalUrl.split("v=")[1];
                });
                //debugger;
                movie.add_time = jsonObj[0].add_time;
                persistence.add(movie);
                //persistence.flush();
                GM_setValue("addMovieNum", GM_getValue("addMovieNum") + 1);
                console.log("addmovieNum:" + (GM_getValue("addMovieNum") + 1));
            },
            onerror: function (e) {
                console.log('出现错误');
            }
        });
    }

    function mainRun() {
        if (location.host.indexOf('115.com') >= 0) {
            thirdparty.login115Run();
        }

        if (document.title.search(/JAVLibrary/) > 0) {
            if ((/(bestrated|newrelease|vl_update|mostwanted|vl_star)/g).test(document.URL)) {

                let a1 = document.createElement('a');
                let a2 = document.createElement('a');
                $(a1).append('&nbsp;&nbsp;按评分排序');
                $(a1).css({
                    "color": "blue",
                    "font": "bold 12px monospace"
                });
                $(a1).attr("href", "#");
                $(a1).click(function () {
                    let div_array = $("div.videos div.video");
                    div_array.sort(function (a, b) {
                        //debugger;
                        let a_score = parseFloat($(a).children("a").attr("score"));
                        let b_score = parseFloat($(b).children("a").attr("score"));
                        if (a_score > b_score) {
                            return -1;
                        }
                        else if (a_score === b_score) {
                            return 0;
                        }
                        else {
                            return 1;
                        }
                    });

                    // 删除Dom列表数据关系，重新添加排序数据
                    div_array.detach().appendTo("#waterfall");

                });

                $(a2).append('&nbsp;&nbsp;按时间排序');
                $(a2).css({
                    "color": "blue",
                    "font": "bold 12px monospace"
                });
                $(a2).attr("href", "#");
                $(a2).click(function () {
                    let div_array = $("div.videos div.video");
                    //debugger;
                    div_array.sort(function (a, b) {
                        //debugger;
                        let a_time = new Date($(a).children("a").attr("release_date").replace(/-/g, "\/")).getTime();
                        let b_time = new Date($(b).children("a").attr("release_date").replace(/-/g, "\/")).getTime();
                        let a_score = parseFloat($(a).children("a").attr("score"));
                        let b_score = parseFloat($(b).children("a").attr("score"));
                        if (a_time > b_time) {
                            return -1;
                        }
                        else if (a_time === b_time) {
                            return (a_score > b_score) ? -1 : 1;
                        }
                        else {
                            return 1;
                        }
                    });

                    // 删除Dom列表数据关系，重新添加排序数据
                    div_array.detach().appendTo("#waterfall");

                });
                $(".left select").after($(a2));
                $(".left select").after($(a1));
            }


            if (document.URL.indexOf("bestrated") > 0) {
                $(".displaymode .right").prepend("<a href='/cn/vl_bestrated.php?deleteTwoMonthAway' style='color: red;'>只看近两月份&nbsp;&nbsp;</a>");
                $(".displaymode .right").prepend("<a href='/cn/vl_bestrated.php?deleteOneMonthAway' style='color: red;'>只看当前月份&nbsp;&nbsp;</a>");
                $(".displaymode .right").prepend("<a href='/cn/vl_bestrated.php?filterMyBrowse' style='color: red;'>不看我阅览过(上个月)&nbsp;&nbsp;</a>");
                $(".displaymode .right").prepend("<a href='/cn/vl_bestrated.php?filterMyBrowse&mode=2' style='color: red;'>不看我阅览过(全部)&nbsp;&nbsp;</a>");
                //<a href="/cn/vl_bestrated.php?delete" style="color: red;">只显示最近发行的&nbsp;&nbsp;</a>
                //todo

            }
            else if (document.URL.indexOf("vl_newrelease") > 0 || document.URL.indexOf("vl_update") > 0) {
                $(".displaymode .right").prepend("<a href='?delete9down' style='color: red;'>只看9分以上&nbsp;&nbsp;</a>");
                $(".displaymode .right").prepend("<a href='?delete8down' style='color: red;'>只看8分以上&nbsp;&nbsp;</a>");
                //<a href="/cn/vl_bestrated.php?delete" style="color: red;">只显示最近发行的&nbsp;&nbsp;</a>
                //todo
            }

            //重置数据库
            // persistence.reset();
            // persistence.schemaSync();

            //debugger;
            //数据库初始化  start01
            JavWebSql.DBinit();
            persistence.flush();
            //end01 cpu忽略

            //a href="myaccount.php"
            if ($('a[href="myaccount.php"]').length) {
                // 已经登录
                // 从未同步过,同步云数据到本地数据库
                let isSync = GM_getValue(location.host + "_doDataSyncStepAll", false);

                console.log(location.href + "是否从未同步过：" + !isSync);
                if (!isSync) {
                    // 立即下载数据
                    GM_setValue("mv_wanted_pageNum", 0);
                    GM_setValue("mv_wanted_pageNum", 0);
                    GM_setValue("mv_wanted_pageNum", 0);

                    //debugger;
                    //start02
                    loadData("mv_wanted", function () {
                        loadData("mv_watched", function () {
                            loadData("mv_owned", function () {
                                //end02 cpu最高20
                                //debugger;
                                //start03
                                GM_setValue("doNum", 0);
                                mergeJson("mv_wanted");
                                mergeJson("mv_watched");
                                mergeJson("mv_owned");
                                //end03 cpu忽略
                                //debugger;
                                var s3 = setInterval(function () {
                                    let n = GM_getValue("doNum");
                                    if (n === 3) {
                                        let j1 = GM_getValue("mv_wanted_myBrowseJsonAll");
                                        let j2 = GM_getValue("mv_watched_myBrowseJsonAll");
                                        let j3 = GM_getValue("mv_owned_myBrowseJsonAll");
                                        let mv_owned_myBrowseJsonAll = j3.substring(0, j3.length - 1);
                                        let myBrowseAll = j1 + j2 + mv_owned_myBrowseJsonAll;


                                        var myBrowseArray = JSON.parse("[" + myBrowseAll + "]");
                                        var myWantArray = JSON.parse("[" + j1.substring(0, j1.length - 1) + "]");
                                        var mySeenArray = JSON.parse("[" + j2.substring(0, j2.length - 1) + "]");
                                        var myHaveArray = JSON.parse("[" + mv_owned_myBrowseJsonAll + "]");


                                        //debugger;
                                        myBrowseArray = uniqueArray(myBrowseArray, "index_cd", function (item, resultObj) {
                                            if (item["add_time"] < resultObj["add_time"]) {
                                                resultObj["add_time"] = item["add_time"];
                                            }
                                        });

                                        GM_setValue("myBrowseAll", JSON.stringify(myBrowseArray));
                                        //console.log(myBrowseArray);

                                        var hasStepOne = GM_getValue(location.host + "_stepOne", false);
                                        var startTime = new Date();
                                        //debugger;
                                        addJsonsToDB(hasStepOne, myHaveArray, function () {
                                            return new MyHave();
                                        }, function () {
                                            //debugger;
                                            addJsonsToDB(hasStepOne, myWantArray, function () {
                                                return new MyWant();
                                            }, function () {
                                                //debugger;
                                                addJsonsToDB(hasStepOne, mySeenArray, function () {
                                                    return new MySeen();
                                                }, function () {
                                                    //debugger;
                                                    addJsonsToDB(hasStepOne, myBrowseArray, function () {
                                                        return new MyBrowse();
                                                    }, function () {
                                                        //debugger;
                                                        GM_setValue(location.host + "_stepOne", true);
                                                        let b = GM_getValue(location.host + "_stepTwo", false);
                                                        if (!b) {
                                                            GM_setValue("addMovieNum", 0);
                                                            for (let i = 0; i < myBrowseArray.length; i++) {
                                                                //console.log("aaaa:" + (GM_getValue("stepTwoNum", 1) == 1) + "  bbbb:" + (i >= GM_getValue("stepTwoNum", 1)));
                                                                if ((GM_getValue(location.host + "_stepTwoNum", 1) == 1) || (i >= GM_getValue(location.host + "_stepTwoNum", 1))) {
                                                                    //debugger;
                                                                    let jsonObj = myBrowseArray[i];
                                                                    addMovie(jsonObj.index_cd);
                                                                }
                                                                else {
                                                                    GM_setValue("addMovieNum", i + 1);
                                                                }
                                                            }

                                                            // persistence.flush(function () {
                                                            //     GM_setValue("stepTwoNum", GM_getValue("addMovieNum", 0));
                                                            // });

                                                            //console.log("time:" + (new Date() - startTime));

                                                            var s4 = setInterval(function () {
                                                                let num = GM_getValue("addMovieNum", 0);
                                                                let stepTwoNum = GM_getValue(location.host + "_stepTwoNum", 1);
                                                                //console.log("i = " + num)
                                                                if (num === myBrowseArray.length) {
                                                                    persistence.flush(function () {
                                                                        GM_setValue(location.host + "_stepTwo", true);
                                                                        GM_setValue(location.host + "_doDataSyncStepAll", true);
                                                                        console.log("time:" + (new Date() - startTime));
                                                                    });
                                                                    clearInterval(s4);
                                                                }
                                                                //console.log("1111:" + (num > stepTwoNum) + "  22222:" + ((num <= 50) || (num % stepTwoNum >= 50)));
                                                                //debugger;
                                                                // 没超过50个数据，持久化一次
                                                                if (num >= stepTwoNum && ((num - stepTwoNum) >= 600)) {
                                                                    persistence.flush(function () {
                                                                        GM_setValue(location.host + "_stepTwoNum", num);
                                                                    })
                                                                }
                                                            }, 150);
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                        clearInterval(s3);
                                    }
                                }, 300)
                            });
                        });
                    });


                }


                // 增加同步数据到本地的触发按钮
            }
        }

        GM_addStyle([
            '.min {width:66px;min-height: 233px;height:auto;cursor: pointer;}',
            '.container {width: 100%;float: left;}',
            '.col-md-3 {float: left;max-width: 260px;}',
            '.col-md-9 {width: inherit;}',
            '.footer {padding: 20px 0;background: #1d1a18;float: left;}',
            '#nong-table-new {margin: initial !important;important;color: #666 !important;font-size: 13px;text-align: center;background-color: #F2F2F2;float: left;}',
            '.header_hobby {font-weight: bold;text-align: right;width: 75px;}',
        ].join(''));

        //获取所有番号影片链接的a元素
        var a_array = $("div[class='item'] a");
        for (var index = 0; index < a_array.length; index++) {
            var aEle = a_array[index];
            $(aEle).attr("target", "_blank");
        }

        var AVID = "";
        //获取番号影片详情页的番号  例如：https://www.javbus.com/CHN-141 || ttp://www.javlibrary.com/cn/?v=javlilzo4e
        if ((/(JAVLibrary|JavBus|AVMOO|AVSOX)/g).test(document.title) && $('.header').length) {
            let AVID = $('.header')[0].nextElementSibling.textContent;

            window.onload = function () {
                $('iframe').remove();
            };
            $($('.header')[0]).attr("class", "header_hobby");

            // 只支持javlibray处理已阅影片
            if (document.title.search(/JAVLibrary/) > 0) {
                let movie = new MyMovie();

                let vid = location.search.split("=")[1];

                movie.index_cd = vid;
                movie.code = AVID;
                movie.release_date = $('#video_date .text').text();
                movie.duration = $('#video_length .text').text();
                movie.director = $('#video_director .text').text();
                movie.maker = $('#video_maker .text').text();
                movie.score = $('#video_review .text .score').text();
                movie.actor = $('#video_cast .text').text();
                movie.cover_img_url = $('#video_jacket_img').attr("src");
                movie.thumbnail_url = movie.cover_img_url.replace("pl", "ps");
                movie.movie_name = $('#video_title a').text();
                movie.publisher = $('#video_label .text a').text();
                movie.add_time = (new Date()).Format("yyyy-MM-dd hh:mm:ss");

                //查找是否存在此番号数据
                MyMovie.findBy(persistence, null, 'code', AVID, function (findObj) {
                    let my_borwse = new MyBrowse();
                    if (!findObj) {//不存在
                        persistence.add(movie);

                        my_borwse.index_cd = movie.index_cd;
                        my_borwse.add_time = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                        persistence.add(my_borwse);
                        persistence.flush();
                    }
                    else {//存在
                        movie.movie_id = findObj.movie_id;
                        movie.add_time = findObj.add_time;
                        persistence.remove(findObj);
                        persistence.add(movie);

                        MyBrowse.findBy(persistence, null, 'index_cd', movie.index_cd, function (findObj) {
                            my_borwse.index_cd = movie.index_cd;
                            my_borwse.add_time = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                            if (findObj) {//存在
                                persistence.remove(findObj);
                            }
                            persistence.add(my_borwse);
                            persistence.flush();
                        });

                    }

                });
            }

            //debugger;
            console.log("番号输出:" + AVID);
            //console.log("时间000000:"+ new Date().getTime());
            Common.addAvImg(AVID, function ($img) {
                //https://www.javbus.com/CHN-141
                var divEle = $("div[class='col-md-3 info']")[0];
                $(divEle).attr("id", "video_info");
                if (divEle) {
                    $(divEle.parentElement).append($img);
                    $img.click(function () {
                        $(this).toggleClass('min');
                        if ($(this).attr("class")) {
                            this.parentElement.parentElement.scrollIntoView();
                        }
                    });
                }
                // http://www.javlibrary.com/cn/?v=javlilzo4e
                divEle = $("div[id='video_favorite_edit']")[0];
                if (divEle) {
                    $img.attr("style", "cursor: pointer;");
                    $(divEle).after($img);
                    $img.click(function () {
                        $(this).toggleClass('min');
                        if ($(this).attr("class")) {
                            this.parentElement.parentElement.scrollIntoView();
                        }
                    });
                }
            });

            thirdparty.subDown(AVID);
        }

        // 挊
        if (GM_getValue('search_index', null) === null) {
            GM_setValue('search_index', 0);
        }
        thirdparty.nong.searchMagnetRun();

        // 瀑布流脚本
        thirdparty.waterfallScrollInit();
    }

    mainRun();
})();
