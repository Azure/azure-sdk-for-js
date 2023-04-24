// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as azureCore from "@azure/core-http";
import { Resource } from "@opentelemetry/resources";
import { ExtendedMetricType, IConfig, IInstrumentationsConfig } from "./types";

export class AzureMonitorOpenTelemetryConfig implements IConfig {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio: number;
  /** AAD TokenCredential to use to authenticate the app */
  public aadTokenCredential?: azureCore.TokenCredential;
  /**
   * Sets the state of performance tracking (enabled by default)
   * if true performance counters will be collected every second and sent to Application Insights
   */
  public enableAutoCollectPerformance: boolean;
  /**
   * Sets the state of standard metrics tracking (enabled by default)
   * if true Standard metrics will be collected every minute and sent to Application Insights
   */
  public enableAutoCollectStandardMetrics: boolean;
  /**
   * Specific extended metrics, applicationinsights-native-metrics package need to be available
   */
  public extendedMetrics: { [type: string]: boolean };
  /**
   * OpenTelemetry Instrumentations configuration included as part of Application Insights (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  public instrumentations: IInstrumentationsConfig;
  /**
   * Disable offline storage when telemetry cannot be exported.
   */
  public disableOfflineStorage: boolean;
  /**
   * Directory to store retriable telemetry when it fails to export.
   */
  public storageDirectory: string;

  private _connectionString: string;
  private _resource: Resource;

  /** Set Connection String used to send telemetry payloads to */
  public set connectionString(connectionString: string) {
    this._connectionString = connectionString;
  }

  /**
   * Get Connection String
   */
  public get connectionString(): string {
    return this._connectionString;
  }

  /**
   *Set OpenTelemetry Resource
   */
  public set resource(resource: Resource) {
    this._resource = this._resource.merge(resource);
  }

  /**
   *Get OpenTelemetry Resource
   */
  public get resource(): Resource {
    return this._resource;
  }

  /**
   * Initializes a new instance of the AzureMonitorOpenTelemetryConfig class.
   */
  constructor() {
    this.disableOfflineStorage = false;
    this.enableAutoCollectPerformance = true;
    this.enableAutoCollectStandardMetrics = true;
    this.samplingRatio = 1;
    this.instrumentations = {
      http: { enabled: true },
      azureSdk: { enabled: false },
      mongoDb: { enabled: false },
      mySql: { enabled: false },
      postgreSql: { enabled: false },
      redis: { enabled: false },
      redis4: { enabled: false },
    };
    this.extendedMetrics = {};
    this.extendedMetrics[ExtendedMetricType.gc] = false;
    this.extendedMetrics[ExtendedMetricType.heap] = false;
    this.extendedMetrics[ExtendedMetricType.loop] = false;
    // TODO: Add default resource loading
    this._resource = Resource.EMPTY;
    // TODO: Add connection string parser
    this._connectionString = "";
    // TODO: Add default storage directory
    this.storageDirectory = "";
  }
}
