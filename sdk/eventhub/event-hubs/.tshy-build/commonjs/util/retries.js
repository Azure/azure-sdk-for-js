"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRetryAttemptTimeoutInMs = getRetryAttemptTimeoutInMs;
const core_amqp_1 = require("@azure/core-amqp");
/**
 * @internal
 */
function getRetryAttemptTimeoutInMs(retryOptions = {}) {
    const { timeoutInMs } = retryOptions;
    return typeof timeoutInMs !== "number" || !isFinite(timeoutInMs)
        ? core_amqp_1.Constants.defaultOperationTimeoutInMs
        : timeoutInMs;
}
//# sourceMappingURL=retries.js.map