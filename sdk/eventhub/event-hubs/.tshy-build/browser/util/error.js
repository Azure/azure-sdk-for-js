// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { logErrorStackTrace, logger } from "../logger.js";
import { isDefined } from "@azure/core-util";
import { isAmqpError } from "rhea-promise";
import { isMessagingError, translate } from "@azure/core-amqp";
/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context - The ConnectionContext associated with the current AMQP connection.
 */
export function throwErrorIfConnectionClosed(context) {
    if (context && context.wasConnectionCloseCalled) {
        const errorMessage = "The underlying AMQP connection is closed.";
        const error = new Error(errorMessage);
        logger.warning(`[${context.connectionId}] ${error.name}: ${error.message}`);
        logErrorStackTrace(error);
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
export function throwTypeErrorIfParameterMissing(connectionId, methodName, parameterName, parameterValue) {
    if (!isDefined(parameterValue)) {
        const error = new TypeError(`${methodName} called without required argument "${parameterName}"`);
        logger.warning(`[${connectionId}] ${error.name}: ${error.message}`);
        logErrorStackTrace(error);
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
export function translateError(err) {
    const translatedError = translate(err);
    // If we're not dealing with a messaging error, or the original error wasn't an AMQP error,
    // or we have a resolved code on the messaging error, just return the translated error.
    if (!isMessagingError(translatedError) || !isAmqpError(err) || translatedError.code) {
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
export const idempotentAlreadyPublished = "These events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again.";
/**
 * @internal
 */
export const idempotentSomeAlreadyPublished = "1 or more of these events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again.";
/**
 * @internal
 */
export function validateProducerPartitionSettings({ enableIdempotentRetries, partitionId, partitionKey, }) {
    if (enableIdempotentRetries && (isDefined(partitionKey) || !isDefined(partitionId))) {
        throw new Error(`The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true.`);
    }
    if (isDefined(partitionId) && isDefined(partitionKey)) {
        throw new Error(`The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`);
    }
}
//# sourceMappingURL=error.js.map