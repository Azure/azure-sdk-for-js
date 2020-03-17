// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  send(message: ServiceBusMessage): Promise<void>;

  /**
   * Sends the given messages in a single batch i.e. in a single AMQP message after creating an AMQP
   * Sender link if it doesnt already exists.
   *
   * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages.
   * - When doing so, all
   * messages in the batch should have the same `sessionId` (if using sessions) and the same
   * `parititionKey` (if using paritions).
   *
   * @param messages - An array of SendableMessageInfo objects to be sent in a Batch message.
   * @return Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while sending messages to the service.
   */
  sendBatch(messages: ServiceBusMessage[]): Promise<void>;
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
   * @returns Promise<Long> - The sequence number of the message that was scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the message.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling a message.
   */
  scheduleMessage(scheduledEnqueueTimeUtc: Date, message: ServiceBusMessage): Promise<Long>;

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
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
  scheduleMessages(scheduledEnqueueTimeUtc: Date, messages: ServiceBusMessage[]): Promise<Long[]>;

  /**
   * Cancels a message that was scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling a scheduled message.
   */
  cancelScheduledMessage(sequenceNumber: Long): Promise<void>;
  /**
   * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - An Array of sequence numbers of the messages to be cancelled.
   * @returns Promise<void>
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while canceling scheduled messages.
   */
  cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void>;

  /**
   * Closes the underlying AMQP sender link.
   * Once closed, the sender cannot be used for any further operations.
   * Use the `createSender` function on the QueueClient or TopicClient to instantiate a new Sender
   *
   * @returns {Promise<void>}
   */
  close(): Promise<void>;
}

export class SenderImpl implements Sender {
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

  public get isClosed(): boolean {
    return this._isClosed || this._context.isClosed;
  }

  async send(message: ServiceBusMessage): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfParameterMissing(this._context.namespace.connectionId, "message", message);
    const sender = MessageSender.create(this._context);
    return sender.send(message);
  }

  async sendBatch(messages: ServiceBusMessage[]): Promise<void> {
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
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param message - The message that needs to be scheduled.
   * @returns Promise<Long> - The sequence number of the message that was scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the message.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   * @throws Error if the underlying connection, client or sender is closed.
   * @throws MessagingError if the service returns an error while scheduling a message.
   */
  async scheduleMessage(scheduledEnqueueTimeUtc: Date, message: ServiceBusMessage): Promise<Long> {
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

  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: ServiceBusMessage[]
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
