// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context, ROOT_CONTEXT, trace } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { InMemoryLogRecordExporter, LoggerProvider } from "@opentelemetry/sdk-logs";
import { TracerProvider } from "@opentelemetry/sdk-trace";
import { ApplicationInsightsSampler } from "../../../../src/traces/sampler.js";
import { AzureBatchLogRecordProcessor } from "../../../../src/logs/batchLogRecordProcessor.js";
import { AzureMonitorSampleRate, logSampleRateKey } from "../../../../src/types.js";
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
            const record = records[0];
            expect(logSampleRateKey in record ? record[logSampleRateKey] : undefined).toBe(
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
        const [record] = exporter.getFinishedLogRecords();
        expect(logSampleRateKey in record && record[logSampleRateKey]).toBe(100);
      } finally {
        await Promise.all([loggerProvider.shutdown(), tracerProvider.shutdown()]);
      }
    },
  );

  it("uses the fixed fallback only when a sampled log has no usable rate from its own span", async () => {
    const exporter = new InMemoryLogRecordExporter();
    const loggerProvider = new LoggerProvider({
      processors: [
        new AzureBatchLogRecordProcessor(exporter, {
          enableTraceBasedSamplingForLogs: true,
          fallbackSampleRate: 5,
        }),
      ],
    });
    const tracerProvider = new TracerProvider();
    const span = tracerProvider.getTracer("test").startSpan("test");
    const spanContext = trace.setSpan(ROOT_CONTEXT, span);
    const logger = loggerProvider.getLogger("test");
    try {
      span.setAttribute(AzureMonitorSampleRate, 25);
      logger.emit({ context: spanContext });
      span.setAttribute(AzureMonitorSampleRate, 101);
      logger.emit({ context: spanContext });
      // Propagated span contexts carry the sampled flag but not the sampler's attributes.
      logger.emit({ context: trace.setSpanContext(ROOT_CONTEXT, span.spanContext()) });
      logger.emit({ context: ROOT_CONTEXT });
      await loggerProvider.forceFlush();
      expect(
        exporter
          .getFinishedLogRecords()
          .map((log) => (logSampleRateKey in log ? log[logSampleRateKey] : undefined)),
      ).toEqual([25, 5, 5, undefined]);
    } finally {
      span.end();
      await Promise.all([loggerProvider.shutdown(), tracerProvider.shutdown()]);
    }
  });

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
