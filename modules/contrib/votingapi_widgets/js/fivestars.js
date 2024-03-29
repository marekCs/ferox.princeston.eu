/**
 * @file
 * Attaches fivestar rating.
 */

(function ($) {
  "use strict";

  /**
   * @type {{attach: Drupal.behaviors.fiveStarRating.attach}}
   */
  Drupal.behaviors.fiveStarRating = {
    attach: function (context) {
      once('five-star-rating', '.fivestar', document.body).forEach(function (item) {
        var $this = $(item);
        var $select = $this.find('select');
        var value = Math.round($select.data('result-value'));
        var vote_own_value = $select.data('vote-value');
        var isEdit = $select.data('is-edit');
        var show_own_vote = $select.data('show-own-vote');
        if (isEdit) {
          value = $select.val();
        }
        if (!value) {
          value = -1;
        }
        var options = {
          theme: ($select.data('style') == 'default') ? 'css-stars' : $select.data('style'),
          initialRating: show_own_vote ? (vote_own_value ? vote_own_value : -1) : value,
          allowEmpty: true,
          emptyValue: '',
          readonly: ($select.attr('disabled')) ? true : false,
          onSelect: function (value, text) {
            if (isEdit) {
              return;
            }
            $select.barrating('readonly', true);
            $this.find('[type=submit]').trigger('click');
            $this.find('a').addClass('disabled');
            $this.find('.vote-result').html();
          },
        };

        $select.barrating('show', options);
        $this.find('[type=submit]').hide();
      });
    }
  };

})(jQuery);
