// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import { SpanKind, TraceFlags } from "@azure/core-tracing";
import { TestSpan, setTracer } from "@azure/test-utils";
import { assert } from "chai";
import { createSpan } from "../../src/tracing";

describe("tracing.createSpan", () => {
  it("returns a created span with the right metadata", () => {
    const tracer = setTracer();
    const testSpan = new TestSpan(
      tracer,
      "testing",
      { traceId: "", spanId: "", traceFlags: TraceFlags.NONE },
      SpanKind.INTERNAL
    );
    const setAttributeSpy = sinon.spy(testSpan, "setAttribute");
    const startSpanStub = sinon.stub(tracer, "startSpan");
    startSpanStub.returns(testSpan);

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
