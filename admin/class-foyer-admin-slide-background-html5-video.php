<?php

/**
 * Adds admin functionality for the Video slide background.
 *
 * @since		1.X.X
 *
 * @package		Foyer
 * @subpackage	Foyer/admin
 * @author		Menno Luitjes <menno@mennoluitjes.nl>
 */
class Foyer_Admin_Slide_Background_Html5_Video {

	/**
	 * Saves additional data for the Video slide background.
	 *
	 * @since	1.X.X
	 *
	 * @param	int		$post_id	The ID of the post being saved.
	 * @return	void
	 */
	static function save_slide_background( $post_id ) {
		$slide_bg_html5_video_video_url = sanitize_text_field( $_POST['slide_bg_html5_video_video_url'] );

		$slide_bg_html5_video_video_start = intval( $_POST['slide_bg_html5_video_video_start'] );
		if ( empty( $slide_bg_html5_video_video_start ) ) {
			$slide_bg_html5_video_video_start = '';
		}

		$slide_bg_html5_video_video_end = intval( $_POST['slide_bg_html5_video_video_end'] );
		if ( empty( $slide_bg_html5_video_video_end ) ) {
			$slide_bg_html5_video_video_end = '';
		}

		$slide_bg_html5_video_hold_slide = '';
		if ( isset( $_POST['slide_bg_html5_video_hold_slide'] ) ) {
			$slide_bg_html5_video_hold_slide = intval( $_POST['slide_bg_html5_video_hold_slide'] );
			if ( empty( $slide_bg_html5_video_hold_slide ) ) {
				$slide_bg_html5_video_hold_slide = '';
			}
		}

		$slide_bg_html5_video_enable_sound = '';
		if ( isset( $_POST['slide_bg_html5_video_enable_sound'] ) ) {
			$slide_bg_html5_video_enable_sound = intval( $_POST['slide_bg_html5_video_enable_sound'] );
			if ( empty( $slide_bg_html5_video_enable_sound ) ) {
				$slide_bg_html5_video_enable_sound = '';
			}
		}

		update_post_meta( $post_id, 'slide_bg_html5_video_video_url', $slide_bg_html5_video_video_url );
		update_post_meta( $post_id, 'slide_bg_html5_video_video_start', $slide_bg_html5_video_video_start );
		update_post_meta( $post_id, 'slide_bg_html5_video_video_end', $slide_bg_html5_video_video_end );
		update_post_meta( $post_id, 'slide_bg_html5_video_hold_slide', $slide_bg_html5_video_hold_slide );
		update_post_meta( $post_id, 'slide_bg_html5_video_enable_sound', $slide_bg_html5_video_enable_sound );
	}

	/**
	 * Outputs the meta box for the Video slide background.
	 *
	 * @since	1.X.X
	 *
	 * @param	WP_Post	$post	The post of the current slide.
	 * @return	void
	 */
	static function slide_background_meta_box( $post ) {

		wp_enqueue_media();

		$slide_bg_html5_video_video_url = get_post_meta( $post->ID, 'slide_bg_html5_video_video_url', true );
		$slide_bg_html5_video_video_start = get_post_meta( $post->ID, 'slide_bg_html5_video_video_start', true );
		$slide_bg_html5_video_video_end = get_post_meta( $post->ID, 'slide_bg_html5_video_video_end', true );
		$slide_bg_html5_video_hold_slide = get_post_meta( $post->ID, 'slide_bg_html5_video_hold_slide', true );
		$slide_bg_html5_video_enable_sound = get_post_meta( $post->ID, 'slide_bg_html5_video_enable_sound', true );

		?><table class="form-table">
			<tbody>
				<tr>
					<th scope="row">
						<label for="slide_bg_html5_video_video_url"><?php _e('Video file URL', 'foyer'); ?></label>
					</th>
					<td>
						<input type="text" name="slide_bg_html5_video_video_url" id="slide_bg_html5_video_video_url" class="all-options"
							value="<?php echo $slide_bg_html5_video_video_url; ?>" />
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="slide_bg_image_image"><?php esc_html_e( 'Video file', 'foyer' ); ?></label>
					</th>
					<td>
						<div class="slide_image_field file_type_video<?php if ( empty( $slide_bg_image_image ) ) { ?> empty<?php } ?>">
							<div class="image-preview-wrapper">
								<img class="slide_image_preview" src="<?php echo esc_url( wp_get_attachment_url( $slide_bg_image_image ) ); ?>">
							</div>

							<input type="button" class="button slide_image_upload_button" value="<?php esc_html_e( 'Upload image', 'foyer' ); ?>" />
							<input type="button" class="button slide_image_delete_button" value="<?php esc_html_e( 'Remove image', 'foyer' ); ?>" />
							<input type="hidden" name="slide_bg_image_image" class="slide_image_value" value='<?php echo intval( $slide_bg_image_image ); ?>'>
							<p><?php _e( 'For the best results use an image that is at least 1920 x 1080 pixels (landscape), or 1080 x 1920 pixels (portrait).', 'foyer' ); ?></p>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="slide_bg_html5_video_video_start"><?php _e('Start at', 'foyer'); ?></label>
					</th>
					<td>
						<input type="text" name="slide_bg_html5_video_video_start" id="slide_bg_html5_video_video_start" class="small-text"
							value="<?php echo $slide_bg_html5_video_video_start; ?>" />
						<span><?php _e( 'seconds', 'foyer' ); ?></span>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="slide_bg_html5_video_video_end"><?php _e('End at', 'foyer'); ?></label>
					</th>
					<td>
						<input type="text" name="slide_bg_html5_video_video_end" id="slide_bg_html5_video_video_end" class="small-text"
							value="<?php echo $slide_bg_html5_video_video_end; ?>" />
						<span><?php _e( 'seconds', 'foyer' ); ?></span>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="slide_bg_html5_video_hold_slide"><?php _e('Hold slide until end?', 'foyer'); ?></label>
					</th>
					<td>
						<input type="checkbox" name="slide_bg_html5_video_hold_slide" id="slide_bg_html5_video_hold_slide"
							value="1" <?php checked( $slide_bg_html5_video_hold_slide, 1 ); ?> />
						<span><?php _e('Yes, hold the slide until the end of the video.', 'foyer'); ?></span>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="slide_bg_html5_video_enable_sound"><?php _e('Enable sound?', 'foyer'); ?></label>
					</th>
					<td>
						<input type="checkbox" name="slide_bg_html5_video_enable_sound" id="slide_bg_html5_video_enable_sound"
							value="1" <?php checked( $slide_bg_html5_video_enable_sound, 1 ); ?> />
						<span><?php _e('Yes, enable sound for this video.', 'foyer'); ?></span>
					</td>
				</tr>
				<tr>
					<th scope="row">
						<label for="slide_bg_html5_video_video_preview"><?php _e('Preview', 'foyer'); ?></label>
					</th>
					<td>
						<div class="youtube-video-container" id="foyer-admin-video-preview"></div>
					</td>
				</tr>
			</tbody>
		</table><?php
	}
}
