// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SpanKind, TraceFlags } from "@opentelemetry/api";
import { HasTracingOptions } from "../src/createSpan";
import sinon from "sinon";

import { createSpanFunction } from "../src/createSpan";
import { setTracer } from "../src/tracerProxy";
import { TestTracer } from "../src/tracers/test/testTracer";
import { TestSpan } from "../src/tracers/test/testSpan";
const createSpan = createSpanFunction({ namespace: "Microsoft.Test", packagePrefix: "Azure.Test" });

describe("createSpan", () => {
  it("returns a created span with the right metadata", () => {
    const tracer = new TestTracer();
    const testSpan = new TestSpan(
      tracer,
      "testing",
      { traceId: "", spanId: "", traceFlags: TraceFlags.NONE },
      SpanKind.INTERNAL
    );
    const setAttributeSpy = sinon.spy(testSpan, "setAttribute");
    const startSpanStub = sinon.stub(tracer, "startSpan");
    startSpanStub.returns(testSpan);
    setTracer(tracer);
    const { span } = createSpan("testMethod", {});
    assert.strictEqual(span, testSpan, "Should return mocked span");
    assert.isTrue(startSpanStub.calledOnce);
    const [name, options] = startSpanStub.firstCall.args;
    assert.strictEqual(name, "Azure.Test.testMethod");
    assert.deepEqual(options, { kind: SpanKind.INTERNAL });
    assert.isTrue(setAttributeSpy.calledOnceWithExactly("az.namespace", "Microsoft.Test"));
  });

  it("returns updated SpanOptions", () => {
    const options: HasTracingOptions = {};
    const { updatedOptions } = createSpan("testMethod", options);

    assert.isEmpty(options, "original options should not be modified");
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    assert.isOk(updatedOptions.tracingOptions?.context, "A new context will get created to represent this new span as a parent.");

    const expected: HasTracingOptions = {
      tracingOptions: {
        context: updatedOptions.tracingOptions!.context,    // cheating, but in reality we're letting OT determine this.
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test"
          }
        }
      }
    };
    assert.deepEqual(updatedOptions, expected);
  });

  interface FakeOperationOptions extends HasTracingOptions {
    // just to make sure we properly copy and propagate properties
    // outside of `HasTracingOptions`
    otherValue: string;
  }

  it("preserves existing attributes", () => {
    const options: FakeOperationOptions = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            foo: "bar"
          }
        }
      },
      otherValue: "these don't get lost"
    };
    const { updatedOptions } = createSpan("testMethod", options);
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    assert.isOk(updatedOptions.tracingOptions?.context, "A new context will get created to represent this new span as a parent.");

    const expected: FakeOperationOptions = {
      tracingOptions: {
        context: updatedOptions.tracingOptions!.context,    // cheating, but in reality we're letting OT determine this.
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test",
            foo: "bar"
          }
        }
      },
      otherValue: "these don't get lost"
    };

    assert.deepEqual(updatedOptions, expected);
  });

  afterEach(() => {
    sinon.restore();
  });
});
