// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "../httpOperationResponse";
import * as utils from "../util/utils";
import { WebResourceLike } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import {
  RetryData,
  RetryError,
  shouldRetry,
  updateRetryData,
  DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
  DEFAULT_CLIENT_RETRY_COUNT,
  DEFAULT_CLIENT_RETRY_INTERVAL,
  DEFAULT_CLIENT_MIN_RETRY_INTERVAL,
  isNumber
} from "../util/exponentialBackoffStrategy";

export function systemErrorRetryPolicy(
  retryCount?: number,
  retryInterval?: number,
  minRetryInterval?: number,
  maxRetryInterval?: number
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new SystemErrorRetryPolicy(
        nextPolicy,
        options,
        retryCount,
        retryInterval,
        minRetryInterval,
        maxRetryInterval
      );
    }
  };
}

/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 *
 * @constructor
 * @param {number} retryCount        The client retry count.
 * @param {number} retryInterval     The client retry interval, in milliseconds.
 * @param {number} minRetryInterval  The minimum retry interval, in milliseconds.
 * @param {number} maxRetryInterval  The maximum retry interval, in milliseconds.
 */
export class SystemErrorRetryPolicy extends BaseRequestPolicy {
  retryCount: number;
  retryInterval: number;
  minRetryInterval: number;
  maxRetryInterval: number;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    retryCount?: number,
    retryInterval?: number,
    minRetryInterval?: number,
    maxRetryInterval?: number
  ) {
    super(nextPolicy, options);
    this.retryCount = isNumber(retryCount) ? retryCount : DEFAULT_CLIENT_RETRY_COUNT;
    this.retryInterval = isNumber(retryInterval) ? retryInterval : DEFAULT_CLIENT_RETRY_INTERVAL;
    this.minRetryInterval = isNumber(minRetryInterval)
      ? minRetryInterval
      : DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
    this.maxRetryInterval = isNumber(maxRetryInterval)
      ? maxRetryInterval
      : DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request.clone())
      .catch((error) => retry(this, request, error.response, error));
  }
}

async function retry(
  policy: SystemErrorRetryPolicy,
  request: WebResourceLike,
  operationResponse: HttpOperationResponse,
  err?: RetryError,
  retryData?: RetryData
): Promise<HttpOperationResponse> {
  retryData = updateRetryData(policy, retryData, err);

  function shouldPolicyRetry(_response?: HttpOperationResponse, error?: RetryError): boolean {
    if (
      error &&
      error.code &&
      (error.code === "ETIMEDOUT" ||
        error.code === "ESOCKETTIMEDOUT" ||
        error.code === "ECONNREFUSED" ||
        error.code === "ECONNRESET" ||
        error.code === "ENOENT")
    ) {
      return true;
    }
    return false;
  }

  if (shouldRetry(policy.retryCount, shouldPolicyRetry, retryData, operationResponse, err)) {
    // If previous operation ended with an error and the policy allows a retry, do that
    try {
      await utils.delay(retryData.retryInterval);
      return policy._nextPolicy.sendRequest(request.clone());
    } catch (err) {
      return retry(policy, request, operationResponse, err, retryData);
    }
  } else {
    if (err) {
      // If the operation failed in the end, return all errors instead of just the last one
      return Promise.reject(retryData.error);
    }
    return operationResponse;
  }
}
