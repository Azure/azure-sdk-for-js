// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "../interfaces.js";
import type { RestError } from "../restError.js";
import { calculateRetryDelay } from "../util/delay.js";
import type { RetryStrategy } from "./retryStrategy.js";
import { isThrottlingRetryResponse } from "./throttlingRetryStrategy.js";

// intervals are in milliseconds
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * A retry strategy that retries with an exponentially increasing delay in these two cases:
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails (408, greater or equal than 500, except for 501 and 505).
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

    /**
     * If true it won't retry if it received a system error.
     */
    ignoreSystemErrors?: boolean;

    /**
     * If true it won't retry if it received a non-fatal HTTP status code.
     */
    ignoreHttpStatusCodes?: boolean;
  } = {},
): RetryStrategy {
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  return {
    name: "exponentialRetryStrategy",
    retry({ retryCount, response, responseError }) {
      const matchedSystemError = isSystemError(responseError);
      const ignoreSystemErrors = matchedSystemError && options.ignoreSystemErrors;

      const isExponential = isExponentialRetryResponse(response);
      const ignoreExponentialResponse = isExponential && options.ignoreHttpStatusCodes;
      const unknownResponse = response && (isThrottlingRetryResponse(response) || !isExponential);

      if (unknownResponse || ignoreExponentialResponse || ignoreSystemErrors) {
        return { skipStrategy: true };
      }

      if (responseError && !matchedSystemError && !isExponential) {
        return { errorToThrow: responseError };
      }

      return calculateRetryDelay(retryCount, {
        retryDelayInMs: retryInterval,
        maxRetryDelayInMs: maxRetryInterval,
      });
    },
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
    response.status !== undefined &&
    (response.status >= 500 || response.status === 408) &&
    response.status !== 501 &&
    response.status !== 505,
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
    err.code === "ENOENT" ||
    err.code === "ENOTFOUND"
  );
}
