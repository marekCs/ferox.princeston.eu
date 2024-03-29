<?php

namespace Drupal\splide\Plugin\views\style;

use Drupal\Core\Form\FormStateInterface;

/**
 * Splide style plugin.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "splide",
 *   title = @Translation("Splide Slider"),
 *   help = @Translation("Display the results in a Splide Slider."),
 *   theme = "splide_wrapper",
 *   register_theme = FALSE,
 *   display_types = {"normal"}
 * )
 */
class SplideViews extends SplideViewsBase {

  /**
   * Overrides parent::buildOptionsForm().
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    $definition = $this->getDefinedFormScopes();
    $this->buildSettingsForm($form, $definition);
  }

  /**
   * Overrides StylePluginBase::render().
   */
  public function render() {
    $settings = $this->buildSettings();

    $elements = [];
    foreach ($this->renderGrouping($this->view->result, $settings['grouping']) as $rows) {
      $build = $this->buildElements($settings, $rows);

      // Extracts Blazy formatter settings if available.
      $this->checkBlazy($settings, $build, $rows);

      $build['#settings'] = $settings;

      $elements = $this->manager->build($build);
      unset($build);
    }
    return $elements;
  }

}
