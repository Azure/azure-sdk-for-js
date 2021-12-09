// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "../interfaces";
import { RestError } from "../restError";
import { getRandomIntegerInclusive } from "../util/helpers";
import { RetryStrategy, RetryStrategyState } from "./retryStrategy";
import { throttlingRetryStrategy } from "./throttlingRetryStrategy";

const DEFAULT_CLIENT_RETRY_COUNT = 10;

// intervals are in milliseconds
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * Exponential retry strategy
 */
export function exponentialRetryStrategy(
  options: {
    /**
     * The maximum number of retry attempts.  Defaults to 10.
     */
    maxRetries?: number;

    /**
     * The amount of delay in milliseconds between retry attempts. Defaults to 1000
     * (1 second.) The delay increases exponentially with each retry up to a maximum
     * specified by maxRetryDelayInMs.
     */
    retryDelayInMs?: number;

    /**
     * The maximum delay in milliseconds allowed before retrying an operation. Defaults
     * to 64000 (64 seconds).
     */
    maxRetryDelayInMs?: number;
  } = {}
): RetryStrategy {
  const maxRetries = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  const isThrottlingRetryResponse = throttlingRetryStrategy().meetsConditions!;
  return {
    name: "exponentialRetryStrategy",
    meetsConditions(state): boolean {
      return Boolean(
        !isThrottlingRetryResponse(state) &&
          (isExponentialRetryResponse(state.response) || isSystemError(state.responseError))
      );
    },
    updateRetryState(state: RetryStrategyState): RetryStrategyState {
      state.maxRetries = maxRetries;
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

/**
 * Determines whether an error from a pipeline response was triggered in the network layer.
 */
export function isSystemError(err?: RestError): boolean {
  if (!err) {
    return false;
  }
  return (
    err.code === "ETIMEDOUT" ||
    err.code === "ESOCKETTIMEDOUT" ||
    err.code === "ECONNREFUSED" ||
    err.code === "ECONNRESET" ||
    err.code === "ENOENT"
  );
}
