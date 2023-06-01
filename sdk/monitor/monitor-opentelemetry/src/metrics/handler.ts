// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Meter } from "@opentelemetry/api";
import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { _PerformanceCounterMetrics } from "./performanceCounters";
import { _StandardMetrics } from "./standardMetrics";
import { _NativeMetrics } from "./nativeMetrics";

/**
 * Azure Monitor OpenTelemetry Metric Handler
 */
export class MetricHandler {
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _perfCounterMetrics?: _PerformanceCounterMetrics;
  private _standardMetrics?: _StandardMetrics;
  private _nativeMetrics?: _NativeMetrics;

  /**
   * Initializes a new instance of the MetricHandler class.
   * @param _config - Configuration.
   */
  constructor(private _config: AzureMonitorOpenTelemetryConfig) {
    if (this._config.enableAutoCollectStandardMetrics) {
      this._standardMetrics = new _StandardMetrics(this._config);
    }
    if (this._config.enableAutoCollectPerformance) {
      this._perfCounterMetrics = new _PerformanceCounterMetrics(this._config);
    }
    if (this._config.enableAutoCollectNativeMetrics) {
      this._nativeMetrics = new _NativeMetrics(this._config);
    }
    const meterProviderConfig: MeterProviderOptions = {
      resource: this._config.resource,
    };
    this._meterProvider = new MeterProvider(meterProviderConfig);
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterConfig);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("AzureMonitorMeter");
  }

  /**
   *Get OpenTelemetry MeterProvider
   */
  public getMeterProvider(): MeterProvider {
    return this._meterProvider;
  }

  /**
   *Get OpenTelemetry Meter
   */
  public getMeter(): Meter {
    return this._meter;
  }

  /**
   *Get StandardMetric handler
   * @internal
   */
  public _getStandardMetrics(): _StandardMetrics | undefined {
    return this._standardMetrics;
  }

  /**
   *Get PerformanceCounter handler
   * @internal
   */
  public _getPerformanceCounterMetrics(): _PerformanceCounterMetrics | undefined {
    return this._perfCounterMetrics;
  }

  /**
   * Shutdown handler, all Meter providers will return no-op Meters
   */
  public async shutdown(): Promise<void> {
    this._meterProvider.shutdown();
    this._perfCounterMetrics?.shutdown();
    this._standardMetrics?.shutdown();
    this._nativeMetrics?.shutdown();
  }

  /**
   * Force flush all Meter Providers
   */
  public async flush(): Promise<void> {
    await this._meterProvider.forceFlush();
    await this._perfCounterMetrics?.flush();
    await this._standardMetrics?.flush();
    await this._nativeMetrics?.flush();
  }
}
