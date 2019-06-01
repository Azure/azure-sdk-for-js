// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "../log";
import Long from "long";
import { ClientType } from "../client";
import { ConnectionContext } from "../connectionContext";

/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context The ConnectionContext associated with the current AMQP connection.
 */
export function throwErrorIfConnectionClosed(context: ConnectionContext): void {
  if (context && context.wasConnectionCloseCalled) {
    const errorMessage = "The underlying AMQP connection is closed.";
    const error = new Error(errorMessage);
    log.error(`[${context.connectionId}] %O`, error);
    throw error;
  }
}

/**
 * @internal
 * Logs and throws error if the underlying AMQP connection or if the client is closed
 * @param context The ConnectionContext associated with the current AMQP connection.
 * @param entityPath Entity Path of the client which denotes the name of the Queue/Topic/Subscription
 * @param isClientClosed Boolean denoting if the client is closed or not
 */
export function throwErrorIfClientOrConnectionClosed(
  context: ConnectionContext,
  entityPath: string,
  isClientClosed: boolean
): void {
  throwErrorIfConnectionClosed(context);
  if (context && isClientClosed) {
    const errorMessage = getClientClosedErrorMsg(entityPath);
    const error = new Error(errorMessage);
    log.error(`[${context.connectionId}] %O`, error);
    throw error;
  }
}

/**
 * @internal
 * Gets the error message when an open sender exists, but a new one is asked for on the same client
 * @param clientType 'QueueClient' or 'TopicClient'
 * @param entityPath  Value of the `entityPath` property on the client which denotes its name
 */
export function getOpenSenderErrorMsg(clientType: string, entityPath: string): string {
  return (
    `An open sender already exists on the ${clientType} for "${entityPath}". ` +
    `Please close it and try again or use a new ${clientType} instance.`
  );
}

/**
 * @internal
 * Gets the error message when an open receiver exists, but a new one is asked for on the same client
 * @param clientType 'QueueClient' or 'SubscriptionClient'
 * @param entityPath  Value of the `entityPath` property on the client which denotes its name
 * @param sessionId If using session receiver, then the id of the session
 */
export function getOpenReceiverErrorMsg(
  clientType: ClientType,
  entityPath: string,
  sessionId?: string
): string {
  if (!sessionId) {
    return (
      `An open receiver already exists on the ${clientType} for "${entityPath}". ` +
      `Please close it and try again or use a new ${clientType} instance.`
    );
  }
  return (
    `An open receiver already exists for the session "${sessionId}" on the ${clientType} for ` +
    `"${entityPath}". Please close it and try again or use a new ${clientType} instance.`
  );
}

/**
 * @internal
 * Gets the error message when a client is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 */
export function getClientClosedErrorMsg(entityPath: string): string {
  return (
    `The client for "${entityPath}" has been closed and can no longer be used. ` +
    `Please create a new client using an instance of ServiceBusClient.`
  );
}

/**
 * @internal
 * Gets the error message when a sender is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param clientType One of "QueueClient", "TopicClient" or "SubscriptionClient", used for logging
 * @param isClientClosed Denotes if the close() was called on the client that created the sender
 */
export function getSenderClosedErrorMsg(
  entityPath: string,
  clientType: ClientType,
  isClientClosed: boolean
): string {
  if (isClientClosed) {
    return (
      `The client for "${entityPath}" has been closed. The sender created by it can no longer be used. ` +
      `Please create a new client using an instance of ServiceBusClient.`
    );
  }
  return (
    `The sender for "${entityPath}" has been closed and can no longer be used. ` +
    `Please create a new sender using the "createSender" function on the ${clientType}.`
  );
}

/**
 * @internal
 * Gets the error message when a receiver is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param clientType One of "QueueClient", "TopicClient" or "SubscriptionClient", used for logging
 * @param isClientClosed Denotes if the close() was called on the client that created the sender
 * @param sessionId If using session receiver, then the id of the session
 */
export function getReceiverClosedErrorMsg(
  entityPath: string,
  clientType: ClientType,
  isClientClosed: boolean,
  sessionId?: string
): string {
  if (isClientClosed) {
    return (
      `The client for "${entityPath}" has been closed. The receiver created by it can no longer be used. ` +
      `Please create a new client using an instance of ServiceBusClient.`
    );
  }
  if (sessionId == undefined) {
    return (
      `The receiver for "${entityPath}" has been closed and can no longer be used. ` +
      `Please create a new receiver using the "createReceiver" function on the ${clientType}.`
    );
  }
  return (
    `The receiver for session "${sessionId}" in "${entityPath}" has been closed and can no ` +
    `longer be used. Please create a new receiver using the "createReceiver" function.`
  );
}

/**
 * @internal
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param sessionId If using session receiver, then the id of the session
 */
export function getAlreadyReceivingErrorMsg(entityPath: string, sessionId?: string): string {
  if (sessionId == undefined) {
    return `The receiver for "${entityPath}" is already receiving messages.`;
  }
  return `The receiver for session "${sessionId}" for "${entityPath}" is already receiving messages.`;
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to check
 * @param parameterValue Value of the parameter to check
 */
export function throwTypeErrorIfParameterMissing(
  connectionId: string,
  parameterName: string,
  parameterValue: any
): void {
  if (parameterValue === undefined || parameterValue === null) {
    const error = new TypeError(`Missing parameter "${parameterName}"`);
    log.error(`[${connectionId}] %O`, error);
    throw error;
  }
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of expected type
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
 * @param expectedType Expected type of the parameter
 */
export function throwTypeErrorIfParameterTypeMismatch(
  connectionId: string,
  parameterName: string,
  parameterValue: any,
  expectedType: string
): void {
  if (typeof parameterValue !== expectedType) {
    const error = new TypeError(
      `The parameter "${parameterName}" should be of type "${expectedType}"`
    );
    log.error(`[${connectionId}] %O`, error);
    throw error;
  }
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of type `Long`
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
 */
export function throwTypeErrorIfParameterNotLong(
  connectionId: string,
  parameterName: string,
  parameterValue: any
): TypeError | undefined {
  if (Long.isLong(parameterValue)) {
    return;
  }
  const error = new TypeError(`The parameter "${parameterName}" should be of type "Long"`);
  log.error(`[${connectionId}] %O`, error);
  throw error;
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is not an array of type `Long`
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
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
  log.error(`[${connectionId}] %O`, error);
  throw error;
}

/**
 * @internal
 * Logs and Throws TypeError if given parameter is an empty string
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
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
  log.error(`[${connectionId}] %O`, error);
  throw error;
}

/**
 * @internal
 * Gets error message for when an operation is not supported in ReceiveAndDelete mode
 * @param failedToDo A string to add to the placeholder in the error message. Denotes the action
 * that is not supported in ReceiveAndDelete mode
 */
export function getErrorMessageNotSupportedInReceiveAndDeleteMode(failedToDo: string): string {
  return `Failed to ${failedToDo} as the operation is only supported in 'PeekLock' recieve mode.`;
}
