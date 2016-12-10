$(document).ready(function(){

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
