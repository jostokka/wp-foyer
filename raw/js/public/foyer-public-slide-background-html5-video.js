var foyer_slide_bg_html5_video_selector = '.foyer-slide-background-html5-video';

/**
 * Sets up the HTML5 Video slide background public functionality.
 *
 * @since	1.X.X
 */
jQuery(document).ready(function() {

	if (jQuery(foyer_slide_bg_html5_video_selector).length) {
		// Our view includes HTML5 Video slides, bind events
		foyer_slide_bg_html5_video_bind_ticker_events();
	}
});

/**
 * Binds events to be able to start and stop video playback at the right time, and prevent advancing to the next slide.
 *
 * @since	1.X.X
 */
function foyer_slide_bg_html5_video_bind_ticker_events() {

	jQuery('body').on('slides:before-binding-events', foyer_slides_selector, function ( event ) {
		// The slides ticker is about to set up binding events
		// Bind the slides:next-slide event early so we can prevent its default action if we need to

		jQuery('body').on('slides:next-slide', foyer_slides_selector, function( event ) {
			// The next slide event is triggered
			// Determine if we should prevent its default action or not

			// Set container
			var $container = jQuery(foyer_slide_bg_html5_video_selector).filter('.active').find('.html5-video-container');

			// Set video reference
			var vid = $container.find('video').get(0);

			if (vid && 1 == $container.data('foyer-hold-slide')) {
				// We should wait for the end of the video before proceeding to the next slide, but only when playing

				if ( 0 < vid.currentTime ) {
					// Video is playing, maybe prevent next slide

					if ( foyer_slide_bg_html5_video_is_almost_ended($container, vid) ) {
						// Video almost ended, do not prevent next slide
					}
					else {
						// Not ended yet, prevent next slide
						event.stopImmediatePropagation();

						// Monitor play progress to trigger next slide when video almost ended
						vid.ontimeupdate = function() {

							if (foyer_slide_bg_html5_video_is_almost_ended($container, vid)) {
								// Video almost ended, time for next slide
								jQuery(foyer_slides_selector).trigger('slides:next-slide');
							}

						};
					}
				}
			}
		});
	});

	jQuery('body').on('slide:became-active', foyer_slide_bg_html5_video_selector, function( event ) {
		// A video slide became active

		// Set container
		var $container = jQuery(this).find('.html5-video-container');

		// Set video reference
		var vid = $container.find('video').get(0);

		if (vid) {

			if (! $container.data('foyer-output-sound')) {
				// No sound (unless enable sound option is checked)
				vid.muted = true;
			}

			vid.currentTime = $container.data('foyer-video-start');

			// Play video
			vid.play();
		}
	});

	jQuery('body').on('slide:left-active', foyer_slide_bg_html5_video_selector, function( event ) {
		// A video slide left the active state

		// Set container
		var $container = jQuery(this).find('.html5-video-container');

		// Set video reference
		var vid = $container.find('video').get(0);

		if (vid) {

			// Stop monitoring play progress
			vid.ontimeupdate = false;

			// Pause video whenever CSS transitions are over
			setTimeout(function() {

				// Pause video
				vid.pause();

			}, foyer_ticker_css_transition_duration * 1000);
		}
	});
}

/**
 * Checks if a video has almost ended.
 *
 * @since	1.X.X
 *
 * @param	jQuery		$container	The container of the video.
 * @param	HTMLElement	vid			The reference to our HTML5 video element.
 */
function foyer_slide_bg_html5_video_is_almost_ended($container,vid) {

	if (vid) {

		var end = $container.data('foyer-video-end');
		var duration = vid.duration;
		var current_time = vid.currentTime;

		if ( duration < end || !end ) {
			end = duration;
		}

		if ( current_time >= end - foyer_ticker_css_transition_duration ) {
			// Video almost ended
			return true;
		}
	}

	return false;
}

