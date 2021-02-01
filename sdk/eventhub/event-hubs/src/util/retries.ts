// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, RetryOptions } from "@azure/core-amqp";
import { isDefined } from "./typeGuards";

/**
 * @internal
 */
export function getRetryAttemptTimeoutInMs(retryOptions: RetryOptions | undefined): number {
  const timeoutInMs =
    !isDefined(retryOptions) ||
    typeof retryOptions.timeoutInMs !== "number" ||
    !isFinite(retryOptions.timeoutInMs) ||
    retryOptions.timeoutInMs < Constants.defaultOperationTimeoutInMs
      ? Constants.defaultOperationTimeoutInMs
      : retryOptions.timeoutInMs;
  return timeoutInMs;
}
