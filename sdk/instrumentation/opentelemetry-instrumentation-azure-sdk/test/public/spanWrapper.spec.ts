// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpanStatusCode, trace } from "@opentelemetry/api";

import { OpenTelemetrySpanWrapper } from "../../src/spanWrapper";
import { assert } from "chai";
import { getExportedSpan } from "./util/testHelpers";
import { inMemoryExporter } from "./util/setup";

describe("OpenTelemetrySpanWrapper", () => {
  let span: OpenTelemetrySpanWrapper;

  beforeEach(() => {
    span = new OpenTelemetrySpanWrapper(trace.getTracer("test").startSpan("test-span"));
    inMemoryExporter.reset();
  });

  describe("#setStatus", () => {
    describe("with a successful status", () => {
      it("sets the status on the span", () => {
        span.setStatus({ status: "success" });
        const otSpan = getExportedSpan(span);
        assert.deepEqual(otSpan.status, { code: SpanStatusCode.OK });
      });
    });

    describe("with an error", () => {
      it("sets the failed status on the span", () => {
        span.setStatus({ status: "error" });
        const otSpan = getExportedSpan(span);
        assert.deepEqual(otSpan.status, { code: SpanStatusCode.ERROR });
      });

      it("records the exception if provided", () => {
        const error = new Error("test");
        span.setStatus({ status: "error", error });

        const otSpan = getExportedSpan(span);
        assert.lengthOf(otSpan.events, 1);
        const exception = otSpan.events[0];
        assert.equal(exception.name, "exception");
        assert.equal(exception.attributes!["exception.message"], error.message);
      });
    });
  });

  describe("#setAttribute", () => {
    it("records the attribute on the span", () => {
      span.setAttribute("test", "value");
      span.setAttribute("array", ["value"]);

      const otSpan = getExportedSpan(span);
      assert.deepEqual(otSpan.attributes, { test: "value", array: ["value"] });
    });

    it("ignores null", () => {
      span.setAttribute("test", null);

      const otSpan = getExportedSpan(span);
      assert.isEmpty(otSpan.attributes);
    });

    it("ignores undefined", () => {
      span.setAttribute("test", undefined);

      const otSpan = getExportedSpan(span);
      assert.isEmpty(otSpan.attributes);
    });
  });

  describe("#addEvent", () => {
    it("records events on the span", () => {
      span.addEvent("test", { key: "value" }, new Date(2024, 1, 1));

      const otSpan = getExportedSpan(span);
      assert.lengthOf(otSpan.events, 1);
      const event = otSpan.events[0];
      assert.equal(event.name, "test");
      assert.deepEqual(event.attributes, { key: "value" });
      assert.equal(
        event.time[0],
        new Date(2024, 1, 1).getTime() / 1000 /** Millseconds to seconds */,
      );
    });

    it("drops invalid attributes", () => {
      span.addEvent("test", { key: { key1: 5 } }); // objects are not valid per the spec

      const otSpan = getExportedSpan(span);
      assert.lengthOf(otSpan.events, 1);
      const event = otSpan.events[0];
      assert.deepEqual(event.attributes, {});
    });
  });

  describe("#recordException", () => {
    it("sets the error on the wrapped span", () => {
      const error = new Error("test");
      span.recordException(error);

      const otSpan = getExportedSpan(span);
      assert.lengthOf(otSpan.events, 1);
      const exception = otSpan.events[0];
      assert.equal(exception.name, "exception");
      assert.equal(exception.attributes!["exception.message"], error.message);
    });
  });

  describe("#isRecording", () => {
    it("returns the value of the wrapped span", () => {
      // Our setup creates recording spans
      assert.isTrue(span.isRecording());
    });
  });
});
