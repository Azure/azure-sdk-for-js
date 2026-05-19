// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "@opentelemetry/api";
import { context, trace } from "@opentelemetry/api";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import type { Span } from "@opentelemetry/sdk-trace-base";
import { LoggerProvider } from "@opentelemetry/sdk-logs";
import type { LogRecord as APILogRecord } from "@opentelemetry/api-logs";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";
import { assert, beforeEach, describe, it } from "vitest";

import type { MetricHandler } from "../../../../src/metrics/index.js";
import { AzureLogRecordProcessor } from "../../../../src/logs/logRecordProcessor.js";

function createStubMetricHandler(): MetricHandler {
  return {
    recordLog: () => {
      /* no-op */
    },
  } as unknown as MetricHandler;
}

/**
 * Capturing log record processor that records the log records onEmit was
 * called with so we can inspect the attributes the AzureLogRecordProcessor
 * applied.
 */
class CapturingProcessor {
  public records: SdkLogRecord[] = [];
  onEmit(record: SdkLogRecord): void {
    this.records.push(record);
  }
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }
  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}

describe("Library/AzureLogRecordProcessor", () => {
  let processor: AzureLogRecordProcessor;
  let capture: CapturingProcessor;
  let loggerProvider: LoggerProvider;
  let tracerProvider: BasicTracerProvider;

  beforeEach(() => {
    processor = new AzureLogRecordProcessor(createStubMetricHandler());
    capture = new CapturingProcessor();
    // The Azure processor must run before the capture so that the capture
    // sees the mutated log record.
    loggerProvider = new LoggerProvider({ processors: [processor, capture] });
    tracerProvider = new BasicTracerProvider();
  });

  function emitLog(ctx?: Context): void {
    const record: APILogRecord = { attributes: {}, body: "test" };
    if (ctx) {
      (record as APILogRecord & { context?: Context }).context = ctx;
    }
    loggerProvider.getLogger("test").emit(record);
  }

  it("copies microsoft.gen_ai.main_agent.* attributes from active span onto log record", () => {
    const span = tracerProvider.getTracer("test").startSpan("parent") as Span;
    span.setAttribute("microsoft.gen_ai.main_agent.name", "main");
    span.setAttribute("microsoft.gen_ai.main_agent.id", "main-id");
    span.setAttribute("gen_ai.agent.name", "should-not-copy");

    emitLog(trace.setSpan(context.active(), span));

    assert.strictEqual(capture.records.length, 1);
    const attrs = capture.records[0].attributes;
    assert.strictEqual(attrs["microsoft.gen_ai.main_agent.name"], "main");
    assert.strictEqual(attrs["microsoft.gen_ai.main_agent.id"], "main-id");
    assert.isUndefined(attrs["gen_ai.agent.name"]);
  });

  it("is a no-op when there is no active span", () => {
    emitLog();

    assert.strictEqual(capture.records.length, 1);
    const attrs = capture.records[0].attributes;
    assert.isUndefined(attrs["microsoft.gen_ai.main_agent.name"]);
  });

  it("is a no-op when active span has no microsoft.gen_ai.main_agent.* attributes", () => {
    const span = tracerProvider.getTracer("test").startSpan("parent") as Span;
    span.setAttribute("gen_ai.agent.name", "agent");

    emitLog(trace.setSpan(context.active(), span));

    assert.strictEqual(capture.records.length, 1);
    const attrs = capture.records[0].attributes;
    assert.isUndefined(attrs["microsoft.gen_ai.main_agent.name"]);
  });
});
