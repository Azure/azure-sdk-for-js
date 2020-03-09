// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import Long from "long";
import { ServiceBusMessage, ReceiveMode } from "./serviceBusMessage";
import { ClientEntityContext } from "./clientEntityContext";
import { generate_uuid } from "rhea-promise";
import { ClientType } from "./client";
import { InternalSessionReceiver, InternalReceiver } from "./internalReceivers";
import {
  MessageHandlers,
  MessageIterator,
  Session,
  ContextType,
  ContextWithSettlement,
  QueueAuth,
  SubscriptionAuth,
  isSession,
  MessageAndContext,
  ReceivedMessage,
  ReceiveBatchOptions,
  IterateMessagesOptions,
  SubscribeOptions,
  isQueueAuth
} from "./models";
import {
  createConnectionContext,
  convertToInternalReceiveMode,
  ServiceBusClientOptions
} from "./constructorHelpers";
import { RuleDescription, CorrelationFilter } from "./core/managementClient";
import { ConnectionContext } from "./connectionContext";

/**
 *A receiver client that handles sessions, including renewing the session lock.
 * @export
 * @interface SessionReceiver
 * @template LockModeT
 */
export interface SessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  /**
   * Streams messages to message handlers.
   *
   * @param {MessageHandlers<ContextType<LockModeT>>} handlers A handler that gets called for messages and errors.
   * @param {SubscribeOptions} [options] Options for subscribe.
   * @memberof SessionReceiver
   */
  subscribe(handlers: MessageHandlers<ContextType<LockModeT>>, options?: SubscribeOptions): void;
  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * @param {IterateMessagesOptions} [options] Options for iterateMessages.
   * @returns {MessageIterator<ContextType<LockModeT>>}
   * @memberof SessionReceiver
   */
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<LockModeT>>;
  /**
   * Receives, at most, `maxMessages` worth of messages.
   * @param {number} maxMessages The maximum number of messages to accept.
   * @param {number} [maxWaitTimeInSeconds] The maximum time to wait, in seconds, for messages to arrive.
   * @param {ReceiveBatchOptions} [options] Options for receiveBatch.
   * @returns {Promise<{ messages: ReceivedMessage[]; context: ContextType<LockModeT> }>} Message batch object with an array of `ReceivedMessage`s along with the context to settle the messages in "peekLock" mode, context would be empty in "receiveAndDelete" mode
   * @memberof SessionReceiver
   */
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextType<LockModeT> }>;
  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param {Long} sequenceNumber The sequence number of the message that needs to be received.
   * @returns {(Promise<ServiceBusMessage | undefined>)}
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred message.
   * @memberof SessionReceiver
   */
  receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined>;
  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param {Long[]} sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @returns {Promise<ServiceBusMessage[]>}
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   * @memberof SessionReceiver
   */
  receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]>;
  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   * @returns {boolean}
   * @memberof SessionReceiver
   */
  isReceivingMessages(): boolean;
  /**
   * Renews the lock on the session for the duration as specified during the Queue/Subscription
   * creation.
   * - Check the `sessionLockedUntilUtc` property on the SessionReceiver for the time when the lock expires.
   * - When the lock on the session expires
   *     - No more messages can be received using this receiver
   *     - If a message is not settled (using either `complete()`, `defer()` or `deadletter()`,
   *   before the session lock expires, then the message lands back in the Queue/Subscription for the next
   *   receive operation.
   *
   * @returns {Promise<Date>} - New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while renewing session lock.
   * @memberof SessionReceiver
   */
  renewSessionLock(): Promise<Date>;
  /**
   * Sets the state on the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @param state The state that needs to be set.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while setting the session state.
   *
   * @param {*} state
   * @returns {Promise<void>}
   * @memberof SessionReceiver
   */
  setState(state: any): Promise<void>;
  /**
   * Gets the state of the Session. For more on session states, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#message-session-state Session State}
   * @returns {Promise<any>} The state of that session
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while retrieving session state.
   * @memberof SessionReceiver
   */
  getState(): Promise<any>;
  /**
   * @property The id of the session from which this receiver will receive messages.
   * Will return undefined until a AMQP receiver link has been successfully set up for the session.
   * @readonly
   * @type {(string | undefined)}
   * @memberof SessionReceiver
   */
  sessionId: string | undefined;
  /**
   * @property The time in UTC until which the session is locked.
   * Everytime `renewSessionLock()` is called, this time gets updated to current time plus the lock
   * duration as specified during the Queue/Subscription creation.
   *
   * Will return undefined until a AMQP receiver link has been successfully set up for the session.
   *
   * @readonly
   * @memberof SessionReceiver
   */
  sessionLockedUntilUtc: Date | undefined;
  /**
   * Closes the client.
   *
   * @returns {Promise<void>}
   * @memberof SessionReceiver
   */
  close(): Promise<void>;
  /**
   * Returns the corresponding dead letter queue path for the client entity - meant for both queue and subscription.
   * @returns {string}
   * @memberof SessionReceiver
   */
  getDeadLetterPath(): string;
  /**
   * Methods related to service bus diagnostics.
   */
  diagnostics: {
    /**
     * Peek within a queue or subscription.
     * @param maxMessageCount The maximum number of messages to retrieve.
     */
    peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;
    /**
     * Peek within a queue or subscription, starting with a specific sequence number.
     * NOTE: this method does not respect message locks or increment delivery count
     * for messages.
     * @param fromSequenceNumber The sequence number to start peeking from (inclusive).
     * @param maxMessageCount The maximum number of messages to retrieve.
     */
    peekBySequenceNumber(
      fromSequenceNumber: Long,
      maxMessageCount?: number
    ): Promise<ReceivedMessage[]>;
  };
  /**
   * Type of the entity with which the client is created.
   *
   * @type {("queue" | "subscription")}
   * @memberof SessionReceiver
   */
  entityType: "queue" | "subscription";
  /**
   * Path for the client entity.
   *
   * @type {string}
   * @memberof SessionReceiver
   */
  entityPath: string;
  /**
   * ReceiveMode provided to the client.
   *
   * @type {("peekLock" | "receiveAndDelete")}
   * @memberof SessionReceiver
   */
  receiveMode: "peekLock" | "receiveAndDelete";
}

