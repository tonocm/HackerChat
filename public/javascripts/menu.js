//SIDE MENU SCRIPTS
 $(document).ready(function () {

    //$('.menu-open-icon').toggleClass('fixed');

    $('.menu-close-icon').click(function (e) {
        e.preventDefault();
        $('#side-menu').animate({ left: '-250px', top: '-1000px' });
        $('.menu-open-icon').toggleClass("menu-toggle");
       
    });
    $('.menu-open-icon').click(function (e) {
        e.preventDefault();
        $('#side-menu').animate({ left: '0px', top: '0px'});
        $('.menu-open-icon').toggleClass("menu-toggle");     
    });

    function detectmob() { 
        if(navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
           $(".about-copy").addClass("about-copy-toggle");
           return true;
        }
        else {
           return false;
        }
    }
 });