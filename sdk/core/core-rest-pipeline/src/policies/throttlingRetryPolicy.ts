// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { delay } from "../util/helpers";
import { retry, RetryState } from "./retry";

/**
 * The programmatic identifier of the throttlingRetryPolicy.
 */
export const throttlingRetryPolicyName = "throttlingRetryPolicy";

/**
 * Maximum number of retries for the throttling retry policy
 */
export const DEFAULT_CLIENT_MAX_RETRY_COUNT = 3;

/**
 * State relevant to the throttling retries.
 */
interface ThrottlingRetryState extends RetryState<PipelineResponse> {
  delayInMs?: number;
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
  return {
    name: throttlingRetryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      return retry<ThrottlingRetryState>({
        async shouldRetry(state): Promise<boolean> {
          const { retryCount, lastResponse } = state;
          const maxRetriesReached = retryCount >= DEFAULT_CLIENT_MAX_RETRY_COUNT;
          const throttlingRetryStatus =
            lastResponse && (lastResponse.status === 429 || lastResponse.status === 503);
          if (!lastResponse || maxRetriesReached || !throttlingRetryStatus) {
            return false;
          }
          const retryAfterHeader = lastResponse.headers.get("Retry-After");
          if (!retryAfterHeader) {
            return false;
          }
          const delayInMs = parseRetryAfterHeader(retryAfterHeader);
          if (!delayInMs) {
            return false;
          }

          return true;
        },
        async operation(): Promise<PipelineResponse> {
          return next(request);
        },
        async delay({ delayInMs }): Promise<void> {
          await delay(delayInMs!);
        }
      });
    }
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
