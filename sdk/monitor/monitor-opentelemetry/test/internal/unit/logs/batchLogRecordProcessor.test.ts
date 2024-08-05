// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import { InMemoryLogRecordExporter, LoggerProvider } from "@opentelemetry/sdk-logs";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ApplicationInsightsSampler } from "../../../../src/traces/sampler";
import { AzureBatchLogRecordProcessor } from "../../../../src/logs/batchLogRecordProcessor";

describe("AzureBatchLogRecordProcessor", () => {
  describe("#trace based sampling", async () => {
    it("sampled out", async () => {
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

    it("sampled in", async () => {
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

    it("enableTraceBasedSamplingForLogs=false", async () => {
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

    it("should serialize nested log attributes", async () => {
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
          attributes: { test: { nested: "value" } },
          body: "testRecord",
        };
        loggerProvider.getLogger("testLoggere").emit(logRecord);
        await loggerProvider.forceFlush();
        span.end();
      });
      const logRecords = memoryLogExporter.getFinishedLogRecords();
      assert.strictEqual(logRecords[0].attributes.test, '{"nested":"value"}');
    });
  });
});
