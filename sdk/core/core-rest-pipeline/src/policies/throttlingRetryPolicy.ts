// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "../pipeline";
import { defaultRetryPolicy, RetryStrategyState } from "./retryPolicy";

/**
 * The programmatic identifier of the throttlingRetryPolicy.
 */
export const throttlingRetryPolicyName = "throttlingRetryPolicy";

/**
 * A policy that retries when the server sends a 429 response with a Retry-After header.
 *
 * To learn more, please refer to
 * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits,
 * https://docs.microsoft.com/en-us/azure/azure-subscription-service-limits and
 * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/troubleshooting-throttling-errors
 */
export function throttlingRetryPolicy(): PipelinePolicy {
  return defaultRetryPolicy({
    name: throttlingRetryPolicyName,
    updateRetryState(state: RetryStrategyState): RetryStrategyState {
      const { response } = state;
      const throttlingRetryStatus =
        response && (response.status === 429 || response.status === 503);

      // If we didn't receive a response,
      // or if we did not receive a throttling status code,
      // we won't retry but we won't throw a special error.
      if (!response || !throttlingRetryStatus) {
        return state;
      }

      const retryAfterHeader = response.headers.get("Retry-After");

      // If the Retry-After header is missing,
      // we won't retry but we won't throw a special error.
      if (!retryAfterHeader) {
        return state;
      }

      const delayInMs = parseRetryAfterHeader(retryAfterHeader);

      // If we couldn't parse the Retry-After header,
      // we won't retry but we won't throw a special error.
      if (!delayInMs) {
        return state;
      }

      // If we were able to parse the Retry-After header, we will retry after that time has passed.
      state.retryAfterInMs = delayInMs;
      return state;
    }
  });
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
