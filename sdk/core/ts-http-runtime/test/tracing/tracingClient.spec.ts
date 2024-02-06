// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  TracingClient,
  TracingContext,
  TracingSpan,
} from "../../src/tracing/interfaces";
import {
  createDefaultInstrumenter,
  createDefaultTracingSpan,
  useInstrumenter,
} from "../../src/tracing/instrumenter";
import { createTracingContext, knownContextKeys } from "../../src/tracing/tracingContext";
import { assert } from "chai";
import { createTracingClient } from "../../src/tracing/tracingClient";
import sinon from "sinon";

describe("TracingClient", () => {
  let instrumenter: Instrumenter;
  let span: TracingSpan;
  let context: TracingContext;
  let client: TracingClient;
  const expectedNamespace = "Microsoft.Test";

  beforeEach(() => {
    instrumenter = createDefaultInstrumenter();
    span = createDefaultTracingSpan();
    context = createTracingContext();

    useInstrumenter(instrumenter);
    client = createTracingClient({
      namespace: expectedNamespace,
      packageName: "test-package",
      packageVersion: "1.0.0",
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
          tracingContext: context,
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
      assert.equal(args[1]?.packageName, "test-package");
      assert.equal(args[1]?.packageVersion, "1.0.0");
    });

    it("sets namespace on context", () => {
      const { updatedOptions } = client.startSpan("test");
      assert.equal(
        updatedOptions.tracingOptions?.tracingContext?.getValue(knownContextKeys.namespace),
        expectedNamespace
      );
    });

    it("does not override existing namespace on context", () => {
      context = createTracingContext().setValue(knownContextKeys.namespace, "Existing.Namespace");
      const { updatedOptions } = client.startSpan("test", {
        tracingOptions: { tracingContext: context },
      });
      assert.equal(
        updatedOptions.tracingOptions?.tracingContext?.getValue(knownContextKeys.namespace),
        "Existing.Namespace"
      );
    });

    it("Returns tracingContext in updatedOptions", () => {
      let { updatedOptions } = client.startSpan<Record<string, unknown>>("test");
      assert.exists(updatedOptions.tracingOptions.tracingContext);
      updatedOptions = client.startSpan("test", updatedOptions).updatedOptions;
      assert.exists(updatedOptions.tracingOptions.tracingContext);
    });

    it("Does not erase unknown tracingOptions", () => {
      // this test is to future-proof any tracingOptions we might add
      const { updatedOptions } = client.startSpan<Record<string, unknown>>("test", {
        tracingOptions: { unknownProp: true } as any,
      });
      assert.exists((updatedOptions.tracingOptions as any).unknownProp);
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
          tracingContext: context,
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
        assert.exists(currentSpan);
        assert.exists(options);
        assert.equal(options.foo, "foo");
        assert.equal(options.bar, "bar");
        return true;
      });
    });

    it("promisifies synchronous functions", async () => {
      const result = await client.withSpan(spanName, {}, () => {
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
            tracingContext: parentContext,
          },
        },
        (updatedOptions) => {
          assert.strictEqual(updatedOptions.tracingOptions.tracingContext.getValue(key), value);
        }
      );
    });

    describe("with a successful callback", () => {
      it("sets status on the span", async () => {
        // Set our instrumenter to always return the same span and context so we
        // can inspect them.
        instrumenter.startSpan = () => {
          return {
            span,
            tracingContext: context,
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
            tracingContext: context,
          };
        };
        const setStatusSpy = sinon.spy(span, "setStatus");
        let errorThrown = false;
        try {
          await client.withSpan(spanName, {}, () => Promise.reject(new Error("test")));
        } catch (err: any) {
          errorThrown = true;
          assert.isTrue(setStatusSpy.calledWith(sinon.match({ status: "error", error: err })));
        }

        assert.isTrue(errorThrown);
      });
    });
  });
});
