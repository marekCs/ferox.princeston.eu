/**
 * @file
 * Attaches like rating.
 */

(function ($) {
  "use strict";

  /**
   * @type {{attach: Drupal.behaviors.likeRating.attach}}
   */
  Drupal.behaviors.likeRating = {
    attach: function (context) {
      once('like-rating', '.like', document.body).forEach(function (item) {
        var $this = $(item);
        $this.find('select').each(function () {
          $this.find('[type=submit]').hide();
          var $select = $(this);
          var isPreview = $select.data('is-edit');
          $select.after('<div class="like-rating"><a href="#"><i class="fa fa-thumbs-up"></i></a></div>').hide();
          $this.find('.like-rating a').eq(0).each(function () {
            $(this).bind('click',function (e) {
              if (isPreview) {
                return;
              }
              e.preventDefault();
              $select.get(0).selectedIndex = 0;
              $this.find('[type=submit]').trigger('click');
              $this.find('a').addClass('disabled');
            });
          });
        });
      });
    }
  };

})(jQuery);
