// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  diag,
  BatchObservableResult,
  ObservableGauge,
  ObservableResult,
  Meter,
} from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorExporterOptions } from "../../index";
import * as ai from "../../utils/constants/applicationinsights";
import { StatsbeatMetrics } from "./statsbeatMetrics";
import {
  StatsbeatCounter,
  STATSBEAT_LANGUAGE,
  CommonStatsbeatProperties,
  AttachStatsbeatProperties,
  StatsbeatFeatureType,
  StatsbeatOptions,
} from "./types";
import { AzureMonitorStatsbeatExporter } from "./statsbeatExporter";

let instance: LongIntervalStatsbeatMetrics | null = null;

/**
 * Long Interval Statsbeat Metrics
 * @internal
 */
class LongIntervalStatsbeatMetrics extends StatsbeatMetrics {
  private _AZURE_MONITOR_STATSBEAT_FEATURES = process.env.AZURE_MONITOR_STATSBEAT_FEATURES;
  private _statsCollectionLongInterval: number = 86400000; // 1 day
  private _isInitialized: boolean = false;

  // Custom dimensions
  private _cikey: string;
  private _runtimeVersion: string;
  private _language: string;
  private _version: string;
  private _attach: string = "sdk";

  private _commonProperties: CommonStatsbeatProperties;
  private _attachProperties: AttachStatsbeatProperties;

  private _feature: number = 0;
  private _instrumentation: number = 0;

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
    super();
    this._connectionString = super._getConnectionString(options.endpointUrl);
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: this._connectionString,
    };

    if (this._AZURE_MONITOR_STATSBEAT_FEATURES) {
      try {
        this._feature = JSON.parse(this._AZURE_MONITOR_STATSBEAT_FEATURES).feature;
        this._instrumentation = JSON.parse(this._AZURE_MONITOR_STATSBEAT_FEATURES).instrumentation;
      } catch (error) {
        diag.error(
          `LongIntervalStatsbeat: Failed to parse features/instrumentations (error ${error})`
        );
      }
    }

    this._longIntervalStatsbeatMeterProvider = new MeterProvider();
    this._longIntervalAzureExporter = new AzureMonitorStatsbeatExporter(exporterConfig);

    // Export Long Interval Statsbeats every day
    const longIntervalMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._longIntervalAzureExporter,
      exportIntervalMillis:
        Number(process.env.LONG_INTERVAL_EXPORT_MILLIS) || this._statsCollectionLongInterval, // 1 day
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
      os: super._os,
      rp: super._resourceProvider,
      cikey: this._cikey,
      runtimeVersion: this._runtimeVersion,
      language: this._language,
      version: this._version,
      attach: this._attach,
    };

    this._attachProperties = {
      rpId: super._resourceIdentifier,
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
        (result: ExportResult) => {
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

  public isInitialized() {
    return this._isInitialized;
  }

  public shutdown() {
    this._longIntervalStatsbeatMeterProvider.shutdown();
  }
}

/**
 * Singleton LongIntervalStatsbeatMetrics instance.
 * @internal
 */
export function getInstance(options: StatsbeatOptions): LongIntervalStatsbeatMetrics {
  if (!instance) {
    instance = new LongIntervalStatsbeatMetrics(options);
  }
  return instance;
}
