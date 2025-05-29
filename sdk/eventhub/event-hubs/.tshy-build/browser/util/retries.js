// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "@azure/core-amqp";
/**
 * @internal
 */
export function getRetryAttemptTimeoutInMs(retryOptions = {}) {
    const { timeoutInMs } = retryOptions;
    return typeof timeoutInMs !== "number" || !isFinite(timeoutInMs)
        ? Constants.defaultOperationTimeoutInMs
        : timeoutInMs;
}
//# sourceMappingURL=retries.js.map