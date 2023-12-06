// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { NodeSDK, NodeSDKConfiguration } from "@opentelemetry/sdk-node";
import { InternalConfig } from "./shared/config";
import { MetricHandler } from "./metrics";
import { TraceHandler } from "./traces/handler";
import { Logger as InternalLogger } from "./shared/logging";
import { AzureMonitorOpenTelemetryOptions } from "./shared/types";
import { LogHandler } from "./logs";
import {
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatInstrumentation,
} from "./types";
import { WebSnippet } from "./webSnippet/webSnippet";

export {
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
  IWebInstrumentationConfig,
  ApplicationInsightsWebInstrumentationOptions
} from "./shared/types";

process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

let sdk: NodeSDK;
let webSnippet: WebSnippet | undefined;

/**
 * Initialize Azure Monitor Distro
 * @param options Azure Monitor OpenTelemetry Options
 */
export function useAzureMonitor(options?: AzureMonitorOpenTelemetryOptions) {
  const config = new InternalConfig(options);

  if (config.applicationInsightsWebInstrumentationOptions.enableWebInstrumentation) {
    webSnippet = new WebSnippet(config);
  }
  _setStatsbeatFeatures(config, webSnippet);
  // Remove global providers in OpenTelemetry, these would be overriden if present
  metrics.disable();
  trace.disable();
  logs.disable();

  // Create internal handlers
  const metricHandler = new MetricHandler(config);
  const traceHandler = new TraceHandler(config, metricHandler);
  const logHandler = new LogHandler(config, metricHandler);

  // Initialize OpenTelemetry SDK
  const sdkConfig: Partial<NodeSDKConfiguration> = {
    autoDetectResources: true,
    logRecordProcessor: logHandler.getLogRecordProcessor(),
    metricReader: metricHandler.getMetricReader(),
    views: metricHandler.getViews(),
    instrumentations: traceHandler.getInstrumentations(),
    resource: config.resource,
    sampler: traceHandler.getSampler(),
    spanProcessor: traceHandler.getSpanProcessor(),
  };
  sdk = new NodeSDK(sdkConfig);
  sdk.start();
  // Add extra SpanProcessors, MetricReaders and LogRecordProcessors
  traceHandler.start();
  logHandler.start();
}

/**
 * Shutdown Azure Monitor Distro
 */
export function shutdownAzureMonitor() {
  sdk?.shutdown();
  webSnippet?.dispose();
}

function _setStatsbeatFeatures(config: InternalConfig, webSnippet?: WebSnippet) {
  let instrumentationBitMap = StatsbeatInstrumentation.NONE;
  if (config.instrumentationOptions?.azureSdk?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.AZURE_CORE_TRACING;
  }
  if (config.instrumentationOptions?.mongoDb?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.MONGODB;
  }
  if (config.instrumentationOptions?.mySql?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.MYSQL;
  }
  if (config.instrumentationOptions?.postgreSql?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.POSTGRES;
  }
  if (config.instrumentationOptions?.redis?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.REDIS;
  }

  let featureBitMap = StatsbeatFeature.NONE;
  featureBitMap |= StatsbeatFeature.DISTRO;

  if (webSnippet?.isInitialized()) {
    featureBitMap |= StatsbeatFeature.WEB_SNIPPET;
  }

  try {
    const currentFeaturesBitMap = Number(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]);
    if (!isNaN(currentFeaturesBitMap)) {
      featureBitMap |= currentFeaturesBitMap;
    }
    process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
      instrumentation: instrumentationBitMap,
      feature: featureBitMap,
    });
  } catch (error) {
    InternalLogger.getInstance().error("Failed call to JSON.stringify.", error);
  }
}
