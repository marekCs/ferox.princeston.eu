<?php

namespace Drupal\csp\EventSubscriber;

use Drupal\Component\Plugin\Exception\PluginException;
use Drupal\Core\Asset\LibraryDependencyResolverInterface;
use Drupal\Core\Cache\CacheableResponseInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Render\AttachmentsInterface;
use Drupal\csp\Csp;
use Drupal\csp\CspEvents;
use Drupal\csp\Event\PolicyAlterEvent;
use Drupal\csp\LibraryPolicyBuilder;
use Drupal\csp\Nonce;
use Drupal\csp\ReportingHandlerPluginManager;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Class ResponseSubscriber.
 */
class ResponseCspSubscriber implements EventSubscriberInterface {

  /**
   * The Config Factory service.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The Library Policy Builder service.
   *
   * @var \Drupal\csp\LibraryPolicyBuilder
   */
  protected $libraryPolicyBuilder;

  /**
   * The Reporting Handler Plugin Manager service.
   *
   * @var \Drupal\csp\ReportingHandlerPluginManager
   */
  private $reportingHandlerPluginManager;

  /**
   * The Event Dispatcher service.
   *
   * @var \Symfony\Component\EventDispatcher\EventDispatcherInterface
   */
  private $eventDispatcher;

  /**
   * The Library Dependency Resolver service.
   *
   * @var \Drupal\Core\Asset\LibraryDependencyResolverInterface
   */
  private $libraryDependencyResolver;

  /**
   * The Nonce service.
   *
   * @var \Drupal\csp\Nonce
   */
  private $nonce;

