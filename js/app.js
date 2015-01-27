/*
* Global Variables
*/ 

var isActive = false;
var lastScrollTop = $(window).scrollTop();

/*
* Check For Tutorial Cookie, then call Foundation
*/ 

// $('.tour-start').click(function(){
//   $('.about-modal-bg').fadeOut();
//   $(document).foundation('joyride', 'start', {
//     modal: true,
//     post_ride_callback: function(){ 
//       $("html, body").animate({ scrollTop: 0 }, 'slow'); 
//       $.cookie('issue_modal', 'yes', { expires: 30 });
//       // $('.modal-bg').fadeIn();
//     }
//   });
// });


$(document).ready(function() {
  if ($.cookie('gore_tutorial') == null) {
    $.cookie('gore_tutorial', 'yes', { expires: 360 });
    
    $(document).foundation('joyride', 'start', {
      modal: true,
      post_ride_callback: function(){ 
        $("html, body").animate({ scrollTop: 0 }, 'slow'); 
        $.cookie('issue_modal', 'yes', { expires: 30 });
        $('.modal-bg').fadeIn();
      }

    });
  }

  else { 

    $(document).foundation(); 

    if ($.cookie('issue_modal') == null) {
      $.cookie('issue_modal', 'yes', { expires: 1 });
      $('.modal-bg').fadeIn();
    }

  }

});

/*
* Make sure paralax is reset
*/ 

if (lastScrollTop > 0) { resetParralax(); }

/*
* Trigger Paralax On Scroll
*/ 

$(window).scroll( function(){
  navSwitch();
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return false;
  }

  bannerParralax();

}); 

 /*
 * Navigation Dropdown Interaction 
 */ 

$('.navigation-toggle').on('click',function() {

 if ($('.navigation-target').hasClass('clicked')) {
   $('.navigation-target').removeClass('clicked');
   $('.dropdown').slideUp(function(){
     $('body').css({ overflow:'scroll' });
   });
 }

 else {
   $('.navigation-target').addClass('clicked');
   $('.dropdown').slideDown(function(){
     $('body').css({ overflow:'hidden' });
   });
 }
});

 /*
 * Modal Interaction 
 */

 $('#js-modal-trigger').on('click', function(e){
   e.preventDefault();
   $('.about-modal-bg').fadeIn(function(){
      $('body').css({ overflow:'hidden' });
   });
 });

 $('.close-button, .about-modal-bg, .start-reading').on('click', function(e){
   e.preventDefault();
   $('.about-modal-bg').fadeOut(function(){
      $('body').css({ overflow:'scroll' });
   });
 });

 $('.about-modal').click(function(){
    return false;
 });

 /*
 * Float Label
 */

 $('.email-input').on('focus', function(){
    $('.input-label').addClass('active');
 });

 $('.email-input').on('blur', function(){
    var formVal = $(this).val();
    if (formVal !== ''){ return false }
    $('.input-label').removeClass('active');
 });



function resetParralax (){
  var lastScrollTop = 0;
  var scrollAmt = $(window).scrollTop();
  var scrollSpeed = scrollAmt - lastScrollTop;



  $('.feature-description').css({
    bottom: '-=' + scrollSpeed/4.5,
    opacity: '-=' + scrollSpeed/700
  });
  
  lastScrollTop = scrollAmt;
}

function bannerParralax(){
  var scrollAmt = $(this).scrollTop();
  var scrollSpeed = scrollAmt - lastScrollTop;


  $('.feature-description').css({
    bottom: '-=' + scrollSpeed/4.5,
    opacity: '-=' + scrollSpeed/700
  });
   
  lastScrollTop = scrollAmt;
}

function navSwitch() {
  var winTop = $(window).scrollTop();
  if( winTop > 750 && !isActive){
    $('.main-nav, .secondary-nav').addClass('active');
    isActive = true;
  }

  if(winTop <= 750 && isActive){
    $('.main-nav, .secondary-nav').removeClass('active');
    isActive = false;
  }
}