import { assert } from "chai";
import { OpenTelemetryInstrumenter } from "../../src/instrumenter";
import { TraceFlags } from "@opentelemetry/api";

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
    });
  });
  describe("#createRequestHeaders", () => {
    describe("with a valid span identifier", () => {
      it("should return a valid Traceparent header");
    });
  });
});
