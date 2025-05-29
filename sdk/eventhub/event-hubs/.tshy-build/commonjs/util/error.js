"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.idempotentSomeAlreadyPublished = exports.idempotentAlreadyPublished = void 0;
exports.throwErrorIfConnectionClosed = throwErrorIfConnectionClosed;
exports.throwTypeErrorIfParameterMissing = throwTypeErrorIfParameterMissing;
exports.translateError = translateError;
exports.validateProducerPartitionSettings = validateProducerPartitionSettings;
const logger_js_1 = require("../logger.js");
const core_util_1 = require("@azure/core-util");
const rhea_promise_1 = require("rhea-promise");
const core_amqp_1 = require("@azure/core-amqp");
/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context - The ConnectionContext associated with the current AMQP connection.
 */
function throwErrorIfConnectionClosed(context) {
    if (context && context.wasConnectionCloseCalled) {
        const errorMessage = "The underlying AMQP connection is closed.";
        const error = new Error(errorMessage);
        logger_js_1.logger.warning(`[${context.connectionId}] ${error.name}: ${error.message}`);
        (0, logger_js_1.logErrorStackTrace)(error);
        throw error;
    }
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param methodName - Name of the method that was passed the parameter
 * @param parameterName - Name of the parameter to check
 * @param parameterValue - Value of the parameter to check
 */
function throwTypeErrorIfParameterMissing(connectionId, methodName, parameterName, parameterValue) {
    if (!(0, core_util_1.isDefined)(parameterValue)) {
        const error = new TypeError(`${methodName} called without required argument "${parameterName}"`);
        logger_js_1.logger.warning(`[${connectionId}] ${error.name}: ${error.message}`);
        (0, logger_js_1.logErrorStackTrace)(error);
        throw error;
    }
}
/**
 * Maps the amqp error conditions to the Error names.
 * @internal
 */
var ConditionErrorNameMapper;
(function (ConditionErrorNameMapper) {
    /**
     * Indicates that a sequenc enumber was out of order.
     */
    ConditionErrorNameMapper["com.microsoft:out-of-order-sequence"] = "SequenceOutOfOrderError";
    /**
     * Error is thrown when two or more instances connect to the same partition
     * with different epoch values.
     */
    ConditionErrorNameMapper["com.microsoft:producer-epoch-stolen"] = "ProducerDisconnectedError";
})(ConditionErrorNameMapper || (ConditionErrorNameMapper = {}));
/**
 * @internal
 */
const nonRetryableErrors = new Set([
    "ProducerDisconnectedError",
    "SequenceOutOfOrderError",
]);
/**
 * @internal
 */
function translateError(err) {
    const translatedError = (0, core_amqp_1.translate)(err);
    // If we're not dealing with a messaging error, or the original error wasn't an AMQP error,
    // or we have a resolved code on the messaging error, just return the translated error.
    if (!(0, core_amqp_1.isMessagingError)(translatedError) || !(0, rhea_promise_1.isAmqpError)(err) || translatedError.code) {
        return translatedError;
    }
    const amqpError = err;
    const condition = amqpError.condition;
    // If we don't have a condition, we can't map the condition to a code.
    if (!condition) {
        return translatedError;
    }
    // Attempt to resolve codes core-amqp doesn't know about.
    translatedError.code =
        ConditionErrorNameMapper[condition];
    if (translatedError.code) {
        translatedError.retryable = !nonRetryableErrors.has(translatedError.code);
    }
    return translatedError;
}
/**
 * @internal
 */
exports.idempotentAlreadyPublished = "These events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again.";
/**
 * @internal
 */
exports.idempotentSomeAlreadyPublished = "1 or more of these events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again.";
/**
 * @internal
 */
function validateProducerPartitionSettings({ enableIdempotentRetries, partitionId, partitionKey, }) {
    if (enableIdempotentRetries && ((0, core_util_1.isDefined)(partitionKey) || !(0, core_util_1.isDefined)(partitionId))) {
        throw new Error(`The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true.`);
    }
    if ((0, core_util_1.isDefined)(partitionId) && (0, core_util_1.isDefined)(partitionKey)) {
        throw new Error(`The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`);
    }
}
//# sourceMappingURL=error.js.map