/**
 * A receiver client that does not handle sessions.
 *
 * @export
 * @interface NonSessionReceiver
 * @template LockModeT
 */
export interface NonSessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  /**
   * Streams messages to message handlers.
   *
   * @param {MessageHandlers<ContextType<LockModeT>>} handlers A handler that gets called for messages and errors.
   * @param {SubscribeOptions} [options] Options for subscribe.
   * @memberof NonSessionReceiver
   */
  subscribe(handler: MessageHandlers<ContextType<LockModeT>>, options?: SubscribeOptions): void;
  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * @param {IterateMessagesOptions} [options] Options for iterateMessages.
   * @returns {MessageIterator<ContextType<LockModeT>>}
   * @memberof NonSessionReceiver
   */
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<LockModeT>>;
  /**
   * Receives, at most, `maxMessages` worth of messages.
   * @param {number} maxMessages The maximum number of messages to accept.
   * @param {number} [maxWaitTimeInSeconds] The maximum time to wait, in seconds, for messages to arrive.
   * @param {ReceiveBatchOptions} [options] Options for receiveBatch.
   * @returns {Promise<{ messages: ReceivedMessage[]; context: ContextType<LockModeT> }>} Message batch object with an array of `ReceivedMessage`s along with the context to settle the messages in "peekLock" mode, context would be empty in "receiveAndDelete" mode
   * @memberof NonSessionReceiver
   */
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextType<LockModeT> }>;
  /**
   * Renews the lock on the message for the duration as specified during the Queue/Subscription
   * creation.
   * - Check the `lockedUntilUtc` property on the message for the time when the lock expires.
   * - If a message is not settled (using either `complete()`, `defer()` or `deadletter()`,
   * before its lock expires, then the message lands back in the Queue/Subscription for the next
   * receive operation.
   *
   * @param {(string | ReceivedMessage)} lockTokenOrMessage - The `lockToken` property of the message or the message itself.
   * @returns {Promise<Date>} - New lock token expiry date and time in UTC format.
   * @throws Error if the underlying connection, client or receiver is closed.
   * @throws MessagingError if the service returns an error while renewing message lock.
   * @memberof NonSessionReceiver
   */
  renewMessageLock(lockTokenOrMessage: string | ReceivedMessage): Promise<Date>;
  /**
   * Returns a promise that resolves to a deferred message identified by the given `sequenceNumber`.
   * @param {Long} sequenceNumber The sequence number of the message that needs to be received.
   * @returns {(Promise<ServiceBusMessage | undefined>)}
   * - Returns `Message` identified by sequence number.
   * - Returns `undefined` if no such message is found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred message.
   * @memberof NonSessionReceiver
   */
  receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined>;
  /**
   * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
   * @param {Long[]} sequenceNumbers An array of sequence numbers for the messages that need to be received.
   * @returns {Promise<ServiceBusMessage[]>}
   * - Returns a list of messages identified by the given sequenceNumbers.
   * - Returns an empty list if no messages are found.
   * @throws Error if the underlying connection or receiver is closed.
   * @throws MessagingError if the service returns an error while receiving deferred messages.
   * @memberof NonSessionReceiver
   */
  receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]>;
  /**
   * Indicates whether the receiver is currently receiving messages or not.
   * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
   * @returns {boolean}
   * @memberof NonSessionReceiver
   */
  isReceivingMessages(): boolean;
  /**
   * Closes the client.
   *
   * @returns {Promise<void>}
   * @memberof NonSessionReceiver
   */
  close(): Promise<void>;
  /**
   * Returns the corresponding dead letter queue path for the client entity - meant for both queue and subscription.
   * @returns {string}
   * @memberof NonSessionReceiver
   */
  getDeadLetterPath(): string;

  /**
   * Methods related to service bus diagnostics.
   */
  diagnostics: {
    /**
     * Peek within a queue or subscription.
     * NOTE: this method does not respect message locks or increment delivery count
     * for messages.
     * @param maxMessageCount The maximum number of messages to retrieve.
     */
    peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;

    /**
     * Peek within a queue or subscription, starting with a specific sequence number.
     * NOTE: this method does not respect message locks or increment delivery count
     * for messages.
     * @param fromSequenceNumber The sequence number to start peeking from (inclusive).
     * @param maxMessageCount The maximum number of messages to retrieve.
     */
    peekBySequenceNumber(
      fromSequenceNumber: Long,
      maxMessageCount?: number
    ): Promise<ReceivedMessage[]>;
  };
  /**
   * Type of the entity with which the client is created.
   *
   * @type {("queue" | "subscription")}
   * @memberof NonSessionReceiver
   */
  entityType: "queue" | "subscription";
  /**
   * Path for the client entity.
   *
   * @type {string}
   * @memberof NonSessionReceiver
   */
  entityPath: string;
  /**
   * ReceiveMode provided to the client.
   *
   * @type {("peekLock" | "receiveAndDelete")}
   * @memberof NonSessionReceiver
   */
  receiveMode: "peekLock" | "receiveAndDelete";
}

