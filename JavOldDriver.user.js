// ==UserScript==
// @name         JAV老司机
// @namespace    https://sleazyfork.org/zh-CN/users/25794
// @version      3.8.3
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

// javlib主要有码jav资源、排行榜、点评
// @include      *://*javlibrary.com/*
// @include      *://*javlib.com/*
// @include      *://*.y62x.com/*

// javbus有无码jav资源、论坛
// @include      *://*javbus.com/*
// @include      *://www.*bus*/*
// @include      *://www.*javsee*/*
// @include      *://www.*seejav*/*

// onejav有FC2资源、排行榜
// @include      *://*onejav.com/*

// avsox有无码jav资源，含FC2  tellme.pw/avsox
// @include      *://*avsox.*/*

// jav321有素人资源、排行榜      
// @include      *://*jav321.com/video/*

// javdb有各资源排行榜，但部分需付费  javdb.com
// @include      *://*javdb*.com/*

// @include      *://*javstore.*/*
// @include      *://*avmoo.*/*
// @include      ://tellme.pw/avmoo
// @include      *://115.com/*
// @include      *://*.quark.cn/list*
// @include      *://www.*dmm*/*

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
// @grant        GM_openInTab

// @connect      *
// @copyright    hobby 2016-12-18
// @license      GPL-3.0
// @compatible   chrome V52+ & Tampermonkey

// 大陆用户推荐Chrome(V52+) + Tampermonkey（必须扩展） + Clash/V2ray(代理) + Proxy SwitchyOmega（扩展）的环境下配合使用。
// 上车请使用chrome浏览器，其他浏览器的问题本人不支持发现和修复相关问题。

// 注意:2.0在每个版本号更新后,javlibrary每个不同域名站点在登录javlibrary的情况下，都会分别首次运行此脚本。
// 根据电脑性能及访问网速情况不同,正常能在1分钟以内(以5000个车牌量为例)缓存个人数据到本地浏览器中.
// 此目的用于过滤个人已阅览过的内容提供快速判断,目前个人图书馆账号的想要、看过、拥有及最新浏览过的番号为已阅数据依据。
// 目前在同步过程中如果浏览器当前页面不在javlibrary站点或者浏览器在后台,同步会被暂停或中止,需注意.
// 如果不登录javlibrary或同版本号已经同步过,就不会运行同步,那么则无此影响.

// 油猴脚本技术交流：https://t.me/+TgfN6vLVRew7aMWt

// v3.8.3  修复javstore22年12月番号视频内容预览大图改版前后的图片获取及显示兼容问题。解决获取dmm评价数据受18岁询问限制。
// v3.8.2  修复javstore番号页图片显示问题,修复javstore备用预览图失效的问题。
// v3.8.1  javlib、javbus、javdb新增了VR菜单入口，javbus新增了FC2菜单跳转，javdb修改了FC2菜单内容（需登录）。修复了已知问题。
// v3.8.0  增加各Jav站点番号浏览记录缓存。增加javbus、javdb列表阅览番号标色。增加夸克在线播放的关联入口，夸克在线播放页排版调整。
//         优化dmm评分数据获取，多数番号突破dmm地区访问限制。代码调整优化。修复了已知问题。

// v3.7.1  再优化blogjav预览图获取方式，优化预览图加载时间。修复了已知问题。
// v3.7.0  增加javdb列表的JAV评分排序、屏蔽指定评分人数功能。优化blogjav预览图获取方式。

// v3.6.0  原番号页面增加dmm、javdb评分展示及在线播放跳转、JAV跳转，增加javstore番号页改造，增加javdb瀑布流及列表增加JAV跳转和排版优化。
//         原javlib番号页面自带预览图可点击查看，onejav列表简单优化，其他已知bug修复，部分代码优化。

// v3.5.2  修复部分地区无法访问脚本依赖库问题，重新梳理匹配脚本域名作用地址。
// v3.5.1  修复javdb站源的磁力搜索，增加jav磁链地址的修改入口。
// v3.5.0  图书馆jav列表“按评分排序”升级为“按【VR】+评分排序”，VR标题增加背景颜色区分。
// v3.4.0  针对JVR影片查找资源的需求，结合javlib站的进阶搜寻中多重搜寻来过滤VR资源，增加了javdb站做为jav磁链接下载来源。
//         修复了预览图失效的问题。
// v3.3.3  预览图备用站更换成javstore。
// v3.3.0  新增图书馆浏览时根据115在线播放来同步图书馆的已拥有功能（建议登录，不然会弹窗提示）。
// v3.2.0  新增javarchive站的预览图做备用，当blogjav预览图无法正常读取时使用。
//         优化图书馆缓存个人数据的同步效率(60秒内可完成)。优化图书馆站点瀑布流列表排版。修复了部分115在线播放查找识别问题。
// v3.1.7  增加脚本设置功能，支持磁链地址失效可自己更换。更新最新磁链地址。
// v3.1.6  更换失效的磁链地址。另btdig，nayy，torrentkitty站点需科学上网，其中btdig还需手工验证非机器访问。
// v3.1.5  增加过滤评分及排序时排除10分的番号，更换失效的磁链地址。
// v3.1.0  优化javbus/avmoo/avsox瀑布流排版。
// v3.0.0  增加115在线播放的关联入口。同时本代码重新梳理及优化。

// v2.3.0  增加jav321网站内容排版的支持，增加查找已登录115网盘是否拥有当前番号显示。
// v2.2.0  增加onejav网站内容排版的支持，热门Jav预览搜集更省时省力。更换两个磁链资源新地址。
// v2.1.5  增加点击番号完成复制功能。
// v2.1.3  增加btdigg磁链资源站点。修复了已知问题。
// v2.1.1  增加jav站点瀑布流控制按钮功能。
// v2.1.0  增加javbus站内磁链列表的复制、115离线的快捷键功能。

// v2.0.7  增加一种情况Jav列表排序功能支持(仅javlib)。
// v2.0.5  增加Jav列表“按评分排序”、“按时间排序”功能(仅javlib)，及更新Jav站点域名。
// v2.0.0  增加自动同步个人数据缓存到本地,jav列表能识别个人已阅览过的内容(需登录javlibray),针对javlibrary的高评价栏目,增加过滤"不看我阅览过"功能。

// v1.2.0  针对javlibrary的高评价栏目，增加过滤“只看当前月份”、“只看近两月份”功能。另默认此栏目近两月份的内容增加背景颜色区分。
// v1.2.0  更新了合成“挊”脚本的更多网站的支持，感谢作者thunderhit，同时修复原脚本部分网站功能失效问题。
// v1.1.0  优化更新了JAV列表无限滚动自动加载的代码,增加JAV列表中显示"发行日期"和"评分"的排版,以及修复了已知问题。
// v1.0.3  优化了高清预览大图的获取。
// v1.0.2  优化了javlibrary排版,做了最低分辨率1280x800的排版适配调整，及修复了已知问题。
// v1.0.0  支持javlibrary.com、javbus.com、avmo.pw、avso.pw等老司机站点，第一版发布。

