// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createDefaultHttpClient,
  createPipelineRequest,
  HttpMethods,
} from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import {
  BatchObservableResult,
  ObservableGauge,
  ObservableResult,
} from "@opentelemetry/api-metrics";
import { Meter } from "@opentelemetry/api-metrics/build/src/types/Meter";
import { ExportResultCode } from "@opentelemetry/core";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorExporterOptions, AzureMonitorStatsbeatExporter } from "../../index";
import * as ai from "../../utils/constants/applicationinsights";
import {
  StatsbeatCounter,
  StatsbeatResourceProvider,
  STATSBEAT_LANGUAGE,
  AIMS_URI,
  AIMS_API_VERSION,
  AIMS_FORMAT,
  /* TODO: Add these back for production
  EU_CONNECTION_STRING,
  EU_ENDPOINTS,
  NON_EU_CONNECTION_STRING,
  */
  CommonStatsbeatProperties,
  IVirtualMachineInfo,
  AttachStatsbeatProperties,
  StatsbeatFeatureType,
  StatsbeatOptions,
} from "./types";

const os = require("os");

export class LongIntervalStatsbeatMetrics {
  private static _instance: PrivateLongIntervalStatsbeatMetrics;
  constructor(options: StatsbeatOptions) {
    if (!LongIntervalStatsbeatMetrics._instance) {
      LongIntervalStatsbeatMetrics._instance = new PrivateLongIntervalStatsbeatMetrics(options);
    }
  }

  public getInstance() {
    return LongIntervalStatsbeatMetrics._instance;
  }
}

class PrivateLongIntervalStatsbeatMetrics {
  private _statsCollectionLongInterval: number = 86400000; // 1 day
  private _isInitialized: boolean = false;

  // Custom dimensions
  private _vmInfo: IVirtualMachineInfo = {};
  private _resourceIdentifier: string = "";
  private _resourceProvider: string = StatsbeatResourceProvider.unknown;
  private _os: string = os.type();
  private _cikey: string;
  private _runtimeVersion: string;
  private _language: string;
  private _version: string;
  private _attach: string = "sdk";

  private _commonProperties: CommonStatsbeatProperties;
  private _attachProperties: AttachStatsbeatProperties;

  private _feature: number = 0;
  private _instrumentation: number = 0;

  private _features: number[] = [];
  private _instrumentations: number[] = [];

  private _longIntervalStatsbeatMeterProvider: MeterProvider;
  private _longIntervalAzureExporter: AzureMonitorStatsbeatExporter;
  private _longIntervalMetricReader: PeriodicExportingMetricReader;
  private _longIntervalStatsbeatMeter: Meter;

  // Network Attributes
  private _connectionString: string;

  // Observable Gauges
  private _featureStatsbeatGauge: ObservableGauge;
  private _attachStatsbeatGauge: ObservableGauge;

  constructor(options: StatsbeatOptions) {
    // TODO: Change this out for production
    // this._connectionString = this._getConnectionString(options.endpointUrl);
    this._connectionString = "InstrumentationKey=b59d565e-da91-4140-8671-6c79b6938b4d;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/";

    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: this._connectionString,
    };

    if (process.env.STATSBEAT_FEATURES) {
      this._features = process.env.STATSBEAT_FEATURES.split(',').map((feature) => Number(feature));
    }
    if (process.env.STATSBEAT_INSTRUMENTATIONS) {
      this._instrumentations = process.env.STATSBEAT_INSTRUMENTATIONS.split(',').map((instrumentation) => Number(instrumentation));
    }
    this._instrumentations?.forEach((instrumentation) =>
      this._addInstrumentation(instrumentation)
    );
    this._features?.forEach((feature) => this._addFeature(feature));

    this._longIntervalStatsbeatMeterProvider = new MeterProvider();
    this._longIntervalAzureExporter = new AzureMonitorStatsbeatExporter(exporterConfig);

