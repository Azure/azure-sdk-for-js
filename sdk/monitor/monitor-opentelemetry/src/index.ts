// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import type { NodeSDKConfiguration } from "@opentelemetry/sdk-node";
import { NodeSDK } from "@opentelemetry/sdk-node";
import type { MetricReader } from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "./shared/config.js";
import { MetricHandler } from "./metrics/index.js";
import { TraceHandler } from "./traces/handler.js";
import { LogHandler } from "./logs/index.js";
import type { StatsbeatFeatures, StatsbeatInstrumentations } from "./types.js";
import {
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  AzureMonitorOpenTelemetryOptions,
  APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW,
  InstrumentationOptions,
  BrowserSdkLoaderOptions,
} from "./types.js";
import { BrowserSdkLoader } from "./browserSdkLoader/browserSdkLoader.js";
import { setSdkPrefix } from "./metrics/quickpulse/utils.js";
import type { SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { LogRecordProcessor } from "@opentelemetry/sdk-logs";
import { getInstance } from "./utils/statsbeat.js";
import { patchOpenTelemetryInstrumentationEnable } from "./utils/opentelemetryInstrumentationPatcher.js";
import { parseResourceDetectorsFromEnvVar } from "./utils/common.js";

export { AzureMonitorOpenTelemetryOptions, InstrumentationOptions, BrowserSdkLoaderOptions };

process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

let sdk: NodeSDK;
let browserSdkLoader: BrowserSdkLoader | undefined;

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
  const statsbeatFeatures: StatsbeatFeatures = {
    browserSdkLoader: config.browserSdkLoaderOptions.enabled,
    aadHandling: !!config.azureMonitorExporterOptions?.credential,
    diskRetry: !config.azureMonitorExporterOptions?.disableOfflineStorage,
    rateLimitedSampler: !!config.tracesPerSecond,
    customerSdkStats: process.env[APPLICATIONINSIGHTS_SDKSTATS_ENABLED_PREVIEW] === "True",
  };
  getInstance().setStatsbeatFeatures(statsbeatInstrumentations, statsbeatFeatures);

  if (config.browserSdkLoaderOptions.enabled) {
    browserSdkLoader = new BrowserSdkLoader(config);
  }
  // Remove global providers in OpenTelemetry, these would be overridden if present
  metrics.disable();
  trace.disable();
  logs.disable();

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

  // Prepare metric readers - always include Azure Monitor
  const metricReaders: MetricReader[] = [
    metricHandler.getMetricReader(),
    ...(options?.metricReaders || []),
  ];

  // Initialize OpenTelemetry SDK
  const sdkConfig: Partial<NodeSDKConfiguration> = {
    autoDetectResources: true,
    metricReaders: metricReaders,
    views: metricHandler.getViews(),
    instrumentations: instrumentations,
    logRecordProcessors: [
      logHandler.getAzureLogRecordProcessor(),
      ...logRecordProcessors,
      logHandler.getBatchLogRecordProcessor(),
    ],
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
  sdk.start();
}

/**
 * Shutdown Azure Monitor Open Telemetry Distro
 * @see https://github.com/open-telemetry/opentelemetry-js/blob/0229434cb5a3179f63c021105f36270ae7897929/experimental/packages/opentelemetry-sdk-node/src/sdk.ts#L398
 */
export function shutdownAzureMonitor(): Promise<void> {
  browserSdkLoader?.dispose();
  return sdk?.shutdown();
}

/**
 * Get the internal SDK instance for testing purposes
 * @internal
 */
// eslint-disable-next-line no-underscore-dangle
export function _getSdkInstance(): NodeSDK | undefined {
  return sdk;
}
