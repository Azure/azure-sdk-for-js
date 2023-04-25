// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { InstrumentationConfig } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "0.0.0-beta.0";
export const DEFAULT_ROLE_NAME = "Web";
process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

/**
 * Azure Monitor OpenTelemetry Configuration interface
 */
export interface IConfig {
  /** Azure Monitor Exporter Configuration */
  azureMonitorExporterConfig?: AzureMonitorExporterOptions;
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  samplingRatio?: number;
  /**
   * Sets the state of performance tracking (enabled by default)
   * if true performance counters will be collected every second and sent to Azure Monitor
   */
  enableAutoCollectPerformance?: boolean;
  /**
   * Sets the state of standard metrics tracking (enabled by default)
   * if true Standard metrics will be collected every minute and sent to Azure Monitor
   */
  enableAutoCollectStandardMetrics?: boolean;
  /**
   * Sets the state of native metrics tracking (disabled by default)
   * if true and applicationinsights-native-metrics is installed, native metrics will be collected every minute and sent to Azure Monitor
   */
  enableAutoCollectNativeMetrics?: boolean;
  /**
   * OpenTelemetry Instrumentations configuration included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  instrumentations?: IInstrumentationsConfig;
  /** OpenTelemetry Resource */
  resource?: Resource;
}

/**
 * OpenTelemetry Instrumentations Configuration interface
 */
export interface IInstrumentationsConfig {
  /** Azure SDK Instrumentation Config */
  azureSdk: InstrumentationConfig;
  /** HTTP Instrumentation Config */
  http: InstrumentationConfig;
  /** MongoDB Instrumentation Config */
  mongoDb: InstrumentationConfig;
  /** MySQL Instrumentation Config */
  mySql: InstrumentationConfig;
  /** PostgreSql Instrumentation Config */
  postgreSql: InstrumentationConfig;
  /** Redis Instrumentation Config */
  redis: InstrumentationConfig;
  /** Redis4 Instrumentation Config */
  redis4: InstrumentationConfig;
}
