// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "../interfaces";
import { RestError } from "../restError";
import { getRandomIntegerInclusive } from "../util/helpers";
import { RetryStrategy, SkipRetryError } from "./retryStrategy";
import { isThrottlingRetryResponse } from "./throttlingRetryStrategy";

// intervals are in milliseconds
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * Exponential retry strategy
 */
export function exponentialRetryStrategy(
  options: {
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
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  let retryAfterInMs = retryInterval;

  return {
    name: "exponentialRetryStrategy",
    retry({ retryCount, response, responseError }) {
      if (isThrottlingRetryResponse(response)) {
        throw new SkipRetryError(
          "The response has a throttling status code (429 or 503), indicating it should be processed by a throttling retry strategy."
        );
      }

      if (!(isExponentialRetryResponse(response) || isSystemError(responseError))) {
        throw new SkipRetryError(
          "The response does not meet the requirements to require an exponential retry strategy."
        );
      }

      // Exponentially increase the delay each time
      const exponentialDelay = retryAfterInMs * Math.pow(2, retryCount);
      // Don't let the delay exceed the maximum
      const clampedExponentialDelay = Math.min(maxRetryInterval, exponentialDelay);
      // Allow the final value to have some "jitter" (within 50% of the delay size) so
      // that retries across multiple clients don't occur simultaneously.
      const delayWithJitter =
        clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);

      retryAfterInMs = delayWithJitter;
      return { retryAfterInMs };
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
