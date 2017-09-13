// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseFilter } from "./baseFilter";
import * as utils from "../util/utils";
import { HttpOperationResponse } from "../httpOperationResponse";

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
export class SystemErrorRetryPolicyFilter extends BaseFilter {

  retryCount: number;
  retryInterval: number;
  minRetryInterval: number;
  maxRetryInterval: number;
  DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
  DEFAULT_CLIENT_RETRY_COUNT = 3;
  DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
  DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;

  constructor(retryCount?: number, retryInterval?: number, minRetryInterval?: number, maxRetryInterval?: number) {
    super();
    this.retryCount = typeof retryCount === "number" ? retryCount : this.DEFAULT_CLIENT_RETRY_COUNT;
    this.retryInterval = typeof retryInterval === "number" ? retryInterval : this.DEFAULT_CLIENT_RETRY_INTERVAL;
    this.minRetryInterval = typeof minRetryInterval === "number" ? minRetryInterval : this.DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
    this.maxRetryInterval = typeof maxRetryInterval === "number" ? maxRetryInterval : this.DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
  }

  /**
   * Determines if the operation should be retried and how long to wait until the next retry.
   *
   * @param {number} statusCode The HTTP status code.
   * @param {RetryData} retryData  The retry data.
   * @return {boolean} True if the operation qualifies for a retry; false otherwise.
   */
  shouldRetry(retryData: RetryData): boolean {
    let currentCount;
    if (!retryData) {
      throw new Error("retryData for the SystemErrorRetryPolicyFilter cannot be null.");
    } else {
      currentCount = (retryData && retryData.retryCount);
    }
    return (currentCount < this.retryCount);
  }

  /**
   * Updates the retry data for the next attempt.
   *
   * @param {RetryData} retryData  The retry data.
   * @param {object} err        The operation"s error, if any.
   */
  updateRetryData(retryData?: RetryData, err?: RetryError): RetryData {
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
    const boundedRandDelta = this.retryInterval * 0.8 +
      Math.floor(Math.random() * (this.retryInterval * 1.2 - this.retryInterval * 0.8));
    incrementDelta *= boundedRandDelta;

    retryData.retryInterval = Math.min(this.minRetryInterval + incrementDelta, this.maxRetryInterval);

    return retryData;
  }

  async retry(operationResponse: HttpOperationResponse, retryData?: RetryData, err?: RetryError): Promise<HttpOperationResponse> {
    const self = this;
    retryData = self.updateRetryData(retryData, err);
    if (err && err.code && self.shouldRetry(retryData) &&
      (err.code === "ETIMEDOUT" || err.code === "ESOCKETTIMEDOUT" || err.code === "ECONNREFUSED" ||
        err.code === "ECONNRESET" || err.code === "ENOENT")) {
      // If previous operation ended with an error and the policy allows a retry, do that
      try {
        await utils.delay(retryData.retryInterval);
        const res: HttpOperationResponse = await utils.dispatchRequest(operationResponse.request);
        return self.retry(res, retryData, err);
      } catch (err) {
        return self.retry(operationResponse, retryData, err);
      }
    } else {
      if (!utils.objectIsNull(err)) {
        // If the operation failed in the end, return all errors instead of just the last one
        err = retryData.error;
        return Promise.reject(err);
      }
      return Promise.resolve(operationResponse);
    }
  }

  after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
    return this.retry(operationResponse); // See: https://github.com/Microsoft/TypeScript/issues/7426
  }
}
