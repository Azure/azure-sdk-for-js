// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "../coreHttp";

export const DEFAULT_CLIENT_RETRY_COUNT = 3;
// intervals are in ms
export const DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
export const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
export const DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;

export function isNumber(n: any): n is number {
  return typeof n === "number";
}
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
 * @internal
 * Determines if the operation should be retried.
 *
 * @param {number} retryLimit Specifies the max number of retries.
 * @param {(response?: HttpOperationResponse, error?: RetryError) => boolean} predicate Initial chekck on whether to retry based on given responses or errors
 * @param {RetryData} retryData  The retry data.
 * @return {boolean} True if the operation qualifies for a retry; false otherwise.
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
 * Updates the retry data for the next attempt.
 *
 * @param {RetryPolicyOptions} retryOptions specifies retry interval, and its lower bound and upper bound.
 * @param {RetryData} [retryData]  The retry data.
 * @param {RetryError} [err] The operation"s error, if any.
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
