// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "../log";
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
 */
export function getSenderClosedErrorMsg(entityPath: string, clientType: ClientType): string {
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
 * @param sessionId If using session receiver, then the id of the session
 */
export function getReceiverClosedErrorMsg(
  entityPath: string,
  clientType: ClientType,
  sessionId?: string
): string {
  if (!sessionId) {
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
  if (!sessionId) {
    return `The receiver for "${entityPath}" is already receiving messages.`;
  }
  return `The receiver for session "${sessionId}" for "${entityPath}" is already receiving messages.`;
}
