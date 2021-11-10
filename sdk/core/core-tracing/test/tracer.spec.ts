// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { Instrumenter, TracingSpan, TracingContext, TracingClient } from "../src/interfaces";
import {
  NoOpInstrumenter,
  NoOpSpan,
  instrumenterImplementation,
  useInstrumenter
} from "../src/instrumenter";
import { createTracingClient, TracingClientImpl } from "../src/tracingClient";
import { TracingContextImpl, knownContextKeys, createTracingContext } from "../src/tracingContext";

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

      it("can fetch parent chain data", () => {
        const newContext = context
          .setValue(Symbol.for("ancestry"), "grandparent")
          .setValue(Symbol.for("ancestry"), "parent")
          .setValue(Symbol.for("self"), "self"); // use a different key for current context

        assert.equal(newContext.getValue(Symbol.for("ancestry")), "parent");
        assert.equal(newContext.getValue(Symbol.for("self")), "self");
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

      it("deletes parent chain data", () => {
        const newContext = context
          .setValue(Symbol.for("ancestry"), "grandparent")
          .setValue(Symbol.for("ancestry"), "parent")
          .setValue(Symbol.for("self"), "self");

        assert.isDefined(newContext.getValue(Symbol.for("ancestry")));
        assert.isDefined(newContext.getValue(Symbol.for("self")));

        const updatedContext = newContext
          .deleteValue(Symbol.for("ancestry"))
          .deleteValue(Symbol.for("self"));

        assert.isUndefined(updatedContext.getValue(Symbol.for("ancestry")));
        assert.isUndefined(updatedContext.getValue(Symbol.for("self")));
      });
    });
  });

  describe("#createTracingContext", () => {
    it("returns a new context", () => {
      const context = createTracingContext();
      assert.exists(context);
      assert.instanceOf(context, TracingContextImpl);
    });

    it("can add known attributes", () => {
      const client = createTracingClient();
      const span = new NoOpSpan();
      const providerContext = createTracingContext();
      const namespace = "test-namespace";
      const newContext = createTracingContext({
        client,
        span,
        parentContext: providerContext,
        namespace
      });
      assert.strictEqual(newContext.getValue(knownContextKeys.Client), client);
      assert.strictEqual(newContext.getValue(knownContextKeys.Namespace), namespace);
      assert.strictEqual(newContext.getValue(knownContextKeys.ParentContext), providerContext);
      assert.strictEqual(newContext.getValue(knownContextKeys.Span), span);
    });

    it("can be initialized from an existing context", () => {
      const providerContext = createTracingContext().setValue(
        knownContextKeys.Namespace,
        "test-namespace"
      );
      const newContext = createTracingContext({ parentContext: providerContext });
      assert.equal(newContext.getValue(knownContextKeys.Namespace), "test-namespace");
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

  describe("tracingClient", () => {
    let instrumenter: Instrumenter;
    let span: TracingSpan;
    let context: TracingContext;
    let client: TracingClient;
    const expectedNamespace = "Microsoft.Test";

    beforeEach(() => {
      instrumenter = new NoOpInstrumenter();
      span = new NoOpSpan();
      context = createTracingContext();

      useInstrumenter(instrumenter);
      client = createTracingClient({
        namespace: expectedNamespace,
        packageInformation: {
          name: "test-package",
          version: "1.0.0"
        }
      });
    });

    afterEach(() => {
      sinon.restore();
    });

    describe("#startSpan", () => {
      it("sets namespace on span", () => {
        // Set our instrumenter to always return the same span and context so we
        // can inspect them.
        instrumenter.startSpan = () => {
          return {
            span,
            tracingContext: context
          };
        };
        const setAttributeSpy = sinon.spy(span, "setAttribute");
        client.startSpan("test", {});
        assert.isTrue(
          setAttributeSpy.calledWith("az.namespace", expectedNamespace),
          `expected span.setAttribute("az.namespace", "${expectedNamespace}") to have been called`
        );
      });

      it("passes package information to instrumenter", () => {
        const instrumenterStartSpanSpy = sinon.spy(instrumenter, "startSpan");
        client.startSpan("test", {});
        assert.isTrue(instrumenterStartSpanSpy.called);
        const args = instrumenterStartSpanSpy.getCall(0).args;

        assert.equal(args[0], "test");
        assert.equal(args[1]?.packageInformation?.name, "test-package");
        assert.equal(args[1]?.packageInformation?.version, "1.0.0");
      });

      it("passes defaults when package information is omitted", () => {
        const instrumenterStartSpanSpy = sinon.spy(instrumenter, "startSpan");
        client = createTracingClient();
        client.startSpan("test", {});
        assert.isTrue(instrumenterStartSpanSpy.called);
        const args = instrumenterStartSpanSpy.getCall(0).args;

        assert.equal(args[0], "test");
        assert.equal(args[1]?.packageInformation?.name, "@azure/core-tracing");
        assert.isUndefined(args[1]?.packageInformation?.version);
      });

      it("sets namespace on context", () => {
        const { updatedOptions } = client.startSpan("test");
        assert.equal(
          updatedOptions.tracingOptions?.tracingContext?.getValue(knownContextKeys.Namespace),
          expectedNamespace
        );
      });

      it("does not override existing namespace on context", () => {
        const context = createTracingContext().setValue(
          knownContextKeys.Namespace,
          "Existing.Namespace"
        );
        const { updatedOptions } = client.startSpan("test", {
          tracingOptions: { tracingContext: context }
        });
        assert.equal(
          updatedOptions.tracingOptions?.tracingContext?.getValue(knownContextKeys.Namespace),
          "Existing.Namespace"
        );
      });

      it("returns the same context in options", () => {
        const { updatedOptions, tracingContext } = client.startSpan("test");
        assert.strictEqual(updatedOptions.tracingOptions!.tracingContext, tracingContext);
      });
    });

    describe("#withSpan", () => {
      const spanName = "test-span";

      it("sets namespace on span", async () => {
        // Set our instrumenter to always return the same span and context so we
        // can inspect them.
        instrumenter.startSpan = () => {
          return {
            span,
            tracingContext: context
          };
        };
        const setAttributeSpy = sinon.spy(span, "setAttribute");
        await client.withSpan(
          spanName,
          async () => {
            // no op
          },
          {}
        );
        assert.isTrue(
          setAttributeSpy.calledWith("az.namespace", expectedNamespace),
          `expected span.setAttribute("az.namespace", "${expectedNamespace}") to have been called`
        );
      });

      it("passes options and span to callback", async () => {
        await client.withSpan(
          spanName,
          (options, currentSpan) => {
            assert.instanceOf(currentSpan, NoOpSpan);
            assert.exists(options);
            assert.equal(options.foo, "foo");
            assert.equal(options.bar, "bar");
            return true;
          },
          { foo: "foo", bar: "bar" } as any
        );
      });

      it("promisifies synchronous functions", async () => {
        const result = await (client as TracingClientImpl).withSpan(spanName, () => {
          return 5;
        });
        assert.equal(result, 5);
      });

      it("supports asynchronous functions", async () => {
        const result = await client.withSpan(
          spanName,
          () => {
            return Promise.resolve(5);
          },
          {}
        );
        assert.equal(result, 5);
      });

      it("returns context with all existing properties", async () => {
        const [key, value] = [Symbol.for("key"), "value"];
        const parentContext = createTracingContext().setValue(key, value);
        await client.withSpan(
          spanName,
          (updatedOptions) => {
            assert.strictEqual(updatedOptions.tracingOptions?.tracingContext.getValue(key), value);
          },
          {
            tracingOptions: {
              tracingContext: parentContext
            }
          }
        );
      });

      it("sets `this` correctly", async function(this: Context) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;

        await client.withSpan(
          spanName,
          () => {
            assert.strictEqual(this, that);
          },
          {},
          {},
          this
        );
      });
    });
  });

  // describe("#withContext", () => {
  //   it("delegates to the provider's withContext", async () => {
  //     const providerSpy = sinon.spy(instrumenter, "withContext");
  //     await client.withContext(() => {}, { context });
  //     assert.isTrue(providerSpy.calledWith(sinon.match.any, { context }));
  //   });
  // });
});
