(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__item--' + currentPage).addClass('site-nav__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Parallax
//      [ example: <div class="parallax" data-parallax-speed="0.2"> ]
///////////////////////////////////////

  $(document).scroll(function(){
    var scrolled = $(document).scrollTop();
    $('.parallax').each(function(){
      var speed = $(this).attr('data-parallax-speed');
      var offset = $(this).offset();
      var parallax = -(scrolled - offset.top) * speed ;
      $(this).css('background-position', 'center ' + parallax + 'px');
    });
  });


///////////////////////////////////////
//    Modal
///////////////////////////////////////


  var modal         = $('.js-modal'),
      modalContent  = $('.js-modal__content'),
      modalClose    = $('.js-modal__close');

  // EVENT - launch modal & populate with content
  $('.js-launch-modal').on('click', function(e) {
    var expert = $(this).attr('data-expert');
    e.preventDefault();
    // launch modal
    modal.removeClass('is-closed').addClass('is-open').fadeIn();
    $('.modal__content#' + expert).addClass('active');
    $('body').css('overflow', 'hidden');
  });

  function closeModal() {
    $('.modal__content.active').removeClass('active');
    modal.removeClass('is-open').addClass('is-closed').fadeOut();
    $('body').css('overflow', 'auto');
  }

  modalClose.click(function() {
    closeModal();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
       closeModal();
    }
  });

  // closes modal on background click
  modal.on('click', function(event) {
    if (event.target !== this){
      return;
    }
    closeModal();
  });


///////////////////////////////////////
//    Expanding content
///////////////////////////////////////

  var eleHeight = $('.js-expand-content').height();

  $(document).ready(function(){
    $('.js-expand-content').css('height','30px');
  });

  $('.js-expand-content--btn').click(function(){
    $('.js-expand-content').css('height',eleHeight);
    $(this).parent().addClass('expanded');
  });

///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end