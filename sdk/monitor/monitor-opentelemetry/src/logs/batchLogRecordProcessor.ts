// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "@opentelemetry/api";
import { trace, TraceFlags } from "@opentelemetry/api";
import type { LogRecordExporter, ReadWriteLogRecord } from "@opentelemetry/sdk-logs";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import type { ReadableSpan } from "@opentelemetry/sdk-trace";
import { getPositiveNumberFromEnv } from "../shared/envConfig.js";
import { AzureMonitorSampleRate, logSampleRateKey } from "../types.js";

/**
 * Azure Monitor BatchLogRecord Processor.
 * @internal
 */
export class AzureBatchLogRecordProcessor extends BatchLogRecordProcessor {
  constructor(
    exporter: LogRecordExporter,
    private readonly _options: {
      enableTraceBasedSamplingForLogs?: boolean;
      fallbackSampleRate?: number;
    },
  ) {
    super({
      exporter,
      maxQueueSize: getPositiveNumberFromEnv("OTEL_BLRP_MAX_QUEUE_SIZE"),
      maxExportBatchSize: getPositiveNumberFromEnv("OTEL_BLRP_MAX_EXPORT_BATCH_SIZE"),
      scheduledDelayMillis: getPositiveNumberFromEnv("OTEL_BLRP_SCHEDULE_DELAY"),
      exportTimeoutMillis: getPositiveNumberFromEnv("OTEL_BLRP_EXPORT_TIMEOUT"),
    });
  }

  public onEmit(logRecord: ReadWriteLogRecord, context?: Context): void {
    let sampleRate = 100;
    if (this._options.enableTraceBasedSamplingForLogs && logRecord.spanContext?.spanId) {
      if ((logRecord.spanContext.traceFlags & TraceFlags.SAMPLED) === 0) {
        return;
      }

      // Capture the sampler's decision before batching loses access to the emitting span.
      const span = context && trace.getSpan(context);
      const sc = span?.spanContext();
      const spanRate =
        sc?.spanId === logRecord.spanContext.spanId && sc.traceId === logRecord.spanContext.traceId
          ? (span as Partial<ReadableSpan>).attributes?.[AzureMonitorSampleRate]
          : undefined;
      const rate = typeof spanRate === "string" ? Number(spanRate) : spanRate;
      sampleRate =
        typeof rate === "number" && rate > 0 && rate <= 100
          ? rate
          : (this._options.fallbackSampleRate ?? 100);
    }
    if (sampleRate !== 100 || logRecord.attributes[AzureMonitorSampleRate] !== undefined) {
      // Other processors receive the same record. Expose the rate only to our exporter.
      super.onEmit(
        new Proxy(logRecord, {
          has: (record, key) => key === logSampleRateKey || Reflect.has(record, key),
          get: (record, key): unknown =>
            key === logSampleRateKey ? sampleRate : Reflect.get(record, key),
        }),
      );
      return;
    }
    super.onEmit(logRecord);
  }
}
