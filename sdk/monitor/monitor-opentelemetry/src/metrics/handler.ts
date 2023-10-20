// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import {
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
  View,
} from "@opentelemetry/sdk-metrics";
import { InternalConfig } from "../shared/config";
import { StandardMetrics } from "./standardMetrics";
import { ReadableSpan, Span } from "@opentelemetry/sdk-trace-base";
import { LogRecord } from "@opentelemetry/sdk-logs";
import { APPLICATION_INSIGHTS_NO_STANDARD_METRICS } from "./types";

/**
 * Azure Monitor OpenTelemetry Metric Handler
 */
export class MetricHandler {
  private _collectionInterval = 60000; // 60 seconds
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _standardMetrics?: StandardMetrics;
  private _config: InternalConfig;
  private _views: View[];

  /**
   * Initializes a new instance of the MetricHandler class.
   * @param config - Distro configuration.
   * @param options - Metric Handler options.
   */
  constructor(config: InternalConfig, options?: { collectionInterval: number }) {
    this._config = config;
    // Adding Views of instrumentations will allow customer to add Metric Readers after, and get access to previously created metrics using the views shared state
    this._views = [];
    if (config.instrumentationOptions.azureSdk?.enabled) {
      this._views.push(new View({ meterName: "@azure/opentelemetry-instrumentation-azure-sdk" }));
    }
    if (config.instrumentationOptions.http?.enabled) {
      this._views.push(new View({ meterName: "@azure/opentelemetry-instrumentation-http" }));
    }
    if (config.instrumentationOptions.mongoDb?.enabled) {
      this._views.push(new View({ meterName: "@azure/opentelemetry-instrumentation-mongodb" }));
    }
    if (config.instrumentationOptions.mySql?.enabled) {
      this._views.push(new View({ meterName: "@opentelemetry/instrumentation-mysql" }));
    }
    if (config.instrumentationOptions.postgreSql?.enabled) {
      this._views.push(new View({ meterName: "@opentelemetry/instrumentation-pg" }));
    }
    if (config.instrumentationOptions.redis4?.enabled) {
      this._views.push(new View({ meterName: "@opentelemetry/instrumentation-redis-4" }));
    }
    if (config.instrumentationOptions.redis?.enabled) {
      this._views.push(new View({ meterName: "@azure/opentelemetry-instrumentation-redis" }));
    }
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterOptions);
    let metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: options?.collectionInterval || this._collectionInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);

    if (!process.env[APPLICATION_INSIGHTS_NO_STANDARD_METRICS]) {
      this._standardMetrics = new StandardMetrics(this._config);
    }
  }

  public getMetricReader(): PeriodicExportingMetricReader {
    return this._metricReader;
  }

  public getViews(): View[] {
    return this._views;
  }

  public markSpanAsProcessed(span: Span): void {
    this._standardMetrics?.markSpanAsProcessed(span);
  }

  public recordSpan(span: ReadableSpan): void {
    this._standardMetrics?.recordSpan(span);
  }

  public recordLog(logRecord: LogRecord): void {
    this._standardMetrics?.recordLog(logRecord);
  }

  /**
   * Shutdown handler
   */
  public async shutdown(): Promise<void> {
    this._standardMetrics?.shutdown();
  }
}
