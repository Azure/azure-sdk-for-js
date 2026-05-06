// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context, trace } from "@opentelemetry/api";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import type { ReadableSpan, Span } from "@opentelemetry/sdk-trace-base";
import { assert, beforeEach, describe, it } from "vitest";

import type { MetricHandler } from "../../../../src/metrics/index.js";
import { AzureMonitorSpanProcessor } from "../../../../src/traces/spanProcessor.js";

function createStubMetricHandler(): MetricHandler {
  return {
    markSpanAsProcessed: () => {
      /* no-op */
    },
    recordSpan: () => {
      /* no-op */
    },
    recordLog: () => {
      /* no-op */
    },
  } as unknown as MetricHandler;
}

describe("Library/AzureMonitorSpanProcessor", () => {
  let tracerProvider: BasicTracerProvider;
  let processor: AzureMonitorSpanProcessor;

  beforeEach(() => {
    tracerProvider = new BasicTracerProvider();
    processor = new AzureMonitorSpanProcessor(createStubMetricHandler());
  });

  function withParentAttrs(parentAttrs: Record<string, unknown>): Span {
    const tracer = tracerProvider.getTracer("test");
    const parent = tracer.startSpan("parent") as Span;
    for (const [k, v] of Object.entries(parentAttrs)) {
      parent.setAttribute(k, v as never);
    }
    return parent;
  }

  describe("#onStart()", () => {
    it("copies primary microsoft.gen_ai.main_agent.* attributes from parent", () => {
      const parent = withParentAttrs({
        "microsoft.gen_ai.main_agent.name": "main",
        "microsoft.gen_ai.main_agent.id": "main-id",
        "microsoft.gen_ai.main_agent.version": "1.0",
        "microsoft.gen_ai.main_agent.conversation_id": "conv-1",
        "gen_ai.agent.name": "should-not-use",
      });
      const ctx = trace.setSpan(context.active(), parent);
      const child = tracerProvider.getTracer("test").startSpan("child", undefined, ctx) as Span;

      processor.onStart(child, ctx);

      const attrs = (child as unknown as ReadableSpan).attributes;
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.name"], "main");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.id"], "main-id");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.version"], "1.0");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.conversation_id"], "conv-1");
    });

    it("falls back to gen_ai.* attributes when parent lacks microsoft.gen_ai.main_agent.*", () => {
      const parent = withParentAttrs({
        "gen_ai.agent.name": "agent",
        "gen_ai.agent.id": "agent-id",
        "gen_ai.agent.version": "2.0",
        "gen_ai.conversation.id": "conv-2",
      });
      const ctx = trace.setSpan(context.active(), parent);
      const child = tracerProvider.getTracer("test").startSpan("child", undefined, ctx) as Span;

      processor.onStart(child, ctx);

      const attrs = (child as unknown as ReadableSpan).attributes;
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.name"], "agent");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.id"], "agent-id");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.version"], "2.0");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.conversation_id"], "conv-2");
    });

    it("prefers primary over fallback per attribute independently", () => {
      const parent = withParentAttrs({
        "microsoft.gen_ai.main_agent.name": "main",
        "gen_ai.agent.id": "agent-id",
      });
      const ctx = trace.setSpan(context.active(), parent);
      const child = tracerProvider.getTracer("test").startSpan("child", undefined, ctx) as Span;

      processor.onStart(child, ctx);

      const attrs = (child as unknown as ReadableSpan).attributes;
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.name"], "main");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.id"], "agent-id");
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.version"]);
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.conversation_id"]);
    });

    it("is a no-op when there is no parent span in the context", () => {
      const child = tracerProvider.getTracer("test").startSpan("child") as Span;

      processor.onStart(child, context.active());

      const attrs = (child as unknown as ReadableSpan).attributes;
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.name"]);
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.id"]);
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.version"]);
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.conversation_id"]);
    });

    it("is a no-op when parent has none of the source attributes", () => {
      const parent = withParentAttrs({ "unrelated.attr": "value" });
      const ctx = trace.setSpan(context.active(), parent);
      const child = tracerProvider.getTracer("test").startSpan("child", undefined, ctx) as Span;

      processor.onStart(child, ctx);

      const attrs = (child as unknown as ReadableSpan).attributes;
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.name"]);
    });
  });

  describe("#onEnd()", () => {
    it("copies gen_ai.* into microsoft.gen_ai.main_agent.* for invoke_agent spans without main_agent attrs", () => {
      const span = tracerProvider.getTracer("test").startSpan("invoke") as Span;
      span.setAttribute("gen_ai.operation.name", "invoke_agent");
      span.setAttribute("gen_ai.agent.name", "a");
      span.setAttribute("gen_ai.agent.id", "a-id");
      span.setAttribute("gen_ai.agent.version", "1.2");
      span.setAttribute("gen_ai.conversation.id", "c-id");
      span.end();

      processor.onEnd(span as unknown as ReadableSpan);

      const attrs = (span as unknown as ReadableSpan).attributes;
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.name"], "a");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.id"], "a-id");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.version"], "1.2");
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.conversation_id"], "c-id");
    });

    it("is a no-op when gen_ai.operation.name is not invoke_agent", () => {
      const span = tracerProvider.getTracer("test").startSpan("chat") as Span;
      span.setAttribute("gen_ai.operation.name", "chat");
      span.setAttribute("gen_ai.agent.name", "a");
      span.end();

      processor.onEnd(span as unknown as ReadableSpan);

      const attrs = (span as unknown as ReadableSpan).attributes;
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.name"]);
    });

    it("is a no-op when span already has any microsoft.gen_ai.main_agent.* attribute", () => {
      const span = tracerProvider.getTracer("test").startSpan("invoke") as Span;
      span.setAttribute("gen_ai.operation.name", "invoke_agent");
      span.setAttribute("microsoft.gen_ai.main_agent.name", "preset");
      span.setAttribute("gen_ai.agent.id", "should-not-copy");
      span.end();

      processor.onEnd(span as unknown as ReadableSpan);

      const attrs = (span as unknown as ReadableSpan).attributes;
      assert.strictEqual(attrs["microsoft.gen_ai.main_agent.name"], "preset");
      assert.isUndefined(attrs["microsoft.gen_ai.main_agent.id"]);
    });
  });
});
