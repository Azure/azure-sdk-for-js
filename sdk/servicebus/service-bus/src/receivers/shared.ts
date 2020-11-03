// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers, ProcessErrorArgs } from "../models";
import { ServiceBusReceiver } from "./receiver";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger, ServiceBusLogger } from "../log";
import {
  DeadLetterOptions,
  DispositionType,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage
} from "../serviceBusMessage";
import { DispositionStatusOptions } from "../core/managementClient";
import { ConnectionContext } from "../connectionContext";
import { getErrorMessageNotSupportedInReceiveAndDeleteMode } from "../util/errors";
import { ErrorNameConditionMapper, translate } from "@azure/core-amqp";

/**
 * @internal
 * @ignore
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
 * @ignore
 */
export async function* getMessageIterator(
  receiver: Pick<ServiceBusReceiver, "receiveMessages">,
  options?: OperationOptionsBase
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
 * @ignore
 */
export function wrapProcessErrorHandler(
  handlers: Pick<MessageHandlers, "processError">,
  logger: ServiceBusLogger = receiverLogger
): MessageHandlers["processError"] {
  return async (args: ProcessErrorArgs) => {
    try {
      await handlers.processError(args);
    } catch (err) {
      logger.logError(err, `An error was thrown from the user's processError handler`);
    }
  };
}

export function completeMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Completing the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.complete, context, entityPath);
}

export function abandonMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify?: { [key: string]: any }
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Abandoning the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.abandon, context, entityPath, {
    propertiesToModify
  });
}

export function deferMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify?: { [key: string]: any }
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Deferring the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.defer, context, entityPath, {
    propertiesToModify
  });
}

export function deadLetterMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify?: DeadLetterOptions & { [key: string]: any }
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Deadlettering the message with id '%s'.",
    context.connectionId,
    message.messageId
  );

  const actualPropertiesToModify: Partial<DeadLetterOptions> = {
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

  return settleMessage(
    message,
    DispositionType.deadletter,
    context,
    entityPath,
    dispositionStatusOptions
  );
}

function settleMessage(
  message: ServiceBusMessageImpl,
  operation: DispositionType,
  context: ConnectionContext,
  entityPath: string,
  options?: DispositionStatusOptions
): Promise<void> {
  if (!message.delivery) {
    throw new Error("A peeked message cannot be settled.");
  }

  if (!message.lockToken) {
    const error = new Error(
      getErrorMessageNotSupportedInReceiveAndDeleteMode(`${operation} the message`)
    );
    receiverLogger.logError(
      error,
      "[%s] An error occurred when settling a message with id '%s'",
      context.connectionId,
      message.messageId
    );
    throw error;
  }
  const isDeferredMessage = !message.delivery.link;
  const receiver = isDeferredMessage
    ? undefined
    : context.getReceiverFromCache(message.delivery.link.name, message.sessionId);
  const associatedLinkName = receiver?.name;

  if (!isDeferredMessage) {
    // In case the message wasn't from a deferred queue,
    //   1. We can verify the remote_settled flag on the delivery
    //      - If the flag is true, throw an error since the message has been settled (Specifically, with a receive link)
    //      - If the flag is false, we can't say that the message has not been settled
    //        since settling with the management link won't update the delivery (In this case, service would throw an error)
    //   2. If the message has a session-id and if the associated receiver link is unavailable,
    //      then throw an error since we need a lock on the session to settle the message.
    let error: Error | undefined;
    if (message.delivery.remote_settled) {
      error = new Error(`Failed to ${operation} the message as this message is already settled.`);
    } else if ((!receiver || !receiver.isOpen()) && message.sessionId != undefined) {
      error = translate({
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
  }

  // Message Settlement with managementLink
  // 1. If the received message is deferred as such messages can only be settled using managementLink
  // 2. If the associated receiver link is not available. This does not apply to messages from sessions as we need a lock on the session to do so.
  if (isDeferredMessage || ((!receiver || !receiver.isOpen()) && message.sessionId == undefined)) {
    return context
      .getManagementClient(entityPath)
      .updateDispositionStatus(message.lockToken, operation, {
        ...options,
        associatedLinkName,
        sessionId: message.sessionId
      });
  }

  return receiver!.settleMessage(message, operation, options);
}
