// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach, vi } from "vitest";
import { resolveTracingConfig } from "../../../src/tracing/configuration.js";
import { getTracingFetch } from "../../../src/tracing/tracingFetch.js";

// Mock tracingClient so we can control createRequestHeaders
const mockCreateRequestHeaders = vi.fn<() => Record<string, string>>();

vi.mock("../../../src/tracing/tracingClient.js", () => ({
  createRequestHeaders: (...args: unknown[]) => mockCreateRequestHeaders(...(args as [])),
  startSpan: vi.fn(),
}));

describe("tracingFetch - trace context propagation", () => {
  let capturedRequests: Request[];
  let mockFetch: (resource: string | Request | URL, options?: RequestInit) => Promise<Response>;

  beforeEach(() => {
    capturedRequests = [];
    mockFetch = async (
      resource: string | Request | URL,
      options?: RequestInit,
    ): Promise<Response> => {
      // Capture the actual Request so we can inspect headers
      const req = resource instanceof Request ? resource : new Request(resource, options);
      capturedRequests.push(req);
      return new Response("ok", { status: 200 });
    };
    mockCreateRequestHeaders.mockReturnValue({
      traceparent: "00-abcdef1234567890abcdef1234567890-1234567890abcdef-01",
      tracestate: "azure=test",
    });
  });

  afterEach(() => {
    mockCreateRequestHeaders.mockReset();
  });

  it("injects traceparent and tracestate when propagation is enabled", async () => {
    const config = resolveTracingConfig({ experimental: true, traceContextPropagation: true });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.equal(
      req.headers.get("traceparent"),
      "00-abcdef1234567890abcdef1234567890-1234567890abcdef-01",
    );
    assert.equal(req.headers.get("tracestate"), "azure=test");
  });

  it("does NOT inject headers when propagation is explicitly disabled", async () => {
    const config = resolveTracingConfig({ experimental: true, traceContextPropagation: false });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.isNull(req.headers.get("traceparent"));
    assert.isNull(req.headers.get("tracestate"));
  });

  it("does NOT inject headers when experimental is not acknowledged", async () => {
    const config = resolveTracingConfig({ traceContextPropagation: true });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.isNull(req.headers.get("traceparent"));
    assert.isNull(req.headers.get("tracestate"));
  });

  it("does NOT inject headers when experimental is false", async () => {
    const config = resolveTracingConfig({ experimental: false, traceContextPropagation: true });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.isNull(req.headers.get("traceparent"));
    assert.isNull(req.headers.get("tracestate"));
  });

  it("does NOT inject headers when tracing is disabled entirely", async () => {
    const config = resolveTracingConfig(undefined);
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.isNull(req.headers.get("traceparent"));
    assert.isNull(req.headers.get("tracestate"));
  });

  it("does NOT inject headers when createRequestHeaders returns empty", async () => {
    const config = resolveTracingConfig({ experimental: true, traceContextPropagation: true });
    mockCreateRequestHeaders.mockReturnValue({});
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.isNull(req.headers.get("traceparent"));
    assert.isNull(req.headers.get("tracestate"));
  });

  it("propagation defaults to true when option is omitted", async () => {
    const config = resolveTracingConfig({ experimental: true });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    assert.equal(
      req.headers.get("traceparent"),
      "00-abcdef1234567890abcdef1234567890-1234567890abcdef-01",
    );
    assert.equal(req.headers.get("tracestate"), "azure=test");
  });

  it("propagation disabled via env var prevents header injection", async () => {
    process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "false";
    try {
      const config = resolveTracingConfig({ experimental: true });
      const fetch = getTracingFetch(mockFetch as any, config);
      await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

      assert.equal(capturedRequests.length, 1);
      const req = capturedRequests[0]!;
      assert.isNull(req.headers.get("traceparent"));
      assert.isNull(req.headers.get("tracestate"));
    } finally {
      delete process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION;
    }
  });

  it("preserves existing headers from the original request", async () => {
    const config = resolveTracingConfig({ experimental: true, traceContextPropagation: true });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer test-key", "Content-Type": "application/json" },
    });

    assert.equal(capturedRequests.length, 1);
    const req = capturedRequests[0]!;
    // Tracing headers injected
    assert.equal(
      req.headers.get("traceparent"),
      "00-abcdef1234567890abcdef1234567890-1234567890abcdef-01",
    );
    // Original headers preserved
    assert.equal(req.headers.get("Authorization"), "Bearer test-key");
    assert.equal(req.headers.get("Content-Type"), "application/json");
  });

  it("does not call createRequestHeaders when propagation is disabled", async () => {
    const config = resolveTracingConfig({ experimental: true, traceContextPropagation: false });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(mockCreateRequestHeaders.mock.calls.length, 0);
  });

  it("does not call createRequestHeaders when experimental is not set", async () => {
    const config = resolveTracingConfig({ traceContextPropagation: true });
    const fetch = getTracingFetch(mockFetch as any, config);
    await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(mockCreateRequestHeaders.mock.calls.length, 0);
  });

  it("calls inner fetch even when propagation is disabled", async () => {
    const config = resolveTracingConfig({ experimental: true, traceContextPropagation: false });
    const fetch = getTracingFetch(mockFetch as any, config);
    const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST" });

    assert.equal(response.status, 200);
    assert.equal(capturedRequests.length, 1);
  });
});
