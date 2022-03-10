// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineResponse,
  PipelineRetryOptions,
  RestError,
  RetryStrategy,
  retryPolicy,
} from "@azure/core-rest-pipeline";

/**
 * Extracts the retry response header, checking against several
 * header names.
 * @internal
 */
export function getDelayInMs(retryAfterMSHeaderValue: string | undefined): number | undefined {
  const delayValueString = retryAfterMSHeaderValue;

  if (delayValueString == null) {
    return;
  }

  const delayValueMs: number = Number(delayValueString);

  if (Number.isNaN(delayValueMs)) {
    return;
  }

  return delayValueMs;
}

/**
 * Name of the {@link defaultRetryPolicy}
 */
export const defaultRetryPolicyName = "defaultRetryPolicy";

/**
 * Options that control how to retry failed requests.
 */
export interface DefaultRetryPolicyOptions extends PipelineRetryOptions {}

const DEFAULT_RETRY_POLICY_COUNT = 10;
/**
 * A policy that retries according to three strategies:
 * - When the server sends a 429 response with a Retry-After header.
 * - When there are errors in the underlying transport layer (e.g. DNS lookup failures).
 * - Or otherwise if the outgoing request fails, it will retry with an exponentially increasing delay.
 */
export function defaultRetryPolicy(options: DefaultRetryPolicyOptions = {}): PipelinePolicy {
  return {
    name: defaultRetryPolicyName,
    sendRequest: retryPolicy([throttlingRetryStrategy(), exponentialRetryStrategy(options)], {
      maxRetries: options.maxRetries ?? DEFAULT_RETRY_POLICY_COUNT,
    }).sendRequest,
  };
}

/**
 * The headers that come back from Azure services representing
 * the amount of time (minimum) to wait to retry (in milliseconds).
 */
const RetryAfterMillisecondsHeaders: string[] = ["retry-after-ms", "x-ms-retry-after-ms"];

/**
 * A response is a retry response if it has a throttling status code (429 or 503),
 * as long as the Retry-After header has a valid value.
 */
function getThrottlingInfo(response?: PipelineResponse):
  | {
      isThrottlingRetryResponse: false;
    }
  | { isThrottlingRetryResponse: true; retryAfterInMs: number } {
  const retryAfterMSHeader =
    response?.headers.get(RetryAfterMillisecondsHeaders[0]) ??
    response?.headers.get(RetryAfterMillisecondsHeaders[1]);
  const retryAfterHeader = response?.headers.get("Retry-After");

  let returnValue:
    | {
        isThrottlingRetryResponse: false;
      }
    | { isThrottlingRetryResponse: true; retryAfterInMs: number } = {
    isThrottlingRetryResponse: false,
  };

  if (response && (response.status === 429 || response.status === 503)) {
    if (retryAfterHeader) {
      const parsedRetryAfterHeader = parseRetryAfterHeader(retryAfterHeader);
      if (parsedRetryAfterHeader) {
        returnValue = { isThrottlingRetryResponse: true, retryAfterInMs: parsedRetryAfterHeader };
      }
    } else if (retryAfterMSHeader) {
      const parsedRetryAfterHeader = getDelayInMs(retryAfterMSHeader);
      if (parsedRetryAfterHeader) {
        returnValue = { isThrottlingRetryResponse: true, retryAfterInMs: parsedRetryAfterHeader };
      }
    }
  }

  return returnValue;
}

export function throttlingRetryStrategy(): RetryStrategy {
  return {
    name: "throttlingRetryStrategy",
    retry({ response }) {
      const throttlingInfo = getThrottlingInfo(response);
      if (!throttlingInfo.isThrottlingRetryResponse) {
        return { skipStrategy: true };
      }
      return {
        retryAfterInMs: throttlingInfo.retryAfterInMs,
      };
    },
  };
}

/**
 * Returns the number of milliseconds to wait based on a Retry-After header value.
 * Returns undefined if there is no valid value.
 * @param headerValue - An HTTP Retry-After header value.
 */
function parseRetryAfterHeader(headerValue: string): number | undefined {
  try {
    const retryAfterInSeconds = Number(headerValue);
    if (!Number.isNaN(retryAfterInSeconds)) {
      return retryAfterInSeconds * 1000;
    } else {
      // It might be formatted as a date instead of a number of seconds

      const now: number = Date.now();
      const date: number = Date.parse(headerValue);
      const diff = date - now;

      return Number.isNaN(diff) ? undefined : diff;
    }
  } catch (e) {
    return undefined;
  }
}

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
  } = {}
): RetryStrategy {
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  let retryAfterInMs = retryInterval;

  return {
    name: "exponentialRetryStrategy",
    retry({ retryCount, response, responseError }) {
      const matchedSystemError = isSystemError(responseError);
      const ignoreSystemErrors = matchedSystemError && options.ignoreSystemErrors;

      const isExponential = isExponentialRetryResponse(response);
      const ignoreExponentialResponse = isExponential && options.ignoreHttpStatusCodes;
      const unknownResponse =
        response && (getThrottlingInfo(response).isThrottlingRetryResponse || !isExponential);

      if (unknownResponse || ignoreExponentialResponse || ignoreSystemErrors) {
        return { skipStrategy: true };
      }

      if (responseError && !matchedSystemError) {
        return { errorToThrow: responseError };
      }

      // Exponentially increase the delay each time
      const exponentialDelay = retryAfterInMs * Math.pow(2, retryCount);
      // Don't let the delay exceed the maximum
      const clampedExponentialDelay = Math.min(maxRetryInterval, exponentialDelay);
      // Allow the final value to have some "jitter" (within 50% of the delay size) so
      // that retries across multiple clients don't occur simultaneously.
      retryAfterInMs =
        clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);
      return { retryAfterInMs };
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
      response.status !== 505
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

/**
 * Returns a random integer value between a lower and upper bound,
 * inclusive of both bounds.
 * Note that this uses Math.random and isn't secure. If you need to use
 * this for any kind of security purpose, find a better source of random.
 * @param min - The smallest integer value allowed.
 * @param max - The largest integer value allowed.
 * @internal
 */
export function getRandomIntegerInclusive(min: number, max: number): number {
  // Make sure inputs are integers.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Pick a random offset from zero to the size of the range.
  // Since Math.random() can never return 1, we have to make the range one larger
  // in order to be inclusive of the maximum value after we take the floor.
  const offset = Math.floor(Math.random() * (max - min + 1));
  return offset + min;
}
