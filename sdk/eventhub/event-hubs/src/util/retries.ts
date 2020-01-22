// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
