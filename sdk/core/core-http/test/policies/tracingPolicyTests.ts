// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  RequestPolicy,
  WebResource,
  HttpOperationResponse,
  HttpHeaders,
  RequestPolicyOptions
} from "../../src/coreHttp";
import {
  setTracer,
  NoOpTracer,
  NoOpSpan,
  SpanOptions,
  SpanContext,
  TraceFlags,
  TraceState,
  setSpan,
  context,
  SpanStatusCode,
  SpanStatus
} from "@azure/core-tracing";
import { tracingPolicy } from "../../src/policies/tracingPolicy";

class MockSpan extends NoOpSpan {
  private _endCalled = false;
  private _status: SpanStatus = {
    code: SpanStatusCode.UNSET
  };
  private _attributes: { [s: string]: unknown } = {};

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

  getStatus() {
    return this._status;
  }

  setStatus(status: SpanStatus) {
    this._status = status;
    return this;
  }

  setAttribute(key: string, value: unknown) {
    this._attributes[key] = value;
    return this;
  }

  getAttribute(key: string) {
    return this._attributes[key];
  }

  context(): SpanContext {
    const state = this.state;

    const traceState = {
      set(_key: string, _value: string): TraceState {
        // Nothing to do here.
        return traceState;
      },
      unset(_key: string): TraceState {
        // Nothing to do here.
        return traceState;
      },
      get(_key: string): string | undefined {
        return;
      },
      serialize() {
        return state;
      }
    };

    return {
      traceId: this.traceId,
      spanId: this.spanId,
      traceFlags: this.flags,
      traceState
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

  startSpan(_name: string, _options?: SpanOptions): MockSpan {
    this._startSpanCalled = true;
    const span = new MockSpan(this.traceId, this.spanId, this.flags, this.state);
    this.spans.push(span);
    return span;
  }
}

const ROOT_SPAN = new MockSpan("root", "root", TraceFlags.SAMPLED, "");

describe("tracingPolicy", function() {
  const TRACE_VERSION = "00";

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
    setTracer(mockTracer);
    const request = new WebResource();
    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isFalse(mockTracer.startSpanCalled());
  });

  it("will create a span and correctly set trace headers if spanOptions are available", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    setTracer(mockTracer);
    const request = new WebResource();
    request.tracingContext = setSpan(context.active(), ROOT_SPAN);

    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

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
    const request = new WebResource();
    request.tracingContext = setSpan(context.active(), ROOT_SPAN);

    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());
    assert.deepEqual(span.getStatus(), { code: SpanStatusCode.OK });
    assert.equal(span.getAttribute("http.status_code"), 200);

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
    const request = new WebResource();
    request.tracingContext = setSpan(context.active(), ROOT_SPAN);

    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.isTrue(mockTracer.startSpanCalled());
    assert.lengthOf(mockTracer.getStartedSpans(), 1);
    const span = mockTracer.getStartedSpans()[0];
    assert.isTrue(span.didEnd());
    assert.deepEqual(span.getStatus(), { code: SpanStatusCode.OK });
    assert.equal(span.getAttribute("http.status_code"), 200);

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
    const request = new WebResource();
    request.tracingContext = setSpan(context.active(), ROOT_SPAN);

    const policy = tracingPolicy().create(
      {
        sendRequest(requestParam: WebResource): Promise<HttpOperationResponse> {
          return Promise.reject({
            request: requestParam,
            statusCode: 400,
            headers: new HttpHeaders(),
            message: "Bad Request."
          });
        }
      },
      new RequestPolicyOptions()
    );
    try {
      await policy.sendRequest(request);
      throw new Error("Test Failure");
    } catch (err) {
      assert.notEqual(err.message, "Test Failure");
      assert.isTrue(mockTracer.startSpanCalled());
      assert.lengthOf(mockTracer.getStartedSpans(), 1);
      const span = mockTracer.getStartedSpans()[0];
      assert.isTrue(span.didEnd());
      assert.deepEqual(span.getStatus(), {
        code: SpanStatusCode.ERROR,
        message: "Bad Request."
      });
      assert.equal(span.getAttribute("http.status_code"), 400);

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
    const request = new WebResource();

    const policy = tracingPolicy().create(mockPolicy, new RequestPolicyOptions());
    await policy.sendRequest(request);

    assert.notExists(request.headers.get("traceparent"));
    assert.notExists(request.headers.get("tracestate"));
  });
});
