/*
	jquery Image Zoomer
*/

/**
 * @file
 * Product images JS
 */
(function ($) {

    'use strict';

    Drupal.behaviors.productImages = {
      attach: function (context, settings) {
		  
	$.fn.picZoomer = function(options){
		var opts = $.extend({}, $.fn.picZoomer.defaults, options), 
			$this = this,
			$picBD = $('<div class="piczoomer-pic-wp"></div>').css({'width':opts.picWidth+'px', 'height':opts.picHeight+'px'}).appendTo($this),
			$pic = $this.children('img').addClass('piczoomer-pic').appendTo($picBD),
			$cursor = $('<div class="piczoomer-cursor"><div></div></div>').appendTo($picBD),
			cursorSizeHalf = {w:$cursor.width()/3 ,h:$cursor.height()/3},
			$zoomWP = $('<div class="piczoomer-zoom-wp"><img src="" alt="" class="piczoomer-zoom-pic"></div>').appendTo($this),
			$zoomPic = $zoomWP.find('.piczoomer-zoom-pic'),
			//picBDOffset = {x:$picBD.offset().left,y:$picBD.offset().top};
			picBDOffset = {x:$picBD.offset()?$picBD.offset().left:0,y:$picBD.offset()?$picBD.offset().top:0};

		opts.zoomWidth = opts.zoomWidth||opts.picWidth;
		opts.zoomHeight = opts.zoomHeight||opts.picHeight;
		var zoomWPSizeHalf = {w:opts.zoomWidth/2 ,h:opts.zoomHeight/2};

		//zoom wp css
		$zoomWP.css({'width':opts.zoomWidth+'px', 'height':opts.zoomHeight+'px'});
		$zoomWP.css(opts.zoomerPosition || {top: 0, left: opts.picWidth+30+'px'});
		//zoom pic css
		$zoomPic.css({'width':opts.picWidth*opts.scale+'px', 'height':opts.picHeight*opts.scale+'px'});

		//zoom cursor
		$picBD.on('mouseenter',function(event){
			$cursor.show();
			$zoomWP.show();
			$zoomPic.attr('src',$pic.attr('src'))
		}).on('mouseleave',function(event){
			$cursor.hide();
			$zoomWP.hide();
		}).on('mousemove', function(event){
			var x = event.pageX-picBDOffset.x,
				y = event.pageY-picBDOffset.y;

			$cursor.css({'left':x-cursorSizeHalf.w+'px', 'top':y-cursorSizeHalf.h+'px'});
			$zoomPic.css({'left':-(x*opts.scale-zoomWPSizeHalf.w)+'px', 'top':-(y*opts.scale-zoomWPSizeHalf.h)+'px'});

		});
		return $this;

	};
	$.fn.picZoomer.defaults = {
		//picWidth: 320,
		//picHeight: 320,
		scale: 2.5,
		//zoomerPosition: {top: '0', left: '450px'},
		zoomWidth: 550,
		zoomHeight: 450
	};
	
      }
    };
	
})(jQuery);