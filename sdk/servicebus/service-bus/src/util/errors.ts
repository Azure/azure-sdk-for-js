// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import { ConnectionContext } from "../connectionContext";
import { logger, receiverLogger } from "../log";
import { ReceiveMode } from "../models";
import {
  isAmqpAnnotatedMessage,
  isServiceBusMessage,
  ServiceBusReceivedMessage,
} from "../serviceBusMessage";
import { isDefined } from "@azure/core-util";

/**
 * Error message to use when EntityPath in connection string does not match the
 * queue or topic name passed to the methods in the ServiceBusClient that create
 * senders and receivers.
 *
 * @internal
 */
export const entityPathMisMatchError =
  "The queue or topic name provided does not match the EntityPath in the connection string passed to the ServiceBusClient constructor.";

/**
 * Error message for when maxMessageCount provided is invalid.
 *
 * @internal
 */
export const InvalidMaxMessageCountError = "'maxMessageCount' must be a number greater than 0.";

/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context - The ConnectionContext associated with the current AMQP connection.
 */
export function throwErrorIfConnectionClosed(context: ConnectionContext): void {
  if (context && context.wasConnectionCloseCalled) {
    const errorMessage = "The underlying AMQP connection is closed.";
    const error = new Error(errorMessage);
    logger.warning(`[${context.connectionId}] %O`, error);
    throw error;
  }
}

/**
 * @internal
 * Gets the error message when a sender is used when its already closed
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 */
export function getSenderClosedErrorMsg(entityPath: string): string {
  return (
    `The sender for "${entityPath}" has been closed and can no longer be used. ` +
    `Please create a new sender using the "createSender" method on the ServiceBusClient.`
  );
}

/**
 * @internal
 * Gets the error message when a receiver is used when its already closed
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 * @param sessionId - If using session receiver, then the id of the session
 */
export function getReceiverClosedErrorMsg(entityPath: string, sessionId?: string): string {
  if (!isDefined(sessionId)) {
    return (
      `The receiver for "${entityPath}" has been closed and can no longer be used. ` +
      `Please create a new receiver using the "createReceiver" method on the ServiceBusClient.`
    );
  }
  return (
    `The receiver for session "${sessionId}" in "${entityPath}" has been closed and can no ` +
    `longer be used. Please create a new receiver using the "acceptSession" or "acceptNextSession" method on the ServiceBusClient.`
  );
}

/**
 * @internal
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 * @param sessionId - If using session receiver, then the id of the session
 */
export function getAlreadyReceivingErrorMsg(entityPath: string, sessionId?: string): string {
  if (!isDefined(sessionId)) {
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
export function throwTypeErrorIfParameterMissing(
  connectionId: string,
  parameterName: string,
  parameterValue: unknown
): void {
  if (parameterValue === undefined || parameterValue === null) {
    const error = new TypeError(`Missing parameter "${parameterName}"`);
    logger.warning(`[${connectionId}] %O`, error);
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

export function throwTypeErrorIfParameterTypeMismatch(
  connectionId: string,
  parameterName: string,
  parameterValue: unknown,
  expectedType: string
): void {
  if (typeof parameterValue !== expectedType) {
    const error = new TypeError(
      `The parameter "${parameterName}" should be of type "${expectedType}"`
    );
    logger.warning(`[${connectionId}] %O`, error);
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
export function throwTypeErrorIfParameterNotLong(
  connectionId: string,
  parameterName: string,
  parameterValue: unknown
): TypeError | undefined {
  if (Array.isArray(parameterValue)) {
    return throwTypeErrorIfParameterNotLongArray(connectionId, parameterName, parameterValue);
  }
  if (Long.isLong(parameterValue)) {
    return;
  }
  const error = new TypeError(`The parameter "${parameterName}" should be of type "Long"`);
  logger.warning(`[${connectionId}] %O`, error);
  throw error;
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is not an array of type `Long`
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
export function throwTypeErrorIfParameterNotLongArray(
  connectionId: string,
  parameterName: string,
  parameterValue: any[]
): TypeError | undefined {
  if (parameterValue.every((item) => Long.isLong(item))) {
    return;
  }
  const error = new TypeError(`The parameter "${parameterName}" should be an array of type "Long"`);
  logger.warning(`[${connectionId}] %O`, error);
  throw error;
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is an empty string
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
export function throwTypeErrorIfParameterIsEmptyString(
  connectionId: string,
  parameterName: string,
  parameterValue: string
): TypeError | undefined {
  if (parameterValue !== "") {
    return;
  }
  const error = new TypeError(`Empty string not allowed in parameter "${parameterName}"`);
  logger.warning(`[${connectionId}] %O`, error);
  throw error;
}

/**
 * @internal
 * The error message for operations on the receiver that are invalid for a message received in receiveAndDelete mode.
 */
export const InvalidOperationInReceiveAndDeleteMode =
  "The operation is not supported in 'receiveAndDelete' receive mode.";

/**
 * @internal
 * The error message for operations on the receiver that are invalid for a peeked message.
 */
export const InvalidOperationForPeekedMessage =
  "This operation is not supported for peeked messages. Only messages received using 'receiveMessages()', 'subscribe()' and 'getMessageIterator()' methods on the receiver in 'peekLock' receive mode can be settled.";

/**
 * @internal
 * The error message for when one attempts to settle an already settled message.
 */
export const MessageAlreadySettled = "The message has either been deleted or already settled";

/**
 * Throws error if the ServiceBusReceivedMessage cannot be settled.
 * @internal
 */
export function throwErrorIfInvalidOperationOnMessage(
  message: ServiceBusReceivedMessage,
  receiveMode: ReceiveMode,
  connectionId: string
): void {
  let error: Error | undefined;

  if (receiveMode === "receiveAndDelete") {
    error = new Error(InvalidOperationInReceiveAndDeleteMode);
  } else if (!message.lockToken) {
    error = new Error(InvalidOperationForPeekedMessage);
  }

  if (error) {
    receiverLogger.logError(
      error,
      "[%s] An error occurred for message with id '%s'",
      connectionId,
      message.messageId
    );
    throw error;
  }
}

/**
 * Error message for when the ServiceBusMessage provided by the user has different values
 * for partitionKey and sessionId.
 * @internal
 */
export const PartitionKeySessionIdMismatchError =
  "The fields 'partitionKey' and 'sessionId' cannot have different values.";
/**
 * Throws error if the given object is not a valid ServiceBusMessage
 * @internal
 * @param msg - The object that needs to be validated as a ServiceBusMessage
 * @param errorMessageForWrongType - The error message to use when given object is not a ServiceBusMessage
 */
export function throwIfNotValidServiceBusMessage(
  msg: unknown,
  errorMessageForWrongType: string
): void {
  if (!isServiceBusMessage(msg) && !isAmqpAnnotatedMessage(msg)) {
    throw new TypeError(errorMessageForWrongType);
  }

  if (isServiceBusMessage(msg)) {
    if (msg.partitionKey && msg.sessionId && msg.partitionKey !== msg.sessionId) {
      throw new TypeError(PartitionKeySessionIdMismatchError);
    }
  }
}

/** @internal */
export const errorInvalidMessageTypeSingleOrArray =
  "Provided value for 'messages' must be of type: ServiceBusMessage, AmqpAnnotatedMessage, ServiceBusMessageBatch or an array of type ServiceBusMessage or AmqpAnnotatedMessage.";

/** @internal */
export const errorInvalidMessageTypeSingle =
  "Provided value for 'message' must be of type: ServiceBusMessage or AmqpAnnotatedMessage.";
