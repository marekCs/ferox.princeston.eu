<?php

namespace Drupal\votingapi_widgets\Plugin\Field\FieldType;

use Drupal\Component\Utility\Random;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\votingapi\Entity\VoteType;

/**
 * Plugin implementation of the 'voting_api_field' field type.
 *
 * @FieldType(
 *   id = "voting_api_field",
 *   label = @Translation("Voting api field"),
 *   description = @Translation("My Field Type"),
 *   default_widget = "voting_api_widget",
 *   default_formatter = "voting_api_formatter"
 * )
 */
class VotingApiField extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultStorageSettings() {
    return [
      'vote_plugin' => '',
      'vote_type' => '',
      'status' => '',
    ] + parent::defaultStorageSettings();
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultFieldSettings() {
    return [
      'result_function' => 'vote_average',
      'widget_format' => 'fivestar',
      'anonymous_window' => -2,
      'user_window' => -2,
    ] + parent::defaultFieldSettings();
  }

  /**
   * {@inheritdoc}
   */
  public static function mainPropertyName() {
    return 'status';
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    // Prevent early t() calls by using the TranslatableMarkup.
    $properties['status'] = DataDefinition::create('integer')
      ->setLabel(t('Vote status'))
      ->setRequired(TRUE);

    $properties['value'] = DataDefinition::create('any')
      ->setLabel(t('Vote initial'))
      ->setRequired(FALSE);

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'status' => [
          'description' => 'Whether votes are allowed on this entity: 0 = no, 1 = closed (read only), 2 = open (read/write).',
          'type' => 'int',
          'default' => 0,
        ],
      ],
      'indexes' => [],
      'foreign keys' => [],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function generateSampleValue(FieldDefinitionInterface $field_definition) {
    $random = new Random();
    $values['status'] = $random->word(mt_rand(0, 1));
    return $values;
  }

  /**
   * {@inheritdoc}
   */
  public function storageSettingsForm(array &$form, FormStateInterface $form_state, $has_data) {
    $element = [];

    // @todo Inject entity storage once typed-data supports container injection.
    //   See https://www.drupal.org/node/2053415 for more details.
    $vote_plugins = \Drupal::service('plugin.manager.voting_api_widget.processor')->getDefinitions();
    $vote_options = [];

    foreach ($vote_plugins as $vote_plugin) {
      $vote_options[$vote_plugin['id']] = $vote_plugin['label'];
    }

    $vote_types = VoteType::loadMultiple();
    $options = [];
    foreach ($vote_types as $vote_type) {
      $options[$vote_type->id()] = $vote_type->label();
    }
    $element['vote_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Vote type'),
      '#options' => $options,
      '#required' => TRUE,
      '#default_value' => $this->getSetting('vote_type'),
      '#disabled' => $has_data,
    ];

    $element['vote_plugin'] = [
      '#type' => 'select',
      '#title' => $this->t('Vote plugin'),
      '#options' => $vote_options,
      '#required' => TRUE,
      '#default_value' => $this->getSetting('vote_plugin'),
      '#disabled' => $has_data,
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function fieldSettingsForm(array $form, FormStateInterface $form_state) {
    $dateFormatter = \Drupal::service('date.formatter');
    $form = parent::fieldSettingsForm($form, $form_state);

    $unit_options = [
      300,
      900,
      1800,
      3600,
      10800,
      21600,
      32400,
      43200,
      86400,
      172800,
      345600,
      604800,
    ];

    $unit_options_form = [];
    foreach ($unit_options as $option) {
      $unit_options_form[$option] = $dateFormatter->formatInterval($option);
    }

    $unit_options_form[0] = $this->t('Immediately');
    $unit_options_form[-1] = $this->t('Never');
    $unit_options_form[-2] = $this->t('Votingapi default');

    $form['anonymous_window'] = [
      '#type' => 'select',
      '#title' => $this->t('Anonymous vote rollover'),
      '#description' => $this->t("The amount of time that must pass before two anonymous votes from the same computer are considered unique. Setting this to never will eliminate most double-voting, but will make it impossible for multiple anonymous on the same computer (like internet cafe customers) from casting votes."),
      '#options' => $unit_options_form,
      '#default_value' => $this->getSetting('anonymous_window'),
    ];

    $form['user_window'] = [
      '#type' => 'select',
      '#title' => $this->t('Registered user vote rollover'),
      '#description' => $this->t("The amount of time that must pass before two registered user votes from the same user ID are considered unique. Setting this to never will eliminate most double-voting for registered users."),
      '#options' => $unit_options_form,
      '#default_value' => $this->getSetting('user_window'),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function postSave($update) {
    $entity = $this->getEntity();
    $field_name = $this->getFieldDefinition()->getName();
    $vote_type = $this->getFieldDefinition()->getSetting('vote_type');
    $plugin = $this->getFieldDefinition()->getSetting('vote_plugin');
    /** @var \Drupal\votingapi_widgets\Plugin\VotingApiWidgetBase $plugin */
    $plugin = \Drupal::service('plugin.manager.voting_api_widget.processor')
      ->createInstance($plugin);

    $vote_value = $entity->{$field_name}->value;
    if (!empty($vote_value)) {
      $vote = $plugin->getEntityForVoting(
        $entity->getEntityTypeId(),
        $entity->bundle(),
        $entity->id(),
        $vote_type,
        $field_name
      );
      $vote->setValue($vote_value);
      $vote->save();
    }
  }

}
