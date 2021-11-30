// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { delay } from "../util/helpers";

/**
 * The programmatic identifier of the throttlingRetryPolicy.
 */
export const throttlingRetryPolicyName = "throttlingRetryPolicy";

/**
 * Maximum number of retries for the throttling retry policy
 */
export const DEFAULT_CLIENT_MAX_RETRY_COUNT = 3;

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
      let response = await next(request);

      for (let count = 0; count < DEFAULT_CLIENT_MAX_RETRY_COUNT; count++) {
        if (response.status !== 429 && response.status !== 503) {
          return response;
        }
        const retryAfterHeader = response.headers.get("Retry-After");
        if (!retryAfterHeader) {
          break;
        }
        const delayInMs = parseRetryAfterHeader(retryAfterHeader);
        if (!delayInMs) {
          break;
        }
        await delay(delayInMs);
        response = await next(request);
      }
      return response;
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
