$(document).ready(function(){

  // hamburger
  var click = 1;

  $("#show-me-menu").on("click", clickHamb);

  function clickHamb() {
      if ( click == 1 ) {
          $(this).addClass('is-active');
          $('.mobile-nav').slideToggle(300);
          click = 2;
      } else {
      $(this).removeClass('is-active');
      $('.mobile-nav').hide();
          click = 1;
      }
  }

  $('.mobile-nav-list > li > a').click(function(e){
		if($(this).closest("li").children("ul").length) {
			e.preventDefault();
			$(this).closest('li').find('ul').toggleClass('active');
		}
	});

  // testimonial slider
  $("#owl-testimonials").owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		items: 1,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true
	});

  // modals
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Загрузка изображения #%curr%...',
		mainClass: 'mfp-no-margins mfp-with-zoom',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">Изображение #%curr%</a> не найдено.'
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});


  // // Services hover
  // $('.service__block').hover(function(){
  //   if( $(this).closest('.row').data('hover') == "on" ){
  //     $(this).find('.service__block-hide').css('opacity', '1');
  //     $('.service__block-hide').hover(function(){
  //       $(this).css('opacity', '1');
  //     });
  //   }
  // }, function(){
  //   $(this).find('.service__block-hide').css('opacity', '0');
  // });

  // phone mask
  $("input[name=phone]").mask("+7 (999) 999-9999");

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // Floating header
  function headerFloat() {
		if ($('.floater').is('.floater')) {
			var winPos = $(window).scrollTop();

			if (winPos > 150) {
				$('.floater').addClass('active');
			} else {
				$('.floater').removeClass('active');
			}
		}
	}
	headerFloat();

  $(window).scroll(function () {
		headerFloat();
	});
});
