// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BaseRequestPolicy, delay, HttpOperationResponse, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions, RestError, WebResourceLike } from "@azure/core-http";
import { AzureLogger } from "@azure/logger";

export const DEFAULT_CLIENT_RETRY_COUNT = 3;
export const DEFAULT_CLIENT_RETRY_INTERVAL_IN_MS = 1000 * 30;
export const DEFAULT_CLIENT_MAX_RETRY_INTERVAL_IN_MS = 1000 * 90;

// Based on core-http's exponentialRetryPolicy, but only for IMDS' 404.

export function imdsExponentialRetryPolicy(logger: AzureLogger): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ImdsExponentialRetryPolicy(
        nextPolicy,
        options,
        logger,
      );
    }
  };
}

/**
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 */
export class ImdsExponentialRetryPolicy extends BaseRequestPolicy {
  retryCount: number;
  retryInterval: number;
  maxRetryInterval: number;
  logger: AzureLogger;

  /**
   * @internal
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    logger: AzureLogger
  ) {
    super(nextPolicy, options);
    this.retryCount = DEFAULT_CLIENT_RETRY_COUNT;
    this.retryInterval = DEFAULT_CLIENT_RETRY_INTERVAL_IN_MS;
    this.maxRetryInterval = DEFAULT_CLIENT_MAX_RETRY_INTERVAL_IN_MS;
    this.logger = logger;
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request.clone())
      .then((response) => retry(this, request, response))
      .catch((error) => retry(this, request, error.response, undefined, error));
  }
}

/**
 * @internal
 */
export interface RetryError extends Error {
  message: string;
  code?: string;
  innerError?: RetryError;
}

/**
 * @internal
 */
export interface RetryData {
  retryCount: number;
  retryInterval: number;
  error?: RetryError;
}

/**
 * @internal
 */
export function updateRetryData(
  retryOptions: { retryInterval: number; minRetryInterval: number; maxRetryInterval: number },
  retryData: RetryData = { retryCount: 0, retryInterval: 0 },
  err?: RetryError
): RetryData {
  if (err) {
    if (retryData.error) {
      err.innerError = retryData.error;
    }

    retryData.error = err;
  }

  // Adjust retry count
  retryData.retryCount++;

  // Adjust retry interval
  let incrementDelta = Math.pow(2, retryData.retryCount - 1) - 1;
  const boundedRandDelta =
    retryOptions.retryInterval * 0.8 +
    Math.floor(Math.random() * (retryOptions.retryInterval * 0.4));
  incrementDelta *= boundedRandDelta;

  retryData.retryInterval = Math.min(
    retryOptions.minRetryInterval + incrementDelta,
    retryOptions.maxRetryInterval
  );

  return retryData;
}

/**
 * @internal
 */
export function shouldRetry(
  retryLimit: number,
  predicate: (response?: HttpOperationResponse, error?: RetryError) => boolean,
  retryData: RetryData,
  response?: HttpOperationResponse,
  error?: RetryError
): boolean {
  if (!predicate(response, error)) {
    return false;
  }

  return retryData.retryCount < retryLimit;
}

/**
 * @internal
 */
async function retry(
  policy: ImdsExponentialRetryPolicy,
  request: WebResourceLike,
  response?: HttpOperationResponse,
  retryData?: RetryData,
  requestError?: RetryError
): Promise<HttpOperationResponse> {
  function shouldPolicyRetry(responseParam?: HttpOperationResponse): boolean {
    const statusCode = responseParam?.status;
    if (
      statusCode === undefined ||
      (statusCode < 500 && statusCode !== 408) ||
      statusCode === 501 ||
      statusCode === 505
    ) {
      return false;
    }
    return true;
  }

  retryData = updateRetryData(
    {
      retryInterval: policy.retryInterval,
      minRetryInterval: 0,
      maxRetryInterval: policy.maxRetryInterval
    },
    retryData,
    requestError
  );

  const isAborted: boolean | undefined = request.abortSignal && request.abortSignal.aborted;
  if (!isAborted && shouldRetry(policy.retryCount, shouldPolicyRetry, retryData, response)) {
    this.logger.info(`Retrying request in ${retryData.retryInterval}`);
    try {
      await delay(retryData.retryInterval);
      const res = await policy._nextPolicy.sendRequest(request.clone());
      return retry(policy, request, res, retryData);
    } catch (err) {
      return retry(policy, request, response, retryData, err);
    }
  } else if (isAborted || requestError || !response) {
    // If the operation failed in the end, return all errors instead of just the last one
    const err =
      retryData.error ||
      new RestError(
        "Failed to send the request.",
        RestError.REQUEST_SEND_ERROR,
        response && response.status,
        response && response.request,
        response
      );
    throw err;
  } else {
    return response;
  }
}
