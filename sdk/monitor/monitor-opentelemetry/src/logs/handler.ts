// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { logs } from "@opentelemetry/api-logs";
import { Instrumentation } from "@opentelemetry/instrumentation";
import { BunyanInstrumentation } from "@opentelemetry/instrumentation-bunyan";
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
  private _config: InternalConfig;
  private _instrumentations: Instrumentation[];

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Distro configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
    this._config = config;
    this._metricHandler = metricHandler;
    this._azureExporter = new AzureMonitorLogExporter(config.azureMonitorExporterOptions);
    this._logRecordProcessor = new BatchLogRecordProcessor(this._azureExporter);
    this._instrumentations = [];
    this._initializeInstrumentations();
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

  public getInstrumentations(): Instrumentation[] {
    return this._instrumentations;
  }

  /**
   * Start auto collection of telemetry
   */
  private _initializeInstrumentations() {
    if (this._config.instrumentationOptions.bunyan?.enabled) {
      this._instrumentations.push(
        new BunyanInstrumentation(this._config.instrumentationOptions.bunyan)
      );
    }
  }
}
