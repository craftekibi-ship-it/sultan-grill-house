jQuery(document).ready(function ($) {
    "use strict";

    /* NAV — scrolled state + scrolltotop visibility */
    var $nav = $('#mainmenu-area');
    var $scrollToTop = $('.scrolltotop');

    function onScroll() {
        var top = $(window).scrollTop();
        $nav.toggleClass('scrolled', top > 40);
        if (top > 400) {
            $scrollToTop.fadeIn(200);
        } else {
            $scrollToTop.fadeOut(200);
        }
    }
    $(window).on('scroll', onScroll);
    onScroll();

    /* HERO SLIDER */
    $('.pogoSlider').pogoSlider({
        pauseOnHover: false,
        autoplayTimeout: 6500
    });

    /* SMOOTH SCROLL — only for in-page anchors */
    $('a[href^="#"]').on('click', function (event) {
        var id = $(this).attr('href');
        if (id.length > 1 && $(id).length) {
            event.preventDefault();
            var target = $(id).offset().top - 60;
            $('html, body').animate({ scrollTop: target }, 900, 'easeInOutExpo');
            $('.navbar-collapse.in').collapse('hide');
        }
    });

    /* MENU FILTERING */
    $('.food-menu-list-menu li').on('click', function () {
        var f = $(this).data('filter');
        $('.food-menu-list-menu li').removeClass('active');
        $(this).addClass('active');
        var $items = $('.food-menu-list .mix');
        if (f === 'all') {
            $items.removeClass('is-hidden');
        } else {
            $items.addClass('is-hidden').filter(f).removeClass('is-hidden');
        }
    });

    /* SIGNATURE SLIDER */
    $('.signature-slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5200,
        autoplayHoverPause: true,
        smartSpeed: 900,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: true
    });

    /* PARALLAX */
    $(window).stellar({
        responsive: true,
        positionProperty: 'position',
        horizontalScrolling: false
    });

    /* GALLERY LIGHTBOX */
    $('.gallery-grid').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        gallery: { enabled: true }
    });

});

jQuery(window).on('load', function () {
    jQuery('.preeloader').fadeOut(600);
});
