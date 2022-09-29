// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Meter } from "@opentelemetry/api-metrics";
import { MeterProvider, MeterProviderOptions, PeriodicExportingMetricReader, PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics-base";
import { AzureExporterConfig } from "@azure/monitor-opentelemetry-exporter";
import { AzureMonitorMetricExporter } from "../metric";
import { StatsbeatMetrics } from "./statsbeatMetrics"

export class StatsbeatMetricsHandler {
  private _statsbeatMetrics: StatsbeatMetrics;
  private _meterProvider: MeterProvider;
  private _meter: Meter;
  private _metricReader: PeriodicExportingMetricReader;
  private _azureExporter: AzureMonitorMetricExporter;
  private _config: AzureExporterConfig;

  constructor(config: AzureExporterConfig) {
    this._config = config;
    const meterProviderConfig: MeterProviderOptions = {
      // TODO: Figure out what to pass to create the MeterProvider as the ResourceManager class is not defined here.
    }
    this._meterProvider = new MeterProvider(meterProviderConfig);

    const exporterConfig: AzureExporterConfig = {
      connectionString: this._config.connectionString,
      aadTokenCredential: this._config.aadTokenCredential
    };

    this._azureExporter = new AzureMonitorMetricExporter(exporterConfig);
    
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      // TODO: Should I create a statsbeatExporter for this, or can I use the AzureMonitorMetricExporter in metric.ts?
      exporter: this._azureExporter as any,
      exportIntervalMillis: 900000 // 15 minutes
    };

    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("NetworkStatsbeat");

    // TODO: InstrumentationKey and endpoint are defined on AzureExporterInternalConfig, but not AzureExporterConfig, need to figure out which to use.
    this._statsbeatMetrics = new StatsbeatMetrics(this._meter, instrumentationKey, endpoint);
  }

  public start() {
    this._statsbeatMetrics.enable(true);
  }

  public shutdown() {
    this._meterProvider.shutdown();
  }
}
