// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TraceFlags } from "@opentelemetry/api";
import { LogRecord, BatchLogRecordProcessor, LogRecordExporter } from "@opentelemetry/sdk-logs";

/**
 * Azure Monitor BatchLogRecord Processor.
 * @internal
 */
export class AzureBatchLogRecordProcessor extends BatchLogRecordProcessor {
  private readonly _options: { enableTraceBasedSamplingForLogs: boolean | undefined };

  constructor(
    exporter: LogRecordExporter,
    options: { enableTraceBasedSamplingForLogs: boolean | undefined },
  ) {
    super(exporter);
    this._options = options;
  }

  public onEmit(logRecord: LogRecord): void {
    // Trace based sampling for logs
    if (this._options.enableTraceBasedSamplingForLogs) {
      if (logRecord.spanContext && logRecord.spanContext.spanId) {
        if (logRecord.spanContext.traceFlags !== TraceFlags.SAMPLED) {
          // Do not export log for spans that were sampled out
          return;
        }
      }
    }
    // Ensure nested log attributes are serialized
    for (const [key, value] of Object.entries(logRecord.attributes)) {
      if (typeof value === "object") {
        logRecord.attributes[key] = JSON.stringify(value);
      }
    }
    super.onEmit(logRecord);
  }
}
