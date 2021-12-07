// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { getRandomIntegerInclusive } from "../util/helpers";
import { RestError } from "../restError";
import { defaultRetryPolicy, RetryStrategyState } from "./retryPolicy";

/**
 * The programmatic identifier of the exponentialRetryPolicy.
 */
export const exponentialRetryPolicyName = "exponentialRetryPolicy";

const DEFAULT_CLIENT_RETRY_COUNT = 10;
// intervals are in ms
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * Options that control how to retry failed requests.
 */
export interface ExponentialRetryPolicyOptions {
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
}

/**
 * A policy that attempts to retry requests while introducing an exponentially increasing delay.
 * @param options - Options that configure retry logic.
 */
export function exponentialRetryPolicy(
  options: ExponentialRetryPolicyOptions = {}
): PipelinePolicy {
  return defaultRetryPolicy({
    name: exponentialRetryPolicyName,
    updateRetryState(state: RetryStrategyState): RetryStrategyState {
      const maxRetries = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
      const inputRetryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
      const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

      const { response, responseError, retryCount } = state;

      if (!response || responseError) {
        state.throwError = new RestError("Failed to send the request.", {
          code: RestError.REQUEST_SEND_ERROR,
          statusCode: response?.status,
          request: response?.request,
          response: response
        });
        return state;
      }

      const statusCode = response?.status;
      const retryAfterHeader = response?.headers.get("Retry-After");
      if (statusCode === 503 && retryAfterHeader) {
        // We won't retry but we won't throw a special error.
        return state;
      }
      if (
        statusCode === undefined ||
        (statusCode < 500 && statusCode !== 408) ||
        statusCode === 501 ||
        statusCode === 505
      ) {
        // We won't retry but we won't throw a special error.
        return state;
      }
      if (response.request.abortSignal?.aborted) {
        // We won't retry but we won't throw a special error.
        return state;
      }

      if (maxRetries < retryCount) {
        // We won't retry but we won't throw a special error.
        state.throwError = new RestError(`Exceeded number of retries: ${maxRetries}`, {
          request: response?.request,
          response,
          statusCode: response?.status
        });
        return state;
      }

      const retryAfterInMs = state.retryAfterInMs || inputRetryInterval;
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
  });
}
