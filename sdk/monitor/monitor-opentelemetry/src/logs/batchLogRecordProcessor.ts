// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TraceFlags } from "@opentelemetry/api";
import type { LogRecordExporter, ReadWriteLogRecord } from "@opentelemetry/sdk-logs";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { getPositiveNumberFromEnv } from "../shared/envConfig.js";

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
    super({
      exporter,
      maxQueueSize: getPositiveNumberFromEnv("OTEL_BLRP_MAX_QUEUE_SIZE"),
      maxExportBatchSize: getPositiveNumberFromEnv("OTEL_BLRP_MAX_EXPORT_BATCH_SIZE"),
      scheduledDelayMillis: getPositiveNumberFromEnv("OTEL_BLRP_SCHEDULE_DELAY"),
      exportTimeoutMillis: getPositiveNumberFromEnv("OTEL_BLRP_EXPORT_TIMEOUT"),
    });
    this._options = options;
  }

  public onEmit(logRecord: ReadWriteLogRecord): void {
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
