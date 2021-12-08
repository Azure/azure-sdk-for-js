// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanContext, TraceFlags } from "@opentelemetry/api";
import { extractSpanContextFromTraceParentHeader, getTraceParentHeader } from "../src";
import { assert } from "chai";

describe("traceParentHeader", () => {
  describe("#extractSpanContextFromTraceParentHeader", () => {
    it("should extract a SpanContext from a properly formatted traceparent", () => {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      const flags = "00";
      const traceParentHeader = `00-${traceId}-${spanId}-${flags}`;

      const spanContext = extractSpanContextFromTraceParentHeader(traceParentHeader);
      if (!spanContext) {
        assert.fail("Extracted spanContext should be defined.");
        return;
      }
      assert.equal(spanContext.traceId, traceId, "Extracted traceId does not match expectation.");
      assert.equal(spanContext.spanId, spanId, "Extracted spanId does not match expectation.");
      assert.equal(
        spanContext.traceFlags,
        TraceFlags.NONE,
        "Extracted traceFlags do not match expectations."
      );
    });

    describe("should return undefined", () => {
      it("when traceparent contains an unknown version", () => {
        const traceId = "11111111111111111111111111111111";
        const spanId = "2222222222222222";
        const flags = "00";
        const traceParentHeader = `99-${traceId}-${spanId}-${flags}`;

        const spanContext = extractSpanContextFromTraceParentHeader(traceParentHeader);

        assert.strictEqual(
          spanContext,
          undefined,
          "Invalid traceparent version should return undefined spanContext."
        );
      });

      it("when traceparent is malformed", () => {
        const traceParentHeader = `123abc`;

        const spanContext = extractSpanContextFromTraceParentHeader(traceParentHeader);

        assert.strictEqual(
          spanContext,
          undefined,
          "Malformed traceparent should return undefined spanContext."
        );
      });
    });
  });

  describe("#getTraceParentHeader", () => {
    it("should return a traceparent header from a SpanContext", () => {
      const spanContext: SpanContext = {
        spanId: "2222222222222222",
        traceId: "11111111111111111111111111111111",
        traceFlags: TraceFlags.SAMPLED
      };

      const traceParentHeader = getTraceParentHeader(spanContext);

      assert.strictEqual(
        traceParentHeader,
        `00-${spanContext.traceId}-${spanContext.spanId}-01`,
        "TraceParentHeader does not match expectation."
      );
    });

    it("should set the traceFlag to UNSAMPLED if not provided in SpanContext", () => {
      const spanContext: SpanContext = {
        spanId: "2222222222222222",
        traceId: "11111111111111111111111111111111",
        traceFlags: TraceFlags.NONE
      };

      const traceParentHeader = getTraceParentHeader(spanContext);

      assert.strictEqual(
        traceParentHeader,
        `00-${spanContext.traceId}-${spanContext.spanId}-00`,
        "TraceParentHeader does not match expectation."
      );
    });

    describe("should return undefined", () => {
      it("when traceId is not defined", () => {
        const spanContext: any = {
          spanId: "2222222222222222",
          traceFlags: TraceFlags.SAMPLED
        };

        const traceParentHeader = getTraceParentHeader(spanContext);

        assert.strictEqual(
          traceParentHeader,
          undefined,
          "Missing traceId should return undefined spanContext."
        );
      });

      it("when spanId is not defined", () => {
        const spanContext: any = {
          traceId: "11111111111111111111111111111111",
          traceFlags: TraceFlags.SAMPLED
        };

        const traceParentHeader = getTraceParentHeader(spanContext);

        assert.strictEqual(
          traceParentHeader,
          undefined,
          "Missing spanId should return undefined spanContext."
        );
      });
    });
  });
});
