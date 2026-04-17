// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import {
  type PipelineRequest,
  type PipelineResponse,
  RestError,
  type SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  tracingPolicy,
} from "../../src/index.js";
import {
  type Instrumenter,
  type InstrumenterSpanOptions,
  type SpanStatus,
  type TracingContext,
  type TracingSpan,
  type TracingSpanOptions,
  useInstrumenter,
} from "@azure/core-tracing";

// Mock createTracingClient for testing the error path
vi.mock("@azure/core-tracing", async (importOriginal) => {
  const original = await importOriginal<typeof import("@azure/core-tracing")>();
  return {
    ...original,
    createTracingClient: vi.fn(original.createTracingClient),
  };
});

// Mock getUserAgentValue so we can control the user agent string
vi.mock("../../src/util/userAgent.js", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../src/util/userAgent.js")>();
  return {
    ...original,
    getUserAgentValue: vi.fn(original.getUserAgentValue),
  };
});

import { createTracingClient } from "@azure/core-tracing";
import { getUserAgentValue } from "../../src/util/userAgent.js";

class MockSpan implements TracingSpan {
  spanAttributes: Record<string, unknown> = {};
  endCalled: boolean = false;
  status?: SpanStatus;
  exceptions: Array<Error | string> = [];

  constructor(
    public name: string,
    spanOptions: TracingSpanOptions = {},
  ) {
    this.spanAttributes = spanOptions.spanAttributes ?? {};
  }

  isRecording(): boolean {
    return true;
  }

  recordException(exception: Error | string): void {
    this.exceptions.push(exception);
  }

  end(): void {
    this.endCalled = true;
  }

  setStatus(status: SpanStatus): void {
    this.status = status;
  }

  setAttribute(name: string, value: unknown): void {
    this.spanAttributes[name] = value;
  }

  getAttribute(name: string): unknown {
    return this.spanAttributes[name];
  }
}