/**
 * Methods to manage rules for subscriptions. More information about subscription rules
 * can be found here: https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters
 */
export interface SubscriptionRuleManagement {
  /**
   * Gets all rules associated with the subscription
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while retrieving rules.
   */
  getRules(): Promise<RuleDescription[]>;

  /**
   * Removes the rule on the subscription identified by the given rule name.
   *
   * **Caution**: If all rules on a subscription are removed, then the subscription will not receive
   * any more messages.
   * @param ruleName
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while removing rules.
   */

  removeRule(ruleName: string): Promise<void>;
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
  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void>;
  readonly defaultRuleName: string;
}

/**
 * Dynamic type that represents the proper receiver based on:
 * - The lock mode (peekLock or receiveAndDelete).
 * - Whether sessions are enabled or not on this particular receiver.
 * - The entity type (queue or subscription).
 */
export type ClientTypeT<
  ReceiveModeT extends "peekLock" | "receiveAndDelete",
  EntityTypeT extends "queue" | "subscription",
  SessionsEnabledT extends "sessions" | "nosessions"
> = SessionsEnabledT extends "nosessions"
  ? EntityTypeT extends "queue"
    ? NonSessionReceiver<ReceiveModeT>
    : NonSessionReceiver<ReceiveModeT> & SubscriptionRuleManagement
  : EntityTypeT extends "queue"
  ? SessionReceiver<ReceiveModeT>
  : SessionReceiver<ReceiveModeT> & SubscriptionRuleManagement;

