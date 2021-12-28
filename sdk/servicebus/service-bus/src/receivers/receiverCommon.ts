// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers, ProcessErrorArgs } from "../models";
import { ServiceBusReceiver } from "./receiver";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { createServiceBusLogger, logger, receiverLogger, ServiceBusLogger } from "../log";
import { translateServiceBusError } from "../serviceBusError";
import {
  DeadLetterOptions,
  DispositionType,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage
} from "../serviceBusMessage";
import { DispositionStatusOptions } from "../core/managementClient";
import { ConnectionContext } from "../connectionContext";
import {
  ErrorNameConditionMapper,
  retry,
  RetryConfig,
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
  loggerParam: ServiceBusLogger = receiverLogger
): MessageHandlers["processError"] {
  return async (args: ProcessErrorArgs) => {
    try {
      args.error = translateServiceBusError(args.error);
      await handlers.processError(args);
    } catch (err) {
      loggerParam.logError(err, `An error was thrown from the user's processError handler`);
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
 *
 * NOTE: it's tempting to make this method non-async. However, doing so makes it too easy
 * to throw exceptions that will not be "catchable" by people chaining to the returned Promise
 * since we can throw exceptions outside of the Promise's scope.
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

  let error: Error | undefined;
  if (message.delivery.remote_settled) {
    error = new Error(MessageAlreadySettled);
  } else if (
    !isDeferredMessage &&
    (!receiver || !receiver.isOpen()) &&
    isDefined(message.sessionId)
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
  if (isDeferredMessage || ((!receiver || !receiver.isOpen()) && !isDefined(message.sessionId))) {
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

/** @internal */
export interface RetryForeverArgs<T> {
  retryConfig: RetryConfig<T>;
  onError: (err: Error) => void;
  logger: ReturnType<typeof createServiceBusLogger>;
  logPrefix: string;
}

/**
 * Retry infinitely until success, reporting in between retry attempts.
 *
 * This function will only stop retrying if:
 * - args.retryConfig.operation resolves successfully
 * - args.retryConfig.operation rejects with an `AbortError`
 *
 * @internal
 */
export async function retryForever<T>(
  args: RetryForeverArgs<T>,
  retryFn: typeof retry = retry
): Promise<T> {
  let numRetryCycles = 0;

  // The retries are broken up into cycles, giving the user some control over how often
  // we actually attempt to retry.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    ++numRetryCycles;

    try {
      return await retryFn(args.retryConfig);
    } catch (err) {
      // if the user aborts the operation we're immediately done.
      // AbortError is also thrown by linkEntity.init() if the connection has been
      // permanently closed.
      if (err.name === "AbortError") {
        logger.warning(`${args.logPrefix} AbortError caught, ending retries.`);
        throw err;
      }

      // we only report the error here - this avoids spamming the user with too many
      // redundant reports of errors while still providing them incremental status on failures.
      try {
        args.onError(err);
      } catch (error) {
        logger.error("args.onerror has thrown", error);
      }

      args.logger.logError(
        err,
        `${args.logPrefix} Error thrown in retry cycle ${numRetryCycles}, restarting retry cycle with retry options`,
        args.retryConfig
      );

      continue;
    }
  }
}
