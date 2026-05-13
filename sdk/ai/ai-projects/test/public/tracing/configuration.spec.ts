// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  enableGenAITracing,
  disableGenAITracing,
  isTraceContextPropagationEnabled,
  isContentRecordingEnabled,
  isGenAITracingEnabled,
  isGenAITracingApplied,
} from "../../../src/tracing/configuration.js";

describe("configuration", () => {
  afterEach(() => {
    disableGenAITracing();
    delete process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION;
    delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  describe("traceContextPropagation", () => {
    it("defaults to true when not specified", () => {
      enableGenAITracing({ experimental: true });
      assert.isTrue(isTraceContextPropagationEnabled());
    });

    it("can be disabled via option", () => {
      enableGenAITracing({ experimental: true, traceContextPropagation: false });
      assert.isFalse(isTraceContextPropagationEnabled());
    });

    it("can be explicitly enabled via option", () => {
      enableGenAITracing({ experimental: true, traceContextPropagation: true });
      assert.isTrue(isTraceContextPropagationEnabled());
    });

    it("explicit false overrides env var true", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "true";
      enableGenAITracing({ experimental: true, traceContextPropagation: false });
      assert.isFalse(isTraceContextPropagationEnabled());
    });

    it("reads env var false when option omitted", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "false";
      enableGenAITracing({ experimental: true });
      assert.isFalse(isTraceContextPropagationEnabled());
    });

    it("reads env var 0 when option omitted", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "0";
      enableGenAITracing({ experimental: true });
      assert.isFalse(isTraceContextPropagationEnabled());
    });

    it("reads env var FALSE case-insensitive", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "FALSE";
      enableGenAITracing({ experimental: true });
      assert.isFalse(isTraceContextPropagationEnabled());
    });

    it("defaults to true when env var is unset", () => {
      enableGenAITracing({ experimental: true });
      assert.isTrue(isTraceContextPropagationEnabled());
    });

    it("defaults to true when env var is empty", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "";
      enableGenAITracing({ experimental: true });
      assert.isTrue(isTraceContextPropagationEnabled());
    });

    it("resets to true on disableGenAITracing", () => {
      enableGenAITracing({ experimental: true, traceContextPropagation: false });
      assert.isFalse(isTraceContextPropagationEnabled());
      disableGenAITracing();
      assert.isTrue(isTraceContextPropagationEnabled());
    });

    it("resets to true on subsequent enableGenAITracing without option", () => {
      enableGenAITracing({ experimental: true, traceContextPropagation: false });
      assert.isFalse(isTraceContextPropagationEnabled());
      enableGenAITracing({ experimental: true });
      assert.isTrue(isTraceContextPropagationEnabled());
    });
  });

  describe("experimental", () => {
    it("defaults to false when not specified and no env var", () => {
      enableGenAITracing();
      assert.isTrue(isGenAITracingEnabled());
      assert.isFalse(isGenAITracingApplied());
    });

    it("explicit true enables applied", () => {
      enableGenAITracing({ experimental: true });
      assert.isTrue(isGenAITracingApplied());
    });

    it("explicit false overrides env var", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      enableGenAITracing({ experimental: false });
      assert.isFalse(isGenAITracingApplied());
    });

    it("reads env var when option omitted", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      enableGenAITracing();
      assert.isTrue(isGenAITracingApplied());
    });

    it("reads env var 1", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "1";
      enableGenAITracing();
      assert.isTrue(isGenAITracingApplied());
    });
  });

  describe("contentRecording", () => {
    it("defaults to false when not specified", () => {
      enableGenAITracing({ experimental: true });
      assert.isFalse(isContentRecordingEnabled());
    });

    it("explicit true enables it", () => {
      enableGenAITracing({ experimental: true, contentRecording: true });
      assert.isTrue(isContentRecordingEnabled());
    });

    it("explicit false overrides env var", () => {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
      enableGenAITracing({ experimental: true, contentRecording: false });
      assert.isFalse(isContentRecordingEnabled());
    });

    it("reads env var when option omitted", () => {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
      enableGenAITracing({ experimental: true });
      assert.isTrue(isContentRecordingEnabled());
    });
  });
});
