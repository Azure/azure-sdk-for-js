// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import sinon from "sinon";
import { Instrumenter, TracingSpan, TracingContext, TracingClient } from "../src/interfaces";
import { NoOpInstrumenter, NoOpSpan, useInstrumenter } from "../src/instrumenter";
import { createTracingClient, TracingClientImpl } from "../src/tracingClient";
import { knownContextKeys, createTracingContext } from "../src/tracingContext";

describe("TracingClient", () => {
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

    it("sets namespace on context", () => {
      const { updatedOptions } = client.startSpan("test");
      assert.equal(
        updatedOptions.tracingOptions?.tracingContext?.getValue(knownContextKeys.Namespace),
        expectedNamespace
      );
    });

    it("does not override existing namespace on context", () => {
      context = createTracingContext().setValue(knownContextKeys.Namespace, "Existing.Namespace");
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
      await client.withSpan(spanName, {}, async () => {
        // no op
      });
      assert.isTrue(
        setAttributeSpy.calledWith("az.namespace", expectedNamespace),
        `expected span.setAttribute("az.namespace", "${expectedNamespace}") to have been called`
      );
    });

    it("passes options and span to callback", async () => {
      await client.withSpan(spanName, { foo: "foo", bar: "bar" } as any, (options, currentSpan) => {
        assert.instanceOf(currentSpan, NoOpSpan);
        assert.exists(options);
        assert.equal(options.foo, "foo");
        assert.equal(options.bar, "bar");
        return true;
      });
    });

    it("promisifies synchronous functions", async () => {
      const result = await (client as TracingClientImpl).withSpan(spanName, {}, () => {
        return 5;
      });
      assert.equal(result, 5);
    });

    it("supports asynchronous functions", async () => {
      const result = await client.withSpan(spanName, {}, () => {
        return Promise.resolve(5);
      });
      assert.equal(result, 5);
    });

    it("returns context with all existing properties", async () => {
      const [key, value] = [Symbol.for("key"), "value"];
      const parentContext = createTracingContext().setValue(key, value);
      await client.withSpan(
        spanName,
        {
          tracingOptions: {
            tracingContext: parentContext
          }
        },
        (updatedOptions) => {
          assert.strictEqual(updatedOptions.tracingOptions.tracingContext.getValue(key), value);
        }
      );
    });

    it("sets `this` correctly", async function(this: Context) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;

      await client.withSpan(
        spanName,
        {},
        () => {
          assert.strictEqual(this, that);
        },
        {},
        this
      );
    });

    describe("with a successful callback", () => {
      it("sets status on the span", async () => {
        // Set our instrumenter to always return the same span and context so we
        // can inspect them.
        instrumenter.startSpan = () => {
          return {
            span,
            tracingContext: context
          };
        };
        const setStatusSpy = sinon.spy(span, "setStatus");
        await client.withSpan(spanName, {}, () => Promise.resolve(42));

        assert.isTrue(setStatusSpy.calledWith(sinon.match({ status: "success" })));
      });
    });

    describe("with an error", () => {
      it("sets status on the span", async () => {
        // Set our instrumenter to always return the same span and context so we
        // can inspect them.
        instrumenter.startSpan = () => {
          return {
            span,
            tracingContext: context
          };
        };
        const setStatusSpy = sinon.spy(span, "setStatus");
        let errorThrown = false;
        try {
          await client.withSpan(spanName, {}, () => Promise.reject(new Error("test")));
        } catch (err) {
          errorThrown = true;
          assert.isTrue(setStatusSpy.calledWith(sinon.match({ status: "error", error: err })));
        }

        assert.isTrue(errorThrown);
      });
    });
  });
});
