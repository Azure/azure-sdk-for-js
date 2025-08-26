// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceDetectionConfig, Resource } from "@opentelemetry/resources";
import {
  defaultResource,
  detectResources,
  emptyResource,
  envDetector,
} from "@opentelemetry/resources";
import type {
  BrowserSdkLoaderOptions,
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
} from "../types.js";
import type { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { EnvConfig } from "./envConfig.js";
import { JsonConfig } from "./jsonConfig.js";
import { Logger } from "./logging/index.js";
import {
  azureAppServiceDetector,
  azureFunctionsDetector,
  azureVmDetector,
} from "@opentelemetry/resource-detector-azure";

/**
 * Azure Monitor OpenTelemetry Client Configuration
 */
export class InternalConfig implements AzureMonitorOpenTelemetryOptions {
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  public samplingRatio: number;
  /** The maximum number of spans to sample per second. */
  public tracesPerSecond?: number;
  /** Azure Monitor Exporter Configuration */
  public azureMonitorExporterOptions: AzureMonitorExporterOptions;
  /**
   * OpenTelemetry Instrumentations configuration included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4)
   */
  public instrumentationOptions: InstrumentationOptions;
  /** Enable Live Metrics feature */
  enableLiveMetrics?: boolean;
  /** Enable Standard Metrics feature */
  enableStandardMetrics?: boolean;
  /** Enable log sampling based on trace (Default true) */
  enableTraceBasedSamplingForLogs?: boolean;
  /** Enable Performance Counter feature */
  enablePerformanceCounters?: boolean;
  /** Metric export interval in milliseconds */
  public metricExportIntervalMillis: number;

  private _resource: Resource = emptyResource();

  public set resource(resource: Resource) {
    this._resource = this._resource.merge(resource);
  }

  /**
   *Get OpenTelemetry Resource
   */
  public get resource(): Resource {
    return this._resource;
  }

  public browserSdkLoaderOptions: BrowserSdkLoaderOptions;

  /**
   * Initializes a new instance of the AzureMonitorOpenTelemetryOptions class.
   */
  constructor(options?: AzureMonitorOpenTelemetryOptions) {
    // Default values
    this.azureMonitorExporterOptions = {};
    this.samplingRatio = 1;
    this.tracesPerSecond = undefined;
    this.enableLiveMetrics = true;
    this.enableStandardMetrics = true;
    this.enableTraceBasedSamplingForLogs = false;
    this.enablePerformanceCounters = true;
    this.metricExportIntervalMillis = this.calculateMetricExportInterval();
    this.instrumentationOptions = {
      http: { enabled: true },
      azureSdk: { enabled: true },
      mongoDb: { enabled: true },
      mySql: { enabled: true },
      postgreSql: { enabled: true },
      redis: { enabled: true },
      redis4: { enabled: true },
    };
    this._setDefaultResource();
    this.browserSdkLoaderOptions = {
      enabled: false,
      connectionString: "",
    };

    if (options) {
      // Merge default with provided options
      this.azureMonitorExporterOptions = Object.assign(
        this.azureMonitorExporterOptions,
        options.azureMonitorExporterOptions,
      );
      this.instrumentationOptions = Object.assign(
        this.instrumentationOptions,
        options.instrumentationOptions,
      );
      this.resource = Object.assign(this.resource, options.resource);
      this.samplingRatio =
        options.samplingRatio !== undefined ? options.samplingRatio : this.samplingRatio;
      this.tracesPerSecond =
        options.tracesPerSecond !== undefined ? options.tracesPerSecond : this.tracesPerSecond;
      this.browserSdkLoaderOptions = Object.assign(
        this.browserSdkLoaderOptions,
        options.browserSdkLoaderOptions,
      );
      this.enableLiveMetrics =
        options.enableLiveMetrics !== undefined
          ? options.enableLiveMetrics
          : this.enableLiveMetrics;
      this.enableStandardMetrics =
        options.enableStandardMetrics !== undefined
          ? options.enableStandardMetrics
          : this.enableStandardMetrics;
      this.enableTraceBasedSamplingForLogs =
        options.enableTraceBasedSamplingForLogs !== undefined
          ? options.enableTraceBasedSamplingForLogs
          : this.enableTraceBasedSamplingForLogs;
      this.enablePerformanceCounters =
        options.enablePerformanceCounters !== undefined
          ? options.enablePerformanceCounters
          : this.enablePerformanceCounters;
    }
    // JSON configuration will take precedence over options provided
    this._mergeJsonConfig();
    // ENV configuration will take precedence over other configurations
    this._mergeEnvConfig();
  }

  private _mergeEnvConfig(): void {
    const envConfig = EnvConfig.getInstance();
    this.samplingRatio =
      envConfig.samplingRatio !== undefined ? envConfig.samplingRatio : this.samplingRatio;
    this.tracesPerSecond =
      envConfig.tracesPerSecond !== undefined ? envConfig.tracesPerSecond : this.tracesPerSecond;
  }

  private _mergeJsonConfig(): void {
    try {
      const jsonConfig = JsonConfig.getInstance();
      this.samplingRatio =
        jsonConfig.samplingRatio !== undefined ? jsonConfig.samplingRatio : this.samplingRatio;
      this.tracesPerSecond =
        jsonConfig.tracesPerSecond !== undefined
          ? jsonConfig.tracesPerSecond
          : this.tracesPerSecond;
      this.browserSdkLoaderOptions = Object.assign(
        this.browserSdkLoaderOptions,
        jsonConfig.browserSdkLoaderOptions,
      );
      this.enableLiveMetrics =
        jsonConfig.enableLiveMetrics !== undefined
          ? jsonConfig.enableLiveMetrics
          : this.enableLiveMetrics;
      this.enableStandardMetrics =
        jsonConfig.enableStandardMetrics !== undefined
          ? jsonConfig.enableStandardMetrics
          : this.enableStandardMetrics;
      this.enableTraceBasedSamplingForLogs =
        jsonConfig.enableTraceBasedSamplingForLogs !== undefined
          ? jsonConfig.enableTraceBasedSamplingForLogs
          : this.enableTraceBasedSamplingForLogs;
      this.azureMonitorExporterOptions = Object.assign(
        this.azureMonitorExporterOptions,
        jsonConfig.azureMonitorExporterOptions,
      );
      this.instrumentationOptions = Object.assign(
        this.instrumentationOptions,
        jsonConfig.instrumentationOptions,
      );
    } catch (error) {
      Logger.getInstance().error("Failed to load JSON config file values.", error);
    }
  }

  private _setDefaultResource(): void {
    let resource = defaultResource();
    // Load resource attributes from env
    const detectResourceConfig: ResourceDetectionConfig = {
      detectors: [envDetector],
    };
    const envResource = detectResources(detectResourceConfig);
    resource = resource.merge(envResource);

    // Load resource attributes from Azure
    const azureResource: Resource = detectResources({
      detectors: [azureAppServiceDetector, azureFunctionsDetector],
    });
    this._resource = resource.merge(azureResource);

    // Handle VM resource detection asynchronously to avoid warnings
    // about accessing resource attributes before async attributes are settled
    this._initializeVmResourceAsync();
  }

  /**
   * Initialize VM resource detection asynchronously to avoid warnings
   * about accessing resource attributes before async attributes settle
   */
  private _initializeVmResourceAsync(): void {
    const vmResource = detectResources({
      detectors: [azureVmDetector],
    });

    // Don't wait for VM resource detection to complete during initialization
    // This prevents warnings about accessing resource attributes before async attributes are settled
    if (vmResource.asyncAttributesPending) {
      void vmResource
        .waitForAsyncAttributes?.()
        .then(() => {
          this._resource = this._resource.merge(vmResource);
          return;
        })
        .catch(() => {
          // Silently ignore VM detection errors to avoid unnecessary warnings
          // VM detection is optional and failures shouldn't impact core functionality
        });
    } else {
      // If VM detection completed synchronously, merge immediately
      this._resource = this._resource.merge(vmResource);
    }
  }

  public calculateMetricExportInterval(options?: { collectionInterval: number }): number {
    const defaultInterval = 60000; // 60 seconds

    // Prioritize OTEL_METRIC_EXPORT_INTERVAL env var
    if (process.env.OTEL_METRIC_EXPORT_INTERVAL) {
      const envInterval = parseInt(process.env.OTEL_METRIC_EXPORT_INTERVAL.trim(), 10);
      if (!isNaN(envInterval) && envInterval > 0) {
        return envInterval;
      }
    }

    // Then use options if provided
    if (options?.collectionInterval) {
      return options.collectionInterval;
    }

    // Default fallback
    return defaultInterval;
  }
}
