var $ = jquery = jQuery;

(function ($) {
    'use strict';
    Drupal.behaviors.productcolorbox = {
      attach: function (context, settings) {

		$('.piczoomer img').each(function(){
			var anchor = $('<a/>').attr({'href': this.src}).colorbox({height: "90%"});
			$(this).wrap(anchor);
			
			$('.piclist .field-item').on('click',function(event){
			var $pix = $(this).find('img');
			$('.cboxElement').attr('href',$pix.attr('src'));	
		});
		});	

	 }
    };	
	
})(jQuery);


