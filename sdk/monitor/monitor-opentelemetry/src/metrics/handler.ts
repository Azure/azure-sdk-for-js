// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureMonitorExporterOptions,
  AzureMonitorMetricExporter,
} from "@azure/monitor-opentelemetry-exporter";
import { Meter } from "@opentelemetry/api";
import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorOpenTelemetryConfig } from "../config";
import { PerformanceCounterMetrics } from "./performanceCounters";
import { StandardMetrics } from "./standardMetrics";

/**
 * Azure Monitor OpenTelemetry Metric Handler
 */
export class MetricHandler {
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _perfCounterMetrics?: PerformanceCounterMetrics;
  private _standardMetrics?: StandardMetrics;

  /**
   * Initializes a new instance of the MetricHandler class.
   * @param _config - Configuration.
   */
  constructor(private _config: AzureMonitorOpenTelemetryConfig) {
    if (this._config.enableAutoCollectStandardMetrics) {
      this._standardMetrics = new StandardMetrics(this._config);
    }
    if (this._config.enableAutoCollectPerformance) {
      this._perfCounterMetrics = new PerformanceCounterMetrics(this._config);
    }

    const meterProviderConfig: MeterProviderOptions = {
      resource: this._config.resource,
    };
    this._meterProvider = new MeterProvider(meterProviderConfig);
    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: this._config.connectionString,
      aadTokenCredential: this._config.aadTokenCredential,
      storageDirectory: this._config.storageDirectory,
      disableOfflineStorage: this._config.disableOfflineStorage,
    };
    this._azureExporter = new AzureMonitorMetricExporter(exporterConfig);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("AzureMonitorMeter");
  }

  /**
   *Get OpenTelemetry Meter
   */
  public getMeter(): Meter {
    return this._meter;
  }

  /**
   * Start auto collection of telemetry
   */
  public start() {
    this._perfCounterMetrics?.start();
    this._standardMetrics?.start();
  }

  /**
   * Shutdown handler, all Meter providers will return no-op Meters
   */
  public async shutdown(): Promise<void> {
    this._meterProvider.shutdown();
    this._perfCounterMetrics?.shutdown();
    this._standardMetrics?.shutdown();
  }

  /**
   * Force flush all Meter Providers
   */
  public async flush(): Promise<void> {
    await this._meterProvider.forceFlush();
    await this._perfCounterMetrics?.flush();
    await this._standardMetrics?.flush();
  }
}
