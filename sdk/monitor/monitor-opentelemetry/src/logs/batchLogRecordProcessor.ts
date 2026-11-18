// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "@opentelemetry/api";
import { trace, TraceFlags } from "@opentelemetry/api";
import type { LogRecordExporter, ReadWriteLogRecord } from "@opentelemetry/sdk-logs";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import type { ReadableSpan } from "@opentelemetry/sdk-trace";
import { getPositiveNumberFromEnv } from "../shared/envConfig.js";
import { AzureMonitorSampleRate } from "../types.js";

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

  public onEmit(logRecord: ReadWriteLogRecord, context?: Context): void {
    let sampleRate = 100;
    if (this._options.enableTraceBasedSamplingForLogs && logRecord.spanContext?.spanId) {
      if ((logRecord.spanContext.traceFlags & TraceFlags.SAMPLED) === 0) {
        return;
      }

      // Capture the sampler's decision before batching loses access to the emitting span.
      const span = context && (trace.getSpan(context) as Partial<ReadableSpan> | undefined);
      const spanRate = span?.attributes?.[AzureMonitorSampleRate];
      if (typeof spanRate === "number") {
        sampleRate = spanRate;
      }
    }
    if (sampleRate !== 100 || logRecord.attributes[AzureMonitorSampleRate] !== undefined) {
      logRecord.setAttribute(AzureMonitorSampleRate, sampleRate);
    }
    super.onEmit(logRecord);
  }
}
