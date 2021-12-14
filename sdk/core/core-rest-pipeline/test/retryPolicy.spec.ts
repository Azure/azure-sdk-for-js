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
  SkipRetryError
} from "../src";

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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            retryAfterInMs: 100
          };
        }
      }
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
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            retryAfterInMs: 100
          };
        }
      }
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
    assert.strictEqual(next.callCount, 4);
    assert.isTrue(catchCalled);
  });

  it("It should give up after maxRetries is changed", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy(
      [
        {
          name: "testRetryStrategy",
          retry({ responseError }) {
            if (responseError?.code !== "ENOENT") {
              throw new SkipRetryError("Invalid error");
            }
            return {
              retryAfterInMs: 100
            };
          }
        }
      ],
      {
        maxRetries: 10
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
      url: "https://bing.com"
    });
    const testError = new RestError("Test Error!", { code: "ENOENT" });

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            redirectTo: "https://not-bing.com"
          };
        }
      }
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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            throwError: retryError
          };
        }
      }
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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        logger: {
          info(...params) {
            logParams.info.push(params.join(" "));
          },
          error(...params) {
            logParams.error.push(params.join(" "));
          }
        } as AzureLogger,
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            retryAfterInMs: 100
          };
        }
      }
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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        logger: {
          info(...params) {
            logParams.info.push(params.join(" "));
          },
          error(...params) {
            logParams.error.push(params.join(" "));
          }
        } as AzureLogger,
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Unexpected error.");
          }
          return {
            retryAfterInMs: 100
          };
        }
      }
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
        "Retry 0: Skipped. Unexpected error.",
        "Retry 1: Skipped. Unexpected error.",
        "Retry 2: Skipped. Unexpected error."
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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        logger: {
          info(...params) {
            logParams.info.push(params.join(" "));
          },
          error(...params) {
            logParams.error.push(params.join(" "));
          }
        } as AzureLogger,
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            retryAfterInMs: 100
          };
        }
      }
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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        logger: {
          info(...params) {
            logParams.info.push(params.join(" "));
          },
          error(...params) {
            logParams.error.push(params.join(" "));
          }
        } as AzureLogger,
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            throwError: retryError
          };
        }
      }
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

    const policy = retryPolicy([
      {
        name: "testRetryStrategy",
        logger: {
          info(...params) {
            logParams.info.push(params.join(" "));
          },
          error(...params) {
            logParams.error.push(params.join(" "));
          }
        } as AzureLogger,
        retry({ responseError }) {
          if (responseError?.code !== "ENOENT") {
            throw new SkipRetryError("Invalid error");
          }
          return {
            redirectTo: "https://not-bing.com"
          };
        }
      }
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
});
