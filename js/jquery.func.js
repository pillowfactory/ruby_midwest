$(function() {
	$('a').click(function() {
		var target = $(this).attr('href');
		if(target[0] == '#' && target.length > 1) {
			var scroll_t = $(target).offset().top - 8;
			$('html, body').animate({
				scrollTop: scroll_t
			}, {
				duration: 1000
			});
			return false;
		}
		if($(this).hasClass('disabled')) {
			return false;
		}
	});
	
	$('.blink')
	.focus(function() {
		if(this.value == this.title) {
			this.value = ''
		}
	})
	.blur(function() {
		if(this.value == '') {
			this.value = this.title
		}
	});
	
	if($.browser.msie && $.browser.version == 6) {
		DD_belatedPNG.fix('.icon, .entry-body, #footer .back .cow, #welcome .right-half img, #sponsors .entry-body img, .button');
	}
});