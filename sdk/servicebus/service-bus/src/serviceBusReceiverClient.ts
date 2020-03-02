// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusMessage, ReceiveMode, ReceivedMessageInfo } from "./serviceBusMessage";
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
  IterateMessagesOptions,
  StreamMessagesOptions,
  ReceiveBatchOptions,
  Message
} from "./modelsTrack2";
import { createConnectionContext, convertToInternalReceiveMode } from "./constructorHelpers";
import { RuleDescription, CorrelationFilter } from "./core/managementClient";
import { ServiceBusClientOptions } from "./old/serviceBusClient";
import { ConnectionContext } from "./connectionContext";

/**
 *A receiver client that handles sessions, including renewing the session lock.
 */
// TODO: could extend NonSessionReceiverClient...?
export interface SessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  streamMessages(
    handlers: MessageHandlers<ContextType<LockModeT>>,
    options?: StreamMessagesOptions
  ): void;
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<LockModeT>>;
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<Message[]>;
  renewSessionLock(): Promise<Date>;
  setState(state: any): Promise<void>;
  getState(): Promise<any>;
  sessionId: string | undefined;
  sessionLockedUntilUtc: Date | undefined;
  close(): Promise<void>;

  diagnostics: {
    peek(maxMessageCount?: number): Promise<Message[]>;
    peekBySequenceNumber(fromSequenceNumber: Long, maxMessageCount?: number): Promise<Message[]>;
  };
}

/**
 * A receiver client that does not handle sessions.
 */
export interface NonSessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  streamMessages(
    handlers: MessageHandlers<ContextType<LockModeT>>,
    options?: StreamMessagesOptions
  ): void;
  iterateMessages(options?: IterateMessagesOptions): MessageIterator<ContextType<LockModeT>>;
  // TODO: need to solve the "return a context" compile error.
  receiveBatch(
    maxMessages: number,
    maxWaitTimeInSeconds?: number,
    options?: ReceiveBatchOptions
  ): Promise<Message[]>;
  close(): Promise<void>;
  diagnostics: {
    peek(maxMessageCount?: number): Promise<Message[]>;
    peekBySequenceNumber(fromSequenceNumber: Long, maxMessageCount?: number): Promise<Message[]>;
  };
}

/**
 * Methods to manage rules for subscriptions. More information about subscription rules
 * can be found here: https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters
 */
export interface SubscriptionRuleManagement {
  getRules(): Promise<RuleDescription[]>;
  removeRule(ruleName: string): Promise<void>;
  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void>;
  readonly defaultRuleName: string;
}

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

export type ReceiverClientTypeForUser = ClientTypeT<
  "peekLock" | "receiveAndDelete",
  "queue" | "subscription",
  "sessions" | "nosessions"
>;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"peekLock", "queue", "nosessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"receiveAndDelete", "queue", "nosessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"peekLock", "queue", "sessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"receiveAndDelete", "queue", "sessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"peekLock", "subscription", "nosessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"receiveAndDelete", "subscription", "nosessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"peekLock", "subscription", "sessions">;

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
  ): // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
  // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ClientTypeT<"receiveAndDelete", "subscription", "sessions">;
}

/**
 * Implementation class for receivers.
 * @internal
 * @ignore
 */
export class ReceiverClientImplementation {
  _sessionEnabled: boolean;
  constructor(
    auth1: QueueAuth | SubscriptionAuth,
    receiveMode2: "peekLock" | "receiveAndDelete",
    sessionOrOptions3?: Session | ServiceBusClientOptions,
    options4?: ServiceBusClientOptions
  ) {
    let options: ServiceBusClientOptions;
    let session: Session | undefined;

    if (sessionOrOptions3 != null && isSession(sessionOrOptions3)) {
      session = sessionOrOptions3;
      options = options4 || {};
    } else {
      options = sessionOrOptions3 || {};
    }

    const { context, entityPath } = createConnectionContext(auth1, options);
    this._entityPath = entityPath;
    this._context = context;
    this._receiveMode = convertToInternalReceiveMode(receiveMode2);

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      context,
      `${entityPath}/${generate_uuid()}`
    );

