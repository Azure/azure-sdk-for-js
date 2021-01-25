// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, RetryOptions } from "@azure/core-amqp";

/**
 * @internal
 * @ignore
 */
export function getRetryAttemptTimeoutInMs(retryOptions: RetryOptions | undefined): number {
  const timeoutInMs =
    retryOptions == undefined ||
    typeof retryOptions.timeoutInMs !== "number" ||
    !isFinite(retryOptions.timeoutInMs) ||
    retryOptions.timeoutInMs < Constants.defaultOperationTimeoutInMs
      ? Constants.defaultOperationTimeoutInMs
      : retryOptions.timeoutInMs;
  return timeoutInMs;
}
