// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProxyTracerProvider, metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { NodeSDK, NodeSDKConfiguration } from "@opentelemetry/sdk-node";
import { InternalConfig } from "./shared/config";
import { MetricHandler } from "./metrics";
import { TraceHandler } from "./traces/handler";
import { Logger as InternalLogger } from "./shared/logging";
import { LogHandler } from "./logs";
import {
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
  BrowserSdkLoaderOptions,
  StatsbeatFeatures,
  StatsbeatInstrumentations,
} from "./types";
import { BrowserSdkLoader } from "./browserSdkLoader/browserSdkLoader";
import { setSdkPrefix } from "./metrics/quickpulse/utils";
import { SpanProcessor } from "@opentelemetry/sdk-trace-base";
import { LogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { getInstance } from "./utils/statsbeat";
import { patchOpenTelemetryInstrumentations } from "./utils/opentelemetryInstrumentationPatcher";
import { parseResourceDetectorsFromEnvVar } from "./utils/common";

export { AzureMonitorOpenTelemetryOptions, InstrumentationOptions, BrowserSdkLoaderOptions };

process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

let sdk: NodeSDK;
let browserSdkLoader: BrowserSdkLoader | undefined;

/**
 * Initialize Azure Monitor Distro
 * @param options Azure Monitor OpenTelemetry Options
 */
export function useAzureMonitor(options?: AzureMonitorOpenTelemetryOptions) {
  const config = new InternalConfig(options);
  patchOpenTelemetryInstrumentations();
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
  }
  getInstance().setStatsbeatFeatures(statsbeatInstrumentations, statsbeatFeatures);

  if (config.browserSdkLoaderOptions.enabled) {
    browserSdkLoader = new BrowserSdkLoader(config);
  }
  // Remove global providers in OpenTelemetry, these would be overriden if present
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

  // Initialize OpenTelemetry SDK
  const sdkConfig: Partial<NodeSDKConfiguration> = {
    autoDetectResources: true,
    metricReader: metricHandler.getMetricReader(),
    views: metricHandler.getViews(),
    instrumentations: instrumentations,
    logRecordProcessor: logHandler.getAzureLogRecordProcessor(),
    resource: config.resource,
    sampler: traceHandler.getSampler(),
    spanProcessors: [traceHandler.getAzureMonitorSpanProcessor()],
    resourceDetectors: resourceDetectorsList,
  };
  sdk = new NodeSDK(sdkConfig);
  setSdkPrefix();
  sdk.start();

  // TODO: Send processors as NodeSDK config once arrays are supported
  // https://github.com/open-telemetry/opentelemetry-js/issues/4451

  // Add extra SpanProcessors, MetricReaders and LogRecordProcessors
  let spanProcessors: SpanProcessor[] = options?.spanProcessors || [];
  // Add batch processor as the last one
  spanProcessors.push(traceHandler.getBatchSpanProcessor());

  // Add extra SpanProcessors, MetricReaders and LogRecordProcessors
  let logRecordProcessors: LogRecordProcessor[] = options?.logRecordProcessors || [];
  // Add batch processor as the last one
  logRecordProcessors.push(logHandler.getBatchLogRecordProcessor());

  try {
    const tracerProvider = (
      trace.getTracerProvider() as ProxyTracerProvider
    ).getDelegate() as NodeTracerProvider;
    spanProcessors.forEach((spanProcessor) => {
      tracerProvider.addSpanProcessor(spanProcessor);
    });
  } catch (error) {
    InternalLogger.getInstance().error("Failed to add SpanProcessors to TracerProvider.", error);
  }
  try {
    const logProvider = logs.getLoggerProvider() as LoggerProvider;
    logRecordProcessors.forEach((logRecordProcessor) => {
      logProvider.addLogRecordProcessor(logRecordProcessor);
    });
  } catch (error) {
    InternalLogger.getInstance().error(
      "Failed to add LogRecordProcessors to LoggerProvider.",
      error,
    );
  }
}

/**
 * Shutdown Azure Monitor Open Telemetry Distro
 * @see https://github.com/open-telemetry/opentelemetry-js/blob/0229434cb5a3179f63c021105f36270ae7897929/experimental/packages/opentelemetry-sdk-node/src/sdk.ts#L398
 */
export function shutdownAzureMonitor(): Promise<void> {
  browserSdkLoader?.dispose();
  return sdk?.shutdown();
}
