// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import Long from "long";
import * as log from "./log";
import { MessageSender } from "./core/messageSender";
import { SendableMessageInfo } from "./serviceBusMessage";
import { ScheduleMessage } from "./core/managementClient";
import { ClientEntityContext } from "./clientEntityContext";
import {
  throwErrorIfConnectionClosed,
  getSenderClosedErrorMsg,
  throwTypeErrorIfMissingParameter,
  throwParameterInstanceCheckError
} from "./util/utils";

/**
 * The Sender class can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the QueueClient or TopicClient to instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 * @class Sender
 */
export class Sender {
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the Client.
   */
  private _context: ClientEntityContext;
  private _isClosed: boolean = false;

  /**
   * @property {boolean} [isClosed] Denotes if close() was called on this sender.
   * @readonly
   */
  public get isClosed(): boolean {
    return this._isClosed;
  }

  /**
   * @internal
   */
  constructor(context: ClientEntityContext) {
    throwErrorIfConnectionClosed(context.namespace);
    this._context = context;
  }
  /**
   * Sends the given message after creating an AMQP Sender link if it doesnt already exists.
   *
   * To send a message to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the message.
   *
   * @param message - Message to send.
   * @returns Promise<void>
   */
  async sendMessage(message: SendableMessageInfo): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    const sender = MessageSender.create(this._context);
    return sender.send(message);
  }

  /**
   * Sends the given messages in a batch i.e. in a single AMQP message after creating an AMQP Sender
   * link if it doesnt already exists.
   *
   * To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
   * and/or `partitionKey` properties respectively on the messages. When doing so, all
   * messages in the batch should have the same `sessionId` (if using sessions) and the same
   * `parititionKey` (if using paritions).
   *
   * @param messages - An array of SendableMessageInfo objects to be sent in a Batch message.
   * @return Promise<void>
   */
  async sendMessages(messages: SendableMessageInfo[]): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
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
   */
  async scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: SendableMessageInfo
  ): Promise<Long> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfMissingParameter(this._context.namespace.connectionId, "message", message);

    const result = await this.scheduleMessages(scheduledEnqueueTimeUtc, [message]);
    return result[0];
  }

  /**
   * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
   * @param messages - Array of Messages that need to be scheduled.
   * @returns Promise<Long[]> - The sequence numbers of messages that were scheduled.
   * You will need the sequence number if you intend to cancel the scheduling of the messages.
   * Save the `Long` type as-is in your application without converting to number. Since JavaScript
   * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
   */
  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: SendableMessageInfo[]
  ): Promise<Long[]> {
    this._throwIfSenderOrConnectionClosed();

    // Checks for scheduledEnqueueTimeUtc
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "scheduledEnqueueTimeUtc",
      scheduledEnqueueTimeUtc
    );
    if (!(scheduledEnqueueTimeUtc instanceof Date)) {
      throwParameterInstanceCheckError(
        this._context.namespace.connectionId,
        "scheduledEnqueueTimeUtc",
        "Date"
      );
    }
    const now = Date.now();
    const enqueueTimeInMs = scheduledEnqueueTimeUtc.getTime();
    if (enqueueTimeInMs < now) {
      const error = new Error(
        `Cannot schedule messages in the past. Given scheduledEnqueueTimeUtc` +
          `(${enqueueTimeInMs}) is before the current time (${now}).`
      );
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }

    // Checks for messages
    throwTypeErrorIfMissingParameter(this._context.namespace.connectionId, "messages", messages);
    if (!Array.isArray(messages)) {
      const error = new TypeError(
        `The parameter "messages" should be an array of items that implement the interface "SendableMessageInfo"`
      );
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }
    try {
      messages.forEach((item) => SendableMessageInfo.validate(item));
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Error validating given message: ${error.message}`;
      } else {
        error = new TypeError(`Error validating given message: ${JSON.stringify}`);
      }
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }

    const scheduleMessages: ScheduleMessage[] = messages.map((message) => {
      return {
        message,
        scheduledEnqueueTimeUtc
      };
    });
    return this._context.managementClient!.scheduleMessages(scheduleMessages);
  }

  /**
   * Cancels a message that was scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "sequenceNumber",
      sequenceNumber
    );
    if (!Long.isLong(sequenceNumber)) {
      throwParameterInstanceCheckError(
        this._context.namespace.connectionId,
        "sequenceNumber",
        "Long"
      );
    }
    return this._context.managementClient!.cancelScheduledMessages([sequenceNumber]);
  }

  /**
   * Cancels an array of messages that were scheduled to appear on a ServiceBus Queue/Subscription.
   * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
    this._throwIfSenderOrConnectionClosed();
    throwTypeErrorIfMissingParameter(
      this._context.namespace.connectionId,
      "sequenceNumbers",
      sequenceNumbers
    );
    if (!Array.isArray(sequenceNumbers) || sequenceNumbers.some((item) => !Long.isLong(item))) {
      const error = new TypeError(
        `The parameter "sequenceNumbers" should be an array of items of type "Long"`
      );
      log.error(`[${this._context.namespace.connectionId}] ${error}`);
      throw error;
    }
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
      if (
        this._context.namespace.connection &&
        this._context.namespace.connection.isOpen() &&
        this._context.sender
      ) {
        await this._context.sender.close();
      }
      this._isClosed = true;
    } catch (err) {
      err = err instanceof Error ? err : new Error(JSON.stringify(err));
      log.error(
        `An error occurred while closing the sender for "${this._context.entityPath}":\n${err}`
      );
      throw err;
    }
  }

  private _throwIfSenderOrConnectionClosed(): void {
    throwErrorIfConnectionClosed(this._context.namespace);
    if (this._isClosed) {
      const errorMessage = getSenderClosedErrorMsg(
        this._context.entityPath,
        this._context.clientType
      );
      log.error(`[${this._context.namespace.connectionId}] ${errorMessage}`);
      throw new Error(errorMessage);
    }
  }
}
