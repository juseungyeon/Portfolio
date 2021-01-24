
var UIPort = {
    checkObj: function (obj) {
        return $(obj).length == 0 ? false : true;
    },

    mainScroll: function (obj) {
        if (!UIPort.checkObj(obj)) {
            return;
        }

        var wScroll = $(window).scrollTop();

        function init(obj) {
            $main = $(obj);
            $work = $main.find('.work');
            $workNum = $main.find('.work > div');
            $contact = $main.find('.contact');
        }

        function event01() {
            for(var i=0; i<$workNum.length; i++){
                if(wScroll >= $workNum.eq([i]).offset().top - $(window).height() / 1.5){
                    $workNum.eq([i]).addClass('view');
                }
            }
        }
        function event02() {
            $('.h-text, .bot-text').css({ 'transform': 'translate3d(0px, ' + -pageYOffset/500 + '%, 0px) skew(0deg, '+pageYOffset/100 +'deg)', 'opacity': 1-pageYOffset/450});
            $('.scroll-wrap').css({'opacity': 1-pageYOffset/450});
            if(wScroll>= $work.offset().top) {
                $('.h-text').css({ 'transform': 'translate3d(0px, -2%, 0px) skew(0deg, 6deg)', 'opacity': 0});
            }
        }
        function event03() {
            if(wScroll >= $contact.offset().top - $(window).height() / 1.8){
                $('.trans-bg').addClass('up');
            }
            else {
                $('.trans-bg').removeClass('up');
            }
        }

        init(obj);
        event01();
        event02();
        event03();
    },

    subScroll: function (obj) {
        if (!UIPort.checkObj(obj)) {
            return;
        }

        var wScroll = $(window).scrollTop();
        
        function init(obj) {
            $sub = $(obj);
            $showCon = $sub.find('.transform');
            $paging = $sub.find('.paging');
        }

        function event01() {
            for(var i=0; i<$showCon.length; i++){
                if(wScroll >= $showCon.eq([i]).offset().top - $(window).height() / 1.2){
                    $showCon.eq([i]).addClass('active');
                }
            }   
        }
        function event02() {
            if(wScroll >= $paging.offset().top - $(window).height() / 1){
                $('.trans-bg').addClass('up');
            }
            else {
                $('.trans-bg').removeClass('up');
            }
        }
        function event03(){
            $('.head-img h2').css({ 'transform': 'translateY(' + pageYOffset/35 + 'vh) '});
        }

        init(obj);
        event01();
        event02();
        event03();
    },

    portAni: function (obj) {
        if (!UIPort.checkObj(obj)) {
            return;
        }

        function init(obj) {
            $animation = $(obj);
        }

        function event(){
            tl = new TimelineMax();
            tl.add([
                TweenMax.staggerTo('header h1, header .work-btn',1,{opacity:1, x:0,ease: Power3.easeOut},0.2),
                TweenMax.to('.intro .trans-text',0.7,{x:0,y:0,delay: 0.4,ease: Power3.easeOut})
            ])
            .staggerTo('.h-text p, .bot-text p',1.2,{opacity:1,y:0,rotation:0,ease: Power3.easeOut},0.2,"-=0.7")
            .to('.scroll-wrap span',1.2,{width:'100%',ease: Power3.easeOut},"-=0.7")
            .to('.scroll-wrap svg',0.8,{opacity:1},"-=0.5");

            t2 = new TimelineMax();
            t2.to('.head-img img, .back a',0.8,{opacity:1,delay: 1})
            .to('.head-img h2',1,{opacity:1,y:0,rotation:0,ease: Power3.easeOut},"-=0.5");
        }

        init(obj);
        event();
    },

    pageTransition: function(obj){
        if (!UIPort.checkObj(obj)) {
            return;
        }

        function init(obj) {
            $animation02 = $(obj);
        }

        function event(){
            $('body').append("<div class='page-loader'><div class='pl1'></div><div class='pl2'></div><div class='pl3'></div></div>");
            $('.page-loader').addClass('visible');
            setTimeout(function() {
                $('.page-loader').remove();
            }, 1800);
        }
        
        init(obj);
        event();
    },

    menuToggle: function (obj) {
        if (!UIPort.checkObj(obj)) {
            return;
        }

        function init(obj) {
            $open = $(obj);
            $body = $('body');
            $listEl = $body.find('.work-list');
            $close = $listEl.find('.close');
        }

        function event() {
            $open.on('click', function(){
                handleOpen();
            });
            
            $close.on('click', function(){
                handleClose();
            });
        }

        function handleOpen(){
            $body.css('overflow-y','hidden');
            $listEl.addClass('active');
            $close.css( 'pointer-events', 'none');
            var workCount = $('.work-list>div');
            for (i=0; i<workCount.length; i++){
                $('.list-con').eq(i).children('div').css({'transition': '1.5s '+'0.'+i+'s ease-in-out'});
            }
            setTimeout(function() {
                $close.css( 'pointer-events', '');
            }, 1500);
        }

        function handleClose(){
            $body.css('overflow-y','');
            $listEl.removeClass('active');
            $open.css( 'pointer-events', 'none');
            $listEl.css( 'transition', '0.5s 2s');
            setTimeout(function() {
                $open.css( 'pointer-events', '');
                $listEl.css( 'transition', '');
            }, 2300);
        }

        init(obj);
        event();
    },

    indicator : function(obj){
        if (!UIPort.checkObj(obj)) {
            return;
        }

        function init(obj) {
            $indicator = $(obj);
        }

        function event() {
            var win = jQuery(window);
            var moveIndicator = debounce(function() {
                var viewportHeight = $(window).height();
                var documentHeight = $(document).height();
                var hasScrolled = $(window).scrollTop();
                var percent = (hasScrolled / (documentHeight - viewportHeight)) * 100;
                $indicator.css('top', percent + '%');
            }, 5);
            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this,
                    args = arguments;
                    var later = function() {
                    timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            };
            $(window).on('resize scroll',moveIndicator);
        }

        init(obj);
        event();
    },

    ieError : function(obj){
        if (!UIPort.checkObj(obj)) {
            return;
        }

        function init(obj) {
            $error = $(obj);
        }

        function event(){
            var agent = navigator.userAgent.toLowerCase();
            function loadError(){
                if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){
                    $('body').css('display','none');
                    alert('IE는 지원하지 않습니다');
                }
            }
            $(document).on('ready',loadError);
        }

        init(obj);
        event();
    },
};

$(document).ready(function(){
    UIPort.portAni('.intro, .work-page');
    UIPort.pageTransition('.work-page');
    UIPort.menuToggle('.work-btn');
    UIPort.indicator('.indicator');
    UIPort.ieError('body');
    $('body').prepend('<div class="cursor"></div>');
    $('body, html').mousemove(function(e){
        $('.cursor').css('left',e.pageX-15).css('top',e.pageY-15);
    });
    $(window).scroll(function(){ 
        UIPort.mainScroll('.main-wrap');
        UIPort.subScroll('.work-page');
    });
});
