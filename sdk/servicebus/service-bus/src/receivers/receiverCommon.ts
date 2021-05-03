// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers, ProcessErrorArgs } from "../models";
import { ServiceBusReceiver } from "./receiver";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger, ServiceBusLogger } from "../log";
import { ServiceBusError, translateServiceBusError } from "../serviceBusError";
import {
  DeadLetterOptions,
  DispositionType,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage
} from "../serviceBusMessage";
import { DispositionStatusOptions } from "../core/managementClient";
import { ConnectionContext } from "../connectionContext";
import {
  delay,
  ErrorNameConditionMapper,
  retry,
  RetryOperationType,
  RetryOptions
} from "@azure/core-amqp";
import { MessageAlreadySettled } from "../util/errors";
import { isDefined } from "../util/typeGuards";

/**
 * @internal
 */
export function assertValidMessageHandlers(handlers: {
  processMessage?: unknown;
  processError?: unknown;
}): void {
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
  retryOptions: RetryOptions | undefined
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Completing the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.complete, context, entityPath, {
    retryOptions
  });
}

/**
 * @internal
 *
 */
export function abandonMessage(
  message: ServiceBusMessageImpl,
  context: ConnectionContext,
  entityPath: string,
  propertiesToModify: { [key: string]: any } | undefined,
  retryOptions: RetryOptions | undefined
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Abandoning the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.abandon, context, entityPath, {
    propertiesToModify,
    retryOptions
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
  propertiesToModify: { [key: string]: any } | undefined,
  retryOptions: RetryOptions | undefined
): Promise<void> {
  receiverLogger.verbose(
    "[%s] Deferring the message with id '%s'.",
    context.connectionId,
    message.messageId
  );
  return settleMessage(message, DispositionType.defer, context, entityPath, {
    retryOptions,
    propertiesToModify
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
  propertiesToModify: (DeadLetterOptions & { [key: string]: any }) | undefined,
  retryOptions: RetryOptions | undefined
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
    deadLetterDescription: propertiesToModify?.deadLetterErrorDescription,
    retryOptions
  };

  return settleMessage(
    message,
    DispositionType.deadletter,
    context,
    entityPath,
    dispositionStatusOptions
  );
}

/**
 * @internal
 */
export function settleMessage(
  message: ServiceBusMessageImpl,
  operation: DispositionType,
  context: ConnectionContext,
  entityPath: string,
  options: DispositionStatusOptions,
  _settleMessageOperation: typeof settleMessageOperation = settleMessageOperation
): Promise<void> {
  return retry({
    connectionId: context.connectionId,
    operation: () => {
      return _settleMessageOperation(message, operation, context, entityPath, options);
    },
    operationType: RetryOperationType.messageSettlement,
    abortSignal: options?.abortSignal,
    retryOptions: options?.retryOptions
  });
}

/**
 * @internal
 */
export async function settleMessageOperation(
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

  const settlementWithManagementLink = () =>
    context.getManagementClient(entityPath).updateDispositionStatus(message.lockToken!, operation, {
      ...options,
      associatedLinkName,
      sessionId: message.sessionId
    });

  const logError = (error: Error) => {
    receiverLogger.logError(
      error,
      "[%s] An error occurred when settling a message with id '%s'",
      context.connectionId,
      message.messageId
    );
  };

  let error: Error | undefined;
  if (message.delivery.remote_settled) {
    error = new Error(MessageAlreadySettled);
    logError(error);
  }

  try {
    if (isDeferredMessage) {
      // Message Settlement with managementLink
      // 1. If the received message is deferred as such messages can only be settled using managementLink
      return await settlementWithManagementLink();
    }

    if (!isDefined(receiver)) {
      error = new ServiceBusError(
        `Failed to ${operation} the message as the receiver is undefined.`,
        "GeneralError"
      );
      logError(error);
      throw error;
    }

    if (!receiver.isOpen()) {
      if (!isDefined(message.sessionId)) {
        // Message Settlement with managementLink
        // 2. If the associated receiver link is not available. This does not apply to messages from sessions as we need a lock on the session to do so.
        return await settlementWithManagementLink();
      }
      if (isDefined(message.sessionId)) {
        error = translateServiceBusError({
          description:
            `Failed to ${operation} the message as the AMQP link with which the message was ` +
            `received is no longer alive.`,
          condition: ErrorNameConditionMapper.SessionLockLostError
        });
        logError(error);
        throw error;
      }
    }

    await receiver.settleMessage(message, operation, options);
    // delay (setTimeout) ensures that the delivery is popped, size is decremented with respect to the settlement that was done
    await delay(0);
    receiver.settlementNotifierForSubscribe?.();
  } catch (err) {
    throw translateServiceBusError(err);
  }
}
