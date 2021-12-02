// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { logger } from "../log";
import { delay, getRandomIntegerInclusive } from "../util/helpers";
import { RestError } from "../restError";
import { retry, RetryState } from "./retry";

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
 * State relevant to the exponential retries.
 */
interface ExponentialRetryState extends RetryState<PipelineResponse> {
  retryInterval?: number;
}

/**
 * A policy that attempts to retry requests while introducing an exponentially increasing delay.
 * @param options - Options that configure retry logic.
 */
export function exponentialRetryPolicy(
  options: ExponentialRetryPolicyOptions = {}
): PipelinePolicy {
  return {
    name: exponentialRetryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const maxRetries = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
      const inputRetryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
      const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

      return retry<ExponentialRetryState>({
        async shouldRetry(state): Promise<boolean> {
          const { retryCount, lastResponse } = state;
          const statusCode = lastResponse?.status;
          const retryAfterHeader = lastResponse?.headers.get("Retry-After");
          if (statusCode === 503 && retryAfterHeader) {
            return false;
          }
          if (
            statusCode === undefined ||
            (statusCode < 500 && statusCode !== 408) ||
            statusCode === 501 ||
            statusCode === 505
          ) {
            return false;
          }
          if (request.abortSignal?.aborted) {
            return false;
          }
          return maxRetries < retryCount;
        },

        async operation({ lastResponse }): Promise<PipelineResponse> {
          try {
            return next(request);
          } catch (e) {
            // If the operation failed in the end, return all errors instead of just the last one
            const err = new RestError("Failed to send the request.", {
              code: RestError.REQUEST_SEND_ERROR,
              statusCode: lastResponse?.status,
              request: lastResponse?.request,
              response: lastResponse
            });
            throw err;
          }
        },

        async delay(state): Promise<void> {
          const retryInterval = state.retryInterval || inputRetryInterval;
          // Exponentially increase the delay each time
          const exponentialDelay = retryInterval * Math.pow(2, state.retryCount);
          // Don't let the delay exceed the maximum
          const clampedExponentialDelay = Math.min(maxRetryInterval, exponentialDelay);
          // Allow the final value to have some "jitter" (within 50% of the delay size) so
          // that retries across multiple clients don't occur simultaneously.
          const delayWithJitter =
            clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);

          state.retryInterval = delayWithJitter;
          logger.info(`Retrying request in ${state.retryInterval}`);
          await delay(state.retryInterval);
        }
      });
    }
  };
}
