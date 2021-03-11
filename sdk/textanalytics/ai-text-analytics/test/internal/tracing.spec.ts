// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { createSpan } from "../../src/tracing";
import { setTracer, TestTracer, TestSpan } from "@azure/core-tracing";
import { SpanKind, TraceFlags } from "@azure/core-tracing";

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

  afterEach(() => {
    sinon.restore();
  });
});
