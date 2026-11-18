// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { InMemoryLogRecordExporter, LoggerProvider } from "@opentelemetry/sdk-logs";
import { TracerProvider } from "@opentelemetry/sdk-trace";
import { ApplicationInsightsSampler } from "../../../../src/traces/sampler.js";
import { AzureBatchLogRecordProcessor } from "../../../../src/logs/batchLogRecordProcessor.js";
import { AzureMonitorSampleRate } from "../../../../src/types.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("AzureBatchLogRecordProcessor", () => {
  beforeEach(() => {
    context.disable();
    context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
  });

  afterEach(() => {
    context.disable();
    vi.unstubAllEnvs();
  });

  it.each([
    { samplingRatio: 0, enableTraceBasedSamplingForLogs: true, expected: 0 },
    { samplingRatio: 1, enableTraceBasedSamplingForLogs: true, expected: 1 },
    { samplingRatio: 0, enableTraceBasedSamplingForLogs: false, expected: 1 },
    { samplingRatio: 0.05, enableTraceBasedSamplingForLogs: true, expected: 1 },
    { samplingRatio: 0.05, enableTraceBasedSamplingForLogs: false, expected: 1 },
  ])(
    "exports $expected correlated logs with sampling ratio $samplingRatio and log sampling $enableTraceBasedSamplingForLogs",
    async ({ samplingRatio, enableTraceBasedSamplingForLogs, expected }) => {
      const exporter = new InMemoryLogRecordExporter();
      const loggerProvider = new LoggerProvider({
        processors: [
          new AzureBatchLogRecordProcessor(exporter, { enableTraceBasedSamplingForLogs }),
        ],
      });
      const tracerProvider = new TracerProvider({
        sampler: new ApplicationInsightsSampler(samplingRatio),
        // This trace ID falls within the first 5% of the sampler's hash range.
        idGenerator: {
          generateTraceId: () => "00000000000000000000000000000001",
          generateSpanId: () => "0000000000000001",
        },
      });
      try {
        await tracerProvider.getTracer("test").startActiveSpan("test", async (span) => {
          await Promise.resolve();
          loggerProvider.getLogger("test").emit({ body: "correlated log" });
          await loggerProvider.forceFlush();
          const records = exporter.getFinishedLogRecords();
          expect(records).toHaveLength(expected);
          if (expected > 0) {
            expect(records[0].spanContext).toEqual(span.spanContext());
            expect(records[0].attributes[AzureMonitorSampleRate]).toBe(
              enableTraceBasedSamplingForLogs && samplingRatio < 1
                ? samplingRatio * 100
                : undefined,
            );
          }
          span.end();
        });
        exporter.reset();
        loggerProvider.getLogger("test").emit({
          body: "uncorrelated log",
          attributes: { [AzureMonitorSampleRate]: 5 },
        });
        await loggerProvider.forceFlush();
        expect(exporter.getFinishedLogRecords()).toHaveLength(1);
        expect(exporter.getFinishedLogRecords()[0].attributes[AzureMonitorSampleRate]).toBe(100);
      } finally {
        await Promise.all([loggerProvider.shutdown(), tracerProvider.shutdown()]);
      }
    },
  );

  it("uses OpenTelemetry batch log environment variables", async () => {
    vi.stubEnv("OTEL_BLRP_MAX_QUEUE_SIZE", "4096");
    vi.stubEnv("OTEL_BLRP_MAX_EXPORT_BATCH_SIZE", "1024");
    vi.stubEnv("OTEL_BLRP_SCHEDULE_DELAY", "2500");
    vi.stubEnv("OTEL_BLRP_EXPORT_TIMEOUT", "15000");
    const processor = new AzureBatchLogRecordProcessor(new InMemoryLogRecordExporter(), {
      enableTraceBasedSamplingForLogs: true,
    });
    try {
      expect(processor).toMatchObject({
        _maxQueueSize: 4096,
        _maxExportBatchSize: 1024,
        _scheduledDelayMillis: 2500,
        _exportTimeoutMillis: 15000,
      });
    } finally {
      await processor.shutdown();
    }
  });
});
