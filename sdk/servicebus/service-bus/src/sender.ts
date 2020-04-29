// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import Long from "long";
import * as log from "./log";
import { MessageSender } from "./core/messageSender";
import { SendableMessageInfo } from "./serviceBusMessage";
import { ClientEntityContext } from "./clientEntityContext";
import {
  getSenderClosedErrorMsg,
  throwErrorIfConnectionClosed,
  throwTypeErrorIfParameterMissing,
  throwTypeErrorIfParameterNotLong,
  throwTypeErrorIfParameterNotLongArray
} from "./util/errors";

/**
 * The Sender class can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the QueueClient or TopicClient to instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 * @class Sender
 */
export class Sender {
  /**
   * @property Describes the amqp connection context for the Client.
   */
  private _context: ClientEntityContext;
  /**
   * @property Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   */
  constructor(context: ClientEntityContext) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this.isClosed) {
      const errorMessage = getSenderClosedErrorMsg(
        this._context.entityPath,
        this._context.clientType,
        this._context.isClosed
      );
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }
  }

  /**
   * @property Returns `true` if either the sender or the client that created it has been closed
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed || this._context.isClosed;
  }

  /**
   * Sends the given message after creating an AMQP Sender link if it doesnt already exists.
   *
   * To send a message to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the message.
   *
   * @param message - Message to send.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  async send(message: SendableMessageInfo): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "message", message);
    const sender = MessageSender.create(this._context);
    return sender.send(message);
  }

  /**
   * Opens the AMQP link to Azure Service Bus from the sender.
   *
   * It is not necessary to call this method in order to use the sender. It is
   * recommended to call this before your first send() or sendBatch() call if you
   * want to front load the work of setting up the AMQP link to the service.
   */
  async open(): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    return MessageSender.create(this._context).open();
  }

  /**
   * Sends the given messages in a single batch i.e. in a single AMQP message after creating an AMQP
   * Sender link if it doesnt already exists.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - When doing so, all
   * messages in the batch should have the same `sessionId` (if using sessions) and the same
   * `partitionKey` (if using partitions).
   *
   * @param messages - An array of SendableMessageInfo objects to be sent in a Batch message.
   * @return Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  async sendBatch(messages: SendableMessageInfo[]): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "messages", messages);
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    const sender = MessageSender.create(this._context);
    return sender.sendBatch(messages);
  }

  /**
   * Schedules given message to appear on Service Bus Queue/Subscription at a later time.
   *
   * Please note that you need to explicitly encode the message body if you intend to receive the message using a tool or library other than this library.
   * For example:
   *  1. Import DefaultDataTransformer and instantiate.
   *      ```js
   *        const dt = new DefaultDataTransformer();
   *      ```
   *  2. Use the `encode` method on the transformer to encode the message body before calling the scheduleMessage() method
   *      ```js
   *        message.body = dt.encode(message.body);
   *      ```
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param message - The message that needs to be scheduled.
   * @returns Promise<Long> - The sequence number of the message that was scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the message.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling a message.
   */
  async scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: SendableMessageInfo
  ): Promise<Long> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(
      this._context.namespace.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc
    );
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "message", message);

    const messages = [message];
    const result = await this._context.managementClient!.scheduleMessages(
      scheduledEnqueueTimeUtc,
      messages
    );
    return result[0];
  }

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
   *
   * Please note that you need to explicitly encode the message body if you intend to receive the message using a tool or library other than this library.
   * For example:
   *  1. Import DefaultDataTransformer and instantiate.
   *      ```js
   *        const dt = new DefaultDataTransformer();
   *      ```
   *  2. Use the `encode` method on the transformer to encode the message body before calling the scheduleMessage() method
   *      ```js
   *        message.body = dt.encode(message.body);
   *      ```
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
   * @param messages - Array of Messages that need to be scheduled.
   * @returns Promise<Long[]> - The sequence numbers of messages that were scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the messages.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling messages.
   */
  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: SendableMessageInfo[]
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

    return this._context.managementClient!.scheduleMessages(scheduledEnqueueTimeUtc, messages);
  }

  /**
   * Cancels a message that was scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling a scheduled message.
   */
  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
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

    return this._context.managementClient!.cancelScheduledMessages([sequenceNumber]);
  }

  /**
   * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - An Array of sequence numbers of the messages to be cancelled.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling scheduled messages.
   */
  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
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

    return this._context.managementClient!.cancelScheduledMessages(sequenceNumbers);
  }

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the sender cannot be used for any further operations.
   * Use the `createSender` function on the QueueClient or TopicClient to instantiate a new Sender
   *
   * @returns {Promise<void>}
   */
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
