// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetryInstrumenter, propagator } from "../../src/instrumenter";
import { SpanKind, context, trace } from "@opentelemetry/api";
import { TracingSpan, TracingSpanKind } from "@azure/core-tracing";

import { Context } from "mocha";
import { OpenTelemetrySpanWrapper } from "../../src/spanWrapper";
import { Span } from "@opentelemetry/sdk-trace-base";
import { assert } from "chai";
import { environmentCache } from "../../src/configuration";
import { inMemoryExporter } from "./util/setup";
import { isTracingSuppressed } from "@opentelemetry/core";
import sinon from "sinon";

function unwrap(span: TracingSpan): Span {
  return (span as OpenTelemetrySpanWrapper).unwrap() as Span;
}

describe("OpenTelemetryInstrumenter", () => {
  const instrumenter = new OpenTelemetryInstrumenter();

  describe("#createRequestHeaders", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("uses the passed in context if it exists", () => {
      const propagationSpy = sinon.spy(propagator);
      const span = trace.getTracer("test").startSpan("test");
      const tracingContext = trace.setSpan(context.active(), span);
      instrumenter.createRequestHeaders(tracingContext);
      assert.isTrue(propagationSpy.inject.calledWith(tracingContext));
    });

    it("uses the active context if no context was provided", () => {
      const propagationSpy = sinon.spy(propagator);
      instrumenter.createRequestHeaders();
      const activeContext = context.active();
      assert.isTrue(propagationSpy.inject.calledWith(activeContext));
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
      assert.lengthOf(inMemoryExporter.getFinishedSpans(), 1);
      assert.equal(otSpan, inMemoryExporter.getFinishedSpans()[0]);
      assert.equal(otSpan.kind, SpanKind.INTERNAL);
    });

    it("passes package information to the tracer", () => {
      const getTracerSpy = sinon.spy(trace, "getTracer");
      instrumenter.startSpan("test", { packageName, packageVersion });

      assert.isTrue(getTracerSpy.calledWith(packageName, packageVersion));
    });

    describe("with an existing context", () => {
      it("returns a context that contains all existing fields", () => {
        const currentContext = context.active().setValue(Symbol.for("foo"), "bar");

        const { tracingContext } = instrumenter.startSpan("test", {
          tracingContext: currentContext,
          packageName,
        });

        assert.equal(tracingContext.getValue(Symbol.for("foo")), "bar");
      });

      it("sets span on the context", () => {
        const currentContext = context.active().setValue(Symbol.for("foo"), "bar");

        const { span, tracingContext } = instrumenter.startSpan("test", {
          tracingContext: currentContext,
          packageName,
        });

        assert.equal(trace.getSpan(tracingContext), unwrap(span));
      });
    });

    describe("when a context is not provided", () => {
      it("uses the active context", () => {
        const contextSpy = sinon.spy(context, "active");

        instrumenter.startSpan("test", { packageName, packageVersion });

        assert.isTrue(contextSpy.called);
      });

      it("sets span on the context", () => {
        const { span, tracingContext } = instrumenter.startSpan("test", {
          packageName,
          packageVersion,
        });

        assert.equal(trace.getSpan(tracingContext), unwrap(span));
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

        assert.deepEqual(unwrap(span).attributes, spanAttributes);
      });

      describe("spanKind", () => {
        it("maps spanKind correctly", () => {
          const { span } = instrumenter.startSpan("test", {
            packageName,
            spanKind: "client",
          });
          assert.equal(unwrap(span).kind, SpanKind.CLIENT);
        });

        it("defaults spanKind to INTERNAL if omitted", () => {
          const { span } = instrumenter.startSpan("test", { packageName });
          assert.equal(unwrap(span).kind, SpanKind.INTERNAL);
        });

        // TODO: what's the right behavior? throw? log and continue?
        it("defaults spanKind to INTERNAL if an invalid spanKind is provided", () => {
          const { span } = instrumenter.startSpan("test", {
            packageName,
            spanKind: "foo" as TracingSpanKind,
          });
          assert.equal(unwrap(span).kind, SpanKind.INTERNAL);
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
        assert.equal(links.length, 1);
        assert.deepEqual(links[0].attributes, { attr1: "value1" });
        assert.deepEqual(links[0].context, trace.getSpan(linkedSpanContext)?.spanContext());
      });

      it("supports spanLinks from traceparentHeader", () => {
        const linkedContext = instrumenter.parseTraceparentHeader(
          "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
        );

        const { span } = instrumenter.startSpan("test", {
          packageName,
          spanLinks: [{ tracingContext: linkedContext! }],
        });

        const links = unwrap(span).links;
        assert.equal(links.length, 1);
        assert.deepEqual(links[0].context, trace.getSpan(linkedContext!)?.spanContext());
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
          assert.isFalse(span.isRecording());
          assert.isFalse(isTracingSuppressed(tracingContext));
        });
      });

      describe("when AZURE_HTTP_TRACING_DISABLED is set", () => {
        beforeEach(() => {
          environmentCache.set("AZURE_HTTP_TRACING_DISABLED", "1");
        });

        it("suppresses tracing for downstream spans", () => {
          const { span, tracingContext } = instrumenter.startSpan("HTTP POST", {
            packageName,
          });

          assert.isTrue(span.isRecording());
          assert.isTrue(isTracingSuppressed(tracingContext));
        });

        it("does not suppress internal spans", () => {
          const { span, tracingContext } = instrumenter.startSpan("foo", {
            packageName,
          });

          assert.isTrue(span.isRecording());
          assert.isFalse(isTracingSuppressed(tracingContext));
        });
      });

      describe("when both AZURE_TRACING_DISABLED and AZURE_HTTP_TRACING_DISABLED are set", () => {
        beforeEach(() => {
          environmentCache.set("AZURE_TRACING_DISABLED", "true");
          environmentCache.set("AZURE_HTTP_TRACING_DISABLED", "True");
        });

        it("creates a non-recording span", () => {
          const { span } = instrumenter.startSpan("foo", {
            packageName,
          });

          assert.isFalse(span.isRecording());
        });

        it("does not suppress downstream spans", () => {
          const { tracingContext } = instrumenter.startSpan("foo", {
            packageName,
          });

          assert.isFalse(isTracingSuppressed(tracingContext));
        });
      });
    });
  });

  describe("#withContext", () => {
    it("passes the correct arguments to OpenTelemetry", function (this: Context) {
      const contextSpy = sinon.spy(context, "with");
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const callback = (arg1: number) => arg1 + 42;
      const callbackArg = 37;
      const activeContext = context.active();
      instrumenter.withContext(activeContext, callback, callbackArg);

      assert.isTrue(contextSpy.calledWith(activeContext, callback, undefined, callbackArg));
    });

    it("works when caller binds `this`", function (this: Context) {
      // a bit of a silly test but demonstrates how to bind `this` correctly
      // and ensures the behavior does not regress

      // Function syntax
      instrumenter.withContext(context.active(), function (this: any) {
        assert.notExists(this);
      });
      instrumenter.withContext(
        context.active(),
        function (this: any) {
          assert.equal(this, 42);
        }.bind(42)
      );

      // Arrow syntax
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      instrumenter.withContext(context.active(), () => {
        assert.equal(this, that);
      });
    });

    it("Returns the value of the callback", () => {
      const result = instrumenter.withContext(context.active(), () => 42);
      assert.equal(result, 42);
    });
  });

  describe("#parseTraceparentHeader", () => {
    it("returns a new context with spanContext set", () => {
      const validTraceparentHeader = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";
      const updatedContext = instrumenter.parseTraceparentHeader(validTraceparentHeader);
      assert.exists(updatedContext);
      const spanContext = trace.getSpanContext(updatedContext!);
      assert.equal(spanContext?.spanId, "00f067aa0ba902b7");
      assert.equal(spanContext?.traceId, "4bf92f3577b34da6a3ce929d0e0e4736");
    });
  });
});
