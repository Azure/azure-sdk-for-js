// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Long from "long";
import * as log from "./log";
import { MessageSender } from "./core/messageSender";
import { ServiceBusMessage, isServiceBusMessage } from "./serviceBusMessage";
import { ClientEntityContext } from "./clientEntityContext";
import {
  getSenderClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong
} from "./util/errors";
import { ServiceBusMessageBatch } from "./serviceBusMessageBatch";
import { CreateBatchOptions, SenderOpenOptions } from "./models";
import {
  MessagingError,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  retry
} from "@azure/core-amqp";
import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";

/**
 * A Sender can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the ServiceBusClient instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 */
export interface Sender {
  /**
   * Sends the given messages after creating an AMQP Sender link if it doesn't already exist.
   * Consider awaiting on open() beforehand to front load the work of link creation if needed.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - All messages passed to the same sendMessages() call should have the same `sessionId` (if using
   *  sessions) and the same `partitionKey` (if using partitions).
   *
   * @param messages - A single message or an array of messages or a batch of messages created via the createBatch()
   * method to send.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @return Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  sendMessages(
    messages: ServiceBusMessage | ServiceBusMessage[] | ServiceBusMessageBatch,
    options?: OperationOptionsBase
  ): Promise<void>;

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
   * Opens the AMQP link to Azure Service Bus from the sender.
   *
   * It is not necessary to call this method in order to use the sender. It is
   * recommended to call this before your first sendMessages() call if you
   * want to front load the work of setting up the AMQP link to the service.
   *
   * @param options - Options bag to pass an abort signal.
   */
  open(options?: SenderOpenOptions): Promise<void>;

  /**
   * @property Returns `true` if either the sender or the client that created it has been closed
   * @readonly
   */
  isClosed: boolean;

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
   * @param messages - Message or an array of messages that need to be scheduled.
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
    messages: ServiceBusMessage | ServiceBusMessage[],
    options?: OperationOptionsBase
  ): Promise<Long[]>;

  /**
   * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - Sequence number or an array of sequence numbers of the messages to be cancelled.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling scheduled messages.
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
  public entityPath: string;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   */
  constructor(context: ClientEntityContext, retryOptions: RetryOptions = {}) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;
    this.entityPath = context.entityPath;
    this._sender = MessageSender.create(this._context, retryOptions);
    this._retryOptions = retryOptions;
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getSenderClosedErrorMsg(this._context.entityPath);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  public get isClosed(): boolean {
    return this._isClosed || this._context.isClosed;
  }

  async sendMessages(
    messages: ServiceBusMessage | ServiceBusMessage[] | ServiceBusMessageBatch,
    options?: OperationOptionsBase
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "messages", messages);
    const invalidTypeErrMsg =
      "Provided value for 'messages' must be of type ServiceBusMessage, ServiceBusMessageBatch or an array of type ServiceBusMessage.";

    if (Array.isArray(messages)) {
      const batch = await this.createBatch(options);

      for (const message of messages) {
        if (!isServiceBusMessage(message)) {
          throw new TypeError(invalidTypeErrMsg);
        }
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
    } else if (isServiceBusMessageBatch(messages)) {
      return this._sender.sendBatch(messages, options);
    } else if (isServiceBusMessage(messages)) {
      return this._sender.send(messages, options);
    }
    throw new TypeError(invalidTypeErrMsg);
  }

  async createBatch(options?: CreateBatchOptions): Promise<ServiceBusMessageBatch> {
    this._throwIfSenderOrConnectionClosed();
    return this._sender.createBatch(options);
  }

  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: ServiceBusMessage | ServiceBusMessage[],
    options: OperationOptionsBase = {}
  ): Promise<Long[]> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc
    );
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "messages", messages);
    const messagesToSchedule = Array.isArray(messages) ? messages : [messages];

    for (const message of messagesToSchedule) {
      if (!isServiceBusMessage(message)) {
        throw new TypeError(
          "Provided value for 'messages' must be of type ServiceBusMessage or an array of type ServiceBusMessage."
        );
      }
    }

    const scheduleMessageOperationPromise = async () => {
      return this._context.managementClient!.scheduleMessages(
        scheduledEnqueueTimeUtc,
        messagesToSchedule,
        {
          ...options,
          requestName: "scheduleMessages",
          timeoutInMs: this._retryOptions.timeoutInMs
        }
      );
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

  async cancelScheduledMessages(
    sequenceNumbers: Long | Long[],
    options: OperationOptionsBase = {}
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    throwTypeErrorIfParameterNotLong(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );

    const sequenceNumbersToCancel = Array.isArray(sequenceNumbers)
      ? sequenceNumbers
      : [sequenceNumbers];
    const cancelSchedulesMessagesOperationPromise = async () => {
      return this._context.managementClient!.cancelScheduledMessages(sequenceNumbersToCancel, {
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

  async open(options?: SenderOpenOptions): Promise<void> {
    this._throwIfSenderOrConnectionClosed();

    const config: RetryConfig<void> = {
      operation: () => this._sender.open(undefined, options?.abortSignal),
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