// ==/UserScript==
/* jshint -W097 */
(function () {
    'use strict';
    const EMPTY_IMAGE_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAB4CAMAAABsOSjPAAAAn1BMVEUAAAD/lgD/x3f/zoj/nRH/3Kr/+e7/sD//68z/1Zj/qzP/skT/uVX/9eX/pCL/oh3/wGb/8d3/4LL/5Lv/2aL/tUv/kAD/0o//9uj/v2L/mQn//vv//Pf/rjf/+vL/1pn/2pT/mAX/kwD/+/X/9OH/4rb/qzD/qSX/mAH/6sn/6cL/26f/y4D/nxr/vV7/uU//wnH/7tb/1YX/wEL/nypWdfcGAAAAAXRSTlMAQObYZgAABOdJREFUeNrs2F1TgkAYhmGeRMRWLbDlS5BAUPysqf7/b6sYt600dQ8a3nW4T3Teo2uWHRYw2tquMOiU5mhDl64ADR36jdZhsVv0X7XoFn2iFt2iT9Si/wG93AxY73Q8fLAooW2GizI7MRm0j4tLCiJoBTPyN4sE2s6h0o4EmkMprySAXmaK6CcC6A0UG1nNowdQLFo2j2aQmTxMKpyrbB7dk5rd54VfLXAmlxI6NOqKrUZocygOG43QXEycSB90KCZTUx90Mvk6bvRBV+P95F6jPY1RUQ9SrW55uPOdqR3id3kUEUYDkZkdmu8da731KrLoI3mPxkfDV486Ovthrps800aPUrs7l2ZR6uV00XPrc2GZMMtWC7Lo26Aez7gwyyxGFJ0MxWHOhVlmlW7pugE1dL03hPpl/y/wA2KfxX6gk++62cSoixkShxba9fuywjgsfgKwHZNCHyuYfVtvjjqfOHqdSWHMsG8XU0Z3I6Av98ZXi5vOR5uNQxDtVoBQzzhk+f63Sw+9juQenjKiz9Pj/oNsnQ4qYeNpZ0H1JYBBsWzVPPoZim2L5tElFOsRuOXFc6iVEkAbXSiVTCigjRAKmTaNE/G9nfNtbRsGwnjudBKW5Gk2ZtCtsJcb7N2+/5ebHv1JXROEkkFxih6IkSr57ufrnaQ2Ia93UP/4c5pt3Ar16dvfE509XpT/Hb62FX593852YHp9+dLWz3MfTfc686cQbmpAD+iGBvSAbmhAD+iGBvSAbmhAD+iGBvSAbuhjoDdKErYPmDSBttISWRvzhJI899m1tDShFRW5B6AnomBqSzXn3fWWANPchDbMMxF74segq3khf/h3X3g3b+Ek02V3aUFX+2QuD2l9e6vFH35VimjaQaPTr7mVHtW+XB6TAXRO5uVgRP8fNPdCM81WyCsp0dOeiBaDGY4o28GgqB00C7l8s5RhHx8iUFK4BW0dkdMpoyY493E4TJ5ydFUgCoFUL/RMQkViriXKGKgIS26pN2ht4a1Az7WkpZg5FuIGs8XBlrocp2uC59LNsv3QlO/2uH9DgwEINws7kmSdWWqZAE7jQRSMlGGPJULzgnv0EVqn1W9B6WP2CqcuuaJkZioOSN8BHVZHHoZtZIELXEL8cQ7JQrIiVXgPfXGYBCOeJKWGOmYEoANHpUBbuPKANrUFCy6aVWkJNdIPzYBzIArx4hBPQJucDj72HYVdduThtMXQpsjF4SVX0RFaJ9LqJLl0FTqatQgDPNdlowNaXyPtk5EKyPl2kzyuggdBytj96pGjKiTLFdqRugFt3kFzju+a/Sm0MnTOvP5IAzVlAeotxF6YLlYigaDAHfh8gpw8rhU6Q0U5pIdGKekMvd2ABqCCWcYMC9S5ACAxVS38diEaR1kqBwoGcImvrAAbUC7J2ny/eVtAgw1yZUjfgjZCZXE3lOUL9BxdrVIdNKEnKuIYX1egLZy4sphMBq0ggAB13bprOCu1zwsWCqORHmiXM8hSn9HCZ/aspdC000Nx1npZGVXFKl0AwmwvVuU5a4lcXgOqlLqy8ARUZnUcgnjXMdcjiI4ty7q4W9kWHjXx2oDul+rdiU/yR4C28SV9B5SzQJtr0nfoLNDlIOFNz9zTQKfi031TzwN9hwb0gG5oQA/oDxR9iq80ehI9PfQT6amhh4Y+k/4BYXA+w/0JM4sAAAAASUVORK5CYII=';
    const JAVDB_ITEM_SELECTOR = '.movie-list.v.cols-4.vcols-8 .item, .movie-list.v.cols-4.vcols-5 .item, .movie-list.h.cols-4.vcols-8 .item, .movie-list.h.cols-4.vcols-5 .item';
    const BTSOW_DOMAIN = 'btsow.beauty';
    const JAVDB_DOMAIN = 'javdb007.com';
    const TORRENTKITTY_DOMAIN = 'www.torrentkitty.live';
    
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
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，/';
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423f
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     * @param {string} fmt 日期格式
     * @returns {void | string} 格式化后的日期字符串
     */
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
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
     * @param {Number} n 正整数, 线程数量
     */
    function Queue(n) {
        n = parseInt(n, 10);
        return new Queue.prototype.init((n && n > 0) ? n : 1)
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
         * @param {Function} callback promise对象done时的回调函数，它的返回值必须是一个promise对象
         */
        push: function (callback) {
            if (typeof callback !== 'function') return;
            var index = this.indexOfIdle();
            if (index != -1) {
                this.threads[index].idle(callback);
                //try { console.log('Thread-' + (index+1) + ' accept the task!') } catch (e) {}
            } else {
                this.taskList.push(callback);
                for (var i = 0, l = this.threads.length; i < l; i++) {
                    ((thread, self, id) => {
                        thread.idle(() => {
                            if (self.taskList.length > 0) {
                                //try { console.log('Thread-' + (id+1) + ' accept the task!') } catch (e) {}
                                let promise = self.taskList.shift()(); // 正确的返回值应该是一个promise对象
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
            this.idle = (callback) => {
                this.promise = this.promise.then(callback)
            }
        }
    };
    Queue.prototype.init.prototype = Queue.prototype;

    /**
 * 公用类
 */
    class Common {
        static init() {
            // 是否新版本
            let isNewVersion = Common.compareVersions(GM_info.script.version, GM_getValue("javOldDriver_version", "0.0.1"));

            // 磁链访问地址初始化
            if (isNewVersion || GM_getValue('btsow_url', undefined) === undefined) {
                GM_setValue('btsow_url', BTSOW_DOMAIN);
            }
            if (isNewVersion || GM_getValue('btdig_url', undefined) === undefined) {
                GM_setValue('btdig_url', 'www.btdig.com');
            }
            if (isNewVersion || GM_getValue('nyaa_url', undefined) === undefined) {
                GM_setValue('nyaa_url', 'sukebei.nyaa.si');
            }
            if (isNewVersion || GM_getValue('torrentkitty_url', undefined) === undefined) {
                GM_setValue('torrentkitty_url', TORRENTKITTY_DOMAIN);
            }
            if (isNewVersion || GM_getValue('javdb_url', undefined) === undefined) {
                GM_setValue('javdb_url', JAVDB_DOMAIN);
            }
            if (isNewVersion || GM_getValue('javlib_url', undefined) === undefined) {
                GM_setValue('javlib_url', 'www.javlibrary.com');
            }
            if (isNewVersion || GM_getValue('javbus_url', undefined) === undefined) {
                GM_setValue('javbus_url', 'www.javbus.com');
            }
            if (isNewVersion || GM_getValue('avsox_url', undefined) === undefined) {
                GM_setValue('avsox_url', 'avsox.click');
            }
            GM_setValue("javOldDriver_version", GM_info.script.version);

            GM_registerMenuCommand('设置', () => { Common.openSystemConfig() });
        }

        static openSystemConfig() {
            let scroll_true = '';
            if (GM_getValue('scroll_status', 1) !== 0) {
                GM_setValue('scroll_status', 1);
                scroll_true = "checked";
            }

            let dom = `<div>
                       <label class="tm-setting">jav各站开启瀑布流(自动加载下一页)<input type="checkbox" id="scroll_true" ${scroll_true} class="tm-checkbox"></label>
                    <label class="tm-setting">javdb网址<input type="text" id="javdb_url" class="tm-text" value="${GM_getValue('javdb_url')}"></label>
                       <label class="tm-setting">btsow网址<input type="text" id="btsow_url" class="tm-text" value="${GM_getValue('btsow_url')}"></label>
                       <label class="tm-setting">btdig网址<input type="text" id="btdig_url" class="tm-text" value="${GM_getValue('btdig_url')}"></label>
                       <label class="tm-setting">nyaa网址<input type="text" id="nyaa_url" class="tm-text" value="${GM_getValue('nyaa_url')}"></label>
                    <label class="tm-setting">torrentkitty网址<input type="text" id="torrentkitty_url" class="tm-text" value="${GM_getValue('torrentkitty_url')}"></label>
                       <label class="tm-setting">javlib网址<input type="text" id="javlib_url" class="tm-text" value="${GM_getValue('javlib_url')}"></label>
                       <label class="tm-setting">javbus网址<input type="text" id="javbus_url" class="tm-text" value="${GM_getValue('javbus_url')}"></label>
                       <label class="tm-setting">avsox网址<input type="text" id="avsox_url" class="tm-text" value="${GM_getValue('avsox_url')}"></label>
                    </div>`;
            let $dom = $(dom);
            Swal.fire({
                title: '脚本设置',
                html: $dom[0],
                confirmButtonText: '保存'
            }).then((result) => {
                if (result.value) {
                    if ($('#scroll_true')[0].checked) {
                        GM_setValue('scroll_status', 1);
                    } else {
                        GM_setValue('scroll_status', 0);
                    }
                    GM_setValue('btsow_url', $('#btsow_url').val());
                    GM_setValue('btdig_url', $('#btdig_url').val());
                    GM_setValue('nyaa_url', $('#nyaa_url').val());
                    GM_setValue('torrentkitty_url', $('#torrentkitty_url').val());
                    GM_setValue('javdb_url', $('#javdb_url').val());
                    GM_setValue('javlib_url', $('#javlib_url').val());
                    GM_setValue('javbus_url', $('#javbus_url').val());
                    GM_setValue('avsox_url', $('#avsox_url').val());
                    history.go(0);
                }
            })
        }
        /**
         * 版本号比较方法
         * 传入两个字符串，当前版本号：curV；比较版本号：reqV
         * @param {string} curV 当前版本号
         * @param {string} reqV 比较版本号
         * @returns {boolean} 调用方法举例：compare("3.1.10","3.1.9")，将返回true
         */
        static compareVersions(curV, reqV) {
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
        }
        /**
         * 设置cookie
         * @param {string} cname  名字
         * @param {string} cvalue 值
         */
        static setCookie(cname, cvalue) {
            let d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        /**
         * html文本转换为Document对象 https://jsperf.com/domparser-vs-createelement-innerhtml/3
         * @param {string} text
         * @returns {Document}
         */
        static parsetext(text) {
            try {
                let doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = text;
                return doc;
            } catch (e) {
                alert('parse error');
            }
        }

        /**
         * 判断日期是否最近X个月份的日期
         * @param {String} DateStr 日期
         * @param {Number} MonthNum 月数(X)
         * @returns {boolean}
         */
        static isLastXMonth(DateStr, MonthNum) {
            let now = new Date(); //当前日期
            let compDate = new Date(DateStr);
            let m2 = now.getFullYear() * 12 + now.getMonth();
            let m1 = compDate.getFullYear() * 12 + compDate.getMonth();
            if ((m2 - m1) < MonthNum) {
                return true;
            }
            return false;
        }

        /**
         * 方法: 通用chrome通知
         * @param {string} title
         * @param {string} body
         * @param {string} icon
         * @param {string} click_url
         */
        static notifiy(title, body, icon, click_url) {
            var notificationDetails = {
                text: body,
                title: title,
                timeout: 3000,
                image: icon,
                onclick: () => {
                    window.open(click_url);
                }
            };
            GM_notification(notificationDetails);
        }

        /**
         * 发起网络请求
         * @param {string} url 对象参数
         * @param {string} referrer
         * @param {number} timeoutInt 超时毫秒数
         * @returns {Promise} 
         */
        static request(url, referrerStr, timeoutInt) {
            return new Promise((resolve, reject) => {
                console.log(`发起网址请求：${url}`);
                GM_xmlhttpRequest({
                    url,
                    method: 'GET',
                    headers: {
                        "Cache-Control": "no-cache",
                        referrer: referrerStr
                    },
                    timeout: timeoutInt > 0 ? timeoutInt : 20000,
                    onload: response => { //console.log(url + " reqTime:" + (new Date() - time1));
                        response.loadstuts = true;
                        resolve(response);
                    },
                    onabort: response => {
                        console.log(url + " abort");
                        response.loadstuts = false;
                        resolve(response);
                    },
                    onerror: response => {
                        console.log(url + " error");
                        console.log(response);
                        response.loadstuts = false;
                        resolve(response);
                    },
                    ontimeout: response => {
                        console.log(`${url} ${timeoutInt > 0 ? timeoutInt : 20000}ms timeout`);
                        response.loadstuts = false;
                        response.finalUrl = url;
                        resolve(response);
                    },
                });
            });
        }

        /**
         * 发起网络请求
         * @param {*} details 对象参数
         * @returns {Promise} 
         */
        static requestGM_XHR(details) {
            return new Promise((resolve, reject) => {
                console.log(`发起网址请求：${details.url}`);
                let req = GM_xmlhttpRequest({
                    method: details.method ? details.method : "GET",
                    url: details.url,
                    headers: details.headers,
                    timeout: details.timeout > 0 ? details.timeout : 20000,
                    onprogress: rsp => {
                        if (details.onprogress && details.onprogress(rsp)) {
                            resolve(rsp);
                            req.abort();
                        }
                    },
                    onload: rsp => resolve(rsp),
                    onerror: rsp => {
                        console.log(`${details.url} : error`);
                        reject(`error`);
                    },
                    ontimeout: rsp => {
                        console.log(`${details.url} ${details.timeout > 0 ? details.timeout : 20000}ms timeout`);
                        reject(`timeout`);
                    }
                });
            });
        }

        /**
         * 获取带-的番号 
         * @param {String} avid 番号如:ABP888
         * @returns {String}  带-的番号
         */
        static getAvCode(avid) {
            // 带-的番号不处理，除了-0 如：DSVR-01167
            if (avid.match(/-[^0]/g)) return avid;
            // 999999_001,999999-001 不处理
            if (avid.match(/^[0-9-_]+$/g)) return avid;
            // crazyasia99999,sm999,video_999,BrazzersExxtra.99.99.99 不处理
            if (avid.match(/^(crazyasia|sm|video_|BrazzersExxtra)+/gi)) return avid;
            let letter = avid.match(/[a-z|A-Z]+/gi);
            let num = avid.match(/\d+$/gi)[0];
            if (num.length > 3) {
                num = num.replace(/\b(0+)/gi, ""); //去除开头的0
                if (num.length < 3) {
                    num = (Array(3).join(0) + num).slice(-3);
                }
            }
            return letter.toString().replace(/,/g, "-") + "-" + num;
        }
        /**
         * 通过图片或视频url解析出DmmId
         * @param {String} url 带DmmId的图片或视频url
         * @returns {String}  DmmId的番号
         */
        static getDmmId(url) {
            //let url = "https://pics.dmm.co.jp/digital/video/1mtall028/1mtall028-2.jpg";
            let array = url.split("/");
            let dmmId = array[array.length - 2];
            //结尾数字串
            let num = dmmId.match(/\d+$/gi);
            //前缀
            let prefix = dmmId.replace(num, "");

            if (num) {
                //非00开头的数字同时字符数小于5的，添加00开头
                if (!num[0].match(/^00/) && num[0].length < 5) {
                    num = '00' + num;
                }
                return prefix + num;
            } else {
                return null;
            }
        }
        /**
         * 根据avid转成dmmId即cid
         * @param {string} avid 番号
         * @returns {string}  dmmId dmm的cid番号
         */
        static avIdToDmmId(avid) {
            // todo:待优化
            return avid;
        }
        /**
         * 获取查询onejav的url
         * @param {string} avid 番号
         * @returns {string}  返回符合onejav查询番号参数的url
         */
        static getOneJavSearchUrl(avid) {
            //FC2-PPV-9999999 => 9999999 , ABP-999 => ABP999
            avid = avid.replace(/-|FC2|PPV/g, "");
            return "https://onejav.com/search/" + avid;
        }
        /**
         * 获取查询blogjav的番号处理过后的查询字符
         * @param {string} avid 番号
         * @returns {string}  返回番号处理过后的查询字符
         */
        static getBlogJavSearchVal(avid) {
            //FC2-PPV-9999999 => FC2+PPV+9999999 , HEYZO-9999 => HEYZO+9999
            let cd = avid.replace(/-/g, "+");
            // 不含空格的情况,同时只含有字母与数字
            if (!(/\s+/g).test(cd) && (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/g).test(cd)) {
                // ABP999 => ABP+999
                // 取结尾数字
                let num = cd.match(/\d+$/gi);
                //前缀
                let prefix = cd.replace(num, "");
                cd = prefix + "+" + num;
            }
            return cd;
        }
        /**
         * 获取查询jav321的url
         * @param {string} avid 番号
         * @returns {Promise}  返回符合Jav321查询番号参数的url
         */
        static getJav321SearchUrl(avid) {
            // 测试 todo
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "POST",
                    url: 'https://www.jav321.com/search',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: "sn=" + avid,
                    timeout: 20000,
                    onload: (r) => resolve(r.finalUrl),
                    onerror: (r) => reject(`查找jav321的 ${avid} 出错了`),
                    ontimeout: (r) => reject(`查找jav321的 ${avid} 超时了`)
                });
            });
        }
        /**
         * 获取查询javstore的url
         * @param {string} avid 番号
         * @returns {Promise}  返回符合JavStore查询番号参数的url
         */
        static getJavStoreSearchUrl(avid) {
            let promise1 = Common.request(`https://javstore.net/search/${avid}.html`);
            return promise1.then((result) => {
                if (!result.loadstuts) return;
                let doc = Common.parsetext(result.responseText);
                // 查找包含avid番号的a标签数组
                let a_array = $(doc).find(`.news_1n li h3 span a`);
                let a = a_array[0];
                //如果找到全高清大图优先获取全高清的
                for (let i = 0; i < a_array.length; i++) {
                    // 筛选匹配的番号数据  FC2-PPV-9999999 => 正则/FC2.*PPV.*9999999/gi
                    let reg = RegExp(avid.replace(/-/g, ".*"), "gi");
                    if (a_array[i].title.search(reg) > 0) {
                        if (!a) a = a_array[i];
                        let fhd_idx = a_array[i].title.search(/Uncensored|FHD/i);
                        if (fhd_idx >= 0) {
                            a = a_array[i];
                            break;
                        }
                    }
                }

                return a ? `https://javstore.net${a.pathname}` : null;
            });
        }
        /**
         * jav321链接加入鼠标点击打开页面事件
         * @param {jQuery} $ele 链接元素
         * @param {String} avid 番号
         * @returns {jQuery} 链接元素
         */
        static jav321LinkMousedown($ele, avid) {
            $ele.mousedown((e) => {
                //鼠标左键 0  鼠标中键滚轮 1
                if (e.button < 2) {
                    Common.getJav321SearchUrl(avid).then((url) => {
                        if (url && !(/https:\/\/www.jav321.com\/search/).test(url)) {
                            GM_openInTab(url, { active: !e.button, insert: true, setParent: true });
                        } else {
                            Common.notifiy(`Jav321查无此番号: ${avid}`, '换个JAV站点查找试试吧!', icon, "");
                        }
                    }).catch((errMsg) => Common.notifiy(errMsg));
                }
            });
            return $ele;
        }
        /**
         * javstor链接加入鼠标点击打开页面事件
         * @param {jQuery} $ele 链接元素
         * @param {String} avid 番号
         * @returns {jQuery} 链接元素
         */
        static javstoreLinkMousedown($ele, avid) {
            $ele.mousedown((e) => {
                //鼠标左键 0  鼠标中键滚轮 1
                if (e.button < 2) {
                    //FC2-PPV-9999999 => FC2+PPV+9999999 , HEYZO-9999 => HEYZO+9999
                    avid = avid.replace(/-/g, "+");
                    Common.getJavStoreSearchUrl(avid).then((url) => {
                        if (url) {
                            GM_setValue(url, avid);
                            GM_openInTab(url, { active: !e.button, insert: true, setParent: true });
                        } else {
                            Common.notifiy(`JavStore查无此番号: ${avid}`, '换个JAV站点查找试试吧!', icon, "");
                        }
                    });
                }
            });
            return $ele;
        }
        /**
         * 加入AV预览内容图使用的CSS
         */
        static addAvImgCSS() {
            GM_addStyle(`
                    .min {max-height: 535px;height:auto;cursor: pointer;} /*Common.addAvImg使用*/
                    .max {min-width: 1520px;} /*Common.addAvImg使用*/
                `);
        }
        /**
         * 加入AV预览内容图
         * @param {string} avid av唯一码
         * @param {function} func 函数
         * @param {boolean} isZoom 是否放大,默认true
         */
        static addAvImg(avid, func, isZoom) {
            let p = Common.getBigPreviewImgUrlFromBlogjav(avid);
            let p2 = Common.getBigPreviewImgUrlFromJavStore(avid);
            p.then(imgUrl => {
                if (imgUrl === null) {
                    addJavArchiveImg.call(this);
                    return;
                }

                Common.requestGM_XHR({
                    method: 'HEAD',
                    url: imgUrl,
                    headers: { 'referrer': imgUrl.replace(/^(https?:\/\/[^\/#&]+).*$/, '$1') },
                    timeout: 5000
                }).then(result => {
                    if (result.status == 200 && (imgUrl.replace(/^https?:\/\//, '') == result.finalUrl.replace(/^https?:\/\//, '') || result.finalUrl.search(/removed.png/i) < 0)) {
                        GM_deleteValue(`temp_img_url_${avid}`);
                        addImg(imgUrl, func, isZoom);
                        Promise.resolve();
                    } else {
                        return Promise.reject("error");
                    }
                }).catch(msg => {
                    console.log("blogjav获取的图片地址已经被移除或加载失败" + msg);
                    addJavArchiveImg.call(this);
                });

                function addJavArchiveImg() {
                    p2.then(url => {
                        imgUrl = GM_getValue(`temp_img_url_${avid}`, "");
                        if (imgUrl === "") {
                            console.log(`${avid} 没有找到预览图`);
                            addImg(EMPTY_IMAGE_DATA, func, false);
                        } else {
                            GM_deleteValue(`temp_img_url_${avid}`);
                            addImg(imgUrl, func, isZoom);
                        }
                    });
                }

                function addImg(targetImgUrl, func, isZoom) {
                    console.log("显示的图片地址:" + targetImgUrl);
                    //创建img元素,加载目标图片地址
                    //创建新img元素
                    let className = "max";
                    if (isZoom != undefined && !isZoom) {
                        className = "min";
                    }
                    let $img = $(`<img id="javRealImg" title="点击可放大缩小 (图片正常时)" class="${className}"></img>`);
                    $img.attr("src", targetImgUrl);
                    $img.attr("style", "float: left;cursor: pointer;");
                    $img.click(function () {
                        if ($(this).hasClass('max')) {
                            $(this).attr("class", 'min');
                            this.parentElement.parentElement.scrollIntoView();
                        }
                        else {
                            $(this).attr("class", 'max');
                        }
                    });
                    //将新img元素插入指定位置
                    func($img);
                }
            });
        }
        /**
         * 根据番号从blogjav获取大预览图Url
         * @param {string} avid av唯一码
         * @returns {Promise} 大预览图Url地址
         */
        static getBigPreviewImgUrlFromBlogjav(avid) {
            // oneJav 取消获取blogjav预览图
            if ((/(OneJAV)/g).test(document.title)) {
                return Promise.resolve(null);
            }
            //请求搜索blogjav.net的番号
            return Common.request(`https://www.bing.com/search?q=${Common.getBlogJavSearchVal(avid)}+site:blogjav.net&mkt=ja-JP`, "", 15000).then((result) => {
                if (!result.loadstuts) {
                    console.log("从bing查找blogjav番号出错");
                    return null;
                }
                var doc = Common.parsetext(result.responseText);
                let a_array = $(doc).find("#b_results .b_algo h2 a");
                let a = null;
                console.log("avid:" + avid);
                //如果找到全高清大图优先获取全高清的
                for (let i = 0; i < a_array.length; i++) {
                    if (i == 5) break;
                    // 筛选匹配的番号数据  mium-999 => 正则/mium.*999/gi
                    let reg = RegExp(avid.replace(/-/g, ".*"), "gi");
                    if (a_array[i].innerHTML.search(reg) > 0) {
                        if (!a) a = a_array[i];
                        var fhd_idx = a_array[i].innerHTML.search(/FHD/i);
                        if (fhd_idx > 0) {
                            a = a_array[i];
                            break;
                        }
                    }
                };
                return Promise.resolve(a);
            }).then(a => {
                if (a) {
                    return Promise.resolve(a);
                } else {
                    return Common.request(`https://blogjav.net/?s=${Common.getBlogJavSearchVal(avid)}`, "", 15000).then((result) => {
                        if (!result.loadstuts) {
                            console.log("从blogjav查找番号出错");
                            return null;
                        }
                        var doc = Common.parsetext(result.responseText);
                        let a_array = $(doc).find(".entry-title a");
                        let a = null;
                        console.log("avid:" + avid);
                        //如果找到全高清大图优先获取全高清的
                        for (let i = 0; i < a_array.length; i++) {
                            if (i == 5) break;
                            // 筛选匹配的番号数据  mium-999 => 正则/mium.*999/gi
                            let reg = RegExp(avid.replace(/-/g, ".*"), "gi");
                            if (a_array[i].innerHTML.search(reg) > 0) {
                                if (!a) a = a_array[i];
                                var fhd_idx = a_array[i].innerHTML.search(/FHD/i);
                                if (fhd_idx > 0) {
                                    a = a_array[i];
                                    break;
                                }
                            }
                        };
                        return Promise.resolve(a);
                    });
                }
            }).then(a => {
                let targetImgUrl = "";
                if (a) {
                    //请求调用内页详情的访问地址
                    return Common.request(a.href, "https://pixhost.to/", 15000).then((result) => {
                        if (!result.loadstuts) return null;
                        let doc = Common.parsetext(result.responseText);
                        let img_array = $(doc).find('.entry-content a img[data-lazy-src*="imagetwist."],.entry-content a img[data-lazy-src*="pixhost."]');

                        //如果找到内容大图
                        if (img_array.length > 0) {
                            var new_img_src = $(img_array[img_array.length - 1]).data('lazySrc');
                            targetImgUrl = new_img_src.replace('thumbs', 'images').replace('//t', '//img').replace(/[\?*\"*]/, '').replace('/th/', '/i/');
                            if (/imagetwist/gi.test(targetImgUrl)) targetImgUrl = targetImgUrl.replace('.jpg', '.jpeg');
                            console.log("blogjav获取的图片地址:" + targetImgUrl);
                            if (targetImgUrl.length === 0) {
                                return null;
                            } else {
                                return targetImgUrl;
                            }
                        } else {
                            return null;
                        }
                    });
                } else {
                    return Promise.resolve(null);
                }
            });
        }
        /**
         * 根据番号从JavStore获取大预览图Url，并且缓存到GM中
         * @param {string} avid av唯一码
         */
        static getBigPreviewImgUrlFromJavStore(avid) {
            //异步请求搜索JavStore的番号
            GM_setValue(`temp_img_url_${avid}`, "");
            let promise1 = Common.request(`https://javstore.net/search/${avid}.html`);
            return promise1.then((result) => {
                if (!result.loadstuts) return;
                let doc = Common.parsetext(result.responseText);
                // 查找包含avid番号的a标签数组,忽略大小写
                let a_array = $(doc).find(`.news_1n li h3 span a`);
                let a = a_array[0];
                //如果找到全高清大图优先获取全高清的
                for (let i = 0; i < a_array.length; i++) {
                    // 筛选匹配的番号数据  FC2-PPV-9999999 => 正则/FC2.*PPV.*9999999/gi
                    let reg = RegExp(avid.replace(/-/g, ".*"), "gi");
                    if (a_array[i].title.search(reg) > 0) {
                        if (!a) a = a_array[i];
                        let fhd_idx = a_array[i].title.search(/Uncensored|FHD/i);
                        if (fhd_idx >= 0) {
                            a = a_array[i];
                            break;
                        }
                    }
                }
                if (a) {
                    //异步请求调用内页详情的访问地址
                    let promise2 = Common.request(`https://javstore.net${a.pathname}`, "http://pixhost.to/");
                    return promise2.then((result) => {
                        if (!result.loadstuts) return;
                        let doc = Common.parsetext(result.responseText);
                        let img_array = $(doc).find('.news a font[size*="+1"],.news a img[alt*=".th"]');
                        if (img_array.length > 0) {
                            let imgUrl = img_array[img_array.length - 1].parentElement.href;
                            if(img_array[0].tagName === 'IMG'){
                                imgUrl = img_array[img_array.length - 1].src;
                                imgUrl = imgUrl ? imgUrl : img_array[0].dataset.src;
                                imgUrl = imgUrl.replace('pixhost.org', 'pixhost.to').replace('.th', '')
                                    .replace('thumbs', 'images').replace('//t', '//img').replace(/[\?*\"*]/, '');                            
                            }

                            return Common.requestGM_XHR({
                                method: 'HEAD',
                                url: imgUrl,
                                headers: { 'referrer': imgUrl.replace(/^(https?:\/\/[^\/#&]+).*$/, '$1') },
                                timeout: 5000
                            }).then(result => {
                                if (result.status == 200 && (imgUrl.replace(/^https?:\/\//, '') == result.finalUrl.replace(/^https?:\/\//, '') || result.finalUrl.search(/removed.png/i) < 0)) {
                                    console.log("javstore获取的图片地址:" + imgUrl);
                                    GM_setValue(`temp_img_url_${avid}`, imgUrl);
                                    return Promise.resolve(imgUrl);
                                } else {
                                    console.log("javstore获取的图片地址已经被移除或加载失败");
                                    return Promise.resolve();
                                }
                            });
                        }
                    });
                }
            });
        }
        /**
         * 获取Dmm对应番号的数据
         * @param {string} dmmIdUrl DmmId网址 
         * @returns {Promise}  Promise内实现异步返回参数dmmData
         */
        static getDmmData(dmmIdUrl) {
            if (!dmmIdUrl) return Promise.resolve(null);
            //异步请求dmm的番号页面
            return Common.requestGM_XHR({
                url: dmmIdUrl,
                timeout: 15000,
                headers: {
                    "Accept-Language": "ja-JP", //突破dmm地区访问限制，部分作品限制日本ip访问，例如STARS-706
                    "cookie": "age_check_done=1;" //跳过18岁以上限制
                },
            }).then((result) => {
                var doc = Common.parsetext(result.responseText);
                let dmmData = {};
                dmmData.collect_num = $(doc).find(".tx-count span").text();
                dmmData.score = $(doc).find(".d-review__average strong").text();
                dmmData.user_num = $(doc).find(".d-review__evaluates strong").text();
                dmmData.url = dmmIdUrl;
                dmmData.finalUrl = result.finalUrl;
                return dmmData; 
            }).catch(msg => {
                return {};
            });
        }
        /**
         * 获取JavDb对应番号的数据
         * @param {string} avid av编号 
         * @returns {Promise}  Promise内实现异步返回参数javdbData
         */
        static getJavDbData(avid) {
            return new Promise((resolve, reject) => {
                let promise = Common.request("https://" + GM_getValue('javdb_url') + "/search?f=all&q=" + avid);
                promise.then((result) => {
                    if (!result.loadstuts) {
                        console.log("javdb获取番号数据出错");
                    }
                    let doc = Common.parsetext(result.responseText);
                    let a = $(doc).find(`.box .video-title:contains('${avid.toUpperCase()}')`);
                    if (a.length) {
                        let javdbData = {};
                        javdbData.score = $(a[0].parentElement).find('.score>span').text();
                        javdbData.url = a[0].parentElement.href.replace(location.origin, 'https://' + [GM_getValue('javdb_url')]);
                        resolve(javdbData);
                    } else {
                        reject("javdb没查找到此番号");
                    }
                });
            });
        }
        /**
         * 查询115网盘是否拥有番号
         * @param {string} javId 番号
         * @param {Function} callback 回调函数
         */
        static search115Data(javId, callback) {
            //异步请求搜索115番号 //115查询
            let javId2 = javId.replace(/(-)/g, ""); //把番号-去除，例如ABC-123 =》 ABC123
            let javId3 = javId.replace(/(-)/g, "00"); //把番号-替换为00，例如CCVR-065 =》 CCVR00065
            let javId4 = javId.replace(/(-)/g, "-0"); //把番号-替换为-0，例如DSVR-584 =》 DSVR-0584
            //保存查询关键词参数
            GM_setValue("115_search_var", `${javId}|${javId2}|${javId3}|${javId4}`);
            let promise1 = Common.request(`https://webapi.115.com/files/search?search_value=${javId}%20${javId2}%20${javId3}%20${javId4}&format=json`);
            promise1.then((result) => {
                let resultJson = JSON.parse(result.responseText);
                if (resultJson.count > 0) {
                    let pickcode = '';
                    let reg = new RegExp(GM_getValue("115_search_var"), "gi");
                    for (let i = 0; i < resultJson.data.length; i++) {
                        let row = resultJson.data[i];
                        if (row.play_long && (row.n.search(reg) >= 0)) { //iv vdi ico play_long
                            pickcode = row.pc;
                            callback(true, `https://v.anxia.com/?pickcode=${pickcode}`, pickcode);
                            return;
                        }
                    }
                }
                callback(false, null, null);
            });
        }
        /**
         * 查询夸克网盘是否拥有番号
         * @param {string} javId 番号
         * @returns {Promise}  Promise内返回参数resultData
         */
        static searchQuarkData(javId) {
            //异步请求搜索夸克番号
            let javId2 = javId.replace(/(-)/g, " "); //把番号-去除，例如ABC-123 =》 ABC 123
            let javId3 = javId.replace(/(-)/g, "00"); //把番号-替换为00，例如CCVR-065 =》 CCVR00065
            let javId4 = javId.replace(/(-)/g, "-0"); //把番号-替换为-0，例如DSVR-584 =》 DSVR-0584
            //保存查询关键词参数
            GM_setValue("quark_search_var", `${javId}|${javId2}|${javId3}|${javId4}`);
            let p1 = Common.request(`https://drive.quark.cn/1/clouddrive/file/search?pr=ucpro&fr=pc&q=${javId2}&_page=1&_size=50&_fetch_total=1&_sort=file_type:desc,updated_at:desc&_is_hl=1`);
            return p1.then((result) => {
                let resultJson = JSON.parse(result.responseText);
                if (resultJson.status == 200 && resultJson.metadata._count > 0) {
                    let reg = new RegExp(GM_getValue("quark_search_var"), "gi");
                    for (let i = 0; i < resultJson.data.list.length; i++) {
                        let row = resultJson.data.list[i];
                        if (row.duration && (row.file_name.search(reg) >= 0)) { //时长、文件名判断
                            return Promise.resolve({
                                isHave: true,
                                playUrl: `https://pan.quark.cn/list#/video/${row.fid}`,
                                pickcode: row.fid
                            });
                        }
                    }
                }
                return Promise.resolve({ isHave: false });
            });
        }
        /**
         * 查找番号是否存在于缓存
         * @param {string} javId 番号
         * @returns {boolean}
         */
        static browseJavidHasCache(javId) {
            return GM_getValue("myBrowseJavidArray", '[]').indexOf(javId) > 0 ? true : false;
        }
        /**
         * 保存番号到GM缓存
         * @param {string} javId 番号
         */
        static addBrowseJavidCache(javId) {
            if (!this.browseJavidHasCache(javId)) {
                let myBrowseJavidArray = JSON.parse(GM_getValue("myBrowseJavidArray", '[]'));
                myBrowseJavidArray.push(javId);
                GM_setValue("myBrowseJavidArray", JSON.stringify(myBrowseJavidArray));
            }
        }
        static getSchemaBuilder() {
            // 构造jav库
            let ds = lf.schema.create('jav_v2', 5);
            // 创建MyMovie表
            ds.createTable('MyMovie').
                //addColumn('id', lf.Type.INTEGER).
                //索引编码 如javlikqu54
                addColumn('index_cd', lf.Type.STRING).
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
        }
    };

    class Jav {
        /**
         * 加载数据  todo 改进
         * @param {String} pageName 访问网页名
         */
        static loadData(pageName, queue) {
            Common.toString();// 无此步骤Common作用域失效,暂时未知原因
            let todo = async () => {    // todo 190628
                await loadPageNumData(pageName, 1);
                for (let i = 2; i < GM_getValue(pageName + "_pageNum") + 1; i++) {
                    queue.push(() => {
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

        static loadPageNumData(pageName, PageNum) {
            let url = location.origin + "/cn/" + pageName + ".php?&sort=added&page=" + PageNum;// console.log("打开链接url:" + url);
            let commonClass = Common;// 无此步骤Common作用域失效,暂时未知原因
            let promise1 = Common.request(url);
            promise1.then((result) => {
                return new Promise(resolve => {
                    if ($.type(result) !== "function" && result.status !== 200) {
                        return resolve();
                    }
                    let doc = result.responseText;
                    //设置初始化总页数
                    if (PageNum == 1) {
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
         * @param {string} pageName 访问网页名
         */
        static mergeJson(pageName) {
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
                return loopMerge().then(() => {
                    console.log("doNum:" + (GM_getValue("doNum") + 1) + "  --" + pageName);
                    GM_setValue("doNum", GM_getValue("doNum") + 1);
                });
            }
        }

        /**
          * JSON数组去重
          * @param {Array} array Array
          * @param {string} key 唯一的key名，根据此键名进行去重
          * @param {function} func
          */
        static uniqueArray(array, key, func) {
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
         * javbus详情页磁链列表增加复制、115离线快捷键功能函数
         */
        static javbusUs() {
            $('#magnet-table tbody tr td[colspan="4"]').attr("colspan", "5");
            let tr_array = $('#magnet-table tr[height="35px"]');
            for (var i = 0; i < tr_array.length; i++) {
                let trEle = tr_array[i];
                let magnetUrl = $(trEle).find("td a")[0].href;
                $(trEle).append("<td style='text-align:center;'><div><a class='nong-copy' href='" + magnetUrl + "'>复制</a></div></td>");
                $(trEle).append("<td><div class='nong-offline'><a class='nong-offline-download' target='_blank' "
                    + "href='http://115.com/?tab=offline&amp;mode=wangpan'>115离线</a></div></td>");
                $(trEle).attr("maglink", magnetUrl);
                $(trEle).find(".nong-copy")[0].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
                $(trEle).find(".nong-offline-download")[0].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
            }
        }

        /**
         * 初始化同步保存数据方法
         */
        static syncSaveData() {
            GM_setValue("doNum", 0);//console.log("saveData");
            let pm1 = mergeJson("mv_wanted");
            let pm2 = mergeJson("mv_watched");
            let pm3 = mergeJson("mv_owned");

            Promise.all([pm1, pm2, pm3]).then(() => {
                console.log("mergeJson处理完毕");
                if (GM_getValue("doNum") === 3) {
                    let j1 = GM_getValue("mv_wanted_myBrowseJsonAll");
                    let j2 = GM_getValue("mv_watched_myBrowseJsonAll");
                    let j3 = GM_getValue("mv_owned_myBrowseJsonAll");
                    //let myBrowseAll = j3.substring(0, j3.length - 1);
                    let myBrowseAll = j1 + j2 + j3.substring(0, j3.length - 1);
                    let myBrowseArray = JSON.parse("[" + myBrowseAll + "]");

                    //json数组去重
                    myBrowseArray = this.uniqueArray(myBrowseArray, "index_cd", (item, resultObj) => {
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
                                'index_cd': jsonObj.index_cd,
                                'code': '',
                                'release_date': '',
                                'duration': '',
                                'director': '',
                                'maker': '',
                                'score': '',
                                'actor': '',
                                'cover_img_url': '',
                                'thumbnail_url': '',
                                'prev_img_url': '',
                                'movie_name': '',
                                'publisher': '',
                                'add_time': jsonObj.add_time,
                                'pick_code': '',
                                'is_browse': true,
                                'is_want': 2,
                                'is_seen': 2,
                                'is_have': 2,
                                'is_sync': false
                            });
                            javDb.insertOrReplace().into(myMovie).values([row]).exec();
                        }
                        // 如果保存影片数量大于等于需同步总数，则同步完成
                        if (GM_getValue(domain + "_saveMovieNum", 0) >= myBrowseArray.length) {
                            GM_setValue(domain + "_stepTwo_V3", true);
                            GM_setValue(domain + "_doDataSyncStepAll_V3", true);
                        }
                        console.log(domain + "_stepTwoTime:" + (new Date() - startTime));
                        return Promise.resolve();
                    }
                }
            });
        }

        static getMovie($doc) {
            return {
                index_cd: $('#video_title a', $doc).attr('href').split("v=")[1],
                code: $('.header', $doc)[0].nextElementSibling.textContent,
                release_date: $('#video_date .text', $doc).text(),
                duration: $('#video_length .text', $doc).text(),
                director: $('#video_director .text', $doc).text(),
                maker: $('#video_maker .text', $doc).text(),
                score: $('#video_review .text .score', $doc).text(),
                actor: $('#video_cast .text', $doc).text(),
                cover_img_url: $('#video_jacket_img', $doc).attr("src").replace("http://", "").replace("https://", ""),
                thumbnail_url: $('#video_jacket_img', $doc).attr("src").replace("http://", "").replace("https://", "").replace("pl", "ps"),
                prev_img_url: "",
                movie_name: $('#video_title a', $doc).text(),
                publisher: $('#video_label .text a', $doc).text(),
                add_time: (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
                pick_code: '',
                is_browse: true,
                is_want: ($('#subscribed .smallbutton.hidden', $doc).length > 0) ? 1 : 0,
                is_seen: ($('#watched .smallbutton.hidden', $doc).length > 0) ? 1 : 0,
                is_have: ($('#owned .smallbutton.hidden', $doc).length > 0) ? 1 : 0,
                is_sync: true
            }
        }
        /**
         * 同步movie信息到myMovie表中
         * @param result 页面响应结果
         */
        static syncMovie(result) {
            let commonClass = Common;// 无此步骤Common作用域失效,暂时未知原因
            let $doc = $(commonClass.parsetext(result.responseText));
            let movie = Jav.getMovie($doc);
            let myBrowseJsonArray = JSON.parse(GM_getValue("myBrowseAllData", "[]"));
            if (myBrowseJsonArray.length > 0) {
                let jsonObj = myBrowseJsonArray.filter((p) => {
                    return p.index_cd == result.finalUrl.split("v=")[1];
                });
                if (jsonObj.length > 0) movie.add_time = jsonObj[0].add_time;
            }
            let row = myMovie.createRow(movie);
            javDb.insertOrReplace().into(myMovie).values([row]).exec();
        }

        /**
         * javlib记录已阅影片
         */
        static javlibSaveData(AVID, pickcode, pm_mater) {
            let movie = Jav.getMovie($(document));
            movie.pick_code = pickcode;
            Common.addBrowseJavidCache(AVID);
            pm_mater.then(() => {
                //查找是否存在此番号数据
                return javDb.select().from(myMovie).where(myMovie.index_cd.eq(movie.index_cd)).exec()
                    .then((results) => {
                        if (results.length > 0) movie.add_time = results[0].add_time;
                        let row = myMovie.createRow(movie);
                        javDb.insertOrReplace().into(myMovie).values([row]).exec();
                        console.log(`${movie.code} 已经存入已阅影片`);
                    });
            });
        }

        /**
         * 针对页面的番号信息增加功能及样式修改. javlib和javbus共同使用
         * @returns {string} 番号
         */
        static getAvidAndChgPage() {
            let AVID = $('.header')[0].nextElementSibling.textContent;
            // 实现点击番号复制到系统剪贴板 todo 181221v1
            $('.header')[0].nextElementSibling.id = "avid";
            $('#avid').empty().attr("title", "点击复制番号").attr("avid", AVID);
            let a_avid = document.createElement('a');
            $(a_avid).attr("href", "#").append(AVID);
            $(a_avid).click(() => {
                GM_setClipboard($('#avid').attr("avid"));
            });
            $('#avid').append(a_avid);
            $('#avid').after("<span style='color:red;'>(←点击复制)</span>");
            $($('.header')[0]).attr("class", "header_hobby");
            return AVID;
        }

        static waterfallButton() {
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
                    GM_setValue('scroll_status', 0);
                } else {
                    GM_setValue('scroll_status', 1);
                }
                window.location.reload();
            });
            return a3;
        }

        static javlibaryScript() {
            let a3 = this.waterfallButton();
            if ((/(JAVLibrary)/g).test(document.title)) {
                //数据库初始化  start01
                var pm_mater = Common.getSchemaBuilder().connect({
                    storeType: lf.schema.DataStoreType.INDEXED_DB
                }).then((database) => {
                    javDb = database;
                    myMovie = javDb.getSchema().table('MyMovie');
                    //javDb.delete().from(myMovie).exec();// 清空MyMovie表数据.
                    return javDb.select().from(myMovie).where(myMovie.is_browse.eq(true)).exec();
                }).then((results) => {
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
                        (/(vl_genre|vl_searchbycombo|mv_owned|mv_watched|mv_wanted|mv_visited)/g).test(document.URL) ||
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
                        $(a1).click(() => {
                            let div_array = $("div.videos div.video");
                            div_array.sort((a, b) => {
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
                            div_array.sort((a, b) => {
                                let a_val = $(a).children("a").attr("title").indexOf("【VR】") >= 0 ? 1 : 0;
                                let b_val = $(b).children("a").attr("title").indexOf("【VR】") >= 0 ? 1 : 0;
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
                        $(a2).click(() => {
                            let div_array = $("div.videos div.video");
                            div_array.sort((a, b) => {
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
                    let isSync = GM_getValue(domain + "_doDataSyncStepAll_V3", false);
                    console.log(domain + "  是否同步过：" + isSync);
                    if (!isSync) {
                        pm_mater.then(() => {
                            return new Promise(resolve => {
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
                                    this.loadData("mv_wanted", queue);
                                    // 读取看过的影片
                                    this.loadData("mv_watched", queue);
                                    // 读取拥有的影片
                                    this.loadData("mv_owned", queue);
                                    // 延迟1秒运行定时循环函数
                                    setTimeout(() => {
                                        // 定时循环函数,当队列执行完成时结束
                                        var s4 = setInterval(() => {
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
                            this.syncSaveData();
                        });
                    }
                    // 增加同步数据到本地的触发按钮
                }

                // 新增VR发行菜单入口
                $('.menul1 ul li:contains("新发行")').after('<li><a href="vl_genre.php?g=aaua">VR发行</a></li>');

                // 处理javlib番号详情页面的脚本
                if ($('.header').length && $('meta[name="keywords"]').length) {
                    //获取番号影片详情页的番号  例如：http://www.javlibrary.com/cn/?v=javli7j724
                    let AVID = this.getAvidAndChgPage();

                    window.onload = () => {
                        $('iframe').remove();
                    };
                    let pickcode = '';

                    //增加预览图片大图链接
                    let imgs = $('.previewthumbs>img').clone();
                    $('.previewthumbs>img').remove();
                    imgs.each((i, img) => {
                        $('.previewthumbs').eq(0).append(`<a target="_blank" href="${img.src.replace("-", "jp-")}">${img.outerHTML}</a>`);
                    });

                    //加入坐标div，辅助插入元素
                    $('#video_genres').before(`<div id="zuobiao" class="item"></div>`);
                    let $div_zuobiao = $('#zuobiao');

                    //加入dmm评分数据
                    if (imgs.length) {
                        let dmmId = Common.getDmmId(imgs[0].src);
                        if (!dmmId) {
                            dmmId = Common.avIdToDmmId(AVID);
                        }

                        Common.getDmmData(`https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=${dmmId}/`).then((dmmData) => {
                            $div_zuobiao.before(addLinkHtml(dmmData));

                            function addLinkHtml(dmmData) {
                                return `
                                    <div id="video_review_dmm" class="item">
                                        <table><tbody><tr>
                                            <td class="header"><a target="_blank" href="${dmmData.url}">DMM评价:</a></td>
                                            <td><span class="text">${dmmData.score.replace("点", "分")}</span>, ${dmmData.user_num}人评, ${dmmData.collect_num}收藏</td>
                                        </tr></tbody></table>
                                    </div>
                                `;
                            }
                        });
                    }

                    //加入javdb评分数据
                    let p3 = Common.getJavDbData(Common.getAvCode(AVID));
                    p3.then((javdbData) => {
                        let score = javdbData.score.trim().replace("由", "").replace("人評價", "人评");
                        $div_zuobiao.after(`
                            <div id="video_review_javdb" class="item">
                                <table><tbody><tr>
                                    <td class="header"><a target="_blank" href="${javdbData.url}">javdb评价:</a></td>
                                    <td><span class="text">${score}</td>
                                </tr></tbody></table>
                            </div>
                        `);
                    }).catch(errMsg => { console.log(errMsg); });

                    let $div_video_cast = $('#video_cast');
                    //加入Jav跳转
                    $div_video_cast.after(`
                        <div id="javweb_jump" class="item">
                            <table><tbody><tr>
                                <td class="header">JAV跳转:</td>
                                <td id="linkJump">
                                    <span class="genre"><a href="https://${GM_getValue('javbus_url')}/${AVID}" target="_blank">JavBus</a></span>
                                </td>
                            </tr></tbody></table>
                        </div>
                    `);
                    // javstoreLink
                    let $span = $(`<span class="genre"><a href="javascript:void(0);">JavStore</a></span>`);
                    $('#linkJump').prepend(Common.javstoreLinkMousedown($span, AVID));


                    //加入在线预览跳转
                    $div_video_cast.after(`
                        <div id="video_webplayer" class="item">
                            <table><tbody><tr>
                                <td class="header">在线预览:</td>
                                <td>
                                    <span class="genre"><a href="https://missav.com/cn/${AVID}" target="_blank" title="需解封印" >missav</a></span>
                                    <span class="genre"><a href="https://7mmtv.tv/zh/censored_search/all/${AVID}/1.html" target="_blank" title="需解封印" >7mmtv</a></span>
                                    <span class="genre"><a href="https://supjav.com/zh/?s=${Common.getAvCode(AVID)}+${AVID}" target="_blank" title="需解封印">supjav</a></span>
                                </td>
                            </tr></tbody></table>
                        </div>
                    `);

                    $('#watched .smallbutton').html("放弃了");
                    $('#watched .smalldarkbutton.hidden').html("我放弃这片了");


                    //查找115是否有此番号
                    Common.search115Data(AVID, (BOOLEAN_TYPE, playUrl, pc) => {
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
                        //加入预览JAV全片截图
                        Common.addAvImg(Common.getAvCode(AVID), ($img) => {
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
                            }
                        }, !BOOLEAN_TYPE);

                        // 只支持javlibray处理已阅影片
                        this.javlibSaveData(AVID, pickcode, pm_mater);
                    });

                    //查找夸克是否有此番号
                    Common.searchQuarkData(AVID).then(result => {
                        if (result.isHave) {
                            let $imgObj = $('#video_jacket_img');
                            $imgObj.after(`
                                <div style="position: absolute;width: 100%;height: 12%;background: rgba(0,0,0,0.5);top: 88%;left: 0;">
                                    <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: left;">夸克网盘已有此片</p>
                                    <a target="_blank" href="${result.playUrl}">
                                    <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: right;width: 50%;">夸克在线播放 ►</p></a>
                                </div>
                            `);
                            $('#owned button[class="smallbutton"]').click();
                        }

                        // 只支持javlibray处理已阅影片
                        this.javlibSaveData(AVID, pickcode, pm_mater);
                    });

                    //标题去除超链接
                    $('#video_title h3').after($('#video_title a'));
                    $('#video_title h3').text($('#video_title a').text());
                    $('#video_title a').empty();

                    // 挊
                    thirdparty.nong.searchMagnetRun();
                }//番号影片详情页处理end
            }
        }

        static javBusScript() {
            let a3 = this.waterfallButton();
            if ((/(JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) {
                GM_addStyle(`
                    .info p {line-height: 18px!important;} 
                    .screencap img{	width:100%;	max-width: 1000px;}
                `);
                // 新增FC2菜单入口
                $('#navbar ul.nav.navbar-nav li:eq(0)')
                .after(`<li><a href="https://${GM_getValue('javdb_url')}/advanced_search?type=3&score_min=4.2&score_max=&released_start=&released_end=&actors%5B%5D=&tags%5B%5D=&p=0&d=0&d=1&c=0&s=0&i=0&v=0&commit=檢索&lm=h" target="_blank">FC2</a></li>`);
                // 新增VR菜单入口
                $('#navbar ul.nav.navbar-nav li:eq(0)').after('<li><a href="/search/VR&type=1">VR</a></li>');
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
                    let AVID = this.getAvidAndChgPage();
                    Common.addBrowseJavidCache(AVID);

                    //加入坐标div，辅助插入元素
                    $('p.header').before('<p id="zuobiao"></p>');
                    let $p_zuobiao = $('#zuobiao');

                    //加入dmm评分数据
                    let a_imgs = $('#sample-waterfall>a');
                    if (a_imgs.length && !$('a.avatar-box[href*="uncensored"]').length && !location.hostname.includes('javbus.org')
                        && $('#sample-waterfall>a[href*="pics.dmm"]').length) {
                        let p1 = Common.getDmmData(`https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=${Common.getDmmId(a_imgs[0].href)}/`);
                        p1.then((dmmData) => {
                            $p_zuobiao.before(`
                                <p>
                                    <span class="header">
                                        <a target="_blank" href="${dmmData.url}" style="color: blue;">
                                        DMM&nbsp;评:</a>
                                    </span>
                                    ${dmmData.score.replace("点", "分")}, ${dmmData.user_num}人评, ${dmmData.collect_num}收藏
                                </p>
                            `);
                        });
                    }

                    //加入javdb评分数据
                    Common.getJavDbData(AVID).then((javdbData) => {
                        let score = javdbData.score.trim().replace("由", "").replace("人評價", "人评");
                        $p_zuobiao.after(`
                            <p>
                                <span class="header"><a target="_blank" href="${javdbData.url}" style="color: blue;">javdb评:</a></span>
                                ${score}
                            </p>
                        `);
                    });

                    //查找115是否有此番号
                    Common.search115Data(AVID, (BOOLEAN_TYPE, playUrl, pc) => {
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
                        Common.addAvImg(AVID, ($img) => {
                            //https://www.javbus.com/CHN-141
                            let divEle = $("div[class='col-md-3 info']")[0];
                            $(divEle).attr("id", "video_info");
                            if (divEle) {
                                $(divEle.parentElement).append($img);
                            }
                        }, false);//javbus 默认不放大
                    });

                    //查找夸克是否有此番号
                    Common.searchQuarkData(AVID).then(result => {
                        if (result.isHave) {
                            let $imgObj = $('.bigImage');
                            $imgObj.after(`
                                <div style="position: absolute;width: 100%;height: 12%;background: rgba(0,0,0,0.5);top: 88%;left: 0;">
                                    <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: left;">夸克网盘已有此片</p>
                                    <a target="_blank" href="${result.playUrl}">
                                    <p style="color: white;font-size: 46px;margin: 0 0 0px;display: inline-block;text-align: right;width: 50%;">夸克在线播放 ►</p></a>
                                </div>
                            `);
                        }
                    });

                    //加入在线预览跳转
                    $('.col-md-3.info').append(`
                        <p>
                            <span class="header">在线预览:</span>
                            <a href="https://missav.com/cn/${AVID}" target="_blank" style="color: rgb(204, 0, 0);" title="需解封印">missav&nbsp;</a>
                            <a href="https://7mmtv.tv/zh/censored_search/all/${AVID}/1.html" target="_blank" style="color: rgb(204, 0, 0);" title="需解封印">7mmtv&nbsp;</a>
                            <a href="https://supjav.com/zh/?s=${AVID}" target="_blank" style="color: rgb(204, 0, 0);" title="需解封印">supjav&nbsp;</a>
                        </p>
                    `);
                    // 加入javlib的跳转链接
                    $('.col-md-3.info').append(`
                        <p id="linkJump">
                            <span class="header">JAV跳转:</span>
                            <a href="https://${GM_getValue('javlib_url')}/cn/vl_searchbyid.php?keyword=${AVID}" target="_blank" style="color: rgb(204, 0, 0);">JavLib&nbsp;</a>
                        </p>
                    `);
                    // javstoreLink
                    let $a = $(`<a title="综合 JAV资源站" href="javascript:void(0);" style="color: rgb(204, 0, 0);">JavStore&nbsp;</a>`);
                    $('#linkJump').append(Common.javstoreLinkMousedown($a, AVID));

                    // 修改javbus磁链列表头，增加两列
                    $('#magnet-table tbody tr').append('<td style="text-align:center;white-space:nowrap">操作</td><td style="text-align:center;white-space:nowrap">离线下载</td>');
                    // 先执行一次，针对已经提前加载出磁链列表结果时有效
                    this.javbusUs();
                    // 针对为提前加载出磁链列表结果，通过dom元素是否改变事件来判断是否执行功能。
                    $('#magnet-table').on("DOMNodeInserted", () => {
                        // 触发后关闭监听事件
                        $('#magnet-table').off();
                        this.javbusUs();
                    });

                    // 挊
                    thirdparty.nong.searchMagnetRun();
                }
            }
        }

        static oneJavScript() {
            if ((/(OneJAV)/g).test(document.title)) { //todo 190404
                GM_addStyle(`
                    .column.is-5 {max-width: 82%;width: auto;}
                    .column {flex-basis: inherit;flex-grow: inherit;width: 800px;}
                    .container {max-width: 100%;width: 100%;}
                    .has-text-grey-dark {max-width: 1000px;}
                    .image {width: auto; max-width: 800px;}
                `);
                // 插入自己创建的div
                $('div.container nav.pagination.is-centered').before("<div id='card' ></div>");
                // 将所有番号内容移到新建的div里
                $('div#card').append($('div.container div.card.mb-3'));
                // 瀑布流脚本
                thirdparty.waterfallScrollInit();
            }
        }

        static jav321Script() {
            if ((/(^JAV321)/g).test(document.body.innerText)) { //todo 190531
                Common.addAvImgCSS();
                GM_addStyle(`
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
                Common.search115Data(javID, (BOOLEAN_TYPE, playUrl, pc) => {
                    if (BOOLEAN_TYPE) {
                        let $imgObj = $('div.col-xs-12.col-md-12 img.img-responsive');
                        $imgObj.after(`
                            <div style="position: absolute;width: 100%;height: 22%;background: rgba(0,0,0,0.5);top: 78%;left: 0;">
                                <a target="_blank" href="${playUrl}"><p class="hobby_p">115在线播放 ►</p></a>
                            </div>
                        `);
                    }

                    //插入预览图
                    Common.addAvImg(javID, ($img) => {
                        //https://www.jav321.com/video/300mium-391
                        var divEle = $("div.col-md-9")[0];
                        //$(divEle).attr("id", "video_info");
                        if (divEle) {
                            $(divEle).after($img);
                        }
                    }, !BOOLEAN_TYPE);

                    Common.addBrowseJavidCache(javID);
                });

                $('.panel.panel-info:eq(0)').after($('.panel.panel-info:has(.table.table-striped)'));

                // 修改jav321磁链列表头，增加两列
                $('table.table.table-striped tbody tr:eq(0)').append('<th>操作</th><th>离线下载</th>');

                //详情页磁链列表增加复制、115离线快捷键功能函数
                let tr_array = $('table.table.table-striped tbody tr:gt(0)');
                for (var i = 0; i < tr_array.length; i++) {
                    let trEle = tr_array[i];
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

        static javDBScript() {
            if ((/(JavDB)/g).test(document.title)) {
                if ($('.app-desktop-banner').length) $('.app-desktop-banner').remove();
                if ($('.modal.is-active.over18-modal').length) $('.modal.is-active.over18-modal').remove();

                // 修改FC2菜单入口
                $('.navbar-dropdown.is-boxed .navbar-item:contains("FC2")')
                .attr("href","/advanced_search?type=3&score_min=4.2&score_max=&released_start=&released_end=&actors%5B%5D=&tags%5B%5D=&p=0&d=0&d=1&c=0&s=0&i=0&v=0&commit=檢索&lm=h");
                // 新增VR菜单入口
                $('.navbar-dropdown.is-boxed .navbar-item:eq(0)')
                .after('<a class="navbar-item" href="/advanced_search?type=0&score_min=4.2&score_max=&released_start=&released_end=&actors%5B%5D=&tags%5B%5D=&tags%5B%5D=212%7CVR&p=0&d=0&d=1&c=0&s=0&i=0&v=0&commit=檢索&lm=h">VR</a>');
                

                // 瀑布流脚本
                thirdparty.waterfallScrollInit();

                // 非小封面列表
                if (!$("#waterfall").hasClass("v cols-4 vcols-8")) {
                    // 如果没有，加入tabs元素
                    if (!$(".tabs.is-boxed").length) {
                        $("#waterfall").before(`<div class="tabs is-boxed" style="justify-content: flex-end;"></div>`);
                    }
                    // 加入一个锚点
                    $(".tabs.is-boxed").before(`<a name="maodian" style="position: relative;top: -60px;"></a>`);
                    // 加入排序与过滤功能
                    $('.tabs.is-boxed').append(`
                        <div style="display: flex;">
                            <div class="is-active" style="border: 1px solid #3273dc;">
                                <a id="javtopusernum" href="#maodian" style="background-color: white;color: #3273dc;font-weight: bold;">
                                    <span>评分人数排序</span>
                                </a>
                            </div>
                            <div class="is-active" style="border: 1px solid #3273dc;">
                                <a id="javtopscore" href="#maodian" style="background-color: white;color: #3273dc;font-weight: bold;">
                                    <span>JAV评分排序</span>
                                </a>
                            </div>
                            <div style="border: 1px solid #3273dc;background-color: #f5f5f5;height: 2.8em;display: flex;">
                                <a href="#maodian" style="color: #3273dc; font-weight: bold;">
                                    <span>屏蔽评分人数&nbsp&lt;&nbsp</span>
                                </a>
                                <input id="offusernum" name="offusernum" class="input" placeholder="0&nbsp人数" min="0" max="9999" type="number" 
                                        style="height: 1.5em;width: 5.5em;padding: 2px;margin: 0.6em 1em 0 0;">
                            </div>
                        </div>
                    `);

                    $('#javtopscore').click(() => {
                        let div_array = $(JAVDB_ITEM_SELECTOR);
                        div_array.sort((a, b) => {
                            let a_score = parseFloat($(a).attr("score"));
                            let b_score = parseFloat($(b).attr("score"));
                            if (a_score > b_score) {
                                return -1;
                            } else if (a_score === b_score) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });
                        // 删除Dom列表数据关系，重新添加排序数据
                        div_array.detach().appendTo("#waterfall");
                        $('#javtopscore').css("background-color", "#3273dc").css("color", "white");
                        $('#javtopusernum').css("background-color", "white").css("color", "#3273dc");
                    });

                    $('#javtopusernum').click(() => {
                        let div_array = $(JAVDB_ITEM_SELECTOR);
                        div_array.sort((a, b) => {
                            let a_score = parseFloat($(a).attr("usernum"));
                            let b_score = parseFloat($(b).attr("usernum"));
                            if (a_score > b_score) {
                                return -1;
                            } else if (a_score === b_score) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });
                        // 删除Dom列表数据关系，重新添加排序数据
                        div_array.detach().appendTo("#waterfall");
                        $('#javtopusernum').css("background-color", "#3273dc").css("color", "white");
                        $('#javtopscore').css("background-color", "white").css("color", "#3273dc");
                    });

                    $('#offusernum').change(() => {
                        let offusernum = $('#offusernum').val();
                        if (offusernum) {
                            $(JAVDB_ITEM_SELECTOR).toArray().forEach(e => {
                                parseInt($(e).attr("usernum")) < parseInt(offusernum) ? $(e).hide() : $(e).show();
                            });
                        }
                    });
                }
            }
        }

        static javStoreScript() {
            if ($('.all_page_javstore1 .danhgia_thich').length) {
                GM_addStyle(`
                    .category_news_main_right {width: 100%;}
                    .boxoright {width: calc((100%) - 460px)}
                    .boxoleft { background: #ffffff!important; width: 460px; padding: 0 5px;}
                    .boxoleft > div { margin: 0 0 0 0; }
                    .news_2n > h2 { margin: 10px 0 10px 0;}
                    .onlinePlayLink {font-size: large; margin: 0 0 0 38px;}
                `);
                // 移除左侧右侧
                if ($('.category_news_left_side,.slide_exlogo,.box_left_news.news_2n')) {
                    $('.category_news_left_side,.slide_exlogo,.box_left_news.news_2n').remove();
                }
                // 显示大预览图
                let img_array = $('.news a font[size*="+1"],.news a img[alt*=".th"]');
                //if (img_array.length == 0) $(doc).find('.news a img[alt*=".th"]');
                img_array.toArray().forEach(e => {
                    let imgUrl = e.parentElement.href;
                    if(e.tagName === 'IMG'){
                        imgUrl = img_array[img_array.length - 1].src;
                        imgUrl = imgUrl ? imgUrl : img_array[0].dataset.src;
                        imgUrl = imgUrl.replace('pixhost.org', 'pixhost.to').replace('.th', '')
                            .replace('thumbs', 'images').replace('//t', '//img')
                            .replace(/[\?*\"*]/, '');
                    }
                    e.parentElement.href = "#";
                    e.parentElement.target = "";
                    e.parentElement.title = "返回顶部";
                    $(e.parentElement).attr("style", "display: inherit;text-align: center;");
                    let $img = $(`<img src="${imgUrl}" border="0">`);
                    $(e.parentElement).append($img);
                    e.parentElement.removeChild(e);
                });

                $(".boxoleft").append(`
                    <div class="box_left_news news_2n">
                        <h2><a href="javascript:void(0);">在线预览</a></h2>
                        <div class="onlinePlayLink">
                        </div>
                        <h2><a href="javascript:void(0);">下载</a></h2>
                    </div>
                `);

                // 挊
                thirdparty.nong.searchMagnetRun();

                $(".onlinePlayLink").append(`
                    <a href="https://njav.tv/zh/search?keyword=${$('.boxoleft .box_left_news.news_2n').attr("avid")}" target="_blank" style="color: rgb(204, 0, 0);" title="">njav&nbsp;&nbsp;</a>
                    <a href="https://missav.com/cn/${$('.boxoleft .box_left_news.news_2n').attr("avid")}" target="_blank" style="color: rgb(204, 0, 0);" title="此站需解封">missav&nbsp;&nbsp;</a>
                    <a href="https://7mmtv.tv/zh/censored_search/all/${$('.boxoleft .box_left_news.news_2n').attr("avid")}/1.html" target="_blank" style="color: rgb(204, 0, 0);" title="此站需解封">7mmtv&nbsp;&nbsp;</a>
                    <a href="https://supjav.com/zh/?s=${$('.boxoleft .box_left_news.news_2n').attr("avid")}" target="_blank" style="color: rgb(204, 0, 0);" title="此站需解封">supjav&nbsp;&nbsp;</a>
                `);

                Common.addBrowseJavidCache($('.name').text().match(/[a-z|A-Z|0-9| _-]+/)[0].trim());
            }
        }

        static quarkScript() {
            if ($('.VideoDetail--content-body--1KZ6K00').length) {
                GM_addStyle(`
                    .DetailLayout--content--14Z28Ay {width: 100%;margin-top: auto;}
                    .VideoDetail--content--1LYsa87 {width: 100%;}
                    .VideoDetail--content-body--1KZ6K00 {height: 920px;}
                    .AnthologyList--anthology-list--Vlx6xtN {height: auto;}
                    .VideoDetail--content-header--2Cto_s7 {height: auto;padding-top: 0px;}
                `);
                $('.DetailLayout--header-wrap--3cP6QaP').remove();
                $('.VideoDetail--content--1LYsa87').append($('.VideoDetail--content-header--2Cto_s7'));
                $('.VideoDetail--content--1LYsa87').append($('.VideoDetail--content-footer--3sQbRiy'));

                let loop = setInterval(() => {
                    if ($('.AnthologyList--anthology-title--1uEdKDT').length) {
                        $('.AnthologyList--anthology-title--1uEdKDT').remove();
                        clearInterval(loop);
                    }
                }, 500);
            }
        }
    }

    // 第三方脚本调用
    var thirdparty = {
        // 登录115执行脚本，自动离线下载准备步骤
        login115Run: () => {
            if (domain.indexOf('115.com') >= 0) {
                jav_userID = GM_getValue('jav_user_id', 0); //115用户ID缓存
                //获取115ID
                if (jav_userID === 0) {
                    if (domain.indexOf('115.com') >= 0) {
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

                if (domain.indexOf('115.com') >= 0) {
                    console.log('jav老司机:115.com,尝试获取userid.');
                    jav_userID = GM_getValue('jav_user_id', 0);
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
        waterfallScrollInit: () => {
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
                        next: 'a[name="nextpage"]', //nextpage
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

            // javdb
            var $pages4 = $(JAVDB_ITEM_SELECTOR);
            if ($pages4.length) {
                GM_addStyle(`
                            .container {max-width: inherit !important;}
                            .tags{display: block !important;}
                            .tag.hobby{display: block;float: right;color: #fff;line-height: 2em;}
                        `);
                $pages4[0].parentElement.id = "waterfall";
                w = new thirdparty.waterfall({
                    next: '.pagination .pagination-next',
                    item: JAVDB_ITEM_SELECTOR,
                    cont: '#waterfall',
                    pagi: '.pagination',
                });
            }

            w.setSecondCallback((cont, elems) => {
                if (location.pathname.includes('/star/') && elems) {
                    cont.append(elems.slice(1));
                } else {
                    cont.append(elems);
                }
            });

            // javlib脚本
            w.setThirdCallback((elems) => {
                // hobby mod script
                let filerMonth = (indexCd_id, dateString) => {
                    //过滤最新X月份的影片
                    if ($(indexCd_id).context.URL.indexOf("bestrated.php?delete") > 0) {
                        if ($(indexCd_id).context.URL.indexOf("bestrated.php?deleteOneMonthAway") > 0 && !Common.isLastXMonth(dateString, 1)) {
                            $(indexCd_id).remove();
                        } else if ($(indexCd_id).context.URL.indexOf("bestrated.php?deleteTwoMonthAway") > 0 && !Common.isLastXMonth(dateString, 2)) {
                            $(indexCd_id).remove();
                        }
                    }
                }

                let filerScore = (indexCd_id, score) => {
                    //过滤X评分以下的影片  //if(vid == 'javlikq7qu')debugger;
                    if ($(indexCd_id).context.URL.indexOf("?delete") > 0) {
                        if ($(indexCd_id).context.URL.indexOf("delete7down") > 0 && score <= 7.01) {
                            $(indexCd_id).remove();
                        } else if ($(indexCd_id).context.URL.indexOf("delete8down") > 0 && score <= 8.01) {
                            $(indexCd_id).remove();
                        } else if ($(indexCd_id).context.URL.indexOf("delete9down") > 0 && score <= 9.01) {
                            $(indexCd_id).remove();
                        }
                    }
                }

                let setbgcolor = (indexCd_id, dateString) => {
                    // 如果是最近两个月份的影片标上背景色
                    if ($(indexCd_id).context.URL.indexOf("bestrated") > 0 && Common.isLastXMonth(dateString, 2)) {
                        //$(indexCd_id).css("background-color", "blanchedalmond");
                        $('div[class="hobby_add"]', $(indexCd_id)).css("background-color", "#ffffc9");
                    }
                }

                let extCode = (indexCd_id, actor, dateString, pingfengString) => {
                    $(indexCd_id).find(".id").append(` &nbsp;${actor}`);
                    let t = $(indexCd_id).find(".title").get(0); //todo v3.5.0
                    $(t).text().indexOf("【VR】") >= 0 ? $(t).css("background-color", "black").css("color", "white") : null;
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

                if (document.title.search(/JAVLibrary/) > 0 && elems) {//javlib列表
                    for (let i = 0; i < elems.length; i++) {
                        let _vid = $(elems[i]).attr("id").replace('vid_', ''); //vid_javlikd42y
                        // 给列表中的影片添加鼠标点击事件
                        $("a", $("#vid_" + _vid)).first().mousedown((event) => {
                            // 判断鼠标左键或中间才执行
                            if (event.button < 2) {
                                // 设置点击后填充新的背景色peachpuff
                                $("#vid_" + _vid).css("background-color", "#ffe7d3");
                            }
                        });
                        let indexCd_id, actor, dateString, pingfengString;
                        let code = $(elems[i]).find('.id').text();
                        // 查找影片是否存在我浏览过的MyMovie表中
                        let prom = javDb.select().from(myMovie).
                            where(lf.op.and(myMovie.is_browse.eq(true), myMovie.index_cd.eq(_vid))).exec();
                        prom.then(results => {
                            //let promise1 = Promise.resolve();
                            //return new Promise(resolve => {
                            if (results.length != 0) {  //存在MyMovie表中
                                indexCd_id = "#vid_" + results[0].index_cd;
                                if ($(indexCd_id).context.URL.indexOf("bestrated.php?filterMyBrowse") > 0) {
                                    $(indexCd_id).remove();
                                } else {
                                    $(indexCd_id).css("background-color", "#ffe7d3"); //hotpink,khaki,indianred,peachpuff
                                    if (results.length != 0 && results[0].is_sync) { //已经同步过
                                        extCode(indexCd_id, results[0].actor, results[0].release_date, results[0].score);
                                    } else { //未同步过
                                        getMovieInfo(true);
                                    }
                                    Common.addBrowseJavidCache(code);
                                }
                            }
                            else if (Common.browseJavidHasCache(code)) {    //纯正GM缓存中
                                getMovieInfo(true);
                            }
                            else { //都不存在
                                getMovieInfo(false);
                            }

                            function getMovieInfo(isSave) {
                                let promise1 = Common.request(location.origin + "/ja/?v=" + _vid);
                                promise1.then((result) => {
                                    indexCd_id = "#vid_" + result.finalUrl.split("=")[1]; //例如：http://www.j12lib.com/cn/?v=javlikd42a
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
                                    if (isSave) Jav.syncMovie(result);
                                    return Promise.resolve();
                                });
                            }
                        });
                    }
                }
            });

            w.setFourthCallback((elems) => { // todo 20190404
                if (document.title.search(/OneJAV/) > 0 && elems) {
                    // 增加对应所有番号的Javlib的跳转链接,
                    for (let index = 0; index < elems.length; index++) {
                        let aEle = $(elems[index]).find("h5.title.is-4.is-spaced a")[0];
                        let avid = $(aEle).text().replace(/[ ]/g, "").replace(/[\r\n]/g, "") //去掉空格//去掉回车换行
                        let avcd = avid;
                        if (!(/(-)/g).test(avid)) {
                            avcd = Common.getAvCode(avid);
                        }
                        //修改样式
                        $(aEle.parentElement.parentElement).attr("style", "flex-direction: column;");
                        if (!(/^FC2-/g).test(avid)) {
                            // Javlib的跳转链接
                            $(aEle.parentElement).append(`<a style='color:red;' href='https://${GM_getValue('javlib_url')}/cn/vl_searchbyid.php?keyword=` +
                                avcd + "&" + avid + "' target='_blank' title='点击到Javlib看看'>&nbsp;&nbsp;Javlib</a>");
                        }
                        // 番号预览大图
                        Common.addAvImg(avcd, ($img) => {
                            let divEle = $(elems[index]).find("div.column.is-5")[0];
                            if (divEle) {
                                $(divEle).append($img);
                            }
                        }, false);
                    }
                }

                if (((/(JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) && elems) {
                    if (location.pathname.search('/searchstar|/actresses|/&mdl=favor&sort=4') < 0) { //排除actresses页面
                        // 处理列表文字内容排版
                        for (let i = 0; i < elems.length; i++) {
                            //$(elems[i]).css("height","385px");
                            if ($(elems[i]).find("div.avatar-box").length > 0) continue;
                            let spanEle = $(elems[i]).find("div.photo-info span")[0];
                            let t1 = $(spanEle).html().substr($(spanEle).html().indexOf("<br>") + 4);
                            let t2 = $(spanEle).html().substr(0, $(spanEle).html().indexOf("<br>"));
                            $(spanEle).html(t1 + "<br>" + t2);
                            // 已阅番号标色
                            if (Common.browseJavidHasCache($(elems[i]).find(".photo-info>span>date:eq(0)").text())) {
                                $(elems[i]).find(".movie-box").css("background-color", "#ffe7d3");
                            }
                            // 给列表中的影片添加鼠标点击事件
                            $("a", $(elems[i])).first().mousedown((event) => {
                                // 判断鼠标左键或中间才执行
                                if (event.button < 2) {
                                    // 设置点击后填充新的背景色peachpuff
                                    $(elems[i]).find(".movie-box").css("background-color", "#ffe7d3");
                                }
                            });
                        }
                    }
                }

                // javdb列表内容排版处理
                if ((/(JavDB)/g).test(document.title) && elems) {
                    elems.toArray().forEach(e => {
                        //移除新种标签
                        $(e).find(".tags.has-addons span:not(.tag.is-success,.tag.is-warning)").remove();
                        if ($(e).find(".tag.is-warning").length) {
                            $(e).find(".tag.is-warning").text("含中字");
                        }
                        let $div = $(e).find(".tags.has-addons").eq(0);
                        let avid = $(e).find(".video-title strong").text();

                        if (!$div.children().length) {
                            $div.append(`<span class="tag is-success" style="background-color:#fff;">.</span>`);
                        }
                        if (!$("#waterfall").hasClass("v cols-4 vcols-8")) {
                            $div.append(`
                                        <a title="可忽略" href="https://${GM_getValue('avsox_url')}/cn/search/${avid}" target="_blank">
                                            <span class="tag hobby" style="margin-right: 5px;background-color:#bf9be6;display:none;">avsox</span>
                                        </a>
                                        <a title="无码 JAV资源站" href="https://${GM_getValue('javbus_url')}/${avid}" target="_blank">               
                                            <span class="tag hobby" style="margin-right: 5px;background-color:#febe00;">JavBus</span>
                                        </a>
                                        <a title="有码 JAV资源站" href="https://${GM_getValue('javlib_url')}/cn/vl_searchbyid.php?keyword=${avid}" target="_blank">
                                            <span class="tag hobby" style="margin-right: 0px;background-color:#f908bb;">JavLib</span>    
                                        </a>
                                        <a title="FC2 JAV资源站" href="${Common.getOneJavSearchUrl(avid)}" target="_blank">            
                                            <span class="tag hobby" style="margin-right: 3px;background-color:#00d1b2;">OneJav</span>
                                        </a>  
                                    `);
                            let $a = $(`
                                        <a title="素人 JAV资源站" href="javascript:void(0);">
                                            <span class="tag hobby" style="margin-right: 0px;background-color:#418fa7;">Jav321</span>
                                        </a>
                                    `);
                            $div.append(Common.jav321LinkMousedown($a, avid));

                            let $b = $(`
                                        <a title="综合 JAV资源站" href="javascript:void(0);">
                                            <span class="tag hobby" style="margin-right: 0px;background-color:#ad1d18;">JavStore</span>
                                        </a>
                                    `);
                            $div.append(Common.javstoreLinkMousedown($b, avid));

                            // 提取评分数、评分人数
                            $(e).attr("score", $(e).find('.score>span').text().split('分, 由')[0].trim());
                            $(e).attr("usernum", $(e).find('.score>span').text().split('分, 由')[1].replace("人評價", ""));
                            // 已阅番号标色
                            if (Common.browseJavidHasCache(avid)) $(e).find(".video-title,.score").css("background-color", "#ffe7d3");
                        }
                    });
                }

            });

            if ((/(JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) {
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

                if ($('#waterfall').length == 0 && location.pathname.search(/search/) > 0 &&
                    location.pathname.search(/uncensored/) < 1) {
                    window.location.href = $('li[role="presentation"]:eq(1) a').attr("href");
                }

                if (location.pathname.includes('/uncensored') || location.hostname.includes('javbus.org') || (/(AVSOX)/g).test(document.title)) {
                    GM_addStyle(`#waterfall_h .movie-box {width: 354px;} #waterfall_h .movie-box .photo-info {height: 105px;}`);
                } else {
                    GM_addStyle(`#waterfall_h .movie-box {width: 167px;} #waterfall_h .movie-box .photo-info {height: 145px;}`);
                }
            }
        },
        // 瀑布流脚本
        waterfall: (() => {
            function waterfall(selectorcfg = {}) {
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
                this._1func = (cont, elems) => {
                    cont.empty().append(elems);
                };
                this._2func = (cont, elems) => {
                    cont.append(elems);
                };
                this._3func = (elems) => { };
                if ($(this.selector.item).length) {
                    // 开启关闭瀑布流判断
                    if (waterfallScrollStatus > 0) {
                        document.addEventListener('scroll', this.scroll.bind(this));
                        document.addEventListener('wheel', this.wheel.bind(this));
                    }
                    this.appendElems(this._1func);
                }
            }

            waterfall.prototype.getBaseURI = () => {
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
                const fetchwithcookie = fetch(url, { credentials: 'same-origin' });
                return fetchwithcookie.then(response => response.text())
                    .then(html => new DOMParser().parseFromString(html, 'text/html'))
                    .then(doc => {
                        let $doc = $(doc);
                        let href = $doc.find(this.selector.next).attr('href');
                        let nextURL = href ? this.getNextURL(href) : undefined;
                        let elems = $doc.find(this.selector.item);
                        for (const elem of elems) {
                            const links = elem.getElementsByTagName('a');
                            for (const link of links) {
                                link.target = "_blank";
                            }
                        }
                        // javdb列表 bug：一直有最后一页 console.log(`1 ${url}`);console.log(`2 ${nextURL}`);
                        if ($(JAVDB_ITEM_SELECTOR).length && (this._count !== 0) && url === nextURL) {
                            if ($(`#waterfall>div>a[href="${$(elems[0]).find('a.box')[0].attr('href')}"]`).length > 0) {
                                nextURL = undefined;
                                elems = [];
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
                        });
                    }).then(elems => {
                        this.lock.unlock();
                        return elems;
                    }).catch((err) => {
                        // Locked!
                    });
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
                    });
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
            main: {
                //av信息查询类
                //avsox|avmoo
                jav: {
                    type: 0,
                    re: /.*movie.*/,
                    vid: () => {
                        return $('.header_hobby')[0].nextElementSibling.getAttribute("avid");
                    },
                    proc: (main) => {
                        var divE = $("div[class='col-md-3 info']")[0];
                        $(divE).after(main.cur_tab);
                    }
                },
                javbus: {
                    type: 0,
                    re: /(jav|bus|dmm|see|cdn|fan){2}\./g,
                    vid: () => {
                        var a = $('.header_hobby')[0].nextElementSibling;
                        return a ? a.getAttribute("avid") : '';
                    },
                    proc: (main) => {
                        var divE = $("div[class='col-md-3 info']")[0];
                        $(divE).after(main.cur_tab);
                    }
                },
                javlibrary: {
                    type: 0,
                    re: /.*\?v=jav.*/,
                    vid: () => {
                        let avid = $('#video_id')[0].getElementsByClassName('text')[0].getAttribute("avid");
                        return Common.getAvCode(avid);
                    },
                    proc: (main) => {
                        //去十八岁警告
                        Common.setCookie("over18", 18);
                        $('.socialmedia').remove();
                        GM_addStyle(`
                            #video_info {text-align: left;font: 14px Arial;min-width: 230px;max-width: 260px;padding: 0px 0px 0px 0px;}
                            #video_jacket_info {overflow: hidden;} //table-layout: fixed;
                            #coverimg {vertical-align: top;overflow: hidden;max-width: 50%;}
                            #javtext {vertical-align: top;width: 260px;}
                            #video_info td.header {width: 75px;}
                            #video_info td.icon {width: 0px;}
                            #content {padding-top: 0px;}
                            #video_info table {margin-top: 6px;border-bottom: 1px solid #ffffff;}
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
                javstore: {
                    type: 0,
                    re: /.*javstore.*/,
                    vid: () => {
                        if (GM_getValue(document.URL, false)) {
                            let avid = GM_getValue(document.URL);
                            GM_deleteValue(document.URL);
                            $('.boxoleft .box_left_news.news_2n').attr("avid", avid);
                            return avid;
                        } else {
                            let $ele = $('.boxoleft .box_left_news.news_2n').attr("avid", $('.name').text().match(/[a-z|A-Z|0-9| _-]+/)[0].trim());
                            return $ele.attr('avid');
                        }
                    },
                    proc: (main) => {
                        $('.boxoleft .box_left_news.news_2n').append(main.cur_tab);
                    }
                },
            },
            resource_sites: {
                [GM_getValue('javdb_url')]: (kw, cb) => {
                    let promise = Common.request("https://" + GM_getValue('search_index') + "/search?f=download&q=" + kw, "https://" + GM_getValue('search_index') + "/");
                    promise.then((result) => {
                        let data = [];
                        return new Promise((resolve, reject) => {
                            thirdparty.nong.search_engines.full_url = result.finalUrl;
                            let doc = Common.parsetext(result.responseText);
                            let a = $(doc).find(`.box .video-title:contains('${kw.toUpperCase().replace("+", "-")}')`);
                            if (a) {
                                resolve(a[0].parentElement.href.replace(location.origin, 'https://' + [GM_getValue('javdb_url')]));
                            }
                            else {
                                reject();
                            }
                        }).then(url => {
                            Common.request(url).then(result => {
                                thirdparty.nong.search_engines.full_url = result.finalUrl;
                                let doc = Common.parsetext(result.responseText);
                                let t = $(doc).find('#magnets-content .item');
                                if (t) {
                                    for (let elem of t) {
                                        data.push({
                                            "title": elem.querySelector(".magnet-name span:nth-child(1)").textContent,
                                            "maglink": elem.querySelector(".magnet-name a:nth-child(1)").href,
                                            "size": elem.querySelector(".magnet-name .meta") ? elem.querySelector(".magnet-name .meta").textContent : "",
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
                        }).catch(() => {
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
                [GM_getValue('btsow_url')]: (kw, cb) => {
                    let promise = Common.request("https://" + GM_getValue('search_index') + "/search/" + kw);
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
                [GM_getValue('btdig_url')]: (kw, cb) => {
                    let promise = Common.request("https://" + GM_getValue('search_index') + "/search?q=" + kw);
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
                [GM_getValue('nyaa_url')]: (kw, cb) => {
                    let promise = Common.request("https://" + GM_getValue('search_index') + "/?f=0&c=0_0&q=" + kw);
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
                                data.push({
                                    "title": elem.querySelector("td:nth-child(2)>a:nth-child(1)").title,
                                    "maglink": elem.querySelector("td:nth-child(3)>a:nth-last-child(1)").href,
                                    //"torrent_url": "https://nyaa.si" + elem.querySelector("td:nth-child(3)>a:nth-child(1)").href,
                                    "size": elem.querySelector("td:nth-child(4)").textContent,
                                    "src": "https://" + [GM_getValue('nyaa_url')]
                                        + elem.querySelector("td:nth-child(2)>a:nth-child(1)").getAttribute('href'),
                                });
                            }
                        }
                        cb(result.finalUrl, data);
                    });
                },
                [GM_getValue('torrentkitty_url')]: (kw, cb) => {
                    let promise = Common.request("https://" + GM_getValue('search_index') + "/search/" + kw);
                    promise.then((result) => {
                        thirdparty.nong.search_engines.full_url = result.finalUrl;
                        let doc = Common.parsetext(result.responseText);
                        let data = [];
                        let t = $(doc).find("#archiveResult tr:gt(0)");
                        if (t) {
                            for (let elem of t) {
                                if ((/(No result)/g).test(elem.querySelector(".name").textContent))
                                    break;
                                data.push({
                                    "title": elem.querySelector(".name").textContent,
                                    "maglink": elem.querySelector(".action>a:nth-child(2)").href,
                                    "size": elem.querySelector(".size").textContent,
                                    "src": "https://" + [GM_getValue('torrentkitty_url')] + elem.querySelector(".action>a:nth-child(1)").getAttribute('href'),
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
            },
            offline_sites: {
                115: {
                    name: '115离线',
                    url: 'http://115.com/?tab=offline&mode=wangpan',
                    enable: true,
                },
            },
            // 挊
            search_engines: {
                switch_engine: (i) => {
                    // var index = GM_getValue("search_index",0);
                    GM_setValue('search_index', i);
                    return i;
                },
                cur_engine: (kw, cb) => {
                    let ops = Object.keys(thirdparty.nong.resource_sites);
                    let z = thirdparty.nong.resource_sites[GM_getValue('search_index', ops[0])];
                    if (!z) {
                        //alert("search engine not found");
                        GM_setValue('search_index', Object.keys(thirdparty.nong.resource_sites)[0]);
                        z = thirdparty.nong.resource_sites[GM_getValue('search_index')];
                    }
                    return z(kw, cb);
                },
                parse_error: (a) => {
                    alert("调用搜索引擎错误，可能需要更新，请向作者反馈。i=" + a);
                },
                full_url: '',

            },
            // 挊
            magnet_table: {
                template: {
                    create_head: () => {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        a.id = 'jav-nong-head';
                        var list = ['标题', '大小', '操作', '离线下载'];
                        for (var i = 0; i < list.length; i++) {
                            var b = thirdparty.nong.magnet_table.template.head.cloneNode(true);
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
                    create_row: (data) => {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        a.setAttribute('maglink', data.maglink);
                        // 暂时针对cnbtkitty.pw站点生效。
                        if (data.maglink.indexOf("#magnetlink") > -1) {
                            a.setAttribute('id', data.id);
                            let promise1 = Common.request(data.maglink + "?hobbyId=" + data.id);// 传递修改hobbyId，用于修改时定位。
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
                            thirdparty.nong.magnet_table.template.create_info(data.title, data.maglink),
                            thirdparty.nong.magnet_table.template.create_size(data.size, data.src),
                            thirdparty.nong.magnet_table.template.create_operation(data.maglink),
                            thirdparty.nong.magnet_table.template.create_offline()
                        ];
                        for (var i = 0; i < list.length; i++) {
                            var c = b.cloneNode(true);
                            c.appendChild(list[i]);
                            a.appendChild(c);
                        }
                        return a;
                    },
                    create_loading: () => {
                        var a = document.createElement('tr');
                        a.className = 'jav-nong-row';
                        var p = document.createElement('p');
                        p.textContent = 'Loading';
                        p.id = 'notice';
                        a.appendChild(p);
                        return a;
                    },
                    create_info: (title, maglink) => {
                        var a = thirdparty.nong.magnet_table.template.info.cloneNode(true);
                        a.firstChild.textContent = title.length < 20 ? title : title.substr(0, 20) + '...';
                        a.firstChild.href = maglink;
                        a.title = title;
                        return a;
                    },
                    create_size: (size, src) => {
                        var a = thirdparty.nong.magnet_table.template.size.cloneNode(true);
                        a.textContent = size;
                        a.href = src;
                        return a;
                    },
                    create_operation: (maglink) => {
                        var a = thirdparty.nong.magnet_table.template.operation.cloneNode(true);
                        a.firstChild.href = maglink;
                        return a;
                    },
                    create_offline: () => {    //有用 hobby
                        var a = thirdparty.nong.magnet_table.template.offline();
                        a.className = 'nong-offline';
                        return a;
                    },
                    create_select_box: () => {
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
                    head: (() => {
                        var a = document.createElement('th');
                        var b = document.createElement('a');
                        a.appendChild(b);
                        return a;
                    })(),
                    info: (() => {
                        var a = document.createElement('div');
                        var b = document.createElement('a');
                        b.textContent = 'name';
                        b.href = 'src';
                        a.appendChild(b);
                        return a;
                    })(),
                    size: (() => {
                        var a = document.createElement('a');
                        a.textContent = 'size';
                        return a;
                    })(),
                    operation: (() => {
                        var a = document.createElement('div');
                        var copy = document.createElement('a');
                        copy.className = 'nong-copy';
                        copy.textContent = '复制';
                        a.appendChild(copy);
                        return a;
                    })(),
                    offline: () => {
                        var a = document.createElement('div');
                        var b = document.createElement('a');
                        b.className = 'nong-offline-download';
                        b.target = '_blank';
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
                create_empty_table: () => {   //有用 hobby
                    var a = document.createElement('table');
                    a.id = 'nong-table-new';
                    return a;
                },
                updata_table: (src, data, type) => {
                    if (type == 'full') {
                        var tab = $('#nong-table-new')[0];
                        tab.removeChild(tab.querySelector("#notice").parentElement);
                        for (var i = 0; i < data.length; i++) {
                            tab.appendChild(thirdparty.nong.magnet_table.template.create_row(data[i]));
                        }
                    }
                    thirdparty.nong.magnet_table.reg_event();
                },
                full: (src, data) => {
                    var tab = thirdparty.nong.magnet_table.create_empty_table();
                    tab.appendChild(thirdparty.nong.magnet_table.template.create_head());
                    var loading = thirdparty.nong.magnet_table.template.create_loading();
                    tab.appendChild(loading);
                    return tab;
                },
                handle_event: (event) => {
                    var maglink = event.target.parentElement.parentElement.getAttribute('maglink')
                        || event.target.parentElement.parentElement.parentElement.getAttribute('maglink');
                    if (event.target.className == 'nong-copy') {
                        event.target.innerHTML = '成功';
                        maglink = maglink.substr(0, 60);
                        GM_setClipboard(maglink);
                        setTimeout(() => {
                            event.target.innerHTML = '复制';
                        }, 1000);
                        event.preventDefault(); //阻止跳转
                    }
                    else if (event.target.className == 'nong-offline-download') {
                        maglink = maglink.substr(0, 60);
                        GM_setValue('magnet', maglink);
                        //获取115 token接口
                        let promise = Common.request('http://115.com/?ct=offline&ac=space&_=' + new Date().getTime());
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
                                onload: (responseDetails) => {
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
                reg_event: () => { // target 处理 更精准
                    var list = [
                        '.nong-copy',
                        '.nong-offline-download'
                    ];
                    for (var i = 0; i < list.length; i++) {
                        var a = document.querySelectorAll(list[i]);
                        for (var u = 0; u < a.length; u++) {
                            a[u].addEventListener('click', thirdparty.nong.magnet_table.handle_event, false);
                        }
                    }
                },
            },
            // 挊
            searchMagnetRun: () => {
                let main = thirdparty.nong.main;
                let main_keys = Object.keys(main);
                main.cur_tab = null;
                main.cur_vid = '';
                for (var i = 0; i < main_keys.length; i++) {
                    var v = main[main_keys[i]];
                    if (new RegExp(v.re).test(location.href)) {
                        if (v.type === 0) {
                            try {
                                main.cur_vid = v.vid();
                                console.log('挊的番号：', main.cur_vid);
                            }
                            catch (e) {
                                main.cur_vid = '';
                            }
                            if (main.cur_vid) {
                                GM_addStyle(`
                                    #nong-table-new{margin:10px auto;color:#666 !important;font-size:13px;text-align:center;background-color: #F2F2F2;}
                                    #nong-table-new th,#nong-table-new td{text-align: center;height:30px;background-color: #FFF;padding:0 5px 0;border: 1px solid #EFEFEF;}
                                    .jav-nong-row{text-align: center;height:30px;background-color: #FFF;padding:0 5px 0;border: 1px solid #EFEFEF;}
                                    .nong-copy{color:#08c !important;}
                                    .nong-offline{text-align: center;}
                                    #jav-nong-head a {margin-right: 5px;color: black;}
                                    .nong-offline-download{color: rgb(0, 180, 30) !important; margin-right: 4px !important;}
                                    .nong-offline-download:hover{color:red !important;}
                                `);
                                main.cur_tab = thirdparty.nong.magnet_table.full();
                                v.proc(main);

                                let t = $('#jav-nong-head')[0].firstChild;
                                t.firstChild.addEventListener('change', (e) => {
                                    console.log("url: http://" + e.target.value);
                                    GM_setValue('search_index', e.target.value);
                                    let s = $('#nong-table-new')[0];
                                    s.parentElement.removeChild(s);
                                    thirdparty.nong.searchMagnetRun();
                                });

                                if (GM_getValue('search_index', null) === null) {
                                    GM_setValue('search_index', Object.keys(thirdparty.nong.resource_sites)[0]);
                                }
                                thirdparty.nong.search_engines.cur_engine(main.cur_vid, (src, data) => {
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

    function mainRun() {
        Common.init();
        GM_addStyle(`
			.tm-setting {display: flex;align-items: center;justify-content: space-between;padding-top: 20px;}
            .tm-checkbox {width: 16px;height: 16px;}
			.tm-text {width: 150px;height: 16px;}
		`);

        Jav.javStoreScript();
        if ((/(JAVLibrary|JavBus|AVMOO|AVSOX)/g).test(document.title) || $("footer:contains('JavBus')").length) {
            Common.addAvImgCSS();
            GM_addStyle(`
                .container {width: 100%;float: left;}
                .col-md-3 {float: left;max-width: 260px;}
                .col-md-9 {width: inherit;}
                .hobby-a {color: red; font: bold 12px monospace;}   /*javlib*/
                .footer {padding: 20px 0;background: #1d1a18;float: left;} /*javbus*/
                #nong-table-new {margin: initial !important;important;color: #666 !important;font-size: 13px;text-align: center;background-color: #F2F2F2;float: left;}
                .header_hobby {font-weight: bold;text-align: right;width: 75px;} /*javbus*/
            `);
            Jav.javlibaryScript();
            Jav.javBusScript();
        }

        Jav.oneJavScript();
        Jav.jav321Script();
        Jav.javDBScript();
        Jav.quarkScript();
        thirdparty.login115Run();
    }
    mainRun();
})();