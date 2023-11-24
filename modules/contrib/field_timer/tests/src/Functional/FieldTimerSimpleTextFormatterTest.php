<?php

namespace Drupal\Tests\field_timer\Functional;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Datetime\Entity\DateFormat;
use Drupal\datetime\Plugin\Field\FieldType\DateTimeItemInterface;
use Drupal\field_timer\Plugin\Field\FieldFormatter\FieldTimerSimpleTextFormatter;
use Drupal\Tests\datetime\Functional\DateTimeTimeAgoFormatterTest;

class FieldTimerSimpleTextFormatterTest extends DateTimeTimeAgoFormatterTest {

  protected static $modules = ['field_timer', 'entity_test', 'field_ui'];

  /**
   * The date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatterInterface
   */
  protected $dateFormatter;

  protected function setUp(): void {
    $this->displayOptions = [
      'type' => 'field_timer_simple_text',
      'label' => 'hidden',
    ];

    parent::setUp();

    $this->dateFormatter = $this->container->get('date.formatter');
  }

  /**
   * Tests the formatter settings.
   */
  public function testSettings() {
    $fieldName = 'field_datetime'; // @see \Drupal\Tests\datetime\Functional\DateTimeTimeAgoFormatterTest::setUp

    $this->drupalGet('entity_test/structure/entity_test/display');

    $edit = [
      'fields[' . $fieldName . '][region]' => 'content',
      'fields[' . $fieldName . '][type]' => 'field_timer_simple_text',
    ];
    $this->submitForm($edit, 'Save');

    $this->submitForm([], $fieldName . '_settings_edit');
    $type = FieldTimerSimpleTextFormatter::TYPE_TIMER;
    $edit = [
      'fields[' . $fieldName . '][settings_edit_form][settings][future_format]' => 'ends in @interval',
      'fields[' . $fieldName . '][settings_edit_form][settings][past_format]' => 'started @interval ago',
      'fields[' . $fieldName . '][settings_edit_form][settings][granularity]' => 1,
      'fields[' . $fieldName . '][settings_edit_form][settings][type]' => $type,
    ];
    $options = $this->getOptions('fields[' . $fieldName . '][settings_edit_form][settings][type]');
    $this->submitForm($edit, 'Update');
    $this->submitForm([], 'Save');

    $this->assertSession()->pageTextContains('ends in 1 year');
    $this->assertSession()->pageTextContains('started 1 year ago');
    $this->assertSession()->pageTextContains('Type: ' . $options[$type]);
  }

  public function testTimer() {
    $fieldName = 'field_datetime'; // @see \Drupal\Tests\datetime\Functional\DateTimeTimeAgoFormatterTest::setUp
    $pastFormat = 'started @interval ago';
    $granularity = 3;

    // First configure formatter to display field as a timer.
    $this->drupalGet('entity_test/structure/entity_test/display/full');
    $edit = [
      'fields[' . $fieldName . '][region]' => 'content',
      'fields[' . $fieldName . '][type]' => 'field_timer_simple_text',
    ];
    $this->submitForm($edit, 'Save');

    $this->submitForm([], $fieldName . '_settings_edit');
    $edit = [
      'fields[' . $fieldName . '][settings_edit_form][settings][past_format]' => $pastFormat,
      'fields[' . $fieldName . '][settings_edit_form][settings][granularity]' => $granularity,
      'fields[' . $fieldName . '][settings_edit_form][settings][type]' => FieldTimerSimpleTextFormatter::TYPE_TIMER,
    ];
    $this->submitForm($edit, 'Update');
    $this->submitForm([], 'Save');

    // Create an entity with datetime field.
    $this->drupalGet('entity_test/add');
    $value = '2019-09-01 12:11:03';
    $date = new DrupalDateTime($value, DateTimeItemInterface::STORAGE_TIMEZONE);
    $date_format = DateFormat::load('html_date')->getPattern();
    $time_format = DateFormat::load('html_time')->getPattern();

    $edit = [
      $fieldName . '[0][value][date]' => $date->format($date_format),
      $fieldName . '[0][value][time]' => $date->format($time_format),
    ];
    $this->submitForm($edit, 'Save');

    // Make sure entity was created.
    preg_match('|entity_test/manage/(\d+)|', $this->getUrl(), $match);
    $id = $match[1];
    $this->assertSession()->pageTextContains('entity_test ' . $id . ' has been created.');

    // Check formatter's output.
    $expected = new FormattableMarkup($pastFormat, [
      '@interval' => $this->dateFormatter->formatTimeDiffSince($date->getTimestamp(), ['granularity' => $granularity]),
    ]);
    $this->drupalGet('entity_test/' . $id);
    $this->assertSession()
      ->pageTextContains((string) $expected);
  }

  public function testCountdown() {
    $fieldName = 'field_datetime'; // @see \Drupal\Tests\datetime\Functional\DateTimeTimeAgoFormatterTest::setUp
    $futureFormat = 'ends in @interval ago';
    $granularity = 4;

    // First configure formatter to display field as a countdown.
    $this->drupalGet('entity_test/structure/entity_test/display/full');
    $edit = [
      'fields[' . $fieldName . '][region]' => 'content',
      'fields[' . $fieldName . '][type]' => 'field_timer_simple_text',
    ];
    $this->submitForm($edit, 'Save');

    $this->submitForm([], $fieldName . '_settings_edit');
    $edit = [
      'fields[' . $fieldName . '][settings_edit_form][settings][future_format]' => $futureFormat,
      'fields[' . $fieldName . '][settings_edit_form][settings][granularity]' => $granularity,
      'fields[' . $fieldName . '][settings_edit_form][settings][type]' => FieldTimerSimpleTextFormatter::TYPE_COUNTDOWN,
    ];
    $this->submitForm($edit, 'Update');
    $this->submitForm([], 'Save');

    // Create an entity with datetime field.
    $this->drupalGet('entity_test/add');
    $value = '2119-09-01 12:11:03';
    $date = new DrupalDateTime($value, DateTimeItemInterface::STORAGE_TIMEZONE);
    $date_format = DateFormat::load('html_date')->getPattern();
    $time_format = DateFormat::load('html_time')->getPattern();

    $edit = [
      $fieldName . '[0][value][date]' => $date->format($date_format),
      $fieldName . '[0][value][time]' => $date->format($time_format),
    ];
    $this->submitForm($edit, 'Save');

    // Make sure entity was created.
    preg_match('|entity_test/manage/(\d+)|', $this->getUrl(), $match);
    $id = $match[1];
    $this->assertSession()->pageTextContains('entity_test ' . $id . ' has been created.');

    // Check formatter's output.
    $expected = new FormattableMarkup($futureFormat, [
      '@interval' => $this->dateFormatter->formatTimeDiffUntil($date->getTimestamp(), ['granularity' => $granularity]),
    ]);
    $this->drupalGet('entity_test/' . $id);
    $this->assertSession()
      ->pageTextContains((string) $expected);
  }

}
