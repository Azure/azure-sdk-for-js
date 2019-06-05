// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import * as utils from "../util/utils";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";

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

export function systemErrorRetryPolicy(retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new SystemErrorRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval);
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
  DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
  DEFAULT_CLIENT_RETRY_COUNT = 3;
  DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
  DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number) {
    super(nextPolicy, options);
    this.retryCount = typeof retryCount === "number" ? retryCount : this.DEFAULT_CLIENT_RETRY_COUNT;
    this.retryInterval = typeof retryInterval === "number" ? retryInterval : this.DEFAULT_CLIENT_RETRY_INTERVAL;
    this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
    this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request.clone()).then(response => retry(this, request, response));
  }
}

/**
 * Determines if the operation should be retried and how long to wait until the next retry.
 *
 * @param {number} statusCode The HTTP status code.
 * @param {RetryData} retryData  The retry data.
 * @return {boolean} True if the operation qualifies for a retry; false otherwise.
 */
function shouldRetry(policy: SystemErrorRetryPolicy, retryData: RetryData): boolean {
  let currentCount;
  if (!retryData) {
    throw new Error("retryData for the SystemErrorRetryPolicyFilter cannot be null.");
  } else {
    currentCount = (retryData && retryData.retryCount);
  }
  return (currentCount < policy.retryCount);
}

/**
 * Updates the retry data for the next attempt.
 *
 * @param {RetryData} retryData  The retry data.
 * @param {object} err        The operation"s error, if any.
 */
function updateRetryData(policy: SystemErrorRetryPolicy, retryData?: RetryData, err?: RetryError): RetryData {
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
  const boundedRandDelta = policy.retryInterval * 0.8 +
    Math.floor(Math.random() * (policy.retryInterval * 1.2 - policy.retryInterval * 0.8));
  incrementDelta *= boundedRandDelta;

  retryData.retryInterval = Math.min(policy.minRetryInterval + incrementDelta, policy.maxRetryInterval);

  return retryData;
}

function retry(policy: SystemErrorRetryPolicy, request: WebResource, operationResponse: HttpOperationResponse, retryData?: RetryData, err?: RetryError): Promise<HttpOperationResponse> {
  retryData = updateRetryData(policy, retryData, err);
  if (err && err.code && shouldRetry(policy, retryData) &&
    (err.code === "ETIMEDOUT" || err.code === "ESOCKETTIMEDOUT" || err.code === "ECONNREFUSED" ||
      err.code === "ECONNRESET" || err.code === "ENOENT")) {
    // If previous operation ended with an error and the policy allows a retry, do that
    return utils.delay(retryData.retryInterval)
        .then(() => policy._nextPolicy.sendRequest(request.clone()))
        .then(res => retry(policy, request, res, retryData, err))
        .catch(err => retry(policy, request, operationResponse, retryData, err));
  } else {
    if (err != undefined) {
      // If the operation failed in the end, return all errors instead of just the last one
      err = retryData.error;
      return Promise.reject(err);
    }
    return Promise.resolve(operationResponse);
  }
}