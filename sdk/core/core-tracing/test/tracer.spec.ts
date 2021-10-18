import { assert } from "chai";
import { Context } from "mocha";
import {
  tracerImplementation,
  NoOpSpan,
  NoOpTracer,
  useTracer,
  Tracer,
  TracingContextImpl,
  TracingSpan,
  createTracingClient,
  TracingClient,
  createTracingContext,
  TracingContext,
  knownContextKeys
} from "../src";
import sinon from "sinon";

describe.only("Tracer", () => {
  describe("NoOpTracer", () => {
    let tracer: Tracer;
    const name = "test-operation";

    beforeEach(() => {
      tracer = new NoOpTracer();
    });

    describe("#startSpan", () => {
      it("return no-op span", () => {
        const { span } = tracer.startSpan(name, {});
        assert.instanceOf(span, NoOpSpan);
      });

      it("returns a new context", () => {
        const { tracingContext } = tracer.startSpan(name, {});
        assert.exists(tracingContext);
      });

      it("returns context with all existing properties");
    });

    describe("#withTrace", () => {
      it("passes context and span to callback", async () => {
        await tracer.withTrace(
          name,
          (context, span) => {
            assert.instanceOf(span, NoOpSpan);
            assert.exists(context);
          },
          {}
        );
      });

      it("promisifies asynchronous functions", async () => {
        const result = await tracer.withTrace(
          name,
          () => {
            return 5;
          },
          {}
        );
        assert.equal(result, 5);
      });

      it("supports synchronous functions", async () => {
        const result = await tracer.withTrace(
          name,
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
          name,
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

  describe("defaultTracer", () => {
    it("returns NoOpTracer", () => {
      assert.instanceOf(tracerImplementation, NoOpTracer);
    });

    it("allows setting the default tracer", () => {
      const tracer = new NoOpTracer();

      useTracer(tracer);
      assert.strictEqual(tracerImplementation, tracer);

      useTracer(new NoOpTracer());
      assert.notStrictEqual(tracerImplementation, tracer);
    });
  });

  describe("tracingClient", () => {
    let tracer: Tracer;
    let span: TracingSpan;
    let context: TracingContext;
    let client: TracingClient;
    const expectedNamespace = "Microsoft.Test";

    beforeEach(() => {
      tracer = new NoOpTracer();
      span = new NoOpSpan();
      context = createTracingContext();
      // Set our tracer to always return the same span and context so we
      // can inspect them.
      tracer.startSpan = () => {
        return {
          span,
          tracingContext: context
        };
      };

      useTracer(tracer);
      client = createTracingClient({
        namespace: expectedNamespace
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    describe("createTracingClient", () => {
      it("can create a tracing client with provided options", () => {
        const tracer = new NoOpTracer();
        const spy = sinon.spy(tracer);

        const client = createTracingClient({
          namespace: "az.namespace",
          tracer
        });
        client.startSpan("test", {});
        client.withTrace("test", () => {}, {});
        client.withContext(() => {}, {});

        assert.isTrue(spy.startSpan.called);
        assert.isTrue(spy.withTrace.called);
        assert.isTrue(spy.withContext.called);
      });
    });

    describe("#startSpan", () => {
      it("sets namespace on span", () => {
        const setAttributeSpy = sinon.spy(span, "setAttribute");
        client.startSpan("test", {});
        assert.isTrue(
          setAttributeSpy.calledWith("az.namespace", expectedNamespace),
          `expected span.setAttribute("az.namespace", "${expectedNamespace}") to have been called`
        );
      });

      it("sets namespace on context", () => {
        const { tracingContext } = client.startSpan("test", {});
        assert.equal(tracingContext.getValue(knownContextKeys.Namespace), "Microsoft.Test");
      });
    });

    describe("#withTrace", () => {
      it("sets namespace on span", () => {
        const setAttributeSpy = sinon.spy(span, "setAttribute");
        client.withTrace("test", () => {}, {});
        assert.isTrue(
          setAttributeSpy.calledWith("az.namespace", expectedNamespace),
          `expected span.setAttribute("az.namespace", "${expectedNamespace}") to have been called`
        );
      });

      it("sets namespace on context", async () => {
        await client.withTrace(
          "test",
          (context) => {
            assert.equal(context.getValue(knownContextKeys.Namespace), "Microsoft.Test");
          },
          {}
        );
      });
    });
  });
});
