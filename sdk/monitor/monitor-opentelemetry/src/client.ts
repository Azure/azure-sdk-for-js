// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorOpenTelemetryConfig } from "./shared/config";
import { MetricHandler } from "./metrics";
import { TraceHandler } from "./traces/handler";
import { Logger } from "./shared/logging";

/**
 * Azure Monitor OpenTelemetry Client
 */
export class AzureMonitorOpenTelemetryClient {
  private _config: AzureMonitorOpenTelemetryConfig;
  private _traceHandler: TraceHandler;
  private _metricHandler: MetricHandler;

  /**
   * Initializes a new instance of the AzureMonitorOpenTelemetryClient class.
   * @param config Configuration
   */
  constructor(config?: AzureMonitorOpenTelemetryConfig) {
    this._config = config || new AzureMonitorOpenTelemetryConfig();
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
   *Get TraceHandler
   */
  public getTraceHandler(): TraceHandler {
    return this._traceHandler;
  }

  /**
   *Get MetricHandler
   */
  public getMetricHandler(): MetricHandler {
    return this._metricHandler;
  }

  /**
   *Get Configuration
   */
  public getConfig(): AzureMonitorOpenTelemetryConfig {
    return this._config;
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
