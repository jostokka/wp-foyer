function foyer_display_setup_slide_group_classes(){jQuery(foyer_slides_selector).children().addClass("foyer-slide-group-1")}function foyer_display_setup(){jQuery(this).css("cursor","none"),major_refresh_timeout=setTimeout(foyer_display_reload_window,288e5),foyer_loader_intervalObject=window.setInterval(foyer_display_load_data,3e5)}function foyer_display_load_data(){var e,o;jQuery(".foyer-slide-group-1").length?jQuery(".foyer-slide-group-2").length||(o="foyer-slide-group-2",e="foyer-slide-group-1"):(o="foyer-slide-group-1",e="foyer-slide-group-2"),o&&jQuery.get(window.location,function(t){if($new_html=jQuery(jQuery.parseHTML(jQuery.trim(t))),$new_html.filter(foyer_display_selector).hasClass("foyer-reset-display"))foyer_ticker_shutdown(foyer_display_reload_window);else if($new_html.find(foyer_channel_selector).attr("class")!==jQuery(foyer_channel_selector).attr("class"))foyer_ticker_shutdown(foyer_display_replace_channel,$new_html.find(foyer_channel_selector));else{var i=$new_html.find(foyer_slides_selector).children().addClass(o);1===jQuery(foyer_slides_selector).children().length&&1===$new_html.find(foyer_slides_selector).children().length?(jQuery(foyer_slides_selector).html(i).trigger("slides:loaded-new-slide-group").trigger("slides:removed-old-slide-group"),foyer_ticker_set_slide_active_next_classes()):(jQuery(foyer_slides_selector).children().last().after(i),jQuery(foyer_slides_selector).trigger("slides:loaded-new-slide-group"),jQuery("body").one("slide:left-active","."+o,function(o){return jQuery(foyer_slides_selector).find("."+e).remove(),jQuery(foyer_slides_selector).trigger("slides:removed-old-slide-group"),!0}))}})}function foyer_display_replace_channel(e){jQuery(foyer_channel_selector).replaceWith(e),jQuery(foyer_channel_selector).trigger("channel:replaced-channel"),foyer_display_setup_slide_group_classes(),setTimeout(foyer_ticker_init,100)}function foyer_display_reload_window(){window.location.reload()}function foyer_slide_bg_video_bind_display_loading_events(){jQuery("body").on("channel:replaced-channel",foyer_channel_selector,function(e){foyer_yt_api_ready?(foyer_slide_bg_video_init_video_placeholders(),foyer_slide_bg_video_cleanup_youtube_players()):foyer_slide_bg_video_load_youtube_api()}),jQuery("body").on("slides:loaded-new-slide-group",foyer_slides_selector,function(e){foyer_yt_api_ready?foyer_slide_bg_video_init_video_placeholders():foyer_slide_bg_video_load_youtube_api()}),jQuery("body").on("slides:removed-old-slide-group",foyer_slides_selector,function(e){foyer_slide_bg_video_cleanup_youtube_players()})}function foyer_slide_bg_video_bind_ticker_events(){jQuery("body").on("slides:before-binding-events",foyer_slides_selector,function(e){jQuery("body").on("slides:next-slide",foyer_slides_selector,function(e){var o=jQuery(foyer_slide_bg_video_selector).filter(".active").find(".youtube-video-container"),t=window.foyer_yt_players[o.attr("id")];if(1==o.data("foyer-hold-slide")&&t&&"function"==typeof t.playVideo){var i=o.data("foyer-video-end"),r=t.getDuration(),_=t.getCurrentTime();(r<i||!i)&&(i=r),1!==t.getPlayerState()||_>=i-foyer_ticker_css_transition_duration||(e.stopImmediatePropagation(),setTimeout(function(){jQuery(foyer_slides_selector).trigger("slides:next-slide")},500))}})}),jQuery("body").on("slide:became-active",foyer_slide_bg_video_selector,function(e){var o=jQuery(this).find(".youtube-video-container"),t=window.foyer_yt_players[o.attr("id")];t&&"function"==typeof t.playVideo&&t.playVideo()}),jQuery("body").on("slide:left-active",foyer_slide_bg_video_selector,function(e){var o=jQuery(this).find(".youtube-video-container"),t=window.foyer_yt_players[o.attr("id")];t&&"function"==typeof t.playVideo&&setTimeout(function(){t.seekTo(o.data("foyer-video-start")),t.pauseVideo()},1e3*foyer_ticker_css_transition_duration)})}function foyer_slide_bg_video_cleanup_youtube_players(){for(var e in window.foyer_yt_players)jQuery("#"+e).length||(delete window.foyer_yt_players[e],jQuery(window).off("resize",function(){foyer_slide_bg_video_resize_youtube_to_cover(e)}))}function foyer_slide_bg_video_init_video_placeholders(){jQuery("div.youtube-video-container").each(function(){var e=jQuery(this);e.attr("id","player-"+Math.random().toString(36).substr(2,16));var o=e.attr("id"),t=e.data("foyer-video-id");o&&t&&(window.foyer_yt_players[o]=new YT.Player(o,{width:"1920",height:"1080",videoId:t,playerVars:{controls:0,modestbranding:1,rel:0,showinfo:0,playsinline:1},events:{onReady:foyer_slide_bg_video_prepare_player_for_playback(o)}}))})}function foyer_slide_bg_video_load_youtube_api(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(e,o)}function foyer_slide_bg_video_prepare_player_for_playback(e){return function(o){var t=jQuery("#"+e),i=window.foyer_yt_players[e];foyer_slide_bg_video_resize_youtube_to_cover(e),jQuery(window).on("resize",function(){foyer_slide_bg_video_resize_youtube_to_cover(e)}),window.self!=window.top&&-1!=top.location.href.search("/post.php?")||(t.data("foyer-output-sound")||i.mute(),i.seekTo(t.data("foyer-video-start")),jQuery(foyer_slides_selector).length&&!jQuery("#"+e).parents(foyer_slide_bg_video_selector).hasClass("active")&&i.pauseVideo())}}function foyer_slide_bg_video_resize_youtube_to_cover(e){var o=jQuery("#"+e),t=window.foyer_yt_players[e],i=jQuery(window).width()+0,r=jQuery(window).height()+0;if(i/r>16/9){var _=i/16*9;t.setSize(i,_),o.css({left:"0px"})}else{var s=r/9*16;t.setSize(s,r),o.css({left:-(s-i)/2})}}function onYouTubeIframeAPIReady(){foyer_yt_api_ready=!0,foyer_slide_bg_video_init_video_placeholders()}function foyer_slide_bg_html5_video_bind_ticker_events(){jQuery("body").on("slides:before-binding-events",foyer_slides_selector,function(e){jQuery("body").on("slides:next-slide",foyer_slides_selector,function(e){var o=jQuery(foyer_slide_bg_html5_video_selector).filter(".active").find(".html5-video-container"),t=o.find("video").get(0);t&&1==o.data("foyer-hold-slide")&&0<t.currentTime&&(foyer_slide_bg_html5_video_is_almost_ended(o,t)||(e.stopImmediatePropagation(),t.ontimeupdate=function(){foyer_slide_bg_html5_video_is_almost_ended(o,t)&&jQuery(foyer_slides_selector).trigger("slides:next-slide")}))})}),jQuery("body").on("slide:became-active",foyer_slide_bg_html5_video_selector,function(e){var o=jQuery(this).find(".html5-video-container"),t=o.find("video").get(0);t&&(o.data("foyer-output-sound")||(t.muted=!0),t.currentTime=o.data("foyer-video-start"),t.play())}),jQuery("body").on("slide:left-active",foyer_slide_bg_html5_video_selector,function(e){var o=jQuery(this).find(".html5-video-container"),t=o.find("video").get(0);t&&(t.ontimeupdate=!1,setTimeout(function(){t.pause()},1e3*foyer_ticker_css_transition_duration))})}function foyer_slide_bg_html5_video_is_almost_ended(e,o){if(o){var t=e.data("foyer-video-end"),i=o.duration,r=o.currentTime;if((i<t||!t)&&(t=i),r>=t-foyer_ticker_css_transition_duration)return!0}return!1}function foyer_ticker_bind_events(){jQuery(foyer_slides_selector).trigger("slides:before-binding-events"),jQuery("body").on("slides:next-slide",foyer_slides_selector,function(e){var o=jQuery(foyer_slide_selector+".active");o.trigger("slide:leaving-active");var t=o.next();t.length||(t=jQuery(foyer_slide_selector).first());var i=t.next();i.length||(i=jQuery(foyer_slide_selector).first()),foyer_ticker_shutdown_status?(foyer_ticker_shutdown_status=!1,setTimeout(function(){foyer_ticker_shutdown_callback(foyer_ticker_shutdown_callback_options)},1e3*foyer_ticker_css_transition_duration_safe)):(t.trigger("slide:becoming-active"),i.trigger("slide:becoming-next"),foyer_ticker_set_active_slide_timeout())}),jQuery("body").on("slide:becoming-next",foyer_slide_selector,function(e){jQuery(this).addClass("next").trigger("slide:became-next")}),jQuery("body").on("slide:becoming-active",foyer_slide_selector,function(e){jQuery(this).removeClass("next").addClass("active").trigger("slide:became-active")}),jQuery("body").on("slide:leaving-active",foyer_slide_selector,function(e){jQuery(this).removeClass("active").trigger("slide:left-active")}),jQuery(foyer_slides_selector).trigger("slides:after-binding-events")}function foyer_ticker_init(){foyer_ticker_set_slide_active_next_classes(),foyer_ticker_set_active_slide_timeout()}function foyer_ticker_set_slide_active_next_classes(){jQuery(foyer_slide_selector).first().trigger("slide:becoming-active"),jQuery(foyer_slide_selector).first().next().trigger("slide:becoming-next")}function foyer_ticker_set_active_slide_timeout(){var e=parseFloat(jQuery(foyer_slide_selector+".active").data("foyer-slide-duration"));!e>0&&(e=5),setTimeout(foyer_ticker_next_slide,1e3*e)}function foyer_ticker_next_slide(){jQuery(foyer_slides_selector).trigger("slides:next-slide")}function foyer_ticker_shutdown(e,o){foyer_ticker_shutdown_status=!0,foyer_ticker_shutdown_callback=e,foyer_ticker_shutdown_callback_options=o}var foyer_display_selector=".foyer-display",foyer_channel_selector=".foyer-channel",foyer_slides_selector=".foyer-slides",foyer_slide_selector=".foyer-slide";jQuery(document).ready(function(){jQuery(foyer_display_selector).length&&(foyer_display_setup(),foyer_display_setup_slide_group_classes())}),function(){"use strict";if("undefined"!=typeof window){var e=window.navigator.userAgent.match(/Edge\/(\d{2})\./),o=!!e&&parseInt(e[1],10)>=16;if("objectFit"in document.documentElement.style!=0&&!o)return void(window.objectFitPolyfill=function(){return!1});var t=function(e){var o=window.getComputedStyle(e,null),t=o.getPropertyValue("position"),i=o.getPropertyValue("overflow"),r=o.getPropertyValue("display");t&&"static"!==t||(e.style.position="relative"),"hidden"!==i&&(e.style.overflow="hidden"),r&&"inline"!==r||(e.style.display="block"),0===e.clientHeight&&(e.style.height="100%"),-1===e.className.indexOf("object-fit-polyfill")&&(e.className=e.className+" object-fit-polyfill")},i=function(e){var o=window.getComputedStyle(e,null),t={"max-width":"none","max-height":"none","min-width":"0px","min-height":"0px",top:"auto",right:"auto",bottom:"auto",left:"auto","margin-top":"0px","margin-right":"0px","margin-bottom":"0px","margin-left":"0px"};for(var i in t)o.getPropertyValue(i)!==t[i]&&(e.style[i]=t[i])},r=function(e){var o=e.parentNode;t(o),i(e),e.style.position="absolute",e.style.height="100%",e.style.width="auto",e.clientWidth>o.clientWidth?(e.style.top="0",e.style.marginTop="0",e.style.left="50%",e.style.marginLeft=e.clientWidth/-2+"px"):(e.style.width="100%",e.style.height="auto",e.style.left="0",e.style.marginLeft="0",e.style.top="50%",e.style.marginTop=e.clientHeight/-2+"px")},_=function(e){if(void 0===e)e=document.querySelectorAll("[data-object-fit]");else if(e&&e.nodeName)e=[e];else{if("object"!=typeof e||!e.length||!e[0].nodeName)return!1;e=e}for(var t=0;t<e.length;t++)if(e[t].nodeName){var i=e[t].nodeName.toLowerCase();"img"!==i||o?"video"===i&&(e[t].readyState>0?r(e[t]):e[t].addEventListener("loadedmetadata",function(){r(this)})):e[t].complete?r(e[t]):e[t].addEventListener("load",function(){r(this)})}return!0};document.addEventListener("DOMContentLoaded",function(){_()}),window.addEventListener("resize",function(){_()}),window.objectFitPolyfill=_}}();var foyer_slide_bg_video_selector=".foyer-slide-background-video",foyer_yt_players={},foyer_yt_api_ready=!1;jQuery(document).ready(function(){jQuery(foyer_slide_bg_video_selector).length&&(foyer_slide_bg_video_load_youtube_api(),foyer_slide_bg_video_bind_display_loading_events(),foyer_slide_bg_video_bind_ticker_events())});var foyer_slide_bg_html5_video_selector=".foyer-slide-background-html5-video";jQuery(document).ready(function(){jQuery(foyer_slide_bg_html5_video_selector).length&&foyer_slide_bg_html5_video_bind_ticker_events()});var foyer_ticker_shutdown_status=!1,foyer_ticker_shutdown_callback,foyer_ticker_shutdown_callback_options,foyer_ticker_css_transition_duration=1.5,foyer_ticker_css_transition_duration_safe=foyer_ticker_css_transition_duration+.5;jQuery(document).ready(function(){jQuery(foyer_slides_selector).length&&(foyer_ticker_bind_events(),foyer_ticker_init())});