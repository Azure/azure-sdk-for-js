// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers, ProcessErrorArgs } from "../models";
import { ServiceBusReceiver } from "./receiver";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger, ServiceBusLogger } from "../log";
import { translateServiceBusError } from "../serviceBusError";
import {
  DeadLetterOptions,
  DispositionType,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage
} from "../serviceBusMessage";
import { DispositionStatusOptions } from "../core/managementClient";
import { ConnectionContext } from "../connectionContext";
import { ErrorNameConditionMapper } from "@azure/core-amqp";
import { MessageAlreadySettled } from "../util/errors";

/**
 * @internal
 */
export function assertValidMessageHandlers(handlers: any) {
  if (
    handlers &&
    handlers.processMessage instanceof Function &&
    handlers.processError instanceof Function
  ) {
    return;
  }

  throw new TypeError('Invalid "MessageHandlers" provided.');
}

/**
 * @internal
 */
export async function* getMessageIterator(
  receiver: Pick<ServiceBusReceiver, "receiveMessages">,
  options: OperationOptionsBase
): AsyncIterableIterator<ServiceBusReceivedMessage> {
  while (true) {
    const messages = await receiver.receiveMessages(1, options);

    if (messages.length === 0) {
      continue;
    }

    yield messages[0];
  }
}

/**
 * @internal
 */
export function wrapProcessErrorHandler(
  handlers: Pick<MessageHandlers, "processError">,
  logger: ServiceBusLogger = receiverLogger
): MessageHandlers["processError"] {
  return async (args: ProcessErrorArgs) => {
    try {
      args.error = translateServiceBusError(args.error);
      await handlers.processError(args);
    } catch (err) {
      logger.logError(err, `An error was thrown from the user's processError handler`);
    }
  };
}

/**
 * @internal
 *
 */
export function completeMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  operationOptions: OperationOptionsBase
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Completing the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.complete, context, entityPath, operationOptions);
}

/**
 * @internal
 *
 */
export function abandonMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify: { [key: string]: any },
  operationOptions: OperationOptionsBase
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Abandoning the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.abandon, context, entityPath, {
    propertiesToModify,
    ...operationOptions
  });
}

/**
 * @internal
 *
 */
export function deferMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify: { [key: string]: any },
  operationOptions: OperationOptionsBase
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Deferring the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.defer, context, entityPath, {
    propertiesToModify,
    ...operationOptions
  });
}

/**
 * @internal
 *
 */
export function deadLetterMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify: Partial<DeadLetterOptions> & { [key: string]: any },
  operationOptions: OperationOptionsBase
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Deadlettering the message with id '%s'.",
    context.connectionId,
    message.messageId
  );

  const actualPropertiesToModify = {
    ...propertiesToModify
  };

  // these two fields are handled specially and don't need to be in here.
  delete actualPropertiesToModify.deadLetterErrorDescription;
  delete actualPropertiesToModify.deadLetterReason;

  const dispositionStatusOptions: DispositionStatusOptions = {
    propertiesToModify: actualPropertiesToModify,
    deadLetterReason: propertiesToModify?.deadLetterReason,
    deadLetterDescription: propertiesToModify?.deadLetterErrorDescription
  };

  return settleMessage(message, DispositionType.deadletter, context, entityPath, {
    ...dispositionStatusOptions,
    ...operationOptions
  });
}

/**
 * @internal
 *
 */
function settleMessage(
  message: ServiceBusMessageImpl,
  operation: DispositionType,
  context: ConnectionContext,
  entityPath: string,
  options: DispositionStatusOptions
): Promise<void> {
  const isDeferredMessage = !message.delivery.link;
  const receiver = isDeferredMessage
    ? undefined
    : context.getReceiverFromCache(message.delivery.link.name, message.sessionId);
  const associatedLinkName = receiver?.name;

  let error: Error | undefined;
  if (message.delivery.remote_settled) {
    error = new Error(MessageAlreadySettled);
  } else if (
    !isDeferredMessage &&
    (!receiver || !receiver.isOpen()) &&
    message.sessionId != undefined
  ) {
    error = translateServiceBusError({
      description:
        `Failed to ${operation} the message as the AMQP link with which the message was ` +
        `received is no longer alive.`,
      condition: ErrorNameConditionMapper.SessionLockLostError
    });
  }

  if (error) {
    receiverLogger.logError(
      error,
      "[%s] An error occurred when settling a message with id '%s'",
      context.connectionId,
      message.messageId
    );
    throw error;
  }

  // Message Settlement with managementLink
  // 1. If the received message is deferred as such messages can only be settled using managementLink
  // 2. If the associated receiver link is not available. This does not apply to messages from sessions as we need a lock on the session to do so.
  if (isDeferredMessage || ((!receiver || !receiver.isOpen()) && message.sessionId == undefined)) {
    return context
      .getManagementClient(entityPath)
      .updateDispositionStatus(message.lockToken!, operation, {
        ...options,
        associatedLinkName,
        sessionId: message.sessionId
      })
      .catch((err) => {
        throw translateServiceBusError(err);
      });
  }

  return receiver!.settleMessage(message, operation, options).catch((err) => {
    throw translateServiceBusError(err);
  });
}
