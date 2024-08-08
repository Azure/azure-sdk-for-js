// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { afterEach, assert, describe, it, vi } from "vitest";
import { calculateRetryDelay, delay } from "../../src/index.js";

describe("delay", function () {
  afterEach(function () {
    vi.useRealTimers();
  });

  it("should resolve after the given number of ms", async function () {
    const clock = vi.useFakeTimers();
    const delayTime = 2500;
    const delayPromise = delay(delayTime);
    await clock.advanceTimersByTimeAsync(delayTime);
    assert.strictEqual(clock.getTimerCount(), 0);
    clock.useRealTimers();
    // should be resolved, so we can await it and it will resolve next tick
    await delayPromise;
  });

  it("should return when the abort signal is called", async function () {
    const delayTime = 2500;
    const controller = new AbortController();
    const StandardAbortMessage = "The operation was aborted.";
    const delayPromise = delay(delayTime, {
      abortSignal: controller.signal,
      abortErrorMsg: StandardAbortMessage,
    });
    try {
      controller.abort();
      await delayPromise;
      assert.fail();
    } catch (err: any) {
      assert.strictEqual(err.name, "AbortError");
      assert.strictEqual(err.message, StandardAbortMessage);
    }
  });

  describe("#calculateRetryDelay", function () {
    it("should calculate the correct delay for the first retry attempt", function () {
      const retryAttempt = 1;
      const config = {
        retryDelayInMs: 1000,
        maxRetryDelayInMs: 10000,
      };
      const result = calculateRetryDelay(retryAttempt, config);
      assert.isAtLeast(result.retryAfterInMs, config.retryDelayInMs);
      assert.isAtMost(result.retryAfterInMs, config.retryDelayInMs * 2);
    });

    it("should calculate the correct delay for multiple retry attempts", function () {
      const retryAttempt = 3;
      const config = {
        retryDelayInMs: 1000,
        maxRetryDelayInMs: 10000,
      };
      const result = calculateRetryDelay(retryAttempt, config);
      const expectedMin = config.retryDelayInMs * Math.pow(2, retryAttempt - 1);
      const expectedMax = config.retryDelayInMs * Math.pow(2, retryAttempt);
      assert.isAtLeast(result.retryAfterInMs, expectedMin);
      assert.isAtMost(result.retryAfterInMs, Math.min(expectedMax, config.maxRetryDelayInMs));
    });

    it("should not exceed the maximum retry delay", function () {
      const retryAttempt = 10;
      const config = {
        retryDelayInMs: 1000,
        maxRetryDelayInMs: 5000,
      };
      const result = calculateRetryDelay(retryAttempt, config);
      assert.isAtMost(result.retryAfterInMs, config.maxRetryDelayInMs);
    });

    it("should handle a retry delay of zero", function () {
      const retryAttempt = 1;
      const config = {
        retryDelayInMs: 0,
        maxRetryDelayInMs: 10000,
      };
      const result = calculateRetryDelay(retryAttempt, config);
      assert.strictEqual(result.retryAfterInMs, 0);
    });
  });
});
