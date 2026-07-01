// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import type { NodeSDKConfiguration } from "@opentelemetry/sdk-node";
import { NodeSDK } from "@opentelemetry/sdk-node";
import type { MetricReader, ViewOptions } from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "./shared/config.js";
import { MetricHandler } from "./metrics/index.js";
import { TraceHandler } from "./traces/handler.js";
import { LogHandler } from "./logs/index.js";
import type {
  StatsbeatFeatures,
  StatsbeatInstrumentations,
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
  BrowserSdkLoaderOptions,
} from "./types.js";
import {
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  APPLICATIONINSIGHTS_SDKSTATS_DISABLED,
} from "./types.js";
import { BrowserSdkLoader } from "./browserSdkLoader/browserSdkLoader.js";
import { setSdkPrefix } from "./metrics/quickpulse/utils.js";
import type { SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { LogRecordProcessor } from "@opentelemetry/sdk-logs";
import { LoggerProvider } from "@opentelemetry/sdk-logs";
import { detectResources } from "@opentelemetry/resources";
import { getInstance } from "./utils/statsbeat.js";
import { patchOpenTelemetryInstrumentationEnable } from "./utils/opentelemetryInstrumentationPatcher.js";
import { ensureAzureSdkTracingBridge } from "./utils/azureSdkTracingBridge.js";
import { isFunctionApp, parseResourceDetectorsFromEnvVar } from "./utils/common.js";
import { Logger } from "./shared/logging/index.js";
import { AZURE_MONITOR_AUTO_ATTACH } from "./types.js";
import { SEMRESATTRS_K8S_CLUSTER_NAME } from "@opentelemetry/semantic-conventions";

/**
 * Semantic attribute for cloud resource ID, defined by \@opentelemetry/resource-detector-azure
 * @internal
 */
const CLOUD_RESOURCE_ID_ATTRIBUTE = "cloud.resource_id";

export type { AzureMonitorOpenTelemetryOptions, InstrumentationOptions, BrowserSdkLoaderOptions };
export { createLoggerConfigurator } from "@opentelemetry/sdk-logs";
export type { LoggerConfigurator, LoggerConfig, LoggerPattern } from "@opentelemetry/sdk-logs";

process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

let sdk: NodeSDK;
let loggerProvider: LoggerProvider | undefined;
let browserSdkLoader: BrowserSdkLoader | undefined;

/**
 * Check if auto-attach (autoinstrumentation) is enabled and warn about double instrumentation.
 */
function sendAttachWarning(): void {
  if (process.env[AZURE_MONITOR_AUTO_ATTACH] === "true" && !isFunctionApp()) {
    // TODO: When AKS attach is public, update this message with disablement instructions for AKS
    const message =
      "Distro detected that automatic instrumentation may have occurred. Only use autoinstrumentation if you " +
      "are not using manual instrumentation of OpenTelemetry in your code, such as with " +
      "@azure/monitor-opentelemetry or @azure/monitor-opentelemetry-exporter. For App Service resources, disable " +
      "autoinstrumentation in the Application Insights experience on your App Service resource or by setting " +
      "the ApplicationInsightsAgent_EXTENSION_VERSION app setting to 'disabled'.";
    // Surface in the log stream
    console.warn(message);
    // Also log via diagnostic logging
    Logger.getInstance().warn(message);
  }
}

/**
 * Initialize Azure Monitor Distro
 * @param options - Azure Monitor OpenTelemetry Options
 */
export function useAzureMonitor(options?: AzureMonitorOpenTelemetryOptions): void {
  const config = new InternalConfig(options);
  patchOpenTelemetryInstrumentationEnable();
  const statsbeatInstrumentations: StatsbeatInstrumentations = {
    // Instrumentations
    azureSdk: config.instrumentationOptions?.azureSdk?.enabled,
    mongoDb: config.instrumentationOptions?.mongoDb?.enabled,
    mySql: config.instrumentationOptions?.mySql?.enabled,
    postgreSql: config.instrumentationOptions?.postgreSql?.enabled,
    redis: config.instrumentationOptions?.redis?.enabled,
    bunyan: config.instrumentationOptions?.bunyan?.enabled,
    winston: config.instrumentationOptions?.winston?.enabled,
  };
  // Check if the AKS resource detector successfully populated specific resource attributes
  // (k8s.cluster.name or cloud.resource_id) beyond the basic cloud.platform/cloud.provider
  // Derive from config.resource.attributes which already includes the AKS detector results
  const resourceAttributes = config.resource.attributes;
  const aksResourceDetected =
    SEMRESATTRS_K8S_CLUSTER_NAME in resourceAttributes ||
    CLOUD_RESOURCE_ID_ATTRIBUTE in resourceAttributes;
  const statsbeatFeatures: StatsbeatFeatures = {
    browserSdkLoader: config.browserSdkLoaderOptions.enabled,
    aadHandling: !!config.azureMonitorExporterOptions?.credential,
    diskRetry: !config.azureMonitorExporterOptions?.disableOfflineStorage,
    customerSdkStats: process.env[APPLICATIONINSIGHTS_SDKSTATS_DISABLED]?.toLowerCase() === "true",
    aksResourceDetectorPopulation: aksResourceDetected,
  };
  getInstance().setStatsbeatFeatures(statsbeatInstrumentations, statsbeatFeatures);

  if (config.browserSdkLoaderOptions.enabled) {
    browserSdkLoader = new BrowserSdkLoader(config);
  }
  // Remove global providers in OpenTelemetry, these would be overridden if present
  metrics.disable();
  trace.disable();
  logs.disable();

  // Clear the entire OpenTelemetry API global state to avoid version conflicts.
  // The disable() calls above remove individual providers but leave the `version` field
  // on the global object intact. If a different version of @opentelemetry/api was loaded
  // first (e.g. by a VS Code extension host or another extension), the stale version
  // causes registerGlobal() in sdk.start() to fail with "All API registration versions
  // must match", resulting in Noop providers. Deleting the global object forces
  // registerGlobal() to create a fresh one with the correct version.
  const globalOpentelemetryApiKey = Symbol.for("opentelemetry.js.api.1");
  Reflect.deleteProperty(globalThis, globalOpentelemetryApiKey);

  // Create internal handlers
  const metricHandler = new MetricHandler(config);
  const traceHandler = new TraceHandler(config, metricHandler);
  const logHandler = new LogHandler(config, metricHandler);

  const instrumentations = traceHandler
    .getInstrumentations()
    .concat(logHandler.getInstrumentations());

  const resourceDetectorsList = parseResourceDetectorsFromEnvVar();

  // Add extra SpanProcessors, and logRecordProcessors from user configuration
  const spanProcessors: SpanProcessor[] = options?.spanProcessors || [];
  const logRecordProcessors: LogRecordProcessor[] = options?.logRecordProcessors || [];
  const customViews: ViewOptions[] = options?.views || [];

  // Prepare metric readers - always include Azure Monitor
  const metricReaders: MetricReader[] = [
    metricHandler.getMetricReader(),
    ...(options?.metricReaders || []),
  ];

  const views: ViewOptions[] = metricHandler.getViews().concat(customViews);

  // Build the LoggerProvider in the distro rather than letting NodeSDK own it.
  // NodeSDK does not forward upstream logger configuration (e.g. severity-based
  // filtering via loggerConfigurator), so we construct the provider ourselves and
  // register it globally before sdk.start(). NodeSDK is then given an empty
  // logRecordProcessors array, so the (empty) provider it builds fails to register
  // (setGlobalLoggerProvider is a no-op once a provider is set) and stays inert.
  let logResource = config.resource;
  if (resourceDetectorsList.length > 0) {
    logResource = logResource.merge(detectResources({ detectors: resourceDetectorsList }));
  }
  loggerProvider = new LoggerProvider({
    resource: logResource,
    processors: [
      logHandler.getAzureLogRecordProcessor(),
      ...logRecordProcessors,
      logHandler.getBatchLogRecordProcessor(),
    ],
    loggerConfigurator: config.loggerConfigurator,
  });
  logs.setGlobalLoggerProvider(loggerProvider);

  // Initialize OpenTelemetry SDK
  const sdkConfig: Partial<NodeSDKConfiguration> = {
    autoDetectResources: true,
    metricReaders: metricReaders,
    views,
    instrumentations: instrumentations,
    logRecordProcessors: [],
    resource: config.resource,
    sampler: traceHandler.getSampler(),
    spanProcessors: [
      traceHandler.getAzureMonitorSpanProcessor(),
      ...spanProcessors,
      traceHandler.getBatchSpanProcessor(),
    ],
    resourceDetectors: resourceDetectorsList,
  };
  sdk = new NodeSDK(sdkConfig);
  setSdkPrefix();
  sendAttachWarning();
  sdk.start();

  // Eagerly install the Azure SDK tracing bridge in case @azure/core-tracing
  // was loaded before useAzureMonitor() (the RITM hook misses it otherwise).
  ensureAzureSdkTracingBridge();
}

/**
 * Shutdown Azure Monitor Open Telemetry Distro
 * @see https://github.com/open-telemetry/opentelemetry-js/blob/0229434cb5a3179f63c021105f36270ae7897929/experimental/packages/opentelemetry-sdk-node/src/sdk.ts#L398
 */
export function shutdownAzureMonitor(): Promise<void> {
  browserSdkLoader?.dispose();
  const provider = loggerProvider;
  loggerProvider = undefined;
  return Promise.all([sdk?.shutdown(), provider?.shutdown()]).then(() => undefined);
}

/**
 * Get the internal SDK instance for testing purposes
 * @internal
 */
// eslint-disable-next-line no-underscore-dangle
export function _getSdkInstance(): NodeSDK | undefined {
  return sdk;
}