  /**
   * Constructs a new ResponseSubscriber object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $configFactory
   *   Config Factory service.
   * @param \Drupal\csp\LibraryPolicyBuilder $libraryPolicyBuilder
   *   The Library Parser service.
   * @param \Drupal\csp\ReportingHandlerPluginManager $reportingHandlerPluginManager
   *   The Reporting Handler Plugin Manager service.
   * @param \Symfony\Component\EventDispatcher\EventDispatcherInterface $eventDispatcher
   *   The Event Dispatcher Service.
   * @param \Drupal\Core\Asset\LibraryDependencyResolverInterface|null $libraryDependencyResolver
   *   The Library Dependency Resolver service.
   * @param \Drupal\csp\Nonce|null $nonce
   *   The nonce service.
   */
  public function __construct(
    ConfigFactoryInterface $configFactory,
    LibraryPolicyBuilder $libraryPolicyBuilder,
    ReportingHandlerPluginManager $reportingHandlerPluginManager,
    EventDispatcherInterface $eventDispatcher,
    ?LibraryDependencyResolverInterface $libraryDependencyResolver = NULL,
    ?Nonce $nonce = NULL
  ) {
    $this->configFactory = $configFactory;
    $this->libraryPolicyBuilder = $libraryPolicyBuilder;
    $this->reportingHandlerPluginManager = $reportingHandlerPluginManager;
    $this->eventDispatcher = $eventDispatcher;
    if (empty($libraryDependencyResolver)) {
      @trigger_error("Omitting the LibraryDependencyResolver service is deprecated in csp:8.x-1.22 and will be required in csp:2.0.0. See https://www.drupal.org/project/csp/issues/3018679", E_USER_DEPRECATED);
      $libraryDependencyResolver = \Drupal::service('library.dependency_resolver');
    }
    $this->libraryDependencyResolver = $libraryDependencyResolver;
    if (empty($nonce)) {
      @trigger_error("Omitting the Nonce service is deprecated in csp:8.x-1.22 and will be required in csp:2.0.0. See https://www.drupal.org/project/csp/issues/3018679", E_USER_DEPRECATED);
      $nonce = \Drupal::service('csp.nonce');
    }
    $this->nonce = $nonce;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::RESPONSE] = ['onKernelResponse'];
    return $events;
  }

  /**
   * Add Content-Security-Policy header to response.
   *
   * @param \Symfony\Component\HttpKernel\Event\ResponseEvent $event
   *   The Response event.
   */
  public function onKernelResponse(ResponseEvent $event) {
    if (!$event->isMainRequest()) {
      return;
    }

    $cspConfig = $this->configFactory->get('csp.settings');
    $libraryDirectives = $this->libraryPolicyBuilder->getSources();

    $response = $event->getResponse();

    if ($response instanceof CacheableResponseInterface) {
      $response->getCacheableMetadata()
        ->addCacheTags(['config:csp.settings']);
    }

    $hasNonce = FALSE;
    foreach (['report-only', 'enforce'] as $policyType) {

      if (!$cspConfig->get($policyType . '.enable')) {
        continue;
      }

      $policy = new Csp();
      $policy->reportOnly($policyType == 'report-only');

      foreach (($cspConfig->get($policyType . '.directives') ?: []) as $directiveName => $directiveOptions) {

        if (Csp::DIRECTIVES[$directiveName] == Csp::DIRECTIVE_SCHEMA_BOOLEAN) {
          $policy->setDirective($directiveName, (bool) $directiveOptions);
          continue;
        }

        if (Csp::DIRECTIVES[$directiveName] === Csp::DIRECTIVE_SCHEMA_ALLOW_BLOCK) {
          if (!empty($directiveOptions)) {
            $policy->setDirective($directiveName, "'" . $directiveOptions . "'");
          }
          continue;
        }

        // This is a directive with a simple array of values.
        if (!isset($directiveOptions['base'])) {
          $policy->setDirective($directiveName, $directiveOptions);
          continue;
        }

        switch ($directiveOptions['base']) {
          case 'self':
            $policy->setDirective($directiveName, [Csp::POLICY_SELF]);
            break;

          case 'none':
            $policy->setDirective($directiveName, [Csp::POLICY_NONE]);
            break;

          case 'any':
            $policy->setDirective($directiveName, [Csp::POLICY_ANY]);
            break;

          default:
            // Initialize to an empty value so that any alter subscribers can
            // tell that this directive was enabled.
            $policy->setDirective($directiveName, []);
        }

        if (!empty($directiveOptions['flags'])) {
          $policy->appendDirective($directiveName, array_map(function ($value) {
            return "'" . $value . "'";
          }, $directiveOptions['flags']));
        }

        if (!empty($directiveOptions['sources'])) {
          $policy->appendDirective($directiveName, $directiveOptions['sources']);
        }

        if (isset($libraryDirectives[$directiveName])) {
          $policy->appendDirective($directiveName, $libraryDirectives[$directiveName]);
        }
      }

      $reportingPluginId = $cspConfig->get($policyType . '.reporting.plugin');
      if ($reportingPluginId) {
        $reportingOptions = $cspConfig->get($policyType . '.reporting.options') ?: [];
        $reportingOptions += [
          'type' => $policyType,
        ];
        try {
          $this->reportingHandlerPluginManager
            ->createInstance($reportingPluginId, $reportingOptions)
            ->alterPolicy($policy);
        }
        catch (PluginException $e) {
          watchdog_exception('csp', $e);
        }
      }

      $this->eventDispatcher->dispatch(
        new PolicyAlterEvent($policy, $response),
        CspEvents::POLICY_ALTER
      );

      if (($headerValue = $policy->getHeaderValue())) {
        $hasNonce = $hasNonce || ($this->nonce->hasValue() && str_contains($headerValue, $this->nonce->getSource()));
        $response->headers->set($policy->getHeaderName(), $headerValue);
      }
    }

    if ($hasNonce && $response instanceof AttachmentsInterface) {
      $libraries = $this->libraryDependencyResolver
        ->getLibrariesWithDependencies(
          $response->getAttachments()['library'] ?? []
        );
      if (in_array('csp/nonce', $libraries)) {
        $response->addAttachments([
          'drupalSettings' => [
            'csp' => [
              'nonce' => $this->nonce->getValue(),
            ],
          ],
        ]);
      }
    }
  }

}
