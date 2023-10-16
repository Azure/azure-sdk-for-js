// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { logs } from "@opentelemetry/api-logs";
import { LoggerProvider, BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { LoggerProviderConfig } from "@opentelemetry/sdk-logs/build/src/types";
import { InternalConfig } from "../shared/config";
import { MetricHandler } from "../metrics/handler";
import { AzureLogRecordProcessor } from "./logRecordProcessor";

/**
 * Azure Monitor OpenTelemetry Log Handler
 */
export class LogHandler {
  private _loggerProvider: LoggerProvider;
  private _azureExporter: AzureMonitorLogExporter;
  private _logRecordProcessor: BatchLogRecordProcessor;
  private _config: InternalConfig;
  private _metricHandler?: MetricHandler;
  private _azureLogProccessor: AzureLogRecordProcessor;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Distro configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
    this._config = config;
    this._metricHandler = metricHandler;
    const loggerProviderConfig: LoggerProviderConfig = {
      resource: this._config.resource,
    };
    this._loggerProvider = new LoggerProvider(loggerProviderConfig);
    this._azureExporter = new AzureMonitorLogExporter(this._config.azureMonitorExporterOptions);
    // Log Processor could be configured through env variables
    // https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#batch-logrecord-processor
    this._logRecordProcessor = new BatchLogRecordProcessor(this._azureExporter);
    this._loggerProvider.addLogRecordProcessor(this._logRecordProcessor);
    this._azureLogProccessor = new AzureLogRecordProcessor(this._metricHandler);
    this._loggerProvider.addLogRecordProcessor(this._azureLogProccessor);
    logs.setGlobalLoggerProvider(this._loggerProvider);
  }

  /**
   * Shutdown handler, all Logger providers will return no-op Loggers
   */
  public async shutdown(): Promise<void> {
    await this._loggerProvider.shutdown();
  }

  /**
   * Force flush Logger Provider
   */
  public async flush(): Promise<void> {
    return this._loggerProvider.forceFlush();
  }
}
