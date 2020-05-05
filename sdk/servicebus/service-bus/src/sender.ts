// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import * as log from "./log";
import { MessageSender } from "./core/messageSender";
import { ServiceBusMessage } from "./serviceBusMessage";
import { ClientEntityContext } from "./clientEntityContext";
import {
  getSenderClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterNotLongArray
} from "./util/errors";
import { ServiceBusMessageBatch } from "./serviceBusMessageBatch";
import { CreateBatchOptions, CreateSenderOptions } from "./models";
import {
  retry,
  RetryOperationType,
  RetryConfig,
  RetryOptions,
  MessagingError
} from "@azure/core-amqp";
import { OperationOptions } from "./modelsToBeSharedWithEventHubs";

/**
 * A Sender can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the ServiceBusClient instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 */
export interface Sender {
  /**
   * Sends the given message after creating an AMQP Sender link if it doesnt already exists.
   *
   * To send a message to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the message.
   *
   * @param message - Message to send.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  send(message: ServiceBusMessage, options?: OperationOptions): Promise<void>;
  /**
   * Sends the given messages in a single batch i.e. in a single AMQP message after creating an AMQP
   * Sender link if it doesn't already exist.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - When doing so, all messages in the batch should have the same `sessionId` (if using
   *  sessions) and the same `partitionKey` (if using partitions).
   *
   * @param messages - An array of ServiceBusMessage objects to be sent in a Batch message.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @return Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  send(messages: ServiceBusMessage[], options?: OperationOptions): Promise<void>;
  /**
   * Sends a batch of messages to the associated service-bus entity after creating an AMQP
   * Sender link if it doesn't already exist.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - When doing so, all messages in the batch should have the same `sessionId` (if using
   *  sessions) and the same `partitionKey` (if using partitions).
   *
   * @param {ServiceBusMessageBatch} messageBatch A batch of messages that you can create using the {@link createBatch} method.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns {Promise<void>}
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  send(messageBatch: ServiceBusMessageBatch, options?: OperationOptions): Promise<void>;

  /**
   * Creates an instance of `ServiceBusMessageBatch` to which one can add messages until the maximum supported size is reached.
   * The batch can be passed to the {@link send} method to send the messages to Azure Service Bus.
   * @param options  Configures the behavior of the batch.
   * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
   *
   * @param {CreateBatchOptions} [options]
   * @returns {Promise<ServiceBusMessageBatch>}
   * @throws MessagingError if an error is encountered while sending a message.
   * @throws Error if the underlying connection or sender has been closed.
   */
  createBatch(options?: CreateBatchOptions): Promise<ServiceBusMessageBatch>;

  /**
   * @property Returns `true` if either the sender or the client that created it has been closed
   * @readonly
   */
  isClosed: boolean;
  /**
   * Schedules given message to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param message - The message that needs to be scheduled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<Long> - The sequence number of the message that was scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the message.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling a message.
   */
  scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: ServiceBusMessage,
    options?: OperationOptions
  ): Promise<Long>;

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
   * @param messages - Array of Messages that need to be scheduled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<Long[]> - The sequence numbers of messages that were scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the messages.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling messages.
   */
  scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: ServiceBusMessage[],
    options?: OperationOptions
  ): Promise<Long[]>;

  /**
   * Cancels a message that was scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling a scheduled message.
   */
  cancelScheduledMessage(sequenceNumber: Long, options?: OperationOptions): Promise<void>;
  /**
   * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - An Array of sequence numbers of the messages to be cancelled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling scheduled messages.
   */
  cancelScheduledMessages(sequenceNumbers: Long[], options?: OperationOptions): Promise<void>;

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the sender cannot be used for any further operations.
   * Use the `createSender` function on the QueueClient or TopicClient to instantiate a new Sender
   *
   * @returns {Promise<void>}
   */
  close(): Promise<void>;
}

/**
 * @internal
 * @ignore
 * @class SenderImpl
 * @implements {Sender}
 */
export class SenderImpl implements Sender {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ClientEntityContext;
  private _retryOptions: RetryOptions;
  /**
   * @property Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;
  private _sender: MessageSender;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   */
  constructor(context: ClientEntityContext, retryOptions: RetryOptions = {}) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;
    this._sender = MessageSender.create(this._context, retryOptions);
    this._retryOptions = retryOptions;
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getSenderClosedErrorMsg(
        this._context.entityPath,
        this._context.isClosed
      );
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  public get isClosed(): boolean {
    return this._isClosed || this._context.isClosed;
  }

