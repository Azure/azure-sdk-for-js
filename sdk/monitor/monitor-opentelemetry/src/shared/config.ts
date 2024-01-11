// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Resource,
  ResourceDetectionConfig,
  detectResourcesSync,
  envDetectorSync,
} from "@opentelemetry/resources";
import {
  BrowserSdkLoaderOptions,
  AzureMonitorOpenTelemetryOptions,
  InstrumentationOptions,
} from "./types";
import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { JsonConfig } from "./jsonConfig";
import { Logger } from "./logging";
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

  public browserSdkLoaderOptions: BrowserSdkLoaderOptions;

  /**
   * Initializes a new instance of the AzureMonitorOpenTelemetryOptions class.
   */
  constructor(options?: AzureMonitorOpenTelemetryOptions) {
    // Default values
    this.azureMonitorExporterOptions = {};
    this.samplingRatio = 1;
    this.enableLiveMetrics = false;
    this.enableStandardMetrics = true;
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
    this.browserSdkLoaderOptions = {
      enabled: false,
      connectionString: "",
      src: "",
      config: undefined,
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
      this.samplingRatio = options.samplingRatio || this.samplingRatio;
      this.browserSdkLoaderOptions = Object.assign(
        this.browserSdkLoaderOptions,
        options.browserSdkLoaderOptions,
      );
      this.enableLiveMetrics = options.enableLiveMetrics || this.enableLiveMetrics;
      this.enableStandardMetrics = options.enableStandardMetrics || this.enableStandardMetrics;
    }
    // JSON configuration will take precedence over other settings
    this._mergeConfig();
  }

  private _mergeConfig() {
    try {
      const jsonConfig = JsonConfig.getInstance();
      this.samplingRatio =
        jsonConfig.samplingRatio !== undefined ? jsonConfig.samplingRatio : this.samplingRatio;
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

  private _getDefaultResource(): Resource {
    let resource = Resource.default();
    // Load resource attributes from env
    const detectResourceConfig: ResourceDetectionConfig = {
      detectors: [envDetectorSync],
    };
    const envResource = detectResourcesSync(detectResourceConfig);
    resource = resource.merge(envResource);

    // Load resource attributes from Azure
    const azureResource: Resource = detectResourcesSync({
      detectors: [azureAppServiceDetector, azureFunctionsDetector, azureVmDetector],
    });

    // Merge resources, azureResource will take precedence
    resource = resource.merge(azureResource);
    return resource;
  }
}
