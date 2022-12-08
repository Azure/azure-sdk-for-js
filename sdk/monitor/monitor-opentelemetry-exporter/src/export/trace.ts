// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorBaseExporter } from "./base";
import { AzureMonitorExporterOptions } from "../config";
import { TelemetryItem as Envelope } from "../generated";
import { readableSpanToEnvelope, spanEventsToEnvelopes } from "../utils/spanUtils";

/**
 * Azure Monitor OpenTelemetry Trace Exporter.
 */
export class AzureMonitorTraceExporter extends AzureMonitorBaseExporter implements SpanExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;

  /**
   * Initializes a new instance of the AzureMonitorTraceExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */
  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
    diag.debug("AzureMonitorTraceExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry spans.
   * @param spans - Spans to export.
   * @param resultCallback - Result callback.
   */
  async export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void
  ): Promise<void> {
    if (this._isShutdown) {
      diag.info("Exporter shut down. Failed to export spans.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }

    diag.info(`Exporting ${spans.length} span(s). Converting to envelopes...`);

    let envelopes: Envelope[] = [];
    spans.forEach((span) => {
      envelopes.push(readableSpanToEnvelope(span, this._instrumentationKey));
      let spanEventEnvelopes = spanEventsToEnvelopes(span, this._instrumentationKey);
      if (spanEventEnvelopes.length > 0) {
        envelopes.push(...spanEventEnvelopes);
      }
    });
    resultCallback(await this._exportEnvelopes(envelopes));
  }

  /**
   * Shutdown AzureMonitorTraceExporter.
   */
  async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorTraceExporter shutting down");
    return this._shutdown();
  }
}
