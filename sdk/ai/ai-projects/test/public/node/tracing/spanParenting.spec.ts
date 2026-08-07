// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Verifies that traced operations correctly activate span context so that
 * child spans (e.g. from tracingFetch or nested operations) are parented
 * under the operation span.
 *
 * This test exercises the startSpan + runInSpanContext pattern to ensure
 * proper parent-child relationships in the span tree.
 *
 * Uses NodeTracerProvider (Node-only), so this file lives under test/public/node/.
 */

import { describe, it, assert, afterAll, beforeAll, beforeEach } from "vitest";
import { trace, context } from "@opentelemetry/api";
import {
  NodeTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { startSpan, runInSpanContext } from "../../../../src/tracing/tracingClient.js";
import { traceAgentCreate, traceAgentVersionCreate } from "../../../../src/tracing/agentTracing.js";
import type { Agent, AgentVersion } from "../../../../src/models/models.js";

describe("span parenting - startSpan and runInSpanContext", () => {
  let provider: NodeTracerProvider;
  let exporter: InMemorySpanExporter;

  beforeAll(() => {
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)],
    });
    provider.register();
  });

  beforeEach(() => {
    exporter.reset();
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
        activeSpan !== undefined && activeSpan.spanContext().spanId === opSpan.spanContext().spanId;
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

  it("traceAgentCreate activates span context so child spans are parented", async () => {
    const fakeAgent: Agent = {
      object: "agent",
      id: "agent-123",
      name: "test-agent",
      state: "enabled",
      versions: {
        latest: {
          object: "agent.version",
          id: "v1",
          name: "test-agent",
          version: "1",
          created_at: new Date("2026-01-01"),
          definition: { kind: "prompt", model: "gpt-4" },
        },
      },
    };

    const tracingConfig = {
      enabled: true,
      contentRecording: false,
      traceContextPropagation: true,
    };

    await traceAgentCreate("test-agent", "https://example.com", tracingConfig, async () => {
      // Simulate async work (e.g. network I/O) before creating a child span.
      // This verifies context propagation across async boundaries.
      await Promise.resolve();
      // Create a child span — it should be parented under the traceAgentCreate
      // wrapper span via the activated context.
      const { span: childSpan } = startSpan("child-http-call");
      childSpan.end();
      return fakeAgent;
    });

    const spans = exporter.getFinishedSpans();
    assert.isAtLeast(spans.length, 2, "expected at least 2 finished spans");

    const wrapperSpan = spans.find((s) => s.name.includes("test-agent"));
    const childSpan = spans.find((s) => s.name === "child-http-call");

    assert.isDefined(wrapperSpan, "wrapper span should exist");
    assert.isDefined(childSpan, "child span should exist");

    // The child span's parent should match the wrapper span's spanId
    assert.equal(
      childSpan!.parentSpanContext?.spanId,
      wrapperSpan!.spanContext().spanId,
      "child span should be parented under the traceAgentCreate wrapper span",
    );

    // Both spans should share the same traceId
    assert.equal(
      childSpan!.spanContext().traceId,
      wrapperSpan!.spanContext().traceId,
      "child and wrapper spans should share the same traceId",
    );
  });

  it("traceAgentCreate sets error status and ends span on rejection", async () => {
    const tracingConfig = {
      enabled: true,
      contentRecording: false,
      traceContextPropagation: true,
    };

    const expectedError = new Error("network failure");

    let caughtError: unknown;
    try {
      await traceAgentCreate("failing-agent", "https://example.com", tracingConfig, async () => {
        throw expectedError;
      });
    } catch (err) {
      caughtError = err;
    }

    // The original error should be preserved
    assert.equal(caughtError, expectedError, "should rethrow the original error");

    const spans = exporter.getFinishedSpans();
    assert.isAtLeast(spans.length, 1, "span should still be exported on error");

    const errorSpan = spans.find((s) => s.name.includes("failing-agent"));
    assert.isDefined(errorSpan, "error span should exist");

    // Span should have ERROR status (code 2)
    assert.equal(errorSpan!.status.code, 2, "span should have ERROR status");
    assert.equal(
      errorSpan!.status.message,
      "Error",
      "span status message should be the error name",
    );

    // Span should have error.type attribute
    assert.equal(
      errorSpan!.attributes["error.type"],
      "Error",
      "span should have error.type attribute",
    );
  });

  it("traceAgentVersionCreate activates span context so child spans are parented", async () => {
    const fakeVersion: AgentVersion = {
      object: "agent.version",
      id: "v1",
      name: "test-agent",
      version: "1",
      created_at: new Date("2026-01-01"),
      definition: { kind: "prompt", model: "gpt-4" },
    };

    const tracingConfig = {
      enabled: true,
      contentRecording: false,
      traceContextPropagation: true,
    };

    await traceAgentVersionCreate("test-agent", "https://example.com", tracingConfig, async () => {
      await Promise.resolve();
      const { span: childSpan } = startSpan("child-http-call");
      childSpan.end();
      return fakeVersion;
    });

    const spans = exporter.getFinishedSpans();
    assert.isAtLeast(spans.length, 2, "expected at least 2 finished spans");

    const wrapperSpan = spans.find((s) => s.name.includes("test-agent"));
    const childSpan = spans.find((s) => s.name === "child-http-call");

    assert.isDefined(wrapperSpan, "wrapper span should exist");
    assert.isDefined(childSpan, "child span should exist");

    assert.equal(
      childSpan!.parentSpanContext?.spanId,
      wrapperSpan!.spanContext().spanId,
      "child span should be parented under the traceAgentVersionCreate wrapper span",
    );
  });

  it("traceAgentVersionCreate sets error status and ends span on rejection", async () => {
    const tracingConfig = {
      enabled: true,
      contentRecording: false,
      traceContextPropagation: true,
    };

    const expectedError = new Error("network failure");

    let caughtError: unknown;
    try {
      await traceAgentVersionCreate(
        "failing-agent",
        "https://example.com",
        tracingConfig,
        async () => {
          throw expectedError;
        },
      );
    } catch (err) {
      caughtError = err;
    }

    assert.equal(caughtError, expectedError, "should rethrow the original error");

    const spans = exporter.getFinishedSpans();
    const errorSpan = spans.find((s) => s.name.includes("failing-agent"));
    assert.isDefined(errorSpan, "error span should exist");

    assert.equal(errorSpan!.status.code, 2, "span should have ERROR status");
    assert.equal(
      errorSpan!.attributes["error.type"],
      "Error",
      "span should have error.type attribute",
    );
  });
});
