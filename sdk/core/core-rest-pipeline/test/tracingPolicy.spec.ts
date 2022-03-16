// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  RestError,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  tracingPolicy,
} from "../src";
import { SpanStatus, TracingContext, TracingSpan, TracingSpanOptions } from "@azure/core-tracing";
import chai, { assert } from "chai";

import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { tracingClient } from "../src/policies/tracingPolicy";

chai.use(chaiAsPromised);

class MockSpan implements TracingSpan {
  spanAttributes: Record<string, unknown> = {};
  endCalled: boolean = false;
  status?: SpanStatus;
  constructor(public name: string, spanOptions: TracingSpanOptions = {}) {
    this.spanAttributes = spanOptions.spanAttributes || {};
  }
  end(): void {
    this.endCalled = true;
  }
  isRecording(): boolean {
    return true;
  }
  recordException(): void {
    // no-op for now
  }
  setAttribute(name: string, value: unknown): void {
    this.spanAttributes[name] = value;
  }
  getAttribute(name: string): unknown {
    return this.spanAttributes[name];
  }
  setStatus(status: SpanStatus): void {
    this.status = status;
  }
}

describe("tracingPolicy", function () {
  /** The span instance that will be returned by {@link tracingClient.startSpan}. */
  let mockSpan: MockSpan;

  /** The tracing context instance that will be returned by {@link tracingClient.startSpan}. */
  let tracingContext: TracingContext;

  let startSpanStub: sinon.SinonStub<any>;

  function createTestRequest(): { request: PipelineRequest; next: sinon.SinonStub } {
    const request = createPipelineRequest({
      url: "https://bing.com",
      method: "POST",
      tracingOptions: { tracingContext },
    });

    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(response);
    return { request, next };
  }

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    tracingContext = {
      deleteValue() {
        return this;
      },
      getValue() {
        return undefined;
      },
      setValue() {
        return this;
      },
    };

    startSpanStub = sinon
      .stub(tracingClient, "startSpan")
      .callsFake((name, operationOptions, spanOptions) => {
        mockSpan = new MockSpan(name, spanOptions);
        return {
          span: mockSpan,
          updatedOptions: {
            ...operationOptions,
            tracingOptions: {
              tracingContext: tracingContext,
            },
          },
        };
      });
  });

  it("will create a span with the correct data", async () => {
    const policy = tracingPolicy();
    const { request, next } = createTestRequest();
    await policy.sendRequest(request, next);

    assert.isTrue(startSpanStub.called);
    assert.equal(mockSpan.name, "HTTP POST");
    assert.equal(mockSpan.getAttribute("http.method"), "POST");
    assert.equal(mockSpan.getAttribute("http.url"), request.url);
    assert.equal(mockSpan.getAttribute("requestId"), request.requestId);
    assert.equal(mockSpan.getAttribute("http.status_code"), 200); // createTestRequest's response will return 200 OK
  });

  it("will set request headers correctly", async () => {
    sinon.stub(tracingClient, "createRequestHeaders").returns({
      testheader: "testvalue",
    });
    const { request, next } = createTestRequest();

    const policy = tracingPolicy();
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
      assert.notEqual(err.message, "Test Failure", "expected `next` to throw, but it did not.");
      assert.isTrue(startSpanStub.called);
      assert.isTrue(mockSpan.endCalled);
      assert.equal(mockSpan.getAttribute("http.status_code"), 400);
      assert.equal(mockSpan.status?.status, "error");
    }
  });

  describe("span errors", () => {
    it("will not fail the request when creating a span throws", async () => {
      startSpanStub.throws("boom");
      const { request, next } = createTestRequest();
      const policy = tracingPolicy();

      await assert.isFulfilled(policy.sendRequest(request, next));
    });

    it("will not fail the request when post-processing success fails", async () => {
      const { request, next } = createTestRequest();
      const policy = tracingPolicy();

      sinon.stub(mockSpan, "end").throwsException(new Error("end is not a function"));
      await assert.isFulfilled(policy.sendRequest(request, next));
    });

    it("will not fail the request when post-processing error fails", async () => {
      const { request, next } = createTestRequest();
      const policy = tracingPolicy();
      const expectedError = new RestError("Bad Request.", { statusCode: 400 });
      next.rejects(expectedError);

      // Expect the pipeline request error, _not_ the error that is thrown when ending a span.
      sinon.stub(mockSpan, "end").throwsException(new Error("end is not a function"));
      await assert.isRejected(policy.sendRequest(request, next), expectedError);
    });
  });
});
