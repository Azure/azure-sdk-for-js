// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SpanKind, TraceFlags } from "@opentelemetry/api";
import { OperationOptionsLike } from "../src/createSpan";
import sinon from "sinon";

import {
  createSpanFunctionForOperationOptions,
  createSpanFunctionForRequestOptionsBase
} from "../src/createSpan";
import { setTracer } from "../src/tracerProxy";
import { TestTracer } from "../src/tracers/test/testTracer";
import { TestSpan } from "../src/tracers/test/testSpan";
import { OperationTracingOptions } from "../src";

const createSpanForOperationOptions = createSpanFunctionForOperationOptions({
  namespace: "Microsoft.Test",
  packagePrefix: "Azure.Test"
});
const createSpanForRequestOptionsBase = createSpanFunctionForRequestOptionsBase({
  namespace: "Microsoft.Test",
  packagePrefix: "Azure.Test"
});

describe("createSpan", () => {
  describe("createSpanFunctionForOperationOptions", () => {
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
      const { span } = createSpanForOperationOptions("testMethod", {});
      assert.strictEqual(span, testSpan, "Should return mocked span");
      assert.isTrue(startSpanStub.calledOnce);
      const [name, options] = startSpanStub.firstCall.args;
      assert.strictEqual(name, "Azure.Test.testMethod");
      assert.deepEqual(options, { kind: SpanKind.INTERNAL });
      assert.isTrue(setAttributeSpy.calledOnceWithExactly("az.namespace", "Microsoft.Test"));
    });

    it("returns updated SpanOptions", () => {
      const options: OperationOptionsLike = {};
      const { updatedOptions } = createSpanForOperationOptions("testMethod", options);

      assert.isEmpty(options, "original options should not be modified");
      assert.notStrictEqual(updatedOptions, options, "should return new object");
      assert.isOk(
        updatedOptions.tracingOptions?.context,
        "A new context will get created to represent this new span as a parent."
      );

      const expected: OperationOptionsLike = {
        tracingOptions: {
          context: updatedOptions.tracingOptions!.context, // cheating, but in reality we're letting OT determine this.
          spanOptions: {
            attributes: {
              "az.namespace": "Microsoft.Test"
            }
          }
        }
      };
      assert.deepEqual(updatedOptions, expected);
    });

    interface FakeOperationOptions extends OperationOptionsLike {
      // just to make sure we properly copy and propagate properties
      // outside of `OperationOptionsLike`
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
      const { updatedOptions } = createSpanForOperationOptions("testMethod", options);
      assert.notStrictEqual(updatedOptions, options, "should return new object");
      assert.isOk(
        updatedOptions.tracingOptions?.context,
        "A new context will get created to represent this new span as a parent."
      );

      const expected: FakeOperationOptions = {
        tracingOptions: {
          context: updatedOptions.tracingOptions!.context, // cheating, but in reality we're letting OT determine this.
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
  });

  describe("createSpanFunctionForRequestOptionsBase", () => {
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
      const { span } = createSpanForRequestOptionsBase("testMethod", {});
      assert.strictEqual(span, testSpan, "Should return mocked span");
      assert.isTrue(startSpanStub.calledOnce);
      const [name, options] = startSpanStub.firstCall.args;
      assert.strictEqual(name, "Azure.Test.testMethod");
      assert.deepEqual(options, { kind: SpanKind.INTERNAL });
      assert.isTrue(setAttributeSpy.calledOnceWithExactly("az.namespace", "Microsoft.Test"));
    });

    it("returns updated SpanOptions", () => {
      const options: OperationTracingOptions = {};
      const { updatedOptions } = createSpanForRequestOptionsBase("testMethod", options);

      assert.isEmpty(options, "original options should not be modified");
      assert.notStrictEqual(updatedOptions, options, "should return new object");
      assert.isOk(
        updatedOptions.context,
        "A new context will get created to represent this new span as a parent."
      );

      const expected: OperationTracingOptions = {
        context: updatedOptions.context, // cheating, but in reality we're letting OT determine this.
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test"
          }
        }
      };
      assert.deepEqual(updatedOptions, expected);
    });

    interface FakeOperationTracingOptions extends OperationTracingOptions {
      // just to make sure we properly copy and propagate properties
      // outside of `OperationTracingOptions`
      otherValue: string;
    }

    it("preserves existing attributes", () => {
      const options: FakeOperationTracingOptions = {
        spanOptions: {
          attributes: {
            foo: "bar"
          }
        },
        otherValue: "these don't get lost"
      };
      const { updatedOptions } = createSpanForRequestOptionsBase("testMethod", options);
      assert.notStrictEqual(updatedOptions, options, "should return new object");
      assert.isOk(
        updatedOptions.context,
        "A new context will get created to represent this new span as a parent."
      );

      const expected: FakeOperationTracingOptions = {
        context: updatedOptions.context, // cheating, but in reality we're letting OT determine this.
        spanOptions: {
          attributes: {
            "az.namespace": "Microsoft.Test",
            foo: "bar"
          }
        },
        otherValue: "these don't get lost"
      };

      assert.deepEqual(updatedOptions, expected);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
