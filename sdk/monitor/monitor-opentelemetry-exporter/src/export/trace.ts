// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ExportResult, ExportResultCode } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorBaseExporter } from "./base";
import { AzureMonitorExporterOptions } from "../config";
import { TelemetryItem as Envelope } from "../generated";
import { readableSpanToEnvelope, spanEventsToEnvelopes } from "../utils/spanUtils";
import { createResourceMetricEnvelope, shouldCreateResourceMetric } from "../utils/common";
import { HttpSender } from "../platform";

/**
 * Azure Monitor OpenTelemetry Trace Exporter.
 */
export class AzureMonitorTraceExporter extends AzureMonitorBaseExporter implements SpanExporter {
  /**
   * Flag to determine if Exporter is shutdown.
   */
  private isShutdown = false;
  private readonly sender: HttpSender;
  private shouldCreateResourceMetric: boolean = shouldCreateResourceMetric();

  /**
   * Initializes a new instance of the AzureMonitorTraceExporter class.
   * @param AzureExporterConfig - Exporter configuration.
   */
  constructor(options: AzureMonitorExporterOptions = {}) {
    super(options);
    this.sender = new HttpSender({
      endpointUrl: this.endpointUrl,
      instrumentationKey: this.instrumentationKey,
      trackStatsbeat: this.trackStatsbeat,
      exporterOptions: options,
      aadAudience: this.aadAudience,
    });
    diag.debug("AzureMonitorTraceExporter was successfully setup");
  }

  /**
   * Export OpenTelemetry spans.
   * @param spans - Spans to export.
   * @param resultCallback - Result callback.
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void,
  ): Promise<void> {
    if (this.isShutdown) {
      diag.info("Exporter shut down. Failed to export spans.");
      setTimeout(() => resultCallback({ code: ExportResultCode.FAILED }), 0);
      return;
    }

    diag.info(`Exporting ${spans.length} span(s). Converting to envelopes...`);

    if (spans.length > 0) {
      const envelopes: Envelope[] = [];
      const resourceMetricEnvelope = createResourceMetricEnvelope(
        spans[0].resource,
        this.instrumentationKey,
      );
      if (resourceMetricEnvelope && this.shouldCreateResourceMetric) {
        envelopes.push(resourceMetricEnvelope);
      }
      spans.forEach((span) => {
        envelopes.push(readableSpanToEnvelope(span, this.instrumentationKey));
        const spanEventEnvelopes = spanEventsToEnvelopes(span, this.instrumentationKey);
        if (spanEventEnvelopes.length > 0) {
          envelopes.push(...spanEventEnvelopes);
        }
      });
      resultCallback(await this.sender.exportEnvelopes(envelopes));
    }
    // No data to export
    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  /**
   * Shutdown AzureMonitorTraceExporter.
   */
  async shutdown(): Promise<void> {
    this.isShutdown = true;
    diag.info("AzureMonitorTraceExporter shutting down");
    return this.sender.shutdown();
  }
}
