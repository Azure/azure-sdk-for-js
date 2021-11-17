import { assert } from "chai";
import { OpenTelemetryInstrumenter, OpenTelemetrySpanWrapper } from "../../src/instrumenter";
import { TraceFlags, SpanContext, SpanStatusCode } from "@opentelemetry/api";
import { TracingSpanContext } from "@azure/core-tracing";
import { TraceState } from "./util/traceState";
import { TestSpan } from "./util/testSpan";

describe("OpenTelemetryInstrumenter", () => {
  const instrumenter = new OpenTelemetryInstrumenter();

  describe("#parseTraceparentHeader", () => {
    describe("with a valid Traceparent header", () => {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      const flags = "01";
      const traceParentHeader = `00-${traceId}-${spanId}-${flags}`;

      it("should extract a TracingSpanIdentifier from a properly formatted header", () => {
        const tracingSpanIdentifier = instrumenter.parseTraceparentHeader(traceParentHeader);
        assert.deepEqual(tracingSpanIdentifier, {
          traceId,
          spanId,
          traceFlags: TraceFlags.SAMPLED
        });
      });

      describe("with an invalid Traceparent header", () => {
        it("returns undefined when version is unknown", () => {
          const traceId = "11111111111111111111111111111111";
          const spanId = "2222222222222222";
          const flags = "00";
          const traceParentHeader = `99-${traceId}-${spanId}-${flags}`;

          const spanContext = instrumenter.parseTraceparentHeader(traceParentHeader);

          assert.strictEqual(
            spanContext,
            undefined,
            "Invalid traceparent version should return undefined spanContext."
          );
        });

        it("returns undefined when traceparent is malformed", () => {
          const traceParentHeader = `123abc`;

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
          traceFlags: TraceFlags.SAMPLED
        };
        const expectedTraceParentHeader = `00-11111111111111111111111111111111-2222222222222222-01`;

        const headers = instrumenter.createRequestHeaders(spanContext);
        assert.deepEqual(headers, {
          traceparent: expectedTraceParentHeader
        });
      });

      describe("when traceState is provided", () => {
        it("should return a traceState header", () => {
          const spanContext: SpanContext = {
            spanId: "2222222222222222",
            traceId: "11111111111111111111111111111111",
            traceFlags: TraceFlags.NONE,
            traceState: new TraceState()
          };
          spanContext.traceState = spanContext.traceState!.set("foo", "bar");

          const expectedTraceParentHeader = `00-11111111111111111111111111111111-2222222222222222-00`;
          const expectedTraceStateHeader = `foo=bar`;

          const headers = instrumenter.createRequestHeaders(spanContext);

          assert.deepEqual(headers, {
            traceparent: expectedTraceParentHeader,
            tracestate: expectedTraceStateHeader
          });
        });
      });

      describe("when a traceState is not provided", () => {
        it("does not include it in the result set", () => {
          const spanContext: SpanContext = {
            spanId: "2222222222222222",
            traceId: "11111111111111111111111111111111",
            traceFlags: TraceFlags.NONE
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
            traceState: new TraceState()
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
          traceState: new TraceState()
        };

        const headers = instrumenter.createRequestHeaders(spanContext);

        assert.isEmpty(headers);
      });
      it("returns an empty collection when spanId is missing", () => {
        const spanContext: SpanContext = {
          spanId: "",
          traceId: "11111111111111111111111111111111",
          traceFlags: TraceFlags.NONE,
          traceState: new TraceState()
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
            traceState: new TraceState()
          };
          spanContext.traceState = spanContext.traceState!.set("foo", "bar");

          const headers = instrumenter.createRequestHeaders(spanContext);

          assert.isEmpty(headers);
        });
      });
    });
  });

  describe("#startSpan", () => {
    it("returns a newly created TracingSpan", () => {
      const { span } = instrumenter.startSpan("test");
      console.log(span);
    });

    describe("with an existing context", () => {
      it("will return a context that contains all existing fields");
      it("will set span on the context");
    });

    describe("when a context is not provided", () => {
      it("will use the active context");
      it("will set span on the context");
    });

    describe("with spanOptions", () => {});
  });
  describe("#withContext", () => {
    it("will set the given context as active");
  });

  describe("OpenTelemetrySpanWrapper", () => {
    let otSpan: TestSpan;
    let span: OpenTelemetrySpanWrapper;

    beforeEach(() => {
      otSpan = new TestSpan("test", {
        spanId: "1234567890",
        traceId: "1234567890",
        traceFlags: TraceFlags.NONE
      });
      span = new OpenTelemetrySpanWrapper(otSpan);
    });

    describe("#setStatus", () => {
      describe("with a successful status", () => {
        it("sets the status on the span", () => {
          span.setStatus({ status: "success" });

          assert.deepEqual(otSpan.status, { code: SpanStatusCode.OK });
        });
      });

      describe("with an error", () => {
        it("sets the failed status on the span", () => {
          span.setStatus({ status: "error" });

          assert.deepEqual(otSpan.status, { code: SpanStatusCode.ERROR });
        });

        it("records the exception if provided", () => {
          const error = new Error("test");
          span.setStatus({ status: "error", error });

          assert.deepEqual(otSpan.exception, error);
        });
      });
    });

    describe("#setAttribute", () => {
      it("records the attribute on the span", () => {
        span.setAttribute("test", "value");
        span.setAttribute("array", ["value"]);

        assert.deepEqual(otSpan.attributes, { test: "value", array: ["value"] });
      });

      it("ignores null", () => {
        span.setAttribute("test", null);

        assert.isEmpty(otSpan.attributes);
      });

      it("ignores undefined", () => {
        span.setAttribute("test", undefined);

        assert.isEmpty(otSpan.attributes);
      });
    });

    describe("#end", () => {
      it("ends the wrapped span", () => {
        span.end();

        assert.isTrue(otSpan.endCalled);
      });
    });

    describe("#recordException", () => {
      it("sets the error on the wrapped span", () => {
        const error = new Error("test");
        span.recordException(error);

        assert.deepEqual(otSpan.exception, error);
      });
      it("does not change the status", () => {
        const error = "test";
        span.recordException(error);

        assert.deepEqual(otSpan.status, { code: SpanStatusCode.UNSET });
      });
    });

    describe("#isRecording", () => {
      it("returns the value of the wrapped span", () => {
        assert.equal(span.isRecording(), otSpan.isRecording());
      });
    });

    describe("#spanContext", () => {
      it("returns the wrapped span context", () => {
        assert.deepEqual(span.spanContext, otSpan.spanContext());
      });
    });
  });
});
