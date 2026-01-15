// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createClientLogger } from "@azure/logger";
import { isObjectWithProperties } from "@azure/core-util";
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
export const logger = createClientLogger("event-hubs");
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export function logErrorStackTrace(error) {
    if (isObjectWithProperties(error, ["stack"])) {
        logger.verbose(error.stack);
    }
}
/**
 * @internal
 */
export function createReceiverLogPrefix(consumerId, connectionId, partitionId) {
    return `[${connectionId}] Receiver P${partitionId}-${consumerId}`;
}
/**
 * @internal
 */
export function createSenderLogPrefix(senderId, connectionId) {
    return `[${connectionId}] Sender ${senderId}`;
}
/**
 * @internal
 */
export function createManagementLogPrefix(connectionId) {
    return `[${connectionId}] Management`;
}
function createLogFunction(azureLogger, prefix, level) {
    return (arg, ...args) => azureLogger[level](...(typeof arg === "string" ? [`${prefix}: ${arg}`] : [prefix, arg]), ...args);
}
/**
 * @internal
 */
export function createSimpleLogger(azureLogger, prefix) {
    return {
        info: createLogFunction(azureLogger, prefix, "info"),
        error: createLogFunction(azureLogger, prefix, "error"),
        verbose: createLogFunction(azureLogger, prefix, "verbose"),
        warning: createLogFunction(azureLogger, prefix, "warning"),
    };
}
/** @internal */
export function logObj(obj) {
    JSON.stringify(obj, undefined, 2);
}
//# sourceMappingURL=logger.js.map