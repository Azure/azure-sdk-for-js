// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import Long from "long";
import { MessageSender } from "./core/messageSender.js";
import { ServiceBusMessage } from "./serviceBusMessage.js";
import { ConnectionContext } from "./connectionContext.js";
import {
  errorInvalidMessageTypeSingleOrArray,
  getSenderClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwIfNotValidServiceBusMessage,
  throwTypeErrorIfNotInstanceOfParameterType,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
} from "./util/errors.js";
import { ServiceBusMessageBatch } from "./serviceBusMessageBatch.js";
import { CreateMessageBatchOptions } from "./models.js";
import {
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  retry,
  AmqpAnnotatedMessage,
} from "@azure/core-amqp";
import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs.js";
import { TracingSpanLink } from "@azure/core-tracing";
import { senderLogger as logger } from "./log.js";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing.js";
import { ensureValidIdentifier } from "./util/utils.js";
import { ServiceBusError } from "./serviceBusError.js";
import { instrumentMessage } from "./diagnostics/instrumentServiceBusMessage.js";

/**
 * A Sender can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the ServiceBusClient to instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 */
export interface ServiceBusSender {
  /**
   * A name used to identify the sender. This can be used to correlate logs and exceptions.
   * If not specified or empty, a random unique one will be generated.
   */
  identifier: string;
  /**
   * Sends the given messages after creating an AMQP Sender link if it doesn't already exist.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - All messages passed to the same sendMessages() call should have the same `sessionId` (if using
   *  sessions) and the same `partitionKey` (if using partitions).
   *
   * **Note:**
   *
   *    __If you want to send messages of size greater than 1MB, please send individual messages instead of sending a batched message or an array of messages like below.__
   *
   *  `await sender.sendMessages(message);`
   *
   * __This is because the batched messages are not capable of sending the larger messages yet. You'll hit the `force detached` error in this case otherwise. Read [service-bus-premium-messaging#large-messages-support](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-premium-messaging#large-messages-support). More info at [#23014](https://github.com/Azure/azure-sdk-for-js/pull/23014).__
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
    options?: OperationOptionsBase,
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
    options?: OperationOptionsBase,
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
    options?: OperationOptionsBase,
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
  public identifier: string;
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
    retryOptions: RetryOptions = {},
    identifier?: string,
  ) {
    throwErrorIfConnectionClosed(_context);
    this.entityPath = _entityPath;
    this.identifier = ensureValidIdentifier(this.entityPath, identifier);
    this._sender = MessageSender.create(this.identifier, this._context, _entityPath, retryOptions);
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
    options?: OperationOptionsBase,
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.connectionId, "messages", messages);

    if (!isServiceBusMessageBatch(messages) && !Array.isArray(messages)) {
      // Case 1: Single message
      throwIfNotValidServiceBusMessage(messages, errorInvalidMessageTypeSingleOrArray);
      const originalMessage = messages as ServiceBusMessage | AmqpAnnotatedMessage;
      const { message, spanContext } = instrumentMessage(
        originalMessage,
        options ?? {},
        this.entityPath,
        this._context.config.host,
        "publish",
      );
      const spanLinks: TracingSpanLink[] = spanContext ? [{ tracingContext: spanContext }] : [];
      return tracingClient.withSpan(
        "ServiceBusSender.send",
        options ?? {},
        (updatedOptions) => this._sender.send(message, updatedOptions),
        {
          spanLinks,
          ...toSpanOptions(
            { entityPath: this.entityPath, host: this._context.config.host },
            "publish",
            "client",
          ),
        },
      );
    }

    let batch: ServiceBusMessageBatch;
    if (isServiceBusMessageBatch(messages)) {
      // Case 2: Batch message
      batch = messages;
    } else {
      // Case 3: Array of messages
      batch = await this.createMessageBatch(options);
      for (const message of messages) {
        throwIfNotValidServiceBusMessage(message, errorInvalidMessageTypeSingleOrArray);
        if (!batch.tryAddMessage(message, options)) {
          // this is too big - throw an error
          throw new ServiceBusError(
            "Messages were too big to fit in a single batch. Remove some messages and try again or create your own batch using createBatch(), which gives more fine-grained control.",
            "MessageSizeExceeded",
          );
        }
      }
    }

    const spanLinks: TracingSpanLink[] = batch._messageSpanContexts.map((tracingContext) => {
      return {
        tracingContext,
      };
    });

    return tracingClient.withSpan(
      "ServiceBusSender.send",
      options ?? {},
      (updatedOptions) => this._sender.sendBatch(batch, updatedOptions),
      {
        spanLinks,
        ...toSpanOptions(
          { entityPath: this.entityPath, host: this._context.config.host },
          "publish",
          "client",
        ),
      },
    );
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
    options: OperationOptionsBase = {},
  ): Promise<Long[]> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc,
    );
    throwTypeErrorIfNotInstanceOfParameterType(
      this._context.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc,
      Date,
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
    options: OperationOptionsBase = {},
  ): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "sequenceNumbers",
      sequenceNumbers,
    );
    throwTypeErrorIfParameterNotLong(
      this._context.connectionId,
      "sequenceNumbers",
      sequenceNumbers,
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
    } catch (err: any) {
      logger.logError(err, `${this.logPrefix} An error occurred while closing the Sender`);
      throw err;
    }
  }
}

/**
 * @internal
 */
export function isServiceBusMessageBatch(
  messageBatchOrAnything: unknown,
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
