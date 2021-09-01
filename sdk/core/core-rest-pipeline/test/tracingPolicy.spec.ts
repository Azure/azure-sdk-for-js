// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  tracingPolicy,
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders,
  RestError
} from "../src";
import {
  SpanContext,
  TraceFlags,
  TraceState,
  context,
  setSpan,
  SpanStatus,
  SpanStatusCode,
  SpanAttributes,
  SpanAttributeValue,
  SpanOptions
} from "@azure/core-tracing";
import { TracerProvider, Tracer, Span, trace } from "@opentelemetry/api";

class MockSpan implements Span {
  private _endCalled = false;
  private _status: SpanStatus = {
    code: SpanStatusCode.UNSET
  };
  private _attributes: SpanAttributes = {};

  constructor(
    private traceId: string,
    private spanId: string,
    private flags: TraceFlags,
    private state: string,
    options?: SpanOptions
  ) {
    this._attributes = options?.attributes || {};
  }

  addEvent(): this {
    throw new Error("Method not implemented.");
  }

  isRecording(): boolean {
    return true;
  }

  recordException(): void {
    throw new Error("Method not implemented.");
  }

  updateName(): this {
    throw new Error("Method not implemented.");
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

  setAttributes(attributes: SpanAttributes): this {
    for (const key in attributes) {
      this.setAttribute(key, attributes[key]!);
    }
    return this;
  }

  setAttribute(key: string, value: SpanAttributeValue) {
    this._attributes[key] = value;
    return this;
  }

  getAttribute(key: string) {
    return this._attributes[key];
  }

  spanContext(): SpanContext {
    const state = this.state;

    const traceState = {
      set(): TraceState {
        /* empty */
        return traceState;
      },
      unset(): TraceState {
        /* empty */
        return traceState;
      },
      get(): string | undefined {
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

class MockTracer implements Tracer {
  private spans: MockSpan[] = [];
  private _startSpanCalled = false;

  constructor(
    private traceId = "",
    private spanId = "",
    private flags = TraceFlags.NONE,
    private state = ""
  ) {}

  startActiveSpan(): never {
    throw new Error("Method not implemented.");
  }

  getStartedSpans(): MockSpan[] {
    return this.spans;
  }

  startSpanCalled(): boolean {
    return this._startSpanCalled;
  }

  startSpan(_name: string, options?: SpanOptions): MockSpan {
    this._startSpanCalled = true;
    const span = new MockSpan(this.traceId, this.spanId, this.flags, this.state, options);
    this.spans.push(span);
    return span;
  }
}

class MockTracerProvider implements TracerProvider {
  private mockTracer: Tracer = new MockTracer();

  setTracer(tracer: Tracer) {
    this.mockTracer = tracer;
  }

  getTracer(): Tracer {
    return this.mockTracer;
  }

  register() {
    trace.setGlobalTracerProvider(this);
  }

  disable() {
    trace.disable();
  }
}

const ROOT_SPAN = new MockSpan("root", "root", TraceFlags.SAMPLED, "");

describe("tracingPolicy", function() {
  const TRACE_VERSION = "00";
  const mockTracerProvider = new MockTracerProvider();

  beforeEach(() => {
    mockTracerProvider.register();
  });

  afterEach(() => {
    mockTracerProvider.disable();
  });

  it("will not create a span if tracingContext is missing", async () => {
    const mockTracer = new MockTracer();
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

  it("will create a span and correctly set trace headers if tracingContext is available", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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
    assert.deepEqual(span.getStatus(), { code: SpanStatusCode.OK });
    assert.equal(span.getAttribute("http.status_code"), 200);

    const expectedFlag = "01";

    assert.equal(
      request.headers.get("traceparent"),
      `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
    );
    assert.notExists(request.headers.get("tracestate"));
  });

  it("will create a span and correctly set trace headers if tracingContext is available (no TraceOptions)", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    // leave out the TraceOptions
    const mockTracer = new MockTracer(mockTraceId, mockSpanId);
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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
    assert.deepEqual(span.getStatus(), { code: SpanStatusCode.OK });
    assert.equal(span.getAttribute("http.status_code"), 200);

    const expectedFlag = "00";

    assert.equal(
      request.headers.get("traceparent"),
      `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
    );
    assert.notExists(request.headers.get("tracestate"));
  });

  it("will create a span and correctly set trace headers tracingContext is available (TraceState)", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTraceState = "foo=bar";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED, mockTraceState);
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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
    assert.deepEqual(span.getStatus(), { code: SpanStatusCode.OK });

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
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
      }
    });
    const policy = tracingPolicy();
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(new RestError("Bad Request.", { statusCode: 400 }));

    try {
      await policy.sendRequest(request, next);
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
    mockTracerProvider.disable();

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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

  it("will not set headers if context is invalid", async () => {
    // This will create a tracer that produces invalid trace-id and span-id
    const mockTracer = new MockTracer("invalid", "00", TraceFlags.SAMPLED, "foo=bar");
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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

  it("will not fail the request if span setup fails", async () => {
    const errorTracer = new MockTracer("", "", TraceFlags.SAMPLED, "");
    sinon.stub(errorTracer, "startSpan").throws(new Error("Test Error"));
    mockTracerProvider.setTracer(errorTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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

    // Does not throw
    const result = await policy.sendRequest(request, next);
    assert.equal(result, response);
  });

  it("will not fail the request if response processing fails", async () => {
    const errorTracer = new MockTracer("", "", TraceFlags.SAMPLED, "");
    mockTracerProvider.setTracer(errorTracer);
    const errorSpan = new MockSpan("", "", TraceFlags.SAMPLED, "");
    sinon.stub(errorSpan, "end").throws(new Error("Test Error"));
    sinon.stub(errorTracer, "startSpan").returns(errorSpan);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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

    // Does not throw
    const result = await policy.sendRequest(request, next);
    assert.equal(result, response);
  });

  it("will give priority to context's az.namespace over spanOptions", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN).setValue(
          Symbol.for("az.namespace"),
          "value_from_context"
        )
      }
    });
    Object.assign(request.tracingOptions, {
      spanOptions: { attributes: { "az.namespace": "value_from_span_options" } }
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
    assert.equal(span.getAttribute("az.namespace"), "value_from_context");
  });

  it("will use spanOptions if context does not have namespace", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
      }
    });
    Object.assign(request.tracingOptions, {
      spanOptions: { attributes: { "az.namespace": "value_from_span_options" } }
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
    assert.equal(span.getAttribute("az.namespace"), "value_from_span_options");
  });

  it("is robust when spanOptions is undefined", async () => {
    const mockTraceId = "11111111111111111111111111111111";
    const mockSpanId = "2222222222222222";
    const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
    mockTracerProvider.setTracer(mockTracer);

    const request = createPipelineRequest({
      url: "https://bing.com",
      tracingOptions: {
        tracingContext: setSpan(context.active(), ROOT_SPAN)
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
    assert.notExists(span.getAttribute("az.namespace"));
  });
});
