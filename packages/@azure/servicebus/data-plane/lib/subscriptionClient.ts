// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { Receiver, MessageReceiverOptions } from "./receiver";
import { ReceivedMessageInfo } from "./serviceBusMessage";
import { Client } from "./client";
import { CorrelationFilter, RuleDescription } from "./core/managementClient";
import { SessionReceiver, SessionReceiverOptions } from "./session/messageSession";

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

  /**
   * @property {string} defaultRuleName Name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";

  /**
   * Instantiates a client that will maintain an AMQP connection to a Service Bus Subscription.
   * This is not meant for the user to call directly.
   * The user should use the `createSubscriptionClient` on the Namespace instead.
   *
   * @constructor
   * @param topicPath - The Topic path.
   * @param subscriptionName - The Subscription name.
   * @param context - The connection context to create the SubscriptionClient.
   */
  constructor(topicPath: string, subscriptionName: string, context: ConnectionContext) {
    super(`${topicPath}/Subscriptions/${subscriptionName}`, context);

    this.topicPath = topicPath;
    this.subscriptionName = subscriptionName;
  }

  /**
   * Closes the AMQP connection to the ServiceBus Subscription for this client.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        // Close the sessionManager.
        if (this._context.sessionManager) {
          this._context.sessionManager.close();
        }

        // Close the streaming receiver.
        if (this._context.streamingReceiver) {
          await this._context.streamingReceiver.close();
        }
        // Close the batching receiver.
        if (this._context.batchingReceiver) {
          await this._context.batchingReceiver.close();
        }

        // Close all the MessageSessions.
        for (const messageSessionId of Object.keys(this._context.messageSessions)) {
          await this._context.messageSessions[messageSessionId].close();
        }

        // Make sure that we clear the map of deferred messages
        this._context.requestResponseLockedMessages.clear();

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
   * Creates a Receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * This Receiver can be used to receive messages in batches or by registering handlers.
   *
   * You can have multiple receivers for the same Subscription.
   *
   * @param options Options for creating the receiver.
   */
  getReceiver(options?: MessageReceiverOptions): Receiver {
    return new Receiver(this._context, options);
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettereed messages).
   * The first call to `peek()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param [messageCount] The number of messages to retrieve. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peek(messageCount?: number): Promise<ReceivedMessageInfo[]> {
    return this._context.managementClient!.peek(messageCount);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettereed messages)
   * from the specified sequence number.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
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

  //#region sessions

  /**
   * Lists the ids of the sessions on the ServiceBus Subscription.
   * @param maxNumberOfSessions Maximum number of sessions.
   * @param lastUpdateTime Filter to include only sessions updated after a given time. Default
   * value is 3 days before the current time.
   */
  async listMessageSessions(
    maxNumberOfSessions: number,
    lastUpdatedTime?: Date
  ): Promise<string[]> {
    return this._context.managementClient!.listMessageSessions(
      0,
      maxNumberOfSessions,
      lastUpdatedTime
    );
  }

  /**
   * Creates a session client with given sessionId in the ServiceBus Subscription.
   * When no sessionId is given, a random session among the available sessions is used.
   * This Receiver can be used to receive messages in batches or by registering handlers.
   *
   * Note that you cannot have more than 1 session receiver for the same session.
   *
   * @param options Options to provide sessionId and ReceiveMode for receiving messages from the
   * session enabled Servicebus Subscription.
   *
   * @returns SessionReceiver An instance of a SessionReceiver to receive messages from the session.
   */
  async getSessionReceiver(options?: SessionReceiverOptions): Promise<SessionReceiver> {
    if (!options) options = {};
    this._context.isSessionEnabled = true;
    return SessionReceiver.create(this._context, options);
  }

  //#endregion
}
