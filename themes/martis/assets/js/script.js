/* MARTIS CUSTOM SCRIPTS
 * http://www.hugestem.com */

var $ = (jquery = jQuery);

(function ($) {
  "use strict";
  Drupal.behaviors.martis = {
    attach: function (context, settings) {
      /*	MISC  */
      $(".path-taxonomy .views-element-container").addClass("row");
      $(".path-taxonomy .sidebar .views-element-container").removeClass("row");
      $(".fullwidth .row-wrap").removeClass("row");

      if ($(window).width() < 767) {
        //Mobile Bootstrap Grid
        $(".grid-wrapper").removeClass("grid");
      }

      /*	FEAT BLOCK  */
      $(".feat-block-content-alt .field-field-block").addClass("row");
      $(".feat-block-content-alt .feat-item").parent().addClass("col-md-6");

      /*	PRODUCT  */
      $(".product-teaser-no-attribute").each(function () {
        var $this = $(this);
        $this.find(".product-variation-wrap .form-item").remove();
      });

      $(".product-teaser .product--rendered-attribute .radios").each(
        function () {
          var $this = $(this);
          if ($this.find(".form-item").length < 2) {
            $this.remove();
          }
        }
      );

      $(".product-teaser").each(function () {
        var $this = $(this);
        var e = $this.find(".product--rendered-attribute .radios .form-item");
        var f = $this.find(
          ".product-add-cart .has-no-option-variation .form-actions"
        );
        var h = $this.find(".product-add-cart .has-option-variation");
        if (e.length > 1) {
          $this.addClass("has-options");
          f.remove();
        } else {
          $this.addClass("has-no-options");
          h.remove();
        }
      });

      /* OUT OF STOCK */
      $(".product-post").each(function () {
        var $this = $(this);
        var i = $this.find(".button--add-to-cart");
        var e = $this.find(".product-stock");
        var f = $this.find(".product-stock .available-stock");
        var g = $this.find(".product-stock .out-stock");
        if (i.prop("disabled")) {
          $this.addClass("out-of-stock-product");
          e.addClass("out-stock");
          e.removeClass("in-stock");
        } else {
          $this.removeClass("out-of-stock-product");
          e.addClass("in-stock");
          e.removeClass("out-stock");
        }
      });

      $(".product-stock").show();

      /*	PROMOTION  */
      $(".promotion-layout2 .banner-item-field").addClass("col-md-6");
      $(".promotion-layout3 .banner-item-field").addClass("col-md-4");
      $(".promotion-layout4 .grid-item").addClass("col-md-3");
      $(".promotion-layout4 .grid-item:nth-child(1)").removeClass("col-md-3");
      $(".promotion-layout4 .grid-item:nth-child(1)").addClass("col-md-6");

      /*	DEALS  */
      $(".deals-grid .field-field-product-block").addClass("row");
      $(".deals-grid .field-field-product-block .product-teaser-wrap")
        .parent()
        .addClass("col-md-3 grid-item");
      //$('.deals-carousel .field-field-product-block').addClass('deal-carousel owl-carousel');

      $(".deals-grid4 .field-field-product-block .product-teaser-wrap")
        .parent()
        .addClass("col-md-3 grid-item");
      $(".deals-grid5 .field-field-product-block .product-teaser-wrap")
        .parent()
        .addClass("col-md-55 grid-item");
      $(".deals-carousel4 .field-field-product-block").addClass(
        "deal-carousel4 owl-carousel"
      );
      $(".deals-carousel5 .field-field-product-block").addClass(
        "deal-carousel5 owl-carousel"
      );

      /*	FACET  */
      $(".item-list__checkbox.facet-list").slimScroll({
        height: "220px",
        width: "100%",
        railVisible: false,
        alwaysVisible: true,
        size: "4px",
        wheelStep: 15,
      });

      /*	TAB  */
      $(".tab-content .my-group:first").addClass("active");

      /*	NICE SELECT  */
      $(
        'form:not(".vote-form, .layout-builder-configure-section, .layout-builder-configure-block") select'
      ).niceSelect();
      $(".vote-form").fadeIn(2000);

      // LIST GRID SWITCHER
      $(".switch-icon span").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });

      $(".list-switch").click(function (event) {
        event.preventDefault();
        $(".grid-wrapper .grid-item").addClass("list-grid");
      });
      $(".grid-switch").click(function (event) {
        event.preventDefault();
        $(".grid-wrapper .grid-item").removeClass("list-grid");
      });

      // AUTO SUBMIT CATALOG FILTER
      $(".product-catalog .views-exposed-form .form-select").change(
        function () {
          this.form.submit();
        }
      );

      // ADD ICON TO SEARCH SUBMIT BUTTON
      $("header .views-exposed-form .form-submit").val("\ue610");

      //CUSTOM PRODUCT QUANTITY BUTTON
      $(
        '<div class="quantity-nav"><div class="quantity-button quantity-down">-</div><div class="quantity-button quantity-up">+</div></div>'
      ).insertAfter(
        ".commerce-order-item-add-to-cart-form .field--name-quantity input"
      );
      $(".commerce-order-item-add-to-cart-form .field--name-quantity").each(
        function () {
          var spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find(".quantity-up"),
            btnDown = spinner.find(".quantity-down"),
            min = input.attr("min"),
            max = input.attr("max");

          btnUp.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
              var newVal = oldValue;
            } else {
              var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
          });

          btnDown.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
              var newVal = oldValue;
            } else {
              var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
          });

          $(".product-post .quantity-nav").slice(1).remove();
        }
      );

      $(".product-teaser .product-image .field-field-image").each(function () {
        var $this = $(this);
        $this.find(".field-item").slice(2).remove();
      });

      /*	LAYOUTS  */
      $(
        ".layout--twocol-section--25-75 .layout__region--first, .layout--twocol-section--75-25 .layout__region--second, .layout--twocol-section--33-67 .layout__region--first, .layout--twocol-section--67-33 .layout__region--second, .layout--threecol-section--25-50-25 .layout__region--first, .layout--threecol-section--25-50-25 .layout__region--third, .layout--threecol-section--25-25-50 .layout__region--first, .layout--threecol-section--25-25-50 .layout__region--second, .layout--threecol-section--50-25-25 .layout__region--second, .layout--threecol-section--50-25-25 .layout__region--third, .layout--threecol-section--33-34-33 .layout__region--first, .layout--threecol-section--33-34-33 .layout__region--third, .layout--threecol-section--33-34-33 .layout__region--second, .layout--fourcol-section .layout__region"
      ).addClass("sidebar");

      /*	OWL SLIDER  */
      $(".slide-carousel").each(function () {
        var $carousel = $(this);
        $carousel.owlCarousel({
          items: $carousel.data("items"),
          slideBy: $carousel.data("slideby"),
          center: $carousel.data("center"),
          loop: $carousel.data("loop"),
          margin: $carousel.data("margin"),
          nav: $carousel.data("nav"),
          dots: $carousel.data("dots"),
          autoplay: $carousel.data("autoplay"),
          autoplaySpeed: $carousel.data("autoplayspeed"),
          autoplayHoverPause: $carousel.data("autoplayhoverpause"),
          autoplayTimeout: $carousel.data("autoplaytimeout"),
          URLhashListener: $carousel.data("urlhashlistener"),
        });
      });

      // Declare Carousel jquery object
      var owl = $(".hero");

      // add animate.css class(es) to the elements to be animated
      function setAnimation(_elem, _InOut) {
        // Store all animationend event name in a string.
        var animationEndEvent =
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

        _elem.each(function () {
          var $elem = $(this);
          var $animationType = "animated " + $elem.data("animation-" + _InOut);

          $elem.addClass($animationType).one(animationEndEvent, function () {
            $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
          });
        });
      }

      // Fired before current slide change
      owl.on("change.owl.carousel", function (event) {
        var $currentItem = $(".owl-item", owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-out]");
        setAnimation($elemsToanim, "out");
      });

      // Fired after current slide has been changed
      owl.on("changed.owl.carousel", function (event) {
        var $currentItem = $(".owl-item", owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");
        setAnimation($elemsToanim, "in");
      });

      //PRODUCT IMAGE DISPLAY
      $(".product-image-full-wrap").css("display", "none");
      $(".piczoomer").html(
        $(".product-image-full-wrap .product-image-full").html()
      );
      $(".piclist").html(
        $(".product-image-full-wrap .product-image-full").html()
      );

      $(".piczoomer .field-item:not(:first)").remove();
      $(".piczoomer .piczoomer-pic:not(:first)").remove();
      $(".piczoomer .field-item").picZoomer();

      $(".piclist .field-item").on("click", function (event) {
        var $pic = $(this).find("img");
        $(".piczoomer-pic").attr("src", $pic.attr("src"));
        $(".piclist .selected").removeClass("selected");
        $(this).addClass("selected");
      });

      //ADD OWL CAROUSEL TO THUMBNAIL IMAGE
      $(".piclist .field-field-image").addClass("owl-carousel");
      $(".piclist .field-field-image").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 5,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
      });

      //REMOVE THUMBNAIL IF SINGLE IMAGE
      $(".piclist .owl-stage").each(function () {
        var $this = $(this);
        var i = $this.children(".owl-item").length;
        if (i < 2) {
          $this.remove();
        }
      });
      $(".product-image-full-wrap").remove();

      $(".product-image-default .piczoomer-zoom-wp").remove();
      $(".product-image-default .piczoomer-cursor").remove();
      $(".product-image-colorbox .piczoomer-zoom-wp").remove();
      $(".product-image-colorbox .piczoomer-cursor").remove();

      /*	SEARCH & FORM  */
      // SEARCH PLACHOLDER
      var search = Drupal.t("Search");
      $(".search-content .form-search").attr("placeholder", +search + "...");

      // LABEL TO PLACEHOLDER
      $(
        "form.contact-form :input, .contact-form form :input, form.user-login-form :input, form.user-register-form :input, form.user-pass :input, form.comment-form :input, .search-page-form :input, #views-exposed-form-blog-blog-page :input, #toggle-sidebar .block-search :input, .block-simplenews :input, #toggle-sidebar :input"
      )
        .not(":checkbox, :radio")
        .each(function (index, elem) {
          var eId = $(elem).attr("id");
          var label = null;
          if (
            eId &&
            (label = $(elem)
              .parents("form")
              .find("label[for=" + eId + "]")).length == 1
          ) {
            $(elem).attr("placeholder", $(label).html());
            $(label).remove();
          }
        });

      /*	PRODUCT AJAX  */
      $(
        ".product-quick-view .ui-dialog-buttonpane, #drupal-modal .product-info, .product-quick-view .ui-dialog-titlebar-close span"
      ).remove();
      $(".product-quick-view .ui-dialog-titlebar-close").removeClass(
        "ui-button"
      );
      //$(".product-quick-view .ui-dialog-buttonpane").remove();

      $(".quick-carousel").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
      });

      $(".deal-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          },
        },
      });

      $(".deal-carousel4").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          },
        },
      });

      $(".deal-carousel5").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });

      /*	SHUFFLE GRID  */
      var $grid = $(".grid");

      $grid.shuffle({
        itemSelector: ".grid-item",
      });

      /*	PRELOADER  */
      $(".preloader-spinner").fadeOut();
      $(".preloader")
        .delay(200)
        .fadeOut("slow")
        .delay(200, function () {
          $(this).remove();
        });

      /*	COUNTER  */
      if ($().appear) {
        $(".counter").appear();
        $(".counter")
          .filter(":appeared")
          .each(function (index) {
            if ($(this).hasClass("counted")) {
              return;
            } else {
              $(this).countTo().addClass("counted");
            }
          });
        $("body").on("appear", ".counter", function (e, $affected) {
          $($affected).each(function (index) {
            if ($(this).hasClass("counted")) {
              return;
            } else {
              $(this).countTo().addClass("counted");
            }
          });
        });
      }

      /*	PIECHART PROGRESS  */
      function pieChart() {
        //circle progress bar
        if ($().easyPieChart) {
          //var count = 0 ;
          //var colors = ['#4D91BA', '#5FCCA3', '#FFBB19'];
          $(".chart").each(function () {
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 900) {
              $(this).easyPieChart({
                barColor: "#333333",
                trackColor: "#dddddd",
                scaleColor: false,
                scaleLength: false,
                //lineCap: 'butt',
                lineWidth: 5,
                size: 110,
                rotate: 0,
                animate: 3000,
                fillStyle: "#e8e8e8",
                onStep: function (from, to, percent) {
                  $(this.el).find(".percent").text(Math.round(percent));
                },
              });
            }
            //count++;
            //if (count >= colors.length) { count = 0};
          });
        }
      }

      // STICKY HEADER
      var stickyHeader = $(".header-menu").offset().top;

      $(window).on("scroll", function () {
        /*	PROGRESS BAR  */
        if ($("div").hasClass("progress-content")) {
          if (
            $(this).scrollTop() + $(this).height() >=
            $(".progress-content").offset().top
          ) {
            $(".progress-bar").each(function () {
              var getPercent = $(this).data("percent") / 100;
              var getProgressWrapWidth = $(this).width();
              var progressTotal = getPercent * getProgressWrapWidth;
              var animationLength = 1500;
              $(this).stop().animate(
                {
                  left: progressTotal,
                },
                animationLength
              );
            });
          }
        }

        /*	PIE CHART  */
        pieChart();

        /*	BACK TO TOP  */
        if ($(this).scrollTop() != 0) {
          $(".back-to-top").fadeIn();
        } else {
          $(".back-to-top").fadeOut();
        }

        /*	STICKY HEADER  */
        if ($(this).scrollTop() > stickyHeader) {
          $(".sticky-header .header-menu").addClass("sticky");
          $(".sticky-header .header .open.category-menu").addClass("closed");
        } else {
          $(".header-menu").removeClass("sticky");
          $(".header .open.category-menu").removeClass("closed");
        }
      });

      $(".back-to-top").click(function () {
        $("body, html").animate({ scrollTop: 0 }, 800);
      });

      //OWL ROWS
      var divs = $(".two-row");
      for (var i = 0; i < divs.length; i += 2) {
        divs.slice(i, i + 2).wrapAll("<div class='double-rows'></div>");
      }
    },
  };
})(jQuery);

