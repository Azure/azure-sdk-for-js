// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ExportResult } from "@opentelemetry/core";
import { ReadableSpan, SpanExporter } from "@opentelemetry/tracing";
import { readableSpanToEnvelope } from "../utils/spanUtils";
import { DEFAULT_EXPORTER_CONFIG, AzureExporterConfig } from "../config";
import { AzureMonitorBaseExporter } from "./exporter";

export class AzureMonitorTraceExporter extends AzureMonitorBaseExporter implements SpanExporter {
         constructor(options: Partial<AzureExporterConfig> = {}) {
           super({
             ...DEFAULT_EXPORTER_CONFIG,
             ...options
           });
         }

         async export(
           spans: ReadableSpan[],
           resultCallback: (result: ExportResult) => void
         ): Promise<void> {
           this._logger.info(`Exporting ${spans.length} span(s). Converting to envelopes...`);
           const envelopes = spans.map((span) =>
             readableSpanToEnvelope(span, this._options.instrumentationKey, this._logger)
           );
           resultCallback(await this.exportEnvelopes(envelopes));
         }

         shutdown(): void {
           this._logger.info("Azure Monitor Trace Exporter shutting down");
           super.shutdown();
         }
       }
