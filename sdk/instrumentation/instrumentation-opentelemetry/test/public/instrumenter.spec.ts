import { assert } from "chai";
import { OpenTelemetryInstrumenter } from "../../src/instrumenter";
import { TraceFlags, SpanContext } from "@opentelemetry/api";
import { TracingSpanContext } from "@azure/core-tracing";
import { TraceState } from "./util/traceState";

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
});
