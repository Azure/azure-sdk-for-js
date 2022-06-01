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
  DEFAULT_CLIENT_MIN_RETRY_INTERVAL,
  DEFAULT_CLIENT_RETRY_COUNT,
  DEFAULT_CLIENT_RETRY_INTERVAL,
  RetryData,
  RetryError,
  isNumber,
  shouldRetry,
  updateRetryData,
} from "../util/exponentialBackoffStrategy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { delay } from "../util/delay";

/**
 * A policy that retries when there's a system error, identified by the codes "ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ECONNRESET" or "ENOENT".
 * @param retryCount - Maximum number of retries.
 * @param retryInterval - The client retry interval, in milliseconds.
 * @param minRetryInterval - The minimum retry interval, in milliseconds.
 * @param maxRetryInterval - The maximum retry interval, in milliseconds.
 * @returns An instance of the {@link SystemErrorRetryPolicy}
 */
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
    },
  };
}

/**
 * A policy that retries when there's a system error, identified by the codes "ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ECONNRESET" or "ENOENT".
 * @param retryCount - The client retry count.
 * @param retryInterval - The client retry interval, in milliseconds.
 * @param minRetryInterval - The minimum retry interval, in milliseconds.
 * @param maxRetryInterval - The maximum retry interval, in milliseconds.
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
      await delay(retryData.retryInterval);
      return policy._nextPolicy.sendRequest(request.clone());
    } catch (nestedErr: any) {
      return retry(policy, request, operationResponse, nestedErr, retryData);
    }
  } else {
    if (err) {
      // If the operation failed in the end, return all errors instead of just the last one
      return Promise.reject(retryData.error);
    }
    return operationResponse;
  }
}
