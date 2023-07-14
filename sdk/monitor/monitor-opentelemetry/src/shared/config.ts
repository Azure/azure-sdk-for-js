// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Resource,
  ResourceDetectionConfig,
  detectResourcesSync,
  envDetectorSync,
} from "@opentelemetry/resources";
import {
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
  OTLPExporterConfig,
} from "./types";
import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { JsonConfig } from "./jsonConfig";
import { Logger } from "./logging";

/**
 * Azure Monitor OpenTelemetry Client Configuration
 */
export class AzureMonitorOpenTelemetryConfig implements AzureMonitorOpenTelemetryOptions {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio: number;
  /** Azure Monitor Exporter Configuration */
  public azureMonitorExporterConfig: AzureMonitorExporterOptions;
  /** OTLP Trace Exporter Configuration */
  public otlpTraceExporterConfig: OTLPExporterConfig;
  /** OTLP Metric Exporter Configuration */
  public otlpMetricExporterConfig: OTLPExporterConfig;
  /** OTLP Log Exporter Configuration */
  public otlpLogExporterConfig: OTLPExporterConfig;
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
  public instrumentationOptions: InstrumentationOptions;

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
    this.otlpLogExporterConfig = {};
    this.otlpMetricExporterConfig = {};
    this.otlpTraceExporterConfig = {};
    this.enableAutoCollectPerformance = true;
    this.enableAutoCollectStandardMetrics = true;
    this.samplingRatio = 1;
    this.instrumentationOptions = {
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
      // Merge default with provided options
      this.azureMonitorExporterConfig = Object.assign(
        this.azureMonitorExporterConfig,
        options.azureMonitorExporterConfig
      );
      this.otlpTraceExporterConfig = Object.assign(
        this.otlpTraceExporterConfig,
        options.otlpTraceExporterConfig
      );
      this.otlpMetricExporterConfig = Object.assign(
        this.otlpMetricExporterConfig,
        options.otlpMetricExporterConfig
      );
      this.otlpLogExporterConfig = Object.assign(
        this.otlpLogExporterConfig,
        options.otlpLogExporterConfig
      );
      this.instrumentationOptions = Object.assign(
        this.instrumentationOptions,
        options.instrumentationOptions
      );
      this.resource = Object.assign(this.resource, options.resource);

      this.enableAutoCollectPerformance =
        options.enableAutoCollectPerformance || this.enableAutoCollectPerformance;
      this.enableAutoCollectStandardMetrics =
        options.enableAutoCollectStandardMetrics || this.enableAutoCollectStandardMetrics;
      this.samplingRatio = options.samplingRatio || this.samplingRatio;
    }
  }

  private _mergeConfig() {
    try {
      const jsonConfig = JsonConfig.getInstance();
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

      this.azureMonitorExporterConfig = Object.assign(
        this.azureMonitorExporterConfig,
        jsonConfig.azureMonitorExporterConfig
      );
      this.otlpTraceExporterConfig = Object.assign(
        this.otlpTraceExporterConfig,
        jsonConfig.otlpTraceExporterConfig
      );
      this.otlpMetricExporterConfig = Object.assign(
        this.otlpMetricExporterConfig,
        jsonConfig.otlpMetricExporterConfig
      );
      this.otlpLogExporterConfig = Object.assign(
        this.otlpLogExporterConfig,
        jsonConfig.otlpLogExporterConfig
      );
      this.instrumentationOptions = Object.assign(
        this.instrumentationOptions,
        jsonConfig.instrumentationOptions
      );
    } catch (error) {
      Logger.getInstance().error("Failed to load JSON config file values.", error);
    }
  }

  private _getDefaultResource(): Resource {
    let resource = Resource.default();
    // Load resource attributes from env
    const detectResourceConfig: ResourceDetectionConfig = {
      detectors: [envDetectorSync],
    };
    const envResource = detectResourcesSync(detectResourceConfig);
    resource = resource.merge(envResource);
    return resource;
  }
}
