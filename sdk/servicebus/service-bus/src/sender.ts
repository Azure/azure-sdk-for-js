// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import { MessageSender } from "./core/messageSender";
import { ServiceBusMessage } from "./serviceBusMessage";
import { ConnectionContext } from "./connectionContext";
import {
  errorInvalidMessageTypeSingleOrArray,
  getSenderClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwIfNotValidServiceBusMessage,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
} from "./util/errors";
import { ServiceBusMessageBatch } from "./serviceBusMessageBatch";
import { CreateMessageBatchOptions } from "./models";
import {
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  retry,
  AmqpAnnotatedMessage,
} from "@azure/core-amqp";
import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";
import { SpanStatusCode, Link, SpanKind } from "@azure/core-tracing";
import { senderLogger as logger } from "./log";
import { ServiceBusError } from "./serviceBusError";
import { createServiceBusSpan } from "./diagnostics/tracing";

/**
 * A Sender can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the ServiceBusClient to instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 */
export interface ServiceBusSender {
  /**
   * Sends the given messages after creating an AMQP Sender link if it doesn't already exist.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - All messages passed to the same sendMessages() call should have the same `sessionId` (if using
   *  sessions) and the same `partitionKey` (if using partitions).
   *
   * @param messages - A single message or an array of messages or a batch of messages created via the createBatch()
   * method to send.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws `ServiceBusError` with the code `MessageSizeExceeded` if the provided messages do not fit in a single `ServiceBusMessageBatch`.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws `ServiceBusError` if the service returns an error while sending messages to the service.
   */
  sendMessages(
    messages:
      | ServiceBusMessage
      | ServiceBusMessage[]
      | ServiceBusMessageBatch
      | AmqpAnnotatedMessage
      | AmqpAnnotatedMessage[],
    options?: OperationOptionsBase
  ): Promise<void>;

  /**
   * Creates an instance of `ServiceBusMessageBatch` to which one can add messages until the maximum supported size is reached.
   * The batch can be passed to the {@link send} method to send the messages to Azure Service Bus.
   * @param options - Configures the behavior of the batch.
   * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   *
   * @throws `ServiceBusError` if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  createMessageBatch(options?: CreateMessageBatchOptions): Promise<ServiceBusMessageBatch>;

  // TODO: Commented out to come up with an alternative name
  // /**
  //  * Opens the AMQP link to Azure Service Bus from the sender.
  //  *
  //  * It is not necessary to call this method in order to use the sender. It is
  //  * recommended to call this before your first sendMessages() call if you
  //  * want to front load the work of setting up the AMQP link to the service.
  //  *
  //  * @param options - Options to configure tracing and the abortSignal.
  //  */
  // open(options?: OperationOptionsBase): Promise<void>;

  /**
   * Returns `true` if either the sender or the client that created it has been closed.
   * @readonly
   */
  isClosed: boolean;

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param messages - Message or an array of messages that need to be scheduled.
   * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns The sequence numbers of messages that were scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the messages.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws `ServiceBusError` if the service returns an error while scheduling messages.
   */
  scheduleMessages(
    messages:
      | ServiceBusMessage
      | ServiceBusMessage[]
      | AmqpAnnotatedMessage
      | AmqpAnnotatedMessage[],
    scheduledEnqueueTimeUtc: Date,
    options?: OperationOptionsBase
  ): Promise<Long[]>;

  /**
   * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - Sequence number or an array of sequence numbers of the messages to be cancelled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws `ServiceBusError` if the service returns an error while canceling scheduled messages.
   */
  cancelScheduledMessages(
    sequenceNumbers: Long | Long[],
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * Path of the entity for which the sender has been created.
   */
  entityPath: string;
  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the sender cannot be used for any further operations.
   * Use the `createSender` function on the QueueClient or TopicClient to instantiate a new Sender
   *
   */
  close(): Promise<void>;
}

/**
 * @internal
 */
export class ServiceBusSenderImpl implements ServiceBusSender {
  private _retryOptions: RetryOptions;
  /**
   * Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;
  private _sender: MessageSender;
  public entityPath: string;

  private get logPrefix(): string {
    return `[${this._context.connectionId}|sender:${this.entityPath}]`;
  }

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   */
  constructor(
    private _context: ConnectionContext,
    private _entityPath: string,
    retryOptions: RetryOptions = {}
  ) {
    throwErrorIfConnectionClosed(_context);
    this.entityPath = _entityPath;
    this._sender = MessageSender.create(this._context, _entityPath, retryOptions);
    this._retryOptions = retryOptions;
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context);
    if (this.isClosed) {
      const errorMessage = getSenderClosedErrorMsg(this._entityPath);
      const error = new Error(errorMessage);
      logger.logError(error, `[${this._context.connectionId}] is closed`);
      throw error;
    }
  }

  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  async sendMessages(
    messages:
      | ServiceBusMessage
      | ServiceBusMessage[]
      | ServiceBusMessageBatch
      | AmqpAnnotatedMessage
      | AmqpAnnotatedMessage[],
    options?: OperationOptionsBase
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.connectionId, "messages", messages);

