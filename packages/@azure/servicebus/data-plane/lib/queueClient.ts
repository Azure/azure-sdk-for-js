// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Long from "long";
import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { MessageSender } from "./core/messageSender";
import { StreamingReceiver, ReceiveHandler, MessageHandlerOptions } from "./core/streamingReceiver";
import { BatchingReceiver } from "./core/batchingReceiver";
import {
  ServiceBusMessage,
  SendableMessageInfo,
  ReceivedMessageInfo,
  ReceiveMode
} from "./serviceBusMessage";
import { Client } from "./client";
import { ReceiveOptions, OnError, OnMessage } from "./core/messageReceiver";
import { ScheduleMessage, ListSessionsResponse } from "./core/managementClient";
import { SessionClient, SessionClientOptions } from "./session/messageSession";

/**
 * Describes the options that can be provided while creating the QueueClient.
 * @interface QueueClientOptions
 */
export interface QueueClientOptions {
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode?: ReceiveMode;
}

export class QueueClient extends Client {
  /**
   * @property {number} receiveMode The mode in which messages should be received.
   * Possible values are `ReceiveMode.peekLock` (default) and `ReceiveMode.receiveAndDelete`
   */
  receiveMode: ReceiveMode;

  /**
   * Instantiates a client pointing to the ServiceBus Queue given by this configuration.
   * This is not meant for the user to call directly.
   * The user should use the `createQueueClient` on the Namespace instead.
   *
   * @constructor
   * @param name The Queue name.
   * @param context The connection context to create the QueueClient.
   * @param [options] The QueueClient options.
   */
  constructor(name: string, context: ConnectionContext, options?: QueueClientOptions) {
    super(name, context);
    if (!options) options = {};
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
  }

  /**
   * Closes the AMQP connection to the ServiceBus Queue for this client.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        const connectionId = this._context.namespace.connectionId;
        // Close the sender.
        if (this._context.sender) {
          log.qClient("[%s] Closing the Sender for queue '%s'.", connectionId, this.name);
          await this._context.sender.close();
        }

        // Close the sessionManager.
        if (this._context.sessionManager) {
          log.qClient("[%s] Closing the SessionMaanger for queue '%s'.", connectionId, this.name);
          this._context.sessionManager.close();
        }

        // Close the streaming receiver.
        if (this._context.streamingReceiver) {
          log.qClient(
            "[%s] Closing the StreamingReceiver for queue '%s'.",
            connectionId,
            this.name
          );
          await this._context.streamingReceiver.close();
        }

        // Close the batching receiver.
        if (this._context.batchingReceiver) {
          log.qClient("[%s] Closing the BatchingReceiver for queue '%s'.", connectionId, this.name);
          await this._context.batchingReceiver.close();
        }

        // Close all the MessageSessions.
        for (const messageSessionId of Object.keys(this._context.messageSessions)) {
          log.qClient(
            "[%s] Closing the MessageSession '%s' for queue '%s'.",
            connectionId,
            messageSessionId,
            this.name
          );
          await this._context.messageSessions[messageSessionId].close();
        }

        // Make sure that we clear the map of deferred messages
        this._context.requestResponseLockedMessages.clear();

        log.qClient("Closed the Queue client '%s'.", this.id);
      }
    } catch (err) {
      const msg =
        `An error occurred while closing the queue client ` +
        `"${this.id}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Sends the given message to a ServiceBus Queue.
   * - For sending a message to a `session` enabled Queue, please set the `sessionId` property of
   * the message.
   * - For sending a message to a `partition` enabled Queue, please set the `partitionKey` property
   * of the message.
   * For more information please see {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-partitioning#use-of-partition-keys Use of partition keys}
   *
   * @param data - Message to send.
   * @returns Promise<void>
   */
  async send(data: SendableMessageInfo): Promise<void> {
    const sender = MessageSender.create(this._context);
    return sender.send(data);
  }

