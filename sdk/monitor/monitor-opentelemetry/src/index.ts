// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
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

export { AzureMonitorOpenTelemetryOptions, InstrumentationOptions } from "./shared/types";

process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

let metricHandler: MetricHandler;
let traceHandler: TraceHandler;
let logHandler: LogHandler;

/**
 * Initialize Azure Monitor Distro
 * @param options Azure Monitor OpenTelemetry Options
 */
export function useAzureMonitor(options?: AzureMonitorOpenTelemetryOptions) {
  const config = new InternalConfig(options);
  _setStatsbeatFeatures(config);
  // Remove global providers in OpenTelemetry, these would be overriden if present
  metrics.disable();
  trace.disable();
  logs.disable();
  // Create internal handlers
  metricHandler = new MetricHandler(config);
  traceHandler = new TraceHandler(config, metricHandler);
  logHandler = new LogHandler(config, metricHandler);
}

/**
 * Shutdown Azure Monitor Distro
 */
export function shutdownAzureMonitor() {
  metricHandler.shutdown();
  traceHandler.shutdown();
  logHandler.shutdown();
}

function _setStatsbeatFeatures(config: InternalConfig) {
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
