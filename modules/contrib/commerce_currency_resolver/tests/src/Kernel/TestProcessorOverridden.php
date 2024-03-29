<?php

namespace Drupal\Tests\commerce_currency_resolver\Kernel;

use Drupal\commerce_currency_resolver\CurrencyOrderProcessor;

/**
 * Processor used by tests.
 */
class TestProcessorOverridden extends CurrencyOrderProcessor {

  /**
   * We override this function since the test is actually run as PHP cli.
   */
  protected function isPhpCli() {
    return FALSE;
  }

}
