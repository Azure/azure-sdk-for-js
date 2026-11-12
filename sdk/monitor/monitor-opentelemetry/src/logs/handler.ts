// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import type { Instrumentation } from "@opentelemetry/instrumentation";
import { BunyanInstrumentation } from "@opentelemetry/instrumentation-bunyan";
import { ConsoleInstrumentation } from "@opentelemetry/instrumentation-console";
import { WinstonInstrumentation } from "@opentelemetry/instrumentation-winston";
import type { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import type { InternalConfig } from "../shared/config.js";
import type { MetricHandler } from "../metrics/handler.js";
import { AzureLogRecordProcessor } from "./logRecordProcessor.js";
import { AzureBatchLogRecordProcessor } from "./batchLogRecordProcessor.js";
import { isLogCollectionDisabled, logLevelToSeverityNumber } from "../utils/logUtils.js";
import { configureInstrumentation } from "../utils/instrumentation.js";

/**
 * Azure Monitor OpenTelemetry Log Handler
 */
export class LogHandler {
  private _azureExporter: AzureMonitorLogExporter;
  private _azureLogRecordProcessor: AzureLogRecordProcessor;
  private _azureBatchLogRecordProcessor: AzureBatchLogRecordProcessor;
  private _metricHandler: MetricHandler;
  private _config: InternalConfig;
  private _instrumentations: Instrumentation[];
  private _consoleInstrumentation: Instrumentation | undefined;

  /**
   * Initializes a new instance of the TraceHandler class.
   * @param _config - Distro configuration.
   * @param _metricHandler - MetricHandler.
   */
  constructor(
    config: InternalConfig,
    metricHandler: MetricHandler,
    private readonly instrumentationCache?: Map<string, Instrumentation>,
  ) {
    this._config = config;
    this._metricHandler = metricHandler;
    this._azureExporter = new AzureMonitorLogExporter(config.azureMonitorExporterOptions);
    this._azureBatchLogRecordProcessor = new AzureBatchLogRecordProcessor(this._azureExporter, {
      enableTraceBasedSamplingForLogs: this._config.enableTraceBasedSamplingForLogs,
    });
    this._azureLogRecordProcessor = new AzureLogRecordProcessor(this._metricHandler);
    this._instrumentations = [];
    this._initializeInstrumentations();
  }

  public getAzureLogRecordProcessor(): AzureLogRecordProcessor {
    return this._azureLogRecordProcessor;
  }

  public getBatchLogRecordProcessor(): BatchLogRecordProcessor {
    return this._azureBatchLogRecordProcessor;
  }

  public getInstrumentations(): Instrumentation[] {
    return this._instrumentations;
  }

  /** Returns the console instrumentation for explicit lifecycle management. */
  public getConsoleInstrumentation(): Instrumentation | undefined {
    return this._consoleInstrumentation;
  }

  /**
   * Start auto collection of telemetry
   */
  private _initializeInstrumentations(): void {
    if (isLogCollectionDisabled()) {
      return;
    }

    const logLevelEnv = process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL;
    const logSeverity = logLevelEnv ? logLevelToSeverityNumber(logLevelEnv) : undefined;

    if (this._config.instrumentationOptions.bunyan?.enabled) {
      this._instrumentations.push(
        configureInstrumentation(
          this.instrumentationCache,
          "bunyan",
          {
            ...this._config.instrumentationOptions.bunyan,
            logSeverity,
          },
          (options) => new BunyanInstrumentation(options),
        ),
      );
    }
    if (this._config.instrumentationOptions.winston?.enabled) {
      this._instrumentations.push(
        configureInstrumentation(
          this.instrumentationCache,
          "winston",
          {
            ...this._config.instrumentationOptions.winston,
            logSeverity,
          },
          (options) => new WinstonInstrumentation(options),
        ),
      );
    }
    const consoleOptions = this._config.instrumentationOptions.console;
    if (consoleOptions?.enabled) {
      // Defer patching until registration so construction preserves the original methods.
      // Console patches globals rather than module hooks and caches its logger,
      // so each SDK lifetime needs a fresh instance.
      const consoleInstrumentation = new ConsoleInstrumentation({
        ...consoleOptions,
        enabled: false,
        logSeverity: consoleOptions.logSeverity ?? logSeverity,
      });
      this._consoleInstrumentation = consoleInstrumentation;
      this._instrumentations.push(consoleInstrumentation);
    }
  }
}
