// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, describe, it, vi } from "vitest";
import { delay, calculateRetryDelay } from "../../src/index.js";

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
});

describe("calculateRetryDelay", function () {
  it("should return a delay based on exponential backoff", function () {
    const result = calculateRetryDelay(0, { retryDelayInMs: 100, maxRetryDelayInMs: 5000 });
    assert.isNumber(result.retryAfterInMs);
    // For attempt 0: exponentialDelay = 100 * 2^0 = 100, clampedDelay = 100
    // retryAfterInMs = 50 + random(0..50), so between 50 and 100
    assert.isTrue(result.retryAfterInMs >= 50);
    assert.isTrue(result.retryAfterInMs <= 100);
  });

  it("should clamp to maxRetryDelayInMs", function () {
    const result = calculateRetryDelay(20, { retryDelayInMs: 100, maxRetryDelayInMs: 500 });
    // exponentialDelay = 100 * 2^20 = very large, clampedDelay = 500
    // retryAfterInMs = 250 + random(0..250), so between 250 and 500
    assert.isTrue(result.retryAfterInMs >= 250);
    assert.isTrue(result.retryAfterInMs <= 500);
  });
});
