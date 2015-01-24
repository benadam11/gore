/*
* Global Variables
*/ 

var isActive = false;
var lastScrollTop = $(window).scrollTop();

/*
* Check For Tutorial Cookie, then call Foundation
*/ 

$(document).ready(function() {
  if ($.cookie('gore_tutorial') == null) {

    $.cookie('gore_tutorial', 'yes', { expires: 360 });

    $(document).foundation('joyride', 'start', {

      post_ride_callback: function(){

        $("html, body").animate({ scrollTop: 0 }, 'slow');

      }

    });
  }
  else { $(document).foundation(); }
});

/*
* Make sure paralax is reset
*/ 

if (lastScrollTop > 0) { resetParralax(); }

/*
* Trigger Paralax On Scroll
*/ 

$(window).scroll( function(){
  checkForMobile();
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
   $('.modal-bg').fadeIn();
 });

 $('.close-button').on('click', function(e){
   e.preventDefault();
   $('.modal-bg').fadeOut();
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

  navSwitch();

  checkForMobile();

  $('.feature-description').css({
    bottom: '-=' + scrollSpeed/4.5,
    opacity: '-=' + scrollSpeed/700
  });
  
  lastScrollTop = scrollAmt;
}

function bannerParralax(){
  var scrollAmt = $(this).scrollTop();
  var scrollSpeed = scrollAmt - lastScrollTop;

  navSwitch();



  $('.feature-description').css({
    bottom: '-=' + scrollSpeed/4.5,
    opacity: '-=' + scrollSpeed/700
  });
   
  lastScrollTop = scrollAmt;
}


function checkForMobile(message) {
  console.log(message)
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return false;
  }
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