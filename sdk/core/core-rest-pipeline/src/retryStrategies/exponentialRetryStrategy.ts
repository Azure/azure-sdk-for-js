// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "../interfaces";
import { getRandomIntegerInclusive } from "../util/helpers";
import { RetryStrategy, RetryStrategyState } from "./retryStrategy";
import { throttlingRetryStrategy } from "./throttlingRetryStrategy";

/**
 * Exponential retry strategy
 */
export function exponentialRetryStrategy(
  retryInterval: number,
  maxRetryInterval: number
): RetryStrategy {
  const isThrottlingRetryResponse = throttlingRetryStrategy().meetsConditions!;
  return {
    name: "exponentialRetryStrategy",
    meetsConditions(state): boolean {
      return Boolean(
        !isThrottlingRetryResponse(state) && isExponentialRetryResponse(state.response)
      );
    },
    updateRetryState(state: RetryStrategyState): RetryStrategyState {
      const retryAfterInMs = state.retryAfterInMs || retryInterval;
      // Exponentially increase the delay each time
      const exponentialDelay = retryAfterInMs * Math.pow(2, state.retryCount);
      // Don't let the delay exceed the maximum
      const clampedExponentialDelay = Math.min(maxRetryInterval, exponentialDelay);
      // Allow the final value to have some "jitter" (within 50% of the delay size) so
      // that retries across multiple clients don't occur simultaneously.
      const delayWithJitter =
        clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);

      state.retryAfterInMs = delayWithJitter;
      return state;
    }
  };
}

/**
 * A response is a retry response if it has status codes:
 * - 408, or
 * - Greater or equal than 500, except for 501 and 505.
 */
export function isExponentialRetryResponse(response?: PipelineResponse): boolean {
  return Boolean(
    response &&
      (response.status === 408 ||
        (response.status >= 500 && response.status !== 501 && response.status !== 505))
  );
}
