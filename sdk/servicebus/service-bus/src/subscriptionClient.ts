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
import { generate_uuid } from "rhea-promise";
import { ClientEntityContext } from "./clientEntityContext";
import Long from "long";

/**
 * Describes the client that allows interacting with a Service Bus Subscription.
 * Use the `createSubscriptionClient` function on the ServiceBusClient object to instantiate a
 * SubscriptionClient
 * @class SubscriptionClient
 */
export class SubscriptionClient implements Client {
  /**
   * @readonly
   * @property The name of the Service Bus Topic for whose Subscription, this client is created.
   */
  readonly topicName: string;
  /**
   * @readonly
   * @property The name of the Service Bus Subscription for which this client is created.
   */
  readonly subscriptionName: string;

  /**
   * @readonly
   * @property The name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";

  /**
   * @readonly
   * @property The path for the Service Bus Subscription for which this client is created.
   */
  readonly entityPath: string;
  /**
   * @readonly
   * @property A unique identifier for this client.
   */
  readonly id: string;
  /**
   * @property Describes the amqp connection context for the SubscriptionClient.
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
   * @throws Error if the underlying connection is closed.
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
      context,
      this.id
    );
  }

  /**
   * Closes the AMQP link for the receivers created by this client.
   * Once closed, neither the SubscriptionClient nor its receivers can be used for any
   * further operations.
   *
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      // Close the corresponding client context which will take care of closing all AMQP links
      // associated with this client
      await this._context.close();
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
   * Creates a Receiver for receiving messages from a Subscription which does not have sessions enabled.
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are:
   * - `ReceiveMode.peekLock`: Once a message is received in this mode, the receiver has a lock on
   * the message for a particular duration. If the message is not settled by this time, it lands back
   * on Service Bus to be fetched by the next receive operation.
   * - `ReceiveMode.receiveAndDelete`: Messages received in this mode get automatically removed from
   * Service Bus.
   *
   * @returns Receiver A receiver to receive messages from a Subscription which does not have
   * sessions enabled.
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws Error if an open receiver already exists on the SubscriptionClient.
   * @throws MessagingError with name `InvalidOperationError` if the Queue has sessions enabled
   * (in which case, use the overload of this method which takes
   * `sessionOptions` argument)
   */
  public createReceiver(receiveMode: ReceiveMode): Receiver;

  /**
   * Creates a Receiver for receiving messages from a session enabled Subscription. When no sessionId is
   * given, a random session among the available sessions is used.
   * @param receiveMode An enum indicating the mode in which messages should be received. Possible
   * values are:
   * - `ReceiveMode.peekLock`: Once a message is received in this mode, the receiver has a lock on
   * the message for a particular duration. If the message is not settled by this time, it lands back
   * on Service Bus to be fetched by the next receive operation.
   * - `ReceiveMode.receiveAndDelete`: Messages received in this mode get automatically removed from
   * Service Bus.
   * @param sessionOptions Options to provide sessionId and duration of automatic lock renewal for
   * the session receiver.
   *
   * @returns SessionReceiver A receiver to receive from a session in the Subscription.
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws Error if an open receiver already exists on the SubscriptionClient for given sessionId.
   * @throws MessagingError with name `SessionCannotBeLockedError` if the Queue does not have sessions enabled (in which
   * case do not pass the `sessionOptions` argument) or if Service Bus is not able to get a lock on
   * the session (in which case try again after some time)
   */
  public createReceiver(
    receiveMode: ReceiveMode,
    sessionOptions: SessionReceiverOptions
  ): SessionReceiver;

  public createReceiver(
    receiveMode: ReceiveMode,
    sessionOptions?: SessionReceiverOptions
  ): Receiver | SessionReceiver {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );

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
   * - The first call to `peek()` fetches the first active message. Each subsequent call fetches the
   * subsequent message.
   * - Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while peeking for messages.
   */
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );

    return this._context.managementClient!.peek(maxMessageCount);
  }

  /**
   * Peeks the desired number of active messages (including deferred but not deadlettered messages)
   * from the specified sequence number.
   * - Unlike a `received` message, `peeked` message is a read-only version of the message.
   * It cannot be `Completed/Abandoned/Deferred/Deadlettered`. The lock on it cannot be renewed.
   *
   * @param fromSequenceNumber The sequence number from where to read the message.
   * @param [maxMessageCount] The maximum number of messages to peek. Default value `1`.
   * @returns Promise<ReceivedSBMessage[]>
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while peeking for messages.
   */
  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );

    return this._context.managementClient!.peekBySequenceNumber(
      fromSequenceNumber,
      maxMessageCount
    );
  }

  // #region topic-filters

  /**
   * Gets all rules associated with the subscription
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while retrieving rules.
   */
  async getRules(): Promise<RuleDescription[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );
    return this._context.managementClient!.getRules();
  }

  /**
   * Removes the rule on the subscription identified by the given rule name.
   *
   * **Caution**: If all rules on a subscription are removed, then the subscription will not receive
   * any more messages.
   * @param ruleName
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while removing rules.
   */
  async removeRule(ruleName: string): Promise<void> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );
    return this._context.managementClient!.removeRule(ruleName);
  }

  /**
   * Adds a rule on the subscription as defined by the given rule name, filter and action.
   *
   * **Note**: Remove the default true filter on the subscription before adding a rule.
   * Otherwise, the added rule will have no affect as the true filter will always result in
   * the subscription receiving all messages.
   * @param ruleName Name of the rule
   * @param filter A Boolean, SQL expression or a Correlation filter. For SQL Filter syntax, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-sql-filter SQLFilter syntax}.
   * @param sqlRuleActionExpression Action to perform if the message satisfies the filtering expression. For SQL Rule Action syntax,
   * see {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-sql-rule-action SQLRuleAction syntax}.
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while adding rules.
   */
  async addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this.entityPath,
      this._context.isClosed
    );
    return this._context.managementClient!.addRule(ruleName, filter, sqlRuleActionExpression);
  }

  // #endregion

  // #region sessions

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

  // #endregion
}
