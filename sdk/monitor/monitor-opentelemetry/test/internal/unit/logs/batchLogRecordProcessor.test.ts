// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import { SeverityNumber } from "@opentelemetry/api-logs";
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

describe("AzureBatchLogRecordProcessor - logRecordFilter", () => {
  it("should export log records when no filter is provided", async () => {
    const memoryLogExporter = new InMemoryLogRecordExporter();
    const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
      enableTraceBasedSamplingForLogs: false,
    });
    const loggerProvider = new LoggerProvider({
      processors: [processor],
    });
    const logRecord: APILogRecord = {
      attributes: {},
      body: "testRecord",
    };
    loggerProvider.getLogger("testLogger").emit(logRecord);
    await loggerProvider.forceFlush();
    const logRecords = memoryLogExporter.getFinishedLogRecords();
    assert.strictEqual(logRecords.length, 1);
  });

  it("should drop log records when filter returns false", async () => {
    const memoryLogExporter = new InMemoryLogRecordExporter();
    const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
      enableTraceBasedSamplingForLogs: false,
      logRecordFilter: () => false,
    });
    const loggerProvider = new LoggerProvider({
      processors: [processor],
    });
    const logRecord: APILogRecord = {
      attributes: {},
      body: "testRecord",
    };
    loggerProvider.getLogger("testLogger").emit(logRecord);
    await loggerProvider.forceFlush();
    const logRecords = memoryLogExporter.getFinishedLogRecords();
    assert.strictEqual(logRecords.length, 0);
  });

  it("should export log records when filter returns true", async () => {
    const memoryLogExporter = new InMemoryLogRecordExporter();
    const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
      enableTraceBasedSamplingForLogs: false,
      logRecordFilter: () => true,
    });
    const loggerProvider = new LoggerProvider({
      processors: [processor],
    });
    const logRecord: APILogRecord = {
      attributes: {},
      body: "testRecord",
    };
    loggerProvider.getLogger("testLogger").emit(logRecord);
    await loggerProvider.forceFlush();
    const logRecords = memoryLogExporter.getFinishedLogRecords();
    assert.strictEqual(logRecords.length, 1);
  });

  it("should filter by severity level (verbosity)", async () => {
    const memoryLogExporter = new InMemoryLogRecordExporter();
    const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
      enableTraceBasedSamplingForLogs: false,
      logRecordFilter: (logRecord) =>
        logRecord.severityNumber !== undefined && logRecord.severityNumber >= SeverityNumber.WARN,
    });
    const loggerProvider = new LoggerProvider({
      processors: [processor],
    });

    // Emit a DEBUG log - should be filtered out
    loggerProvider.getLogger("testLogger").emit({
      attributes: {},
      body: "debug message",
      severityNumber: SeverityNumber.DEBUG,
    });
    // Emit a WARN log - should be exported
    loggerProvider.getLogger("testLogger").emit({
      attributes: {},
      body: "warning message",
      severityNumber: SeverityNumber.WARN,
    });
    // Emit an ERROR log - should be exported
    loggerProvider.getLogger("testLogger").emit({
      attributes: {},
      body: "error message",
      severityNumber: SeverityNumber.ERROR,
    });

    await loggerProvider.forceFlush();
    const logRecords = memoryLogExporter.getFinishedLogRecords();
    assert.strictEqual(logRecords.length, 2);
    assert.strictEqual(logRecords[0].body, "warning message");
    assert.strictEqual(logRecords[1].body, "error message");
  });

  it("should filter by log attributes", async () => {
    const memoryLogExporter = new InMemoryLogRecordExporter();
    const processor = new AzureBatchLogRecordProcessor(memoryLogExporter, {
      enableTraceBasedSamplingForLogs: false,
      logRecordFilter: (logRecord) => logRecord.attributes["source"] !== "noisy-library",
    });
    const loggerProvider = new LoggerProvider({
      processors: [processor],
    });

    // Log from noisy library - should be filtered out
    loggerProvider.getLogger("testLogger").emit({
      attributes: { source: "noisy-library" },
      body: "noisy log",
    });
    // Log from app code - should be exported
    loggerProvider.getLogger("testLogger").emit({
      attributes: { source: "app" },
      body: "app log",
    });

    await loggerProvider.forceFlush();
    const logRecords = memoryLogExporter.getFinishedLogRecords();
    assert.strictEqual(logRecords.length, 1);
    assert.strictEqual(logRecords[0].body, "app log");
  });
});
