// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as azureCore from "@azure/core-http";
import { InstrumentationConfig } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";

export interface IBaseConfig {
  /** Connection String used to send telemetry payloads to */
  connectionString: string;
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  samplingRatio: number;
  /**
   * Sets the state of performance tracking (enabled by default)
   * if true performance counters will be collected every second and sent to Application Insights
   */
  enableAutoCollectPerformance: boolean;
  /**
   * Sets the state of standard metrics tracking (enabled by default)
   * if true Standard metrics will be collected every minute and sent to Application Insights
   */
  enableAutoCollectStandardMetrics: boolean;
  /**
   * OpenTelemetry Instrumentations configuration included as part of Application Insights (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  instrumentations: IInstrumentationsConfig;
  /**
   * Specific extended metrics, applicationinsights-native-metrics package need to be available
   */
  extendedMetrics: { [type: string]: boolean };
  /**
   * Directory to store retriable telemetry when it fails to export.
   */
  storageDirectory: string;
  /**
   * Disable offline storage when telemetry cannot be exported.
   */
  disableOfflineStorage: boolean;
}

export interface IConfig extends IBaseConfig {
  /** AAD TokenCredential to use to authenticate the app */
  aadTokenCredential?: azureCore.TokenCredential;
  /** OpenTelemetry Resource */
  resource?: Resource;
}

export interface IInstrumentationsConfig {
  azureSdk?: InstrumentationConfig;
  http?: InstrumentationConfig;
  mongoDb?: InstrumentationConfig;
  mySql?: InstrumentationConfig;
  postgreSql?: InstrumentationConfig;
  redis?: InstrumentationConfig;
  redis4?: InstrumentationConfig;
}

export const enum ExtendedMetricType {
  gc = "gc",
  heap = "heap",
  loop = "loop",
}
