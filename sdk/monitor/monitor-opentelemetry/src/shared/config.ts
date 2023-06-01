// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as os from "os";
import { Resource } from "@opentelemetry/resources";
import {
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  DEFAULT_ROLE_NAME,
  IConfig,
  IInstrumentationsConfig,
} from "./types";
import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import {
  SemanticResourceAttributes,
  TelemetrySdkLanguageValues,
} from "@opentelemetry/semantic-conventions";
import { JsonConfig } from "./jsonConfig";
import { Logger } from "./logging";

/**
 * Azure Monitor OpenTelemetry Client Configuration
 */
export class AzureMonitorOpenTelemetryConfig implements IConfig {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio: number;
  /** Azure Monitor Exporter Configuration */
  public azureMonitorExporterConfig?: AzureMonitorExporterOptions;
  /**
   * Sets the state of performance tracking (enabled by default)
   * if true performance counters will be collected every second and sent to Azure Monitor
   */
  public enableAutoCollectPerformance: boolean;
  /**
   * Sets the state of standard metrics tracking (enabled by default)
   * if true Standard metrics will be collected every minute and sent to Azure Monitor
   */
  public enableAutoCollectStandardMetrics: boolean;
  /**
   * Sets the state of native metrics tracking (disabled by default)
   * if true and applicationinsights-native-metrics is installed, native metrics will be collected every minute and sent to Azure Monitor
   */
  public enableAutoCollectNativeMetrics?: boolean;
  /**
   * OpenTelemetry Instrumentations configuration included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  public instrumentations: IInstrumentationsConfig;

  private _resource: Resource;

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
    this._resource = this._getDefaultResource();

    this._mergeConfig();
  }

  private _mergeConfig() {
    try {
      const jsonConfig = JsonConfig.getInstance();
      this.azureMonitorExporterConfig =
        jsonConfig.azureMonitorExporterConfig !== undefined
          ? jsonConfig.azureMonitorExporterConfig
          : this.azureMonitorExporterConfig;
      this.enableAutoCollectPerformance =
        jsonConfig.enableAutoCollectPerformance !== undefined
          ? jsonConfig.enableAutoCollectPerformance
          : this.enableAutoCollectPerformance;
      this.enableAutoCollectStandardMetrics =
        jsonConfig.enableAutoCollectStandardMetrics !== undefined
          ? jsonConfig.enableAutoCollectStandardMetrics
          : this.enableAutoCollectStandardMetrics;
      this.samplingRatio =
        jsonConfig.samplingRatio !== undefined ? jsonConfig.samplingRatio : this.samplingRatio;
      if (jsonConfig.instrumentations) {
        if (
          jsonConfig.instrumentations.azureSdk &&
          jsonConfig.instrumentations.azureSdk.enabled !== undefined
        ) {
          this.instrumentations.azureSdk.enabled = jsonConfig.instrumentations.azureSdk.enabled;
        }
        if (
          jsonConfig.instrumentations.http &&
          jsonConfig.instrumentations.http.enabled !== undefined
        ) {
          this.instrumentations.http.enabled = jsonConfig.instrumentations.http.enabled;
        }
        if (
          jsonConfig.instrumentations.mongoDb &&
          jsonConfig.instrumentations.mongoDb.enabled !== undefined
        ) {
          this.instrumentations.mongoDb.enabled = jsonConfig.instrumentations.mongoDb.enabled;
        }
        if (
          jsonConfig.instrumentations.mySql &&
          jsonConfig.instrumentations.mySql.enabled !== undefined
        ) {
          this.instrumentations.mySql.enabled = jsonConfig.instrumentations.mySql.enabled;
        }
        if (
          jsonConfig.instrumentations.postgreSql &&
          jsonConfig.instrumentations.postgreSql.enabled !== undefined
        ) {
          this.instrumentations.postgreSql.enabled = jsonConfig.instrumentations.postgreSql.enabled;
        }
        if (
          jsonConfig.instrumentations.redis4 &&
          jsonConfig.instrumentations.redis4.enabled !== undefined
        ) {
          this.instrumentations.redis4.enabled = jsonConfig.instrumentations.redis4.enabled;
        }
        if (
          jsonConfig.instrumentations.redis &&
          jsonConfig.instrumentations.redis.enabled !== undefined
        ) {
          this.instrumentations.redis.enabled = jsonConfig.instrumentations.redis.enabled;
        }
      }
    } catch (error) {
      Logger.getInstance().error("Failed to load JSON config file values.", error);
    }
  }

  private _getDefaultResource(): Resource {
    const resource = Resource.EMPTY;
    resource.attributes[SemanticResourceAttributes.SERVICE_NAME] = DEFAULT_ROLE_NAME;
    if (process.env.WEBSITE_SITE_NAME) {
      // Azure Web apps and Functions
      resource.attributes[SemanticResourceAttributes.SERVICE_NAME] = process.env.WEBSITE_SITE_NAME;
    }
    resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = os && os.hostname();
    if (process.env.WEBSITE_INSTANCE_ID) {
      resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] =
        process.env.WEBSITE_INSTANCE_ID;
    }
    const sdkVersion = AZURE_MONITOR_OPENTELEMETRY_VERSION;
    resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE] =
      TelemetrySdkLanguageValues.NODEJS;
    resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_VERSION] = `node:${sdkVersion}`;
    return resource;
  }
}
