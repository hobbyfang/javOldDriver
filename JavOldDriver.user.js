// ==UserScript==
// @name         JAV老司机
// @namespace    https://sleazyfork.org/zh-CN/users/25794
// @version      3.5.2
// @supportURL   https://sleazyfork.org/zh-CN/scripts/25781/feedback
// @source       https://github.com/hobbyfang/javOldDriver
// @description  JAV老司机神器,支持各Jav老司机站点。拥有高效浏览Jav的页面排版，JAV高清预览大图，JAV列表无限滚动自动加载，合成“挊”的自动获取JAV磁链接，一键自动115离线下载。。。。没时间解释了，快上车！
// @author       Hobby

// @require      https://cdn.staticfile.org/jquery/2.2.4/jquery.min.js
// @require      https://cdn.staticfile.org/lovefield/2.1.12/lovefield.min.js
// @require      https://cdn.staticfile.org/limonte-sweetalert2/9.17.2/sweetalert2.all.min.js
// @require      https://lib.baomitu.com/jquery/2.2.4/jquery.min.js
// @require      https://lib.baomitu.com/lovefield/2.1.12/lovefield.min.js
// @require      https://lib.baomitu.com/limonte-sweetalert2/9.17.2/sweetalert2.all.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery@2.2.4/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/lovefield@2.1.12/dist/lovefield.min.js
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@9.17.2/dist/sweetalert2.all.min.js
// @resource     icon https://cdn.jsdelivr.net/gh/hobbyfang/javOldDriver@master/115helper_icon_001.jpg

// @include     *://*javlibrary.com/*
// @include     *://*javlib.com/*
// @include     *://*javbus.com/*
// @include     *://tellme.pw/avsox
// @include     *://*avsox.*/*
// @include     *://tellme.pw/avmoo
// @include     *://*avmoo.*/*
// @include     *://115.com/*
// @include     *://onejav.com/*
// @include     *://*jav321.com/video/*

// @include     *://*.o58c.com/*
// @include     *://www.*bus*/*
// @include     *://www.*dmm*/*
// @include     *://www.*javsee*/*
// @include     *://www.*seejav*/*

// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_getResourceURL
// @grant        GM_registerMenuCommand
// @grant        GM_info

// @connect      *
// @copyright    hobby 2016-12-18

// 大陆用户推荐Chrome(V52+) + Tampermonkey（必须扩展） + V2ray/ShadowsocksR(代理) + Proxy SwitchyOmega（扩展）的环境下配合使用。
// 上车请使用chrome浏览器，其他浏览器的问题本人不支持发现和修复相关问题。

// 注意:2.0在每个版本号更新后,javlibrary每个不同域名站点在登录javlibrary的情况下，都会分别首次运行此脚本。
// 根据电脑性能及访问网速情况不同,正常能在1分钟以内(以5000个车牌量为例)缓存个人数据到本地浏览器中.
// 此目的用于过滤个人已阅览过的内容提供快速判断,目前个人图书馆账号的想要、看过、拥有及最新浏览过的番号为已阅数据依据。
// 目前在同步过程中如果浏览器当前页面不在javlibrary站点或者浏览器在后台,同步会被暂停或中止,需注意.
// 如果不登录javlibrary或同版本号已经同步过,就不会运行同步,那么则无此影响.

// 油猴脚本技术交流：https://t.me/hobby666

// v3.5.2  修复部分地区无法访问脚本依赖库问题，重新梳理匹配脚本域名作用地址。
// v3.5.1  修复javdb站源的磁力搜索，增加jav磁链地址的修改入口。
// v3.5.0  图书馆jav列表“按评分排序”升级为“按【VR】+评分排序”，VR标题增加背景颜色区分。
// v3.4.0  针对JVR影片查找资源的需求，结合javlib站的进阶搜寻中多重搜寻来过滤VR资源，增加了javdb站做为jav磁链接下载来源。
//         修复了预览图失效的问题。
// v3.3.7  修复了javbus女优名乱码的问题。
// v3.3.6  修复了预览图失效的问题。
// v3.3.5  修复了已知问题。
// v3.3.4  修复blogjav站点改版后的预览图,优化了部分115在线播放查找识别问题。
// v3.3.3  预览图备用站更换成javstore。
// v3.3.2  修复了已知问题。
// v3.3.1  修复备用预览图问题。修复javbus收藏女优列表排版问题。
// v3.3.0  新增图书馆浏览时根据115在线播放来同步图书馆的已拥有功能（建议登录，不然会弹窗提示）。
// v3.2.0  新增javarchive站的预览图做备用，当blogjav预览图无法正常读取时使用。
//         优化图书馆缓存个人数据的同步效率(60秒内可完成)。优化图书馆站点瀑布流列表排版。修复了部分115在线播放查找识别问题。
// v3.1.10 修复了部分115在线播放跳转首页问题。
// v3.1.9  修复了已知问题。
// v3.1.8  修复了磁链选项undefined问题。
// v3.1.7  增加脚本设置功能，支持磁链地址失效可自己更换。更新最新磁链地址。
// v3.1.6  更换失效的磁链地址。另btdig，nayy，torrentkitty站点需科学上网，其中btdig还需手工验证非机器访问。
// v3.1.5  增加过滤评分及排序时排除10分的番号，更换失效的磁链地址。
// v3.1.4  更换失效的磁链地址。
// v3.1.3  更换失效的磁链地址。
// v3.1.2  优化javbus/avmoo/avsox步兵瀑布流排版。
// v3.1.1  更新了磁链站点。
// v3.1.0  优化javbus/avmoo/avsox瀑布流排版。
// v3.0.5  排版做了一些微调。
// v3.0.4  屏蔽了失效的磁链站点。
// v3.0.0  增加115在线播放的关联入口。同时本代码重新梳理及优化。

// v2.3.0 增加jav321网站内容排版的支持，增加查找已登录115网盘是否拥有当前番号显示。
// v2.2.0 增加onejav网站内容排版的支持，热门Jav预览搜集更省时省力。更换两个磁链资源新地址。
// v2.1.5 增加点击番号完成复制功能。
// v2.1.3 增加btdigg磁链资源站点。修复了已知问题。
// v2.1.1 增加jav站点瀑布流控制按钮功能。
// v2.1.0 增加javbus站内磁链列表的复制、115离线的快捷键功能。

// v2.0.7 增加一种情况Jav列表排序功能支持(仅javlib)。
// v2.0.5 增加Jav列表“按评分排序”、“按时间排序”功能(仅javlib)，及更新Jav站点域名。
// v2.0.0 增加自动同步个人数据缓存到本地,jav列表能识别个人已阅览过的内容(需登录javlibray),针对javlibrary的高评价栏目,增加过滤"不看我阅览过"功能。

// v1.2.0 针对javlibrary的高评价栏目，增加过滤“只看当前月份”、“只看近两月份”功能。另默认此栏目近两月份的内容增加背景颜色区分。
// v1.2.0 更新了合成“挊”脚本的更多网站的支持，感谢作者thunderhit，同时修复原脚本部分网站功能失效问题。
// v1.1.0 优化更新了JAV列表无限滚动自动加载的代码,增加JAV列表中显示"发行日期"和"评分"的排版,以及修复了已知问题。
// v1.0.3 优化了高清预览大图的获取。
// v1.0.2 优化了javlibrary排版,做了最低分辨率1280x800的排版适配调整，及修复了已知问题。
// v1.0.0 支持javlibrary.com、javbus.com、avmo.pw、avso.pw等老司机站点，第一版发布。

