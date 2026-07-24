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
import { logLevelToSeverityNumber } from "../utils/logUtils.js";

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
  constructor(config: InternalConfig, metricHandler: MetricHandler) {
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

  /**
   * The console instrumentation patches the global `console` object rather than a
   * required module. It must be disabled explicitly on shutdown/re-initialization
   * to restore the original console methods, so expose it for that purpose.
   */
  public getConsoleInstrumentation(): Instrumentation | undefined {
    return this._consoleInstrumentation;
  }

  /**
   * Start auto collection of telemetry
   */
  private _initializeInstrumentations(): void {
    const logLevelEnv = process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL;

    // A logging level of "NONE" means no logs should be collected from the log
    // instrumentations. Skip registering them entirely rather than encoding
    // "NONE" as a severity threshold: the Bunyan and Winston instrumentations
    // normalize an out-of-range threshold back to a real level (fatal/error) and
    // would still export severe application logs.
    if (logLevelEnv === "NONE") {
      return;
    }

    const logSeverity = logLevelEnv ? logLevelToSeverityNumber(logLevelEnv) : undefined;

    if (this._config.instrumentationOptions.bunyan?.enabled) {
      this._instrumentations.push(
        new BunyanInstrumentation({
          ...this._config.instrumentationOptions.bunyan,
          logSeverity,
        }),
      );
    }
    if (this._config.instrumentationOptions.winston?.enabled) {
      this._instrumentations.push(
        new WinstonInstrumentation({
          ...this._config.instrumentationOptions.winston,
          logSeverity,
        }),
      );
    }
    if (this._config.instrumentationOptions.console?.enabled) {
      // Construct disabled and let the SDK enable it during registration.
      // Enabling ConsoleInstrumentation via its constructor patches console
      // before its field initializers run, wiping the saved originals so
      // disable() can no longer restore console.
      const consoleInstrumentation = new ConsoleInstrumentation({
        ...this._config.instrumentationOptions.console,
        enabled: false,
        logSeverity,
      });
      this._consoleInstrumentation = consoleInstrumentation;
      this._instrumentations.push(consoleInstrumentation);
    }
  }
}
