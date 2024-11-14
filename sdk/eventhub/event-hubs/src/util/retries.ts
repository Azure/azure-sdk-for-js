// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RetryOptions } from "@azure/core-amqp";
import { Constants } from "@azure/core-amqp";

/**
 * @internal
 */
export function getRetryAttemptTimeoutInMs(retryOptions: RetryOptions = {}): number {
  const { timeoutInMs } = retryOptions;
  return typeof timeoutInMs !== "number" || !isFinite(timeoutInMs)
    ? Constants.defaultOperationTimeoutInMs
    : timeoutInMs;
}
