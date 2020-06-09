// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { RestError } from "../restError";
import { delay } from "../util/helpers";

const DEFAULT_CLIENT_RETRY_COUNT = 3;
// intervals are in ms
const DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;

/**
 * The programmatic identifier of the systemErrorRetryPolicy.
 */
export const systemErrorRetryPolicyName = "systemErrorRetryPolicy";

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
export interface SystemErrorRetryPolicyOptions {
  /**
   * The maximum number of retry attempts.  Defaults to 3.
   */
  maxRetries?: number;

  /**
   * The amount of delay in milliseconds between retry attempts. Defaults to 30000
   * (30 seconds). The delay increases exponentially with each retry up to a maximum
   * specified by maxRetryDelayInMs.
   */
  retryDelayInMs?: number;

  /**
   * The maximum delay in milliseconds allowed before retrying an operation. Defaults
   * to 90000 (90 seconds).
   */
  maxRetryDelayInMs?: number;
}

export function systemErrorRetryPolicy(
  options: SystemErrorRetryPolicyOptions = {}
): PipelinePolicy {
  const retryCount = options.maxRetries ?? DEFAULT_CLIENT_RETRY_COUNT;
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

  function shouldRetry(retryData: RetryData): boolean {
    const currentCount = retryData && retryData.retryCount;
    return currentCount < retryCount;
  }

  function updateRetryData(retryData: RetryData, err?: RetryError): RetryData {
    if (err) {
      if (retryData.error) {
        err.innerError = retryData.error;
      }

      retryData.error = err;
    }

    // Adjust retry count
    retryData.retryCount++;

    // Adjust retry interval
    let incrementDelta = Math.pow(2, retryData.retryCount) - 1;
    const boundedRandDelta =
      retryInterval * 0.8 + Math.floor(Math.random() * (retryInterval * 1.2 - retryInterval * 0.8));
    incrementDelta *= boundedRandDelta;

    retryData.retryInterval = Math.min(incrementDelta, maxRetryInterval);

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
    if (isSystemError(requestError) && shouldRetry(retryData)) {
      try {
        await delay(retryData.retryInterval);
        const res = await next(request.clone());
        return retry(next, retryData, request, res);
      } catch (e) {
        return retry(next, retryData, request, response, e);
      }
    } else if (requestError || !response) {
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
    name: systemErrorRetryPolicyName,
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

function isSystemError(err?: RestError): boolean {
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
