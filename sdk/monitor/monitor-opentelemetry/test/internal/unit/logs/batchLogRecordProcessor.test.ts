// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import type { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import { InMemoryLogRecordExporter, LoggerProvider } from "@opentelemetry/sdk-logs";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ApplicationInsightsSampler } from "../../../../src/traces/sampler";
import { AzureBatchLogRecordProcessor } from "../../../../src/logs/batchLogRecordProcessor";

describe("AzureBatchLogRecordProcessor", () => {
  describe("#trace based sampling", () => {
    it("sampled out", () => {
      const memoryLogExporter = new InMemoryLogRecordExporter();
      const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
        enableTraceBasedSamplingForLogs: true,
      });
      const loggerProvider = new LoggerProvider();
      loggerProvider.addLogRecordProcessor(processor);
      const sampler = new ApplicationInsightsSampler(0);
      const tracerProvider = new NodeTracerProvider({ sampler: sampler });
      tracerProvider.getTracer("testTracere").startActiveSpan("test", async (span) => {
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

    it("sampled in", () => {
      const memoryLogExporter = new InMemoryLogRecordExporter();
      const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
        enableTraceBasedSamplingForLogs: true,
      });
      const loggerProvider = new LoggerProvider();
      loggerProvider.addLogRecordProcessor(processor);
      const sampler = new ApplicationInsightsSampler(1);
      const tracerProvider = new NodeTracerProvider({ sampler: sampler });
      tracerProvider.getTracer("testTracere").startActiveSpan("test", async (span) => {
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

    it("enableTraceBasedSamplingForLogs=false", () => {
      const memoryLogExporter = new InMemoryLogRecordExporter();
      const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
        enableTraceBasedSamplingForLogs: false,
      });
      const loggerProvider = new LoggerProvider();
      loggerProvider.addLogRecordProcessor(processor);
      const sampler = new ApplicationInsightsSampler(1);
      const tracerProvider = new NodeTracerProvider({ sampler: sampler });
      tracerProvider.getTracer("testTracere").startActiveSpan("test", async (span) => {
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
