$(window).on("load", function() {
    "use strict";

    /*=================== Dropdown Class ===================*/
    $("nav li ul").parent().addClass("has-children");

    /*=================== Responsive Menu ===================*/
    $(".menu-button").on("click",function(){
        $(".responsive-menu").addClass("slidein");
        return false;
    });  
    $(".close-menu").on("click",function(){
        $(".responsive-menu").removeClass("slidein");
        return false;
    });  


    /*================== Responsive Menu Dropdown =====================*/
    $(".responsive-menu ul ul").parent().addClass("menu-item-has-children");
    $(".responsive-menu ul li.menu-item-has-children > a").on("click", function() {
        $(this).parent().toggleClass("active").siblings().removeClass("active");
        $(this).next("ul").slideToggle();
        $(this).parent().siblings().find("ul").slideUp();
        return false;
    });


    /*================== Search =====================*/
    $(".search-btn").on("click", function() {
        $(this).parent().toggleClass("active");
        return false;
    });


    /* ============ Logos Carousel ================*/
    $('.logos-carousel').owlCarousel({
        autoplay:true,
        smartSpeed:1000,
        loop:true,
        dots:false,
        nav:true,
        margin:0,
        mouseDrag:true,
        items:5,
        autoplayHoverPause:true,                
        autoHeight:false,
        responsive:{
            1200:{items:5},
            980:{items:4},
            767:{items:3},
            480:{items:2},
            0:{items:1}
        }
    });

    /* ============ Tabs Carousel ================*/
    $('.tab-carousel').owlCarousel({
        autoplay:false,
        smartSpeed:1000,
        loop:false,
        dots:false,
        nav:false,
        margin:0,
        mouseDrag:true,
        items:1,
        singleItem:true,
        URLhashListener:true,        
        autoplayHoverPause:true,                
        autoHeight:false,
        animateIn:"fadeIn",
        animateOut:"fadeOut"
    }); 


    $(".tabs-selectors a").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
    });  


});