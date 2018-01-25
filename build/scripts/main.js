'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.navigation a, .order-scroll').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 100;
        $('body,html').animate({ scrollTop: target }, 500);

        //mob nav
        if ($(window).width() <= 992) {
            $('.navigation').slideUp('fast');
            $('.burger').removeClass('open');
            $('.burger').removeClass('active');
        };
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function headerScroll() {
    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 30) {
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        }
    });
};

//Begin Slick
function priceSlider(selector) {
    $(selector).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        responsive: [{
            breakpoint: 993,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 721,
            settings: {
                slidesToShow: 2,
                centerMode: true
            }
        }, {
            breakpoint: 582,
            settings: {
                slidesToShow: 1,
                centerMode: true
            }
        }, {
            breakpoint: 357,
            settings: {
                slidesToShow: 1
            }
        }]
    });
};

//Begin Google Map
var map;
var styles = [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": 36
    }, {
        "color": "#000000"
    }, {
        "lightness": 40
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#000000"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    }]
}, {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
        "lightness": "62"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
        "lightness": "0"
    }]
}, {
    "featureType": "landscape",
    "elementType": "labels.text.fill",
    "stylers": [{
        "lightness": "69"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 21
    }]
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{
        "lightness": "63"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#2d2d2d"
    }, {
        "lightness": 17
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 29
    }, {
        "weight": 0.2
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 18
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
        "color": "#000000"
    }, {
        "lightness": 19
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#0f252e"
    }, {
        "lightness": 17
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "lightness": "-100"
    }, {
        "gamma": "0.00"
    }]
}];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapCenterY, lng: mapCenterX },
        zoom: mapZoom,
        scrollwheel: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        styles: styles
    });

    var marker = new google.maps.Marker({
        position: { lat: mapMarkerY, lng: mapMarkerX },
        map: map,
        icon: mapMarkerIcon
    });
}
//End Google Map

function calc(price, amount) {
    var price = $('.js-select li.selected').data('price');
    var amount = $('.js-amount').val();
    if (amount >= 0 && price >= 0) {
        var total = amount * price + deliveryPrice * amount; //итог
        $('.js-total').val(total);
    }
}

$(document).ready(function () {
    headerScroll();
    priceSlider('.js-slider');
    $('.js-select').styler();
    initMap();

    //Burger
    $('.burger').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        var menu = $('.navigation');

        if ($('.burger').hasClass('active')) {
            menu.slideUp('fast');
            $(this).removeClass('active');
        } else {
            menu.slideDown('fast');
            $(this).addClass('active');
        }
    });

    $(window).resize(function () {
        var menu = $('.navigation');
        var w = $(window).width();
        if (w > 992) {
            menu.removeAttr('style');
            $('.burger').removeClass('open');
            $('.burger').removeClass('active');
        }
    });

    //Calc
    $('.js-select').on('change', function () {
        calc();
    });
    $('.js-amount').on('keyup', function () {
        calc();
    });
});

$(window).load(function () {});

$(window).resize(function () {});