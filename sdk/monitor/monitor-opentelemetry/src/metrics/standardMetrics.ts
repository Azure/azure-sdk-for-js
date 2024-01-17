// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MeterProvider,
  MeterProviderOptions,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "../shared/config";
import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { Counter, Histogram, Meter, SpanKind, ValueType } from "@opentelemetry/api";
import { ReadableSpan, Span, TimedEvent } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import {
  getDependencyDimensions,
  getExceptionDimensions,
  getRequestDimensions,
  getTraceDimensions,
  isExceptionTelemetry,
  isTraceTelemetry,
} from "./utils";

/**
 * Azure Monitor Standard Metrics
 * @internal
 */
export class StandardMetrics {
  private _config: InternalConfig;
  private _collectionInterval = 60000; // 60 seconds
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _meter: Meter;
  private _incomingRequestDurationHistogram: Histogram;
  private _outgoingRequestDurationHistogram: Histogram;
  private _exceptionsCounter: Counter;
  private _tracesCounter: Counter;

  /**
   * Initializes a new instance of the StandardMetrics class.
   * @param config - Distro configuration.
   * @param options - Standard Metrics options.
   */
  constructor(config: InternalConfig, options?: { collectionInterval: number }) {
    this._config = config;
    const meterProviderConfig: MeterProviderOptions = {
      resource: this._config.resource,
    };
    this._meterProvider = new MeterProvider(meterProviderConfig);
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterOptions);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("AzureMonitorStandardMetricsMeter");
    this._incomingRequestDurationHistogram = this._meter.createHistogram(
      "azureMonitor.http.requestDuration",
      {
        valueType: ValueType.DOUBLE,
      },
    );
    this._outgoingRequestDurationHistogram = this._meter.createHistogram(
      "azureMonitor.http.dependencyDuration",
      {
        valueType: ValueType.DOUBLE,
      },
    );

    this._exceptionsCounter = this._meter.createCounter("azureMonitor.exceptionCount", {
      valueType: ValueType.INT,
    });
    this._tracesCounter = this._meter.createCounter("azureMonitor.traceCount", {
      valueType: ValueType.INT,
    });
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
   *Get OpenTelemetry MeterProvider
   */
  public getMeterProvider(): MeterProvider {
    return this._meterProvider;
  }

  /**
   * Add extra attributes to Span so Ingestion doesn't aggregate the data again
   * @internal
   */
  public markSpanAsProcessed(span: Span): void {
    if (span.kind === SpanKind.CLIENT) {
      span.setAttributes({
        "_MS.ProcessedByMetricExtractors": "(Name:'Dependencies', Ver:'1.1')",
      });
    } else if (span.kind === SpanKind.SERVER) {
      span.setAttributes({
        "_MS.ProcessedByMetricExtractors": "(Name:'Requests', Ver:'1.1')",
      });
    }
  }

  /**
   * Record Span metrics
   * @internal
   */
  public recordSpan(span: ReadableSpan): void {
    const durationMs = span.duration[0];
    if (span.kind === SpanKind.SERVER) {
      this._incomingRequestDurationHistogram.record(durationMs, getRequestDimensions(span));
    } else {
      this._outgoingRequestDurationHistogram.record(durationMs, getDependencyDimensions(span));
    }
    if (span.events) {
      span.events.forEach((event: TimedEvent) => {
        event.attributes = event.attributes || {};
        if (event.name === "exception") {
          event.attributes["_MS.ProcessedByMetricExtractors"] = "(Name:'Exceptions', Ver:'1.1')";
          this._exceptionsCounter.add(1, getExceptionDimensions(span.resource));
        } else {
          event.attributes["_MS.ProcessedByMetricExtractors"] = "(Name:'Traces', Ver:'1.1')";
          this._tracesCounter.add(1, getTraceDimensions(span.resource));
        }
      });
    }
  }

  /**
   * Record LogRecord metrics, add attribute so data is not aggregated again in ingestion
   * @internal
   */
  public recordLog(logRecord: LogRecord): void {
    if (isExceptionTelemetry(logRecord)) {
      logRecord.setAttribute("_MS.ProcessedByMetricExtractors", "(Name:'Exceptions', Ver:'1.1')");
      this._exceptionsCounter.add(1, getExceptionDimensions(logRecord.resource));
    } else if (isTraceTelemetry(logRecord)) {
      logRecord.setAttribute("_MS.ProcessedByMetricExtractors", "(Name:'Traces', Ver:'1.1')");
      this._tracesCounter.add(1, getTraceDimensions(logRecord.resource));
    }
  }
}
