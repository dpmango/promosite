$(document).ready(function(){

  // Hamburger icon
  var helper_click = 1
	// вызов помошника
	$('#helper--toggle').click(function(e){
		if (helper_click == 1) {
			$('#show-helper, #helper__step-1').show();
			$('.calculator__wrapper, header').addClass('need-help');
			$('#calc__select-location--toggle').trigger('click');
			helper_click++
		} else {
			$('#show-helper, #helper__step-1').hide();
			$('.calculator__wrapper, header').removeClass('need-help');
			helper_click--
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


  // Services hover
  $('.service__block').hover(function(){
    if( $(this).closest('.row').data('hover') == "on" ){
      $(this).find('.service__block-hide').css('opacity', '1');
      $('.service__block-hide').hover(function(){
        $(this).css('opacity', '1');
      });
    }
  }, function(){
    $(this).find('.service__block-hide').css('opacity', '0');
  });

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

});
