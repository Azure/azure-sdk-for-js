// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import sinon from "sinon";
import {
  setSpan,
  SpanKind,
  TraceFlags,
  context as otContext,
  getSpanContext,
  Context
} from "@opentelemetry/api";

import { setTracer } from "../src/tracerProxy";
import { TestTracer } from "../src/tracers/test/testTracer";
import { TestSpan } from "../src/tracers/test/testSpan";
import { createSpanFunction } from "../src/createSpan";
import { OperationTracingOptions } from "../src/interfaces";

describe("createSpan", () => {
  let createSpan: ReturnType<typeof createSpanFunction>;

  beforeEach(() => {
    createSpan = createSpanFunction({ namespace: "Microsoft.Test", packagePrefix: "Azure.Test" });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("returns a created span with the right metadata", () => {
    const { testSpan, startSpanStub, setAttributeSpy } = setupTracer();

    const someContext = setSpan(otContext.active(), testSpan);

    const { span, updatedOptions } = createSpan("testMethod", {
      tracingOptions: ({
        // validate that we dumbly just copy any fields (this makes future upgrades easier)
        someOtherField: "someOtherFieldValue",
        tracingContext: someContext,
        spanOptions: {
          kind: SpanKind.SERVER
        }
      } as OperationTracingOptions) as any
    });
    assert.strictEqual(span, testSpan, "Should return mocked span");
    assert.ok(startSpanStub.calledOnce);

    const [name, options, context] = startSpanStub.firstCall.args;
    assert.strictEqual(name, "Azure.Test.testMethod");
    assert.equal(context, someContext, "Parent context should be passed");
    assert.deepEqual(options, { kind: SpanKind.SERVER });
    assert.ok(setAttributeSpy.calledOnceWithExactly("az.namespace", "Microsoft.Test"));

    assert.deepEqual(updatedOptions.tracingOptions, {
      someOtherField: "someOtherFieldValue",
      tracingContext: updatedOptions.tracingOptions.tracingContext,
      spanOptions: {
        attributes: {
          "az.namespace": "Microsoft.Test"
        },
        kind: SpanKind.SERVER
      }
    });
  });

  it("returns updated SpanOptions", () => {
    setupTracer();

    const options: { tracingOptions?: OperationTracingOptions } = {};
    const { span, updatedOptions } = createSpan("testMethod", options);
    assert.ok(span);

    assert.deepStrictEqual(options, {}, "original options should not be modified");
    assert.notStrictEqual(updatedOptions, options, "should return new object");

    const expected: { tracingOptions?: OperationTracingOptions } = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test"
          }
        },
        tracingContext: updatedOptions.tracingOptions?.tracingContext
      }
    };
    assert.deepEqual(updatedOptions, expected);
  });

  it("preserves existing attributes", () => {
    setTracer(new TestTracer());

    const options: { tracingOptions?: OperationTracingOptions } = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            foo: "bar"
          }
        }
      }
    };
    const { span, updatedOptions } = createSpan("testMethod", options);
    assert.ok(span);
    assert.notStrictEqual(updatedOptions, options, "should return new object");

    const expected: { tracingOptions?: OperationTracingOptions } = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test",
            foo: "bar"
          }
        },
        tracingContext: updatedOptions.tracingOptions!.tracingContext
      }
    };
    assert.deepEqual(updatedOptions, expected);
  });

  it("namespace and packagePrefix can be empty (and thus ignored)", () => {
    const tracer = new TestTracer();

    const testSpan = new TestSpan(
      tracer,
      "testing",
      { traceId: "", spanId: "", traceFlags: TraceFlags.NONE },
      SpanKind.INTERNAL // this isn't used by anything in our test.
    );

    const setAttributeSpy = sinon.spy(testSpan, "setAttribute");
    const startSpanStub = sinon.stub(tracer, "startSpan");
    startSpanStub.returns(testSpan);
    setTracer(tracer);

    const cf = createSpanFunction({
      namespace: "",
      packagePrefix: ""
    });

    const { span, updatedOptions } = cf("myVerbatimOperationName", {
      tracingOptions: {
        spanOptions: {
          attributes: {
            testAttribute: "testValue"
          }
        }
      } as OperationTracingOptions
    });

    assert.ok(span);
    assert.ok(startSpanStub.called);

    const [name] = startSpanStub.firstCall.args;

    assert.equal(
      name,
      "myVerbatimOperationName",
      "operation name should be exactly as passed in (no prefix)"
    );
    assert.ok(!setAttributeSpy.called, "When the namespace is undefined it should not be set");

    assert.deepEqual(updatedOptions, {
      tracingOptions: {
        spanOptions: {
          attributes: {
            testAttribute: "testValue"
          }
        },
        tracingContext: updatedOptions.tracingOptions.tracingContext
      }
    });
  });

  it("createSpans, testing parent/child relationship", () => {
    setTracer(new TestTracer());

    const createSpanFn = createSpanFunction({
      namespace: "Microsoft.Test",
      packagePrefix: "Azure.Test"
    });

    let parentContext: Context;

    // create the parent span and do some basic checks.
    {
      const op: { tracingOptions: OperationTracingOptions } = {
        tracingOptions: {}
      };

      const { span, updatedOptions } = createSpanFn("parent", op);
      assert.ok(span);

      parentContext = updatedOptions.tracingOptions!.tracingContext!;

      assert.ok(parentContext);
      assert.notDeepEqual(parentContext, otContext.active(), "new child context should be created");
      assert.equal(
        getSpanContext(parentContext!)?.spanId,
        span.context().spanId,
        "context returned in the updated options should point to our newly created span"
      );
    }

    const { span: childSpan, updatedOptions } = createSpanFn("child", {
      tracingOptions: {
        tracingContext: parentContext
      }
    });
    assert.ok(childSpan);

    assert.ok(updatedOptions.tracingOptions.tracingContext);
    assert.equal(
      getSpanContext(updatedOptions.tracingOptions.tracingContext!)?.spanId,
      childSpan.context().spanId
    );
  });
});

function setupTracer() {
  const tracer = new TestTracer();
  setTracer(tracer);

  const testSpan = new TestSpan(
    tracer,
    "testing",
    { traceId: "", spanId: "", traceFlags: TraceFlags.NONE },
    SpanKind.INTERNAL // this isn't used by anything in our test.
  );
  const setAttributeSpy = sinon.spy(testSpan, "setAttribute");
  const startSpanStub = sinon.stub(tracer, "startSpan");
  startSpanStub.returns(testSpan);

  return { tracer, testSpan, startSpanStub, setAttributeSpy };
}
