<!-- BEGIN POSITIONING HTML BEFORE FADE -->
jQuery("html").addClass('bonfire-html-onload');
<!-- END POSITIONING HTML BEFORE FADE -->

<!-- BEGIN DISABLE BROWSER SCROLL -->
/* disable browser scroll on touch devices */
jQuery(document.body).on("touchmove", function(e) {
    e.preventDefault();
});

/* disable browser scroll on desktop */
var scrollPosition = [
self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
];
var html = jQuery('html');
html.data('scroll-position', scrollPosition);
html.data('previous-overflow', html.css('overflow'));
html.css('overflow', 'hidden');
window.scrollTo(scrollPosition[0], scrollPosition[1]);
<!-- END DISABLE BROWSER SCROLL -->

<!-- BEGIN LOADER FADE-OUT AND HTML SLIDE-DOWN -->
jQuery(window).load(function() {	

	setTimeout(function(){
	/* fade out the loading icon */
	jQuery(".bonfire-pageloader-icon").addClass('bonfire-pageloader-icon-hide');
	},500);

	/* after 250ms delay, restore browser scroll + fade out loader background + slide down page */
	setTimeout(function(){

		/* enable browser scroll on touch devices */
		jQuery(document.body).unbind('touchmove');

		/* enable browser scroll on desktop */
		var html = jQuery('html');
		var scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		window.scrollTo(scrollPosition[0], scrollPosition[1]);

		/* fade out loader */
		jQuery("#bonfire-pageloader").addClass('bonfire-pageloader-fade');

		/* slide down html */
		jQuery("html").removeClass('bonfire-html-onload');

	},750);	
	
	/* after 1000ms delay, hide (not fade out) loader*/
	setTimeout(function(){

	/* hide loader after fading out*/
		jQuery("#bonfire-pageloader").addClass('bonfire-pageloader-hide');

	},1500);
	
});
<!-- END LOADER FADE-OUT AND HTML SLIDE-DOWN -->