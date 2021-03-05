// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { createSpan } from "../../src/tracing";
import { setTracer, TestTracer, TestSpan } from "@azure/core-tracing";
import { SpanKind, TraceFlags } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-client";

describe("tracing.createSpan", () => {
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
    const { span } = createSpan("testOperation", {});
    assert.strictEqual(span, testSpan, "Should return mocked span");
    assert.isTrue(startSpanStub.calledOnce);
    const [name, options] = startSpanStub.firstCall.args;
    assert.strictEqual(name, "Azure.CognitiveServices.TextAnalytics.testOperation");
    assert.deepEqual(options, { kind: SpanKind.INTERNAL });
    assert.isTrue(
      setAttributeSpy.calledOnceWithExactly("az.namespace", "Microsoft.CognitiveServices")
    );
  });

  it("returns updated SpanOptions", () => {
    const options: OperationOptions = {};
    const { span, updatedOptions } = createSpan("testOperation", options);
    assert.isEmpty(options, "original options should not be modified");
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    const expected: OperationOptions = {
      tracingOptions: {
        spanOptions: {
          parent: span.context(),
          attributes: {
            "az.namespace": "Microsoft.CognitiveServices"
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
    const { span, updatedOptions } = createSpan("testOperation", options);
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    const expected: OperationOptions = {
      tracingOptions: {
        spanOptions: {
          parent: span.context(),
          attributes: {
            "az.namespace": "Microsoft.CognitiveServices",
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
