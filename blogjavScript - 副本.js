// ==UserScript==
// @name         blogjav.net排版脚本
// @namespace    http://greasyfork.org/zh-CN/users/25794
// @version      1.2.4
// @description  blogjav.net网站重新排版，浏览图片下载内容更方便，你懂的
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

// @connect      blogjav.net
// @connect      pixhost.org
// @connect      imagebam.com
// @connect      115.com
// @connect      btsow.pw
// @connect      btdb.in

// @copyright    hobby 2016-04-02

// 交流QQ群：273406036
// 内地用户推荐Chrome + Tampermonkey（必须扩展） + XX-Net(代理) + Proxy SwitchyOmega（扩展）的环境下配合使用。

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
/* jshint -W097 */
(function() {
    'use strict';
    var X_userID = 0; //115用户ID
    //icon图标
    var icon = GM_getResourceURL('icon');

    //过滤文字单词的数组
    var filterWordsArray = new Array(
        'UNCENSORED','CENSORED','IDOL','Caribbeancompr','Caribbeancom','Gachinco','10musume','天然むすめ','カリビアンコム プレミアム','カリビアンコム','PPV','Real Street Angels','41Ticket',
        'GALAPAGOS','Mesubuta','1000人斬り','Tokyo Hot','AV志向','アジア天国','キャットウォーク ポイズン','G-AREA','Honnamatv','ABBY','エッチな4610','','','H4610',
        '金8天国','av9898','エッチな4610','エッチな0930','15-daifuku','','ハメる','The 変態','人妻斬り','娘姦白書','','1pondo','Kin8tengoku','Pacopacomama','',
        'Heydouga','Nyoshin','Unkotare','','Muramura','H0930','C0930','1000giri','XXX-AV','Kt-joker','<strong>','FC2','PPV','','','','',
        '\\[FHD\\]','\\[HD\\]','\\[D9ISO\\]','\\[FHD60fps\\]'
    );

    //不过滤用于判断截取字符位置的单词
    var wordsArray = new Array(
        'S-Cute','Asiatengoku','Real-diva','Jukujo-club','\[julesjordan\]','\[colette\]','Mywife-No','Roselip','Zipang','HEYZO','1919gogo','\[DDF\] ','\[Wow\]','\[21members\]','Blacked','\[sexart\]','Heyzo',
        'X1X','\[babes\]','Mywife-NO','Peepsamurai','',''
    );

    //多文字过滤的月份字典定义,前为替换前字符，后为替换后字符
    var replaceMonth = {
        "January" : "一月",
        "February" : "二月",
        "March": "三月",
        "April" : "四月",
        "May": "五月",
        "June" : "六月",
        "July": "七月",
        "August" : "八月",
        "September": "九月",
        "October" : "十月",
        "November": "十一月",
        "December": "十二月"
    };


    var common = {
        //过滤字典方法
        filterDict:function (str,replacements){
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
        },
        // end 替换多个字符串代码结束
        // 过滤文字单词函数
        // param srcString 需过滤字符串
        // return 过滤后的字符串
        filterWords:function (srcString){
            for(var i = 0; i < filterWordsArray.length ; i ++){
                if(filterWordsArray[i] !== ""){
                    srcString = srcString.replace(/(^\s*)/g, "").replace(new RegExp(filterWordsArray[i],'ig'),"");
                }
            }
            return srcString;
        },
        // 判断字符串是否包含单词字典
        // param srcString 需判断字符串
        // return true,false
        hasWords:function (srcString){
            for(var i = 0; i < wordsArray.length ; i ++){
                if(wordsArray[i] !== ""){
                    srcString = $.trim(srcString);
                    if(srcString.split(" ")[0] === wordsArray[i]){
                        return true;
                    }
                }
            }
            return false;
        },
        parsetext: function(text) {
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
        //方法: 通用chrome通知
        notifiy:function (title, body, icon, click_url){
            var notificationDetails = {
                text: body,
                title: title,
                timeout: 10000,
                image: icon,
                onclick: function() {
                    window.open(click_url);
                }
            };
            GM_notification(notificationDetails);
        },
        // 创建查找av的外链html内容元素P
        // param avCode av番号
        // return 外链html内容元素P
        crtOutLink: function(avCode){
            var p = $(
                '<p style="text-align: center;color: blue;margin: 0 auto;clear: both;">'+
                '他站查找 ['+ avCode +']：'+
                '<a target="_blank" href="https://avgle.com/search/videos?search_query='+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">avgle</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="http://www.javlibrary.com/cn/vl_searchbyid.php?keyword='+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">javlibrary</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="http://maddawgjav.net/?s='+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">maddawgjav</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="http://javbest.net/?s='+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">javbest</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="http://javpop.com/index.php?s='+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">javpop</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '留种： '+
                '<a target="_blank" href="https://btsow.pw/search/'+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">btsow</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="https://btdb.in/q/'+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">btdb</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="http://sukebei.nyaa.si/?f=0&c=0_0&q='+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">sukebei.nyaa</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<a target="_blank" href="https://www.limetorrents.cc/search/all/'+ avCode +'" title="搜 '+ avCode +'" style="text-align: center;color: red;text-decoration: underline;">limetorrents</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '</p>'
            )[0];
            return p;
        },
        addJavMovieImg:function(smallImgUrl,imgUrl,insertImgFunc){
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

            //$imgCover.after($img);
            //插入图片函数，将图片插入到某个位置
            insertImgFunc($img);

            if(reg.test(location.href) && !reg1.test(location.href)){
                $($img[0].parentElement).attr('bigImg', '1');
            }

            $img.click(function(){
                let bigImgFlag = $(this.parentElement).attr('bigImg');
                //console.log("bigImgFlag:" + bigImgFlag);
                //console.log("!bigImgFlag:" + !bigImgFlag);


                //3为超时，2为异常
                if($(this).attr("loadRes") == '2' || ($(this).attr("loadRes") == '3'&& !this.complete)){
                    //debugger;
                    //$(this).attr("src",":0");
                    common.addJavMovieImg(smallImgUrl,imgUrl+'hobby',insertImgFunc);
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

                if(!$(this).attr("loadMagnet")){
                    $(this).attr('loadMagnet', '1');
                    $(this.previousElementSibling).remove();
                    main = {
                        blogjav: {
                            type: 0,
                            re: /blogjav/,
                            vid: $(this).attr("vid"),
                            proc: function() {
                                //debugger;
                                //console.log("123:"+main.cur_tab);
                                if(!$img.attr("class")){
                                    $img.after(main.cur_tab);
                                }else{
                                    $img.before(main.cur_tab);
                                }
                            },
                        },
                    };
                    main_keys = Object.keys(main); //下面的不要出现
                    main.cur_tab = null;
                    main.cur_vid = '';
                    main.rd = parseInt(Math.random()*100000000);
                    if(GM_getValue('search_index',null) === null){
                        GM_setValue('search_index',0);
                    }
                    thirdparty.searchMagnetRun();
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

                    common.addJavMovieImg(imgUrl,imgUrl+'hobby',insertImgFunc);
                    $(this).remove();
                    //$imgParentEle.find('img[name="javRealImg"]').click();
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
                    //$(image).attr('rawSrc', $(image).attr('src'));
                    //$(image).attr('src',':0');
                }
            }, 30000);

            //common.imgLoadResRun($img[0]);
        },
        imgLoadResRun: function(image){

            $(image).load(function(){
                console.log("加载完成");
                $(image).attr('loadRes', '1');
            });
            $(image).error(function(){
                console.log("加载异常");
                $(image).attr('loadRes', '2');
            });
            setTimeout(function(){
                var res = $(image).attr('loadRes');
                if(!res){
                    $(image).attr('loadRes', '3');//加载超时
                    //$(image).attr('rawSrc', $(image).attr('src'));
                    //$(image).attr('src',':0');
                }
            }, 30000);
        },
    };

    function blogjavScriptRun(){
        //获取所有下载内页链接的a元素
        var a_array = $("a[class='more-link']");
        for (var i = 0; i < a_array.length; i++) {
            var aEle = a_array[i];
            var handleFlag = $(aEle).attr('handle');
            //console.log("handleFlag:" + handleFlag);
            //console.log("handleFlag:" + !handleFlag);
            if(!handleFlag){
                $(aEle).attr('handle', '1');
                $(aEle).html("点击进内页");
                //aEle.firstElementChild.width = "100";

                //debugger;
                var requstUrl = aEle.href;
                //查找a元素的所有父元素的title2的div元素
                //var divEle = $(aEle).parents("div[class='title2']")[0];
                var divEle2 = $(aEle).parents("div[class='single']")[0];
                var divEle = $(divEle2).children("div[class='title2']")[0];
                //封面图
                var imgEle = $(divEle2).find("img[class='alignnone']")[0];


                //判断url是不是https，如是转成http
                //var srcUrl = $(imgEle).attr("src");
                /*if(srcUrl && srcUrl.substring(4,5) == 's'){
                $(imgEle).attr("src",srcUrl.substring(0,4) + srcUrl.substring(5,srcUrl.length));
            }*/

                // 获取文章的标题文字
                var titleStr = $(divEle2).find("h1[itemprop='name'] a,h2[itemprop='name'] a")[0].innerHTML;
                // 过滤文字
                titleStr = common.filterWords(titleStr);
                var code = "";
                //如果包含指定单词字符
                if(common.hasWords(titleStr)){
                    // 获取av番号
                    code = titleStr.split(" ")[0] + " " + titleStr.split(" ")[1];
                }
                else{
                    // 获取av番号
                    code = titleStr.split(" ")[0];
                }


                // 将外链元素P插入帖子div元素内最后面
                if(code !== ""){
                    $(divEle.parentElement).append(common.crtOutLink(code));
                }
                else{
                    $(divEle.parentElement).append(common.crtOutLink(titleStr.split(" ")[1]));
                }

                //标注队列顺序
                //$(imgEle).attr("queue",i);

                //异步请求调用内页详情的访问地址
                GM_xmlhttpRequest({
                    method: "GET",
                    //大图地址
                    url: requstUrl + "#" + code,
                    headers:{
                        referrer:  "http://pixhost.org/"
                    },
                    onload: function(XMLHttpRequest) {
                        var bodyStr = XMLHttpRequest.responseText;
                        var yixieBody = bodyStr.substring(bodyStr.search(/<span id="more-(\S*)"><\/span>/),bodyStr.search(/<div class="category/));

                        var dateBody = bodyStr.substring(bodyStr.search(/<span class="comm"/),bodyStr.search(/<div class="cover"/));//<span class="comm">Date: August 6th, 2015</span>

                        var dateStr = dateBody.substring(dateBody.indexOf('<span'),dateBody.indexOf('<\/span') + 7);
                        dateStr = common.filterDict(dateStr,replaceMonth);
                        console.log("dateStr:"+dateStr);

                        var moreId = XMLHttpRequest.finalUrl.split("#")[1];//例如：more-265519 more-265541
                        var postId = "post" + moreId.substring(4,moreId.length);//例如：post-265519 more-265541
                        console.log("post:"+postId);

                        //添加日期
                        $('#'+postId+' div[class="date"]').prepend(dateStr);

                        //debugger;
                        var img_start_idx = yixieBody.search(/"><img .*src="https*:\/\/(\S*)pixhost.*\/thumbs\//);
                        //如果找到内容大图
                        if( img_start_idx > 0)
                        {
                            // 预览JAV缩略图
                            var new_img_src = yixieBody.substring(yixieBody.indexOf('src',img_start_idx) + 5,yixieBody.indexOf('alt') - 2).replace('"','');
                            // 预览JAV大图
                            var targetImgUrl = new_img_src.replace('thumbs','images').replace('//t','//img').replace('"','') + '?';


                            var $imgCover = $('#'+postId+' p img');
                            //debugger;
                            //var $imgCover = $('#'+postId+' img[class="alignnone"]');

                            $imgCover.attr("class","alignnone");

                            //获取队列顺序，异步请求传参会错乱，所以这么处理
                            // var queue = parseInt($imgCover.attr("queue"));
                            // //设置延迟时间，单位毫秒
                            // var time = 0;
                            // if(queue <= 2){
                            //     time = 0;
                            // }
                            // else if (queue <= 5){
                            //     time = 100;
                            // }
                            // else if (queue <= 8){
                            //     time = 200;
                            // }
                            // else if (queue <= 11){
                            //     time = 300;
                            // }
                            // else if (queue <= 14){
                            //     time = 400;
                            // }
                            //setTimeout(function (){
                                // 获取av番号
                                var vid = XMLHttpRequest.finalUrl.split("#")[2];
                                console.log(vid +" imgUrl:"+targetImgUrl);
                                common.addJavMovieImg(new_img_src,targetImgUrl,function ($img) {
                                    $img.attr("vid",vid);
                                    $imgCover.after($img);
                                });
                            //},time);

                        }
                    }
                });//end  GM_xmlhttpRequest
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

    // 第三方脚本调用
    var thirdparty = {
        // 挊
        offline_sites : {
            115: {
                name: '115离线',
                url: 'http://115.com/?tab=offline&mode=wangpan',
                enable: true,
            },
        },
        // 挊
        searchMagnetRun: function() {
            for (var i = 0; i < main_keys.length; i++) {
                var v = main[main_keys[i]];

                //for javlibrary
                if($("#adultwarningprompt")[0] !== null){
                    //$("#adultwarningprompt input")[0].click();
                }

                if (v.re.test(location.href)) {
                    if (v.type === 0) {
                        try {
                            //debugger;
                            main.cur_vid = v.vid;
                        }
                        catch (e) {
                            main.cur_vid = '';
                        }
                        if (main.cur_vid) {
                            main.cur_tab = thirdparty.magnet_table.full();
                            console.log('番号：', main.cur_vid);
                            v.proc();

                            // console.log(main.cur_tab)
                            //debugger;
                            var t = $('#nong-head'+main.rd)[0].firstChild;
                            t.firstChild.addEventListener('change', function(e) {
                                console.log("aaa:" + e.target.value);
                                GM_setValue('search_index', e.target.value);
                                var s = $('#nong-table-new'+main.rd)[0];
                                s.parentElement.removeChild(s);
                                thirdparty.searchMagnetRun();
                            });

                            thirdparty.search_engines.cur_engine(main.cur_vid, function(src, data) {
                                if (data.length === 0) {
                                    $('#nong-table-new'+main.rd)[0].querySelectorAll('#notice')[0].textContent = 'No search result';
                                }
                                else {
                                    thirdparty.magnet_table.updata_table(src, data, 'full');
                                    /*display search url*/
                                    var y = $('#nong-head'+main.rd+' th')[1].firstChild;
                                    y.href = thirdparty.search_engines.full_url;
                                }
                            });
                        }
                    }
                    break;
                }
            }
        },
        // 挊
        search_engines : {
            switch_engine: function(i) {
                // var index = GM_getValue("search_index",0);
                GM_setValue('search_index', i);
                return i;
            },
            cur_engine: function(kw, cb) {
                var z = this[GM_getValue('search_index', 0)];
                if(!z){
                    alert("search engine not found");
                }
                return z(kw, cb);
            },
            parse_error:function(a){
                alert("调用搜索引擎错误，可能需要更新，请向作者反馈。i="+ a);
            },
            full_url: '',
            0: function(kw, cb) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'https://btsow.pw/search/' + kw,
                    onload: function(result) {
                        thirdparty.search_engines.full_url = result.finalUrl;
                        var doc = common.parsetext(result.responseText);
                        if (!doc) {
                            thirdparty.search_engines.parse_error(GM_getValue('search_index'));
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
                        console.log("搜索结果数：" + data.length);
                        cb(result.finalUrl, data);
                    },
                    onerror: function(e) {
                        console.log(e);
                    }
                });
            },
            1: function(kw, cb) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'https://btdb.in/q/' + kw + '/',
                    onload: function(result) {
                        thirdparty.search_engines.full_url = result.finalUrl;
                        var doc = common.parsetext(result.responseText);
                        if(!doc){
                            thirdparty.search_engines.parse_error(GM_getValue('search_index'));
                        }
                        var data = [];
                        var elems = doc.getElementsByClassName('item-title');
                        for (var i = 0; i < elems.length; i++) {
                            data.push({
                                'title': elems[i].firstChild.title,
                                'maglink': elems[i].nextElementSibling.firstElementChild.href,
                                'size': elems[i].nextElementSibling.children[1].textContent,
                                'src': 'https://btdb.in' + elems[i].firstChild.getAttribute('href'),
                            });
                        }
                        console.log("搜索结果数：" + data.length);
                        cb(result.finalUrl, data);
                    },
                    onerror: function(e) {
                        console.log(e);
                    }
                });
            },
        },
        // 挊
        magnet_table : {
            template: {
                create_head: function() {
                    var a = document.createElement('tr');
                    a.className = 'nong-head';
                    a.id = 'nong-head'+main.rd;
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
                            var ops = ["btsow", "btdb"];
                            var cur_index = GM_getValue("search_index",0);
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
                create_row: function(data) {
                    var a = document.createElement('tr');
                    a.className = 'nong-row';
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
                create_loading: function() {
                    var a = document.createElement('tr');
                    a.className = 'nong-row';
                    var p = document.createElement('p');
                    p.textContent = 'Loading';
                    p.id = 'notice';
                    a.appendChild(p);
                    return a;
                },
                create_info: function(title, maglink) {
                    var a = this.info.cloneNode(true);
                    a.firstChild.textContent = title.length < 20 ? title : title.substr(0, 20) + '...';
                    a.firstChild.href = maglink;
                    a.title = title;
                    return a;
                },
                create_size: function(size, src) {
                    var a = this.size.cloneNode(true);
                    a.textContent = size;
                    a.href = src;
                    return a;
                },
                create_operation: function(maglink) {
                    var a = this.operation.cloneNode(true);
                    a.firstChild.href = maglink;
                    return a;
                },
                create_offline: function() {    //有用 hobby
                    var a = this.offline();
                    a.className = 'nong-offline';
                    return a;
                },
                create_select_box: function() {
                    var select_box = document.createElement('select');
                    select_box.id = 'nong-search-select';
                    select_box.setAttribute('title', '切换搜索结果');
                    var search_name = GM_getValue('search', default_search_name);
                    for (var k in thirdparty.search_engines) {
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
                head: (function() {
                    var a = document.createElement('th');
                    var b = document.createElement('a');
                    a.appendChild(b);
                    return a;
                })(),
                info: (function() {
                    var a = document.createElement('div');
                    var b = document.createElement('a');
                    b.textContent = 'name';
                    b.href = 'src';
                    a.appendChild(b);
                    return a;
                })(),
                size: function() {
                    var a = document.createElement('a');
                    a.textContent = 'size';
                    return a;
                }(),
                operation: (function() {
                    var a = document.createElement('div');
                    var copy = document.createElement('a');
                    copy.className = 'nong-copy';
                    copy.textContent = '复制';
                    a.appendChild(copy);
                    return a;
                })(),
                offline: function() {
                    var a = document.createElement('div');
                    var b = document.createElement('a');
                    b.className = 'nong-offline-download';
                    b.target = '_blank';
                    //debugger;
                    for (var k in thirdparty.offline_sites) {
                        if (thirdparty.offline_sites[k].enable) {
                            var c = b.cloneNode(true);
                            c.href = thirdparty.offline_sites[k].url;
                            c.textContent = thirdparty.offline_sites[k].name;
                            a.appendChild(c);
                        }
                    }
                    return a;
                },
            },
            create_empty_table: function() {   //有用 hobby
                var a = document.createElement('table');
                a.className = 'nong-table-new';
                a.id = 'nong-table-new' + main.rd;
                return a;
            },
            updata_table: function(src, data, type) {
                if (type == 'full') {
                    var tab = $('#nong-table-new'+main.rd)[0];
                    //debugger;
                    tab.removeChild(tab.querySelector("#notice").parentElement);
                    for (var i = 0; i < data.length; i++) {
                        tab.appendChild(thirdparty.magnet_table.template.create_row(data[i]));
                    }
                }
                // else if(type =='mini'){
                // }

                this.reg_event();
            },
            full: function(src, data) {
                var tab = this.create_empty_table();
                tab.appendChild(thirdparty.magnet_table.template.create_head());
                // for (var i = 0; i < data.length; i++) {
                //     tab.appendChild(thirdparty.magnet_table.template.create_row(data[i]))
                // }
                var loading = thirdparty.magnet_table.template.create_loading();
                tab.appendChild(loading);
                return tab;
            },
            handle_event: function(event) {
                if (event.target.className == 'nong-copy') {
                    event.target.innerHTML = '成功';
                    GM_setClipboard(event.target.href);
                    setTimeout(function() {
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
                        onload: function (responseDetails)
                        {
                            if (responseDetails.responseText.indexOf('html') >= 0) {
                                //未登录处理
                                common.notifiy("115还没有登录",
                                    '请先登录115账户后,再离线下载！',
                                    icon,
                                    'http://115.com/?mode=login'
                                );
                                return false;
                            }
                            var sign115 = JSON.parse(responseDetails.response).sign;
                            var time115 = JSON.parse(responseDetails.response).time;
                            console.log("uid="+ X_userID+" sign:"+sign115+" time:"+ time115);
                            GM_xmlhttpRequest({
                                method: 'POST',
                                url: 'http://115.com/web/lixian/?ct=lixian&ac=add_task_url', //添加115离线任务接口
                                headers:{
                                    "Content-Type":"application/x-www-form-urlencoded"
                                },
                                data:"url="+encodeURIComponent(maglink)+"&uid="+ X_userID + "&sign="+sign115+"&time="+time115, //uid=1034119 ,hobby的
                                onload: function (responseDetails) {
                                    var lxRs = JSON.parse(responseDetails.responseText); //离线结果
                                    if (lxRs.state) {
                                        //离线任务添加成功
                                        common.notifiy("115老司机自动开车",
                                            '离线任务添加成功',
                                            icon,
                                            'http://115.com/?tab=offline&mode=wangpan'
                                        );
                                    }
                                    else{
                                        if(lxRs.errcode == '911'){
                                            lxRs.error_msg = '你的帐号使用异常，需要在线手工重新验证即可正常使用。';
                                        }
                                        common.notifiy("失败了",
                                            '请重新打开115,'+lxRs.error_msg,
                                            icon,
                                            'http://115.com/?tab=offline&mode=wangpan'
                                        );
                                    }
                                    console.log("sign:"+sign115+" time:"+ time115);
                                    console.log("磁链:"+maglink+" 下载结果:"+ lxRs.state+" 原因:"+lxRs.error_msg);
                                    console.log("rsp:"+responseDetails.response);
                                }
                            });
                        }
                    });
                    event.preventDefault(); //阻止跳转
                }
            },
            reg_event: function() { //TODO target 处理 更精准
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
        // 登录115执行脚本，自动离线下载准备步骤
        login115Run: function(){
            X_userID = GM_getValue('hb_user_id', 0); //115用户ID缓存
            //获取115ID
            if (X_userID === 0) {
                if (location.host.indexOf('115.com') >= 0) {
                    if (typeof (window.wrappedJSObject.user_id) != 'undefined') {
                        X_userID = window.wrappedJSObject.user_id;
                        GM_setValue('hb_user_id', X_userID);
                        alert('115登陆成功！');
                        return;
                    }
                } else {
                    //alert('请先登录115账户！');
                    common.notifiy("115还没有登录",
                        '请先登录115账户后,再离线下载！',
                        icon,
                        'http://115.com/?mode=login'
                    );
                    GM_setValue('hb_user_id', 0);
                }
            }

            if (location.host.indexOf('115.com') >= 0)
            {
                if(location.href.indexOf('#115helper') < 0)
                {
                    console.log("115离线助手:115.com, 不初始化.");
                    return false;
                }
                console.log('blogjav:115.com,尝试获取userid.');
                X_userID = GM_getValue('hb_user_id', 0);
                //debugger;
                if(X_userID !== 0)
                {
                    console.log("blogjav: 115账号:"+X_userID+",无需初始化.");
                    return false;
                }
                X_userID = $.cookie("OOFL");
                console.log("blogjav: 115账号:"+X_userID);
                if(!X_userID)
                {
                    console.log("blogjav: 尚未登录115账号");
                    return false;
                }else{
                    console.log("blogjav: 初始化成功");
                    common.notifiy('老司机自动开车', '登陆初始化成功,赶紧上车把!', icon, "");
                    GM_setValue('hb_user_id', X_userID);
                }
                return false;
            }
        },
        // 瀑布流脚本
        waterfall:{
            // 瀑布流脚本
            fetchURL: function(url){
                console.log(`fetchUrl = ${url}`);

                return fetch(url, {
                    credentials: 'same-origin'
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((html) => {
                        return new DOMParser().parseFromString(html, 'text/html');
                    })
                    .then((doc) => {
                        let $doc = $(doc);
                        let nextHref;
                        if($doc.find('a#next').length){
                            nextHref = $doc.find('a#next').attr('href');
                        }
                        else if($doc.find('a[name="nextpage"]').length){
                            nextHref = $doc.find('a[name="nextpage"]').attr('href');
                        }
                        // blogjav
                        else if($doc.find('a[class="nextpostslink"]').length){
                            nextHref = $doc.find('a[class="nextpostslink"]').attr('href');
                        }

                        let nextURL = nextHref ? nextHref : undefined; // blogjav修改
                        let elems = $doc.find('div#content div.single');// blogjav修改
                        //debugger;
                        if(!elems.length){
                            elems = $doc.find('div.videos div.video');
                        }
                        // blogjav
                        else if(!elems.length){
                            elems = $doc.find('div#content div.single');
                        }

                        return {
                            nextURL,
                            elems
                        };
                    });
            },
            // 瀑布流脚本
            fetchSync: function* (urli) {
                let url = urli;
                do {
                    yield new Promise((resolve, reject) => {
                        if (mutex.locked) {
                            reject();
                        } else {
                            mutex.lock();
                            resolve();
                        }
                    }).then(() => {
                        return this.fetchURL(url).then(info => {
                            url = info.nextURL;
                            return info.elems;
                        });
                    }).then(elems => {
                        mutex.unlock();
                        return elems;
                    }).catch((err) => {
                        // Locked!
                    });
                } while (url);
            },
            // 瀑布流脚本
            appendElems: function (arg) {
                let nextpage = pagegen.next();
                if (!nextpage.done) {
                    nextpage.value.then(elems => {
                        /* show .avatar-box only in first page */
                        $('#waterfall').append((!arg) ? elems.slice(1) : elems);
                        blogjavScriptRun();
                        // 已加载页数+1
                        $("#addPageNbr").text(parseInt($("#addPageNbr").text()) + 1);
                    });
                }
                return nextpage.done;
            },
            // 瀑布流脚本
            xbottom: function (elem, limit) {
                return (elem.getBoundingClientRect().top - $(window).height()) < limit;
            },
            // 瀑布流脚本
            end: function () {
                console.info('The End');
                $(document).off('scroll');
                $(document).off('wheel');
                $(anchor).replaceWith($(`<h1>The End</h1>`));
            },
            // 瀑布流脚本
            scroll:	function () {
                if (thirdparty.waterfall.xbottom(anchor, 500) && thirdparty.waterfall.appendElems()) {
                    thirdparty.waterfall.end();
                }
            },
            // 瀑布流脚本
            wheel: function () {
                if (thirdparty.waterfall.xbottom(anchor, 1000) && thirdparty.waterfall.appendElems()) {
                    thirdparty.waterfall.end();
                }
            },
            // 瀑布流脚本
            scrollInit:	function ($pages){
                $(document).on('scroll', thirdparty.waterfall.scroll);
                $(document).on('wheel', thirdparty.waterfall.wheel);
                $pages.remove();
                thirdparty.waterfall.appendElems('first');
                // blogjav 样式
                GM_addStyle([
                    '#waterfall {float: none; width: auto;height: 100%;padding: 0 0 0 0;overflow: hidden;display: block;}',
                ].join(''));
            },
        },
    };
    var main;
    var main_keys;
    document.addEventListener('DOMContentLoaded', function () {
        // 115脚本运行
        //debugger;
        thirdparty.login115Run();
        $("#top").remove();
        $("div.rate").remove();

        //覆盖原有css样式
        //GM_addStyle('body {background: white;}');
        GM_addStyle([
            '#catmenu {width: 100%;}',
            '#top {width: 100%;}',
            '#wrapper {width: 100%;margin: 0 auto;}',
            '#content {float: none;width: auto;height: 100%;padding: 0 0 0 0;overflow:hidden;display:block;}',
            '#casing {background: #fff;width: initial;padding: 0 0 10px;}',
            '.right {float: left;width: 185px;padding: 0px 0 0;margin-right: 0;}',
            'img.alignnone {width: initial;max-width: 1000px;float: left;}',
            '.single {width: initial;}',//display: table-row;
            '#navigation {width: inherit;margin-top: 10px;}',
            '.max{width:auto;height:auto;max-width: none;}',
            '.min{width:66px;height:auto;}',
            '.tags{width: 200px;display: inline-table;}',
            '#s{width: 155px;}#search{width: 155px;}.sidebox {width: 200px;}.video {width: 175px;}.sidebox ul li {width: 195px;}.subscription_email {width: 75%;}',
        ].join(''));

        // 挊
        GM_addStyle([
            '.nong-table-new{margin:0px auto;color:#666 !important;font-size:13px;text-align:center;background-color: #F2F2F2;float: left;}',
            '.nong-table-new th,.nong-table-new td{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}',
            '.nong-row{text-align: center;height:30px;background-color: #FFF;padding:0 1em 0;border: 1px solid #EFEFEF;}',
            '.nong-copy{color:#08c !important;}',
            '.nong-offline{text-align: center;}',
            '.nong-head a {margin-right: 5px;}',
            '.nong-offline-download{color: rgb(0, 180, 30) !important; margin-right: 4px !important;}',
            '.nong-offline-download:hover{color:red !important;}',
        ].join(''));

        $(".right").insertBefore("#content");
        $("#navigation").clone().prependTo("#content");
        $($('.wp-pagenavi')[1]).insertAfter("#content");
        $('.wp-pagenavi')[1].id = '_pagenavi';

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
        $("#catmenu").append([
            '<ul style="float: right;font-size: 125%;"><li><a style="color: white;">已加载页数:&nbsp;&nbsp;<span id="addPageNbr">0</span>&nbsp;&nbsp;</a></li>',
            '<li><a style="color: white;">已阅JAV数:&nbsp;&nbsp;<span id="viewJavNbr">0</span>&nbsp;&nbsp;</a></li>',
            '<li><a id="onlyViews" seeall="1" href="javascript:void(0);" style="color: red;">只看已阅</a></li></ul>',
        ].join(''));
        $("#onlyViews").click(function(){
            onlyViewsAndSeeAll();
        });

        //blogjavScriptRun();

        // 瀑布流脚本
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

        // JAV列表 自动加载下一页 无限滚动加载
        window.pagegen = thirdparty.waterfall.fetchSync(location.href);
        window.mutex = new Lock();
        window.anchor = $('#_pagenavi')[0];//包住分页标签的dom对象  针对blogjav

        // blgojav
        var $pages = $('div#content div.single');
        if ($pages.length) {
            $pages[0].parentElement.id = "waterfall";
            thirdparty.waterfall.scrollInit($pages);
        }
    }, false);
})();