/**
 * A client that can send to queues or topics.
 */
export interface ServiceBusReceiverClient {
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    queueAuth: QueueAuth,
    receiveMode: "peekLock",
    options?: ServiceBusClientOptions
  ): ClientTypeT<"peekLock", "queue", "nosessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    queueAuth: QueueAuth,
    receiveMode: "receiveAndDelete",
    options?: ServiceBusClientOptions
  ): ClientTypeT<"receiveAndDelete", "queue", "nosessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    queueAuth: QueueAuth,
    receiveMode: "peekLock",
    session: Session,
    options?: ServiceBusClientOptions
  ): ClientTypeT<"peekLock", "queue", "sessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    queueAuth: QueueAuth,
    receiveMode: "receiveAndDelete",
    session: Session,
    options?: ServiceBusClientOptions
  ): ClientTypeT<"receiveAndDelete", "queue", "sessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "peekLock",
    options?: ServiceBusClientOptions
  ): ClientTypeT<"peekLock", "subscription", "nosessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "receiveAndDelete",
    options?: ServiceBusClientOptions
  ): ClientTypeT<"receiveAndDelete", "subscription", "nosessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "peekLock",
    session: Session,
    options?: ServiceBusClientOptions
  ): ClientTypeT<"peekLock", "subscription", "sessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new (
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "receiveAndDelete",
    session: Session,
    options?: ServiceBusClientOptions
  ): ClientTypeT<"receiveAndDelete", "subscription", "sessions">;
}

/**
 * Implementation class for receivers.
 * @internal
 * @ignore
 */
export class ReceiverClientImplementation {
  constructor(
    auth1: QueueAuth | SubscriptionAuth,
    receiveMode2: "peekLock" | "receiveAndDelete",
    sessionOrOptions3?: Session | ServiceBusClientOptions,
    options4?: ServiceBusClientOptions
  ) {
    let options: ServiceBusClientOptions;
    let session: Session | undefined;

    if (isSession(sessionOrOptions3)) {
      session = sessionOrOptions3;
      options = options4 || {};
    } else {
      options = sessionOrOptions3 || {};
    }
    this.entityType = isQueueAuth(auth1) ? "queue" : "subscription";
    const { context, entityPath } = createConnectionContext(auth1, options);
    this.entityPath = entityPath;
    this._context = context;

    if (receiveMode2 === "peekLock" || receiveMode2 === "receiveAndDelete") {
      this.receiveMode = receiveMode2;
    } else {
      throw new Error("Invalid receiveMode provided");
    }
    this._internalReceiveMode = convertToInternalReceiveMode(receiveMode2);

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      context,
      `${entityPath}/${generate_uuid()}`
    );

