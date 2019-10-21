// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import * as utils from "../util/utils";
import { WebResource } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { RestError } from "../restError";
import { logger } from "../log";

export interface RetryData {
  retryCount: number;
  retryInterval: number;
  error?: RetryError;
}

export interface RetryError extends Error {
  message: string;
  code?: string;
  innerError?: RetryError;
}

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
    }
  };
}

const DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
const DEFAULT_CLIENT_RETRY_COUNT = 3;
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;

/**
 * Describes the Retry Mode type. Currently supporting only Exponential.
 * @enum RetryMode
 */
export enum RetryMode {
  Exponential
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
  maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL
}

/**
 * @class
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
   * @constructor
   * @param {RequestPolicy} nextPolicy The next RequestPolicy in the pipeline chain.
   * @param {RequestPolicyOptions} options The options for this RequestPolicy.
   * @param {number} [retryCount]        The client retry count.
   * @param {number} [retryInterval]     The client retry interval, in milliseconds.
   * @param {number} [minRetryInterval]  The minimum retry interval, in milliseconds.
   * @param {number} [maxRetryInterval]  The maximum retry interval, in milliseconds.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    retryCount?: number,
    retryInterval?: number,
    maxRetryInterval?: number
  ) {
    super(nextPolicy, options);
    function isNumber(n: any): n is number {
      return typeof n === "number";
    }
    this.retryCount = isNumber(retryCount) ? retryCount : DEFAULT_CLIENT_RETRY_COUNT;
    this.retryInterval = isNumber(retryInterval) ? retryInterval : DEFAULT_CLIENT_RETRY_INTERVAL;
    this.maxRetryInterval = isNumber(maxRetryInterval)
      ? maxRetryInterval
      : DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request.clone())
      .then((response) => retry(this, request, response))
      .catch((error) => retry(this, request, error.response, undefined, error));
  }
}

/**
 * Determines if the operation should be retried and how long to wait until the next retry.
 *
 * @param {ExponentialRetryPolicy} policy The ExponentialRetryPolicy that this function is being called against.
 * @param {number} statusCode The HTTP status code.
 * @param {RetryData} retryData  The retry data.
 * @return {boolean} True if the operation qualifies for a retry; false otherwise.
 */
function shouldRetry(
  policy: ExponentialRetryPolicy,
  statusCode: number | undefined,
  retryData: RetryData
): boolean {
  if (
    statusCode == undefined ||
    (statusCode < 500 && statusCode !== 408) ||
    statusCode === 501 ||
    statusCode === 505
  ) {
    return false;
  }

  let currentCount: number;
  if (!retryData) {
    throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
  } else {
    currentCount = retryData && retryData.retryCount;
  }

  return currentCount < policy.retryCount;
}

/**
 * Updates the retry data for the next attempt.
 *
 * @param {ExponentialRetryPolicy} policy The ExponentialRetryPolicy that this function is being called against.
 * @param {RetryData} retryData  The retry data.
 * @param {RetryError} [err] The operation"s error, if any.
 */
function updateRetryData(
  policy: ExponentialRetryPolicy,
  retryData?: RetryData,
  err?: RetryError
): RetryData {
  if (!retryData) {
    retryData = {
      retryCount: 0,
      retryInterval: 0
    };
  }

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
    policy.retryInterval * 0.8 +
    Math.floor(Math.random() * (policy.retryInterval * 1.2 - policy.retryInterval * 0.8));
  incrementDelta *= boundedRandDelta;

  retryData.retryInterval = Math.min(
    incrementDelta,
    policy.maxRetryInterval
  );

  return retryData;
}

function retry(
  policy: ExponentialRetryPolicy,
  request: WebResource,
  response?: HttpOperationResponse,
  retryData?: RetryData,
  requestError?: RetryError
): Promise<HttpOperationResponse> {
  retryData = updateRetryData(policy, retryData, requestError);
  const isAborted: boolean | undefined = request.abortSignal && request.abortSignal.aborted;
  if (!isAborted && shouldRetry(policy, response && response.status, retryData)) {
    logger.info(`Retrying request in ${retryData.retryInterval}`);
    return utils
      .delay(retryData.retryInterval)
      .then(() => policy._nextPolicy.sendRequest(request.clone()))
      .then((res) => retry(policy, request, res, retryData, undefined))
      .catch((err) => retry(policy, request, response, retryData, err));
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
    return Promise.reject(err);
  } else {
    return Promise.resolve(response);
  }
}
