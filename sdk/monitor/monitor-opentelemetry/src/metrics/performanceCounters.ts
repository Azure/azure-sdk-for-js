// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Meter,
  ObservableCallback,
  ObservableGauge,
  ObservableResult,
  SpanKind,
  ValueType,
} from "@opentelemetry/api";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { ReadableSpan } from "@opentelemetry/sdk-trace-base";
import { SemanticAttributes } from "@opentelemetry/semantic-conventions";

/**
 * Azure Monitor Performance Counter Metrics
 * @internal
 */
export class PerformanceCounterMetrics {
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _requestRateGauge: ObservableGauge;
  private _requestRateGaugeCallback: ObservableCallback;
  private _requestFailureRateGauge: ObservableGauge;
  private _requestFailureRateGaugeCallback: ObservableCallback;
  private _totalCount = 0;
  private _totalFailedCount = 0;
  private _intervalExecutionTime = 0;
  private _lastRequestRate: { count: number; time: number; executionInterval: number };
  private _lastFailureRequestRate: { count: number; time: number; executionInterval: number };
  private _config: AzureMonitorOpenTelemetryConfig;

  /**
   * Initializes a new instance of the PerformanceCounterMetrics class.
   * @param config - Distro configuration.
   * @param options - Preformance Counters options.
   */
  constructor(config: AzureMonitorOpenTelemetryConfig, options?: { collectionInterval: number }) {
    this._config = config;
    const meterProviderConfig: MeterProviderOptions = {
      resource: this._config.resource,
    };
    this._meterProvider = new MeterProvider(meterProviderConfig);
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterConfig);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("AzureMonitorPerformanceCountersMeter");

    this._lastRequestRate = { count: 0, time: 0, executionInterval: 0 };
    this._lastFailureRequestRate = { count: 0, time: 0, executionInterval: 0 };
    this._requestRateGauge = this._meter.createObservableGauge("REQUEST_RATE", {
      description: "Incoming Requests Average Execution Time",
      valueType: ValueType.DOUBLE,
    });
    this._requestFailureRateGauge = this._meter.createObservableGauge("REQUEST_FAILURE_RATE", {
      description: "Incoming Requests Failed Rate",
      valueType: ValueType.DOUBLE,
    });
    this._requestRateGaugeCallback = this._getRequestRate.bind(this);
    this._requestFailureRateGaugeCallback = this._getFailureRequestRate.bind(this);

    this._lastRequestRate = {
      count: this._totalCount,
      time: +new Date(),
      executionInterval: this._intervalExecutionTime,
    };
    this._lastFailureRequestRate = {
      count: this._totalFailedCount,
      time: +new Date(),
      executionInterval: this._intervalExecutionTime,
    };
    this._requestRateGauge.addCallback(this._requestRateGaugeCallback);
    this._requestFailureRateGauge.addCallback(this._requestFailureRateGaugeCallback);
  }

  /**
   * Shutdown Meter Provider it will return no-op Meters after being called.
   */
  public shutdown() {
    this._meterProvider.shutdown();
  }

  /**
   * Force flush Meter Provider.
   */
  public async flush(): Promise<void> {
    await this._meterProvider.forceFlush();
  }

  /**
   * Record Span metrics
   */
  public recordSpan(span: ReadableSpan): void {
    if (span.kind !== SpanKind.SERVER) {
      return;
    }
    const durationMs = span.duration[0];
    let success = false;
    const statusCode = parseInt(String(span.attributes[SemanticAttributes.HTTP_STATUS_CODE]));
    if (!isNaN(statusCode)) {
      success = 0 < statusCode && statusCode < 500;
    }

    if (success) {
      this._totalCount++;
    } else {
      this._totalFailedCount++;
    }
    this._intervalExecutionTime += durationMs;
  }

  private _getRequestRate(observableResult: ObservableResult) {
    const currentTime = +new Date();
    const intervalRequests = this._totalCount - this._lastRequestRate.count || 0;
    const elapsedMs = currentTime - this._lastRequestRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const requestsPerSec = intervalRequests / elapsedSeconds;
      observableResult.observe(requestsPerSec);
    }
    this._lastRequestRate = {
      count: this._totalCount,
      time: currentTime,
      executionInterval: this._lastRequestRate.executionInterval,
    };
  }

  private _getFailureRequestRate(observableResult: ObservableResult) {
    const currentTime = +new Date();
    const intervalRequests = this._totalFailedCount - this._lastFailureRequestRate.count || 0;
    const elapsedMs = currentTime - this._lastFailureRequestRate.time;
    if (elapsedMs > 0) {
      const elapsedSeconds = elapsedMs / 1000;
      const requestsPerSec = intervalRequests / elapsedSeconds;
      observableResult.observe(requestsPerSec);
    }
    this._lastFailureRequestRate = {
      count: this._totalFailedCount,
      time: currentTime,
      executionInterval: this._lastFailureRequestRate.executionInterval,
    };
  }
}
