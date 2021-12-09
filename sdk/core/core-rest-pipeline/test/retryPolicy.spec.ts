// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger } from "@azure/logger";
import { AbortController } from "@azure/abort-controller";
import { assert } from "chai";
import * as sinon from "sinon";
import {
  createPipelineRequest,
  SendRequest,
  PipelineResponse,
  createHttpHeaders,
  RestError,
  retryPolicy,
  RetryStrategyState
} from "../src";
import { MockSpan, MockTracer, MockTracerProvider } from "./tracingPolicy.spec";
import { setSpan, TraceFlags, context, SpanStatusCode } from "@azure/core-tracing";

describe("retryPolicy", function() {
  afterEach(function() {
    sinon.restore();
  });

  it("It should allow passing custom retry strategies", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };

    const policy = retryPolicy({
      name: "testRetryStrategy",
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.retryAfterInMs = 100;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.onFirstCall().rejects(testError);
    next.onSecondCall().resolves(successResponse);

    const clock = sinon.useFakeTimers();

    const promise = policy.sendRequest(request, next);
    assert.isTrue(next.calledOnce);

    // allow the delay to occur
    const time = await clock.nextAsync();
    // should be at least the standard delay
    assert.isAtLeast(time, 100);
    assert.isTrue(next.calledTwice);

    const result = await promise;
    assert.strictEqual(result, successResponse);
  });

  it("It should give up after the default maxRetries is reached", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy({
      name: "testRetryStrategy",
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.retryAfterInMs = 100;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);
  });

  it("It should give up after maxRetries is changed", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy({
      name: "testRetryStrategy",
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.maxRetries = 10;
        state.retryAfterInMs = 100;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 11);
    assert.isTrue(catchCalled);
  });

  it("It should allow redirecting on the next retry", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy({
      name: "testRetryStrategy",
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.redirectTo = "https://not-bing.com";
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);
    assert.strictEqual(request.url, "https://not-bing.com");
  });

  it("It should allow throwing new errors", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const retryError = new RestError("Test Retry Error!");

    const policy = retryPolicy({
      name: "testRetryStrategy",
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.throwError = retryError;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, retryError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);
  });

  it("It should log consistent messages", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const logParams: {
      info: string[];
      error: string[];
    } = {
      info: [],
      error: []
    };

    const policy = retryPolicy({
      name: "testRetryStrategy",
      logger: {
        info(...params) {
          logParams.info.push(params.join(" "));
        },
        error(...params) {
          logParams.error.push(params.join(" "));
        }
      } as AzureLogger,
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.retryAfterInMs = 100;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);

    assert.deepEqual(logParams, {
      info: [
        "Retry 0: Processing retry strategy testRetryStrategy.",
        "Retry 0: Retry strategy testRetryStrategy retries after 100",
        "Retry 1: Processing retry strategy testRetryStrategy.",
        "Retry 1: Retry strategy testRetryStrategy retries after 100",
        "Retry 2: Processing retry strategy testRetryStrategy.",
        "Retry 2: Retry strategy testRetryStrategy retries after 100",
        "Retry 3: Processing retry strategy testRetryStrategy.",
        "Maximum retries reached. Returning the last received response, or throwing the last received error."
      ],
      error: []
    });
  });

  it("It should log when the policy requirements are unmet", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "NOT-ENOENT" });
    const logParams: {
      info: string[];
      error: string[];
    } = {
      info: [],
      error: []
    };

    const policy = retryPolicy({
      name: "testRetryStrategy",
      logger: {
        info(...params) {
          logParams.info.push(params.join(" "));
        },
        error(...params) {
          logParams.error.push(params.join(" "));
        }
      } as AzureLogger,
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.retryAfterInMs = 100;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await clock.runAllAsync();
    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);

    assert.deepEqual(logParams, {
      info: [
        "Retry 0: Processing retry strategy testRetryStrategy.",
        "Retry 1: Processing retry strategy testRetryStrategy.",
        "Retry 2: Processing retry strategy testRetryStrategy.",
        "Retry 3: Processing retry strategy testRetryStrategy.",
        "Maximum retries reached. Returning the last received response, or throwing the last received error."
      ],
      error: [
        "Retry 0: Does not meet conditions.",
        "Retry 1: Does not meet conditions.",
        "Retry 2: Does not meet conditions."
      ]
    });
  });

  it("It should log when the abort controller aborts", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const abortController = new AbortController();
    request.abortSignal = abortController.signal;

    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const logParams: {
      info: string[];
      error: string[];
    } = {
      info: [],
      error: []
    };

    const policy = retryPolicy({
      name: "testRetryStrategy",
      logger: {
        info(...params) {
          logParams.info.push(params.join(" "));
        },
        error(...params) {
          logParams.error.push(params.join(" "));
        }
      } as AzureLogger,
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.retryAfterInMs = 100;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });

    abortController.abort();
    await clock.runAllAsync();

    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);

    assert.deepEqual(logParams, {
      info: ["Retry 0: Processing retry strategy testRetryStrategy."],
      error: ["Retry 0: Request aborted."]
    });
  });

  it("It should log when the retry strategy throws with an error", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const retryError = new RestError("Test Retry Error!");

    const logParams: {
      info: string[];
      error: string[];
    } = {
      info: [],
      error: []
    };

    const policy = retryPolicy({
      name: "testRetryStrategy",
      logger: {
        info(...params) {
          logParams.info.push(params.join(" "));
        },
        error(...params) {
          logParams.error.push(params.join(" "));
        }
      } as AzureLogger,
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.throwError = retryError;
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, retryError);
    });

    await clock.runAllAsync();

    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);

    assert.deepEqual(logParams, {
      info: ["Retry 0: Processing retry strategy testRetryStrategy."],
      error: [
        "Retry 0: Retry strategy testRetryStrategy throws error: RestError: Test Retry Error!"
      ]
    });
  });

  it("It should log when the retry strategy redirects to another URL", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const logParams: {
      info: string[];
      error: string[];
    } = {
      info: [],
      error: []
    };

    const policy = retryPolicy({
      name: "testRetryStrategy",
      logger: {
        info(...params) {
          logParams.info.push(params.join(" "));
        },
        error(...params) {
          logParams.error.push(params.join(" "));
        }
      } as AzureLogger,
      meetsConditions({ responseError }) {
        return Boolean(responseError && responseError!.code === "ENOENT");
      },
      updateRetryState(state: RetryStrategyState): RetryStrategyState {
        state.redirectTo = "https://not-bing.com";
        return state;
      }
    });
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    const clock = sinon.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });

    await clock.runAllAsync();

    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);
    assert.strictEqual(request.url, "https://not-bing.com");

    assert.deepEqual(logParams, {
      info: [
        "Retry 0: Processing retry strategy testRetryStrategy.",
        "Retry 0: Retry strategy testRetryStrategy redirects to https://not-bing.com",
        "Retry 1: Processing retry strategy testRetryStrategy.",
        "Retry 1: Retry strategy testRetryStrategy redirects to https://not-bing.com",
        "Retry 2: Processing retry strategy testRetryStrategy.",
        "Retry 2: Retry strategy testRetryStrategy redirects to https://not-bing.com",
        "Retry 3: Processing retry strategy testRetryStrategy.",
        "Maximum retries reached. Returning the last received response, or throwing the last received error."
      ],
      error: []
    });
  });

  describe.only("retryPolicy tracing", function() {
    const TRACE_VERSION = "00";
    const mockTracerProvider = new MockTracerProvider();

    beforeEach(() => {
      mockTracerProvider.register();
    });

    afterEach(() => {
      mockTracerProvider.disable();
    });

    it("It should support tracing", async () => {
      const mockTraceId = "11111111111111111111111111111111";
      const mockSpanId = "2222222222222222";
      const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
      mockTracerProvider.setTracer(mockTracer);

      const ROOT_SPAN = new MockSpan("root", "root", TraceFlags.SAMPLED, "");

      const request = createPipelineRequest({
        url: "https://bing.com",
        tracingOptions: {
          tracingContext: setSpan(context.active(), ROOT_SPAN)
        }
      });
      const testError = new RestError("Test Error!", { code: "ENOENT" });
      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200
      };

      const policy = retryPolicy({
        name: "testRetryStrategy",
        meetsConditions({ responseError }) {
          return Boolean(responseError && responseError!.code === "ENOENT");
        },
        updateRetryState(state: RetryStrategyState): RetryStrategyState {
          state.retryAfterInMs = 100;
          return state;
        }
      });
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.onFirstCall().rejects(testError);
      next.onSecondCall().resolves(successResponse);

      const clock = sinon.useFakeTimers();

      const promise = policy.sendRequest(request, next);
      assert.isTrue(next.calledOnce);

      // allow the delay to occur
      const time = await clock.nextAsync();
      // should be at least the standard delay
      assert.isAtLeast(time, 100);
      assert.isTrue(next.calledTwice);

      const result = await promise;
      assert.strictEqual(result, successResponse);

      assert.isTrue(mockTracer.startSpanCalled());
      assert.lengthOf(mockTracer.getStartedSpans(), 4);

      const spans = mockTracer.getStartedSpans();
      const userAgentNames: string[] = [];

      for (const [index, span] of spans.entries()) {
        assert.isTrue(span.didEnd());

        userAgentNames.push((span.getAttribute("http.user_agent") as string).split(" ")[0]);

        if (index < spans.length - 2) {
          assert.deepEqual(span.getStatus(), {
            code: SpanStatusCode.ERROR,
            message: "Test Error!"
          });
        } else {
          assert.equal(span.getAttribute("http.status_code"), 200);
          assert.deepEqual(span.getStatus(), { code: SpanStatusCode.OK });
        }
      }

      assert.deepEqual(userAgentNames, [
        "retryPolicy",
        "testRetryStrategy",
        "retryPolicy",
        "testRetryStrategy"
      ]);

      const expectedFlag = "01";

      assert.equal(
        request.headers.get("traceparent"),
        `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
      );
      assert.notExists(request.headers.get("tracestate"));
    });

    it("It should support tracing when the default maxRetries is reached", async () => {
      const mockTraceId = "11111111111111111111111111111111";
      const mockSpanId = "2222222222222222";
      const mockTracer = new MockTracer(mockTraceId, mockSpanId, TraceFlags.SAMPLED);
      mockTracerProvider.setTracer(mockTracer);

      const ROOT_SPAN = new MockSpan("root", "root", TraceFlags.SAMPLED, "");

      const request = createPipelineRequest({
        url: "https://bing.com",
        tracingOptions: {
          tracingContext: setSpan(context.active(), ROOT_SPAN)
        }
      });
      const testError = new RestError("Test Error!", { code: "ENOENT" });

      const policy = retryPolicy({
        name: "testRetryStrategy",
        meetsConditions({ responseError }) {
          return Boolean(responseError && responseError!.code === "ENOENT");
        },
        updateRetryState(state: RetryStrategyState): RetryStrategyState {
          state.retryAfterInMs = 100;
          return state;
        }
      });
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.rejects(testError);

      const clock = sinon.useFakeTimers();

      let catchCalled = false;
      const promise = policy.sendRequest(request, next);
      promise.catch((e) => {
        catchCalled = true;
        assert.strictEqual(e, testError);
      });
      await clock.runAllAsync();
      assert.isTrue(catchCalled);
      assert.strictEqual(next.callCount, 4);

      assert.isTrue(mockTracer.startSpanCalled());
      assert.lengthOf(mockTracer.getStartedSpans(), 8);

      const spans = mockTracer.getStartedSpans();
      const userAgentNames: string[] = [];

      for (const [index, span] of spans.entries()) {
        assert.isTrue(span.didEnd());

        userAgentNames.push((span.getAttribute("http.user_agent") as string).split(" ")[0]);

        if (index < spans.length - 2) {
          assert.deepEqual(span.getStatus(), {
            code: SpanStatusCode.ERROR,
            message: "Test Error!"
          });
        } else {
          assert.equal(span.getAttribute("http.status_code"), undefined);
          assert.deepEqual(span.getStatus(), {
            code: SpanStatusCode.ERROR,
            message: "Test Error!"
          });
        }
      }

      assert.deepEqual(userAgentNames, [
        "retryPolicy",
        "testRetryStrategy",
        "retryPolicy",
        "testRetryStrategy",
        "retryPolicy",
        "testRetryStrategy",
        "retryPolicy",
        "testRetryStrategy"
      ]);

      const expectedFlag = "01";

      assert.equal(
        request.headers.get("traceparent"),
        `${TRACE_VERSION}-${mockTraceId}-${mockSpanId}-${expectedFlag}`
      );
      assert.notExists(request.headers.get("tracestate"));
    });
  });
});
