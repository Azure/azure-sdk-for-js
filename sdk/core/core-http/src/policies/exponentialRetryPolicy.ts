// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import {
  DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
  DEFAULT_CLIENT_RETRY_COUNT,
  DEFAULT_CLIENT_RETRY_INTERVAL,
  RetryData,
  RetryError,
  isNumber,
  shouldRetry,
  updateRetryData,
} from "../util/exponentialBackoffStrategy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { RestError } from "../restError";
import { WebResourceLike } from "../webResource";
import { delay } from "../util/delay";
import { logger } from "../log";

/**
 * Policy that retries the request as many times as configured for as long as the max retry time interval specified, each retry waiting longer to begin than the last time.
 * @param retryCount - Maximum number of retries.
 * @param retryInterval - Base time between retries.
 * @param maxRetryInterval - Maximum time to wait between retries.
 */
export function exponentialRetryPolicy(
  retryCount?: number,
  retryInterval?: number,
  maxRetryInterval?: number
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ExponentialRetryPolicy(
        nextPolicy,
        options,
        retryCount,
        retryInterval,
        maxRetryInterval
      );
    },
  };
}

/**
 * Describes the Retry Mode type. Currently supporting only Exponential.
 */
export enum RetryMode {
  /**
   * Currently supported retry mode.
   * Each time a retry happens, it will take exponentially more time than the last time.
   */
  Exponential,
}

/**
 * Options that control how to retry failed requests.
 */
export interface RetryOptions {
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

  /**
   * Currently supporting only Exponential mode.
   */
  mode?: RetryMode;
}

export const DefaultRetryOptions: RetryOptions = {
  maxRetries: DEFAULT_CLIENT_RETRY_COUNT,
  retryDelayInMs: DEFAULT_CLIENT_RETRY_INTERVAL,
  maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
};

/**
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 */
export class ExponentialRetryPolicy extends BaseRequestPolicy {
  /**
   * The client retry count.
   */
  retryCount: number;
  /**
   * The client retry interval in milliseconds.
   */
  retryInterval: number;
  /**
   * The maximum retry interval in milliseconds.
   */
  maxRetryInterval: number;

  /**
   * @param nextPolicy - The next RequestPolicy in the pipeline chain.
   * @param options - The options for this RequestPolicy.
   * @param retryCount - The client retry count.
   * @param retryInterval - The client retry interval, in milliseconds.
   * @param minRetryInterval - The minimum retry interval, in milliseconds.
   * @param maxRetryInterval - The maximum retry interval, in milliseconds.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    retryCount?: number,
    retryInterval?: number,
    maxRetryInterval?: number
  ) {
    super(nextPolicy, options);
    this.retryCount = isNumber(retryCount) ? retryCount : DEFAULT_CLIENT_RETRY_COUNT;
    this.retryInterval = isNumber(retryInterval) ? retryInterval : DEFAULT_CLIENT_RETRY_INTERVAL;
    this.maxRetryInterval = isNumber(maxRetryInterval)
      ? maxRetryInterval
      : DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request.clone())
      .then((response) => retry(this, request, response))
      .catch((error) => retry(this, request, error.response, undefined, error));
  }
}

async function retry(
  policy: ExponentialRetryPolicy,
  request: WebResourceLike,
  response?: HttpOperationResponse,
  retryData?: RetryData,
  requestError?: RetryError
): Promise<HttpOperationResponse> {
  function shouldPolicyRetry(responseParam?: HttpOperationResponse): boolean {
    const statusCode = responseParam?.status;
    if (statusCode === 503 && response?.headers.get(Constants.HeaderConstants.RETRY_AFTER)) {
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
    return true;
  }

  retryData = updateRetryData(
    {
      retryInterval: policy.retryInterval,
      minRetryInterval: 0,
      maxRetryInterval: policy.maxRetryInterval,
    },
    retryData,
    requestError
  );

  const isAborted: boolean | undefined = request.abortSignal && request.abortSignal.aborted;
  if (!isAborted && shouldRetry(policy.retryCount, shouldPolicyRetry, retryData, response)) {
    logger.info(`Retrying request in ${retryData.retryInterval}`);
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