const noopTracingContext: TracingContext = {
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

class MockInstrumenter implements Instrumenter {
  lastSpanCreated: MockSpan | undefined;
  staticSpan: MockSpan | undefined;

  setStaticSpan(span: MockSpan): void {
    this.staticSpan = span;
  }
  startSpan(
    name: string,
    spanOptions: InstrumenterSpanOptions,
  ): {
    span: TracingSpan;
    tracingContext: TracingContext;
  } {
    const tracingContext = spanOptions.tracingContext ?? noopTracingContext;
    if (this.staticSpan) {
      return { span: this.staticSpan, tracingContext };
    }
    const span = new MockSpan(name, spanOptions);
    this.lastSpanCreated = span;
    return {
      span,
      tracingContext,
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>,
  >(
    _context: TracingContext,
    callback: Callback,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return callback(...callbackArgs);
  }

  parseTraceparentHeader(_traceparentHeader: string): TracingContext | undefined {
    return undefined;
  }
  createRequestHeaders(_tracingContext?: TracingContext): Record<string, string> {
    return {};
  }
}

describe("tracingPolicy", function () {
  let activeInstrumenter: MockInstrumenter;

  function createTestRequest({ noContext = false } = {}): {
    request: PipelineRequest;
    next: Mock<SendRequest>;
  } {
    const request = createPipelineRequest({
      url: "https://bing.com",
      method: "POST",
      tracingOptions: { tracingContext: noContext ? undefined : noopTracingContext },
    });

    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(response);
    return { request, next };
  }

  beforeEach(() => {
    activeInstrumenter = new MockInstrumenter();
    useInstrumenter(activeInstrumenter);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("will create a span with the correct data", async () => {
    const policy = tracingPolicy();
    const { request, next } = createTestRequest();
    await policy.sendRequest(request, next);

    const createdSpan = activeInstrumenter.lastSpanCreated;
    if (!createdSpan) {
      assert.fail("expected span to be created");
    }
    const mockSpan = createdSpan;
    assert.isTrue(mockSpan.endCalled, "expected span to be ended");
    assert.equal(mockSpan.name, "HTTP POST");
    assert.equal(mockSpan.getAttribute("http.method"), "POST");
    assert.equal(mockSpan.getAttribute("http.url"), request.url);
    assert.equal(mockSpan.getAttribute("requestId"), request.requestId);
    assert.equal(mockSpan.getAttribute("http.status_code"), 200); // createTestRequest's response will return 200 OK
  });

  it("will sanitize URLs", async () => {
    const policy = tracingPolicy({ additionalAllowedQueryParameters: ["allowedQueryParam"] });
    const request = createPipelineRequest({
      url: "https://bing.com/search?redactedParam=redactedValue&allowedQueryParam=allowedValue",
      tracingOptions: { tracingContext: noopTracingContext },
    });

    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request: request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(response);

    await policy.sendRequest(request, next);
    const createdSpan = activeInstrumenter.lastSpanCreated;
    if (!createdSpan) {
      assert.fail("expected span to be created");
    }

    const spanUrlValue = new URL(createdSpan.getAttribute("http.url") as string);
    assert.equal(spanUrlValue.searchParams.get("redactedParam"), "REDACTED");
    assert.equal(spanUrlValue.searchParams.get("allowedQueryParam"), "allowedValue");
  });

  it("will set request headers correctly", async () => {
    vi.spyOn(activeInstrumenter, "createRequestHeaders").mockReturnValue({
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
        tracingContext: noopTracingContext,
      },
    });

    const policy = tracingPolicy();
    const next = vi.fn<SendRequest>();
    const requestError = new RestError("Bad Request.", { statusCode: 400 });
    next.mockRejectedValue(requestError);

    await expect(policy.sendRequest(request, next)).rejects.toThrow(requestError);
    const createdSpan = activeInstrumenter.lastSpanCreated;
    assert.exists(createdSpan);
    const mockSpan = createdSpan!;
    assert.equal(mockSpan.status?.status, "error");
    if (mockSpan.status?.status === "error") {
      assert.equal(mockSpan.status?.error, requestError);
    }
    assert.isTrue(mockSpan.endCalled, "end was expected to be called!");
    assert.equal(mockSpan.getAttribute("http.status_code"), 400);
  });

  it("will create a span even if tracingContext is missing", async () => {
    const policy = tracingPolicy();
    const { request, next } = createTestRequest({ noContext: true });
    await policy.sendRequest(request, next);

    const createdSpan = activeInstrumenter.lastSpanCreated;
    assert.exists(createdSpan);
  });

  describe("HTTP status codes", () => {
    const data = [
      {
        statusCode: 100,
        expectedSpanStatus: undefined,
      },
      {
        statusCode: 201,
        expectedSpanStatus: undefined,
      },
      {
        statusCode: 302,
        expectedSpanStatus: undefined,
      },
      {
        statusCode: 400,
        expectedSpanStatus: "error",
      },
      {
        statusCode: 500,
        expectedSpanStatus: "error",
      },
    ];

    for (const { statusCode, expectedSpanStatus } of data) {
      it(`will set the span status to ${expectedSpanStatus} for a status code of ${statusCode}`, async () => {
        const request = createPipelineRequest({
          url: "https://bing.com",
          tracingOptions: {
            tracingContext: noopTracingContext,
          },
        });

        const response = {
          headers: createHttpHeaders(),
          request: request,
          status: statusCode,
          bodyAsText: JSON.stringify({}),
        };

        const policy = tracingPolicy();
        const next = vi.fn<SendRequest>();
        next.mockResolvedValue(response);

        await policy.sendRequest(request, next);
        const createdSpan = activeInstrumenter.lastSpanCreated;
        assert.exists(createdSpan);
        assert.equal(createdSpan?.status?.status, expectedSpanStatus);
      });
    }
  });

  describe("span errors", () => {
    it("will not fail the request when creating a span throws", async () => {
      vi.spyOn(activeInstrumenter, "startSpan").mockImplementation(() => {
        throw "boom";
      });
      const { request, next } = createTestRequest();
      const policy = tracingPolicy();

      await expect(policy.sendRequest(request, next)).resolves;
    });

    it("will not fail the request when post-processing success fails", async () => {
      const mockSpan = new MockSpan("mock");
      vi.spyOn(mockSpan, "end").mockImplementation(() => {
        throw new Error("end is not a function");
      });
      activeInstrumenter.setStaticSpan(mockSpan);
      const { request, next } = createTestRequest();
      const policy = tracingPolicy();

      await expect(policy.sendRequest(request, next)).resolves;
    });

    it("will not fail the request when post-processing error fails", async () => {
      const mockSpan = new MockSpan("mock");
      vi.spyOn(mockSpan, "end").mockImplementation(() => {
        throw new Error("end is not a function");
      });
      const { request, next } = createTestRequest();
      const policy = tracingPolicy();
      const expectedError = new RestError("Bad Request.", { statusCode: 400 });
      next.mockRejectedValue(expectedError);

      // Expect the pipeline request error, _not_ the error that is thrown when ending a span.
      await expect(policy.sendRequest(request, next)).rejects.toThrow(expectedError);
    });
  });
});

class NonRecordingSpan extends MockSpan {
  isRecording(): boolean {
    return false;
  }
}

describe("tracingPolicy - edge cases", function () {
  let activeInstrumenter: MockInstrumenter;

  beforeEach(() => {
    activeInstrumenter = new MockInstrumenter();
    useInstrumenter(activeInstrumenter);
    vi.mocked(createTracingClient).mockRestore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("passes through when tracingClient creation fails", async () => {
    // Make createTracingClient throw to exercise tryCreateTracingClient error path
    vi.mocked(createTracingClient).mockImplementation(() => {
      throw new Error("tracing not available");
    });

    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });
    const next = vi.fn<SendRequest>();
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    next.mockResolvedValue(response);

    const result = await policy.sendRequest(request, next);
    assert.equal(result.status, 200);
    // next should have been called directly (skipping tracing)
    expect(next).toHaveBeenCalledOnce();
  });

  it("skips tracing when span is not recording", async () => {
    const nonRecordingSpan = new NonRecordingSpan("non-recording");
    activeInstrumenter.setStaticSpan(nonRecordingSpan);

    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });
    const next = vi.fn<SendRequest>();
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    next.mockResolvedValue(response);

    await policy.sendRequest(request, next);
    assert.isTrue(nonRecordingSpan.endCalled, "non-recording span should be ended");
    // The span attributes should not be set for status code since we returned early
  });

  it("sets serviceRequestId attribute when x-ms-request-id header is present", async () => {
    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });

    const response: PipelineResponse = {
      headers: createHttpHeaders({ "x-ms-request-id": "test-request-id" }),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(response);

    await policy.sendRequest(request, next);

    assert.isDefined(activeInstrumenter.lastSpanCreated, "Expected span to be created");
    const span = activeInstrumenter.lastSpanCreated;
    assert.equal(span.getAttribute("serviceRequestId"), "test-request-id");
  });

  it("handles error thrown by span.setStatus in tryProcessError", async () => {
    const mockSpan = new MockSpan("mock");
    vi.spyOn(mockSpan, "setStatus").mockImplementation(() => {
      throw new Error("setStatus failed");
    });
    activeInstrumenter.setStaticSpan(mockSpan);

    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });
    const next = vi.fn<SendRequest>();
    const expectedError = new RestError("Bad Request.", { statusCode: 400 });
    next.mockRejectedValue(expectedError);

    // The pipeline error should propagate, not the span processing error
    await expect(policy.sendRequest(request, next)).rejects.toThrow(expectedError);
  });

  it("handles error that is not a RestError (no statusCode attribute)", async () => {
    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });

    const next = vi.fn<SendRequest>();
    const genericError = new Error("generic error");
    next.mockRejectedValue(genericError);

    await expect(policy.sendRequest(request, next)).rejects.toThrow("generic error");
    assert.isDefined(activeInstrumenter.lastSpanCreated, "Expected span to be created");
    const span = activeInstrumenter.lastSpanCreated;
    assert.equal(span.status?.status, "error");
    assert.isTrue(span.endCalled);
    // No http.status_code should be set for non-RestError
    assert.isUndefined(span.getAttribute("http.status_code"));
  });

  it("handles non-Error thrown values in tryProcessError", async () => {
    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });

    const next = vi.fn<SendRequest>();
    next.mockRejectedValue("string error");

    await expect(policy.sendRequest(request, next)).rejects.toEqual("string error");
    assert.isDefined(activeInstrumenter.lastSpanCreated, "Expected span to be created");
    const span = activeInstrumenter.lastSpanCreated;
    assert.equal(span.status?.status, "error");
    // error should be undefined since "string error" is not an Error instance
    assert.isUndefined((span.status as { error?: unknown })?.error);
    assert.isTrue(span.endCalled);
  });

  it("sets http.user_agent attribute to an empty string when userAgent is empty", async () => {
    // Mock getUserAgentValue to return empty string to exercise the false branch of `if (userAgent)`
    vi.mocked(getUserAgentValue).mockResolvedValue("");

    const policy = tracingPolicy();
    const request = createPipelineRequest({
      url: "https://example.com",
      tracingOptions: { tracingContext: noopTracingContext },
    });
    const next = vi.fn<SendRequest>();
    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    next.mockResolvedValue(response);

    await policy.sendRequest(request, next);
    assert.isDefined(activeInstrumenter.lastSpanCreated, "Expected span to be created");
    const span = activeInstrumenter.lastSpanCreated;
    assert.equal(span.getAttribute("http.user_agent"), "");
  });
});
