// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { calculateRetryDelay } from "$internal/util/delay.js";

describe("calculateRetryDelay", function () {
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
