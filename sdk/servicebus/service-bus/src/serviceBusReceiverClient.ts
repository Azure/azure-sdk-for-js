// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import Long from "long";
import {
  MessageHandlers,
  MessageIterator,
  ContextType,
  ContextWithSettlement,
  MessageAndContext,
  ReceivedMessage,
  ReceiveBatchOptions,
  IterateMessagesOptions,
  SubscribeOptions
} from "./models";
import { convertToInternalReceiveMode } from "./constructorHelpers";
import { RuleDescription, CorrelationFilter } from "./core/managementClient";
import { ServiceBusMessage, ReceivedMessageInfo, ReceiveMode } from ".";
import { ClientEntityContext } from "./clientEntityContext";
import { InternalReceiver, InternalSessionReceiver } from "./internalReceivers";

/**
 *A receiver client that handles sessions, including renewing the session lock.
 */
export interface SessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  /**
   * Streams messages to message handlers.
   * @param handler A handler that gets called for messages and errors.
   * @param options Options for subscribe.
   */
  subscribe(handlers: MessageHandlers<ContextType<LockModeT>>, options?: SubscribeOptions): void;
  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * @param options Options for iterateMessages.
   */
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<LockModeT>>;

  /**
   * Receives, at most, `maxMessages` worth of messages.
   * @param maxMessages The maximum number of messages to accept.
   * @param maxWaitTimeInSeconds The maximum time to wait, in seconds, for messages to arrive.
   * @param options Options for receiveBatch.
   */
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextType<LockModeT> }>;
  receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined>;
  receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]>;
  isReceivingMessages(): boolean;
  renewSessionLock(): Promise<Date>;
  setState(state: any): Promise<void>;
  getState(): Promise<any>;
  sessionId: string | undefined;
  sessionLockedUntilUtc: Date | undefined;
  close(): Promise<void>;
  getDeadLetterPath(): string;
  entityType: "queue" | "subscription";
  entityPath: string;
  receiveMode: "peekLock" | "receiveAndDelete";

  /**
   * Renews the lock on the session.
   */
  renewSessionLock(): Promise<Date>;
  /**
   * Closes the client.
   */
  close(): Promise<void>;
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
}

/**
 * A receiver client that does not handle sessions.
 */
export interface NonSessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  /**
   * Streams messages to message handlers.
   * @param handler A handler that gets called for messages and errors.
   * @param options Options for subscribe.
   */
  subscribe(handler: MessageHandlers<ContextType<LockModeT>>, options?: SubscribeOptions): void;

  /**
   * Returns an iterator that can be used to receive messages from Service Bus.
   * @param options Options for iterateMessages.
   */
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<LockModeT>>;

  /**
   * Receives, at most, `maxMessages` worth of messages.
   * @param maxMessages The maximum number of messages to accept.
   * @param maxWaitTimeInSeconds The maximum time to wait, in seconds, for messages to arrive.
   * @param options Options for receiveBatch.
   */
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<{ messages: ReceivedMessage[]; context: ContextType<LockModeT> }>;
  renewMessageLock(lockTokenOrMessage: string | ReceivedMessage): Promise<Date>;
  receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined>;
  receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]>;
  isReceivingMessages(): boolean;
  close(): Promise<void>;
  getDeadLetterPath(): string;
  entityType: "queue" | "subscription";
  entityPath: string;
  receiveMode: "peekLock" | "receiveAndDelete";

  /**
   * Closes the client.
   */
  close(): Promise<void>;

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

export type ReceiverClientTypeForUser =
  | NonSessionReceiver<"peekLock" | "receiveAndDelete">
  | (NonSessionReceiver<"peekLock" | "receiveAndDelete"> & SubscriptionRuleManagement)
  | SessionReceiver<"peekLock" | "receiveAndDelete">
  | (SessionReceiver<"peekLock" | "receiveAndDelete"> & SubscriptionRuleManagement);

export type ReceiverClientTypeForUserT<ReceiveModeT extends "peekLock" | "receiveAndDelete"> =
  | NonSessionReceiver<ReceiveModeT>
  | (NonSessionReceiver<ReceiveModeT> & SubscriptionRuleManagement)
  | SessionReceiver<ReceiveModeT>
  | (SessionReceiver<ReceiveModeT> & SubscriptionRuleManagement);

/**
 * Implementation class for receivers.
 * @internal
 * @ignore
 */
