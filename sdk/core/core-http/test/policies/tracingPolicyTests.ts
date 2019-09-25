// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { assert } from "chai";
import { RequestPolicy, WebResource, HttpOperationResponse, HttpHeaders, TracerProxy, RequestPolicyOptions, TraceFlags, NoOpTracer, SpanOptions, SpanContext, NoOpSpan } from "../../lib/coreHttp";
import { tracingPolicy } from "../../lib/policies/tracingPolicy";

class MockSpan extends NoOpSpan {
  private _endCalled = false;

  constructor(private traceId: string, private spanId: string, private flags: TraceFlags, private state: string) {
    super();
  }

  didEnd() {
    return this._endCalled;
  }

  end() {
    this._endCalled = true;
  }

  context(): SpanContext {
    const state = this.state;
    return {
      traceId: this.traceId,
      spanId: this.spanId,
      traceFlags: this.flags,
      traceState: {
        set(_key: string, _value: string) {
        },
        unset(_key: string) {
        },
        get(_key: string): string | undefined {
          return;
        },
        serialize() {
          return state;
        }
      }
    }
  }
}

class MockTracer extends NoOpTracer {

  private spans: MockSpan[] = [];
  private _startSpanCalled = false;

  constructor(private traceId = "", private spanId = "", private flags = TraceFlags.UNSAMPLED, private state = "") {
    super();
  }

  getStartedSpans() {
    return this.spans;
  }

  startSpanCalled() {
    return this._startSpanCalled;
  }

  startSpan(_name: string, _options?: SpanOptions): MockSpan {
    this._startSpanCalled = true;
    const span = new MockSpan(this.traceId, this.spanId, this.flags, this.state);
    this.spans.push(span);
    return span;
  }
}

const ROOT_SPAN = new MockSpan("root", "root", TraceFlags.SAMPLED, "");

describe("tracingPolicy", function () {

  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  it("will not create a span if spanOptions are missing", async () => {
    const mockTracer = new MockTracer();
    TracerProxy.setTracer(mockTracer);
    const request = new WebResource();
    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isFalse(mockTracer.startSpanCalled());
  });

  it("will create a span and correctly set trace headers if spanOptions are available", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    TracerProxy.setTracer(mockTracer);
    const request = new WebResource();
    request.spanOptions = {
      parent: ROOT_SPAN
    };
    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());

    assert.equal(request.headers.get("traceparent"), `${mockTraceId}-${mockSpanId}-${TraceFlags.SAMPLED}`);
    assert.notExists(request.headers.get("tracestate"));
  });

  it("will create a span and correctly set trace headers if spanOptions are available (no TraceOptions)", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    // leave out the TraceOptions
    const mockTracer = new MockTracer(mockTraceId, mockSpanId);
    TracerProxy.setTracer(mockTracer);
    const request = new WebResource();
    request.spanOptions = {
      parent: ROOT_SPAN
    };
    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());

    assert.equal(request.headers.get("traceparent"), `${mockTraceId}-${mockSpanId}-${TraceFlags.UNSAMPLED}`);
    assert.notExists(request.headers.get("tracestate"));
  });

  it("will create a span and correctly set trace headers if spanOptions are available (TraceState)", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTraceState = "foo=bar";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED, mockTraceState);
    TracerProxy.setTracer(mockTracer);
    const request = new WebResource();
    request.spanOptions = {
      parent: ROOT_SPAN
    };
    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());

    assert.equal(request.headers.get("traceparent"), `${mockTraceId}-${mockSpanId}-${TraceFlags.SAMPLED}`);
    assert.equal(request.headers.get("tracestate"), mockTraceState);
  });

  it("will close a span if an error is encountered", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTraceState = "foo=bar";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED, mockTraceState);
    TracerProxy.setTracer(mockTracer);
    const request = new WebResource();
    request.spanOptions = {
      parent: ROOT_SPAN
    };
    const policy = tracingPolicy().create({
      sendRequest(request: WebResource): Promise<HttpOperationResponse> {
        return Promise.reject({
          request: request,
          status: 404,
          headers: new HttpHeaders()
        });
      }
    }, new RequestPolicyOptions());
    try {
      await policy.sendRequest(request);
      throw new Error("Test Failure");
    } catch (err) {
      assert.notEqual(err.message, "Test Failure");
      assert.isTrue(mockTracer.startSpanCalled());
      assert.lengthOf(mockTracer.getStartedSpans(), 1);
      const span = mockTracer.getStartedSpans()[0];
      assert.isTrue(span.didEnd());

      assert.equal(request.headers.get("traceparent"), `${mockTraceId}-${mockSpanId}-${TraceFlags.SAMPLED}`);
      assert.equal(request.headers.get("tracestate"), mockTraceState);
    }
  });

  it("will not set headers if span is a NoOpSpan", async () => {
    TracerProxy.setTracer(new NoOpTracer());
    const request = new WebResource();
    request.spanOptions = {
      parent: ROOT_SPAN
    };
    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.notExists(request.headers.get("traceparent"));
    assert.notExists(request.headers.get("tracestate"));
  });


});
