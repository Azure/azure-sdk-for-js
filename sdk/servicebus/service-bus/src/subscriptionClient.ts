// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { ConnectionContext } from "./connectionContext";
import { Receiver, SessionReceiver } from "./receiver";
import { ReceivedMessageInfo, ReceiveMode } from "./serviceBusMessage";
import { Client, ClientType } from "./client";
import { CorrelationFilter, RuleDescription } from "./core/managementClient";
import { SessionReceiverOptions } from "./session/messageSession";
import {
  getOpenReceiverErrorMsg,
  throwErrorIfClientOrConnectionClosed,
  throwErrorIfConnectionClosed
} from "./util/errors";
import { AmqpError, generate_uuid } from "rhea-promise";
import { ClientEntityContext } from "./clientEntityContext";

/**
 * Describes the client that allows interacting with a Service Bus Subscription.
 * Use the `createSubscriptionClient` function on the Namespace object to instantiate a
 * SubscriptionClient
 * @class SubscriptionClient
 */
export class SubscriptionClient implements Client {
  /**
   * @property {string}  The topic name.
   */
  readonly topicName: string;
  /**
   * @property {string}  The subscription name.
   */
  readonly subscriptionName: string;

  /**
   * @property {string} defaultRuleName Name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";

  /**
   * @property {string} The entitypath for the Service Bus Subscription for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @property {string} A unique identifier for the client.
   */
  readonly id: string;
  /**
   * @property {boolean} _isClosed Denotes if close() was called on this client.
   */
  private _isClosed: boolean = false;
  /**
   * @property {ClientEntityContext} _context Describes the amqp connection context for the SubscriptionClient.
   */
  private _context: ClientEntityContext;

  private _currentReceiver: Receiver | undefined;

  /**
   * Constructor for SubscriptionClient.
   * This is not meant for the user to call directly.
   * The user should use the `createSubscriptionClient` on the Namespace instead.
   *
   * @constructor
   * @internal
   * @param topicName - The Topic name.
   * @param subscriptionName - The Subscription name.
   * @param context - The connection context to create the SubscriptionClient.
   */
  constructor(topicName: string, subscriptionName: string, context: ConnectionContext) {
    throwErrorIfConnectionClosed(context);

    this.topicName = String(topicName);
    this.subscriptionName = String(subscriptionName);

    this.entityPath = `${topicName}/Subscriptions/${subscriptionName}`;
    this.id = `${this.entityPath}/${generate_uuid()}`;
    this._context = ClientEntityContext.create(
      this.entityPath,
      ClientType.SubscriptionClient,
      context
    );
  }

  /**
   * Closes the AMQP link for the receivers created by this client.
   * Once closed, neither the SubscriptionClient nor its receivers can be used for any
   * further operations. Use the `createSubscriptionClient` function on the Namespace object to
   * instantiate a new SubscriptionClient.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._context.namespace.connection && this._context.namespace.connection.isOpen()) {
        log.subscriptionClient("Closing the subscription client '%s'.", this.id);

        // Close the sessionManager.
        if (this._context.sessionManager) {
          this._context.sessionManager.close();
        }

        // Close the streaming and batching receivers.
        if (this._currentReceiver) {
          await this._currentReceiver.close();
        }

        // Close all the MessageSessions.
        for (const messageSessionId of Object.keys(this._context.messageSessions)) {
          await this._context.messageSessions[messageSessionId].close();
        }

        // Make sure that we clear the map of deferred messages
        this._context.requestResponseLockedMessages.clear();

        // Delete the reference in ConnectionContext
        await this._context.clearClientReference(this.id);

        // Mark this client as closed, so that we can show appropriate errors for subsequent usage
        this._isClosed = true;

        log.subscriptionClient("Closed the subscription client '%s'.", this.id);
      }
    } catch (err) {
      log.error(
        "[%s] An error occurred while closing the SubscriptionClient for %s: %O",
        this._context.namespace.connectionId,
        this.id,
        err
      );
      throw err;
    }
  }

  /**
   * Will reconnect the subscritpionClient and its receiver links.
   * This is meant for the library to use to resume receiving when retryable errors are seen.
   * This is not meant for the consumer of this library to use.
   * @ignore
   * @param error Error if any due to which we are attempting to reconnect
   */
  async detached(error?: AmqpError | Error): Promise<void> {
    try {
      await this._context.detached(error);
    } catch (err) {
      log.error(
        "[%s] [%s] An error occurred while reconnecting the client: %O.",
        this._context.namespace.connectionId,
        this.id,
        err
      );
    }
  }

