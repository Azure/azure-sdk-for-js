// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RestError,
  type SendRequest,
  createPipelineRequest,
  defaultRetryPolicy,
} from "../src/index.js";
import { describe, it, assert, expect, vi, afterEach } from "vitest";
import { DEFAULT_RETRY_POLICY_COUNT } from "../src/constants.js";

describe("defaultRetryPolicy", function () {
  afterEach(function () {
    vi.useRealTimers();
  });

  it("It should throw immediately if the response or error doesn't match anything we were expecting", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { code: "UNEXPECTED" });

    const policy = defaultRetryPolicy();
    const next = vi.fn<SendRequest>();
    next.mockRejectedValue(testError);

    vi.useFakeTimers();

    let catchCalled = false;
    const promise = policy.sendRequest(request, next);
    promise.catch((e) => {
      catchCalled = true;
      assert.strictEqual(e, testError);
    });
    await vi.runAllTimersAsync();
    // should be one more than the default retry count
    expect(next).toHaveBeenCalledOnce();
    assert.isTrue(catchCalled);
  });

  ["ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ENOENT", "ENOTFOUND"].forEach((errorCode) => {
    it(`It should give up after the default maxRetries is reached for ${errorCode} error`, async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
      });
      const policy = defaultRetryPolicy();
      vi.useFakeTimers();

      const testError = new RestError("Test Error!", { code: errorCode });

      const next = vi.fn<SendRequest>();
      next.mockRejectedValue(testError);

      let catchCalled = false;
      const promise = policy.sendRequest(request, next);
      promise.catch((e) => {
        catchCalled = true;
        assert.strictEqual(e, testError);
      });
      await vi.runAllTimersAsync();
      expect(next).toHaveBeenCalledTimes(DEFAULT_RETRY_POLICY_COUNT + 1);
      assert.isTrue(catchCalled);
    });
  });

  it("It should not retry on RestError with status 416", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const testError = new RestError("Test Error!", { statusCode: 416 });

    const policy = defaultRetryPolicy();
    const next = vi.fn<SendRequest>();
    next.mockRejectedValue(testError);

    await expect(policy.sendRequest(request, next)).rejects.toThrow(/Test Error/);
    expect(next).toHaveBeenCalledOnce();
  });
});