  /**
   * Sends a batch of SendableMessageInfo to the ServiceBus Queue in a single AMQP message.
   * - For sending a message to a `session` enabled Queue, please set the `sessionId` property of
   * the message.
   * - For sending a message to a `partition` enabled Queue, please set the `partitionKey` property
   * of the message.
   * For more information please see {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-partitioning#use-of-partition-keys Use of partition keys}
   *
   * @param datas - An array of SendableMessageInfo objects to be sent in a Batch message.
   * @return Promise<void>
   */
  async sendBatch(datas: SendableMessageInfo[]): Promise<void> {
    const sender = MessageSender.create(this._context);
    return sender.sendBatch(datas);
  }

  /**
   * Starts the receiver in streaming mode by establishing an AMQP session and an AMQP receiver
   * link on the session.
   *
   * @param onMessage - Callback for each incoming message.
   * @param onError - Callback for any error that occurs while receiving messages.
   * @param options - Options to control whether messages should be automatically completed or
   * automatically have their locks renewed.
   *
   * @returns ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(onMessage: OnMessage, onError: OnError, options?: MessageHandlerOptions): ReceiveHandler {
    if (this._context.streamingReceiver && this._context.streamingReceiver.isOpen()) {
      const rcvr = this._context.streamingReceiver;
      const msg =
        `A "${rcvr.receiverType}" receiver with id "${rcvr.name}" has already been ` +
        `created for the Queue "${this.name}". Another receive() call cannot be made while the ` +
        `previous one is active. Please stop the previous receive() by calling ` +
        `"receiveHandler.stop()".`;
      throw new Error(msg);
    }

    if (!options) options = {};
    const rcvOptions: ReceiveOptions = {
      maxConcurrentCalls: 1,
      receiveMode: this.receiveMode,
      autoComplete: options.autoComplete,
      maxAutoRenewDurationInSeconds: options.maxAutoRenewDurationInSeconds
    };
    const sReceiver = StreamingReceiver.create(this._context, rcvOptions);
    this._context.streamingReceiver = sReceiver;
    return sReceiver.receive(onMessage, onError);
  }

  /**
   * Receives a batch of Message objects from a ServiceBus Queue for a given count and a
   * given max wait time in seconds, whichever happens first.
   * @param maxMessageCount      The maximum message count. Must be a value greater than 0.
   * @param maxWaitTimeInSeconds The maximum wait time in seconds for which the Receiver
   * should wait to receive the said amount of messages. If not provided, it defaults to 60 seconds.
   * @param maxMessageWaitTimeoutInSeconds The maximum amount of idle time the Receiver
   * will wait after creating the link or after receiving a new message. If no messages are received
   * in that time frame then the batch receive operation ends. It is advised to keep this value at
   * 10% of the lockDuration value.
   * - **Default**: `2` seconds.
   * @returns Promise<ServiceBusMessage[]> A promise that resolves with an array of Message objects.
   */
  async receiveBatch(
    maxMessageCount: number,
    maxWaitTimeInSeconds?: number,
    maxMessageWaitTimeoutInSeconds?: number
  ): Promise<ServiceBusMessage[]> {
    let bReceiver = this._context.batchingReceiver;
    if (bReceiver && bReceiver.isOpen() && bReceiver.isReceivingMessages) {
      const msg =
        `A "${bReceiver.receiverType}" receiver with id "${bReceiver.name}" has already been ` +
        `created for the Queue "${
          this.name
        }". Another receiveBatch() call cannot be made while the ` +
        `previous one is active. Please wait for the previous receiveBatch() to complete and ` +
        `then call receiveBatch() again.`;
      throw new Error(msg);
    }

    if (!bReceiver || !bReceiver.isOpen()) {
      const options: ReceiveOptions = {
        maxConcurrentCalls: 0,
        receiveMode: this.receiveMode
      };
      this._context.batchingReceiver = bReceiver = BatchingReceiver.create(this._context, options);
    }

    try {
      return await bReceiver.receive(
        maxMessageCount,
        maxWaitTimeInSeconds,
        maxMessageWaitTimeoutInSeconds
      );
    } catch (err) {
      log.error(
        "[%s] Receiver '%s', an error occurred while receiving %d messages for %d " +
          "max time:\n %O",
        this._context.namespace.connectionId,
        bReceiver.name,
        maxMessageCount,
        maxWaitTimeInSeconds,
        err
      );
      throw err;
    }
  }

