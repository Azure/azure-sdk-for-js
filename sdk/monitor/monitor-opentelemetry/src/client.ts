// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Meter, TracerProvider } from "@opentelemetry/api";
import { LoggerProvider, Logger } from "@opentelemetry/sdk-logs";
import { Tracer } from "@opentelemetry/sdk-trace-base";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { AzureMonitorOpenTelemetryConfig } from "./shared/config";
import { MetricHandler } from "./metrics";
import { TraceHandler } from "./traces/handler";
import { Logger as InternalLogger } from "./shared/logging";
import { AzureMonitorOpenTelemetryOptions } from "./shared/types";
import { LogHandler } from "./logs";
import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatInstrumentation,
} from "./types";

/**
 * Azure Monitor OpenTelemetry Client
 */
export class AzureMonitorOpenTelemetryClient {
  private _config: AzureMonitorOpenTelemetryConfig;
  private _traceHandler: TraceHandler;
  private _metricHandler: MetricHandler;
  private _logHandler: LogHandler;

  /**
   * Initializes a new instance of the AzureMonitorOpenTelemetryClient class.
   * @param options Azure Monitor OpenTelemetry Options
   */
  constructor(options?: AzureMonitorOpenTelemetryOptions) {
    this._config = new AzureMonitorOpenTelemetryConfig(options);
    this._setStatsbeatFeatures();
    this._metricHandler = new MetricHandler(this._config);
    this._traceHandler = new TraceHandler(this._config, this._metricHandler);
    this._logHandler = new LogHandler(this._config, this._metricHandler);
  }

  /**
   *Get OpenTelemetry TracerProvider
   */
  public getTracerProvider(): TracerProvider {
    return this._traceHandler.getTracerProvider();
  }

  /**
   *Get OpenTelemetry TracerProvider
   */
  public getTracer(): Tracer {
    return this._traceHandler.getTracer();
  }

  /**
   *Get OpenTelemetry MeterProvider
   */
  public getMeterProvider(): MeterProvider {
    return this._metricHandler.getMeterProvider();
  }

  /**
   *Get OpenTelemetry Meter
   */
  public getMeter(): Meter {
    return this._metricHandler.getMeter();
  }

  /**
   *Get OpenTelemetry LoggerProvider
   */
  public getLoggerProvider(): LoggerProvider {
    return this._logHandler.getLoggerProvider();
  }

  /**
   *Get OpenTelemetry Logger
   */
  public getLogger(): Logger {
    return this._logHandler.getLogger();
  }

  /**
   *Try to send all queued telemetry if present.
   */
  public async flush(): Promise<void> {
    try {
      await this._traceHandler.flush();
      await this._metricHandler.flush();
      await this._logHandler.flush();
    } catch (err) {
      InternalLogger.getInstance().error("Failed to flush telemetry", err);
    }
  }

  /**
   *Shutdown all handlers
   */
  public async shutdown(): Promise<void> {
    this._traceHandler.shutdown();
    this._metricHandler.shutdown();
    this._logHandler.shutdown();
  }

  private _setStatsbeatFeatures() {
    let instrumentationBitMap = 0;
    if (this._config.instrumentationOptions?.azureSdk?.enabled) {
      instrumentationBitMap |= StatsbeatInstrumentation.AZURE_CORE_TRACING;
    }
    if (this._config.instrumentationOptions?.mongoDb?.enabled) {
      instrumentationBitMap |= StatsbeatInstrumentation.MONGODB;
    }
    if (this._config.instrumentationOptions?.mySql?.enabled) {
      instrumentationBitMap |= StatsbeatInstrumentation.MYSQL;
    }
    if (this._config.instrumentationOptions?.postgreSql?.enabled) {
      instrumentationBitMap |= StatsbeatInstrumentation.POSTGRES;
    }
    if (this._config.instrumentationOptions?.redis?.enabled) {
      instrumentationBitMap |= StatsbeatInstrumentation.REDIS;
    }

    let featureBitMap = 0;
    featureBitMap |= StatsbeatFeature.DISTRO;

    try {
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: instrumentationBitMap,
        feature: featureBitMap,
      });
    } catch (error) {
      InternalLogger.getInstance().error("Failed call to JSON.stringify.", error);
    }
  }
}
