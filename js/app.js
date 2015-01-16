$(document).foundation();

var isActive = false;
var lastScrollTop = $(window).scrollTop();

$(window).scroll(function(){
  var scrollAmt = $(this).scrollTop();
  var scrollSpeed = scrollAmt - lastScrollTop;

  navSwitch();

   //Disable this if user is using a mobile device
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return false;
  }

  $('.feature-description').css({
    bottom: '-=' + scrollSpeed/4.5,
    opacity: '-=' + scrollSpeed/700
  }); 
   
  lastScrollTop = scrollAmt;

 }); 

// Navigation Dropdown Interaction 

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
      // $('.dropdown').scrollTop(0);
      $('body').css({ overflow:'hidden' });
    });
  }
});

// Modal Interaction 

$('#js-modal-trigger').on('click', function(e){
  e.preventDefault();
  $('.modal-bg').fadeIn();
});

$('.close-button').on('click', function(e){
  e.preventDefault();
  $('.modal-bg').fadeOut();
});

// Navigation Scroll Interaction

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