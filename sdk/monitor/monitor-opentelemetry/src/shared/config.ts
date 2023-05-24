// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as os from "os";
import { Resource } from "@opentelemetry/resources";
import {
  AZURE_MONITOR_OPENTELEMETRY_VERSION,
  DEFAULT_ROLE_NAME,
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
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
export class AzureMonitorOpenTelemetryConfig implements AzureMonitorOpenTelemetryOptions {
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
   * OpenTelemetry Instrumentations configuration included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  public instrumentationConfig: InstrumentationOptions;

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
  constructor(options?: AzureMonitorOpenTelemetryOptions) {
    // Default values
    this.azureMonitorExporterConfig = {};
    this.enableAutoCollectPerformance = true;
    this.enableAutoCollectStandardMetrics = true;
    this.samplingRatio = 1;
    this.instrumentationConfig = {
      http: { enabled: true },
      azureSdk: { enabled: false },
      mongoDb: { enabled: false },
      mySql: { enabled: false },
      postgreSql: { enabled: false },
      redis: { enabled: false },
      redis4: { enabled: false },
    };
    this._resource = this._getDefaultResource();
    // Merge JSON configuration file if available
    this._mergeConfig();
    // Check for explicitly passed options when instantiating client
    // This will take precedence over other settings
    if (options) {
      this.azureMonitorExporterConfig =
        options.azureMonitorExporterConfig || this.azureMonitorExporterConfig;
      this.enableAutoCollectPerformance =
        options.enableAutoCollectPerformance || this.enableAutoCollectPerformance;
      this.enableAutoCollectStandardMetrics =
        options.enableAutoCollectStandardMetrics || this.enableAutoCollectStandardMetrics;
      this.samplingRatio = options.samplingRatio || this.samplingRatio;
      this.instrumentationConfig = options.instrumentationConfig || this.instrumentationConfig;
      this.resource = options.resource || this.resource;
    }
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
      if (jsonConfig.instrumentationConfig) {
        if (
          jsonConfig.instrumentationConfig.azureSdk &&
          jsonConfig.instrumentationConfig.azureSdk.enabled !== undefined
        ) {
          this.instrumentationConfig.azureSdk.enabled =
            jsonConfig.instrumentationConfig.azureSdk.enabled;
        }
        if (
          jsonConfig.instrumentationConfig.http &&
          jsonConfig.instrumentationConfig.http.enabled !== undefined
        ) {
          this.instrumentationConfig.http.enabled = jsonConfig.instrumentationConfig.http.enabled;
        }
        if (
          jsonConfig.instrumentationConfig.mongoDb &&
          jsonConfig.instrumentationConfig.mongoDb.enabled !== undefined
        ) {
          this.instrumentationConfig.mongoDb.enabled =
            jsonConfig.instrumentationConfig.mongoDb.enabled;
        }
        if (
          jsonConfig.instrumentationConfig.mySql &&
          jsonConfig.instrumentationConfig.mySql.enabled !== undefined
        ) {
          this.instrumentationConfig.mySql.enabled = jsonConfig.instrumentationConfig.mySql.enabled;
        }
        if (
          jsonConfig.instrumentationConfig.postgreSql &&
          jsonConfig.instrumentationConfig.postgreSql.enabled !== undefined
        ) {
          this.instrumentationConfig.postgreSql.enabled =
            jsonConfig.instrumentationConfig.postgreSql.enabled;
        }
        if (
          jsonConfig.instrumentationConfig.redis4 &&
          jsonConfig.instrumentationConfig.redis4.enabled !== undefined
        ) {
          this.instrumentationConfig.redis4.enabled =
            jsonConfig.instrumentationConfig.redis4.enabled;
        }
        if (
          jsonConfig.instrumentationConfig.redis &&
          jsonConfig.instrumentationConfig.redis.enabled !== undefined
        ) {
          this.instrumentationConfig.redis.enabled = jsonConfig.instrumentationConfig.redis.enabled;
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
