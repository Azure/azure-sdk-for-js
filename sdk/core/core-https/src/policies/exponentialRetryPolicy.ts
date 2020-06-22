// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { logger } from "../log";
import { delay, getRandomIntegerInclusive } from "../util/helpers";
import { RestError } from "../restError";

/**
 * The programmatic identifier of the exponentialRetryPolicy.
 */
export const expontentialRetryPolicyName = "exponentialRetryPolicy";

const DEFAULT_CLIENT_RETRY_COUNT = 10;
// intervals are in ms
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

interface RetryData {
  retryCount: number;
  retryInterval: number;
  error?: RetryError;
}

interface RetryError extends Error {
  message: string;
  code?: string;
  innerError?: RetryError;
}

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
 * A policy that attempts to retry requests while introducing an exponentially increasing delay.
 * @param options Options that configure retry logic.
 */
export function exponentialRetryPolicy(
  options: ExponentialRetryPolicyOptions = {}
): PipelinePolicy {
  const retryCount = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  /**
   * Determines if the operation should be retried and how long to wait until the next retry.
   *
   * @param statusCode The HTTP status code.
   * @param retryData  The retry data.
   * @return True if the operation qualifies for a retry; false otherwise.
   */
  function shouldRetry(statusCode: number | undefined, retryData: RetryData): boolean {
    if (
      statusCode === undefined ||
      (statusCode < 500 && statusCode !== 408) ||
      statusCode === 501 ||
      statusCode === 505
    ) {
      return false;
    }

    const currentCount = retryData && retryData.retryCount;

    return currentCount < retryCount;
  }

  /**
   * Updates the retry data for the next attempt.
   *
   * @param retryData  The retry data.
   * @param err The operation's error, if any.
   */
  function updateRetryData(retryData: RetryData, err?: RetryError): RetryData {
    if (err) {
      if (retryData.error) {
        err.innerError = retryData.error;
      }

      retryData.error = err;
    }

    // Adjust retry count
    retryData.retryCount++;

    // Exponentially increase the delay each time
    const exponentialDelay = retryInterval * Math.pow(2, retryData.retryCount);
    // Don't let the delay exceed the maximum
    const clampedExponentialDelay = Math.min(maxRetryInterval, exponentialDelay);
    // Allow the final value to have some "jitter" (within 50% of the delay size) so
    // that retries across multiple clients don't occur simultaneously.
    const delayWithJitter =
      clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);

    retryData.retryInterval = delayWithJitter;

    return retryData;
  }

  async function retry(
    next: SendRequest,
    retryData: RetryData,
    request: PipelineRequest,
    response?: PipelineResponse,
    requestError?: RetryError
  ): Promise<PipelineResponse> {
    retryData = updateRetryData(retryData, requestError);
    const isAborted = request.abortSignal?.aborted;
    if (!isAborted && shouldRetry(response?.status, retryData)) {
      logger.info(`Retrying request in ${retryData.retryInterval}`);
      try {
        await delay(retryData.retryInterval);
        const res = await next(request.clone());
        return retry(next, retryData, request, res);
      } catch (e) {
        return retry(next, retryData, request, response, e);
      }
    } else if (isAborted || requestError || !response) {
      // If the operation failed in the end, return all errors instead of just the last one
      const err =
        retryData.error ||
        new RestError("Failed to send the request.", {
          code: RestError.REQUEST_SEND_ERROR,
          statusCode: response?.status,
          request: response?.request,
          response
        });
      throw err;
    } else {
      return response;
    }
  }

  return {
    name: expontentialRetryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const retryData = {
        retryCount: 0,
        retryInterval: 0
      };
      try {
        const response = await next(request);
        return retry(next, retryData, request, response);
      } catch (e) {
        const error: RestError = e;
        return retry(next, retryData, request, error.response, error);
      }
    }
  };
}
