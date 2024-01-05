// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { logs } from "@opentelemetry/api-logs";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { InternalConfig } from "../shared/config";
import { MetricHandler } from "../metrics/handler";
import { AzureLogRecordProcessor } from "./logRecordProcessor";

/**
 * Azure Monitor OpenTelemetry Log Handler
 */
export class LogHandler {
  private _azureExporter: AzureMonitorLogExporter;
  private _logRecordProcessor: BatchLogRecordProcessor;
  private _metricHandler: MetricHandler;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Distro configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
    this._metricHandler = metricHandler;
    this._azureExporter = new AzureMonitorLogExporter(config.azureMonitorExporterOptions);
    this._logRecordProcessor = new BatchLogRecordProcessor(this._azureExporter);
  }

  public start(): void {
    try {
      const azureLogProccessor = new AzureLogRecordProcessor(this._metricHandler);
      (logs.getLoggerProvider() as LoggerProvider).addLogRecordProcessor(azureLogProccessor);
    } catch (error) {}
  }

  public getLogRecordProcessor(): BatchLogRecordProcessor {
    return this._logRecordProcessor;
  }
}
