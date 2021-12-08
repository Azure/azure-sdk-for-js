// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RetryStrategy, RetryStrategyState } from "./retryStrategy";

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

export function isThrottlingRetryResponse({ response }: RetryStrategyState): boolean {
  return Boolean(
    response &&
      (response.status === 429 || response.status === 503) &&
      response.headers.get("Retry-After") &&
      parseRetryAfterHeader(response.headers.get("Retry-After")!)
  );
}

export function throttlingRetryStrategy(): RetryStrategy {
  return {
    name: "throttlingRetryStrategy",
    /**
     * A response is a retry response if it has a throttling status code (429 or 503),
     * as long as the Retry-After header has a valid value.
     */
    meetsConditions: isThrottlingRetryResponse,
    updateRetryState(state) {
      const { response } = state;
      state.retryAfterInMs = parseRetryAfterHeader(response!.headers.get("Retry-After")!);
      return state;
    }
  };
}