  /**
   * Creates a Receiver for receiving messages from a Subscription which does not have sessions enabled.
   * Throws error if an open receiver already exists for this SubscriptionClient.
   *
   * Throws error if the Subscription has sessions enabled.
   *
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are `ReceiveMode.peekLock` and `ReceiveMode.receiveAndDelete`
   *
   * @returns Receiver A receiver to receive messages from a Subscription which does not have
   * sessions enabled.
   */
  public createReceiver(receiveMode: ReceiveMode): Receiver;
  /**
   * Creates a Receiver for receiving messages from a session enabled Subscription. When no sessionId is
   * given, a random session among the available sessions is used.
   *
   * Throws error if an open receiver already exists for given sessionId.
   * Throws error if the Subscription does not have sessions enabled.
   *
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are `ReceiveMode.peekLock` and `ReceiveMode.receiveAndDelete`
   * @param sessionOptions Options to provide sessionId and duration of automatic lock renewal for
   * the session receiver.
   *
   * @returns SessionReceiver A receiver to receive from a session in the Subscription.
   */
  public createReceiver(
    receiveMode: ReceiveMode,
    sessionOptions: SessionReceiverOptions
  ): SessionReceiver;
  /**
   * Create a Receiver for receiving messages from a Subscription.
   *
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are `ReceiveMode.peekLock` and `ReceiveMode.receiveAndDelete`
   * @param sessionOptions Applicable only for Subscriptions that have sessions enabled. Use these options
   * to provide sessionId and duration for which automatic lock renewal for should be done for the
   * receiver.
   *
   * @returns Receiver|SessionReceiver A receiver to receive from a session in the Subscription if
   * `sessionOptions` were provided. Else, a receiver to receive messages from the Subscription.
   */
  public createReceiver(
    receiveMode: ReceiveMode,
    sessionOptions?: SessionReceiverOptions
  ): Receiver | SessionReceiver {
    throwErrorIfClientOrConnectionClosed(this._context.namespace, this.entityPath, this._isClosed);

    // Receiver for Subscription where sessions are not enabled
    if (!sessionOptions) {
      if (!this._currentReceiver || this._currentReceiver.isClosed) {
        this._currentReceiver = new Receiver(this._context, receiveMode);
        return this._currentReceiver;
      }
      const errorMessage = getOpenReceiverErrorMsg(ClientType.SubscriptionClient, this.entityPath);
      const error = new Error(errorMessage);
      log.error(`[${this._context.namespace.connectionId}] %O`, error);
      throw error;
    }

    return new SessionReceiver(this._context, receiveMode, sessionOptions);
  }

  /**
   * Fetches the next batch of active messages (including deferred but not deadlettered messages).
   * The first call to `peek()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    throwErrorIfClientOrConnectionClosed(this._context.namespace, this.entityPath, this._isClosed);
    return this._context.managementClient!.peek(maxMessageCount);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettered messages)
   * from the specified sequence number.
   *
   * Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param fromSequenceNumber The sequence number from where to read the message.
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    throwErrorIfClientOrConnectionClosed(this._context.namespace, this.entityPath, this._isClosed);
    return this._context.managementClient!.peekBySequenceNumber(
      fromSequenceNumber,
      maxMessageCount
    );
  }

  //#region topic-filters

  /**
   * Get all the rules associated with the subscription
   */
  async getRules(): Promise<RuleDescription[]> {
    throwErrorIfClientOrConnectionClosed(this._context.namespace, this.entityPath, this._isClosed);
    return this._context.managementClient!.getRules();
  }

  /**
   * Removes the rule on the subscription identified by the given rule name.
   * @param ruleName
   */
  async removeRule(ruleName: string): Promise<void> {
    throwErrorIfClientOrConnectionClosed(this._context.namespace, this.entityPath, this._isClosed);
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
    throwErrorIfClientOrConnectionClosed(this._context.namespace, this.entityPath, this._isClosed);
    return this._context.managementClient!.addRule(ruleName, filter, sqlRuleActionExpression);
  }

  //#endregion

  //#region sessions

  // /**
  //  * Lists the ids of the sessions on the ServiceBus Subscription.
  //  * @param maxNumberOfSessions Maximum number of sessions.
  //  * @param lastUpdateTime Filter to include only sessions updated after a given time. Default
  //  * value is 3 days before the current time.
  //  */
  // async listMessageSessions(
  //   maxNumberOfSessions: number,
  //   lastUpdatedTime?: Date
  // ): Promise<string[]> {
  // TODO: Parameter validation if required
  // this.throwErrorIfClientOrConnectionClosed();
  //   return this._context.managementClient!.listMessageSessions(
  //     0,
  //     maxNumberOfSessions,
  //     lastUpdatedTime
  //   );
  // }

  //#endregion
}
