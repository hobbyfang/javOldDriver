// ==UserScript==
// @name         blogjav.net老司机步兵辅助
// @namespace    http://greasyfork.org/zh-CN/users/25794
// @version      1.3.1
// @description  blogjav.net网站重新排版，浏览图片下载内容更方便，是时候和封面杀手说88了。
// @author       Hobby
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.min.js
// @require      http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @include      http://www.imagebam.com/image/*?url=maddawgjav.net
// @include      http://blogjav.net/*
// @include      http://115.com/*

// @resource     icon http://geekdream.com/image/115helper_icon_001.jpg

// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_getResourceURL

// @connect      *
// @copyright    hobby 2016-04-02

// 交流QQ群：273406036
// 内地用户推荐Chrome + Tampermonkey（必须扩展） + V2ray(代理) + Proxy SwitchyOmega（扩展）的环境下配合使用。

// v1.3.1 修复了已知问题。
// v1.3.0 优化了整个脚本，修复了已知问题。
// v1.2.4 增加了avgle链接跳转，修复了bug
// v1.2.3 修复原站更新后的已知问题
// v1.2.2 修复了bug
// v1.2.1 修复了bug
// v1.2.0 增加JAV列表无限滚动自动加载，增加导航栏右上角统计已阅JAV数量和只看已阅功能。修改首页及栏目jav列表的预览图默认加载为小图,搜索入口jav列表的预览图默认加载为大图。
// v1.1.1 代码优化，体验细节优化
// v1.1.0 重大更新！排版优化改进！
// v1.0.8 合成“挊”的自动获取JAV磁链接，一键自动115离线下载
// v1.0.7 代码精简改进，修改部分内容
// v1.0.6 修复原站更新后的已知问题
// v1.0.5 改进性能,修复已知问题
// v1.0.4 修复了站点子目录支持的问题
// v1.0.3 修复了bug
// v1.0.2 修复了部分排版问题
// v1.0.1 增加内容大图加载失败后有缓存，点击能重新加载，以及修复了bug
// v1.0.0 针对blogjav.net网站的支持，支持方便浏览图片

// ==/UserScript==

