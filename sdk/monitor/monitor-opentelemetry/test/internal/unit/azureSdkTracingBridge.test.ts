// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AzureSdkInstrumentation } from "../../../src/traces/azureSdkInstrumentation.js";
import type * as CoreTracing from "@azure/core-tracing";
import { context, trace, TraceFlags } from "@opentelemetry/api";
import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ensureAzureSdkTracingBridge } from "../../../src/utils/azureSdkTracingBridge.js";

const esmRequire = createRequire(import.meta.url);

describe("ensureAzureSdkTracingBridge", () => {
  let instrumentation: AzureSdkInstrumentation;
  let provider: NodeTracerProvider;
  let exporter: InMemorySpanExporter;
  beforeEach(() => {
    trace.disable();
    context.disable();
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)],
    });
    provider.register();
    instrumentation = new AzureSdkInstrumentation();
  });

  afterEach(async () => {
    instrumentation.disable();
    await provider.shutdown();
    trace.disable();
    context.disable();
    vi.restoreAllMocks();
  });

  it("should install the distro-owned OpenTelemetry bridge", () => {
    const coreTracing = esmRequire("@azure/core-tracing") as typeof CoreTracing;
    const spy = vi.spyOn(coreTracing, "useInstrumenter");

    ensureAzureSdkTracingBridge(instrumentation);

    expect(spy).toHaveBeenCalled();
    const arg = spy.mock.calls[0][0] as { startSpan?: unknown; withContext?: unknown };
    expect(arg).toBeDefined();
    expect(typeof arg.startSpan).toBe("function");
    expect(typeof arg.withContext).toBe("function");
  });

  it("should not throw if called multiple times", () => {
    expect(() => {
      ensureAzureSdkTracingBridge(instrumentation);
      ensureAzureSdkTracingBridge(instrumentation);
    }).not.toThrow();
  });

  it.each(["eager", "module-hook"])(
    "preserves callback results, exceptions and async context in the %s bridge",
    async (installation) => {
      const useInstrumenter = vi.fn<typeof CoreTracing.useInstrumenter>();
      if (installation === "eager") {
        const coreTracing = esmRequire("@azure/core-tracing") as typeof CoreTracing;
        vi.spyOn(coreTracing, "useInstrumenter").mockImplementation(useInstrumenter);
        ensureAzureSdkTracingBridge(instrumentation);
      } else {
        const definition = instrumentation
          .getModuleDefinitions()
          .find((module) => module.name === "@azure/core-tracing");
        expect(definition?.patch).toBeDefined();
        definition?.patch?.({ useInstrumenter });
      }
      expect(useInstrumenter).toHaveBeenCalled();
      const bridge = useInstrumenter.mock.calls[0][0];
      const key = Symbol("async-context");
      const parent = context.active().setValue(key, "parent");
      const error = new Error("callback failure");
      for (const enabled of [true, false, true]) {
        if (enabled) instrumentation.enable();
        else instrumentation.disable();
        expect(
          bridge.withContext(
            parent,
            (arg: string) => {
              expect(context.active().getValue(key)).toBe("parent");
              return arg;
            },
            "sync result",
          ),
        ).toBe("sync result");
        expect(context.active().getValue(key)).toBeUndefined();
        expect(() =>
          bridge.withContext(parent, () => {
            expect(context.active().getValue(key)).toBe("parent");
            throw error;
          }),
        ).toThrow(error);
        expect(context.active().getValue(key)).toBeUndefined();
        const value = await bridge.withContext(
          parent,
          async (arg: string) => {
            expect(context.active().getValue(key)).toBe("parent");
            await Promise.resolve();
            expect(context.active().getValue(key)).toBe("parent");
            return arg;
          },
          "result",
        );
        expect(value).toBe("result");
        expect(context.active().getValue(key)).toBeUndefined();
      }
    },
  );

  it("ignores a core-tracing module without a useInstrumenter export", () => {
    const definition = instrumentation.getModuleDefinitions()[0];
    const exports = { unrelated: true };
    expect(definition.patch?.(exports)).toBe(exports);
  });

  it.each(["eager", "module-hook"])(
    "disables and re-enables the %s bridge without disabling manual telemetry",
    (installation) => {
      const useInstrumenter = vi.fn<typeof CoreTracing.useInstrumenter>();
      if (installation === "eager") {
        const coreTracing = esmRequire("@azure/core-tracing") as typeof CoreTracing;
        vi.spyOn(coreTracing, "useInstrumenter").mockImplementation(useInstrumenter);
        ensureAzureSdkTracingBridge(instrumentation);
      } else {
        const definition = instrumentation
          .getModuleDefinitions()
          .find((module) => module.name === "@azure/core-tracing");
        expect(definition?.patch).toBeDefined();
        definition?.patch?.({ useInstrumenter });
      }
      expect(useInstrumenter).toHaveBeenCalled();
      const bridge = useInstrumenter.mock.calls[0][0];
      const options = { packageName: "lifecycle" };
      bridge.startSpan("enabled", options).span.end();
      expect(exporter.getFinishedSpans().map((span) => span.name)).toEqual(["enabled"]);

      instrumentation.disable();
      const key = Symbol("parent-context");
      const parentSpanContext = {
        traceId: "4bf92f3577b34da6a3ce929d0e0e4736",
        spanId: "00f067aa0ba902b7",
        traceFlags: TraceFlags.SAMPLED,
      };
      const parent = trace.setSpanContext(context.active().setValue(key, true), parentSpanContext);
      const disabled = bridge.startSpan("disabled", { ...options, tracingContext: parent });
      expect(disabled.span.isRecording()).toBe(false);
      expect(disabled.tracingContext.getValue(key)).toBe(true);
      disabled.span.setAttribute("test", true);
      disabled.span.setStatus({ status: "success" });
      disabled.span.addEvent?.("test");
      disabled.span.recordException(new Error("test"));
      disabled.span.end();
      expect(bridge.createRequestHeaders(parent)).toEqual({});
      expect(
        bridge.parseTraceparentHeader("00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"),
      ).toBeUndefined();
      expect(
        bridge.withContext(
          parent,
          (value: string) => {
            expect(context.active().getValue(key)).toBe(true);
            trace.getTracer("manual").startSpan("manual").end();
            return value;
          },
          "result",
        ),
      ).toBe("result");
      expect(context.active().getValue(key)).toBeUndefined();
      expect(exporter.getFinishedSpans()[1].parentSpanContext).toEqual(parentSpanContext);

      instrumentation.enable();
      bridge.startSpan("reenabled", options).span.end();
      const headers = bridge.withContext(parent, () => {
        expect(context.active().getValue(key)).toBe(true);
        const { span, tracingContext } = bridge.startSpan("propagation", options);
        const requestHeaders = bridge.createRequestHeaders(tracingContext);
        span.end();
        return requestHeaders;
      });
      expect(headers.traceparent).toBeDefined();
      expect(bridge.parseTraceparentHeader(headers.traceparent)).toBeDefined();
      expect(exporter.getFinishedSpans().map((span) => span.name)).toEqual([
        "enabled",
        "manual",
        "reenabled",
        "propagation",
      ]);
    },
  );
});
