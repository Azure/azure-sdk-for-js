// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import sinon from "sinon";
import { SpanKind, TraceFlags } from "@opentelemetry/api";

import { setTracer } from "../src/tracerProxy";
import { TestTracer } from "../src/tracers/test/testTracer";
import { TestSpan } from "../src/tracers/test/testSpan";
import { createSpanFunction } from "../src/createSpan";
import { OperationTracingOptions } from "../src/interfaces";

const createSpan = createSpanFunction({ namespace: "Microsoft.Test", packagePrefix: "Azure.Test" });

describe("createSpan", () => {
  it("returns a created span with the right metadata", () => {
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
    const { span, updatedOptions } = createSpan("testMethod", {
      tracingOptions: ({
        // validate that we dumbly just copy any fields (this makes future upgrades easier)
        someOtherField: "someOtherFieldValue",
        context: { someContext: "some Context" },
        spanOptions: {
          kind: SpanKind.SERVER
        }
      } as OperationTracingOptions) as any
    });
    assert.strictEqual(span, testSpan, "Should return mocked span");
    assert.ok(startSpanStub.calledOnce);
    const [name, options] = startSpanStub.firstCall.args;
    assert.strictEqual(name, "Azure.Test.testMethod");

    assert.deepEqual(options, { kind: SpanKind.SERVER });

    assert.ok(setAttributeSpy.calledOnceWithExactly("az.namespace", "Microsoft.Test"));

    assert.deepEqual(updatedOptions.tracingOptions, {
      someOtherField: "someOtherFieldValue",
      // TODO: note, this will be incorrect (and break) when we get to the next opentelemetry
      // upgrade (and that'll be a good reminder to fix it)
      context: { someContext: "some Context" },
      spanOptions: {
        attributes: {
          "az.namespace": "Microsoft.Test"
        },
        kind: SpanKind.SERVER,
        parent: {
          spanId: "",
          traceFlags: 0,
          traceId: ""
        }
      }
    });
  });

  it("returns updated SpanOptions", () => {
    const options: { tracingOptions?: OperationTracingOptions } = {};
    const { span, updatedOptions } = createSpan("testMethod", options);
    assert.deepStrictEqual(options, {}, "original options should not be modified");
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    const expected: { tracingOptions?: OperationTracingOptions } = {
      tracingOptions: {
        spanOptions: {
          parent: span.context(),
          kind: SpanKind.INTERNAL,
          attributes: {
            "az.namespace": "Microsoft.Test"
          }
        }
      }
    };
    assert.deepEqual(updatedOptions, expected);
  });

  it("preserves existing attributes", () => {
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
    assert.notStrictEqual(updatedOptions, options, "should return new object");
    const expected: { tracingOptions?: OperationTracingOptions } = {
      tracingOptions: {
        spanOptions: {
          parent: span.context(),
          kind: SpanKind.INTERNAL,
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
