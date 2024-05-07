// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { Instrumentation } from "@opentelemetry/instrumentation";
import { BunyanInstrumentation } from "@opentelemetry/instrumentation-bunyan";
import { WinstonInstrumentation } from "@opentelemetry/instrumentation-winston";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { InternalConfig } from "../shared/config";
import { MetricHandler } from "../metrics/handler";
import { AzureLogRecordProcessor } from "./logRecordProcessor";
import { AzureBatchLogRecordProcessor } from "./batchLogRecordProcessor";

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
   * Start auto collection of telemetry
   */
  private _initializeInstrumentations() {
    if (this._config.instrumentationOptions.bunyan?.enabled) {
      this._instrumentations.push(
        new BunyanInstrumentation(this._config.instrumentationOptions.bunyan),
      );
    }
    if (this._config.instrumentationOptions.winston?.enabled) {
      this._instrumentations.push(
        new WinstonInstrumentation(this._config.instrumentationOptions.winston),
      );
    }
  }
}
