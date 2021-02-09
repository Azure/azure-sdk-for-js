// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SpanKind, TraceFlags } from "@opentelemetry/api";
import { setTracer, TestSpan, TestTracer } from "@azure/core-tracing";
import sinon from "sinon";

import { OperationOptions } from "../src/coreHttp";

import { createSpanFunction } from "../src/createSpan";
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
    const options: OperationOptions = {};
    const { span, updatedOptions } = createSpan("testMethod", options);

    console.log(span);

    assert.isEmpty(options, "original options should not be modified");
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    const expected: OperationOptions = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test"
          }
        }
      }
    };
    assert.deepEqual(updatedOptions, expected);
  });

  it("preserves existing attributes", () => {
    const options: OperationOptions = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            foo: "bar"
          }
        }
      }
    };
    const { updatedOptions } = createSpan("testMethod", options);
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    const expected: OperationOptions = {
      tracingOptions: {
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test",
            foo: "bar"
          }
        }
      }
    };

    assert.deepEqual(updatedOptions, expected);
  });

  afterEach(() => {
    sinon.restore();
  });
});
