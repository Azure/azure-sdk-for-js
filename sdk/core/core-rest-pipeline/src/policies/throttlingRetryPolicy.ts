// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "..";
import { PipelinePolicy } from "../pipeline";
import { defaultRetryPolicy, RetryStrategyState } from "./retryPolicy";

/**
 * The programmatic identifier of the throttlingRetryPolicy.
 */
export const throttlingRetryPolicyName = "throttlingRetryPolicy";

/**
 * A response is a retry response if it has a throttling status code (429 or 503),
 * as long as the Retry-After header has a valid value.
 */
export function isThrottlingRetryResponse(response?: PipelineResponse): boolean {
  return Boolean(
    response &&
      (response.status === 429 || response.status === 503) &&
      response.headers.get("Retry-After") &&
      parseRetryAfterHeader(response.headers.get("Retry-After")!)
  );
}

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
      if (!isThrottlingRetryResponse(response)) {
        return state;
      }
      state.retryAfterInMs = parseRetryAfterHeader(response!.headers.get("Retry-After")!);
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
