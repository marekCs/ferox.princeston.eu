<?php

namespace Drupal\splide\Plugin\Field\FieldFormatter;

use Drupal\blazy\Plugin\Field\FieldFormatter\BlazyFormatterTrait;
use Drupal\Core\Field\FieldDefinitionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * A Trait common for splide formatters.
 */
trait SplideFormatterTrait {

  use BlazyFormatterTrait {
    injectServices as blazyInjectServices;
    getCommonFieldDefinition as blazyCommonFieldDefinition;
  }

  /**
   * Returns the splide admin service shortcut.
   */
  public function admin() {
    return \Drupal::service('splide.admin');
  }

  /**
   * Injects DI services.
   */
  protected static function injectServices($instance, ContainerInterface $container, $type = '') {
    $instance = static::blazyInjectServices($instance, $container, $type);
    $instance->formatter = $instance->blazyManager = $container->get('splide.formatter');
    $instance->manager = $container->get('splide.manager');

    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public static function isApplicable(FieldDefinitionInterface $field_definition) {
    return $field_definition->getFieldStorageDefinition()->isMultiple();
  }

}
