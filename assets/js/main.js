//--------------------------------------------------
// Main JS File
// Title: Lateef Kazeem - Resume / CV / Portfolio
// Author: Samson Eniolorunda
// Author URL: https://github.com/Samson-Eniolorunda
//-------------------------------------------------- 

(function($) {
"use strict";
    //--------------------------------------------------
    //  Helper Functions
    //--------------------------------------------------
    
    /**
     * Toggles the mobile menu class on the site header depending on window width.
     * Adds the 'mobile-menu-hide' class when the window is narrower than 1025px,
     * removes it when wider. This controls whether the sidebar is visible on
     * smaller screens.
     */
    function updateMobileMenu() {
        if ($(window).width() < 1025) {
            $('#site_header').addClass('mobile-menu-hide');
        } else {
            $('#site_header').removeClass('mobile-menu-hide');
        }
    }

    /**
     * Initializes or destroys custom scrollbars via Perfect Scrollbar.
     * On desktop (>1024px) it attaches a custom scrollbar to each `.animated-section`
     * and `.single-page-content` element. On mobile it destroys the instance to
     * revert to native scrolling. Perfect Scrollbar keeps the DOM unchanged
     * while allowing full CSS customization【792937508828208†L6-L13】.
     */
    function customScroll() {
        var isDesktop = $(window).width() > 1024;
        $('.animated-section, .single-page-content').each(function () {
            var $el = $(this);
            if (isDesktop) {
                if (!$el.data('perfectScrollbar')) {
                    $el.perfectScrollbar();
                } else {
                    $el.perfectScrollbar('update');
                }
            } else {
                if ($el.data('perfectScrollbar')) {
                    $el.perfectScrollbar('destroy');
                }
            }
        });
    }

    /**
     * Sets up click handlers for portfolio category filters.
     * Clicking a filter link highlights it and shows only the matching items.
     * Without the Shuffle plugin, items are simply shown/hidden via their
     * `data-groups` attribute.
     */
    function portfolio_init() {
        var $filters = $('.portfolio-filters .filter');
        var $items = $('.portfolio-grid figure');

        $filters.on('click', function (e) {
            e.preventDefault();
            var group = $(this).attr('data-group');
            $filters.parent().removeClass('active');
            $(this).parent().addClass('active');
            if (group === 'category_all') {
                $items.show();
            } else {
                $items.hide();
                $('.portfolio-grid figure[data-groups*="' + group + '"]').show();
            }
        });
    }

    //--------------------------------------------------
    //  Window Events
    //--------------------------------------------------

    // On window load
    $(window)
        .on('load', function () {
            // Fade out the preloader once the page is loaded
            $(".preloader").fadeOut(800, "linear");

            // Initialize page transitions (slide animations between sections)
            var ptPage = $('.animated-sections');
            if (ptPage[0]) {
                PageTransitions.init({ menu: 'ul.main-menu' });
            }
        })
        .on('resize', function () {
            // Recalculate mobile menu state and update custom scrollbars
            updateMobileMenu();
            customScroll();
        });


    //--------------------------------------------------
    //  Document Ready
    //--------------------------------------------------
    $(document).on('ready', function () {
        // Parallax mouse move effect for the animated background
        // Only enable parallax on larger screens to prevent glitchy behaviour on small devices
        if ($(window).width() > 1024) {
            var movementStrength = 23;
            var height = movementStrength / $(document).height();
            var width = movementStrength / $(document).width();
            $("body").on('mousemove', function (e) {
                var pageX = e.pageX - ($(document).width() / 2),
                    pageY = e.pageY - ($(document).height() / 2),
                    newvalueX = width * pageX * -1,
                    newvalueY = height * pageY * -1,
                    elements = $('.lm-animated-bg');
                elements.addClass('transition');
                elements.css({
                    "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
                });
                setTimeout(function () {
                    elements.removeClass('transition');
                }, 300);
            });
        }

        // Toggle sidebar visibility on burger menu click
        $('.menu-toggle').on('click', function () {
            $('#site_header').toggleClass('mobile-menu-hide');
            $(this).toggleClass('open');
        });

        // Hide the mobile menu when a navigation link is selected
        $('.main-menu').on('click', 'a', function () {
            $('#site_header').addClass('mobile-menu-hide');
            $('.menu-toggle').removeClass('open');
        });

        // Initialize portfolio filtering after all images have loaded
        var $portfolio_container = $(".portfolio-grid");
        $portfolio_container.imagesLoaded(function () {
            portfolio_init();
        });

        // Show portfolio overlay icons only on hover
        $('.portfolio-item-img .category, .portfolio-item-img .lz-icon').hide();
        $('.portfolio-item-img').hover(
            function () {
                $(this).find('.category, .lz-icon').show();
            },
            function () {
                $(this).find('.category, .lz-icon').hide();
            }
        );

        // Perform initial setup for mobile menu and scrollbars
        updateMobileMenu();
        customScroll();

        // Initialize Magnific Popup for images and iframes
        $('body').magnificPopup({
            delegate: 'a.lightbox',
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            image: {
                titleSrc: 'title',
                gallery: { enabled: true }
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                        '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                      '</div>',
                patterns: {
                    youtube: { index: 'youtube.com/', id: null, src: '%id%?autoplay=1' },
                    vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' },
                    gmaps: { index: '//maps.google.', src: '%id%&output=embed' }
                },
                srcAction: 'iframe_src'
            },
            callbacks: {
                markupParse: function (template, values, item) {
                    values.title = item.el.attr('title');
                }
            }
        });

        // Update the copyright year automatically
        var currentYear = new Date().getFullYear();
        $('#copyright-year').text(currentYear);
    });

})(jQuery);
