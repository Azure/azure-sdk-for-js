// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, RetryOptions } from "@azure/core-amqp";

/**
 * Invalid timeouts, non-positive timeouts are defaulted to the `Constants.defaultOperationTimeoutInMs`
 *
 * @export
 * @param {(RetryOptions | undefined)} retryOptions
 * @returns {number}
 */
export function getRetryAttemptTimeoutInMs(retryOptions: RetryOptions | undefined): number {
  const timeoutInMs =
    retryOptions == undefined ||
    typeof retryOptions.timeoutInMs !== "number" ||
    !isFinite(retryOptions.timeoutInMs) ||
    retryOptions.timeoutInMs <= 0
      ? Constants.defaultOperationTimeoutInMs
      : retryOptions.timeoutInMs;
  return timeoutInMs;
}
