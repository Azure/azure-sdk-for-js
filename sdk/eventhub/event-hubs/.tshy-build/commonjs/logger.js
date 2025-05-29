"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logErrorStackTrace = logErrorStackTrace;
exports.createReceiverLogPrefix = createReceiverLogPrefix;
exports.createSenderLogPrefix = createSenderLogPrefix;
exports.createManagementLogPrefix = createManagementLogPrefix;
exports.createSimpleLogger = createSimpleLogger;
exports.logObj = logObj;
const logger_1 = require("@azure/logger");
const core_util_1 = require("@azure/core-util");
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
exports.logger = (0, logger_1.createClientLogger)("event-hubs");
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
function logErrorStackTrace(error) {
    if ((0, core_util_1.isObjectWithProperties)(error, ["stack"])) {
        exports.logger.verbose(error.stack);
    }
}
/**
 * @internal
 */
function createReceiverLogPrefix(consumerId, connectionId, partitionId) {
    return `[${connectionId}] Receiver P${partitionId}-${consumerId}`;
}
/**
 * @internal
 */
function createSenderLogPrefix(senderId, connectionId) {
    return `[${connectionId}] Sender ${senderId}`;
}
/**
 * @internal
 */
function createManagementLogPrefix(connectionId) {
    return `[${connectionId}] Management`;
}
function createLogFunction(azureLogger, prefix, level) {
    return (arg, ...args) => azureLogger[level](...(typeof arg === "string" ? [`${prefix}: ${arg}`] : [prefix, arg]), ...args);
}
/**
 * @internal
 */
function createSimpleLogger(azureLogger, prefix) {
    return {
        info: createLogFunction(azureLogger, prefix, "info"),
        error: createLogFunction(azureLogger, prefix, "error"),
        verbose: createLogFunction(azureLogger, prefix, "verbose"),
        warning: createLogFunction(azureLogger, prefix, "warning"),
    };
}
/** @internal */
function logObj(obj) {
    JSON.stringify(obj, undefined, 2);
}
//# sourceMappingURL=logger.js.map