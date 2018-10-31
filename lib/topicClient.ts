// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as Long from "long";
import * as log from "./log";
import { Delivery } from "rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { MessageSender } from "./messageSender";
import { SendableMessageInfo } from "./serviceBusMessage";
import { Client } from "./client";
import { ScheduleMessage } from "./managementClient";



/**
 * Describes the TopicClient that is used to interact with a ServiceBus Topic.
 * @class TopicClient
 */
export class TopicClient extends Client {
  /**
   * Instantiates a client pointing to the ServiceBus Topic given by this configuration.
   *
   * @constructor
   * @param name - The topic name.
   * @param context - The connection context to create the TopicClient.
   * @param [options] - The TopicClient options.
   */
  constructor(name: string, context: ConnectionContext) {
    super(name, context);
  }

  /**
   * Closes the AMQP connection to the ServiceBus Topic for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns {Promise<any>}
   */
  async close(): Promise<any> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the sender.
        if (this._context.sender) {
          await this._context.sender.close();
        }
        log.topicClient("Closed the topic client '%s'.", this.id);
      }
    } catch (err) {
      const msg = `An error occurred while closing the topic client ` +
        `"${this.id}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Sends the given message to the ServiceBus Topic.
   *
   * @param data - Message to send.  Will be sent as UTF8-encoded JSON string.
   * @returns Promise<Delivery>
   */
  async send(data: SendableMessageInfo): Promise<Delivery> {
    const sender = MessageSender.create(this._context);
    return await sender.send(data);
  }

  /**
   * Sends a batch of Message to the ServiceBus Topic. The "message_annotations",
   * "application_properties" and "properties" of the first message will be set as that of
   * the envelope (batch message).
   *
   * @param datas  An array of Message objects to be sent in a Batch message.
   *
   * @return Promise<Delivery>
   */
  async sendBatch(datas: SendableMessageInfo[]): Promise<Delivery> {
    const sender = MessageSender.create(this._context);
    return await sender.sendBatch(datas);
  }

  /**
   * Schedules a message to appear on Service Bus at a later time.
   *
   * @param message - The message that needs to be scheduled.
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be available
   * for processing.
   * @returns Promise<Long> - The sequence number of the message that was
   * scheduled. Please save the `Long` type as-is in your application. Do not convert it to a
   * number as that may cause loss of precision, since JS only supports 53 bit numbers.
   * `Long` type provides methods for mathematical operations.
   * If you want to save it to a log file, then save the stringifed form
   * `const result = Long.toString();`. When deserializing it, please use
   * `Long.fromString("result");`. This will ensure that precision is preserved.
   */
  async scheduleMessage(message: SendableMessageInfo, scheduledEnqueueTimeUtc: Date): Promise<Long> {
    const scheduleMessages: ScheduleMessage[] = [
      { message: message, scheduledEnqueueTimeUtc: scheduledEnqueueTimeUtc }
    ];
    const result = await this._context.managementClient!.scheduleMessages(scheduleMessages);
    return result[0];
  }

  /**
   * Schedules a message to appear on a servicebus topic at a later time.
   *
   * @param message - Message that needs to be scheduled.
   * @param scheduledEnqueueTimeUtc - The UTC time at which the message should be available
   * for processing.
   * @returns Promise<Long[]> - The sequence numbers of messages that were scheduled. Please
   * save the `Long` type as-is in your application. Do not convert it to a number as that may
   * cause loss of precision, since JS only supports 53 bit numbers. `Long` type provides methods
   * for mathematical operations. If you want to save it to a log file, then save the stringifed
   * form `const result = Long.toString();`. When deserializing it, please use
   * `Long.fromString("result");`. This will ensure that precision is preserved.
   */
  async scheduleMessages(messages: ScheduleMessage[]): Promise<Long[]> {
    return await this._context.managementClient!.scheduleMessages(messages);
  }

  /**
   * Cancels a message that was scheduled to appear on a servicebus topic.
   * @param sequenceNumber - The sequence number of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
    return await this._context.managementClient!.cancelScheduledMessages([sequenceNumber]);
  }

  /**
   * Cancels an array of messages that were scheduled to appear on a servicebus topic.
   * @param sequenceNumbers - An Array of sequence numbers of the message to be cancelled.
   * @returns Promise<void>
   */
  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
    return await this._context.managementClient!.cancelScheduledMessages(sequenceNumbers);
  }
}
