// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { InstrumentationConfig } from "@opentelemetry/instrumentation";
import { OTLPExporterNodeConfigBase } from "@opentelemetry/otlp-exporter-base";
import { Resource } from "@opentelemetry/resources";

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.0.0-beta.0";
export const DEFAULT_ROLE_NAME = "Web";
process.env["AZURE_MONITOR_DISTRO_VERSION"] = AZURE_MONITOR_OPENTELEMETRY_VERSION;

/**
 * Azure Monitor OpenTelemetry Options
 */
export interface AzureMonitorOpenTelemetryOptions {
  /** Azure Monitor Exporter Configuration */
  azureMonitorExporterConfig?: AzureMonitorExporterOptions;
  /** OTLP Trace Exporter Configuration */
  otlpTraceExporterConfig?: OTLPExporterConfig;
  /** OTLP Metric Exporter Configuration */
  otlpMetricExporterConfig?: OTLPExporterConfig;
  /** OTLP Log Exporter Configuration */
  otlpLogExporterConfig?: OTLPExporterConfig;
  /** OpenTelemetry Resource */
  resource?: Resource;
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
   * OpenTelemetry Instrumentations options included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  instrumentationOptions?: InstrumentationOptions;
}

/**
 * OTLP Exporter Options
 */
export interface OTLPExporterConfig extends OTLPExporterNodeConfigBase {
  /** Enable/Disable OTLP Exporter */
  enabled?: boolean;
}

/**
 * OpenTelemetry Instrumentations Configuration interface
 */
export interface InstrumentationOptions {
  /** Azure SDK Instrumentation Config */
  azureSdk?: InstrumentationConfig;
  /** HTTP Instrumentation Config */
  http?: InstrumentationConfig;
  /** MongoDB Instrumentation Config */
  mongoDb?: InstrumentationConfig;
  /** MySQL Instrumentation Config */
  mySql?: InstrumentationConfig;
  /** PostgreSql Instrumentation Config */
  postgreSql?: InstrumentationConfig;
  /** Redis Instrumentation Config */
  redis?: InstrumentationConfig;
  /** Redis4 Instrumentation Config */
  redis4?: InstrumentationConfig;
}
