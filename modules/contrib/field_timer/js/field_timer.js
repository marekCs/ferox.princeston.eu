/**
 * @file
 * File with JS to initialize jQuery plugins on fields.
 */

(function ($) {
  "use strict";
  Drupal.behaviors.field_timer = {
    attach: function () {
      var settings = drupalSettings.field_timer;
      if ($.countdown !== undefined) {
        $.countdown.setDefaults($.countdown.regionalOptions['']);
      }
      for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
          var options = settings[key].settings;
          var $item = $('[data-field-timer-key=' + key + ']');
          var timestamp = $item.data('timestamp');
          switch (settings[key].plugin) {
            case 'county':
              if (!$item.hasClass('county-reflection')) {
                once('field-timer', $item).forEach(function (el) {
                  $(el).county($.extend({endDateTime: new Date(timestamp * 1000)}, options));
                });
              }
            break;

            case 'jquery.countdown':
              once('field-timer', $item).forEach(function (el) {
                $(el).countdown($.extend(
                  options,
                  {
                    until: (options.until ? new Date(timestamp * 1000) : null),
                    since: (options.since ? new Date(timestamp * 1000) : null)
                  },
                  $.countdown.regionalOptions[options.regional]
                ));
              });
            break;

            case 'jquery.countdown.led':
              once('field-timer', $item).forEach(function (el) {
                $(el).countdown({
                  until: (options.until ? new Date(timestamp * 1000) : null),
                  since: (options.since ? new Date(timestamp * 1000) : null),
                  layout: $item.html()
                });
              });
            break;
          }
        }
      }
    },
    // @link https://github.com/kbwood/countdown/issues/48
    detach: function (context) {
      var settings = drupalSettings.field_timer;
      if ($.countdown !== undefined) {
        $.countdown.setDefaults($.countdown.regionalOptions['']);
      }
      for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
          var $item = $('[data-field-timer-key=' + key + ']', context);
          if ($item.length) {
            $item.countdown('destroy');
          }
        }
      }
    }
  };
})(jQuery);
