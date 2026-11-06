// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context, diag } from "@opentelemetry/api";
import type { ExportResult } from "@opentelemetry/core";
import { ExportResultCode, suppressTracing } from "@opentelemetry/core";
import { AzureMonitorBaseExporter } from "./base.js";
import type { TelemetryItem as Envelope } from "../generated/index.js";
import { logToEnvelope } from "../utils/logUtils.js";
import type { AzureMonitorExporterOptions } from "../config.js";
import type { ReadableLogRecord, LogRecordExporter } from "@opentelemetry/sdk-logs";
import { HttpSender } from "../platform/nodejs/httpSender.js";
import type { RoutingGroups } from "../utils/routing.js";
import { addToRoutingGroups, getTelemetryRoute } from "../utils/routing.js";
import { RoutingSender } from "../platform/nodejs/routingSender.js";

/**
 * Azure Monitor OpenTelemetry Log Exporter.
 */
export class AzureMonitorLogExporter extends AzureMonitorBaseExporter implements LogRecordExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;
  private readonly _sender: HttpSender;
  private readonly routingSender?: RoutingSender;

  /**
   * Initializes a new instance of the AzureMonitorLogExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */

  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
    if (this.multiEndpointRouting) {
      this.routingSender = new RoutingSender(options, this.instrumentationKey, this.aadAudience);
    }
    this._sender = new HttpSender({
      endpointUrl: this.endpointUrl,
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: this.trackStatsbeat,
      exporterOptions: this.routingSender ? { ...options, disableOfflineStorage: true } : options,
      aadAudience: this.aadAudience,
    });
    diag.debug("AzureMonitorLogExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry logs.
   * @param logs - Logs to export.
   * @param resultCallback - Result callback.
   */
  public async export(
    logs: ReadableLogRecord[],
    resultCallback: (result: ExportResult) => void,
  ): Promise<void> {
    if (this._isShutdown) {
      diag.info("Exporter shut down. Failed to export spans.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }
    diag.info(`Exporting ${logs.length} logs(s). Converting to envelopes...`);

    const envelopes: Envelope[] = [];
    const groups: RoutingGroups = new Map();
    logs.forEach((log) => {
      const route = this.routingSender ? getTelemetryRoute(log.attributes) : undefined;
      if (this.routingSender && !route) {
        return;
      }
      const envelope = logToEnvelope(log, this.instrumentationKey, this._increaseGenAiMessageLimit);
      if (envelope) {
        if (route) {
          addToRoutingGroups(groups, route, [envelope]);
        } else {
          envelopes.push(envelope);
        }
      }
    });
    // Supress tracing until OpenTelemetry Logs SDK support it
    await context.with(suppressTracing(context.active()), async () => {
      resultCallback(
        await (this.routingSender?.export(groups) ?? this._sender.exportEnvelopes(envelopes)),
      );
    });
  }

  /**
   * Shutdown AzureMonitorLogExporter.
   */
  public async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorLogExporter shutting down");
    await this.routingSender?.shutdown();
    return this._sender.shutdown();
  }

  /**
   * Force flush
   */
  public async forceFlush(): Promise<void> {
    return Promise.resolve();
  }
}
