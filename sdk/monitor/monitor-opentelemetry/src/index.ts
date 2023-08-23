// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureMonitorOpenTelemetryOptions, InstrumentationOptions } from "./shared/types";

import { InternalConfig } from "./shared/config";
import { MetricHandler } from "./metrics";
import { TraceHandler } from "./traces/handler";
import { Logger as InternalLogger } from "./shared/logging";
import { AzureMonitorOpenTelemetryOptions } from "./shared/types";
import { LogHandler } from "./logs";
import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatInstrumentation,
} from "./types";

let metricHandler: MetricHandler;
let traceHandler: TraceHandler;
let logHandler: LogHandler;

/**
 * Initializae Azure Monitor Distro
 * @param options Azure Monitor OpenTelemetry Options
 */
export function useAzureMonitor(options?: AzureMonitorOpenTelemetryOptions) {
  const config = new InternalConfig(options);
  _setStatsbeatFeatures(config);
  metricHandler = MetricHandler.getInstance(config);
  traceHandler = TraceHandler.getInstance(config, metricHandler);
  logHandler = LogHandler.getInstance(config, metricHandler);
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
  let instrumentationBitMap = 0;
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

  let featureBitMap = 0;
  featureBitMap |= StatsbeatFeature.DISTRO;

  try {
    process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
      instrumentation: instrumentationBitMap,
      feature: featureBitMap,
    });
  } catch (error) {
    InternalLogger.getInstance().error("Failed call to JSON.stringify.", error);
  }
}
