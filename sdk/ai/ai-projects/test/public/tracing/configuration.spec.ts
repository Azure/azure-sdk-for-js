// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, afterEach } from "vitest";
import { resolveTracingConfig } from "../../../src/tracing/configuration.js";

describe("resolveTracingConfig", () => {
  afterEach(() => {
    delete process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING;
    delete process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION;
    delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  describe("enabled (experimental gate)", () => {
    it("returns enabled:false when options is undefined", () => {
      const config = resolveTracingConfig(undefined);
      assert.isFalse(config.enabled);
    });

    it("returns enabled:false when tracingOptions passed without experimental", () => {
      const config = resolveTracingConfig({});
      assert.isFalse(config.enabled);
    });

    it("returns enabled:true when experimental:true is passed", () => {
      const config = resolveTracingConfig({ experimental: true });
      assert.isTrue(config.enabled);
    });

    it("returns enabled:false when experimental:false overrides env var", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      const config = resolveTracingConfig({ experimental: false });
      assert.isFalse(config.enabled);
    });

    it("reads AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING env var when option omitted", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "true";
      const config = resolveTracingConfig({});
      assert.isTrue(config.enabled);
    });

    it("reads AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=1", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "1";
      const config = resolveTracingConfig({});
      assert.isTrue(config.enabled);
    });

    it("env var FALSE does not enable", () => {
      process.env.AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING = "false";
      const config = resolveTracingConfig({});
      assert.isFalse(config.enabled);
    });

    it("env var not set and no option means disabled", () => {
      const config = resolveTracingConfig({});
      assert.isFalse(config.enabled);
    });
  });

  describe("contentRecording", () => {
    it("defaults to false when not specified", () => {
      const config = resolveTracingConfig({ experimental: true });
      assert.isFalse(config.contentRecording);
    });

    it("explicit true enables it", () => {
      const config = resolveTracingConfig({ experimental: true, contentRecording: true });
      assert.isTrue(config.contentRecording);
    });

    it("explicit false overrides env var", () => {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
      const config = resolveTracingConfig({ experimental: true, contentRecording: false });
      assert.isFalse(config.contentRecording);
    });

    it("reads env var when option omitted", () => {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
      const config = resolveTracingConfig({ experimental: true });
      assert.isTrue(config.contentRecording);
    });

    it("reads env var 1", () => {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "1";
      const config = resolveTracingConfig({ experimental: true });
      assert.isTrue(config.contentRecording);
    });

    it("returns false in disabled config regardless of option", () => {
      const config = resolveTracingConfig(undefined);
      assert.isFalse(config.contentRecording);
    });
  });

  describe("traceContextPropagation", () => {
    it("defaults to true when not specified", () => {
      const config = resolveTracingConfig({ experimental: true });
      assert.isTrue(config.traceContextPropagation);
    });

    it("can be disabled via option", () => {
      const config = resolveTracingConfig({ experimental: true, traceContextPropagation: false });
      assert.isFalse(config.traceContextPropagation);
    });

    it("can be explicitly enabled via option", () => {
      const config = resolveTracingConfig({ experimental: true, traceContextPropagation: true });
      assert.isTrue(config.traceContextPropagation);
    });

    it("explicit false overrides env var true", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "true";
      const config = resolveTracingConfig({ experimental: true, traceContextPropagation: false });
      assert.isFalse(config.traceContextPropagation);
    });

    it("reads env var false when option omitted", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "false";
      const config = resolveTracingConfig({ experimental: true });
      assert.isFalse(config.traceContextPropagation);
    });

    it("reads env var 0 when option omitted", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "0";
      const config = resolveTracingConfig({ experimental: true });
      assert.isFalse(config.traceContextPropagation);
    });

    it("reads env var FALSE case-insensitive", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "FALSE";
      const config = resolveTracingConfig({ experimental: true });
      assert.isFalse(config.traceContextPropagation);
    });

    it("defaults to true when env var is empty", () => {
      process.env.AZURE_TRACING_GEN_AI_ENABLE_TRACE_CONTEXT_PROPAGATION = "";
      const config = resolveTracingConfig({ experimental: true });
      assert.isTrue(config.traceContextPropagation);
    });

    it("returns true in disabled config regardless", () => {
      const config = resolveTracingConfig(undefined);
      assert.isTrue(config.traceContextPropagation);
    });
  });

  describe("per-instance isolation", () => {
    it("two configs with different contentRecording are independent", () => {
      const config1 = resolveTracingConfig({ experimental: true, contentRecording: true });
      const config2 = resolveTracingConfig({ experimental: true, contentRecording: false });
      assert.isTrue(config1.contentRecording);
      assert.isFalse(config2.contentRecording);
    });

    it("two configs with different traceContextPropagation are independent", () => {
      const config1 = resolveTracingConfig({ experimental: true, traceContextPropagation: false });
      const config2 = resolveTracingConfig({ experimental: true, traceContextPropagation: true });
      assert.isFalse(config1.traceContextPropagation);
      assert.isTrue(config2.traceContextPropagation);
    });

    it("one enabled and one disabled are independent", () => {
      const config1 = resolveTracingConfig({ experimental: true, contentRecording: true });
      const config2 = resolveTracingConfig(undefined);
      assert.isTrue(config1.enabled);
      assert.isTrue(config1.contentRecording);
      assert.isFalse(config2.enabled);
      assert.isFalse(config2.contentRecording);
    });

    it("modifying one config does not affect the other", () => {
      const config1 = resolveTracingConfig({ experimental: true, contentRecording: true });
      const config2 = resolveTracingConfig({ experimental: true, contentRecording: false });
      // Both should retain their own values
      assert.isTrue(config1.enabled);
      assert.isTrue(config1.contentRecording);
      assert.isTrue(config2.enabled);
      assert.isFalse(config2.contentRecording);
    });
  });
});