  async send(message: ServiceBusMessage, options?: OperationOptions): Promise<void>;
  async send(messages: ServiceBusMessage[], options?: OperationOptions): Promise<void>;
  async send(messageBatch: ServiceBusMessageBatch, options?: OperationOptions): Promise<void>;
  async send(
    messageOrMessagesOrBatch: ServiceBusMessage | ServiceBusMessage[] | ServiceBusMessageBatch,
    options?: OperationOptions
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();

    if (Array.isArray(messageOrMessagesOrBatch)) {
      const batch = await this.createBatch(options);

      for (const message of messageOrMessagesOrBatch) {
        if (!batch.tryAdd(message)) {
          // this is too big - throw an error
          const error = new MessagingError(
            "Messages were too big to fit in a single batch. Remove some messages and try again or create your own batch using createBatch(), which gives more fine-grained control."
          );
          error.code = "MessageTooLargeError";
          throw error;
        }
      }

      return this._sender.sendBatch(batch, options);
    } else if (isServiceBusMessageBatch(messageOrMessagesOrBatch)) {
      return this._sender.sendBatch(messageOrMessagesOrBatch, options);
    } else {
      throwTypeErrorIfParameterMissing(
        this._context.namespace.connectionId,
        "message, messages or messageBatch",
        messageOrMessagesOrBatch
      );
      return this._sender.send(messageOrMessagesOrBatch, options);
    }
  }

  async createBatch(options?: CreateBatchOptions): Promise<ServiceBusMessageBatch> {
    this._throwIfSenderOrConnectionClosed();
    return this._sender.createBatch(options);
  }

  /**
   * Schedules given message to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param message - The message that needs to be scheduled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<Long> - The sequence number of the message that was scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the message.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling a message.
   */
  async scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: ServiceBusMessage,
    options: OperationOptions = {}
  ): Promise<Long> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc
    );
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "message", message);

    const scheduleMessageOperationPromise = async () => {
      const result = await this._context.managementClient!.scheduleMessages(
        scheduledEnqueueTimeUtc,
        [message],
        {
          ...options,
          requestName: "scheduleMessage",
          timeoutInMs: this._retryOptions.timeoutInMs
        }
      );
      return result[0];
    };

    const config: RetryConfig<Long> = {
      operation: scheduleMessageOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<Long>(config);
  }

  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: ServiceBusMessage[],
    options: OperationOptions = {}
  ): Promise<Long[]> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc
    );
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "messages", messages);
    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    const scheduleMessageOperationPromise = async () => {
      return this._context.managementClient!.scheduleMessages(scheduledEnqueueTimeUtc, messages, {
        ...options,
        requestName: "scheduleMessages",
        timeoutInMs: this._retryOptions.timeoutInMs
      });
    };
    const config: RetryConfig<Long[]> = {
      operation: scheduleMessageOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<Long[]>(config);
  }

  async cancelScheduledMessage(
    sequenceNumber: Long,
    options: OperationOptions = {}
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );
    throwTypeErrorIfParameterNotLong(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );

    const cancelSchedulesMessagesOperationPromise = async () => {
      return this._context.managementClient!.cancelScheduledMessages([sequenceNumber], {
        ...options,
        requestName: "cancelScheduledMessage",
        timeoutInMs: this._retryOptions.timeoutInMs
      });
    };
    const config: RetryConfig<void> = {
      operation: cancelSchedulesMessagesOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<void>(config);
  }

  async cancelScheduledMessages(
    sequenceNumbers: Long[],
    options: OperationOptions = {}
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    if (!Array.isArray(sequenceNumbers)) {
      sequenceNumbers = [sequenceNumbers];
    }
    throwTypeErrorIfParameterNotLongArray(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );

    const cancelSchedulesMessagesOperationPromise = async () => {
      return this._context.managementClient!.cancelScheduledMessages(sequenceNumbers, {
        ...options,
        requestName: "cancelScheduledMessages",
        timeoutInMs: this._retryOptions.timeoutInMs
      });
    };
    const config: RetryConfig<void> = {
      operation: cancelSchedulesMessagesOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<void>(config);
  }

  async open(options?: CreateSenderOptions): Promise<void> {
    this._throwIfSenderOrConnectionClosed();

    const config: RetryConfig<void> = {
      operation: () => this._sender.open(),
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.senderLink,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };

    return retry<void>(config);
  }

  async close(): Promise<void> {
    try {
      this._isClosed = true;
      if (
        this._context.namespace.connection &&
        this._context.namespace.connection.isOpen() &&
        this._context.sender
      ) {
        await this._context.sender.close();
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the Sender for %s: %O",
        this._context.namespace.connectionId,
        this._context.entityPath,
        err
      );
      throw err;
    }
  }
}

/**
 * @internal
 * @ignore
 */
export function isServiceBusMessageBatch(
  messageBatchOrAnything: any
): messageBatchOrAnything is ServiceBusMessageBatch {
  if (messageBatchOrAnything == null) {
    return false;
  }

  const possibleBatch = messageBatchOrAnything as ServiceBusMessageBatch;

  return (
    typeof possibleBatch.tryAdd === "function" &&
    typeof possibleBatch.maxSizeInBytes === "number" &&
    typeof possibleBatch.sizeInBytes === "number"
  );
}
