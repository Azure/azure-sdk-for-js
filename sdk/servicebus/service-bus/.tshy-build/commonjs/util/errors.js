"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorInvalidMessageTypeSingle = exports.errorInvalidMessageTypeSingleOrArray = exports.PartitionKeySessionIdMismatchError = exports.MessageAlreadySettled = exports.InvalidOperationForPeekedMessage = exports.InvalidOperationInReceiveAndDeleteMode = exports.InvalidMaxMessageCountError = exports.entityPathMisMatchError = void 0;
exports.throwErrorIfConnectionClosed = throwErrorIfConnectionClosed;
exports.getSenderClosedErrorMsg = getSenderClosedErrorMsg;
exports.getReceiverClosedErrorMsg = getReceiverClosedErrorMsg;
exports.getAlreadyReceivingErrorMsg = getAlreadyReceivingErrorMsg;
exports.throwTypeErrorIfParameterMissing = throwTypeErrorIfParameterMissing;
exports.throwTypeErrorIfNotInstanceOfParameterType = throwTypeErrorIfNotInstanceOfParameterType;
exports.throwTypeErrorIfParameterTypeMismatch = throwTypeErrorIfParameterTypeMismatch;
exports.throwTypeErrorIfParameterNotLong = throwTypeErrorIfParameterNotLong;
exports.throwTypeErrorIfParameterNotLongArray = throwTypeErrorIfParameterNotLongArray;
exports.throwTypeErrorIfParameterIsEmptyString = throwTypeErrorIfParameterIsEmptyString;
exports.throwErrorIfInvalidOperationOnMessage = throwErrorIfInvalidOperationOnMessage;
exports.throwIfNotValidServiceBusMessage = throwIfNotValidServiceBusMessage;
const tslib_1 = require("tslib");
const long_1 = tslib_1.__importDefault(require("long"));
const log_js_1 = require("../log.js");
const serviceBusMessage_js_1 = require("../serviceBusMessage.js");
const core_util_1 = require("@azure/core-util");
/**
 * Error message to use when EntityPath in connection string does not match the
 * queue or topic name passed to the methods in the ServiceBusClient that create
 * senders and receivers.
 *
 * @internal
 */
exports.entityPathMisMatchError = "The queue or topic name provided does not match the EntityPath in the connection string passed to the ServiceBusClient constructor.";
/**
 * Error message for when maxMessageCount provided is invalid.
 *
 * @internal
 */
exports.InvalidMaxMessageCountError = "'maxMessageCount' must be a number greater than 0.";
/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context - The ConnectionContext associated with the current AMQP connection.
 */
function throwErrorIfConnectionClosed(context) {
    if (context && context.wasConnectionCloseCalled) {
        const errorMessage = "The underlying AMQP connection is closed.";
        const error = new Error(errorMessage);
        log_js_1.logger.warning(`[${context.connectionId}] %O`, error);
        throw error;
    }
}
/**
 * @internal
 * Gets the error message when a sender is used when its already closed
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 */
function getSenderClosedErrorMsg(entityPath) {
    return (`The sender for "${entityPath}" has been closed and can no longer be used. ` +
        `Please create a new sender using the "createSender" method on the ServiceBusClient.`);
}
/**
 * @internal
 * Gets the error message when a receiver is used when its already closed
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 * @param sessionId - If using session receiver, then the id of the session
 */
function getReceiverClosedErrorMsg(entityPath, sessionId) {
    if (!(0, core_util_1.isDefined)(sessionId)) {
        return (`The receiver for "${entityPath}" has been closed and can no longer be used. ` +
            `Please create a new receiver using the "createReceiver" method on the ServiceBusClient.`);
    }
    return (`The receiver for session "${sessionId}" in "${entityPath}" has been closed and can no ` +
        `longer be used. Please create a new receiver using the "acceptSession" or "acceptNextSession" method on the ServiceBusClient.`);
}
/**
 * @internal
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 * @param sessionId - If using session receiver, then the id of the session
 */
