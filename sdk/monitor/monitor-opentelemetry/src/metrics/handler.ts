// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Meter, metrics } from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { PerformanceCounterMetrics } from "./performanceCounters";
import { StandardMetrics } from "./standardMetrics";
import { ReadableSpan, Span } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";

/**
 * Azure Monitor OpenTelemetry Metric Handler
 */
export class MetricHandler {
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _otlpExporter?: OTLPMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _perfCounterMetrics?: PerformanceCounterMetrics;
  private _standardMetrics?: StandardMetrics;
  private _config: AzureMonitorOpenTelemetryConfig;

  /**
   * Initializes a new instance of the MetricHandler class.
   * @param config - Distro configuration.
   * @param options - Metric Handler options.
   */
  constructor(config: AzureMonitorOpenTelemetryConfig, options?: { collectionInterval: number }) {
    this._config = config;
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
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterConfig);
    let metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);

    if (config.otlpMetricExporterConfig?.enabled) {
      this._otlpExporter = new OTLPMetricExporter(config.otlpMetricExporterConfig);
      const otlpMetricReader = new PeriodicExportingMetricReader({
        exporter: this._otlpExporter,
        exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
      });
      this._meterProvider.addMetricReader(otlpMetricReader);
    }
    metrics.setGlobalMeterProvider(this._meterProvider);
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
   *Get OpenTelemetry MeterProvider for standard metrics
   */
  public getStandardMetricsMeterProvider(): MeterProvider | undefined {
    return this._standardMetrics?.getMeterProvider();
  }

  /**
   *Get OpenTelemetry MeterProvider for performance counter metrics
   */
  public getPerfCountersMeterProvider(): MeterProvider | undefined {
    return this._perfCounterMetrics?.getMeterProvider();
  }

  public markSpanAsProcessed(span: Span): void {
    this._standardMetrics?.markSpanAsProcessed(span);
  }

  public recordSpan(span: ReadableSpan): void {
    this._standardMetrics?.recordSpan(span);
    this._perfCounterMetrics?.recordSpan(span);
  }

  public recordLog(logRecord: LogRecord): void {
    this._standardMetrics?.recordLog(logRecord);
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