    // TODO: use the session connections object to "cache" the client entity context
    if (session != null) {
      const receiver = new InternalSessionReceiver(clientEntityContext, this._receiveMode, {
        sessionId: session.id
      });
      this._sessionEnabled = true;
      this._receiver = receiver;

      this.diagnostics = {
        async peek(maxMessageCount?: number): Promise<Message[]> {
          return (await receiver.peek(maxMessageCount)).map((m) => m as Message);
        },
        async peekBySequenceNumber(
          fromSequenceNumber: Long,
          maxMessageCount?: number
        ): Promise<Message[]> {
          return (await receiver.peekBySequenceNumber(fromSequenceNumber, maxMessageCount)).map(
            (m) => m as Message
          );
        }
      };
    } else {
      const receiver = new InternalReceiver(clientEntityContext, this._receiveMode);
      this._sessionEnabled = false;
      this._receiver = receiver;

      this.diagnostics = {
        async peek(maxMessageCount?: number): Promise<Message[]> {
          return (await receiver.peek(entityPath, maxMessageCount)).map((m) => m as Message);
        },
        async peekBySequenceNumber(
          fromSequenceNumber: Long,
          maxMessageCount?: number
        ): Promise<Message[]> {
          return (
            await receiver.peekBySequenceNumber(entityPath, fromSequenceNumber, maxMessageCount)
          ).map((m) => m as Message);
        }
      };
    }
  }

  public get receiveMode(): ReceiveMode {
    return this._receiveMode;
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
  streamMessages(
    handlers: MessageHandlers<ContextWithSettlement>,
    options?: StreamMessagesOptions
  ): void;
  /**
   * Streams messages to the passed in handlers.
   * @param handlers message handlers that receive events as well as errors.
   */
  streamMessages(handlers: MessageHandlers<{}>, options?: StreamMessagesOptions): void;
  streamMessages(
    handlers: MessageHandlers<{}> | MessageHandlers<ContextWithSettlement>,
    options?: StreamMessagesOptions
  ): void {
    // TODO: use options
    if (this._receiveMode === ReceiveMode.peekLock) {
      const onMessage = async (sbMessage: ServiceBusMessage) => {
        await handlers.processMessage(sbMessage, settlementContext);
      };

      this._receiver.registerMessageHandler(
        onMessage,
        (err) => {
          // TODO: this isn't right - the receiver's onError  is not async and needs to be fixed.
          handlers.processError(err);
        },
        options
      );
    } else if (this._receiveMode === ReceiveMode.receiveAndDelete) {
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

    if (this._receiveMode === ReceiveMode.peekLock) {
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
    } else if (this._receiveMode === ReceiveMode.receiveAndDelete) {
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
  ): Promise<Message[]> {
    // TODO: use the options (it contains things like AbortSignal)
    const messages = await this._receiver.receiveMessages(maxMessages, maxWaitTimeInSeconds);

    if (this._receiveMode === ReceiveMode.peekLock) {
      throw new Error("TODO: PeekLock and receiveBatch not yet implemented (context not returned)");
    } else if (this._receiveMode === ReceiveMode.receiveAndDelete) {
      return messages;
    } else {
      throw new Error("Unhandled receive mode");
    }
  }

  // private isSessionReceiver(
  //   receiver: InternalSessionReceiver | InternalReceiver
  // ): receiver is InternalSessionReceiver {
  //   return this._sessionEnabled;
  // }

  // private isSessionReceiver(
  //   receiver: InternalSessionReceiver | InternalReceiver
  // ): receiver is InternalSessionReceiver {
  //   return this._sessionEnabled;
  // }

  getRules(): Promise<RuleDescription[]> {
    throw new Error("Not yet implemented");
  }
  removeRule(ruleName: string): Promise<void> {
    throw new Error("Not yet implemented");
  }
  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    throw new Error("Not yet implemented");
  }

  // ManagementClient methods # Begin
  async peek(maxMessageCount?: number): Promise<ReceivedMessageInfo[]> {
    if (this._receiver instanceof InternalSessionReceiver) {
      return this._receiver.peek(maxMessageCount);
    } else {
      return this._receiver.peek(this._entityPath, maxMessageCount);
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
        this._entityPath,
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
    // TODO: don't close the entire connection here if we're doing a shared connection
    await ConnectionContext.close(this._context);
  }

  public diagnostics: {
    peek(maxMessageCount?: number): Promise<Message[]>;
    peekBySequenceNumber(fromSequenceNumber: Long, maxMessageCount?: number): Promise<Message[]>;
  };

  private _receiver: InternalSessionReceiver | InternalReceiver;
  // private _sessionEnabled: boolean;
  private _receiveMode: ReceiveMode;
  public _entityPath: string;
  /**
   * @readonly
   * @property The name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";
  private _context: ConnectionContext;
}

export class ReceiverClientImplementationForSessionMethods extends ReceiverClientImplementation {
  constructor(
    auth1: QueueAuth | SubscriptionAuth,
    receiveMode2: "peekLock" | "receiveAndDelete",
    sessionOrOptions3?: Session | ServiceBusClientOptions,
    options4?: ServiceBusClientOptions
  ) {
    super(auth1, receiveMode2, sessionOrOptions3, options4);
  }
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
  abandon: (message) => ((message as unknown) as ServiceBusMessage).abandon(),
  complete: (message) => ((message as unknown) as ServiceBusMessage).complete(),
  defer: (message) => ((message as unknown) as ServiceBusMessage).defer(),
  deadLetter: (message) => ((message as unknown) as ServiceBusMessage).deadLetter()
};
