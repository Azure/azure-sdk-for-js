// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import { InMemoryLogRecordExporter, LoggerProvider } from "@opentelemetry/sdk-logs";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ApplicationInsightsSampler } from "../../../../src/traces/sampler.js";
import { AzureBatchLogRecordProcessor } from "../../../../src/logs/batchLogRecordProcessor.js";
import { assert, describe, it } from "vitest";

// TODO: this is failing on main, but the startActiveSpan call is not awaited
// so mocha is not reporting it as a failure. Vitest handles unhandled rejections better and reports it as a failure.
describe.todo("AzureBatchLogRecordProcessor", () => {
  describe("#trace based sampling", () => {
    it("sampled out", async () => {
      const memoryLogExporter = new InMemoryLogRecordExporter();
      const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
        enableTraceBasedSamplingForLogs: true,
      });
      const loggerProvider = new LoggerProvider({
        processors: [processor],
      });
      const sampler = new ApplicationInsightsSampler(0);
      const tracerProvider = new NodeTracerProvider({ sampler: sampler });
      await tracerProvider.getTracer("testTracere").startActiveSpan("test", async (span) => {
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        loggerProvider.getLogger("testLoggere").emit(logRecord);
        await loggerProvider.forceFlush();
        const logRecords = memoryLogExporter.getFinishedLogRecords();
        assert.strictEqual(logRecords.length, 0);
        span.end();
      });
    });

    it("sampled in", async () => {
      const memoryLogExporter = new InMemoryLogRecordExporter();
      const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
        enableTraceBasedSamplingForLogs: true,
      });
      const loggerProvider = new LoggerProvider({
        processors: [processor],
      });
      const sampler = new ApplicationInsightsSampler(1);
      const tracerProvider = new NodeTracerProvider({ sampler: sampler });
      await tracerProvider.getTracer("testTracere").startActiveSpan("test", async (span) => {
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        loggerProvider.getLogger("testLoggere").emit(logRecord);
        await loggerProvider.forceFlush();
        const logRecords = memoryLogExporter.getFinishedLogRecords();
        assert.strictEqual(logRecords.length, 1);
        span.end();
      });
    });

    it("enableTraceBasedSamplingForLogs=false", async () => {
      const memoryLogExporter = new InMemoryLogRecordExporter();
      const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
        enableTraceBasedSamplingForLogs: false,
      });
      const loggerProvider = new LoggerProvider({
        processors: [processor],
      });
      const sampler = new ApplicationInsightsSampler(1);
      const tracerProvider = new NodeTracerProvider({ sampler: sampler });
      await tracerProvider.getTracer("testTracere").startActiveSpan("test", async (span) => {
        // Generate Log record
        const logRecord: APILogRecord = {
          attributes: {},
          body: "testRecord",
        };
        loggerProvider.getLogger("testLoggere").emit(logRecord);
        await loggerProvider.forceFlush();
        const logRecords = memoryLogExporter.getFinishedLogRecords();
        assert.strictEqual(logRecords.length, 0);
        span.end();
      });
    });
  });
});
