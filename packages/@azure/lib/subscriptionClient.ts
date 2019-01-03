// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { ReceiveOptions, OnError, OnMessage } from "./core/messageReceiver";
import { StreamingReceiver, ReceiveHandler, MessageHandlerOptions } from "./core/streamingReceiver";
import { BatchingReceiver } from "./core/batchingReceiver";
import { ServiceBusMessage, ReceivedMessageInfo } from "./serviceBusMessage";
import { Client } from "./client";
import { ReceiveMode } from "./core/messageReceiver";
import { CorrelationFilter, RuleDescription } from "./core/managementClient";

/**
 * Describes the options that can be provided while creating the SubscriptionClient.
 * @interface SubscriptionClientOptions
 */
export interface SubscriptionClientOptions {
  /**
   * @property {number} [receiveMode] The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode?: ReceiveMode;
}

export class SubscriptionClient extends Client {
  /**
   * @property {string} topicPath The topic path.
   */
  topicPath: string;
  /**
   * @property {string} subscriptionName The subscription name.
   */
  subscriptionName: string;
  /**
   * @property {number} receiveMode The mode in which messages should be received.
   * Default: ReceiveMode.peekLock
   */
  receiveMode: ReceiveMode;

  /**
   * @property {string} defaultRuleName Name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";

  /**
   * Instantiates a client pointing to the ServiceBus Subscription given by this configuration.
   *
   * @constructor
   * @param topicPath - The Topic path.
   * @param subscriptionName - The Subscription name.
   * @param context - The connection context to create the SubscriptionClient.
   * @param [options] - The SubscriptionClient options.
   */
  constructor(
    topicPath: string,
    subscriptionName: string,
    context: ConnectionContext,
    options?: SubscriptionClientOptions
  ) {
    super(`${topicPath}/Subscriptions/${subscriptionName}`, context);
    if (!options) options = {};
    this.topicPath = topicPath;
    this.subscriptionName = subscriptionName;
    this.receiveMode = options.receiveMode || ReceiveMode.peekLock;
  }

  /**
   * Closes the AMQP connection to the ServiceBus Subscription for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the streaming receiver.
        if (this._context.streamingReceiver) {
          await this._context.streamingReceiver.close();
        }
        // Close the batching receiver.
        if (this._context.batchingReceiver) {
          await this._context.batchingReceiver.close();
        }
        log.subscriptionClient("Closed the subscription client '%s'.", this.id);
      }
    } catch (err) {
      const msg =
        `An error occurred while closing the subscription client ` +
        `"${this.id}": ${JSON.stringify(err)} `;
      log.error(msg);
      throw new Error(msg);
    }
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * Messages will be passed to the provided onMessage handler and error will be passed to the
   * provided onError handler.
   *
   * @param onMessage - The message handler to receive Message objects.
   * @param onError - The error handler to receive an error that occurs while receiving messages.
   * @param [options] - Options for how you'd like to connect.
   *
   * @returns ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
   */
  receive(onMessage: OnMessage, onError: OnError, options?: MessageHandlerOptions): ReceiveHandler {
    if (
      !this._context.streamingReceiver ||
      (this._context.streamingReceiver && !this._context.streamingReceiver.isOpen())
    ) {
      if (!options) options = {};
      const rcvOptions: ReceiveOptions = {
        maxConcurrentCalls: options.maxConcurrentCalls || 1,
        receiveMode: this.receiveMode,
        autoComplete: options.autoComplete
      };
      const sReceiver = StreamingReceiver.create(this._context, rcvOptions);
      this._context.streamingReceiver = sReceiver;
      return sReceiver.receive(onMessage, onError);
    } else {
      const rcvr = this._context.streamingReceiver;
      const msg =
        `A "${rcvr.receiverType}" receiver with id "${rcvr.name}" has already been ` +
        `created for the Subscription "${
          this.name
        }". Another receive() call cannot be made while ` +
        `the previous one is active. Please stop the previous receive() by calling ` +
        `"receiveHandler.stop()".`;
      throw new Error(msg);
    }
  }

  /**
   * Receives a batch of Message objects from a ServiceBus Subscription for a given count and a
   * given max wait time in seconds, whichever happens first.
   * @param maxMessageCount      The maximum message count. Must be a value greater than 0.
   * @param maxWaitTimeInSeconds The maximum wait time in seconds for which the Receiver
   * should wait to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
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
        `created for the Subscription "${
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
   * @returns Promise<ReceivedSBMessage[]>
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * - Throws an error if the messages have not been deferred.
   */
  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ReceivedMessageInfo[]> {
    if (this.receiveMode !== ReceiveMode.peekLock) {
      throw new Error("The operation is only supported in 'PeekLock' receive mode.");
    }
    return this._context.managementClient!.receiveDeferredMessages(
      sequenceNumbers,
      this.receiveMode
    );
  }

  //#region topic-filters

  /**
   * Get all the rules associated with the subscription
   */
  async getRules(): Promise<RuleDescription[]> {
    return this._context.managementClient!.getRules();
  }

  /**
   * Removes the rule on the subscription identified by the given rule name.
   * @param ruleName
   */
  async removeRule(ruleName: string): Promise<void> {
    return this._context.managementClient!.removeRule(ruleName);
  }

  /**
   * Adds a rule on the subscription as defined by the given rule name, filter and action.
   * Remember to remove the default true filter on the subscription before adding a rule,
   * otherwise, the added rule will have no affect as the true filter will always result in
   * the subscription receiving all messages.
   * @param ruleName Name of the rule
   * @param filter A Boolean, SQL expression or a Correlation filter. For SQL Filter syntax, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-sql-filter SQLFilter syntax}.
   * @param sqlRuleActionExpression Action to perform if the message satisfies the filtering expression. For SQL Rule Action syntax,
   * see {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-sql-rule-action SQLRuleAction syntax}.
   */
  async addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    return this._context.managementClient!.addRule(ruleName, filter, sqlRuleActionExpression);
  }

  //#endregion
}
