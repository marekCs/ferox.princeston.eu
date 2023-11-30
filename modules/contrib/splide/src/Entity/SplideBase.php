<?php

namespace Drupal\splide\Entity;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Config\Entity\ConfigEntityBase;

/**
 * Defines the Splide configuration entity.
 *
 * @todo extends BlazyConfigEntityBase post blazy:2.17.
 */
abstract class SplideBase extends ConfigEntityBase implements SplideBaseInterface {

  /**
   * The legacy CTools ID for the configurable optionset.
   *
   * @var string
   */
  protected $name;

  /**
   * The human-readable name for the optionset.
   *
   * @var string
   */
  protected $label;

  /**
   * The weight to re-arrange the order of splide optionsets.
   *
   * @var int
   */
  protected $weight = 0;

  /**
   * The plugin instance options.
   *
   * @var array
   */
  protected $options = [];

  /**
   * Overrides Drupal\Core\Entity\Entity::id().
   */
  public function id() {
    return $this->name;
  }

  /**
   * {@inheritdoc}
   */
  public function getOptions($group = NULL, $property = NULL) {
    if ($group) {
      if (is_array($group)) {
        return NestedArray::getValue($this->options, (array) $group);
      }
      elseif (isset($property) && isset($this->options[$group])) {
        return $this->options[$group][$property] ?? NULL;
      }
      return $this->options[$group] ?? NULL;
    }

    return $this->options;
  }

  /**
   * {@inheritdoc}
   */
  public function getSettings($ansich = FALSE) {
    if ($ansich && isset($this->options['settings'])) {
      return $this->options['settings'];
    }

    // With the Optimized options, all defaults are cleaned out, merge em.
    return isset($this->options['settings']) ? array_merge(self::defaultSettings(), $this->options['settings']) : self::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function setSettings(array $settings = []) {
    $this->options['settings'] = $settings;
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getSetting($name, $default = NULL) {
    return $this->getSettings()[$name] ?? $default;
  }

  /**
   * {@inheritdoc}
   */
  public function setSetting($name, $value) {
    $this->options['settings'][$name] = $value;
    return $this;
  }

  /**
   * Returns available splide default options under group 'settings'.
   *
   * @param string $group
   *   The name of group: settings, breakpoints.
   *
   * @return array
   *   The default settings under options.
   */
  public static function defaultSettings($group = 'settings'): array {
    return self::load('default')->options[$group] ?? [];
  }

  /**
   * Load the optionset with a fallback.
   *
   * @param string $id
   *   The optionset name.
   *
   * @return \Drupal\splide\Entity\Splide
   *   The optionset object.
   */
  public static function loadSafely($id): Splide {
    $optionset = self::load($id);

    // Ensures deleted optionset while being used doesn't screw up.
    return empty($optionset) ? self::load('default') : $optionset;
  }

  /**
   * If optionset does not exist, create one.
   *
   * @param array $build
   *   The build array.
   * @param string $name
   *   The optionset name.
   *
   * @return \Drupal\splide\Entity\Splide
   *   The optionset object.
   */
  public static function verifyOptionset(array &$build, $name): Splide {
    // The element is normally present at template_preprocess, not builders.
    $key = isset($build['element']) ? 'optionset' : '#optionset';
    if (empty($build[$key])) {
      $build[$key] = self::loadSafely($name);
    }
    // Also returns it for convenient.
    return $build[$key];
  }

  /**
   * Load the optionset with a fallback.
   *
   * @todo deprecated in splide:1.0.7 and is removed from splide:2.0.0.
   *   Use self::loadSafely() instead.
   * @see https://www.drupal.org/node/3103018
   */
  public static function loadWithFallback($id) {
    return self::loadSafely($id);
  }

}
