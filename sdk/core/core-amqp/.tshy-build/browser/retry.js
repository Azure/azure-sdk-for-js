// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable eqeqeq */
import { translate } from "./errors.js";
import { Constants } from "./util/constants.js";
import { checkNetworkConnection } from "./util/checkNetworkConnection.js";
import { delay } from "@azure/core-util";
import { logger } from "./log.js";
/**
 * Determines whether the object is a Delivery object.
 * @internal
 */
function isDelivery(obj) {
    let result = false;
    if (obj &&
        typeof obj.id === "number" &&
        typeof obj.settled === "boolean" &&
        typeof obj.remote_settled === "boolean" &&
        typeof obj.format === "number") {
        result = true;
    }
    return result;
}
/**
 * Describes the Retry Mode type
 */
export var RetryMode;
(function (RetryMode) {
    RetryMode[RetryMode["Exponential"] = 0] = "Exponential";
    RetryMode[RetryMode["Fixed"] = 1] = "Fixed";
})(RetryMode || (RetryMode = {}));
/**
 * Describes the retry operation type.
 */
export var RetryOperationType;
(function (RetryOperationType) {
    RetryOperationType["cbsAuth"] = "cbsAuth";
    RetryOperationType["connection"] = "connection";
    RetryOperationType["management"] = "management";
    RetryOperationType["receiverLink"] = "receiverLink";
    RetryOperationType["senderLink"] = "senderLink";
    RetryOperationType["sendMessage"] = "sendMessage";
    RetryOperationType["receiveMessage"] = "receiveMessage";
    RetryOperationType["session"] = "session";
    RetryOperationType["messageSettlement"] = "settlement";
})(RetryOperationType || (RetryOperationType = {}));
/**
 * Validates the retry config.
 * @internal
 */
function validateRetryConfig(config) {
    if (!config.operation) {
        throw new TypeError("Missing 'operation' in retry configuration");
    }
    if (!config.connectionId) {
        throw new TypeError("Missing 'connectionId' in retry configuration");
    }
    if (!config.operationType) {
        throw new TypeError("Missing 'operationType' in retry configuration");
    }
}
/**
 * Calculates delay between retries, in milliseconds.
 * @internal
 */
function calculateDelay(attemptCount, retryDelayInMs, maxRetryDelayInMs, mode) {
    if (mode === RetryMode.Exponential) {
        const boundedRandDelta = retryDelayInMs * 0.8 +
            Math.floor(Math.random() * (retryDelayInMs * 1.2 - retryDelayInMs * 0.8));
        const incrementDelta = boundedRandDelta * (Math.pow(2, attemptCount) - 1);
        return Math.min(incrementDelta, maxRetryDelayInMs);
    }
    return retryDelayInMs;
}
/**
 * Every operation is attempted at least once. Additional attempts are made if the previous attempt failed
 * with a retryable error. The number of additional attempts is governed by the `maxRetries` property provided
 * on the `RetryConfig` argument.
 *
 * If `mode` option is set to `Fixed`, then the retries are made on the
 * given operation for a specified number of times, with a fixed delay in between each retry each time.
 *
 * If `mode` option is set to `Exponential`, then the delay between retries is adjusted to increase
 * exponentially with each attempt using back-off factor of power 2.
 *
 * @param config - Parameters to configure retry operation
 *
 * @returns Promise<T>.
 */
export async function retry(config) {
    validateRetryConfig(config);
    const updatedConfig = Object.assign({}, config);
    if (!updatedConfig.retryOptions) {
        updatedConfig.retryOptions = {};
    }
    if (updatedConfig.retryOptions.maxRetries == undefined ||
        updatedConfig.retryOptions.maxRetries < 0) {
        updatedConfig.retryOptions.maxRetries = Constants.defaultMaxRetries;
    }
    if (updatedConfig.retryOptions.retryDelayInMs == undefined ||
        updatedConfig.retryOptions.retryDelayInMs < 0) {
        updatedConfig.retryOptions.retryDelayInMs = Constants.defaultDelayBetweenOperationRetriesInMs;
    }
    if (updatedConfig.retryOptions.maxRetryDelayInMs == undefined ||
        updatedConfig.retryOptions.maxRetryDelayInMs < 0) {
        updatedConfig.retryOptions.maxRetryDelayInMs = Constants.defaultMaxDelayForExponentialRetryInMs;
    }
    if (updatedConfig.retryOptions.mode == undefined) {
        updatedConfig.retryOptions.mode = RetryMode.Fixed;
    }
    const errors = [];
    let result;
    let success = false;
    const totalNumberOfAttempts = updatedConfig.retryOptions.maxRetries + 1;
    for (let i = 1; i <= totalNumberOfAttempts; i++) {
        logger.verbose("[%s] Attempt number for '%s': %d.", updatedConfig.connectionId, updatedConfig.operationType, i);
        try {
            result = await updatedConfig.operation();
            success = true;
            logger.verbose("[%s] Success for '%s', after attempt number: %d.", updatedConfig.connectionId, updatedConfig.operationType, i);
            if (result && !isDelivery(result)) {
                logger.verbose("[%s] Success result for '%s': %O", updatedConfig.connectionId, updatedConfig.operationType, result);
            }
            break;
        }
        catch (_err) {
            const err = translate(_err);
            if (!err.retryable &&
                err.name === "ServiceCommunicationError" &&
                updatedConfig.connectionHost) {
                const isConnected = await checkNetworkConnection(updatedConfig.connectionHost);
                if (!isConnected) {
                    err.name = "ConnectionLostError";
                    err.retryable = true;
                }
            }
            logger.verbose("[%s] Error occurred for '%s' in attempt number %d: %O", updatedConfig.connectionId, updatedConfig.operationType, i, err);
            errors.push(err);
            if (errors[(errors === null || errors === void 0 ? void 0 : errors.length) - 1].retryable && totalNumberOfAttempts > i) {
                const targetDelayInMs = calculateDelay(i, updatedConfig.retryOptions.retryDelayInMs, updatedConfig.retryOptions.maxRetryDelayInMs, updatedConfig.retryOptions.mode);
                logger.verbose("[%s] Sleeping for %d milliseconds for '%s'.", updatedConfig.connectionId, targetDelayInMs, updatedConfig.operationType);
                await delay(targetDelayInMs, {
                    abortSignal: updatedConfig.abortSignal,
                    abortErrorMsg: `The retry operation has been cancelled by the user.`,
                });
                continue;
            }
            else {
                break;
            }
        }
    }
    if (success) {
        return result;
    }
    else {
        if (errors.length === 1) {
            throw errors[0];
        }
        throw new AggregateError(errors);
    }
}
//# sourceMappingURL=retry.js.map