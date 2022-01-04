// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { OpenTelemetryInstrumenter } from "../../src/instrumenter";
import { TraceFlags, SpanContext, trace, context, SpanKind } from "@opentelemetry/api";
import { TracingSpan, TracingSpanContext, TracingSpanKind } from "@azure/core-tracing";
import { TraceState } from "./util/traceState";
import { TestSpan } from "./util/testSpan";
import { TestTracer } from "./util/testTracer";
import { resetTracer, setTracer } from "./util/testTracerProvider";
import sinon from "sinon";
import { Context } from "mocha";
import { OpenTelemetrySpanWrapper } from "../../src/spanWrapper";

describe("OpenTelemetryInstrumenter", () => {
  const instrumenter = new OpenTelemetryInstrumenter();

  describe("#parseTraceparentHeader", () => {
    describe("with a valid Traceparent header", () => {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      let flags = "01";
      let traceParentHeader = `00-${traceId}-${spanId}-${flags}`;

      it("should extract a TracingSpanIdentifier from a properly formatted header", () => {
        const tracingSpanIdentifier = instrumenter.parseTraceparentHeader(traceParentHeader);
        assert.deepEqual(tracingSpanIdentifier, {
          traceId,
          spanId,
          traceFlags: TraceFlags.SAMPLED,
        });
      });

      describe("with an invalid Traceparent header", () => {
        it("returns undefined when version is unknown", () => {
          flags = "00";
          traceParentHeader = `99-${traceId}-${spanId}-${flags}`;

          const spanContext = instrumenter.parseTraceparentHeader(traceParentHeader);

          assert.strictEqual(
            spanContext,
            undefined,
            "Invalid traceparent version should return undefined spanContext."
          );
        });

        it("returns undefined when traceparent is malformed", () => {
          traceParentHeader = `123abc`;

          const spanContext = instrumenter.parseTraceparentHeader(traceParentHeader);

          assert.strictEqual(
            spanContext,
            undefined,
            "Malformed traceparent should return undefined spanContext."
          );
        });
      });
    });
  });

  describe("#createRequestHeaders", () => {
    describe("with a valid span context", () => {
      it("should return a valid Traceparent header", () => {
        const spanContext: TracingSpanContext = {
          spanId: "2222222222222222",
          traceId: "11111111111111111111111111111111",
          traceFlags: TraceFlags.SAMPLED,
        };
        const expectedTraceParentHeader = `00-11111111111111111111111111111111-2222222222222222-01`;

        const headers = instrumenter.createRequestHeaders(spanContext);
        assert.deepEqual(headers, {
          traceparent: expectedTraceParentHeader,
        });
      });

      describe("when traceState is provided", () => {
        it("should return a traceState header", () => {
          const spanContext: SpanContext = {
            spanId: "2222222222222222",
            traceId: "11111111111111111111111111111111",
            traceFlags: TraceFlags.NONE,
            traceState: new TraceState(),
          };
          spanContext.traceState = spanContext.traceState!.set("foo", "bar");

          const expectedTraceParentHeader = `00-11111111111111111111111111111111-2222222222222222-00`;
          const expectedTraceStateHeader = `foo=bar`;

          const headers = instrumenter.createRequestHeaders(spanContext);

          assert.deepEqual(headers, {
            traceparent: expectedTraceParentHeader,
            tracestate: expectedTraceStateHeader,
          });
        });
      });

      describe("when a traceState is not provided", () => {
        it("does not include it in the result set", () => {
          const spanContext: SpanContext = {
            spanId: "2222222222222222",
            traceId: "11111111111111111111111111111111",
            traceFlags: TraceFlags.NONE,
          };

          const headers = instrumenter.createRequestHeaders(spanContext);

          assert.notExists(headers.tracestate);
        });
      });

      describe("when a traceState is not empty", () => {
        it("does not include it in the result set", () => {
          const spanContext: SpanContext = {
            spanId: "2222222222222222",
            traceId: "11111111111111111111111111111111",
            traceFlags: TraceFlags.NONE,
            traceState: new TraceState(),
          };

          const headers = instrumenter.createRequestHeaders(spanContext);

          assert.notExists(headers.tracestate);
        });
      });
    });

    describe("with an incomplete span context", () => {
      it("returns an empty collection when traceId is missing", () => {
        const spanContext: SpanContext = {
          spanId: "2222222222222222",
          traceId: "",
          traceFlags: TraceFlags.NONE,
          traceState: new TraceState(),
        };

        const headers = instrumenter.createRequestHeaders(spanContext);

        assert.isEmpty(headers);
      });

      it("returns an empty collection when spanId is missing", () => {
        const spanContext: SpanContext = {
          spanId: "",
          traceId: "11111111111111111111111111111111",
          traceFlags: TraceFlags.NONE,
          traceState: new TraceState(),
        };

        const headers = instrumenter.createRequestHeaders(spanContext);

        assert.isEmpty(headers);
      });

      describe("when a traceState is provided", () => {
        it("does not include it when traceparent is invalid", () => {
          const spanContext: SpanContext = {
            spanId: "",
            traceId: "11111111111111111111111111111111",
            traceFlags: TraceFlags.NONE,
            traceState: new TraceState(),
          };
          spanContext.traceState = spanContext.traceState!.set("foo", "bar");

          const headers = instrumenter.createRequestHeaders(spanContext);

          assert.isEmpty(headers);
        });
      });
    });
  });

  // TODO: the following still uses existing test support for OTel.
  // Once the new APIs are available we should move away from those.
  describe("#startSpan", () => {
    function unwrap(span: TracingSpan): TestSpan {
      return (span as OpenTelemetrySpanWrapper).unwrap() as TestSpan;
    }
    let tracer: TestTracer;
    const packageName = "test-package";
    const packageVersion = "test-version";
    beforeEach(() => {
      tracer = setTracer(tracer);
    });

    afterEach(() => {
      resetTracer();
    });

    it("returns a newly started TracingSpan", () => {
      const { span } = instrumenter.startSpan("test", { packageName, packageVersion });
      const otSpan = unwrap(span);
      assert.equal(otSpan, tracer.getActiveSpans()[0]);
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
        const { span: linkedSpan } = instrumenter.startSpan("linked", { packageName });
        const { span } = instrumenter.startSpan("test", {
          packageName,
          spanLinks: [
            {
              spanContext: linkedSpan.spanContext,
              attributes: {
                attr1: "value1",
              },
            },
          ],
        });

        const links = unwrap(span).links;
        assert.equal(links.length, 1);

        assert.deepEqual(links[0], {
          attributes: {
            attr1: "value1",
          },
          context: {
            ...linkedSpan.spanContext,
            traceState: undefined,
          },
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
        assert.isUndefined(this);
      });
      instrumenter.withContext(
        context.active(),
        function (this: any) {
          assert.equal(this, 42);
        }.bind(42)
      );

      // Arrow syntax
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
});