// ==/UserScript==
/* jshint -W097 */
(function () {
    'use strict';

    // 115用户ID
    let jav_userID = GM_getValue('jav_user_id', 0);
    // icon图标
    let icon = GM_getResourceURL('icon');
    // 瀑布流状态：1：开启、0：关闭
    let waterfallScrollStatus = GM_getValue('scroll_status', 1);
    // 当前网页域名
    let domain = location.host;
    // 数据库
    let javDb;
    // 表
    let myMovie;

    /**
     * 公用类
     * @Class
     */
    var Common = {
        openSystemConfig:() => {
            let scroll_true = '';
            if (GM_getValue('scroll_status', 1) !== 0){
                GM_setValue('scroll_status', 1);
                scroll_true = "checked";
            }

            let dom = `<div>
                   <label class="tm-setting">javlib/javbus开启瀑布流(自动读下一页)<input type="checkbox" id="scroll_true" ${scroll_true} class="tm-checkbox"></label>
                   <label class="tm-setting">btsow网址<input type="text" id="btsow_url" class="tm-text" value="${GM_getValue('btsow_url')}"></label>
                   <label class="tm-setting">btdig网址<input type="text" id="btdig_url" class="tm-text" value="${GM_getValue('btdig_url')}"></label>
                   <label class="tm-setting">nyaa网址<input type="text" id="nyaa_url" class="tm-text" value="${GM_getValue('nyaa_url')}"></label>
                   <label class="tm-setting">torrentkitty网址<input type="text" id="torrentkitty_url" class="tm-text" value="${ GM_getValue('torrentkitty_url')}"></label>
                   <label class="tm-setting">javdb网址<input type="text" id="javdb_url" class="tm-text" value="${ GM_getValue('javdb_url')}"></label>
                </div>`;
            let $dom = $(dom);
            Swal.fire({
                title: '脚本设置',
                html: $dom[0],
                confirmButtonText: '保存'
            }).then((result) => {
                if (result.value){
                    if($('#scroll_true')[0].checked){
                        GM_setValue('scroll_status', 1);
                    }
                    else{
                        GM_setValue('scroll_status', 0);
                    }
                    GM_setValue('btsow_url', $('#btsow_url').val());
                    GM_setValue('btdig_url', $('#btdig_url').val());
                    GM_setValue('nyaa_url', $('#nyaa_url').val());
                    GM_setValue('torrentkitty_url', $('#torrentkitty_url').val());
                    GM_setValue('javdb_url', $('#javdb_url').val());
                    history.go(0);
                }
            })
        },
        /**
         * 版本号比较方法
         * 传入两个字符串，当前版本号：curV；比较版本号：reqV
         * @param curV 当前版本号
         * @param reqV 比较版本号
         * @returns {boolean} 调用方法举例：compare("3.1.10","3.1.9")，将返回true
         */
        compareVersions :(curV, reqV) => {
            if (curV && reqV) {
                //将两个版本号拆成数字
                var arr1 = curV.split('.'),
                    arr2 = reqV.split('.');
                var minLength = Math.min(arr1.length, arr2.length),
                    position = 0,
                    diff = 0;
                //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
                while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
                    position++;
                }
                diff = (diff != 0) ? diff : (arr1.length - arr2.length);
                //若curV大于reqV，则返回true
                return diff > 0;
            } else {
                //输入为空
                console.log("版本号不能为空");
                return false;
            }
        },
        /**
         * 设置cookie
         * @param cname  名字
         * @param cvalue 值
         */
        setCookie: function(cname, cvalue) {
            let d = new Date();
            d.setTime(d.getTime() + (30*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        /**
         * html文本转换为Document对象 https://jsperf.com/domparser-vs-createelement-innerhtml/3
         * @param {String} text
         * @returns {Document}
         */
        parsetext: function (text) {
            try {
                let doc = document.implementation.createHTMLDocument('');
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
                timeout: 3000,
                image: icon,
                onclick: function () {
                    window.open(click_url);
                }
            };
            GM_notification(notificationDetails);
        },
        /**
         * 获取带-的番号
         * @param {String} avid 番号如:ABP888
         * @returns {String}  带-的番号
         */
        getAvCode:function (avid) {
            let letter = avid.match(/^[a-z|A-Z]+/gi);
            let num = avid.match(/\d+$/gi);
            return letter+"-"+num;
        },
        addImg:function (targetImgUrl, func, isZoom) {
            console.log("显示的图片地址:" + targetImgUrl);
            //创建img元素,加载目标图片地址
            //创建新img元素
            let className = "";
            if (isZoom != undefined && !isZoom) {
                className = "min";
            }
            let $img = $(`<img name="javRealImg" title="点击可放大缩小 (图片正常时)" class="${className}"></img>`);
            $img.attr("src", targetImgUrl);
            $img.attr("style", "float: left;cursor: pointer;max-width: 100%;");

            //将新img元素插入指定位置
            func($img);
        },
        /**
         * 加入AV预览内容图
         * @param avid av唯一码
         * @param @function func 函数
         * @param {boolean} isZoom 是否放大,默认true
         */
        addAvImg: function (avid, func, isZoom) {
            let p2 = this.getBigPreviewImgUrlFromJavStore(avid);
            return new Promise(resolve => {
                let p = this.getBigPreviewImgUrlFromBlogjav(avid);
                p.then(imgUrl => {
                    if (imgUrl !== null){
                        let p = request(imgUrl,"",10000);
                        p.then((result) => {
                            if (result.loadstuts && result.finalUrl.search(/removed.png/i) < 0){
                                GM_deleteValue(`temp_img_url_${avid}`);
                                this.addImg(imgUrl, func, isZoom);
                            }
                            else {
                                console.log("blogjav获取的图片地址已经被移除或加载失败");
                                p2.then(url => {
                                    addJavArchiveImg.call(this);
                                });
                            }
                        });
                    }
                    else {
                        p2.then(url => {
                            addJavArchiveImg.call(this);
                        });
                    }

                    function addJavArchiveImg() {
                        imgUrl = GM_getValue(`temp_img_url_${avid}`, "");
                        if (imgUrl === "") {
                            console.log("没有找到预览图");
                            //this.addImg("test", func, isZoom);
                        } else {
                            GM_deleteValue(`temp_img_url_${avid}`);
                            this.addImg(imgUrl, func, isZoom);
                        }
                    }
                });
                resolve();
            });
        },
        /**
         * 根据番号从blogjav获取大预览图Url
         * @param avid av唯一码
         * @returns {Promise} 大预览图Url地址
         */
        getBigPreviewImgUrlFromBlogjav: function(avid){
            return new Promise(resolve => {
                //异步请求搜索blogjav.net的番号
                let promise1 =  request('https://blogjav.net/?s=' + avid, "",15000);
                promise1.then((result) => {
                    return new Promise(resolve => {
                        if(!result.loadstuts){
                            console.log("blogjav查找番号出错");
                            resolve(null);
                        }
                        var doc = Common.parsetext(result.responseText);
                        let a_array = $(doc).find(".entry-title a");
                        let a = a_array[0];
                        //如果找到全高清大图优先获取全高清的
                        for (let i = 0; i < a_array.length; i++) {
                            var fhd_idx = a_array[i].innerHTML.search(/FHD/i);
                            if (fhd_idx > 0) {
                                a = a_array[i];
                                break;
                            }
                        }
                        resolve(a);
                    });
                }).then(a => {
                    return new Promise(resolve => {
                        let targetImgUrl = "";
                        if (a) {
                            //异步请求调用内页详情的访问地址
                            let promise2 = request(a.href,"https://pixhost.to/", 15000);
                            promise2.then((result) => {
                                return new Promise(resolve => {
                                    if(!result.loadstuts)  resolve(null);
                                    let doc = Common.parsetext(result.responseText);
                                    let img_array = $(doc).find('.entry-content a img[data-lazy-src*="pixhost."]');
                                    //debugger;

                                    //如果找到内容大图
                                    if (img_array.length > 0) {
                                        var new_img_src = $(img_array[0]).data('lazySrc');
                                        targetImgUrl = new_img_src.replace('thumbs', 'images').replace('//t', '//img').replace(/[\?*\"*]/, '');
                                        console.log("blogjav获取的图片地址:" + targetImgUrl);
                                        if(targetImgUrl.length === 0){
                                            resolve(null);
                                        }
                                        else {
                                            resolve(targetImgUrl);
                                        }
                                    }
                                    else {
                                        resolve(null);
                                    }
                                });
                            }).then( imgUrl => {
                                resolve(imgUrl);
                            });
                        }
                        else{
                            resolve(null);
                        }
                    });
                }).then(imgUrl => {
                    resolve(imgUrl);
                });
            });
        },
        /**
         * 根据番号从JavArchive获取大预览图Url，并且缓存到GM中
         * @param avid av唯一码
         */
        getBigPreviewImgUrlFromJavArchive: function(avid){
            //异步请求搜索JavArchive的番号
            GM_setValue(`temp_img_url_${avid}`, "");
            let promise1 = request('https://javarchive.com/?s=' + avid);
            return promise1.then((result) => {
                if (!result.loadstuts) return ;
                let doc = Common.parsetext(result.responseText);
                // 查找包含avid番号的a标签数组,忽略大小写
                let a_array = $(doc).find(`.post-meta .thumb a[title*='${avid}'i]`);
                let a = a_array[0];
                //如果找到全高清大图优先获取全高清的
                for (let i = 0; i < a_array.length; i++) {
                    let fhd_idx = a_array[i].title.search(/Uncensored|FHD/i);
                    //debugger;
                    if (fhd_idx >= 0) {
                        a = a_array[i];
                        break;
                    }
                }
                if (a) {
                    //异步请求调用内页详情的访问地址
                    let promise2 = request(a.href,"http://pixhost.to/");
                    return promise2.then((result) => {
                        if(!result.loadstuts)  return;
                        let doc = Common.parsetext(result.responseText);
                        let img_array = $(doc).find('.post-content .external img[alt*=".th"]');
                        if (img_array.length > 0) {
                            let imgUrl = img_array[0].src;
                            imgUrl = imgUrl ? imgUrl : img_array[0].dataset.src;
                            imgUrl = imgUrl.replace('pixhost.org', 'pixhost.to').replace('.th', '')
                                .replace('thumbs', 'images').replace('//t', '//img')
                                .replace(/[\?*\"*]/, '').replace('https', 'http');
                            console.log("javarchive获取的图片地址:" + imgUrl);
                            GM_setValue(`temp_img_url_${avid}`,imgUrl);
                            return Promise.resolve(imgUrl);
                        }
                    });
                }
            });
        },
        /**
         * 根据番号从JavStore获取大预览图Url，并且缓存到GM中
         * @param avid av唯一码
         */
        getBigPreviewImgUrlFromJavStore: function(avid){
            //异步请求搜索JavStore的番号
            GM_setValue(`temp_img_url_${avid}`, "");
            let promise1 = request(`https://javstore.net/search/${avid}.html`);
            return promise1.then((result) => {
                if (!result.loadstuts) return ;
                let doc = Common.parsetext(result.responseText);
                // 查找包含avid番号的a标签数组,忽略大小写
                let a_array = $(doc).find(`.news_1n li h3 span a[title*='${avid}'i]`);
                let a = a_array[0];
                //如果找到全高清大图优先获取全高清的
                for (let i = 0; i < a_array.length; i++) {
                    let fhd_idx = a_array[i].title.search(/Uncensored|FHD/i);
                    if (fhd_idx >= 0) {
                        a = a_array[i];
                        break;
                    }
                }
                if (a) {
                    //异步请求调用内页详情的访问地址
                    let promise2 = request(`https://javstore.net${a.pathname}`,"http://pixhost.to/");
                    return promise2.then((result) => {
                        if(!result.loadstuts)  return;
                        let doc = Common.parsetext(result.responseText);
                        let img_array = $(doc).find('.news a img[alt*=".th"]');
                        if (img_array.length > 0) {
                            let imgUrl = img_array[0].src;
                            imgUrl = imgUrl ? imgUrl : img_array[0].dataset.src;
                            imgUrl = imgUrl.replace('pixhost.org', 'pixhost.to').replace('.th', '')
                                .replace('thumbs', 'images').replace('//t', '//img')
                                .replace(/[\?*\"*]/, '');
                            console.log("javarchive获取的图片地址:" + imgUrl);
                            GM_setValue(`temp_img_url_${avid}`,imgUrl);
                            return Promise.resolve(imgUrl);
                        }
                    });
                }
            });
        },
        /**
         * 查询115网盘是否拥有番号
         * @param javId 番号
         * @param callback 回调函数
         */
        search115Data: function (javId, callback) {
            //异步请求搜索115番号 //115查询
            let javId2 = javId.replace(/(-)/g, ""); //把番号-去除，例如ABC-123 =》 ABC123
            let javId3 = javId.replace(/(-)/g, "00"); //把番号-替换为00，例如CCVR-065 =》 CCVR00065
            let javId4 = javId.replace(/(-)/g, "-0"); //把番号-替换为-0，例如DSVR-584 =》 DSVR-0584
            //保存查询关键词参数
            GM_setValue("115_search_var",`${javId}|${javId2}|${javId3}|${javId4}`);
            let promise1 = request(`https://webapi.115.com/files/search?search_value=${javId}%20${javId2}%20${javId3}%20${javId4}&format=json`);
            promise1.then((result) => {
                let resultJson = JSON.parse(result.responseText);
                if(resultJson.count > 0) {
                    let pickcode = '';
                    let reg = new RegExp(GM_getValue("115_search_var"), "gi");
                    for (let i = 0; i < resultJson.data.length; i++) {
                        let row = resultJson.data[i];
                        if(row.play_long && (row.n.search(reg) >= 0)){//iv vdi ico play_long
                            pickcode = row.pc;
                            callback(true,`https://v.anxia.com/?pickcode=${pickcode}`,pickcode);
                            return;
                        }
                    }
                }
                callback(false,null,null);
            });
        },
        getSchemaBuilder: function() {
            // 构造jav库
            let ds = lf.schema.create('jav_v2', 5);
            // 创建MyMovie表
            ds.createTable('MyMovie').
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
                //预览图路径
                addColumn('prev_img_url', lf.Type.STRING).
                //发布日期
                addColumn('release_date', lf.Type.STRING).
                //评分
                addColumn('score', lf.Type.STRING).
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
                //115的pickcode
                addColumn('pick_code', lf.Type.STRING).
                //是否已阅
                addColumn('is_browse', lf.Type.BOOLEAN).
                //是否想要 0:否 1：是 2：未知
                addColumn('is_want', lf.Type.INTEGER).
                //是否看过 0:否 1：是 2：未知
                addColumn('is_seen', lf.Type.INTEGER).
                //是否拥有 0:否 1：是 2：未知
                addColumn('is_have', lf.Type.INTEGER).
                //是否同步
                addColumn('is_sync', lf.Type.BOOLEAN).
                //定义主键
                addPrimaryKey(['index_cd']).
                //定义索引
                addIndex('idxaddtime', ['add_time'], false, lf.Order.DESC);
            return ds;
        },
    };

    // 是否新版本
    let isNewVersion = Common.compareVersions(GM_info.script.version,GM_getValue("javOldDriver_version","0.0.1"));

    // 磁链访问地址初始化
    if (isNewVersion || GM_getValue('btsow_url', undefined) === undefined) {
        GM_setValue('btsow_url', 'btsow.bar');
    }
    if (isNewVersion || GM_getValue('btdig_url', undefined) === undefined) {
        GM_setValue('btdig_url', 'www.btdig.com');
    }
    if (isNewVersion || GM_getValue('nyaa_url', undefined) === undefined) {
        GM_setValue('nyaa_url', 'sukebei.nyaa.si');
    }
    if (isNewVersion || GM_getValue('torrentkitty_url', undefined) === undefined) {
        GM_setValue('torrentkitty_url', 'www.torrentkitty.app');
    }
    if (isNewVersion || GM_getValue('javdb_url', undefined) === undefined) {
        GM_setValue('javdb_url', 'javdb.com');
    }
    GM_setValue("javOldDriver_version",GM_info.script.version);

    GM_registerMenuCommand('设置', ()=>{Common.openSystemConfig()});

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
                //try { console.log('Thread-' + (index+1) + ' accept the task!') } catch (e) {}
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

    let main = { // todo
        //av信息查询类
        //avsox|avmoo
        jav: {
            type: 0,
            re: /.*movie.*/,
            vid: function () {
                return $('.header_hobby')[0].nextElementSibling.getAttribute("avid");
            },
            proc: function () {
                var divE = $("div[class='col-md-3 info']")[0];
                $(divE).after(main.cur_tab);
            }
        },
        javbus: {
            type: 0,
            re: /bus|dmm/,
            vid: function () {
                var a = $('.header_hobby')[0].nextElementSibling;
                return a ? a.getAttribute("avid") : '';
            },
            proc: function () {
                var divE = $("div[class='col-md-3 info']")[0];
                $(divE).after(main.cur_tab);
            }
        },
        javlibrary: {
            type: 0,
            re: /.*\?v=jav.*/,
            vid: function () {
                return $('#video_id')[0].getElementsByClassName('text')[0].getAttribute("avid");
            },
            proc: function () {
                //去十八岁警告
                Common.setCookie("over18", 18);
                $('.socialmedia').remove();
                GM_addStyle(`
                    #video_info {text-align: left;font: 14px Arial;min-width: 230px;max-width: 250px;padding: 0px 0px 0px 0px;}
                    #video_jacket_info {overflow: hidden;} //table-layout: fixed;
                    #coverimg {vertical-align: top;overflow: hidden;max-width: 50%;}
                    #javtext {vertical-align: top;width: 250px;}
                    #video_info td.header {width: 75px;}
                    #video_info td.icon {width: 0px;}
                    #content {padding-top: 0px;}
                `);

                var tdE = $("td[style='vertical-align: top;']")[0];
                tdE.id = "coverimg";
                $("td[style='vertical-align: top;']")[1].id = 'javtext';
                $('#leftmenu').remove();
                $('#rightcolumn').attr("style", "margin: 0px 0px 0px 0px;width: 100%;padding: initial;");
                $(tdE.parentElement).append('<td id="hobby" style="vertical-align: top;"></td>');
                $('#hobby').append(main.cur_tab);
            }
        },
    };

    function request(url , referrerStr, timeoutInt) {
        return new Promise((resolve,reject) => {
            console.log(`发起网址请求：${url}`);
            GM_xmlhttpRequest({
                url,
                method: 'GET',
                headers:  {
                    "Cache-Control": "no-cache",
                    referrer: referrerStr
                },
                timeout: timeoutInt > 0 ? timeoutInt : 20000,
                onload: response => { //console.log(url + " reqTime:" + (new Date() - time1));
                    response.loadstuts = true;
                    resolve(response);
                },
                onabort: response =>{
                    console.log(url + " abort");
                    response.loadstuts = false;
                    resolve(response);
                },
                onerror: response =>{
                    console.log(url + " error");
                    console.log(response);
                    response.loadstuts = false;
                    resolve(response);
                },
                ontimeout: response =>{
                    console.log(`${url} ${timeoutInt}ms timeout`);
                    response.loadstuts = false;
                    response.finalUrl = url;
                    resolve(response);
                },
            });
        });
    }

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
        // javbus详情页增加多类别联合查找功能
        busTypeSearch : () => {
            let se = () => {
                let curGenres = '', a = document.querySelectorAll('input[name="gr_sel"]:checked'), arr = [];
                a.forEach(e => {
                    arr.push(e.value);
                });
                //console.log(arr.join('-'));
                arr = arr.join('-');
                if (arr[0]) {
                    window.location.href = 'genre/' + arr;
                }
            };
            let CreateSearch = () => {         //get <p>
                let p = document.querySelector('span.genre > a[href*="/genre/"]');
                if (!p) return;
                p = p.parentNode.parentNode;
                p.querySelectorAll('a').forEach(e => {
                    let i = document.createElement('input'), val = e.href.split('/');
                    //https://www.javbus.com/genre/4 --> get > 4
                    val = val[val.length - 1];
                    i.setAttribute('type', 'checkbox');
                    i.setAttribute('name', 'gr_sel');
                    i.setAttribute('value', val);
                    i.setAttribute('style', 'margin-right: 5px;');
                    e.parentNode.insertBefore(i, e);
                });
                let a = document.createElement('a');
                a.setAttribute('style', 'cursor: pointer; display: block; color: blue;');
                a.textContent = '搜索';
                p.appendChild(a);
                a.addEventListener('click', se, false);
            };
            CreateSearch();
        },
        // 登录115执行脚本，自动离线下载准备步骤
        login115Run: function () {
            if (location.host.indexOf('115.com') >= 0) {
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
            }
        },
        // 瀑布流脚本
        waterfallScrollInit: function () {
            var w = new thirdparty.waterfall({});
            // javbus.com、avmo.pw、avso.pw
            var $pages = $('div#waterfall div.item');
            if ($pages.length) {
                $pages[0].parentElement.parentElement.id = "waterfall_h";
                // javbus.com
                if ($("footer:contains('JavBus')").length) {
                    w = new thirdparty.waterfall({
                        next: 'a#next',
                        item: 'div#waterfall div.item',
                        cont: '.masonry',
                        pagi: '.pagination-lg',
                    });
                }
                //avmo.pw、avso.pw
                if ((/(AVMOO|AVSOX)/g).test(document.title)) {
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
                GM_addStyle(`
                    .videothumblist .videos .video {height: 270px;padding: 0px;margin: 4px;}
                    .videothumblist .videos .video .title {height: 2.8em;}
                    .id {height: 1.3em;overflow: hidden;}
                `);
                $pages2[0].parentElement.id = "waterfall";
                w = new thirdparty.waterfall({
                    next: 'a[class="page next"]',
                    item: 'div.videos div.video',
                    cont: '#waterfall',
                    pagi: '.page_selector',
                });
            }
            // onejav
            var $pages3 = $('div.container div.card.mb-3');
            if ($pages3.length) {
                $pages3[0].parentElement.id = "waterfall";
                w = new thirdparty.waterfall({
                    next: 'a.pagination-next.button.is-primary',
                    item: 'div.container div.card.mb-3',
                    cont: '#waterfall',
                    pagi: '.pagination.is-centered',
                });
            }

            w.setSecondCallback(function (cont, elems) {
                if (location.pathname.includes('/star/') && elems) {
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
                }
                function filerScore(indexCd_id, score) {
                    //过滤X评分以下的影片  //if(vid == 'javlikq7qu')debugger;
                    if ($(indexCd_id).context.URL.indexOf("?delete") > 0) {
                        if ($(indexCd_id).context.URL.indexOf("delete7down") > 0 && score <= 7.01) {
                            $(indexCd_id).remove();
                        }
                        else if ($(indexCd_id).context.URL.indexOf("delete8down") > 0 && score <= 8.01) {
                            $(indexCd_id).remove();
                        }
                        else if ($(indexCd_id).context.URL.indexOf("delete9down") > 0 && score <= 9.01) {
                            $(indexCd_id).remove();
                        }
                    }
                }
                function setbgcolor(indexCd_id, dateString) {
                    // 如果是最近两个月份的影片标上背景色
                    if ($(indexCd_id).context.URL.indexOf("bestrated") > 0 && Common.isLastXMonth(dateString, 2)) {
                        //$(indexCd_id).css("background-color", "blanchedalmond");
                        $('div[class="hobby_add"]', $(indexCd_id)).css("background-color", "#ffffc9");
                        //debugger;
                    }
                }

                function extCode(indexCd_id, actor, dateString, pingfengString) {
                    $(indexCd_id).find(".id").append(` &nbsp;${actor}`);
                    let t = $(indexCd_id).find(".title").get(0);//todo v3.5.0
                    $(t).text().indexOf("【VR】") >= 0 ? $(t).css("background-color", "black").css("color", "white"):null;
                    $(indexCd_id).children("a").append(`<div class='hobby_add'style='color: red;font-size: 14px;'>
                        ${dateString}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${pingfengString}</div>`);
                    $(indexCd_id).children("a").attr("release_date", dateString);
                    let s = 0;
                    let r = Math.random() / 100;
                    if (pingfengString.replace(/[\\(\\)]/g, "") != '') {
                        s = r + parseFloat(pingfengString.replace(/[\\(\\)]/g, ""));
                    } else {
                        s = 0 + r;
                    }
                    if (s >= 10) {
                        s = 0.01;
                    }
                    $(indexCd_id).children("a").attr("score", s);
                    setbgcolor(indexCd_id, dateString);
                    filerMonth(indexCd_id, dateString);
                    filerScore(indexCd_id, s);
                }

                if (document.title.search(/JAVLibrary/) > 0 && elems) {
                    for (let i = 0; i < elems.length; i++) {
                        let _vid = $(elems[i]).attr("id").replace('vid_', '');//vid_javlikd42y
                        // 给列表中的影片添加鼠标点击事件
                        $("a", $("#vid_" + _vid)).first().mousedown(function (event) {
                            // 判断鼠标左键或中间才执行
                            if (event.button < 2) {
                                // 设置点击后填充新的背景色peachpuff
                                $("#vid_" + _vid).css("background-color", "#ffe7d3");
                            }
                        });
                        let indexCd_id;
                        let actor;
                        let dateString;
                        let pingfengString;
                        // 查找影片是否存在我浏览过的MyMovie表中
                        let prom =javDb.select().from(myMovie).
                        where(lf.op.and(myMovie.is_browse.eq(true),myMovie.index_cd.eq(_vid))).exec();
                        prom.then( results =>{
                            //let promise1 = Promise.resolve();
                            //return new Promise(resolve => {
                            if(results.length != 0 ){
                                //存在
                                indexCd_id = "#vid_" + results[0].index_cd;
                                if ($(indexCd_id).context.URL.indexOf("bestrated.php?filterMyBrowse") > 0) {
                                    $(indexCd_id).remove();
                                }
                                else{
                                    $(indexCd_id).css("background-color", "#ffe7d3");//hotpink,khaki,indianred,peachpuff
                                    if(results[0].is_sync){ //已经同步过
                                        extCode(indexCd_id, results[0].actor, results[0].release_date, results[0].score);
                                    }
                                    else{ //未同步过
                                        getMovieInfo(true);
                                    }
                                }
                            }
                            else {//不存在
                                getMovieInfo(false);
                            }
                            function getMovieInfo(isSave) {
                                let promise1 = request(location.origin + "/ja/?v=" + _vid);
                                promise1.then((result) => {
                                    indexCd_id = "#vid_" + result.finalUrl.split("=")[1];//例如：http://www.j12lib.com/cn/?v=javlikd42a
                                    let doc = result.responseText;
                                    let movie_info = doc.substring(doc.search(/<table id="video_jacket_info">/),
                                        doc.search(/<div id="video_favorite_edit" class="">/));
                                    // 阻止构造Document对象时加载src内容
                                    movie_info = movie_info.replace("src", "hobbysrc");
                                    let $doc = $(Common.parsetext(movie_info));
                                    actor = $('#video_cast .text', $doc).text();
                                    dateString = $('#video_date .text', $doc).text();
                                    pingfengString = $('#video_review .text .score', $doc).text();
                                    extCode(indexCd_id, actor, dateString, pingfengString);
                                    // todo 1118
                                    if (isSave) syncMovie(result);
                                    return Promise.resolve();
                                });
                            }
                        });
                    }
                }
            });

            w.setFourthCallback(function (elems) { // todo 20190404
                if (document.title.search(/OneJAV/) > 0 && elems) {
                    // 增加对应所有番号的Javlib的跳转链接,
                    for (let index = 0; index < elems.length; index++) {
                        let aEle = $(elems[index]).find("h5.title.is-4.is-spaced a")[0];
                        let avid = $(aEle).text().replace(/[ ]/g,"").replace(/[\r\n]/g,"")//去掉空格//去掉回车换行
                        //修改样式
                        $(aEle.parentElement.parentElement).attr("style","flex-direction: column;");
                        // Javlib的跳转链接
                        $(aEle.parentElement).append("<a style='color:red;' href='https://www.javlibrary.com/cn/vl_searchbyid.php?keyword="
                            + Common.getAvCode(avid) +"&"+avid+ "' target='_blank' title='点击到Javlib看看'>&nbsp;&nbsp;Javlib</a>");
                        // 番号预览大图
                        Common.addAvImg(Common.getAvCode(avid), function ($img) {
                            //debugger;
                            let divEle = $(elems[index]).find("div.column.is-5")[0];
                            if (divEle) {
                                $(divEle).append($img);
                                $img.click(function () {
                                    //如果存在min就去除min,否则不存在则添加上min
                                    $(this).toggleClass('min');
                                    if ($(this).attr("class")) {
                                        this.parentElement.parentElement.scrollIntoView();
                                    }
                                });
                            }
                        },false);
                    }
                }

                if(((/(JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) && elems) {
                    if(location.pathname.search('/searchstar|/actresses|/&mdl=favor&sort=4') < 0){//排除actresses页面
                        // 处理列表文字内容排版
                        for (let i = 0; i < elems.length; i++) {
                            //$(elems[i]).css("height","385px");
                            if($(elems[i]).find("div.avatar-box").length > 0) continue;
                            let spanEle = $(elems[i]).find("div.photo-info span")[0];
                            let t1 = $(spanEle).html().substr($(spanEle).html().indexOf("<br>") + 4);
                            let t2 = $(spanEle).html().substr(0,$(spanEle).html().indexOf("<br>"));
                            $(spanEle).html(t1 + "<br>" + t2);
                        }
                    }
                }
            });

            if((/(JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) {
                // javbus.com、avmo.pw、avso.pw 样式
                GM_addStyle(`
                    #waterfall_h {height: initial !important;width: initial !important;flex-direction: row;flex-wrap: wrap;margin: 5px 15px !important;}
                    #waterfall_h .item {position: relative !important;top: initial !important;left: initial !important;float: left;}
                    #waterfall_h .movie-box img {position: absolute; top: -200px; bottom: -200px; left: -200px; right: -200px; margin: auto;}
                    #waterfall_h .movie-box .photo-frame {position: relative;} #waterfall_h .avatar-box .photo-info p {margin: 0 0 2px;}
                    #waterfall_h .avatar-box .photo-info {line-height: 15px; padding: 6px;height: 220px;}
                    #waterfall_h .avatar-box .photo-frame {margin: 10px;text-align: center;}
                    #waterfall_h .avatar-box.text-center {height: 195px;}//actresses页面
                `);

                if($('#waterfall').length == 0 && location.pathname.search(/search/) > 0
                    && location.pathname.search(/uncensored/) < 1){
                    window.location.href = $('li[role="presentation"]:eq(1) a').attr("href");
                }

                if(location.pathname.includes('/uncensored') || (/(AVSOX)/g).test(document.title)){
                    GM_addStyle(`#waterfall_h .movie-box {width: 354px;} #waterfall_h .movie-box .photo-info {height: 105px;}`);
                }
                else {
                    GM_addStyle(`#waterfall_h .movie-box {width: 167px;} #waterfall_h .movie-box .photo-info {height: 145px;}`);
                }
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
                    cont: '#waterfall', //container
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
                    // 开启关闭瀑布流判断
                    if(waterfallScrollStatus > 0) {
                        document.addEventListener('scroll', this.scroll.bind(this));
                        document.addEventListener('wheel', this.wheel.bind(this));
                    }
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
                        for(const elem of elems) {
                            const links = elem.getElementsByTagName('a');
                            for(const link of links) {
                                link.target = "_blank";
                            }
                        }
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
                        this._4func(elems);
                    })
                    ;
                }
                return nextpage.done;
            };
            // 瀑布流脚本
            waterfall.prototype.end = function () {
                document.removeEventListener('scroll', this.scroll.bind(this));
                document.removeEventListener('wheel', this.wheel.bind(this));
                let $end = $(`<h1>The End</h1>`);
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
            waterfall.prototype.setFourthCallback = function (f) {
                this._4func = f;
            };
            return waterfall;
        })(),
        // 挊
        nong: {
            offline_sites: {
                115: {
                    name: '115离线',
                    url: 'http://115.com/?tab=offline&mode=wangpan',
                    enable: true,
                },
            },
            resource_sites:{
                [GM_getValue('btsow_url')]: function (kw, cb) {
                    let promise = request("https://" + GM_getValue('search_index') + "/search/" + kw);
                    promise.then((result) => {
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
                    });
                },
                [GM_getValue('btdig_url')]: function (kw, cb) {
                    let promise = request("https://" + GM_getValue('search_index') + "/search?q=" + kw);
                    promise.then((result) => {
                        thirdparty.nong.search_engines.full_url = result.finalUrl;
                        let doc = Common.parsetext(result.responseText);
                        let data = [];
                        let t = doc.querySelectorAll("div.one_result");
                        if (t) {
                            for (let elem of t) {
                                data.push({
                                    "title": elem.querySelector(".torrent_name a").textContent,
                                    "maglink": elem.querySelector(".fa.fa-magnet a").href,
                                    "size": elem.querySelector(".torrent_size").textContent,
                                    "src": elem.querySelector(".torrent_name a").href,
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
                    });
                },
                [GM_getValue('nyaa_url')]: function (kw, cb) {
                    let promise = request("https://" + GM_getValue('search_index') + "/?f=0&c=0_0&q=" + kw);
                    promise.then((result) => {
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
                                    "src": "https://"+ [GM_getValue('nyaa_url')]
                                        + elem.querySelector("td:nth-child(2)>a:nth-child(1)").getAttribute('href'),
                                });
                            }
                        }
                        cb(result.finalUrl, data);
                    });
                },
                [GM_getValue('torrentkitty_url')]: function (kw, cb) {
                    let promise = request("https://" + GM_getValue('search_index') + "/search/" + kw);
                    promise.then((result) => {
                        thirdparty.nong.search_engines.full_url = result.finalUrl;
                        let doc = Common.parsetext(result.responseText);
                        let data = [];
                        let t = $(doc).find("#archiveResult tr:gt(0)");
                        if (t) {
                            for (let elem of t) {
                                if((/(No result)/g).test(elem.querySelector(".name").textContent))
                                    break;
                                data.push({
                                    "title": elem.querySelector(".name").textContent,
                                    "maglink": elem.querySelector(".action>a:nth-child(2)").href,
                                    "size": elem.querySelector(".size").textContent,
                                    "src": "https://"+ [GM_getValue('torrentkitty_url')] + elem.querySelector(".action>a:nth-child(1)").getAttribute('href'),
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
                    });
                },
                [GM_getValue('javdb_url')]: function (kw, cb) {
                    let promise = request("https://" + GM_getValue('search_index') + "/search?f=download&q=" + kw , "https://" + GM_getValue('search_index') + "/");
                    promise.then((result) => {
                        let data = [];
                        return new Promise((resolve,reject) => {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            let doc = Common.parsetext(result.responseText);
                            let a = $(doc).find(`.box .video-title:contains('${kw.toUpperCase()}')`);
                            if(a) {
                                resolve(a[0].parentElement.href.replace(location.origin,'https://' + [GM_getValue('javdb_url')]));
                            }
                            else{
                                reject();
                            }
                        }).then( url => {

                                let promise2 = request(url);
                                promise2.then(result => {
                                    thirdparty.nong.search_engines.full_url = result.finalUrl;
                                    let doc = Common.parsetext(result.responseText);
                                    let t = $(doc).find('#magnets-content .item');
                                    if (t) {
                                        for (let elem of t) {
                                            data.push({
                                                "title": elem.querySelector(".magnet-name span:nth-child(1)").textContent,
                                                "maglink": elem.querySelector(".magnet-name a:nth-child(1)").href,
                                                "size": elem.querySelector(".magnet-name .meta").textContent,
                                                "src": result.finalUrl,
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
                                })
                            }
                        ).catch(() => {
                            data.push({
                                "title": "没有找到磁链接",
                                "maglink": "",
                                "size": "0",
                                "src": result.finalUrl,
                            });
                            cb(result.finalUrl, data);
                        });
                    });
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
                    let ops = Object.keys(thirdparty.nong.resource_sites);
                    let z = thirdparty.nong.resource_sites[GM_getValue('search_index', ops[0])];
                    if (!z) {
                        //alert("search engine not found");
                        GM_setValue('search_index', Object.keys(thirdparty.nong.resource_sites)[0]);
                        z = thirdparty.nong.resource_sites[GM_getValue('search_index')];
                    }
                    return z(kw, cb);
                },
                parse_error: function (a) {
                    alert("调用搜索引擎错误，可能需要更新，请向作者反馈。i=" + a);
                },
                full_url: '',

            },
            // 挊
            magnet_table: {
                template: {
                    create_head: function () {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        a.id = 'jav-nong-head';
                        var list = ['标题','大小','操作','离线下载'];
                        for (var i = 0; i < list.length; i++) {
                            var b = this.head.cloneNode(true);
                            if (i === 0) {
                                var select = document.createElement("select");
                                var ops = Object.keys(thirdparty.nong.resource_sites); // todo 181225
                                var cur_index = GM_getValue("search_index", ops[0]);
                                for (var j = 0; j < ops.length; j++) {
                                    var op = document.createElement("option");
                                    op.value = ops[j];
                                    op.textContent = ops[j];
                                    if (cur_index == ops[j]) {
                                        op.setAttribute("selected", "selected");
                                    }
                                    select.appendChild(op);
                                }
                                b.removeChild(b.firstChild);
                                b.appendChild(select);
                                let a3 = document.createElement('a');
                                $(a3).append('&nbsp;修改&nbsp;')
                                $(a3).css({
                                    "color": "blue",
                                    "font": "bold 12px monospace"
                                });
                                $(a3).attr("href", "#");
                                $(a3).click(() => {
                                    Common.openSystemConfig();
                                });
                                b.append(a3);
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
                        //debugger;
                        // 暂时针对cnbtkitty.pw站点生效。
                        if(data.maglink.indexOf("#magnetlink")>-1){
                            a.setAttribute('id', data.id);
                            let promise1 = request(data.maglink + "?hobbyId=" + data.id);// 传递修改hobbyId，用于修改时定位。
                            promise1.then((result) => {
                                //定位磁链编码开始下标位置
                                let indexNum = result.responseText.indexOf('#website#infohash#');
                                if (indexNum >= 0) {
                                    let magnetlink = result.responseText.substring(indexNum + 18, indexNum + 58);
                                    let hobbyId = result.finalUrl.substring(result.finalUrl.indexOf('?hobbyId=') + 9, result.finalUrl.length);
                                    $("#" + hobbyId).attr("maglink", "magnet:?xt=urn:btih:" + magnetlink);
                                }
                            });
                        }

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
                    var maglink = event.target.parentElement.parentElement.getAttribute('maglink')
                        || event.target.parentElement.parentElement.parentElement.getAttribute('maglink');
                    if (event.target.className == 'nong-copy') {
                        event.target.innerHTML = '成功';
                        maglink = maglink.substr(0,60);
                        GM_setClipboard(maglink);
                        setTimeout(function () {
                            event.target.innerHTML = '复制';
                        }, 1000);
                        event.preventDefault(); //阻止跳转
                    }
                    else if (event.target.className == 'nong-offline-download') {
                        maglink = maglink.substr(0,60);
                        GM_setValue('magnet', maglink);
                        //获取115 token接口
                        let promise = request('http://115.com/?ct=offline&ac=space&_='+ new Date().getTime());
                        promise.then((responseDetails) => {
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
                                data: "url=" + encodeURIComponent(maglink) + "&uid=" + jav_userID + "&sign=" + sign115
                                    + "&time=" + time115,
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
                },
            },
            // 挊
            searchMagnetRun: function () {
                for (var i = 0; i < main_keys.length; i++) {
                    var v = main[main_keys[i]];

                    // //for javlibrary
                    // if ($("#adultwarningprompt")[0] !== null) {
                    //     //$("#adultwarningprompt input")[0].click();
                    // }
                    if (v.re.test(location.href)) {
                        if (v.type === 0) {
                            try {
                                main.cur_vid = v.vid();
                            }
                            catch (e) {
                                main.cur_vid = '';
                            }
                            if (main.cur_vid) {
                                GM_addStyle(`
                                    #nong-table-new{margin:10px auto;color:#666 !important;font-size:13px;text-align:center;background-color: #F2F2F2;}
                                    #nong-table-new th,#nong-table-new td{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}
                                    .jav-nong-row{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}
                                    .nong-copy{color:#08c !important;}
                                    .nong-offline{text-align: center;}
                                    #jav-nong-head a {margin-right: 5px;}
                                    .nong-offline-download{color: rgb(0, 180, 30) !important; margin-right: 4px !important;}
                                    .nong-offline-download:hover{color:red !important;}
                                `);
                                main.cur_tab = thirdparty.nong.magnet_table.full();
                                console.log('挊的番号：', main.cur_vid);
                                v.proc();

                                // console.log(main.cur_tab)
                                let t = $('#jav-nong-head')[0].firstChild;
                                t.firstChild.addEventListener('change', function (e) {
                                    //debugger;
                                    console.log("url: http://" + e.target.value);
                                    GM_setValue('search_index', e.target.value);
                                    let s = $('#nong-table-new')[0];
                                    s.parentElement.removeChild(s);
                                    thirdparty.nong.searchMagnetRun();
                                });

                                if (GM_getValue('search_index', null) === null) {
                                    GM_setValue('search_index', Object.keys(thirdparty.nong.resource_sites)[0]);
                                }
                                thirdparty.nong.search_engines.cur_engine(main.cur_vid, function (src, data) {
                                    if (data.length === 0) {
                                        let url = thirdparty.nong.search_engines.full_url;
                                        $('#nong-table-new #notice').text('No search result! ');   //todo 181224
                                        $('#nong-table-new #notice').append(
                                            `<a href="${url}" target="_blank" style="color: red;">&nbsp;Go</a>`);   //todo 190630
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
    };

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

    function loadPageNumData(pageName, PageNum) {
        let url = location.origin + "/cn/" + pageName + ".php?&sort=added&page=" + PageNum;// console.log("打开链接url:" + url);
        let commonClass = Common;// 无此步骤Common作用域失效,暂时未知原因
        let promise1 = request(url);
        promise1.then((result) => {
            return new Promise(resolve => {
                if($.type(result) !== "function" && result.status !== 200){
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
     * 同步movie信息到myMovie表中
     * @param result 页面响应结果
     */
    function syncMovie(result) {
        let commonClass = Common;// 无此步骤Common作用域失效,暂时未知原因
        let doc = result.responseText;
        let movie_name = doc.substring(doc.search(/<title>/) + 7, doc.search(/ - JAVLibrary<\/title>/));
        let movie_info = doc.substring(doc.search(/<table id="video_jacket_info">/), doc.search(/<div class="socialmedia">/));
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
        movie.prev_img_url = "";
        movie.movie_name = movie_name;
        movie.publisher = $('#video_label .text a', $doc).text();
        movie.add_time = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
        movie.pick_code = '';
        movie.is_browse = true;
        movie.is_want = ($('#subscribed .smallbutton.hidden', $doc).length > 0) ? 1 : 0;
        movie.is_seen = ($('#watched .smallbutton.hidden', $doc).length > 0) ? 1 : 0;
        movie.is_have = ($('#owned .smallbutton.hidden', $doc).length > 0) ? 1 : 0;
        movie.is_sync = true;

        let myBrowseJsonArray = JSON.parse(GM_getValue("myBrowseAllData"));
        let jsonObj = myBrowseJsonArray.filter((p) => {
            return p.index_cd == result.finalUrl.split("v=")[1];
        });
        movie.add_time = jsonObj[0].add_time;
        let row = myMovie.createRow(movie);
        javDb.insertOrReplace().into(myMovie).values([row]).exec();
    }

    /**
     * javbus详情页磁链列表增加复制、115离线快捷键功能函数
     */
    function javbusUs() {
        $('#magnet-table tbody tr td[colspan="4"]').attr("colspan","5");
        let tr_array = $('#magnet-table tr[height="35px"]');
        for (var i = 0; i < tr_array.length; i++) {
            let trEle = tr_array[i];
            //debugger;
            let magnetUrl = $(trEle).find("td a")[0].href;
            $(trEle).append("<td style='text-align:center;'><div><a class='nong-copy' href='" + magnetUrl + "'>复制</a></div></td>");
            $(trEle).append("<td><div class='nong-offline'><a class='nong-offline-download' target='_blank' "
                + "href='http://115.com/?tab=offline&amp;mode=wangpan'>115离线</a></div></td>");
            $(trEle).attr("maglink", magnetUrl);
            $(trEle).find(".nong-copy")[0].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
            $(trEle).find(".nong-offline-download")[0].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
            //.addEventListener('click', this.handle_event, false);
        }
    }

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

                //json数组去重
                myBrowseArray = uniqueArray(myBrowseArray, "index_cd", function (item, resultObj) {
                    if (item["add_time"] < resultObj["add_time"]) {
                        resultObj["add_time"] = item["add_time"];
                    }
                });
                GM_setValue("myBrowseAllData", JSON.stringify(myBrowseArray));
                //应同步的总数
                GM_setValue("myBrowseAllNum", myBrowseArray.length);//console.log(JSON.stringify(myBrowseArray));

                let startTime = new Date();//console.log("startTime: " + startTime);
                let b = GM_getValue(domain + "_stepTwo_V3", false);
                if (!b) {
                    let jsonObj;
                    let row;
                    for (let i = 0; i < myBrowseArray.length; i++) {
                        jsonObj = myBrowseArray[i];
                        row = myMovie.createRow({
                            'index_cd':jsonObj.index_cd,
                            'code':'',
                            'release_date':'',
                            'duration':'',
                            'director':'',
                            'maker':'',
                            'score':'',
                            'actor':'',
                            'cover_img_url':'',
                            'thumbnail_url':'',
                            'prev_img_url':'',
                            'movie_name':'',
                            'publisher':'',
                            'add_time':jsonObj.add_time,
                            'pick_code':'',
                            'is_browse':true,
                            'is_want':2,
                            'is_seen':2,
                            'is_have':2,
                            'is_sync':false
                        });
                        javDb.insertOrReplace().into(myMovie).values([row]).exec();
                    }
                    // 如果保存影片数量大于等于需同步总数，则同步完成
                    if (GM_getValue(domain + "_saveMovieNum", 0) >= myBrowseArray.length){
                        GM_setValue(domain + "_stepTwo_V3", true);
                        GM_setValue(domain + "_doDataSyncStepAll_V3", true);
                    }
                    console.log(domain + "_stepTwoTime:" + (new Date() - startTime));
                    return Promise.resolve();
                }
            }
        });
    }
    /**
     * 针对页面的番号信息增加功能及样式修改. javlib和javbus共同使用
     * @returns {string} 番号
     */
    function getAvidAndChgPage() {
        let AVID = $('.header')[0].nextElementSibling.textContent;
        // 实现点击番号复制到系统剪贴板 todo 181221v1
        $('.header')[0].nextElementSibling.id = "avid";
        $('#avid').empty().attr("title", "点击复制番号").attr("avid", AVID);
        let a_avid = document.createElement('a');
        $(a_avid).attr("href", "#").append(AVID);
        $(a_avid).click(function () {
            GM_setClipboard($('#avid').attr("avid"));
        });
        $('#avid').append(a_avid);
        $('#avid').after("<span style='color:red;'>(←点击复制)</span>");
        $($('.header')[0]).attr("class", "header_hobby");
        return AVID;
    }

    function waterfallButton() {
        // 瀑布流ui按钮
        let a3 = document.createElement('a');
        (waterfallScrollStatus > 0) ? $(a3).append('关闭瀑布流&nbsp;&nbsp;') : $(a3).append('开启瀑布流&nbsp;&nbsp;');
        $(a3).css({
            "color": "blue",
            "font": "bold 12px monospace"
        });
        $(a3).attr("href", "#");
        $(a3).click(function () {
            if ((/关闭/g).test($(this).html())) {
                //$(this).html('&nbsp;&nbsp;开启瀑布流');
                GM_setValue('scroll_status', 0);
            } else {
                //$(this).html('&nbsp;&nbsp;关闭瀑布流');
                GM_setValue('scroll_status', 1);
            }
            window.location.reload();
        });
        return a3;
    }

    function javlibaryScript() {
        let a3 = waterfallButton();
        if ((/(JAVLibrary)/g).test(document.title)) {
            //数据库初始化  start01
            var pm_mater = Common.getSchemaBuilder().connect({
                storeType: lf.schema.DataStoreType.INDEXED_DB
            }).then(function (database) {
                javDb = database;
                myMovie = javDb.getSchema().table('MyMovie');
                //javDb.delete().from(myMovie).exec();// 清空MyMovie表数据.
                return javDb.select().from(myMovie).where(myMovie.is_browse.eq(true)).exec();
            }).then(function (results) {
                console.log("已经保存已阅影片数量:" + results.length);
                GM_setValue(domain + "_saveMovieNum", results.length);
                // results.forEach(function(row) {
                //     console.log(row['index_cd'],'|',row['code'],'|', row['add_time'],'|',row['movie_name']);
                // });
                if (document.URL.indexOf("bestrated") > 0) {
                    $(".left select").after("<a href='/cn/vl_bestrated.php?deleteTwoMonthAway' class='hobby-a'>&nbsp;&nbsp;只看近两月份</a>");
                    $(".left select").after("<a href='/cn/vl_bestrated.php?deleteOneMonthAway' class='hobby-a'>&nbsp;&nbsp;只看当前月份</a>");
                    $(".left select").after("<a href='/cn/vl_bestrated.php?filterMyBrowse' class='hobby-a'>&nbsp;&nbsp;不看我阅览过(上个月)</a>");
                    $(".left select").after("<a href='/cn/vl_bestrated.php?filterMyBrowse&mode=2' class='hobby-a'>&nbsp;&nbsp;不看我阅览过(全部)</a>");
                    //todo
                } else if (document.URL.indexOf("vl_newrelease") > 0 || document.URL.indexOf("vl_update") > 0
                    || document.URL.indexOf("vl_genre") > 0 || document.URL.indexOf("vl_mostwanted") > 0) {
                    $(".displaymode .right").prepend("<a href='" + document.location.origin + document.location.pathname
                        + "?delete9down" + document.location.search.replace('?', '&') + "' class='hobby-a'>只看9分以上&nbsp;&nbsp;</a>");
                    $(".displaymode .right").prepend("<a href='" + document.location.origin + document.location.pathname
                        + "?delete8down" + document.location.search.replace('?', '&') + "' class='hobby-a'>只看8分以上&nbsp;&nbsp;</a>");
                    $(".displaymode .right").prepend("<a href='" + document.location.origin + document.location.pathname
                        + "?delete7down" + document.location.search.replace('?', '&') + "' class='hobby-a'>只看7分以上&nbsp;&nbsp;</a>");
                }

                if ((/(bestrated|newrelease|newentries|vl_update|mostwanted|vl_star)/g).test(document.URL) ||
                    (/(vl_genre|vl_searchbycombo|mv_owned|mv_watched|mv_wanted|mv_visited)/g).test(document.URL)||
                    (/(vl_label|vl_maker|vl_director|vl_searchbyid|userwanted|userowned)/g).test(document.URL)) {

                    // 指定站点页面加入瀑布流控制按钮
                    $(".displaymode .right").prepend($(a3));

                    // 瀑布流脚本
                    thirdparty.waterfallScrollInit();

                    let a1 = document.createElement('a');

                    $(a1).append('按【VR】+评分排序&nbsp;&nbsp;');
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
                            } else if (a_score === b_score) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });
                        div_array.sort(function (a, b) {
                            //debugger;
                            let a_val = $(a).children("a").attr("title").indexOf("【VR】") >= 0 ? 1:0;
                            let b_val = $(b).children("a").attr("title").indexOf("【VR】") >= 0 ? 1:0;
                            if (a_val > b_val) {
                                return -1;
                            } else if (a_val === b_val) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });
                        // 删除Dom列表数据关系，重新添加排序数据
                        div_array.detach().appendTo("#waterfall");
                    });

                    let a2 = $(a1).clone();
                    $(a2).html('按时间排序&nbsp;&nbsp;');
                    $(a2).click(function () {
                        let div_array = $("div.videos div.video");
                        div_array.sort(function (a, b) {
                            let a_time = new Date($(a).children("a").attr("release_date").replace(/-/g, "\/")).getTime();
                            let b_time = new Date($(b).children("a").attr("release_date").replace(/-/g, "\/")).getTime();
                            let a_score = parseFloat($(a).children("a").attr("score"));
                            let b_score = parseFloat($(b).children("a").attr("score"));
                            if (a_time > b_time) {
                                return -1;
                            } else if (a_time === b_time) {
                                return (a_score > b_score) ? -1 : 1;
                            } else {
                                return 1;
                            }
                        });

                        // 删除Dom列表数据关系，重新添加排序数据
                        div_array.detach().appendTo("#waterfall");
                    });
                    $(".displaymode .right").prepend($(a2));
                    $(".displaymode .right").prepend($(a1));
                }
            });
            //JavWebSql.DBinit();
            if ($('a[href="myaccount.php"]').length) {
                // 已经登录
                // 从未同步过,同步云数据到本地数据库
                //debugger;
                let isSync = GM_getValue(domain + "_doDataSyncStepAll_V3", false);
                console.log(domain + "  是否同步过：" + isSync);
                if (!isSync) {
                    pm_mater.then(() => {
                        return new Promise(resolve => {
                            //debugger;
                            var hasStepOne = GM_getValue(domain + "_stepOne_V3", false);
                            let stepOneStartTime = new Date();
                            console.log(domain + "  同步是否完成第一步：" + hasStepOne);
                            if (!hasStepOne) {
                                // 立即下载数据
                                GM_setValue("mv_wanted_pageNum", 0);
                                GM_setValue("mv_watched_pageNum", 0);
                                GM_setValue("mv_owned_pageNum", 0);

                                //start02 todo lovefieldDB
                                // 创建请求队列  //浏览器对同一域名进行请求的最大并发连接数:chrome为6
                                let queue = new Queue(7);
                                // 读取想要的影片
                                loadData("mv_wanted", queue);
                                // 读取看过的影片
                                loadData("mv_watched", queue);
                                // 读取拥有的影片
                                loadData("mv_owned", queue);
                                // 延迟1秒运行定时循环函数
                                setTimeout(() => {
                                    // 定时循环函数,当队列执行完成时结束
                                    var s4 = setInterval(function () {
                                        //console.log("queue.taskList.length : " + queue.taskList.length);
                                        if (queue.taskList.length == 0) {
                                            let end_num = 0;
                                            for (let i = 0, l = queue.threads.length; i < l; i++) {
                                                if (queue.threads[i].promise.state() === 'resolved') {
                                                    end_num++;
                                                }
                                            }
                                            if (end_num == queue.threads.length) {
                                                GM_setValue(domain + "_stepOne_V3", true);  // todo 需打开
                                                console.log(domain + "_stepOneTime:" + (new Date() - stepOneStartTime));
                                                //alert(location.host + "_stepOneTime:" + (new Date() - stepOneStartTime));
                                                clearInterval(s4);
                                                return resolve();
                                            }
                                        }
                                    }, 300);
                                }, 1000);
                            } else {
                                return resolve();
                            }
                        });
                    }).then(() => {
                        saveData();
                    });
                }
                // 增加同步数据到本地的触发按钮
            }

            //获取番号影片详情页的番号  例如：http://www.javlibrary.com/cn/?v=javli7j724
            if ($('.header').length && $('meta[name="keywords"]').length) {
                let AVID = getAvidAndChgPage();
                window.onload = function () {
                    $('iframe').remove();
                };
                let pickcode = '';

                //查找115是否有此番号
                Common.search115Data(AVID, function (BOOLEAN_TYPE, playUrl, pc) {
                    if (BOOLEAN_TYPE) {
                        let $imgObj = $('#video_jacket_img');
                        pickcode = pc;
                        $imgObj.after(`
                            <div style="position: absolute;width: 100%;height: 12%;background: rgba(0,0,0,0.5);top: 88%;left: 0;">
                                <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: left;">115网盘已拥有此片</p>
                                <a target="_blank" href="${playUrl}">
                                <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: right;width: 50%;">115在线播放 ►</p></a>
                            </div>
                        `);
                        $('#owned button[class="smallbutton"]').click();
                    }
                    console.log("番号输出:" + AVID);
                    Common.addAvImg(AVID, function ($img) {
                        // http://www.javlibrary.com/cn/?v=javlilzo4e
                        let divEle = $("div[id='video_title']")[0];  // todo 190604
                        if (divEle) {
                            $(divEle).after(
                                '<div style="width: 100%;height: 100%;display: inline-block;margin: 0px 0px 0px 0px;">' +
                                '<div id="hobby_div_left" style="float: left;min-width: 60%;"></div>' +
                                '<div id="hobby_div_right" style="float: left;min-width: 66px;"></div>' +
                                '</div>'
                            );
                            $('#hobby_div_left').append($('#video_jacket_info'));
                            $('#hobby_div_left').append($('#video_favorite_edit'));
                            $('#hobby_div_right').append($img);
                            $img.click(function () {
                                $(this).toggleClass('min');
                                if ($(this).attr("class")) {
                                    this.parentElement.parentElement.scrollIntoView();
                                }
                            });
                        }
                    }, !BOOLEAN_TYPE);

                    // 只支持javlibray处理已阅影片
                    let movie = {};
                    movie.index_cd = location.search.split("=")[1];
                    movie.code = AVID;
                    movie.release_date = $('#video_date .text').text();
                    movie.duration = $('#video_length .text').text();
                    movie.director = $('#video_director .text').text();
                    movie.maker = $('#video_maker .text').text();
                    movie.score = $('#video_review .text .score').text();
                    movie.actor = $('#video_cast .text').text();
                    movie.cover_img_url = $('#video_jacket_img').attr("src").replace("http://", "");
                    movie.thumbnail_url = movie.cover_img_url.replace("pl", "ps");
                    movie.prev_img_url = "";
                    movie.movie_name = $('#video_title a').text();
                    movie.publisher = $('#video_label .text a').text();
                    movie.add_time = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                    movie.pick_code = pickcode;
                    movie.is_browse = true;
                    movie.is_want = ($('#subscribed .smallbutton.hidden').length > 0) ? 1 : 0;
                    movie.is_seen = ($('#watched .smallbutton.hidden').length > 0) ? 1 : 0;
                    movie.is_have = ($('#owned .smallbutton.hidden').length > 0) ? 1 : 0;
                    movie.is_sync = true;
                    pm_mater.then(() => {
                        //查找是否存在此番号数据
                        return javDb.select().from(myMovie).where(myMovie.index_cd.eq(movie.index_cd)).exec()
                            .then((results) => {
                                if (results.length > 0) {
                                    movie.add_time = results[0].add_time;
                                }
                                let row = myMovie.createRow(movie);
                                let x = javDb.insertOrReplace().into(myMovie).values([row]).exec();
                                console.log(`${movie.code} 已经存入已阅影片`);
                                console.log(x);
                            });
                    });

                    $('#video_title h3').html($('#video_title a').html());
                });

                // 挊
                thirdparty.nong.searchMagnetRun();
            }//番号影片详情页处理end
        }
    }

    function javBusScript() {
        let a3 = waterfallButton();
        if ((/(JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) {
            // 指定站点页面加入瀑布流控制按钮
            let li_elem = document.createElement('li');
            $(li_elem).append($(a3));
            // JavBus
            $(".visible-md-block").closest(".dropdown").after($(li_elem));
            // AVMOO|AVSOX
            $(".active").closest(".navbar-nav").append($(li_elem));

            // 瀑布流脚本
            thirdparty.waterfallScrollInit();

            //获取番号影片详情页的番号  例如：https://www.javbus.com/AVVR-323
            if ($('.header').length && $('meta[name="keywords"]').length) {
                let AVID = getAvidAndChgPage();

                //查找115是否有此番号
                Common.search115Data(AVID, function (BOOLEAN_TYPE, playUrl, pc) {
                    if (BOOLEAN_TYPE) {
                        let $imgObj = $('.bigImage');
                        $imgObj.after(`
                            <div style="position: absolute;width: 100%;height: 12%;background: rgba(0,0,0,0.5);top: 88%;left: 0;">
                                <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: left;">115网盘已拥有此片</p>
                                <a target="_blank" href="${playUrl}">
                                <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: right;width: 50%;">115在线播放 ►</p></a>
                            </div>
                        `);
                    }
                    console.log("番号输出:" + AVID);
                    Common.addAvImg(AVID, function ($img) {
                        //https://www.javbus.com/CHN-141
                        let divEle = $("div[class='col-md-3 info']")[0];
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
                    }, false);//javbus 默认不放大
                });

                thirdparty.busTypeSearch();
                // 加入javlibry的跳转链接
                $('.col-md-3.info').append(`<a href="https://www.javlibrary.com/cn/vl_searchbyid.php?keyword=${AVID}" style="color: rgb(204, 0, 0);">JavLibrary&nbsp;</a>`);
                // 修改javbus磁链列表头，增加两列
                $('#magnet-table tbody tr').append('<td style="text-align:center;white-space:nowrap">操作</td><td style="text-align:center;white-space:nowrap">离线下载</td>');
                // 先执行一次，针对已经提前加载出磁链列表结果时有效
                javbusUs();
                // 针对为提前加载出磁链列表结果，通过dom元素是否改变事件来判断是否执行功能。
                $('#magnet-table').on("DOMNodeInserted", function () {
                    // 触发后关闭监听事件
                    $('#magnet-table').off();
                    javbusUs();
                });

                // 挊
                thirdparty.nong.searchMagnetRun();
            }
        }
    }

    function oneJavScript() {
        if ((/(OneJAV)/g).test(document.title)) { //todo 190404
            GM_addStyle(`
                .min {width:66px;min-height: 233px;height:auto;cursor: pointer;} /*Common.addAvImg使用*/
                .column.is-5 {width: auto;max-width: 82%;}
                .column {flex-basis: inherit;flex-grow: inherit;}
                .container {max-width: 100%;width: 100%;}
                .image {width: 800px;}
                .has-text-grey-dark {max-width: 1000px;}
            `);
            // 插入自己创建的div
            $('div.container nav.pagination.is-centered').before("<div id='card' ></div>");
            // 将所有番号内容移到新建的div里
            $('div#card').append($('div.container div.card.mb-3'));
            // 瀑布流脚本
            thirdparty.waterfallScrollInit();
        }
    }

    function jav321Script() {
        if ((/(jav321)*\/video\/*/g).test(document.URL)) { //todo 190531
            GM_addStyle(`
                .min {width:66px;min-height: 233px;height:auto;cursor: pointer;} /*Common.addAvImg使用*/
                .col-md-3 {width: 20%;padding-left: 18px; padding-right: 2px;}
                .col-xs-12,.col-md-12 {padding-left: 2px; padding-right: 0px;}
                .col-md-7 {width: 79%;padding-left: 2px;padding-right: 0px;}
                .col-md-9 {width: max-content;}
                .col-md-offset-1 {margin-left: auto;}
                .hobby {display: inline-block;float: left;}
                .hobby_mov {width: 75%;}
                .hobby_p {color: white;font-size: 40px;margin: 0 0 0px;display: inline-block;text-align: right;width: 100%;}
            `);
            $(".col-md-7.col-md-offset-1.col-xs-12 .row .col-md-3 .img-responsive:eq(0)").offsetParent().attr("class", "hobby");
            $("#video_overlay_sample").offsetParent().attr("class", "hobby_mov");
            // 调整div位置
            $('div.col-md-7.col-md-offset-1.col-xs-12').before($('div.col-xs-12.col-md-12')[0].parentElement);

            let meta = $('small')[0];
            let arr = meta.textContent.split(" ");
            let javID = arr[0];

            //查找115是否有此番号
            Common.search115Data(javID, function (BOOLEAN_TYPE, playUrl, pc) {
                if (BOOLEAN_TYPE) {
                    let $imgObj = $('div.col-xs-12.col-md-12 img.img-responsive');
                    $imgObj.after(`
                        <div style="position: absolute;width: 100%;height: 22%;background: rgba(0,0,0,0.5);top: 78%;left: 0;">
                            <a target="_blank" href="${playUrl}"><p class="hobby_p">115在线播放 ►</p></a>
                        </div>
                    `);
                }

                //插入预览图
                Common.addAvImg(javID, function ($img) {
                    //https://www.jav321.com/video/300mium-391
                    var divEle = $("div.col-md-9")[0];
                    //$(divEle).attr("id", "video_info");
                    if (divEle) {
                        $(divEle).after($img);
                        $img.click(function () {
                            $(this).toggleClass('min');
                            if ($(this).attr("class")) {
                                this.parentElement.parentElement.scrollIntoView();
                            }
                        });
                    }
                }, !BOOLEAN_TYPE);
            });

            // 修改jav321磁链列表头，增加两列
            $('table.table.table-striped tbody tr:eq(0)').append('<th>操作</th><th>离线下载</th>');

            //详情页磁链列表增加复制、115离线快捷键功能函数
            let tr_array = $('table.table.table-striped tbody tr:gt(0)');
            for (var i = 0; i < tr_array.length; i++) {
                let trEle = tr_array[i];
                //debugger;
                let magnetUrl = $(trEle).find("td a")[0].href;
                $(trEle).append(`
                    <td style='text-align:center;'><div><a class='nong-copy' href='${magnetUrl}'>复制</a></div></td>
                    <td><div class='nong-offline'>
                    <a class='nong-offline-download' target='_blank' href='http://115.com/?tab=offline&amp;mode=wangpan'>115离线</a>
                    </div></td>
                `);
                $(trEle).attr("maglink", magnetUrl);
                $(trEle).find(".nong-copy")[0].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
                $(trEle).find(".nong-offline-download")[0].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
                //.addEventListener('click', this.handle_event, false);
            }
        }
    }

    function mainRun() {
        GM_addStyle(`
			.tm-setting {display: flex;align-items: center;justify-content: space-between;padding-top: 20px;}
            .tm-checkbox {width: 16px;height: 16px;}
			.tm-text {width: 150px;height: 16px;}
		`);

        if ((/(JAVLibrary|JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length){
            GM_addStyle(`
                .min {width:66px;min-height: 233px;height:auto;cursor: pointer;} /*Common.addAvImg使用*/
                .container {width: 100%;float: left;}
                .col-md-3 {float: left;max-width: 260px;}
                .col-md-9 {width: inherit;}
                .hobby-a {color: red; font: bold 12px monospace;}   /*javlib*/
                .footer {padding: 20px 0;background: #1d1a18;float: left;} /*javbus*/
                #nong-table-new {margin: initial !important;important;color: #666 !important;font-size: 13px;text-align: center;background-color: #F2F2F2;float: left;}
                .header_hobby {font-weight: bold;text-align: right;width: 75px;} /*javbus*/
            `);

            javlibaryScript();
            javBusScript();
        }

        oneJavScript();
        jav321Script();
        thirdparty.login115Run();
    }
    mainRun();
})();