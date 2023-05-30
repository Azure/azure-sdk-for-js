// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "./base";
import { TelemetryItem as Envelope } from "../generated";
import { logToEnvelope } from "../utils/logUtils";
import { AzureMonitorExporterOptions } from "../config";

import type { ReadableLogRecord, LogRecordExporter } from "@opentelemetry/sdk-logs";

/**
 * Azure Monitor OpenTelemetry Log Exporter.
 */
export class AzureMonitorLogExporter extends AzureMonitorBaseExporter implements LogRecordExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;
  /**
   * Initializes a new instance of the AzureMonitorLogExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
    diag.debug("AzureMonitorLogExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry logs.
   * @param logs - Logs to export.
   * @param resultCallback - Result callback.
   */
  public async export(logs: ReadableLogRecord[], resultCallback: (result: ExportResult) => void) {
    if (this._isShutdown) {
      diag.info("Exporter shut down. Failed to export spans.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }
    diag.info(`Exporting ${logs.length} logs(s). Converting to envelopes...`);

    let envelopes: Envelope[] = [];
    logs.forEach((log) => {
      let envelope = logToEnvelope(log, this._instrumentationKey);
      if (envelope) {
        envelopes.push(envelope);
      }
    });
    resultCallback(await this._exportEnvelopes(envelopes));
  }

  /**
   * Shutdown AzureMonitorLogExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorLogExporter shutting down");
    return this._shutdown();
  }
}
