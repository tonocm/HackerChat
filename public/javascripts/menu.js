//SIDE MENU SCRIPTS
 $(document).ready(function () {

 	$('.menu-open-icon').toggleClass('fixed');

    $('.menu-close-icon').click(function (e) {
        e.preventDefault();
        $('#side-menu').animate({ left: '-250px', top: '-1000px' });
        $('.menu-open-icon').animate({ left: '22px', top: '22px' });
       
    });
    $('.menu-open-icon').click(function (e) {
        e.preventDefault();
        $('.menu-open-icon').animate({ left: '-100px', top: '-100px' });
        $('#side-menu').animate({ left: '0px', top: '0px' });
       
    });
 });