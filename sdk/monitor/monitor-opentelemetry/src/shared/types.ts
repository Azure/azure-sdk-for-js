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
  /** Enable Live Metrics feature */
  enableLiveMetrics?: boolean;
  /** Enable Standard Metrics feature */
  enableStandardMetrics?: boolean;
  /**
   * OpenTelemetry Instrumentations options included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  instrumentationOptions?: InstrumentationOptions;
  /**
   * Application Insights Web Instrumentation options (enableWebInstrumentation, webInstrumentationConnectionString, webInstrumentationSrc, webInstrumentationConfig)
   */
  applicationInsightsWebInstrumentationOptions?: BrowserSdkLoaderOptions;
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
 * Application Insights Web Instrumentation Configuration interface
 */
export interface BrowserSdkLoaderOptions {
  /** Web Snippet Enable */
  enableWebInstrumentation?: boolean;
  /** Web Snippet Connection String */
  webInstrumentationConnectionString?: string;
  /** Web Snippet Instrumentation Key */
  webInstrumentationSrc?: string;
  /** Web Snippet Config */
  webInstrumentationConfig?: IBrowserSdkLoaderConfig;
}

/**
 * Web Snippet Configuration interface
 */
export interface IBrowserSdkLoaderConfig {
  /** The full URL for where to load the SDK from */
  src: string;
  /** The global name for the initialized SDK */
  name?: string;
  /** Defines the load delay to wait before attempting to load the SDK */
  ld?: number;
  /** This setting is used only for reporting SDK load failures */
  useXhr?: boolean;
  /** By including this setting, the script tag added to download the SDK will include the crossOrigin attribute with this string value */
  crossOrigin?: string;
  /** This callback function which is called after the main SDK script has been successfully loaded and initialized from the CDN (based on the src value), it is passed a reference to the sdk instance that it is being called for and it is also called before the first initial page view */
  onInit?: string;
  /** The configuration passed to the Application Insights SDK during initialization */
  cfg: string; // requires user to convert object -> string
}
