// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorBaseExporter } from "./base";
import { AzureMonitorExporterOptions } from "../config";
import { TelemetryItem as Envelope } from "../generated";
import { readableSpanToEnvelope, spanEventsToEnvelopes } from "../utils/spanUtils";
import { createResourceMetricEnvelope } from "../utils/common";
import { HttpSender } from "../platform";

/**
 * Azure Monitor OpenTelemetry Trace Exporter.
 */
export class AzureMonitorTraceExporter extends AzureMonitorBaseExporter implements SpanExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private _isShutdown = false;
  private readonly _sender: HttpSender;

  /**
   * Initializes a new instance of the AzureMonitorTraceExporter class.
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

    if (spans.length > 0) {
      let envelopes: Envelope[] = [];
      const resourceMetricEnvelope = createResourceMetricEnvelope(
        spans[0].resource,
        this.instrumentationKey
      );
      if (resourceMetricEnvelope) {
        envelopes.push(resourceMetricEnvelope);
      }
      spans.forEach((span) => {
        envelopes.push(readableSpanToEnvelope(span, this.instrumentationKey));
        let spanEventEnvelopes = spanEventsToEnvelopes(span, this.instrumentationKey);
        if (spanEventEnvelopes.length > 0) {
          envelopes.push(...spanEventEnvelopes);
        }
      });
      resultCallback(await this._sender.exportEnvelopes(envelopes));
    }
    // No data to export
    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  /**
   * Shutdown AzureMonitorTraceExporter.
   */
  async shutdown(): Promise<void> {
    this._isShutdown = true;
    diag.info("AzureMonitorTraceExporter shutting down");
    return this._sender.shutdown();
  }
}
