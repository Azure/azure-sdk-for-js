// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorOpenTelemetryConfig } from "./shared/config";
import { MetricHandler } from "./metrics";
import { TraceHandler } from "./traces/handler";
import { Logger } from "./shared/logging";
import { AzureMonitorOpenTelemetryOptions } from "./shared/types";
import { Meter, TracerProvider } from "@opentelemetry/api";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { Tracer } from "@opentelemetry/sdk-trace-base";

/**
 * Azure Monitor OpenTelemetry Client
 */
export class AzureMonitorOpenTelemetryClient {
  private _config: AzureMonitorOpenTelemetryConfig;
  private _traceHandler: TraceHandler;
  private _metricHandler: MetricHandler;

  /**
   * Initializes a new instance of the AzureMonitorOpenTelemetryClient class.
   * @param options Azure Monitor OpenTelemetry Options
   */
  constructor(options?: AzureMonitorOpenTelemetryOptions) {
    this._config = new AzureMonitorOpenTelemetryConfig(options);
    if (
      !this._config?.azureMonitorExporterConfig?.connectionString ||
      this._config?.azureMonitorExporterConfig?.connectionString === ""
    ) {
      throw new Error(
        "Connection String not found, please provide it before starting Azure Monitor OpenTelemetry Client."
      );
    }
    this._metricHandler = new MetricHandler(this._config);
    this._traceHandler = new TraceHandler(this._config);
  }

  /**
   *Get OpenTelemetry TracerProvider
   */
  public getTraceProvider(): TracerProvider {
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
   *Try to send all queued telemetry if present.
   */
  public async flush(): Promise<void> {
    try {
      await this._traceHandler.flush();
      await this._metricHandler.flush();
    } catch (err) {
      Logger.getInstance().error("Failed to flush telemetry", err);
    }
  }

  /**
   *Shutdown all handlers
   */
  public async shutdown(): Promise<void> {
    this._traceHandler.shutdown();
    this._metricHandler.shutdown();
  }
}
