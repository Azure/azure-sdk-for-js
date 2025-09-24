// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import type { PeriodicExportingMetricReaderOptions, ViewOptions } from "@opentelemetry/sdk-metrics";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";
import type { InternalConfig } from "../shared/config.js";
import { StandardMetrics } from "./standardMetrics.js";
import type { ReadableSpan, Span } from "@opentelemetry/sdk-trace-base";
import { APPLICATION_INSIGHTS_NO_STANDARD_METRICS } from "./types.js";
import { LiveMetrics } from "./quickpulse/liveMetrics.js";
import { PerformanceCounterMetrics } from "./performanceCounters.js";

/**
 * Azure Monitor OpenTelemetry Metric Handler
 */
export class MetricHandler {
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;
  private _standardMetrics?: StandardMetrics;
  private _performanceCounters?: PerformanceCounterMetrics;
  private _liveMetrics?: LiveMetrics;
  private _config: InternalConfig;
  private _views: ViewOptions[];

  /**
   * Initializes a new instance of the MetricHandler class.
   * @param config - Distro configuration.
   * @param options - Metric Handler options.
   */
  constructor(config: InternalConfig) {
    const defaultInterval = 60000;
    this._config = config;
    // Adding Views of instrumentations will allow customer to add Metric Readers after, and get access to previously created metrics using the views shared state
    this._views = [];
    if (config.instrumentationOptions.azureSdk?.enabled) {
      this._views.push({ meterName: "@azure/opentelemetry-instrumentation-azure-sdk" });
    }
    if (config.instrumentationOptions.http?.enabled) {
      this._views.push({ meterName: "@azure/opentelemetry-instrumentation-http" });
    }
    if (config.instrumentationOptions.mongoDb?.enabled) {
      this._views.push({ meterName: "@azure/opentelemetry-instrumentation-mongodb" });
    }
    if (config.instrumentationOptions.mySql?.enabled) {
      this._views.push({ meterName: "@opentelemetry/instrumentation-mysql" });
    }
    if (config.instrumentationOptions.postgreSql?.enabled) {
      this._views.push({ meterName: "@opentelemetry/instrumentation-pg" });
    }
    if (config.instrumentationOptions.redis4?.enabled) {
      this._views.push({ meterName: "@opentelemetry/instrumentation-redis-4" });
    }
    if (config.instrumentationOptions.redis?.enabled) {
      this._views.push({ meterName: "@azure/opentelemetry-instrumentation-redis" });
    }
    this._azureExporter = new AzureMonitorMetricExporter(this._config.azureMonitorExporterOptions);
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: this._config.metricExportIntervalMillis || defaultInterval,
    };
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);

    if (
      this._config.enableStandardMetrics &&
      !process.env[APPLICATION_INSIGHTS_NO_STANDARD_METRICS]
    ) {
      this._standardMetrics = new StandardMetrics(this._config);
    }
    if (this._config.enableLiveMetrics) {
      this._liveMetrics = new LiveMetrics(this._config);
    }
    if (this._config.enablePerformanceCounters) {
      this._performanceCounters = new PerformanceCounterMetrics(this._config);
    }
  }

  public getMetricReader(): PeriodicExportingMetricReader {
    return this._metricReader;
  }

  public getViews(): ViewOptions[] {
    return this._views;
  }

  public markSpanAsProcessed(span: Span): void {
    this._standardMetrics?.markSpanAsProcessed(span);
  }

  public recordSpan(span: ReadableSpan): void {
    this._standardMetrics?.recordSpan(span);
    this._liveMetrics?.recordSpan(span);
    this._performanceCounters?.recordSpan(span);
  }

  public recordLog(logRecord: SdkLogRecord): void {
    this._standardMetrics?.recordLog(logRecord);
    this._liveMetrics?.recordLog(logRecord);
    this._performanceCounters?.recordLog(logRecord);
  }

  /**
   * Shutdown handler
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  public async shutdown(): Promise<void> {
    this._standardMetrics?.shutdown();
    this._liveMetrics?.shutdown();
    this._performanceCounters?.shutdown();
  }
}
