// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetrySpanWrapper } from "../../src/spanWrapper";
import { SpanStatusCode } from "@opentelemetry/api";
import { TestSpan } from "./util/testSpan";
import { TestTracer } from "./util/testTracer";
import { assert } from "chai";

describe("OpenTelemetrySpanWrapper", () => {
  let otSpan: TestSpan;
  let span: OpenTelemetrySpanWrapper;

  beforeEach(() => {
    otSpan = new TestTracer().startSpan("test");
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
});
