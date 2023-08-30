// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { context, diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode, suppressTracing } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "./base";
import { TelemetryItem as Envelope } from "../generated";
import { logToEnvelope } from "../utils/logUtils";
import { AzureMonitorExporterOptions } from "../config";

import type { ReadableLogRecord, LogRecordExporter } from "@opentelemetry/sdk-logs";
import { HttpSender } from "../platform";

/**
 * Azure Monitor OpenTelemetry Log Exporter.
 */
export class AzureMonitorLogExporter extends AzureMonitorBaseExporter implements LogRecordExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;
  private readonly _sender: HttpSender;

  /**
   * Initializes a new instance of the AzureMonitorLogExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
    this._sender = new HttpSender(
      this.endpointUrl,
      this.instrumentationKey,
      this.trackStatsbeat,
      options
    );
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
      let envelope = logToEnvelope(log, this.instrumentationKey);
      if (envelope) {
        envelopes.push(envelope);
      }
    });
    // Supress tracing until OpenTelemetry Logs SDK support it
    context.with(suppressTracing(context.active()), async () => {
      resultCallback(await this._sender.exportEnvelopes(envelopes));
    });
  }

  /**
   * Shutdown AzureMonitorLogExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorLogExporter shutting down");
    return this._sender.shutdown();
  }
}