    let batch: ServiceBusMessageBatch;
    if (isServiceBusMessageBatch(messages)) {
      batch = messages;
    } else {
      if (!Array.isArray(messages)) {
        messages = [messages];
      }
      batch = await this.createMessageBatch(options);
      for (const message of messages) {
        throwIfNotValidServiceBusMessage(message, errorInvalidMessageTypeSingleOrArray);
        if (!batch.tryAddMessage(message, options)) {
          // this is too big - throw an error
          throw new ServiceBusError(
            "Messages were too big to fit in a single batch. Remove some messages and try again or create your own batch using createBatch(), which gives more fine-grained control.",
            "MessageSizeExceeded"
          );
        }
      }
    }

    const links: Link[] = batch._messageSpanContexts.map((context) => {
      return {
        context,
      };
    });

    const { span: sendSpan } = createServiceBusSpan(
      "send",
      options,
      this.entityPath,
      this._context.config.host,
      {
        kind: SpanKind.CLIENT,
        links,
      }
    );

    try {
      const result = await this._sender.sendBatch(batch, options);
      sendSpan.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      sendSpan.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      throw error;
    } finally {
      sendSpan.end();
    }
  }

  async createMessageBatch(options?: CreateMessageBatchOptions): Promise<ServiceBusMessageBatch> {
    this._throwIfSenderOrConnectionClosed();
    return this._sender.createBatch(options);
  }

  async scheduleMessages(
    messages:
      | ServiceBusMessage
      | ServiceBusMessage[]
      | AmqpAnnotatedMessage
      | AmqpAnnotatedMessage[],
    scheduledEnqueueTimeUtc: Date,
    options: OperationOptionsBase = {}
  ): Promise<Long[]> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc
    );
    throwTypeErrorIfParameterMissing(this._context.connectionId, "messages", messages);
    const messagesToSchedule = Array.isArray(messages) ? messages : [messages];

    for (const message of messagesToSchedule) {
      throwIfNotValidServiceBusMessage(message, errorInvalidMessageTypeSingleOrArray);
    }

    const scheduleMessageOperationPromise = async (): Promise<Long[]> => {
      return this._context
        .getManagementClient(this._entityPath)
        .scheduleMessages(scheduledEnqueueTimeUtc, messagesToSchedule, {
          ...options,
          associatedLinkName: this._sender.name,
          requestName: "scheduleMessages",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
    };
    const config: RetryConfig<Long[]> = {
      operation: scheduleMessageOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<Long[]>(config);
  }

  async cancelScheduledMessages(
    sequenceNumbers: Long | Long[],
    options: OperationOptionsBase = {}
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    throwTypeErrorIfParameterNotLong(
      this._context.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );

    const sequenceNumbersToCancel = Array.isArray(sequenceNumbers)
      ? sequenceNumbers
      : [sequenceNumbers];
    const cancelSchedulesMessagesOperationPromise = async (): Promise<void> => {
      return this._context
        .getManagementClient(this._entityPath)
        .cancelScheduledMessages(sequenceNumbersToCancel, {
          ...options,
          associatedLinkName: this._sender.name,
          requestName: "cancelScheduledMessages",
          timeoutInMs: this._retryOptions.timeoutInMs,
        });
    };
    const config: RetryConfig<void> = {
      operation: cancelSchedulesMessagesOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal,
    };
    return retry<void>(config);
  }

  // async open(options?: OperationOptionsBase): Promise<void> {
  //   this._throwIfSenderOrConnectionClosed();

  //   const config: RetryConfig<void> = {
  //     // TODO: Pass tracing options too
  //     operation: () => this._sender.open(undefined, options?.abortSignal),
  //     connectionId: this._context.connectionId,
  //     operationType: RetryOperationType.senderLink,
  //     retryOptions: this._retryOptions,
  //     abortSignal: options?.abortSignal
  //   };

  //   return retry<void>(config);
  // }

  async close(): Promise<void> {
    try {
      this._isClosed = true;
      await this._sender.close();
    } catch (err) {
      logger.logError(err, `${this.logPrefix} An error occurred while closing the Sender`);
      throw err;
    }
  }
}

/**
 * @internal
 */
export function isServiceBusMessageBatch(
  messageBatchOrAnything: unknown
): messageBatchOrAnything is ServiceBusMessageBatch {
  if (messageBatchOrAnything == null) {
    return false;
  }

  const possibleBatch = messageBatchOrAnything as ServiceBusMessageBatch;

  return (
    typeof possibleBatch.tryAddMessage === "function" &&
    typeof possibleBatch.maxSizeInBytes === "number" &&
    typeof possibleBatch.sizeInBytes === "number"
  );
}
