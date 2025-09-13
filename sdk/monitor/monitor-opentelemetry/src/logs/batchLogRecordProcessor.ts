// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TraceFlags } from "@opentelemetry/api";
import type { LogRecordExporter, SdkLogRecord } from "@opentelemetry/sdk-logs";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";

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

  public onEmit(logRecord: SdkLogRecord): void {
    // Trace based sampling for logs
    if (this._options.enableTraceBasedSamplingForLogs) {
      if (logRecord.spanContext && logRecord.spanContext.spanId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (logRecord.spanContext.traceFlags !== TraceFlags.SAMPLED) {
          // Do not export log for spans that were sampled out
          return;
        }
      }
    }
    super.onEmit(logRecord);
  }
}