  /**
   * Fetches the next batch of active messages. The first call to `peek()` fetches the first
   * active message for this client. Each subsequent call fetches the subsequent message in the
   * entity.
   *
   * Unlike a `received` message, `peeked` message will not have lock token associated with it,
   * and hence it cannot be `Completed/Abandoned/Deferred/Deadlettered/Renewed`. Also, unlike
   * `receive() | receiveBatch()` this method will fetch even Deferred messages
   * (but not Deadlettered message).
   *
   * It is especially important to keep in mind when attempting to recover deferred messages from
   * the queue. A message for which the `expiresAtUtc` instant has passed is no longer eligible for
   * regular retrieval by any other means, even when it's being returned by `peek()`. Returning
   * these messages is deliberate, since `peek()` is a diagnostics tool reflecting the current
   * state of the log.
   *
   * @param [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peek(messageCount?: number): Promise<ReceivedMessageInfo[]> {
    return this._context.managementClient!.peek(messageCount);
  }

  /**
   * Peeks the desired number of messages from the specified sequence number.
   * @param fromSequenceNumber The sequence number from where to read the message.
   * @param [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    messageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    return this._context.managementClient!.peekBySequenceNumber(fromSequenceNumber, {
      messageCount: messageCount
    });
  }

  /**
   * Renews the lock on the message. The lock will be renewed based on the setting specified on
   * the queue.
   *
   * When a message is received in `PeekLock` mode, the message is locked on the server for this
   * receiver instance for a duration as specified during the Queue/Subscription creation
   * (LockDuration). If processing of the message requires longer than this duration, the
   * lock needs to be renewed. For each renewal, it resets the time the message is locked by the
   * LockDuration set on the Entity.
   *
   * @param lockTokenOrMessage - Lock token of the message or the message itself.
   * @returns Promise<Date> - New lock token expiry date and time in UTC format.
   */
  async renewLock(lockTokenOrMessage: string | ServiceBusMessage): Promise<Date> {
    if (this.receiveMode !== ReceiveMode.peekLock) {
      throw new Error("The operation is only supported in 'PeekLock' receive mode.");
    }
    return this._context.managementClient!.renewLock(lockTokenOrMessage);
  }

  /**
   * Receives a specific deferred message identified by `sequenceNumber` of the `Message`.
   * @param sequenceNumber The sequence number of the message that will be received.
   * @returns Promise<ServiceBusMessage | undefined>
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * - Throws an error if the message has not been deferred.
   */
  async receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined> {
    if (this.receiveMode !== ReceiveMode.peekLock) {
      throw new Error("The operation is only supported in 'PeekLock' receive mode.");
    }
    return this._context.managementClient!.receiveDeferredMessage(sequenceNumber, this.receiveMode);
  }

  /**
   * Receives a list of deferred messages identified by `sequenceNumbers`.
   * @param sequenceNumbers A list containing the sequence numbers to receive.
   * @returns Promise<ServiceBusMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
   */
  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]> {
    if (this.receiveMode !== ReceiveMode.peekLock) {
      throw new Error("The operation is only supported in 'PeekLock' receive mode.");
    }
    return this._context.managementClient!.receiveDeferredMessages(
      sequenceNumbers,
      this.receiveMode
    );
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
   * Lists the sessions on the ServiceBus Queue.
   * @param maxSessionCount Maximum number of sessions.
   * @param lastUpdateTime Filter to include only sessions updated after a given time. Default
   * value: 3 days ago from the current time.
   */
  async listMessageSessions(
    maxSessionCount: number,
    lastUpdatedTime?: Date
  ): Promise<ListSessionsResponse> {
    return this._context.managementClient!.listMessageSessions(0, maxSessionCount, lastUpdatedTime);
  }

  /**
   * Creates a session client with given sessionId in the ServiceBus Queue.
   * When no sessionId is given, a random session among the available sessions is used.
   *
   * @param options Options to control whether messages should be automatically completed or
   * if the session should get its lock automatically renewed.
   *
   * @returns SessionClient An instance of a SessionClient to receive messages from the session.
   */
  async createSessionClient(options?: SessionClientOptions): Promise<SessionClient> {
    if (!options) options = {};
    this._context.isSessionEnabled = true;
    return SessionClient.create(this._context, options);
  }
}
