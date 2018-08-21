(function ($) {
  "use strict"; // Start of use strict

  $('.carousel').on('fullscreenChange.flickity', function (event, isFullscreen) {
    if (isFullscreen) {
      $(".navbar").addClass("d-none");
    } else {
      $(".navbar").removeClass("d-none");
    }
  });
  $('.carousel').on('dragStart.flickity', function (event, pointer) {
    document.ontouchmove = function (e) {
      e.preventDefault();
    }
  });
  $('.carousel').on('dragEnd.flickity', function (event, pointer) {
    document.ontouchmove = function (e) {
      return true;
    }
  });

  $('textarea#message').characterCounter({
    counterSelector: '#character-counter',
    increaseCounting: true,
    renderTotal: true
  });

  $('textarea#message').focus(function () {
    $("#character-counter").removeAttr('hidden');
  });
  $('textarea#message').focusout(function () {
    $("#character-counter").attr('hidden', '');
  });


  // Toggle animation hamburger menu
  $('.navbar-toggler, .nav-link').on('click', function () {

    // Take this line to first hamburger animations
    $('.animated-icon1').toggleClass('open');

    // Take this line to second hamburger animation
    $('.animated-icon3').toggleClass('open');

    // Take this line to third hamburger animation
    $('.animated-icon4').toggleClass('open');
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
