$(document).ready(function($) { 

    $(window).scroll(function(){
        
        var wScroll = $(window).scrollTop();
        var workNum = $(".work > div");
        for(var i=0; i<workNum.length; i++){
            if(wScroll >= workNum.eq([i]).offset().top - $(window).height() / 2){
                workNum.eq([i]).addClass("view");
            }
            else {
                workNum.eq([i]).removeClass("view");
            }
        }
        
        var work = $(".work");
        if (work.length) {
            $(".h-text").css({ 'transform': 'translate3d(0px, ' + -pageYOffset/500 + 'vh, 0px) skew(0deg, '+pageYOffset/100 +'deg)', 'opacity': 1-pageYOffset/450});
            if(wScroll>= work.offset().top) {
            $(".h-text").css({ 'transform': 'translate3d(0px, -2vh, 0px) skew(0deg, 6deg)', 'opacity': 0});
            }
        }
        
        var contact = $(".contact");
        if (contact.length) {
             if(wScroll >= contact.offset().top - $(window).height() / 1.8){
                $(".trans-bg").addClass("up");
            }
            else {
                $(".trans-bg").removeClass("up");
            }
        }
        
        $(".head-img h2").css({ 'transform': 'translate3d(0, ' + pageYOffset/35 + 'vh, 0) '});
        
        var transNum = $(".transform");
        for(var i=0; i<transNum.length; i++){
            if(wScroll >= transNum.eq([i]).offset().top - $(window).height() / 1.2){
                transNum.eq([i]).addClass("active");
            }
        }
        
        var contact = $(" .paging");
        if (contact.length) {
             if(wScroll >= contact.offset().top - $(window).height() / 1){
                $(".trans-bg").addClass("up");
            }
            else {
                $(".trans-bg").removeClass("up");
            }
        }
        
    }); 

    $(".work-btn").on("click",function(){
        $(".work-form").addClass("active");
       /* $(".about").addClass("active");*/
        var workCount = $(".work-form>div").length;
        $(".close").css( 'pointer-events', 'none' );
        for (i=0; i<workCount; i++){
            $(".work-form>div>a").eq(i).children("div").css({"transition": "1.5s "+"0."+i+"s ease-in-out"});
        }
        setTimeout(function() {
               $(".close").css( 'pointer-events', '' );
        }, 2000);
    });
    
    
   $(".about-btn").on("click",function(){
        $(".about").addClass("active");
        $(".close").css( 'pointer-events', 'none' );
        setTimeout(function() {
               $(".close").css( 'pointer-events', '' );
        }, 2000);
    });

    $(".close").on("click",function(){
        $(".work-form, .about").
        
        removeClass("active");
        $(".work-btn, .about-btn").css( 'pointer-events', 'none' );
        $(".work-form, .about").css( 'transition', '0.5s 2s' );
        setTimeout(function() {
            
               $(".work-btn, .about-btn").css( 'pointer-events', '' );
                $(".work-form, .about").css( 'transition', '' );
        }, 2300);
    });
    

    $("body, html").mousemove(function(e){
        $(".cursor").css("left",e.pageX-15).css("top",e.pageY-15);
    });

    
    var indicator = $('.indicator');

    var win = jQuery(window);
    if (indicator.length) {
    var moveIndicator = debounce(function() {
      var viewportHeight = $(window).height();
      var documentHeight = $(document).height();
      var hasScrolled = $(window).scrollTop();

      var percent = (hasScrolled / (documentHeight - viewportHeight)) * 100;
      indicator.css("top", percent + "%");

    }, 5);

    }

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
    win.on("resize scroll", moveIndicator);

    $(window).on('load', function(){
        $("body").prepend("<div class='cursor'></div>");
        for (var i=1; i<=5; i++){
            var page = 'http://jooosg.cafe24.com/w'+i+'.html';
            if (window.location.href == page) {
                $("body").append("<div class='page-loader'><div class='pl1'></div><div class='pl2'></div><div class='pl3'></div></div>");
                $(".page-loader").addClass("visible");
            }
            setTimeout(function() {
                $(".page-loader").remove();
            }, 1800);

        }
    });
    
});

 


 
