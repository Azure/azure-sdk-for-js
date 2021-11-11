// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Instrumenter, TracingSpan } from "../src/interfaces";
import {
  NoOpInstrumenter,
  NoOpSpan,
  instrumenterImplementation,
  useInstrumenter
} from "../src/instrumenter";
import { createTracingContext } from "../src/tracingContext";

describe("Instrumenter", () => {
  describe("NoOpInstrumenter", () => {
    let instrumenter: Instrumenter;
    const name = "test-operation";

    beforeEach(() => {
      instrumenter = new NoOpInstrumenter();
    });

    describe("#startSpan", () => {
      it("return no-op span", () => {
        const { span } = instrumenter.startSpan(name, {});
        assert.instanceOf(span, NoOpSpan);
      });

      it("returns a new context", () => {
        const { tracingContext } = instrumenter.startSpan(name, {});
        assert.exists(tracingContext);
      });

      it("returns context with all existing properties", () => {
        const [key, value] = [Symbol.for("key"), "value"];
        const context = createTracingContext().setValue(key, value);

        const { tracingContext } = instrumenter.startSpan(name, { tracingContext: context });
        assert.strictEqual(tracingContext.getValue(key), value);
      });
    });

    describe("#withContext", () => {
      it("applies the callback", () => {
        const expectedText = "expected";
        const result = instrumenter.withContext(createTracingContext(), () => expectedText);
        assert.equal(result, expectedText);
      });

      it("sets `this` correctly", function(this: Context) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        instrumenter.withContext(
          createTracingContext(),
          function(this: Context) {
            assert.strictEqual(this, that);
          },
          this
        );
      });
    });
  });

  describe("NoOpSpan", () => {
    it("supports all TracingSpan methods", () => {
      const span: TracingSpan = new NoOpSpan();
      span.setStatus({ status: "success" });
      span.setAttribute("foo", "bar");
      assert.isEmpty(span.tracingSpanId);
      span.end();
      assert.isEmpty(span.toRequestHeaders());
      assert.isFalse(span.isRecording());
    });
  });

  describe("defaultInstrumenter", () => {
    it("allows setting the default instrumenter", () => {
      const instrumenter = new NoOpInstrumenter();

      useInstrumenter(instrumenter);
      assert.strictEqual(instrumenterImplementation, instrumenter);

      useInstrumenter(new NoOpInstrumenter());
      assert.notStrictEqual(instrumenterImplementation, instrumenter);
    });
  });
});