    // Export Long Interval Statsbeats every day
    const longIntervalMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._longIntervalAzureExporter,
      exportIntervalMillis: options.longCollectionInterval || this._statsCollectionLongInterval, // 1 day
    };

    this._longIntervalMetricReader = new PeriodicExportingMetricReader(
      longIntervalMetricReaderOptions
    );
    this._longIntervalStatsbeatMeterProvider.addMetricReader(this._longIntervalMetricReader);
    this._longIntervalStatsbeatMeter = this._longIntervalStatsbeatMeterProvider.getMeter(
      "Azure Monitor Long Interval Statsbeat"
    );

    // Assign Common Properties
    this._runtimeVersion = process.version;
    this._language = STATSBEAT_LANGUAGE;
    this._version = ai.packageVersion;
    this._cikey = options.instrumentationKey;

    this._featureStatsbeatGauge = this._longIntervalStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.FEATURE
    );
    this._attachStatsbeatGauge = this._longIntervalStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.ATTACH
    );

    this._commonProperties = {
      os: this._os,
      rp: this._resourceProvider,
      cikey: this._cikey,
      runtimeVersion: this._runtimeVersion,
      language: this._language,
      version: this._version,
      attach: this._attach,
    };

    this._attachProperties = {
      rpId: this._resourceIdentifier,
    };

    this._isInitialized = true;
    this._initialize();
  }

  private async _initialize() {
    try {
      await this._getResourceProvider();

      // Add long interval observable callbacks
      this._attachStatsbeatGauge.addCallback(this._attachCallback.bind(this));
      this._longIntervalStatsbeatMeter.addBatchObservableCallback(
        this._featureCallback.bind(this),
        [this._featureStatsbeatGauge]
      );

      // Export Feature/Attach Statsbeat once upon app initialization
      this._longIntervalAzureExporter.export(
        (await this._longIntervalMetricReader.collect()).resourceMetrics,
        (result) => {
          if (result.code !== ExportResultCode.SUCCESS) {
            diag.error(`LongIntervalStatsbeat: metrics export failed (error ${result.error})`);
          }
        }
      );
    } catch (error) {
      diag.debug("Call to get the resource provider failed.");
    }
  }

  private _featureCallback(observableResult: BatchObservableResult) {
    let attributes;
    if (this._instrumentation) {
      attributes = {
        ...this._commonProperties,
        feature: this._instrumentation,
        type: StatsbeatFeatureType.INSTRUMENTATION,
      };
      observableResult.observe(this._featureStatsbeatGauge, 1, { ...attributes });
    }

    if (this._feature) {
      attributes = {
        ...this._commonProperties,
        feature: this._feature,
        type: StatsbeatFeatureType.FEATURE,
      };
      observableResult.observe(this._featureStatsbeatGauge, 1, { ...attributes });
    }
  }

  private _attachCallback(observableResult: ObservableResult) {
    let attributes = { ...this._commonProperties, ...this._attachProperties };
    observableResult.observe(1, attributes);
  }

  public async getAzureComputeMetadata(): Promise<boolean> {
    const httpClient = createDefaultHttpClient();
    const method: HttpMethods = "GET";

    const options = {
      url: `${AIMS_URI}?${AIMS_API_VERSION}&${AIMS_FORMAT}`,
      timeout: 5000, // 5 seconds
      method: method,
      allowInsecureConnection: true,
    };
    const request = createPipelineRequest(options);

    await httpClient
      .sendRequest(request)
      .then((res: any) => {
        if (res.status === 200) {
          // Success; VM
          this._vmInfo.isVM = true;
          let virtualMachineData = "";
          res.on("data", (data: any) => {
            virtualMachineData += data;
          });
          res.on("end", () => {
            try {
              let data = JSON.parse(virtualMachineData);
              this._vmInfo.id = data["vmId"] || "";
              this._vmInfo.subscriptionId = data["subscriptionId"] || "";
              this._vmInfo.osType = data["osType"] || "";
            } catch (error) {
              diag.debug("Failed to parse JSON: ", error);
            }
          });
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
    return false;
  }

  private async _getResourceProvider(): Promise<void> {
    // Check resource provider
    this._resourceProvider = StatsbeatResourceProvider.unknown;
    if (process.env.WEBSITE_SITE_NAME) {
      // Web apps
      this._resourceProvider = StatsbeatResourceProvider.appsvc;
    } else if (process.env.FUNCTIONS_WORKER_RUNTIME) {
      // Function apps
      this._resourceProvider = StatsbeatResourceProvider.functions;
    } else if (await this.getAzureComputeMetadata()) {
      this._resourceProvider = StatsbeatResourceProvider.vm;
      this._resourceIdentifier = this._vmInfo.id + "/" + this._vmInfo.subscriptionId;
      // Overrride OS as VM info have higher precedence
      if (this._vmInfo.osType) {
        this._os = this._vmInfo.osType;
      }
    } else {
      this._resourceProvider = StatsbeatResourceProvider.unknown;
    }
  }

  // Long interval statsbeat methods
  private _addFeature(feature: number) {
    this._feature |= feature;
  }

  private _addInstrumentation(instrumentation: number) {
    this._instrumentation |= instrumentation;
  }

  /* TODO: Add this back
  private _getConnectionString(endpointUrl: string) {
    let currentEndpoint = endpointUrl;
    for (let i = 0; i < EU_ENDPOINTS.length; i++) {
      if (currentEndpoint.includes(EU_ENDPOINTS[i])) {
        return EU_CONNECTION_STRING;
      }
    }
    return NON_EU_CONNECTION_STRING;
  }
  */

  public isInitialized() {
    return this._isInitialized;
  }

  public shutdown() {
    this._longIntervalStatsbeatMeterProvider.shutdown();
  }
}
