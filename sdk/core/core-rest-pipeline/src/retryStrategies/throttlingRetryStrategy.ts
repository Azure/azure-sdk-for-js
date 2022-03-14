// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "..";
import { RetryStrategy } from "./retryStrategy";

/**
 * The headers that come back from Azure services representing
 * the amount of time (minimum) to wait to retry (in milliseconds).
 */
const RetryAfterMillisecondsHeaders: string[] = ["retry-after-ms", "x-ms-retry-after-ms"];

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

/**
 * Returns the number of milliseconds to wait based on "retry-after-ms" or "x-ms-retry-after-ms" header value.
 * Returns undefined if there is no valid value.
 * @internal
 */
function parseRetryAfterMSHeader(retryAfterMSHeaderValue: string | undefined): number | undefined {
  if (!retryAfterMSHeaderValue) return;

  const delayValueMs: number = Number(retryAfterMSHeaderValue);

  if (Number.isNaN(delayValueMs)) return;

  return delayValueMs;
}

/**
 * Type denoting whether a reponse is throttling retry response along with the `retryAfterInMs` value if it is indeed a throttling retry response.
 * @internal
 */
type ThrottlingInfoInternal =
  | {
      isThrottlingRetryResponse: false;
    }
  | { isThrottlingRetryResponse: true; retryAfterInMs: number };

/**
 * A response is a throttling retry response if it has a throttling status code (429 or 503),
 * as long as one of the [ "Retry-After" or "retry-after-ms" or "x-ms-retry-after-ms" ] headers has a valid value.
 *
 * Returns an object denoting whether a reponse is throttling retry response along with the `retryAfterInMs` value if it is indeed a throttling retry response.
 *
 * @internal
 */
function getThrottlingInfo(response?: PipelineResponse): ThrottlingInfoInternal {
  const defaultInfo: ThrottlingInfoInternal = {
    isThrottlingRetryResponse: false,
  };

  if (!(response && [429, 503].includes(response.status))) return defaultInfo;

  const retryAfterHeader = response.headers.get("Retry-After"); // in seconds

  if (retryAfterHeader) {
    const parsedRetryAfterHeader = parseRetryAfterHeader(retryAfterHeader);
    if (parsedRetryAfterHeader) {
      return { isThrottlingRetryResponse: true, retryAfterInMs: parsedRetryAfterHeader };
    }
  }

  const retryAfterMSHeader =
    response.headers.get(RetryAfterMillisecondsHeaders[0]) ?? // in milliseconds
    response.headers.get(RetryAfterMillisecondsHeaders[1]); // in milliseconds

  if (retryAfterMSHeader) {
    const parsedRetryAfterHeader = parseRetryAfterMSHeader(retryAfterMSHeader);
    if (parsedRetryAfterHeader) {
      return { isThrottlingRetryResponse: true, retryAfterInMs: parsedRetryAfterHeader };
    }
  }

  return defaultInfo;
}

/**
 * A response is a retry response if it has a throttling status code (429 or 503),
 * as long as the Retry-After header has a valid value.
 */
export function isThrottlingRetryResponse(response?: PipelineResponse): boolean {
  return getThrottlingInfo(response).isThrottlingRetryResponse;
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
