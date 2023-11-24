/**
 * @file
 * Attaches is useful rating.
 */

(function ($) {
  "use strict";

  /**
   * @type {{attach: Drupal.behaviors.usefulRating.attach}}
   */
  Drupal.behaviors.usefulRating = {
    attach: function (context) {
      once('useful-rating', '.useful', document.body).forEach(function (item) {
        var $this = $(item);
        $this.find('select').each(function () {
          $this.find('[type=submit]').hide();
          var $select = $(this);
          var isPreview = $select.data('is-edit');
          $select.after('<div class="useful-rating"><a href="#"><i class="fa fa-thumbs-down"></i></a><a href="#"><i class="fa fa-thumbs-up"></a></i></div>').hide();
          $this.find('.useful-rating a').eq(0).each(function () {
            $(this).bind('click',function (e) {
              if (isPreview) {
                return;
              }
              e.preventDefault();
              $select.get(0).selectedIndex = 0;
              $this.find('[type=submit]').trigger('click');
              $this.find('a').addClass('disabled');
              $this.find('.vote-result').html();
            })
          });
          $this.find('.useful-rating a').eq(1).each(function () {
            $(this).bind('click',function (e) {
              if (isPreview) {
                return;
              }
              e.preventDefault();
              $select.get(0).selectedIndex = 1;
              $this.find('[type=submit]').trigger('click');
              $this.find('a').addClass('disabled');
              $this.find('.vote-result').html();
            });
          });
        });
      });
    }
  };

})(jQuery);
