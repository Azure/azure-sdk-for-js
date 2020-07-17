// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as log from "../log";
import Long from "long";
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
 * Gets the error message when a sender is used when its already closed
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
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
 * @param entityPath Value of the `entityPath` property on the client which denotes its name
 * @param sessionId If using session receiver, then the id of the session
 */
export function getReceiverClosedErrorMsg(entityPath: string, sessionId?: string): string {
  if (sessionId == undefined) {
    return (
      `The receiver for "${entityPath}" has been closed and can no longer be used. ` +
      `Please create a new receiver using the "createReceiver" method on the ServiceBusClient.`
    );
  }
  return (
    `The receiver for session "${sessionId}" in "${entityPath}" has been closed and can no ` +
    `longer be used. Please create a new receiver using the "createSessionReceiver" method on the ServiceBusClient.`
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
 * Logs and Throws TypeError if given parameter is not of type `Long` or an array of type `Long`
 * @param connectionId Id of the underlying AMQP connection used for logging
 * @param parameterName Name of the parameter to type check
 * @param parameterValue Value of the parameter to type check
 */
export function throwTypeErrorIfParameterNotLong(
  connectionId: string,
  parameterName: string,
  parameterValue: any
): TypeError | undefined {
  if (Array.isArray(parameterValue)) {
    return throwTypeErrorIfParameterNotLongArray(connectionId, parameterName, parameterValue);
  }
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
  return `Failed to ${failedToDo} as the operation is only supported in 'PeekLock' receive mode.`;
}
