// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Meter } from "@opentelemetry/api-metrics";
import { MeterProvider, MeterProviderOptions, PeriodicExportingMetricReader, PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics-base";
import { StatsbeatMetrics } from "./statsbeatMetrics"

export class StatsbeatMetricsHandler {
  private _statsbeatMetrics: StatsbeatMetrics;
  private _meterProvider: MeterProvider;
  private _meter: Meter;
  private _metricReader: PeriodicExportingMetricReader;

  constructor(instrumentationKey: string, endpoint: string) {
    const meterProviderConfig: MeterProviderOptions = {
      // TODO: Figure out what to pass to create the MeterProvider as the ResourceManager class is not defined here.
    }
    this._meterProvider = new MeterProvider(meterProviderConfig);
    
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: {},// TODO: Should I create a statsbeatExporter for this?
      exportIntervalMillis: 900000 // 15 minutes
    };

    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("NetworkStatsbeat");

    this._statsbeatMetrics = new StatsbeatMetrics(this._meter, instrumentationKey, endpoint);
  }

  public start() {
    this._statsbeatMetrics.enable(true);
  }

  public shutdown() {
    this._meterProvider.shutdown();
  }
}
