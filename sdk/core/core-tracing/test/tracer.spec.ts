import { assert } from "chai";
import { Context } from "mocha";
import {
  NoOpSpan,
  NoOpTracer,
  Tracer,
  TracingContext,
  TracingContextImpl,
  TracingSpan
} from "../src";

describe.only("Tracer", () => {
  describe("NoOpTracer", () => {
    let tracer: Tracer;
    const operationName = "test-operation";

    beforeEach(() => {
      tracer = new NoOpTracer();
    });

    describe("#startSpan", () => {
      it("return no-op span", () => {
        const { span } = tracer.startSpan(operationName, {});
        assert.instanceOf(span, NoOpSpan);
      });

      it("returns a new context", () => {
        const { tracingContext } = tracer.startSpan(operationName, {});
        assert.exists(tracingContext);
      });

      it("returns context with all existing properties");
    });

    describe("#withTrace", () => {
      it("passes context and span to callback", async () => {
        await tracer.withTrace(
          operationName,
          (context, span) => {
            assert.instanceOf(span, NoOpSpan);
            assert.exists(context);
          },
          {}
        );
      });

      it("promisifies asynchronous functions", async () => {
        const result = await tracer.withTrace(
          operationName,
          () => {
            return 5;
          },
          {}
        );
        assert.equal(result, 5);
      });

      it("supports synchronous functions", async () => {
        const result = await tracer.withTrace(
          operationName,
          () => {
            return Promise.resolve(5);
          },
          {}
        );
        assert.equal(result, 5);
      });

      it("returns context with all existing properties");
      it("sets `this` correctly", async function(this: Context) {
        const that = this;

        await tracer.withTrace(
          operationName,
          () => {
            assert.strictEqual(this, that);
          },
          {},
          that
        );
      });
    });

    describe("#withContext", () => {
      it("applies the callback", () => {
        const expectedText = "expected";
        const result = tracer.withContext(() => {
          return expectedText;
        }, {});
        assert.equal(result, expectedText);
      });

      it("sets `this` correctly", function(this: Context) {
        const that = this;

        tracer.withContext(
          () => {
            assert.strictEqual(this, that);
          },
          {},
          that
        );
      });
    });
  });

  describe("NoOpSpan", () => {
    it("supports all TracingSpan methods", () => {
      const span: TracingSpan = new NoOpSpan();
      span.setStatus({ status: "success" });
      span.setAttribute("foo", "bar");
      span.end();
      assert.isUndefined(span.unwrap());
    });
  });

  describe("TracingContextImpl", () => {
    let context: TracingContextImpl;

    beforeEach(() => {
      context = new TracingContextImpl(new Map<symbol, unknown>());
    });

    it("can be created from an existing context map", () => {
      const initialData = new Map<symbol, unknown>();
      initialData.set(Symbol.for("key1"), "value1");
      initialData.set(Symbol.for("key2"), "value2");
      const newContext = new TracingContextImpl(initialData);
      assert.equal(newContext.getValue(Symbol.for("key1")), "value1");
      assert.equal(newContext.getValue(Symbol.for("key2")), "value2");
    });

    describe("getValue and setValue", () => {
      it("returns new context with new value", () => {
        const newContext = context.setValue(Symbol.for("newKey"), "newVal");
        assert.equal(newContext.getValue(Symbol.for("newKey")), "newVal");
      });

      it("returns new context with all existing values", () => {
        const newContext = context
          .setValue(Symbol.for("newKey"), "newVal")
          .setValue(Symbol.for("someOtherKey"), "someOtherVal")
          .setValue(Symbol.for("lastKey"), "lastVal");

        // inherited context data should remain
        assert.equal(newContext.getValue(Symbol.for("newKey")), "newVal");
      });

      it("does not modify existing context", () => {
        context.setValue(Symbol.for("newKey"), "newVal");
        assert.notExists(context.getValue(Symbol.for("newKey")));
      });
    });

    describe("#deleteValue", () => {
      it("returns new context without deleted value", () => {
        const newContext = context
          .setValue(Symbol.for("newKey"), "newVal")
          .deleteValue(Symbol.for("newKey"));
        assert.notExists(newContext.getValue(Symbol.for("newKey")));
      });

      it("does not modify existing context", () => {
        const newContext = context.setValue(Symbol.for("newKey"), "newVal");
        newContext.deleteValue(Symbol.for("newKey"));
        assert.equal(newContext.getValue(Symbol.for("newKey")), "newVal");
      });
    });
  });
});
