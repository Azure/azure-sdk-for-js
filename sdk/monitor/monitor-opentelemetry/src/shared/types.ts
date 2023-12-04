// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { InstrumentationConfig } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";

/**
 * Azure Monitor OpenTelemetry Options
 */
export interface AzureMonitorOpenTelemetryOptions {
  /** Azure Monitor Exporter Configuration */
  azureMonitorExporterOptions?: AzureMonitorExporterOptions;
  /** OpenTelemetry Resource */
  resource?: Resource;
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  samplingRatio?: number;
  /**
   * OpenTelemetry Instrumentations options included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  instrumentationOptions?: InstrumentationOptions;
  /** Web Snippet Enable */
  enableWebInstrumentation?: boolean;
  /** Web Snippet Connection String */
  webInstrumentationConnectionString?: string;
  /** Web Snippet Instrumentation Key */
  webInstrumentationSrc?: string;
  /** Web Snippet Config */
  webInstrumentationConfig?: IWebInstrumentationConfig[];
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

/**
 * Web Snippet Configuration interface
 */
export interface IWebInstrumentationConfig {
  /**
   * Name of Application Insights web Instrumentation config to be changed
   * see more Application Insights web Instrumentation config details at: https://github.com/microsoft/ApplicationInsights-JS#configuration
   */
  name: string;
  /**
  * value provided to replace the default config value above
  */
  value: string | boolean | number;
}