(function() {

    // 115用户ID
    var jav_userID = GM_getValue('jav_user_id', 0);
    //i con图标
    const icon = GM_getResourceURL('icon');

    //过滤文字单词的数组
    const filterWordsArray = new Array(
        'UNCENSORED','CENSORED','IDOL','Caribbeancompr','Caribbeancom','Gachinco','10musume','天然むすめ','カリビアンコム プレミアム','カリビアンコム','FC2-PPV',
        'GALAPAGOS','Mesubuta','1000人斬り','Tokyo Hot','AV志向','アジア天国','キャットウォーク ポイズン','G-AREA','','ABBY','エッチな4610','H4610',
        '金8天国','av9898','エッチな4610','エッチな0930','15-daifuku','','ハメる','The 変態','人妻斬り','娘姦白書','','1pondo','Kin8tengoku','Pacopacomama','Lesshin',
        'Heydouga','Nyoshin','Unkotare','','Muramura','H0930','C0930','1000giri','XXX-AV','Kt-joker','<strong>','FC2','PPV','Leaked','41Ticket','Real Street Angels',
        '\\[FHD\\]','\\[HD\\]','\\[D9ISO\\]','\\[FHD60fps\\]','Leak','1pon','Caribpr','Carib','SM-miracle'
    );

    //不过滤用于判断截取字符位置的单词
    const wordsArray = new Array(
        'S-Cute','Asiatengoku','Real-diva','Jukujo-club','\[julesjordan\]','\[colette\]','Mywife-No','Roselip','Zipang','HEYZO','1919gogo','\[DDF\] ','\[Wow\]',
        'Blacked','\[21members\]','\[sexart\]','Heyzo', 'X1X','\[babes\]','Mywife-NO','Peepsamurai','Honnamatv','Spermmania'
    );

    //多文字过滤的月份字典定义,前为替换前字符，后为替换后字符
    const replaceMonth = {
        "January" : "一月","February" : "二月","March": "三月","April" : "四月","May": "五月","June" : "六月",
        "July": "七月","August" : "八月","September": "九月","October" : "十月","November": "十一月","December": "十二月"
    };

    class Common {
        /**
         * 过滤字典方法
         * @param str 输入原字符
         * @param replacements 替换字典
         * @returns {void | string}
         */
        static filterDict(str,replacements){
            //以下同时替换多个字符串使用到的代码，如123-->abc,456-->xyz
            Array.prototype.each = function(trans) {
                for (let i=0; i<this.length; i++)
                    this[i] = trans(this[i], i, this);
                return this;
            };// todo 此方法导致115.com有问题.
            Array.prototype.map = function(trans) {
                return [].concat(this).each(trans);
            };
            RegExp.escape = function(str) {
                return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
            };
            function properties(obj) {
                var props = [];
                for (var p in obj) props.push(p);
                return props;
            }
            var regex = new RegExp(properties(replacements).map(RegExp.escape).join("|"), "g");
            str = str.replace(regex, function($0) { return replacements[$0]; });
            return str;
        }// end 替换多个字符串代码结束
        /**
         * 过滤文字单词函数
         * @param srcString     需过滤字符串
         * @returns {*|string}  过滤后的字符串
         */
        static filterWords(srcString){
            for(var i = 0; i < filterWordsArray.length ; i ++){
                if(filterWordsArray[i] !== ""){
                    srcString = srcString.replace(new RegExp(filterWordsArray[i],'ig'),"").replace(/(^\s*)/g, "");
                }
            }
            return srcString;
        }
        /**
         * 判断字符串是否包含单词字典的内容
         * @param srcString     需判断字符串
         * @param wordsArr      单词字典
         * @returns {boolean}
         */
        static hasWords(srcString,wordsArr){
            for(let i = 0; i < wordsArr.length ; i ++){
                if(wordsArr[i] !== ""){
                    srcString = $.trim(srcString);
                    // if(srcString.split(" ")[0] === wordsArr[i]){
                    if(srcString.indexOf(wordsArr[i]) > -1){
                        return true;
                    }
                }
            }
            return false;
        }
        static parsetext(text) {
            let doc = null;
            try {
                doc = document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = text;
                return doc;
            }
            catch (e) {
                alert('parse error');
            }
        }
        //方法: 通用chrome通知
        static notifiy (title, body, icon, click_url){
            let notificationDetails = {
                text: body,
                title: title,
                timeout: 10000,
                image: icon,
                onclick: function() {
                    window.open(click_url);
                }
            };
            GM_notification(notificationDetails);
        }
        /**
         * 创建查找av的外链html内容元素P
         * @param avCode av番号
         * @returns {*} 外链html内容元素P
         */
        static crtOutLink(avCode){
            var p = $(`
                <p style="text-align: center;color: blue;margin: 0 auto;clear: both;">他站查找 [${avCode}]：
                    <a target="_blank" href="https://avgle.com/search/videos?search_query=${avCode}" title="搜 ${avCode}" class="link">avgle</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=${avCode}" title="搜 ${avCode}" class="link">javlibrary</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="https://www.javbus.com/search/${avCode}" title="搜 ${avCode}" class="link">javbus</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="http://maddawgjav.net/?s=${avCode}" title="搜 ${avCode}" class="link">maddawgjav</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="http://javbest.net/?s=${avCode}" title="搜 ${avCode}" class="link">javbest</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="http://javpop.com/index.php?s=${avCode}" title="搜 ${avCode}" class="link">javpop</a>&nbsp;&nbsp;&nbsp;&nbsp;留种：
                    <a target="_blank" href="https://btos.pw/search/${avCode}" title="搜 ${avCode}" class="link">btsow</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="https://btdb.in/q/${avCode}" title="搜 ${avCode}" class="link">btdb</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="http://sukebei.nyaa.si/?f=0&c=0_0&q=${avCode}" title="搜 ${avCode}" class="link">sukebei.nyaa</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="https://www.limetorrents.cc/search/all/${avCode}" title="搜 ${avCode}" class="link">limetorrents</a>&nbsp;&nbsp;&nbsp;&nbsp;
                </p>'
            `)[0];
            return p;
        }
        /**
         * http地址get方式访问
         * @param url 请求地址
         * @returns {Promise<any>}  返回Promise，可以用于同步处理。
         */
        static request (url) {
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
                        console.log(e);
                        resolve("wrong");
                    },
                    ontimeout: (e) =>{
                        console.log(url + " timeout");
                        resolve("wrong");
                    },
                });
            });
        }
        static addJavMovieImg(smallImgUrl,imgUrl,insertImgFunc){
            //创建新img元素
            var $img = $('<img name="javRealImg" width="66px" title="点击可放大缩小 (图片正常时)"></img>');
            //$img.attr("id",moreId);//例如：more-265519
            $img.attr("style","border: 1px solid #DDD;min-height: 233px;height:auto;cursor: pointer;float: left;");

            // 判断是否搜索地址进入
            let reg = new RegExp(/\?s=/);
            let reg1 = new RegExp(/&no/);
            //console.log(location.href + " 网址 " + reg.test(location.href));
            if(reg.test(location.href) && !reg1.test(location.href)){
                $img.attr("src",imgUrl);
            }
            else{
                $img.attr("src",smallImgUrl);
            }

            //插入图片函数，将图片插入到某个位置
            insertImgFunc($img);

            if(reg.test(location.href) && !reg1.test(location.href)){
                $($img[0].parentElement).attr('bigImg', '1');
            }

            $img.click(function(){
                let bigImgFlag = $(this.parentElement).attr('bigImg');
                //3为超时，2为异常
                if($(this).attr("loadRes") == '2' || ($(this).attr("loadRes") == '3'&& !this.complete)){
                    //debugger;
                    //$(this).attr("src",":0");
                    Common.addJavMovieImg(smallImgUrl,imgUrl+'hobby',insertImgFunc);
                    $(this).remove();
                }

                //如果存在（不存在）就删除（添加）一个类 'max'。
                $(this).toggleClass('max');

                if(!$(this).attr("class")){
                    this.parentElement.parentElement.scrollIntoView();
                    $(this).after(this.previousElementSibling);
                }
                else{
                    $(this).before(this.nextElementSibling);
                }

                if(!$(this).parents(".single").attr('isView')){
                    // 设置jav为已阅
                    $(this).parents(".single").attr('isView','1');

                    // 已阅JAV数+1
                    $("#viewJavNbr").text(parseInt($("#viewJavNbr").text()) + 1);
                }

                if(!bigImgFlag){
                    let $imgParentEle = $(this.parentElement);
                    $imgParentEle.attr('bigImg', '1');

                    Common.addJavMovieImg(imgUrl,imgUrl+'hobby',insertImgFunc);
                    $(this).remove();
                    //$imgParentEle.find('img[name="javRealImg"]').click();
                }
                if(!$(this).attr("loadMagnet")){
                    $(this).attr('loadMagnet', '1');
                    let rd = parseInt(Math.random()*100000000);
                    new BlogjavNong($img.attr("vid"),rd,$img);
                }

            });

            $img.load(function(){
                console.log("加载完成");
                $img.attr('loadRes', '1');
            });
            $img.error(function(){
                console.log("加载异常");
                $img.attr('loadRes', '2');
            });
            setTimeout(function(){
                var res = $img.attr('loadRes');
                if(!res){
                    console.log("加载超时");
                    $img.attr('loadRes', '3');//加载超时
                }
            }, 30000);
        }
    };

    //第三方脚本
    class ThridpartyScript {}

    ThridpartyScript.Waterfall = class {
        /**
         * 构造函数
         * @param columnNum     瀑布流列数
         * @param selectorNext  选择下一页元素
         * @param selectorItem  选择加载页面元素
         */
        constructor(columnNum,selectorNext,selectorItem) {
            this.COL_CNT = columnNum ? columnNum : 1;
            this.global = {
                pageCount: 0,
                itemCount: 0,
                parent: $('#waterfall'),
                columnParents: Array(columnNum).fill().map(() => $('<div class="column">')),
                columnHeights: Array(columnNum).fill(0),
                nextURL: location.href,
                locked: false,
                baseURI: location.origin,
                selector: {
                    next: selectorNext ? selectorNext : 'a#next',
                    item: selectorItem ? selectorItem : '.item',
                },
            };
            this.intersectionObserverOptions = {
                rootMargin: `900px 0px 2000px 0px`,
                threshold: Array(5).fill().map((_, index, arr) => index / arr.length),//[0, 0.2, 0.4, 0.6, 0.8]
            };
        }

        // /**
        //  * 处理当前页面加载项
        //  * @param item  当前页面加载元素
        //  */
        // processItem(item){}

        getNextURL(href){
            const a = document.createElement('a');
            a.href = href;
            return `${this.global.baseURI}${a.pathname}${a.search}`;
        }

        fetchURL(url){
            let todo = async() => {
                console.log(`fetchUrl = ${url}`);
                const resp = await fetch(url, { credentials: 'same-origin' });
                console.log(new Date());
                const html = await resp.text();
                console.log(new Date());
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const href = $(doc).find(this.global.selector.next).attr('href');
                const nextURL = href ? this.getNextURL(href) : null;
                const elems = $(doc).find(this.global.selector.item);

                return {
                    nextURL,
                    elems,
                };
            };
            return todo();
        }

        intersectionObserver(){
            let server = new IntersectionObserver(async() => {
                let global = this.global;
                if (global.locked) { return; }
                global.locked = true;
                const { nextURL, elems } = await this.fetchURL(global.nextURL);

                if (global.pageCount === 0) {
                    global.parent.empty().append(global.columnParents);
                }

                const items = elems.toArray();
                if (global.pageCount > 0 && location.pathname.includes('/star/')) {
                    items.shift();
                }

                for (const item of items) {
                    this.processItem(item);
                    global.columnParents[global.itemCount % this.COL_CNT].append(item);
                    global.itemCount += 1;
                }

                // finally
                // 已加载页数+1  页面存在20分钟自动刷新机制
                $("#addPageNbr").text(parseInt($("#addPageNbr").text()) + 1);
                $("#hisUrl").attr("href",GM_getValue("hisNextPageUrl","#"));
                global.pageCount += 1;
                global.nextURL = nextURL;
                // 设置显示当前读取到第几页。
                let currPageNbr = parseInt(nextURL.substring(nextURL.lastIndexOf('page/') + 5,nextURL.lastIndexOf('/'))) - 1;
                $("#currNextPageNbr").text(currPageNbr);
                // 加载页数大于5页，把加载到第几页的url保存到历史缓存中，同时把历史超链接移除
                if(global.pageCount > 5){
                    GM_setValue("hisNextPageUrl",nextURL);
                    $("#hisli").remove();
                }
                global.locked = false;

                if (!global.nextURL) {
                    console.info('The End');
                    global.parent.after($('<h1 id="end">The End</h1>'));
                    server.disconnect();
                    return;
                }
            }, this.intersectionObserverOptions);
            return server;
        }
    };

    ThridpartyScript.Nong =  class {

        constructor(keyword,randomNum,$locateObj) {
            this.full_url = '';
            this.keyword = keyword ? keyword : "";
            this.randomNum = randomNum ? randomNum : "0";
            //初始化table
            let temp = this;
            this.cur_tab = this.full();
            this.processMagnetTab($locateObj);
            let t = $(`#jav-nong-head-${this.randomNum}`)[0].firstChild;
            t.firstChild.addEventListener('change', function (e) {
                GM_setValue('search_index', e.target.value);
                let s = $(`#nong-table-new-${temp.randomNum}`)[0];
                s.parentElement.removeChild(s);
                new BlogjavNong(temp.keyword,temp.randomNum,$locateObj);
            });

            if (GM_getValue('search_index', null) === null) {
                GM_setValue('search_index', Object.keys(this.resource_sites)[0]);
            }

            this.cur_engine(this.keyword, function (src, data) {
                if (data.length === 0) {
                    let url = temp.full_url;
                    $(`#nong-table-new-${temp.randomNum} #notice`).text('No search result! ');
                    $(`#nong-table-new-${temp.randomNum} #notice`)
                        .append(`<a href="${url}" target="_blank" style="color: red;">&nbsp;Go</a>`);
                }
                else {
                    temp.updata_table(src, data, 'full');
                    /*display search url*/
                    let y = $(`#jav-nong-head-${temp.randomNum} th`)[1].firstChild;
                    y.href = temp.full_url;
                }
            });
        }

        /**
         * 处理加载磁链搜索列表的位置
         */
        processMagnetTab(){}

        cur_engine(kw, cb) {
            let ops = Object.keys(ThridpartyScript.Nong.resource_sites);
            //let z = this.resource_sites[GM_getValue('search_index', ops[0])];
            let z = ThridpartyScript.Nong.resource_sites[GM_getValue('search_index', ops[0])];
            if (!z) {
                GM_setValue('search_index', ops[0]);
                z = ThridpartyScript.Nong.resource_sites[GM_getValue('search_index')];
            }
            return z(kw, cb);
        }

        create_empty_table() {   //有用 hobby
            return ThridpartyScript.Nong.template.creteDomElement(
                `<table class="nong-table-new" id="nong-table-new-${this.randomNum}" rd="${this.randomNum}"></table>`);
        }

        updata_table(src, data, type) {
            if (type == 'full') {
                let tab = $('#nong-table-new-'+ this.randomNum)[0];//"<table class="nong-table-new" id="nong-table-new-37331102" rd="37331102"></table>"
                tab.removeChild(tab.querySelector("#notice").parentElement.parentElement);
                for (let i = 0; i < data.length; i++) {
                    tab.appendChild(ThridpartyScript.Nong.template.create_row(data[i]));
                }
            }
            this.reg_event();
        }

        full() {
            let tab = this.create_empty_table();
            tab.appendChild(ThridpartyScript.Nong.template.create_head(this.randomNum));
            tab.appendChild(ThridpartyScript.Nong.template.create_loading());
            return tab;
        }

        handle_event(event) {
            let maglink = event.target.parentElement.parentElement.getAttribute('maglink')
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
                let promise = Common.request('http://115.com/?ct=offline&ac=space&_='+ new Date().getTime());
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
        }

        reg_event() { // target 处理 更精准
            let list = [
                '.nong-copy',
                '.nong-offline-download'
            ];
            for (let i = 0; i < list.length; i++) {
                let a = document.querySelectorAll(list[i]);
                for (let u = 0; u < a.length; u++) {
                    a[u].addEventListener('click', this.handle_event, false);
                }
            }
        }

        parse_error(a) {
            alert("调用搜索引擎错误，可能需要更新，请向作者反馈。i=" + a);
        }
    };
    ThridpartyScript.Nong.resource_sites = {  // 数组函数
        "btos.pw": function (keyword, cb) { //btsow
            let promise = Common.request("https://" + GM_getValue('search_index') + "/search/" + keyword);
            promise.then((result) => {
                this.full_url = result.finalUrl;
                var doc = Common.parsetext(result.responseText);
                if (!doc) {
                    this.parse_error(GM_getValue('search_index'));
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
        "www.btdig.com": function (keyword, cb) {
            let promise = Common.request("https://" + GM_getValue('search_index') + "/search?q=" + keyword);
            promise.then((result) => {
                this.full_url = result.finalUrl;
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
        "sukebei.nyaa.si": function (keyword, cb) {
            let promise = Common.request("https://" + GM_getValue('search_index') + "/?f=0&c=0_0&q=" + keyword);
            promise.then((result) => {
                this.full_url = result.finalUrl;
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
                            "src": "https://sukebei.nyaa.si"
                                + elem.querySelector("td:nth-child(2)>a:nth-child(1)").getAttribute('href'),
                        });
                    }
                }
                cb(result.finalUrl, data);
            });
        },
        "www.torrentkitty.tv": function (keyword, cb) {
            let promise = Common.request("https://" + GM_getValue('search_index') + "/search/" + keyword);
            promise.then((result) => {
                this.full_url = result.finalUrl;
                let doc = Common.parsetext(result.responseText);
                let data = [];
                let t = doc.querySelectorAll("#archiveResult tr");
                if (t) {
                    t = Array.slice(t, 1, t.length);
                    for (let elem of t) {
                        if((/(No result)/g).test(elem.querySelector(".name").textContent))
                            break;
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
            });
        },

    };
    ThridpartyScript.Nong.offline_sites = {
        115: {
            name: '115离线',
            url: 'http://115.com/?tab=offline&mode=wangpan',
            enable: true,
        },
    };

    ThridpartyScript.Nong.template = class {
        static create_head(randomNum) {
            var tr = document.createElement('tr');
            tr.className = 'jav-nong-row';
            tr.id = 'jav-nong-head-'+randomNum;
            let list = ['标题','大小','操作','离线下载'];
            for (let i = 0; i < list.length; i++) {
                let b = ThridpartyScript.Nong.template.head.cloneNode(true);
                if (i === 0) {
                    let select = document.createElement("select");
                    select.id = randomNum;
                    let ops = Object.keys(ThridpartyScript.Nong.resource_sites);
                    let cur_index = GM_getValue("search_index", ops[0]);
                    for (let j = 0; j < ops.length; j++) {
                        let op = document.createElement("option");
                        op.value = ops[j];
                        op.textContent = ops[j];
                        if (cur_index == ops[j]) {
                            op.setAttribute("selected", "selected");
                        }
                        select.appendChild(op);
                    }
                    b.removeChild(b.firstChild);
                    b.appendChild(select);
                    tr.appendChild(b);
                    continue;
                }
                b.firstChild.textContent = list[i];
                tr.appendChild(b);
            }

            return tr;
        }

        static create_row(data) {
            var a = document.createElement('tr');
            a.className = 'jav-nong-row';
            a.setAttribute('maglink', data.maglink);

            // 暂时针对cnbtkitty.pw站点生效。
            if(data.maglink.indexOf("#magnetlink")>-1){
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
        }

        static create_loading() {
            return this.creteDomElement('<tr class="jav-nong-row"><td><p id="notice">Loading</p></td></tr>');
        }

        static create_info(title, maglink) {
            let a = this.info.cloneNode(true);
            a.firstChild.textContent = title.length < 20 ? title : title.substr(0, 20) + '...';
            a.firstChild.href = maglink;
            a.title = title;
            return a;
        }

        static create_size(size, src) {
            let a = this.size.cloneNode(true);
            a.textContent = size;
            a.href = src;
            return a;
        }

        static create_operation(maglink) {
            let a = this.operation.cloneNode(true);
            a.firstChild.href = maglink;
            return a;
        }

        static create_offline() {    //有用 hobby
            let a = this.offline();
            a.className = 'nong-offline';
            return a;
        }

        static offline() {
            let a = document.createElement('div');
            let b = document.createElement('a');
            b.className = 'nong-offline-download';
            b.target = '_blank';
            let offline_sites = ThridpartyScript.Nong.offline_sites
            for (let k in offline_sites) {
                if (offline_sites[k].enable) {
                    let c = b.cloneNode(true);
                    c.href = offline_sites[k].url;
                    c.textContent = offline_sites[k].name;
                    a.appendChild(c);
                }
            }
            return a;
        }

        static creteDomElement(htmlStr){
            //return document.createRange().createContextualFragment(htmlString);  // dom树结构出错
            //let parser = new DOMParser();
            //return (parser.parseFromString(htmlString,"text/xml"));  //出错
            //return $(htmlString).get(0); // create_loading结果出错
            let div = document.createElement("div");
            $(div).append(htmlStr);
            return div.childNodes[0];
        }
    };
    ThridpartyScript.Nong.template.head = ThridpartyScript.Nong.template.creteDomElement('<th><a></a></th>');
    ThridpartyScript.Nong.template.info = ThridpartyScript.Nong.template.creteDomElement('<div><a href="src">name</a></div>');
    ThridpartyScript.Nong.template.size = ThridpartyScript.Nong.template.creteDomElement('<a>size</a>');
    ThridpartyScript.Nong.template.operation = ThridpartyScript.Nong.template.creteDomElement('<div><a class="nong-copy">复制</a></div>');

    // 登录115执行脚本，自动离线下载准备步骤
    ThridpartyScript.login115Run = () =>{
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
    }

    class BlogjavWaterfall extends ThridpartyScript.Waterfall {
        constructor(columnNum,selectorNext,selectorItem){
            super(columnNum,selectorNext,selectorItem);
        }

        /**
         * 处理当前页面加载项
         * @param item  当前页面加载元素
         */
        processItem(item){
            let id = $(item).attr('id');
            if($(`#${id}`).length > 0) {
                $(item).attr('id','delete');
                $(item).empty();
                return;
            }
            // 获取文章的标题文字
            let titleStr = $(item).find("h1[itemprop='name'] a,h2[itemprop='name'] a")[0].innerHTML;
            if(location.href.indexOf("deleteOccident") > 0 ){//&& Common.hasWords(titleStr,occidentSeriesArray)
                let reg = /[\w\s&’.,:;!+-=?]/g;
                let str = titleStr.replace(reg,'');
                str = str.replace('–','').replace('–','');
                console.log('66666:'+str);
                if(str.length <= 0){
                    console.log('delete: '+titleStr);
                    $(item).attr('id','delete');
                    $(item).empty();
                    return;
                }
            }

            let aEle = $(item).find("a.more-link")[0];
            let handleFlag = $(aEle).attr('handle');
            if(!handleFlag){
                $(aEle).attr('handle', '1');
                $(aEle).html("点击进内页");

                //查找title2的div元素
                let divEle = $(item).children("div.title2")[0];
                $(item).html($(item).html().replace(/Tags:/ig,'')
                    .replace('View More Info &amp; Screenshot :',''));

                $(item).find('.date').append("&nbsp; Tags: &nbsp;").append($(item).find('.tags'));
                $(item).find('.date').append("&nbsp;&nbsp; View More Info & Screenshot:&nbsp;");
                $(item).find('.date').append(aEle);

                let requstUrl = aEle.href;

                //封面图
                //let imgEle = $(item).find("img.alignnone")[0];

                // 过滤文字
                titleStr = titleStr.replace(/【/g, " ");
                titleStr = Common.filterWords(titleStr);
                let code = "";

                //如果包含指定单词字符
                if(Common.hasWords(titleStr,wordsArray)){
                    // 获取av番号
                    code = titleStr.split(" ")[0] + " " + titleStr.split(" ")[1];
                }
                else{
                    // 获取av番号
                    code = titleStr.split(" ")[0];
                }


                // 将外链元素P插入帖子div元素内最后面
                if(code !== ""){
                    $(item).append(Common.crtOutLink(code));
                }
                else{
                    $(item).append(Common.crtOutLink(titleStr.split(" ")[1]));
                }
                requstUrl = requstUrl.replace('#', "?");//console.log("requstUrl:"+requstUrl);

                //异步请求调用内页详情的访问地址
                GM_xmlhttpRequest({
                    method: "GET",
                    //大图地址
                    url: requstUrl + "?" + code,
                    headers:{
                        referrer:  "http://pixhost.org/"
                    },
                    onload: function(XMLHttpRequest) {
                        let bodyStr = XMLHttpRequest.responseText;
                        let yixieBody = bodyStr.substring(bodyStr.search(/<span id="more-(\S*)"><\/span>/),bodyStr.search(/<div class="category/));

                        let dateBody = bodyStr.substring(bodyStr.search(/<span class="comm"/),bodyStr.search(/<div class="cover"/));//<span class="comm">Date: August 6th, 2015</span>

                        let dateStr = dateBody.substring(dateBody.indexOf('<span'),dateBody.indexOf('<\/span') + 7);
                        dateStr = Common.filterDict(dateStr,replaceMonth);
                        //console.log("dateStr:"+dateStr);
                        //console.log("finalUrl:"+XMLHttpRequest.finalUrl);
                        let moreId = XMLHttpRequest.finalUrl.split("?")[1];//例如：more-265519 more-265541
                        let postId = "post" + moreId.substring(4,moreId.length);//例如：post-265519 more-265541
                        //console.log("post:"+postId);

                        $(`#${postId} div[class="date"] span[itemprop="datePublished"]`).remove();
                        //添加日期
                        $(`#${postId} div[class="date"]`).prepend(dateStr);

                        let img_start_idx = yixieBody.search(/"><img .*src="https*:\/\/(\S*)pixhost.*\/thumbs\//);
                        //如果找到内容大图
                        if( img_start_idx > 0)
                        {
                            // 预览JAV缩略图
                            let new_img_src = yixieBody.substring(yixieBody.indexOf('src',img_start_idx) + 5,yixieBody.indexOf('alt') - 2).replace('"','');
                            // 预览JAV大图
                            let targetImgUrl = new_img_src.replace('thumbs','images').replace('//t','//img').replace('"','') + '?';

                            let $imgCover = $('#'+postId+' p img');

                            $('#'+postId+' p img.emoji').remove();
                            $imgCover.attr("class","alignnone");
                            $(item).find('.alignnone').nextAll().remove();

                            // 获取av番号
                            var vid = XMLHttpRequest.finalUrl.split("?")[2];
                            console.log(`vid:${vid} imgUrl:${targetImgUrl}  url:${XMLHttpRequest.finalUrl}`);
                            Common.addJavMovieImg(new_img_src,targetImgUrl,function ($img) {
                                $img.attr("vid",vid);
                                $imgCover.after($img);
                            });
                        }
                    }
                });//end  GM_xmlhttpRequest
            }
        }
    }

    class BlogjavNong extends  ThridpartyScript.Nong {
        constructor(keyword,randomNum,$locateObj){
            super(keyword,randomNum,$locateObj);
        }

        /**
         * 处理加载磁链搜索列表的位置
         */
        processMagnetTab($locateObj){
            //let $img = $(this).parents(".nong-table-new").siblings("img[name='javRealImg']");
            if(!$locateObj.attr("class")){
                $locateObj.after(this.cur_tab);
            }else{
                $locateObj.before(this.cur_tab);
            }
        }
    }

    function onlyViewsAndSeeAll(){
        //获取所有jav的div元素
        let jav_div_arr = $("div[class='single']");
        let seeAllFlag = $('#onlyViews').attr("seeall");
        for (let index = 0; index < jav_div_arr.length; index++) {
            let javDivEle = jav_div_arr[index];
            let isViewFlag = $(javDivEle).attr("isView");

            if(!isViewFlag || isViewFlag == '0'){
                if(seeAllFlag == '1'){
                    $(javDivEle).css("display","none");//todo     display: none;
                }
                else{
                    $(javDivEle).css("display","");
                }
            }
            else{
                if(seeAllFlag == '1'){
                    $(javDivEle).find('img[name="javRealImg"]').click();
                }
            }
        }

        if(seeAllFlag == '1'){
            $('#navigation')[0].scrollIntoView();
            $('#onlyViews').attr("seeall","0");
            $("#onlyViews").text("查看全部");
        }
        else{
            $('#onlyViews').attr("seeall","1");
            $("#onlyViews").text("只看已阅");
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        // 115脚本运行
        ThridpartyScript.login115Run();
        $("#top").remove();
        $("div.rate").remove();

        //覆盖原有css样式
        //GM_addStyle('body {background: white;}');
        GM_addStyle(`
            #catmenu {width: 100%;} .link {text-align: center;color: red;text-decoration: underline;}
            #top {width: 100%;} .breadcrumbs {display: -webkit-box;}
            #wrapper {width: 100%;margin: 0 auto;} .tags {width:0 !important}
            #waterfall {float: none; width: auto;height: 100%;padding:10px 0 0 10px;overflow: hidden;display: block;}
            #casing {background: #fff;width: initial;padding: 0 0 10px;}
            .right {float: left;width: 185px;padding: 0px 0 0;margin-right: 0;}
            img.alignnone {width: initial;max-width: 1000px;float: left;padding: 0px;}
            .single {width: initial;display: grid;margin: 0 0 0 10px;}/**display: table-row;*/
            #navigation {width: inherit;margin-left: 10px;}
            .max{width:auto;height:auto;max-width: none;}
            .min{width:66px;height:auto;}
            .tags{width: 200px;display: inline-table;} 
            #s{width: 155px;}#search{width: 155px;}.sidebox {width: 200px;}.video {width: 175px;}.sidebox ul li {width: 195px;}.subscription_email {width: 75%;}
        `);

        // 挊
        GM_addStyle(`
            .nong-table-new {margin:0 0 0 5px;color:#666 !important;font-size:13px;text-align:center;background-color: #c9c7c7;float: left;border-spacing: 1px;}
            .nong-table-new th,.nong-table-new td {text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;}
            .jav-nong-row{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}
            .nong-copy{color:#08c !important;}
            .nong-offline{text-align: center;}
            #jav-nong-head a {margin-right: 5px;}
            .nong-offline-download{color: rgb(0, 180, 30) !important; margin-right: 4px !important;}
            .nong-offline-download:hover{color:red !important;}
        `);

        //<meta http-equiv="refresh" content="1200"> 每20分钟刷新一次 目前无法处理
        $(".right").insertBefore("#content");
        $('.breadcrumbs').append($("#navigation").clone());

        $("#top").remove();

        //删除所有a元素的href为www.histats.com网址的数据
        $("a[href='http://www.histats.com']").remove();

        //获取分页链接的所有a元素
        var page_a_arr = $("div[class='wp-pagenavi'] a");
        for (var index = 0; index < page_a_arr.length; index++) {
            var pageAEle = page_a_arr[index];
            $(pageAEle).attr("target","_blank");
        }

        //导航栏上增加内容显示
        $("#catmenu").append(`<ul style="float: right;font-size: 125%;">
                <li id="hisli"><a style="color: white;" id="hisUrl">上次加载到的那一页&nbsp;&nbsp;</a></li>
                <li><a style="color: white;">已加载页数:&nbsp;&nbsp;<span id="addPageNbr">0</span>&nbsp;&nbsp;</a></li>
                <li><a style="color: white;">已加载到第&nbsp;<span id="currNextPageNbr">1</span>&nbsp;页&nbsp;&nbsp;</a></li>
                <li><a style="color: white;">已阅JAV数:&nbsp;&nbsp;<span id="viewJavNbr">0</span>&nbsp;&nbsp;</a></li>
                <li><a id="onlyViews" seeall="1" href="javascript:void(0);" style="color: red;">只看已阅</a></li>
                <li><a href="${location.pathname}?deleteOccident" style="color: yellow;">不看欧美</a></li>
            </ul>`);
        $("#onlyViews").click(function(){
            onlyViewsAndSeeAll();
        });

        //区分列表和详细内页
        if($('#content div[itemscope]').length > 0){
            $('#content').attr("id","waterfall");
            let blogJavWaterfall = new BlogjavWaterfall(1,'a.nextpostslink','div#content div.single');
            blogJavWaterfall.intersectionObserver().observe($('.footer').get(0));
        }
    }, false);
})();