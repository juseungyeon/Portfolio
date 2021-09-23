const PortUi = (function() {

    const _load_init = function(){
        _addEvent();
    }

    const _addEvent = function(){
        _setIeError();
        _setTxtMotion();
        _setCursor();
        _setPageTransMotion();
        _setIndicator();
        window.addEventListener('scroll', _setMainScrollMotion);
        window.addEventListener('scroll',_setSubScrollMotion);
        window.addEventListener('click',_setMenuToggle);
    }

   
    function _setIeError(){
        var agent = navigator.userAgent.toLowerCase();

        if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
            alert('Internet Explorer는 호환되지 않는 브라우저 입니다.')
        }
        // const agent = navigator.userAgent.toLowerCase();
        // if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){
        //     $('body').css('display','none');
        //     alert('IE는 지원하지 않습니다');
        // }
        console.log("ie지원");
    }

    function _setMainScrollMotion(){
        let scrollVal = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const work = document.querySelectorAll('.work');
        const workEl = document.querySelectorAll('.work > div');
        const contact = document.querySelector('.contact');
        const contactBg = document.querySelector('.trans-bg');

        function mainWork(){
            workEl.forEach(works => {
                if(scrollVal >=  works.offsetTop + windowHeight / 1.8) {
                    works.classList.add('view');
                }
            });
        }
        function mainTxt(){
            $('.h-text, .bot-text').css({ 
                'transform': 'translate3d(0px, ' + -scrollVal/500 + '%, 0px) skew(0deg, '+scrollVal/100 +'deg)', 'opacity': 1-scrollVal/450});
                $('.scroll-wrap').css({'opacity': 1-scrollVal/450});
                if(scrollVal>= work.offsetTop) {
                    $('.h-text').css({ 'transform': 'translate3d(0px, -2%, 0px) skew(0deg, 6deg)', 'opacity': 0});
            }
        }
        function mainContact(){
            if(!contact) return;
            if(scrollVal >= contact.offsetTop - windowHeight / 1.8){
                contactBg.classList.add('up');
            }
            else {
                contactBg.classList.remove('up');
            }
        }

        mainWork();
        mainTxt();
        mainContact();
    }

    function _setSubScrollMotion(){
        let scrollVal = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const subImgEl = document.querySelectorAll('.transform');
        const paging = document.querySelector('.paging');
        const pagingBg = document.querySelector('.trans-bg');
        
    
        function subConImg(){        
            subImgEl.forEach(subImgs => {
                if(scrollVal >=  subImgs.offsetTop) {
                    subImgs.classList.add('active');
                }
                console.dir( subImgEl[2].offsetTop);
            });
        }
        function subTxt(){
            $('.head-img h2').css({ 'transform': 'translateY(' + scrollVal/35 + 'vh) '});
        }
        function subPaging(){
            if(!paging) return;
            if(scrollVal >= paging.offsetTop - windowHeight / 1){
                pagingBg.classList.add('up');
            }
            else {
                pagingBg.classList.remove('up');
            }
        }
        console.log(3);

        subConImg();
        subTxt();
        subPaging();
    }

    function _setTxtMotion(){
        tl = new TimelineMax();
        tl.add([
            TweenMax.staggerTo('header h1, header .work-btn',1.4,{opacity:1, x:0,ease: Power3.easeOut},0.2),
            TweenMax.to('.intro .trans-text',0.7,{x:0,y:0,delay: 0.4,ease: Power3.easeOut})
        ])
        .staggerTo('.h-text p, .bot-text p',1.3,{opacity:1,y:0,rotation:0,ease: Power3.easeOut},0.2,"-=0.7")
        .to('.scroll-wrap span',1.3,{width:'100%',ease: Power3.easeOut},"-=0.7")
        .to('.scroll-wrap svg',0.8,{opacity:1},"-=0.5");

        t2 = new TimelineMax();
        t2.to('.head-img img, .back a',0.8,{opacity:1,delay: 1})
        .to('.head-img h2',1,{opacity:1,y:0,rotation:0,ease: Power3.easeOut},"-=0.5");
    }

    function _setMenuToggle(){
        const body = document.querySelector('body');
        const nav = document.querySelector('.work-list');
        const navEl = document.querySelectorAll('.work-list > div');
        const openBtn = document.querySelector('.work-btn');
        const closeBtn = document.querySelector('.close');
        
        if(!nav.classList.contains('active')){
            body.style.overflow  = 'hidden';
            nav.classList.add('active');
            closeBtn.style.pointerEvents = 'none';
            for (i=0; i<navEl.length; i++){
                $('.list-con').eq(i).children('div').css({'transition': 'transform 1.5s '+'0.'+i+'s ease-in-out'});
            }
            setTimeout(function() {
                closeBtn.style.pointerEvents = '';
            }, 1500);
        }
        else{
            body.style.overflow  = '';
            nav.classList.remove('active');
            openBtn.style.pointerEvents = 'none';
            nav.style.transition = '0.5s 2s';
            setTimeout(function() {
                openBtn.style.pointerEvents = '';
                nav.style.transition = '';
            }, 2300);
        }

    }

    function _setPageTransMotion(){
        const subPage = document.querySelector('.work-page');
        if(subPage){
            $('body').append("<div class='page-loader'><div class='pl1'></div><div class='pl2'></div><div class='pl3'></div></div>");
            $('.page-loader').addClass('visible');
            setTimeout(function() {
                $('.page-loader').remove();
            }, 1800);
        }
    }


    function _setCursor(){
        $('body').prepend('<div class="cursor"></div>');
        $('body, html').mousemove(function(e){
            $('.cursor').css('left',e.pageX-15).css('top',e.pageY-15);
        });
    }

    function _setIndicator(){
        const indicator = document.querySelector('.indicator');
        const moveIndicator = debounce(function() {
            let viewportHeight = $(window).height();
            let documentHeight = $(document).height();
            let scrollVal = window.pageYOffset;
            let percent = (scrollVal / (documentHeight - viewportHeight)) * 100;
            indicator.css('top', percent + '%');
        }, 5);
        function debounce(func, wait, immediate) {
            let timeout;
            return function() {
                let context = this,
                args = arguments;
                const later = function() {
                timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };  
        //moveIndicator();
        window.addEventListener('resize scroll',moveIndicator);
        console.log(1);
        //$(window).on('resize scroll',moveIndicator);
    }

   
    
    return{
        load_init : _load_init
    }
})();
PortUi.load_init();