// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  LoggerProvider,
  LoggerConfig,
  SimpleLogRecordProcessor,
  Logger as OtelLogger,
  ConsoleLogRecordExporter,
} from "@opentelemetry/sdk-logs";
import { LoggerProviderConfig } from "@opentelemetry/sdk-logs/build/src/types";
import { AzureMonitorOpenTelemetryConfig } from "../shared/config";
import { MetricHandler } from "../metrics/handler";

/**
 * Azure Monitor OpenTelemetry Log Handler
 */
export class LogHandler {
  private _loggerProvider: LoggerProvider;
  private _logger: OtelLogger;
  private _exporter: ConsoleLogRecordExporter;
  private _logRecordProcessor: SimpleLogRecordProcessor;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(
    private _config: AzureMonitorOpenTelemetryConfig,
    private _metricHandler?: MetricHandler
  ) {
    const loggerProviderConfig: LoggerProviderConfig = {
      resource: this._config.resource,
    };
    this._loggerProvider = new LoggerProvider(loggerProviderConfig);
    this._exporter = new ConsoleLogRecordExporter();
    this._logRecordProcessor = new SimpleLogRecordProcessor(this._exporter);
    this._loggerProvider.addLogRecordProcessor(this._logRecordProcessor);
    const loggerConfig: LoggerConfig = {
      includeTraceContext: true,
    };
    this._logger = this._loggerProvider.getLogger(
      "AzureMonitorLogger",
      undefined,
      loggerConfig
    ) as OtelLogger;
    if (this._metricHandler) {
      // TODO: Use metric handler to track standard metrics
    }
  }

  /**
   *Get OpenTelemetry LoggerProvider
   */
  public getLoggerProvider(): LoggerProvider {
    return this._loggerProvider;
  }

  /**
   *Get OpenTelemetry Logger
   */
  public getLogger(): OtelLogger {
    return this._logger;
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
