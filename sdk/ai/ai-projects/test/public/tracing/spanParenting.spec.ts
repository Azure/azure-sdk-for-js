// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Verifies that traced operations correctly activate span context so that
 * child spans (e.g. from tracingFetch or nested operations) are parented
 * under the operation span.
 *
 * This test exercises the startSpan + runInSpanContext pattern to ensure
 * proper parent-child relationships in the span tree.
 */

import { describe, it, assert, afterAll, beforeAll } from "vitest";
import { trace, context } from "@opentelemetry/api";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { startSpan, runInSpanContext } from "../../../src/tracing/tracingClient.js";
import { traceAgentCreate } from "../../../src/tracing/agentTracing.js";

describe("span parenting - startSpan and runInSpanContext", () => {
  let provider: NodeTracerProvider;

  beforeAll(() => {
    provider = new NodeTracerProvider();
    provider.register();
  });

  afterAll(async () => {
    await provider.shutdown();
  });
  it("active span inside runInSpanContext is the operation span", () => {
    const { span: opSpan, ctx } = startSpan("test-operation");
    try {
      runInSpanContext(ctx, () => {
        const activeSpan = trace.getSpan(context.active());
        assert.isDefined(activeSpan, "there should be an active span inside runInSpanContext");
        assert.equal(
          activeSpan!.spanContext().spanId,
          opSpan.spanContext().spanId,
          "active span should be the operation span",
        );
      });
    } finally {
      opSpan.end();
    }
  });

  it("active span OUTSIDE runInSpanContext is NOT the operation span (demonstrates why wrapper is needed)", () => {
    // Without runInSpanContext, starting a span does not activate it in context.
    // This is why the tracing wrappers (traceAgentCreate, traceAgentVersionCreate)
    // use runInSpanContext — to ensure child spans are correctly parented.
    const { span: opSpan } = startSpan("test-operation");
    try {
      // Without wrapping in runInSpanContext, the operation span is NOT active
      const activeSpan = trace.getSpan(context.active());
      // The active span should NOT be our operation span
      const isParented =
        activeSpan !== undefined &&
        activeSpan.spanContext().spanId === opSpan.spanContext().spanId;
      assert.isFalse(
        isParented,
        "without runInSpanContext, operation span is not active — child spans won't be parented correctly",
      );
    } finally {
      opSpan.end();
    }
  });

  it("nested runInSpanContext calls maintain correct active span", () => {
    const { span: outerSpan, ctx: outerCtx } = startSpan("outer-operation");
    try {
      runInSpanContext(outerCtx, () => {
        // Inside outer context, active span should be outer
        const activeOuter = trace.getSpan(context.active());
        assert.equal(
          activeOuter!.spanContext().spanId,
          outerSpan.spanContext().spanId,
          "outer span should be active",
        );

        const { span: innerSpan, ctx: innerCtx } = startSpan("inner-operation");
        try {
          runInSpanContext(innerCtx, () => {
            // Inside inner context, active span should be inner
            const activeInner = trace.getSpan(context.active());
            assert.equal(
              activeInner!.spanContext().spanId,
              innerSpan.spanContext().spanId,
              "inner span should be active",
            );
          });
        } finally {
          innerSpan.end();
        }

        // After inner completes, active span should be outer again
        const activeAfterInner = trace.getSpan(context.active());
        assert.equal(
          activeAfterInner!.spanContext().spanId,
          outerSpan.spanContext().spanId,
          "outer span should be active again after inner completes",
        );
      });
    } finally {
      outerSpan.end();
    }
  });

  it("startSpan creates span with correct parent from active context", () => {
    const { span: parentSpan, ctx: parentCtx } = startSpan("parent");
    try {
      runInSpanContext(parentCtx, () => {
        // When we start a new span inside an active context, it should
        // inherit the parent from context.active()
        const { span: childSpan } = startSpan("child");
        try {
          // The child's traceId should match the parent's traceId
          assert.equal(
            childSpan.spanContext().traceId,
            parentSpan.spanContext().traceId,
            "child span should share traceId with parent",
          );
        } finally {
          childSpan.end();
        }
      });
    } finally {
      parentSpan.end();
    }
  });

  it("traceAgentCreate activates span context so async child spans are parented", async () => {
    let capturedActiveSpanId: string | undefined;

    const fakeAgent = {
      object: "agent" as const,
      id: "agent-123",
      name: "test-agent",
      state: "active",
      versions: { latest: { object: "agent.version" as const, id: "v1", version: 1, model: "gpt-4" } },
    };

    const tracingConfig = { enabled: true, contentRecording: false };

    await traceAgentCreate("test-agent", "https://example.com", tracingConfig, async () => {
      // Simulate async work; capture the active span inside the operation
      await Promise.resolve();
      const activeSpan = trace.getSpan(context.active());
      capturedActiveSpanId = activeSpan?.spanContext().spanId;
      return fakeAgent as any;
    });

    assert.isDefined(capturedActiveSpanId, "there should be an active span inside the async operation");
  });
});
