// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  tracingPolicy,
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders
} from "../src";
import { SpanContext, TraceFlags } from "@opentelemetry/api";
import { setTracer, NoOpTracer, NoOpSpan } from "@azure/core-tracing";

class MockSpan extends NoOpSpan {
  private _endCalled = false;

  constructor(
    private traceId: string,
    private spanId: string,
    private flags: TraceFlags,
    private state: string
  ) {
    super();
  }

  didEnd(): boolean {
    return this._endCalled;
  }

  end(): void {
    this._endCalled = true;
  }

  context(): SpanContext {
    const state = this.state;
    return {
      traceId: this.traceId,
      spanId: this.spanId,
      traceFlags: this.flags,
      traceState: {
        set() {
          /* empty */
        },
        unset() {
          /* empty */
        },
        get(): string | undefined {
          return;
        },
        serialize() {
          return state;
        }
      }
    };
  }
}

class MockTracer extends NoOpTracer {
  private spans: MockSpan[] = [];
  private _startSpanCalled = false;

  constructor(
    private traceId = "",
    private spanId = "",
    private flags = TraceFlags.NONE,
    private state = ""
  ) {
    super();
  }

  getStartedSpans(): MockSpan[] {
    return this.spans;
  }

  startSpanCalled(): boolean {
    return this._startSpanCalled;
  }

  startSpan(): MockSpan {
    this._startSpanCalled = true;
    const span = new MockSpan(this.traceId, this.spanId, this.flags, this.state);
    this.spans.push(span);
    return span;
  }
}

const ROOT_SPAN = new MockSpan("root", "root", TraceFlags.SAMPLED, "");

describe("tracingPolicy", function() {
  const TRACE_VERSION = "00";

  it("will not create a span if spanOptions are missing", async () => {
    const mockTracer = new MockTracer();
    setTracer(mockTracer);
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200
    };
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(response);
    await policy.sendRequest(request, next);

    assert.isFalse(mockTracer.startSpanCalled());
  });

  it("will create a span and correctly set trace headers if spanOptions are available", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      spanOptions: {
        parent: ROOT_SPAN.context()
      }
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200
    };
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(response);
    await policy.sendRequest(request, next);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());

    const expectedFlag = "01";

    assert.equal(
      request.headers.get("traceparent"),
      `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
    );
    assert.notExists(request.headers.get("tracestate"));
  });

  it("will create a span and correctly set trace headers if spanOptions are available (no TraceOptions)", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    // leave out the TraceOptions
    const mockTracer = new MockTracer(mockTraceId, mockSpanId);
    setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      spanOptions: {
        parent: ROOT_SPAN.context()
      }
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200
    };
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(response);
    await policy.sendRequest(request, next);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());

    const expectedFlag = "00";

    assert.equal(
      request.headers.get("traceparent"),
      `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
    );
    assert.notExists(request.headers.get("tracestate"));
  });

  it("will create a span and correctly set trace headers if spanOptions are available (TraceState)", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTraceState = "foo=bar";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED, mockTraceState);
    setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      spanOptions: {
        parent: ROOT_SPAN.context()
      }
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200
    };
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(response);
    await policy.sendRequest(request, next);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());

    const expectedFlag = "01";

    assert.equal(
      request.headers.get("traceparent"),
      `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
    );
    assert.equal(request.headers.get("tracestate"), mockTraceState);
  });

  it("will close a span if an error is encountered", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTraceState = "foo=bar";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED, mockTraceState);
    setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      spanOptions: {
        parent: ROOT_SPAN.context()
      }
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 404
    };
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.returns(Promise.reject(response));

    try {
      await policy.sendRequest(request, next);
      throw new Error("Test Failure");
    } catch (err) {
      assert.notEqual(err.message, "Test Failure");
      assert.isTrue(mockTracer.startSpanCalled());
      assert.lengthOf(mockTracer.getStartedSpans(), 1);
      const span = mockTracer.getStartedSpans()[0];
      assert.isTrue(span.didEnd());

      const expectedFlag = "01";

      assert.equal(
        request.headers.get("traceparent"),
        `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
      );
      assert.equal(request.headers.get("tracestate"), mockTraceState);
    }
  });

  it("will not set headers if span is a NoOpSpan", async () => {
    setTracer(new NoOpTracer());

    const request = createPipelineRequest({
      url: "https://bing.com",
      spanOptions: {
        parent: ROOT_SPAN.context()
      }
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200
    };
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(response);
    await policy.sendRequest(request, next);

    assert.notExists(request.headers.get("traceparent"));
    assert.notExists(request.headers.get("tracestate"));
  });
});
