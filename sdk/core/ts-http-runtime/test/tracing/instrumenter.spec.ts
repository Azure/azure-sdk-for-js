// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Instrumenter, TracingSpan } from "../../src/tracing/interfaces";
import {
  createDefaultInstrumenter,
  createDefaultTracingSpan,
  getInstrumenter,
  useInstrumenter,
} from "../../src/tracing/instrumenter";
import { createTracingContext, knownContextKeys } from "../../src/tracing/tracingContext";
import { assert } from "chai";

describe("Instrumenter", () => {
  describe("NoOpInstrumenter", () => {
    let instrumenter: Instrumenter;
    const name = "test-operation";

    beforeEach(() => {
      instrumenter = createDefaultInstrumenter();
    });

    describe("#startSpan", () => {
      const packageName = "test-package";

      it("returns a new context", () => {
        const { tracingContext } = instrumenter.startSpan(name, { packageName });
        assert.exists(tracingContext);
      });

      it("returns context with all existing properties", () => {
        const [key, value] = [Symbol.for("key"), "value"];
        const context = createTracingContext().setValue(key, value);

        const { tracingContext } = instrumenter.startSpan(name, {
          tracingContext: context,
          packageName,
        });
        assert.strictEqual(tracingContext.getValue(key), value);
      });
    });

    describe("#withContext", () => {
      it("applies the callback", () => {
        const expectedText = "expected";
        const result = instrumenter.withContext(createTracingContext(), () => expectedText);
        assert.equal(result, expectedText);
      });
    });

    describe("#parseTraceparentHeader", () => {
      it("returns undefined", () => {
        assert.isUndefined(instrumenter.parseTraceparentHeader(""));
      });
    });

    describe("#createRequestHeaders", () => {
      it("returns an empty object", () => {
        assert.isEmpty(instrumenter.createRequestHeaders(createTracingContext()));
        assert.isEmpty(
          instrumenter.createRequestHeaders(
            createTracingContext().setValue(knownContextKeys.span, createDefaultTracingSpan())
          )
        );
      });
    });
  });

  describe("NoOpSpan", () => {
    it("supports all TracingSpan methods", () => {
      const span: TracingSpan = createDefaultTracingSpan();
      span.setStatus({ status: "success" });
      span.setAttribute("foo", "bar");
      span.recordException(new Error("test"));
      span.end();
      assert.isFalse(span.isRecording());
    });
  });

  describe("useInstrumenter", () => {
    it("allows setting and getting a global instrumenter", () => {
      const instrumenter = getInstrumenter();
      assert.exists(instrumenter);

      const newInstrumenter = createDefaultInstrumenter();
      useInstrumenter(newInstrumenter);
      assert.strictEqual(getInstrumenter(), newInstrumenter);
    });
  });
});