export class ReceiverClientImplementation {
  _sessionEnabled: boolean;
  constructor(
    private _receiveMode: "peekLock" | "receiveAndDelete",
    private _clientEntityContext: ClientEntityContext,
    sessionId?: string | false
  ) {
    this._internalReceiveMode = convertToInternalReceiveMode(this._receiveMode);
    this.entityPath = _clientEntityContext.entityPath;

    if (typeof sessionId === "boolean" && sessionId === false) {
      this._receiver = new InternalReceiver(this._clientEntityContext, this._internalReceiveMode);

      const receiver = this._receiver;
      const clientEntityContext = this._clientEntityContext;

      this._sessionEnabled = false;
      this.diagnostics = {
        async peek(maxMessageCount?: number): Promise<ReceivedMessage[]> {
          return (await receiver.peek(clientEntityContext.entityPath, maxMessageCount)).map(
            (m) => m as ReceivedMessage
          );
        },
        async peekBySequenceNumber(
          fromSequenceNumber: Long,
          maxMessageCount?: number
        ): Promise<ReceivedMessage[]> {
          return (
            await receiver.peekBySequenceNumber(
              clientEntityContext.entityPath,
              fromSequenceNumber,
              maxMessageCount
            )
          ).map((m) => m as ReceivedMessage);
        }
      };
    } else if (typeof sessionId === "string") {
      this._receiver = new InternalSessionReceiver(
        this._clientEntityContext,
        this._internalReceiveMode,
        {
          sessionId
        }
      );
      const receiver = this._receiver;

      this._sessionEnabled = true;
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
      throw new TypeError("Invalid constructor parameters for receiver");
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
    if (this._receiveMode === "peekLock") {
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
    } else if (this._receiveMode === "receiveAndDelete") {
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
  iterateMessages():
    | MessageIterator<ContextType<"peekLock">>
    | MessageIterator<ContextType<"receiveAndDelete">> {
    // TODO: this needs to be more configurable - at least with timeouts, etc...
    // TODO: use the options
    const messageIterator = this._receiver.getMessageIterator();

    if (this._receiveMode === "peekLock") {
      // const actualMessageIterator = (messageIterator as any) as MessageIterator<
      //   ContextType<"peekLock">
      // >;

      const f = async function*(
        originalMessageIterator: AsyncIterableIterator<ServiceBusMessage>
      ): AsyncIterableIterator<MessageAndContext<ContextType<"peekLock">>> {
        for await (const message of originalMessageIterator) {
          yield { message, context: settlementContext };
        }
      };

      return f(messageIterator);
    } else if (this._receiveMode === "receiveAndDelete") {
      const f = async function*(
        originalMessageIterator: AsyncIterableIterator<ServiceBusMessage>
      ): AsyncIterableIterator<MessageAndContext<ContextType<"receiveAndDelete">>> {
        for await (const message of originalMessageIterator) {
          yield { message, context: {} };
        }
      };

      // actualMessageIterator.context = {};
      // return actualMessageIterator;
      return f(messageIterator);
    } else {
      throw new Error("Unknown receive mode");
    }
  }

  // /**
  //  *
  //  *
  //  * @param {number} maxMessageCount
  //  * @param {number} [maxWaitTimeInSeconds]
  //  * @returns {(Message[] & ContextType<"receiveAndDelete" | "peekLock">)}
  //  * @memberof ReceiverClientImplementation
  //  */
  // async receiveBatch(
  //   maxMessageCount: number,
  //   maxWaitTimeInSeconds?: number
  // ): Promise<ServiceBusMessage[]> {
  //   return this._receiver.receiveMessages(maxMessageCount, maxWaitTimeInSeconds);
  // }

  async receiveDeferredMessage(sequenceNumber: Long): Promise<ServiceBusMessage | undefined> {
    return this._receiver.receiveDeferredMessage(sequenceNumber);
  }

  async receiveDeferredMessages(sequenceNumbers: Long[]): Promise<ServiceBusMessage[]> {
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

    if (this._receiveMode === "peekLock") {
      return {
        messages,
        context: settlementContext
      };
      // throw new Error("TODO: PeekLock and receiveBatch not yet implemented (context not returned)");
      // return messages;
    } else if (this._receiveMode === "receiveAndDelete") {
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
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.peek(maxMessageCount);
    } else {
      return this._receiver.peek(this.entityPath, maxMessageCount);
    }
  }

  async peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessageInfo[]> {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.peekBySequenceNumber(fromSequenceNumber, maxMessageCount);
    } else {
      return this._receiver.peekBySequenceNumber(
        this.entityPath,
        fromSequenceNumber,
        maxMessageCount
      );
    }
  }

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

  public entityPath: string;

  /**
   * @readonly
   * @property The name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";

  private _receiver: InternalSessionReceiver | InternalReceiver;
  private _internalReceiveMode: ReceiveMode;
}

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
