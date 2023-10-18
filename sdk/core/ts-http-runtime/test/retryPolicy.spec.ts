// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as sinon from "sinon";
import {
  PipelineResponse,
  RestError,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
} from "../src";
import { retryPolicy } from "../src/policies/retryPolicy";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants";
import { assert } from "chai";
import { makeTestLogger } from "./util";

describe("retryPolicy", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("It should allow passing custom retry strategies", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            return { skipStrategy: true };
          }
          return {
            retryAfterInMs: 100,
          };
        },
      },
    ]);
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
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            return { skipStrategy: true };
          }
          return {
            retryAfterInMs: 100,
          };
        },
      },
    ]);
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
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
    assert.isTrue(catchCalled);
  });

  it("It should give up after maxRetries is changed", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          retry({ responseError }) {
            if (responseError?.code !== "ENOENT") {
              return { skipStrategy: true };
            }
            return {
              retryAfterInMs: 100,
            };
          },
        },
      ],
      {
        maxRetries: 10,
      }
    );

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
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            return { skipStrategy: true };
          }
          return {
            redirectTo: "https://not-bing.com",
          };
        },
      },
    ]);

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
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
    assert.isTrue(catchCalled);
    assert.strictEqual(request.url, "https://not-bing.com");
  });

  it("It should allow throwing new errors", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const retryError = new RestError("Test Retry Error!");

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            return { skipStrategy: true };
          }
          return {
            errorToThrow: retryError,
          };
        },
      },
    ]);

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
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const policyLogger = makeTestLogger();
    const strategyLogger = makeTestLogger();

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          logger: strategyLogger.logger,
          retry({ responseError }) {
            if (responseError?.code !== "ENOENT") {
              return { skipStrategy: true };
            }
            return {
              retryAfterInMs: 100,
            };
          },
        },
      ],
      {
        logger: policyLogger.logger,
      }
    );

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
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
    assert.isTrue(catchCalled);

    assert.deepEqual(
      policyLogger.params.info.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      [
        "Retry 0: Attempting to send request [Request Id]",
        "Retry 0: Processing 1 retry strategies.",
        "Retry 1: Attempting to send request [Request Id]",
        "Retry 1: Processing 1 retry strategies.",
        "Retry 2: Attempting to send request [Request Id]",
        "Retry 2: Processing 1 retry strategies.",
        "Retry 3: Attempting to send request [Request Id]",
        "Retry 3: Maximum retries reached. Returning the last received response, or throwing the last received error.",
      ]
    );

    assert.deepEqual(
      policyLogger.params.error.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      [
        "Retry 0: Received an error from request [Request Id]",
        "Retry 1: Received an error from request [Request Id]",
        "Retry 2: Received an error from request [Request Id]",
        "Retry 3: Received an error from request [Request Id]",
      ]
    );

    assert.deepEqual(strategyLogger.params, {
      info: [
        "Retry 0: Processing retry strategy testRetryStrategy.",
        "Retry 0: Retry strategy testRetryStrategy retries after 100",
        "Retry 1: Processing retry strategy testRetryStrategy.",
        "Retry 1: Retry strategy testRetryStrategy retries after 100",
        "Retry 2: Processing retry strategy testRetryStrategy.",
        "Retry 2: Retry strategy testRetryStrategy retries after 100",
      ],
      error: [],
    });
  });

  it("It should log when the policy requirements are unmet", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "NOT-ENOENT" });
    const policyLogger = makeTestLogger();
    const strategyLogger = makeTestLogger();

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          logger: strategyLogger.logger,
          retry({ responseError }) {
            if (responseError?.code !== "ENOENT") {
              return { skipStrategy: true };
            }
            return {
              retryAfterInMs: 100,
            };
          },
        },
      ],
      {
        logger: policyLogger.logger,
      }
    );

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
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);

    assert.deepEqual(
      policyLogger.params.info.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      [
        "Retry 0: Attempting to send request [Request Id]",
        "Retry 0: Processing 1 retry strategies.",
        "None of the retry strategies could work with the received error. Throwing it.",
      ]
    );

    assert.deepEqual(
      policyLogger.params.error.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      ["Retry 0: Received an error from request [Request Id]"]
    );

    assert.deepEqual(strategyLogger.params, {
      info: ["Retry 0: Processing retry strategy testRetryStrategy.", "Retry 0: Skipped."],
      error: [],
    });
  });

  it("It should log when the abort controller aborts", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const abortController = new AbortController();
    request.abortSignal = abortController.signal;

    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const policyLogger = makeTestLogger();
    const strategyLogger = makeTestLogger();

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          logger: strategyLogger.logger,
          retry() {
            return {
              retryAfterInMs: 100,
            };
          },
        },
      ],
      {
        logger: policyLogger.logger,
      }
    );

    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.rejects(testError);

    abortController.abort();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    await promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e.name, "AbortError");
    });

    // should be one more than the default retry count
    assert.strictEqual(next.callCount, 1);
    assert.isTrue(catchCalled);

    assert.deepEqual(
      policyLogger.params.info.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      ["Retry 0: Attempting to send request [Request Id]"]
    );

    assert.deepEqual(
      policyLogger.params.error.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      ["Retry 0: Received an error from request [Request Id]", "Retry 0: Request aborted."]
    );

    assert.deepEqual(strategyLogger.params, {
      info: [],
      error: [],
    });
  });

  it("It should log when the retry strategy throws with an error", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const retryError = new RestError("Test Retry Error!");
    const policyLogger = makeTestLogger();
    const strategyLogger = makeTestLogger();

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          logger: strategyLogger.logger,
          retry({ responseError }) {
            if (responseError?.code !== "ENOENT") {
              return { skipStrategy: true };
            }
            return {
              errorToThrow: retryError,
            };
          },
        },
      ],
      {
        logger: policyLogger.logger,
      }
    );

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

    assert.deepEqual(
      policyLogger.params.info.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      [
        "Retry 0: Attempting to send request [Request Id]",
        "Retry 0: Processing 1 retry strategies.",
      ]
    );

    assert.deepEqual(
      policyLogger.params.error.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      ["Retry 0: Received an error from request [Request Id]"]
    );

    assert.deepEqual(strategyLogger.params, {
      info: ["Retry 0: Processing retry strategy testRetryStrategy."],
      error: [
        "Retry 0: Retry strategy testRetryStrategy throws error: RestError: Test Retry Error!",
      ],
    });
  });

  it("It should log when the retry strategy redirects to another URL", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });
    const policyLogger = makeTestLogger();
    const strategyLogger = makeTestLogger();

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          logger: strategyLogger.logger,
          retry({ responseError }) {
            if (responseError?.code !== "ENOENT") {
              return { skipStrategy: true };
            }
            return {
              redirectTo: "https://not-bing.com",
            };
          },
        },
      ],
      {
        logger: policyLogger.logger,
      }
    );

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
    assert.strictEqual(next.callCount, DEFAULT_RETRY_POLICY_COUNT + 1);
    assert.isTrue(catchCalled);
    assert.strictEqual(request.url, "https://not-bing.com");

    assert.deepEqual(
      policyLogger.params.info.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      [
        "Retry 0: Attempting to send request [Request Id]",
        "Retry 0: Processing 1 retry strategies.",
        "Retry 1: Attempting to send request [Request Id]",
        "Retry 1: Processing 1 retry strategies.",
        "Retry 2: Attempting to send request [Request Id]",
        "Retry 2: Processing 1 retry strategies.",
        "Retry 3: Attempting to send request [Request Id]",
        "Retry 3: Maximum retries reached. Returning the last received response, or throwing the last received error.",
      ]
    );

    assert.deepEqual(
      policyLogger.params.error.map((x) => x.replace(/ request .*/g, " request [Request Id]")),
      [
        "Retry 0: Received an error from request [Request Id]",
        "Retry 1: Received an error from request [Request Id]",
        "Retry 2: Received an error from request [Request Id]",
        "Retry 3: Received an error from request [Request Id]",
      ]
    );

    assert.deepEqual(strategyLogger.params, {
      info: [
        "Retry 0: Processing retry strategy testRetryStrategy.",
        "Retry 0: Retry strategy testRetryStrategy redirects to https://not-bing.com",
        "Retry 1: Processing retry strategy testRetryStrategy.",
        "Retry 1: Retry strategy testRetryStrategy redirects to https://not-bing.com",
        "Retry 2: Processing retry strategy testRetryStrategy.",
        "Retry 2: Retry strategy testRetryStrategy redirects to https://not-bing.com",
      ],
      error: [],
    });
  });
});
