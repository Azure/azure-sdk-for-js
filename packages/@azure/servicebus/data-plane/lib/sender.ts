// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Long from "long";
import * as log from "./log";
import { MessageSender } from "./core/messageSender";
import { SendableMessageInfo } from "./serviceBusMessage";
import { ScheduleMessage } from "./core/managementClient";
import { ClientEntityContext } from "./clientEntityContext";

export class Sender {
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the QueueClient.
   */
  private _context: ClientEntityContext;

  constructor(context: ClientEntityContext) {
    this._context = context;
  }
  /**
   * Sends the given message to a ServiceBus Queue.
   * To send a message to a `session` or `partition` enabled Queue, please set the
   * `sessionId` property and `partitionKey` properties respectively.
   *
   * @param message - Message to send.
   * @returns Promise<void>
   */
  async send(message: SendableMessageInfo): Promise<void> {
    const sender = MessageSender.create(this._context);
    return sender.send(message);
  }

  /**
   * Sends a batch of SendableMessageInfo to the ServiceBus Queue in a single AMQP message.
   * To send messages to a `session` or `partition` enabled Queue, set the
   * `sessionId` property and `partitionKey` properties respectively. When doing so, all
   * messages in the batch should have the same `sessionId` (if using sessions) and the same
   * `parititionKey` (if using paritions) properties.
   *
   * @param messages - An array of SendableMessageInfo objects to be sent in a Batch message.
   * @return Promise<void>
   */
  async sendBatch(messages: SendableMessageInfo[]): Promise<void> {
    const sender = MessageSender.create(this._context);
    return sender.sendBatch(messages);
  }

  /**
   * Schedules a message to appear on Service Bus Queue at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param message - The message that needs to be scheduled.
   * @returns Promise<Long> - The sequence number of the message that was
   * scheduled. Please save the `Long` type as-is in your application. Do not convert it to a
   * number as that may cause loss of precision, since JS only supports 53 bit numbers.
   * `Long` type provides methods for mathematical operations.
   * If you want to save it to a log file, then save the stringifed form
   * `const result = Long.toString();`. When deserializing it, please use
   * `Long.fromString("result");`. This will ensure that precision is preserved.
   */
  async scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: SendableMessageInfo
  ): Promise<Long> {
    const scheduleMessages: ScheduleMessage[] = [
      { message: message, scheduledEnqueueTimeUtc: scheduledEnqueueTimeUtc }
    ];
    const result = await this._context.managementClient!.scheduleMessages(scheduleMessages);
    return result[0];
  }

  /**
   * Schedules a message to appear on Service Bus Queue at a later time.
   *
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be enqueued.
   * @param messages - Array of Messages that need to be scheduled.
   * @returns Promise<Long[]> - The sequence numbers of messages that were scheduled. Please
   * save the `Long` type as-is in your application. Do not convert it to a number as that may
   * cause loss of precision, since JS only supports 53 bit numbers. `Long` type provides methods
   * for mathematical operations. If you want to save it to a log file, then save the stringifed
   * form `const result = Long.toString();`. When deserializing it, please use
   * `Long.fromString("result");`. This will ensure that precision is preserved.
   */
  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: SendableMessageInfo[]
  ): Promise<Long[]> {
    const scheduleMessages: ScheduleMessage[] = messages.map((message) => {
      return {
        message,
        scheduledEnqueueTimeUtc
      };
    });
    return this._context.managementClient!.scheduleMessages(scheduleMessages);
  }

  /**
   * Cancels a message that was scheduled to appear on a ServiceBus Queue.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
    return this._context.managementClient!.cancelScheduledMessages([sequenceNumber]);
  }

  /**
   * Cancels an array of messages that were scheduled to appear on a ServiceBus Queue.
   * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
    return this._context.managementClient!.cancelScheduledMessages(sequenceNumbers);
  }

  /**
   * Closes the underlying AMQP sender link.
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
    } catch (err) {
      const msg =
        `An error occurred while closing the sender for` +
        `"${this._context.entityPath}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }
}