function getAlreadyReceivingErrorMsg(entityPath, sessionId) {
    if (!(0, core_util_1.isDefined)(sessionId)) {
        return `The receiver for "${entityPath}" is already receiving messages.`;
    }
    return `The receiver for session "${sessionId}" for "${entityPath}" is already receiving messages.`;
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to check
 * @param parameterValue - Value of the parameter to check
 */
function throwTypeErrorIfParameterMissing(connectionId, parameterName, parameterValue) {
    if (parameterValue === undefined || parameterValue === null) {
        const error = new TypeError(`Missing parameter "${parameterName}"`);
        log_js_1.logger.warning(`[${connectionId}] %O`, error);
        throw error;
    }
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not an instance of expected type
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 * @param constructor - Constructor function of the expected parameter type
 */
function throwTypeErrorIfNotInstanceOfParameterType(connectionId, parameterName, parameterValue, 
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
constructor) {
    if (!(parameterValue instanceof constructor)) {
        const error = new TypeError(`The parameter "${parameterName}" should be an instance of "${constructor.name}"`);
        log_js_1.logger.warning(`[${connectionId}] %O`, error);
        throw error;
    }
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of expected type
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 * @param expectedType - Expected type of the parameter
 */
function throwTypeErrorIfParameterTypeMismatch(connectionId, parameterName, parameterValue, expectedType) {
    if (typeof parameterValue !== expectedType) {
        const error = new TypeError(`The parameter "${parameterName}" should be of type "${expectedType}"`);
        log_js_1.logger.warning(`[${connectionId}] %O`, error);
        throw error;
    }
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of type `Long` or an array of type `Long`
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
function throwTypeErrorIfParameterNotLong(connectionId, parameterName, parameterValue) {
    if (Array.isArray(parameterValue)) {
        return throwTypeErrorIfParameterNotLongArray(connectionId, parameterName, parameterValue);
    }
    if (long_1.default.isLong(parameterValue)) {
        return;
    }
    const error = new TypeError(`The parameter "${parameterName}" should be of type "Long"`);
    log_js_1.logger.warning(`[${connectionId}] %O`, error);
    throw error;
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not an array of type `Long`
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
function throwTypeErrorIfParameterNotLongArray(connectionId, parameterName, parameterValue) {
    if (parameterValue.every((item) => long_1.default.isLong(item))) {
        return;
    }
    const error = new TypeError(`The parameter "${parameterName}" should be an array of type "Long"`);
    log_js_1.logger.warning(`[${connectionId}] %O`, error);
    throw error;
}
/**
 * @internal
 * Logs and Throws TypeError if given parameter is an empty string
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
function throwTypeErrorIfParameterIsEmptyString(connectionId, parameterName, parameterValue) {
    if (parameterValue !== "") {
        return;
    }
    const error = new TypeError(`Empty string not allowed in parameter "${parameterName}"`);
    log_js_1.logger.warning(`[${connectionId}] %O`, error);
    throw error;
}
/**
 * @internal
 * The error message for operations on the receiver that are invalid for a message received in receiveAndDelete mode.
 */
exports.InvalidOperationInReceiveAndDeleteMode = "The operation is not supported in 'receiveAndDelete' receive mode.";
/**
 * @internal
 * The error message for operations on the receiver that are invalid for a peeked message.
 */
exports.InvalidOperationForPeekedMessage = "This operation is not supported for peeked messages. Only messages received using 'receiveMessages()', 'subscribe()' and 'getMessageIterator()' methods on the receiver in 'peekLock' receive mode can be settled.";
/**
 * @internal
 * The error message for when one attempts to settle an already settled message.
 */
exports.MessageAlreadySettled = "The message has either been deleted or already settled";
/**
 * Throws error if the ServiceBusReceivedMessage cannot be settled.
 * @internal
 */
function throwErrorIfInvalidOperationOnMessage(message, receiveMode, connectionId) {
    let error;
    if (receiveMode === "receiveAndDelete") {
        error = new Error(exports.InvalidOperationInReceiveAndDeleteMode);
    }
    else if (!message.lockToken) {
        error = new Error(exports.InvalidOperationForPeekedMessage);
    }
    if (error) {
        log_js_1.receiverLogger.logError(error, "[%s] An error occurred for message with id '%s'", connectionId, message.messageId);
        throw error;
    }
}
/**
 * Error message for when the ServiceBusMessage provided by the user has different values
 * for partitionKey and sessionId.
 * @internal
 */
exports.PartitionKeySessionIdMismatchError = "The fields 'partitionKey' and 'sessionId' cannot have different values.";
/**
 * Throws error if the given object is not a valid ServiceBusMessage
 * @internal
 * @param msg - The object that needs to be validated as a ServiceBusMessage
 * @param errorMessageForWrongType - The error message to use when given object is not a ServiceBusMessage
 */
function throwIfNotValidServiceBusMessage(msg, errorMessageForWrongType) {
    if (!(0, serviceBusMessage_js_1.isServiceBusMessage)(msg) && !(0, serviceBusMessage_js_1.isAmqpAnnotatedMessage)(msg)) {
        throw new TypeError(errorMessageForWrongType);
    }
    if ((0, serviceBusMessage_js_1.isServiceBusMessage)(msg)) {
        if (msg.partitionKey && msg.sessionId && msg.partitionKey !== msg.sessionId) {
            throw new TypeError(exports.PartitionKeySessionIdMismatchError);
        }
    }
}
/** @internal */
exports.errorInvalidMessageTypeSingleOrArray = "Provided value for 'messages' must be of type: ServiceBusMessage, AmqpAnnotatedMessage, ServiceBusMessageBatch or an array of type ServiceBusMessage or AmqpAnnotatedMessage.";
/** @internal */
exports.errorInvalidMessageTypeSingle = "Provided value for 'message' must be of type: ServiceBusMessage or AmqpAnnotatedMessage.";
//# sourceMappingURL=errors.js.map