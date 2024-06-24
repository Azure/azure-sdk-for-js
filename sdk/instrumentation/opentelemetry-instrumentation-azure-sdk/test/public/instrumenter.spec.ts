// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetryInstrumenter, propagator } from "../../src/instrumenter.js";
import { SpanKind, context, trace } from "@opentelemetry/api";
import { TracingSpan, TracingSpanKind } from "@azure/core-tracing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { OpenTelemetrySpanWrapper } from "../../src/spanWrapper.js";
import { Span } from "@opentelemetry/sdk-trace-base";
import { environmentCache } from "../../src/configuration.js";
import { inMemoryExporter } from "./util/setup.js";
import { isTracingSuppressed } from "@opentelemetry/core";

function unwrap(span: TracingSpan): Span {
  return (span as OpenTelemetrySpanWrapper).unwrap() as Span;
}

describe("OpenTelemetryInstrumenter", () => {
  const instrumenter = new OpenTelemetryInstrumenter();

  describe("#createRequestHeaders", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("uses the passed in context if it exists", () => {
      const propagationSpy = vi.spyOn(propagator, "inject");
      const span = trace.getTracer("test").startSpan("test");
      const tracingContext = trace.setSpan(context.active(), span);
      instrumenter.createRequestHeaders(tracingContext);
      expect(propagationSpy).toHaveBeenCalledWith(
        tracingContext,
        expect.anything(),
        expect.anything(),
      );
    });

    it("uses the active context if no context was provided", () => {
      const propagationSpy = vi.spyOn(propagator, "inject");
      instrumenter.createRequestHeaders();
      const activeContext = context.active();
      expect(propagationSpy).toHaveBeenCalledWith(
        activeContext,
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe("#startSpan", () => {
    const packageName = "test-package";
    const packageVersion = "test-version";

    beforeEach(() => {
      inMemoryExporter.reset();
    });

    it("returns a newly started TracingSpan", () => {
      const { span } = instrumenter.startSpan("test", { packageName, packageVersion });
      span.end();
      const otSpan = unwrap(span);
      expect(inMemoryExporter.getFinishedSpans()).toHaveLength(1);
      expect(inMemoryExporter.getFinishedSpans()[0]).toBe(otSpan);
      expect(otSpan.kind).toBe(SpanKind.INTERNAL);
    });

    it("passes package information to the tracer", () => {
      const getTracerSpy = vi.spyOn(trace, "getTracer");
      instrumenter.startSpan("test", { packageName, packageVersion });

      expect(getTracerSpy).toHaveBeenCalledWith(packageName, packageVersion);
    });

    describe("with an existing context", () => {
      it("returns a context that contains all existing fields", () => {
        const currentContext = context.active().setValue(Symbol.for("foo"), "bar");

        const { tracingContext } = instrumenter.startSpan("test", {
          tracingContext: currentContext,
          packageName,
        });

        expect(tracingContext.getValue(Symbol.for("foo"))).toEqual("bar");
      });

      it("sets span on the context", () => {
        const currentContext = context.active().setValue(Symbol.for("foo"), "bar");

        const { span, tracingContext } = instrumenter.startSpan("test", {
          tracingContext: currentContext,
          packageName,
        });

        expect(trace.getSpan(tracingContext)).toBe(unwrap(span));
      });
    });

    describe("when a context is not provided", () => {
      it("uses the active context", () => {
        const contextSpy = vi.spyOn(context, "active");

        instrumenter.startSpan("test", { packageName, packageVersion });

        expect(contextSpy).toHaveBeenCalled();
      });

      it("sets span on the context", () => {
        const { span, tracingContext } = instrumenter.startSpan("test", {
          packageName,
          packageVersion,
        });

        expect(trace.getSpan(tracingContext)).toBe(unwrap(span));
      });
    });

    describe("spanOptions", () => {
      it("passes attributes to started span", () => {
        const spanAttributes = {
          attr1: "val1",
          attr2: "val2",
        };
        const { span } = instrumenter.startSpan("test", {
          spanAttributes,
          packageName,
          packageVersion,
        });

        expect(unwrap(span).attributes).to.deep.equal(spanAttributes);
      });

      describe("spanKind", () => {
        it("maps spanKind correctly", () => {
          const { span } = instrumenter.startSpan("test", {
            packageName,
            spanKind: "client",
          });
          expect(unwrap(span).kind).toBe(SpanKind.CLIENT);
        });

        it("defaults spanKind to INTERNAL if omitted", () => {
          const { span } = instrumenter.startSpan("test", { packageName });
          expect(unwrap(span).kind).toBe(SpanKind.INTERNAL);
        });

        // TODO: what's the right behavior? throw? log and continue?
        it("defaults spanKind to INTERNAL if an invalid spanKind is provided", () => {
          const { span } = instrumenter.startSpan("test", {
            packageName,
            spanKind: "foo" as TracingSpanKind,
          });
          expect(unwrap(span).kind).toBe(SpanKind.INTERNAL);
        });
      });

      it("supports spanLinks", () => {
        const { tracingContext: linkedSpanContext } = instrumenter.startSpan("linked", {
          packageName,
        });

        const { span } = instrumenter.startSpan("test", {
          packageName,
          spanLinks: [
            {
              tracingContext: linkedSpanContext,
              attributes: {
                attr1: "value1",
              },
            },
          ],
        });

        const links = unwrap(span).links;
        expect(links.length).toBe(1);
        expect(links[0].attributes).toEqual({ attr1: "value1" });
        expect(links[0].context).toEqual(trace.getSpan(linkedSpanContext)?.spanContext());
      });

      it("supports spanLinks from traceparentHeader", () => {
        const linkedContext = instrumenter.parseTraceparentHeader(
          "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
        );

        const { span } = instrumenter.startSpan("test", {
          packageName,
          spanLinks: [{ tracingContext: linkedContext! }],
        });

        const links = unwrap(span).links;
        expect(links.length).toBe(1);
        expect(links[0].context).toEqual(trace.getSpan(linkedContext!)?.spanContext());
      });
    });

    describe("environment variables", () => {
      afterEach(() => {
        environmentCache.clear();
      });

      describe("when AZURE_TRACING_DISABLED is set", () => {
        it("suppresses tracing for our spans", () => {
          environmentCache.set("AZURE_TRACING_DISABLED", "1");
          const { tracingContext, span } = instrumenter.startSpan("test", {
            packageName,
          });
          expect(span.isRecording()).toBe(false);
          expect(isTracingSuppressed(tracingContext)).toBe(false);
        });
      });

      describe("when AZURE_HTTP_TRACING_CHILDREN_DISABLED is set", () => {
        beforeEach(() => {
          environmentCache.set("AZURE_HTTP_TRACING_CHILDREN_DISABLED", "1");
        });

        it("suppresses tracing for downstream spans", () => {
          const { span, tracingContext } = instrumenter.startSpan("HTTP POST", {
            packageName,
          });

          expect(span.isRecording()).toBe(true);
          expect(isTracingSuppressed(tracingContext)).toBe(true);
        });

        it("does not suppress internal spans", () => {
          const { span, tracingContext } = instrumenter.startSpan("foo", {
            packageName,
          });

          expect(span.isRecording()).toBe(true);
          expect(isTracingSuppressed(tracingContext)).toBe(false);
        });
      });

      describe("when both AZURE_TRACING_DISABLED and AZURE_HTTP_TRACING_CHILDREN_DISABLED are set", () => {
        beforeEach(() => {
          environmentCache.set("AZURE_TRACING_DISABLED", "true");
          environmentCache.set("AZURE_HTTP_TRACING_CHILDREN_DISABLED", "True");
        });

        it("creates a non-recording span", () => {
          const { span } = instrumenter.startSpan("foo", {
            packageName,
          });

          expect(span.isRecording()).toBe(false);
        });

        it("does not suppress downstream spans", () => {
          const { tracingContext } = instrumenter.startSpan("foo", {
            packageName,
          });

          expect(isTracingSuppressed(tracingContext)).toBe(false);
        });
      });
    });
  });

  describe("#withContext", () => {
    it("passes the correct arguments to OpenTelemetry", function () {
      const contextSpy = vi.spyOn(context, "with");
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const callback = (arg1: number) => arg1 + 42;
      const callbackArg = 37;
      const activeContext = context.active();
      instrumenter.withContext(activeContext, callback, callbackArg);

      expect(contextSpy).toHaveBeenCalledWith(activeContext, callback, undefined, callbackArg);
    });

    it("Returns the value of the callback", () => {
      const result = instrumenter.withContext(context.active(), () => 42);
      expect(result).toBe(42);
    });
  });

  describe("#parseTraceparentHeader", () => {
    it("returns a new context with spanContext set", () => {
      const validTraceparentHeader = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";
      const updatedContext = instrumenter.parseTraceparentHeader(validTraceparentHeader);
      expect(updatedContext).toBeDefined();
      const spanContext = trace.getSpanContext(updatedContext!);
      expect(spanContext?.spanId).toBe("00f067aa0ba902b7");
      expect(spanContext?.traceId).toBe("4bf92f3577b34da6a3ce929d0e0e4736");
    });
  });
});