$(function () {
  /* MEGA MENU */
  $(".mega-menu > ul > li:has( > ul)").addClass("menu-dropdown");
  $(".mega-menu > ul > li > ul:not(:has(ul))").addClass("normal-sub");
  $(".mega-menu > ul > li > ul:has(:has(ul))").addClass("is-mega");
  //If width is more than 768px dropdowns are displayed on hover
  $(".mega-menu > ul > li").hover(
    function (e) {
      if ($(window).width() > 768) {
        $(this).children("ul").fadeIn(150);
        e.preventDefault();
        $(this).children("ul.is-mega").css("display", "flex");
      }
    },
    function (e) {
      if ($(window).width() > 768) {
        $(this).children("ul").fadeOut(150);
        e.preventDefault();
      }
    }
  );
  //If width is less or equal to 768px dropdowns are displayed on click
  $(".mega-menu > ul > li").click(function () {
    var thisMenu = $(this).children("ul");
    $(".mega-menu > ul > li.menu-dropdown").toggleClass("active");
    var prevState = thisMenu.css("display");
    $(".mega-menu > ul > li > ul").fadeOut();
    if ($(window).width() < 768) {
      if (prevState !== "block") thisMenu.fadeIn(150);
      thisMenu.toggleClass("active");
    }
  });
  //when clicked on mobile-menu, normal menu is shown as a list.
  $(".menu-mobile").click(function (e) {
    $(".mega-menu > ul").toggleClass("show-on-mobile");
    e.preventDefault();
  });

  $(".is-mega").each(function () {
    var $this = $(this);
    var i = $this.children("li.menu-item--expanded").length;
    var e = $this.find("li.menu-item--expanded");
    if (i === 2) {
      $this.addClass("twox");
    } else if (i === 3) {
      $this.addClass("threex");
    } else if (i > 3) {
      $this.addClass("multix");
    }
  });

  $(".mega-menu .menu-dropdown").each(function () {
    var $this = $(this);
    if ($this.find("ul").hasClass("is-mega")) {
      $this.addClass("mega-dropdown");
    }
  });

  // CATEGORIES TOGGLE
  $(".category-menu .block-title-wrap").click(function () {
    $(this).toggleClass("active");
    $(".category-menu .nav").toggleClass("open");
    $(".category-menu .nav").slideToggle("medium");
  });
  $(".cat-button").click(function () {
    $(this).toggleClass("active");
    $(".category-menu .nav").toggleClass("open");
    $(".category-menu .nav").slideToggle("medium");
  });

  // MORE CATEGORY LINKS
  $(".category-menu .mega-menu > ul.nav").each(function () {
    var $this = $(this);
    var moreCat = Drupal.t("More Categories");
    var closeCat = Drupal.t("Close Categories");
    var i = $this.children("li.facet-item");
    var LiN = $this.children("li.facet-item").length;
    if (LiN > 7) {
      i.eq(6).nextAll().hide().addClass("toggleable");
      $this.append('<li class="more-toggler">' + moreCat + "</li>");
    }
  });
  $(".category-menu .mega-menu > ul.nav").on(
    "click",
    ".more-toggler",
    function () {
      var $this = $(this);
      var moreCat = Drupal.t("More Categories");
      var closeCat = Drupal.t("Close Categories");
      if ($this.hasClass("less")) {
        $this.text("" + moreCat).removeClass("less");
      } else {
        $this.text("" + closeCat).addClass("less");
      }
      $this.siblings("li.toggleable").slideToggle();
    }
  );
  if ($(window).width() > 767) {
    $(".category-menu").css({ height: $(".category-menu").height() });
    $(".header-style3 #page-title").css({
      "padding-top": $("header.header").height(),
    });
  }

  //	FLIPPED TABLE
  $(".flipped-table table").each(function () {
    var $this = $(this);
    var newrows = [];
    $this.find("tr").each(function () {
      var i = 0;
      $(this)
        .find("td")
        .each(function () {
          i++;
          if (newrows[i] === undefined) {
            newrows[i] = $("<tr></tr>");
          }
          newrows[i].append($(this));
        });

      $(this)
        .find("th")
        .each(function () {
          i++;
          if (newrows[i] === undefined) {
            newrows[i] = $("<tr></tr>");
          }
          newrows[i].append($(this));
        });
    });
    $this.find("tr").remove();
    $.each(newrows, function () {
      $this.append(this);
    });
  });
});
