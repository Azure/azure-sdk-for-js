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
  RestError,
  PipelineRequest,
  PipelinePolicy,
} from "../src";
import { tracingClient } from "../src/policies/tracingPolicy";
import { SpanStatus, TracingContext, TracingSpan, TracingSpanOptions } from "@azure/core-tracing";

class MockSpan implements TracingSpan {
  spanAttributes: Record<string, unknown> = {};
  endCalled: boolean = false;
  status?: SpanStatus;
  constructor(public name: string, spanOptions: TracingSpanOptions = {}) {
    this.spanAttributes = spanOptions.spanAttributes || {};
  }
  end() {
    this.endCalled = true;
  }
  isRecording() {
    return true;
  }
  recordException() {
    // no-op for now
  }
  setAttribute(name: string, value: unknown) {
    this.spanAttributes[name] = value;
  }
  getAttribute(name: string) {
    return this.spanAttributes[name];
  }
  setStatus(status: SpanStatus) {
    this.status = status;
  }
}

function createTracingContext(initialValues: Map<symbol, unknown> = new Map()): TracingContext {
  const data = new Map(initialValues);
  return {
    deleteValue(key) {
      const newData = new Map(data);
      data.delete(key);
      return createTracingContext(newData);
    },
    getValue(key) {
      return data.get(key);
    },
    setValue(key, value) {
      const newData = new Map(data);
      newData.set(key, value);
      return createTracingContext(newData);
    },
  };
}

describe("tracingPolicy", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("without tracingContext", () => {
    it("will not create a span if tracingContext is missing", async () => {
      const startSpanSpy = sinon.spy(tracingClient, "startSpan");
      const request = createPipelineRequest({
        url: "https://bing.com",
      });
      const response: PipelineResponse = {
        headers: createHttpHeaders(),
        request: request,
        status: 200,
      };
      const policy = tracingPolicy();
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.resolves(response);
      await policy.sendRequest(request, next);

      assert.isFalse(startSpanSpy.called);
    });
  });

  describe("with a tracingContext and recording span", () => {
    let tracingContext: TracingContext;
    let startSpanStub: sinon.SinonStub;

    beforeEach(() => {
      tracingContext = createTracingContext().setValue(Symbol.for("az.namespace"), "test");
      assert.equal(tracingContext.getValue(Symbol.for("az.namespace")), "test");

      startSpanStub = sinon
        .stub(tracingClient, "startSpan")
        .callsFake((name, options, spanOptions) => {
          return {
            span: new MockSpan(name, spanOptions),
            updatedOptions: { ...options, tracingOptions: { tracingContext } },
          };
        });
    });

    it("will create a span with the correct data", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        method: "POST",
        tracingOptions: {
          tracingContext,
        },
      });

      const response: PipelineResponse = {
        headers: createHttpHeaders(),
        request: request,
        status: 200,
      };
      const policy = tracingPolicy();
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.resolves(response);
      await policy.sendRequest(request, next);

      assert.isTrue(startSpanStub.called);
      const span = startSpanStub.getCall(0).returnValue.span as MockSpan;
      assert.equal(span.name, "HTTP POST");
      assert.equal(span.getAttribute("az.namespace"), "test");
      assert.equal(span.getAttribute("http.method"), "POST");
      assert.equal(span.getAttribute("http.url"), request.url);
      assert.equal(span.getAttribute("requestId"), request.requestId);
      assert.equal(span.getAttribute("http.status_code"), response.status);
    });

    it("will set request headers", async () => {
      sinon.stub(tracingClient, "createRequestHeaders").returns({
        testheader: "testvalue",
      });

      const request = createPipelineRequest({
        url: "https://bing.com",
        method: "POST",
        tracingOptions: {
          tracingContext,
        },
      });

      const response: PipelineResponse = {
        headers: createHttpHeaders(),
        request: request,
        status: 200,
      };
      const policy = tracingPolicy();
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.resolves(response);
      await policy.sendRequest(request, next);
      assert.equal(request.headers.get("testheader"), "testvalue");
    });

    it("will close a span if an error is encountered", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        tracingOptions: {
          tracingContext,
        },
      });

      const policy = tracingPolicy();
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.rejects(new RestError("Bad Request.", { statusCode: 400 }));

      try {
        await policy.sendRequest(request, next);
        throw new Error("Test Failure");
      } catch (err) {
        assert.notEqual(err.message, "Test Failure");
        assert.isTrue(startSpanStub.called);
        const span = startSpanStub.getCall(0).returnValue.span as MockSpan;
        assert.isTrue(span.endCalled);
        assert.equal(span.getAttribute("http.status_code"), 400);
        assert.equal(span.status?.status, "error");
      }
    });

    describe("span errors", () => {
      let policy: PipelinePolicy;
      let request: PipelineRequest;
      let next: sinon.SinonStub;

      beforeEach(() => {
        request = createPipelineRequest({
          url: "https://bing.com",
          method: "POST",
          tracingOptions: {
            tracingContext,
          },
        });

        const response: PipelineResponse = {
          headers: createHttpHeaders(),
          request: request,
          status: 200,
        };
        policy = tracingPolicy();
        next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
        next.resolves(response);
      });

      it("will not fail the request when creating a span throws", async () => {
        sinon.restore();
        sinon.stub(tracingClient, "startSpan").throws("boom");
        // Does not throw
        const result = await policy.sendRequest(request, next);
        assert.ok(result);
      });
    });
  });
});