    // TODO: use the session connections object to "cache" the client entity context
    if (session != null) {
      const receiver = new InternalSessionReceiver(clientEntityContext, this._internalReceiveMode, {
        sessionId: session.id,
        maxSessionAutoRenewLockDurationInSeconds: session.maxSessionAutoRenewLockDurationInSeconds
      });
      this._receiver = receiver;

      this.diagnostics = {
        async peek(maxMessageCount?: number): Promise<ReceivedMessage[]> {
          return (await receiver.peek(maxMessageCount)).map((m) => m as ReceivedMessage);
        },
        async peekBySequenceNumber(
          fromSequenceNumber: Long,
          maxMessageCount?: number
        ): Promise<ReceivedMessage[]> {
          return (await receiver.peekBySequenceNumber(fromSequenceNumber, maxMessageCount)).map(
            (m) => m as ReceivedMessage
          );
        }
      };
    } else {
      const receiver = new InternalReceiver(clientEntityContext, this._internalReceiveMode);
      this._receiver = receiver;

      this.diagnostics = {
        async peek(maxMessageCount?: number): Promise<ReceivedMessage[]> {
          return (await receiver.peek(entityPath, maxMessageCount)).map(
            (m) => m as ReceivedMessage
          );
        },
        async peekBySequenceNumber(
          fromSequenceNumber: Long,
          maxMessageCount?: number
        ): Promise<ReceivedMessage[]> {
          return (
            await receiver.peekBySequenceNumber(entityPath, fromSequenceNumber, maxMessageCount)
          ).map((m) => m as ReceivedMessage);
        }
      };
    }
  }

  public get isClosed(): boolean {
    return this._receiver.isClosed;
  }

  isReceivingMessages(): boolean {
    return this._receiver.isReceivingMessages();
  }

  /**
   * Streams messages to the passed in handlers.
   * @param handlers message handlers that receive events as well as errors.
   */
  subscribe(handlers: MessageHandlers<ContextWithSettlement>, options?: SubscribeOptions): void;
  /**
   * Streams messages to the passed in handlers.
   * @param handlers message handlers that receive events as well as errors.
   */
  subscribe(handlers: MessageHandlers<{}>, options?: SubscribeOptions): void;
  subscribe(
    handlers: MessageHandlers<{}> | MessageHandlers<ContextWithSettlement>,
    options?: SubscribeOptions
  ): void {
    // TODO: use options
    if (
      !handlers ||
      !(handlers.processMessage instanceof Function && handlers.processError instanceof Function)
    ) {
      throw new TypeError('Invalid "MessageHandlers" provided.');
    }

    if (this.receiveMode === "peekLock") {
      const onMessage = async (sbMessage: ServiceBusMessage) => {
        return handlers.processMessage(sbMessage, settlementContext);
      };

      this._receiver.registerMessageHandler(
        onMessage,
        (err) => {
          // TODO: this isn't right - the receiver's onError  is not async and needs to be fixed.
          handlers.processError(err);
        },
        options
      );
    } else if (this.receiveMode === "receiveAndDelete") {
      const actualHandlers = handlers as MessageHandlers<{}>;

      this._receiver.registerMessageHandler(
        (message) => {
          return actualHandlers.processMessage(message, {});
        },
        (err) => {
          // TODO: this isn't right - the receiver's onError  is not async and needs to be fixed.
          handlers.processError(err);
        },
        options
      );
    } else {
      throw new Error("Invalid receive mode");
    }
  }

  async renewMessageLock(lockTokenOrMessage: string | ReceivedMessage): Promise<Date> {
    if (!(this._receiver instanceof InternalSessionReceiver)) {
      return this._receiver.renewMessageLock(lockTokenOrMessage);
    } else {
      throw new Error("'renewMessageLock' does not exist on 'SessionReceiver'");
    }
  }

  /**
   * Gets an iterator of messages that also contains a context that can be used to
   * settle messages.
   */
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<"peekLock">>;
  /**
   * Gets an iterator of messages
   */
  iterateMessages(
    options?: IterateMessagesOptions
  ): MessageIterator<ContextType<"receiveAndDelete">>;
  iterateMessages(
    options?: IterateMessagesOptions
  ): MessageIterator<ContextType<"peekLock">> | MessageIterator<ContextType<"receiveAndDelete">> {
    // TODO: this needs to be more configurable - at least with timeouts, etc...
    // TODO: use the options
    const messageIterator = this._receiver.getMessageIterator();

    if (this.receiveMode === "peekLock") {
      const f = async function*(
        originalMessageIterator: AsyncIterableIterator<ServiceBusMessage>
      ): AsyncIterableIterator<MessageAndContext<ContextType<"peekLock">>> {
        for await (const message of originalMessageIterator) {
          yield { message, context: settlementContext };
        }
      };

      return f(messageIterator);
    } else if (this.receiveMode === "receiveAndDelete") {
      const f = async function*(
        originalMessageIterator: AsyncIterableIterator<ServiceBusMessage>
      ): AsyncIterableIterator<MessageAndContext<ContextType<"receiveAndDelete">>> {
        for await (const message of originalMessageIterator) {
          yield { message, context: {} };
        }
      };
      return f(messageIterator);
    } else {
      throw new Error("Unknown receive mode");
    }
  }

  receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined> {
    return this._receiver.receiveDeferredMessage(sequenceNumber);
  }

  receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]> {
    return this._receiver.receiveDeferredMessages(sequenceNumbers);
  }

  // TODO: should probably be milliseconds
  async receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextType<"peekLock"> }>;
  // TODO: should probably be milliseconds
  async receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextType<"receiveAndDelete"> }>;
  // TODO: should probably be milliseconds
  async receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{
    messages: ReceivedMessage[];
    context: ContextType<"receiveAndDelete"> | ContextType<"peekLock">;
  }> {
    // TODO: use the options (it contains things like AbortSignal)
    const messages = await this._receiver.receiveMessages(maxMessages, maxWaitTimeInSeconds);

    if (this.receiveMode === "peekLock") {
      return {
        messages,
        context: settlementContext
      };
      // throw new Error("TODO: PeekLock and receiveBatch not yet implemented (context not returned)");
      // return messages;
    } else if (this.receiveMode === "receiveAndDelete") {
      return {
        messages,
        context: {}
      };
    } else {
      throw new Error("Unhandled receive mode");
    }
  }

  // private isSessionReceiver(
  //   receiver: InternalSessionReceiver | InternalReceiver
  // ): receiver is InternalSessionReceiver {
  //   return this._sessionEnabled;
  // }

  getRules(): Promise<RuleDescription[]> {
    return this._receiver.getRules(this.entityPath);
  }
  removeRule(ruleName: string): Promise<void> {
    return this._receiver.removeRule(this.entityPath, ruleName);
  }
  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    return this._receiver.addRule(this.entityPath, ruleName, filter, sqlRuleActionExpression);
  }
  // ManagementClient methods # Begin
  // peek & peekBySequenceNumber are kept under `diagnostics`
  // /**
  //  * Lists the ids of the sessions on the ServiceBus Queue.
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

  // ManagementClient methods # End

  // Session methods # Begin
  get sessionId(): string | undefined {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.sessionId;
    } else {
      throw new Error("Only available on sessionful Receiver");
    }
  }

  get sessionLockedUntilUtc(): Date | undefined {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.sessionLockedUntilUtc;
    } else {
      throw new Error("Only available on sessionful Receiver");
    }
  }

  async renewSessionLock(): Promise<Date> {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.renewSessionLock();
    } else {
      throw new Error("Only available on sessionful Receiver");
    }
  }

  async setState(state: any): Promise<void> {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.setState(state);
    } else {
      throw new Error("Only available on sessionful Receiver");
    }
  }

  async getState(): Promise<any> {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.getState();
    } else {
      throw new Error("Only available on sessionful Receiver");
    }
  }
  // Session methods # End
  async close(): Promise<void> {
    await this._receiver.close();
    // TODO: don't close the entire connection here if we're doing a shared connection
    await ConnectionContext.close(this._context);
  }

  /**
   * Returns the corresponding dead letter queue path for the client entity - meant for both queue and subscription.
   */
  public getDeadLetterPath(): string {
    return `${this.entityPath}/$DeadLetterQueue`;
  }

  public diagnostics: {
    peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;
    peekBySequenceNumber(
      fromSequenceNumber: Long,
      maxMessageCount?: number
    ): Promise<ReceivedMessage[]>;
  };

  private _receiver: InternalSessionReceiver | InternalReceiver;
  // private _sessionEnabled: boolean;
  public receiveMode: "peekLock" | "receiveAndDelete";
  private _internalReceiveMode: ReceiveMode;
  public entityPath: string;
  /**
   * @readonly
   * @property The name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";
  private _context: ConnectionContext;
  public entityType: "queue" | "subscription";
}

/**
 * A client that can receive messages from Service Bus Queues or Service Bus Subscriptions.
 */
export const ServiceBusReceiverClient: ServiceBusReceiverClient = ReceiverClientImplementation;

/**
 * @internal
 * @ignore
 */
const settlementContext: ContextWithSettlement = {
  // TODO: need to move the settlement methods out of sb message -
  // we don't need to have this runtime dependency.
  abandon: (message, propertiesToModify) =>
    ((message as unknown) as ServiceBusMessage).abandon(propertiesToModify),
  complete: (message) => ((message as unknown) as ServiceBusMessage).complete(),
  defer: (message, propertiesToModify) =>
    ((message as unknown) as ServiceBusMessage).defer(propertiesToModify),
  deadLetter: (message, options) => ((message as unknown) as ServiceBusMessage).deadLetter(options)
};
