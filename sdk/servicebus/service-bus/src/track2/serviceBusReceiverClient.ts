// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusMessage, ReceiveMode } from "../serviceBusMessage";
import { ClientEntityContext } from "../clientEntityContext";
import { generate_uuid } from "rhea-promise";
import { ClientType } from "../client";
import { InternalSessionReceiver, InternalReceiver } from "../internalReceivers";
import {
  MessageHandlers,
  MessageIterator,
  Session,
  ContextType,
  ContextWithSettlement,
  UselessEmptyContextThatMaybeShouldBeRemoved,
  QueueAuth,
  SubscriptionAuth,
  isSession,
  MessageAndContext
} from "./models";
import { createConnectionContext, convertToInternalReceiveMode } from "./constructorHelpers";
import { RuleDescription, CorrelationFilter } from "../core/managementClient";
import { ServiceBusClientOptions } from '../old/serviceBusClient';

/**
 *A receiver client that handles sessions, including renewing the session lock.
 */
// TODO: could extend NonSessionReceiverClient...?
export interface SessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  streamMessages(handlers: MessageHandlers<ContextType<LockModeT>>): void;
  iterateMessages(): MessageIterator<ContextType<LockModeT>>;
  renewSessionLock(): Promise<Date>;
}

/**
 * A receiver client that does not handle sessions.
 */
export interface NonSessionReceiver<LockModeT extends "peekLock" | "receiveAndDelete"> {
  streamMessages(handlers: MessageHandlers<ContextType<LockModeT>>): void;
  iterateMessages(): MessageIterator<ContextType<LockModeT>>;
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
}

// TODO: merge more? Or maybe this is okay...
export type ClientTypeT<ReceiveModeT extends "peekLock" | "receiveAndDelete", EntityTypeT extends "queue" | "subscription", SessionsEnabledT extends "sessions" | "nosessions"> =
  SessionsEnabledT extends "nosessions"
  ? EntityTypeT extends "queue"
  ? NonSessionReceiver<ReceiveModeT>
  : NonSessionReceiver<ReceiveModeT> & SubscriptionRuleManagement
  : EntityTypeT extends "queue"
  ? SessionReceiver<ReceiveModeT>
  : SessionReceiver<ReceiveModeT> & SubscriptionRuleManagement;

export interface ServiceBusReceiverClient {
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueAuth: QueueAuth,
    receiveMode: "peekLock",
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"peekLock", "queue", "nosessions">;

      /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueAuth: QueueAuth,
    receiveMode: "receiveAndDelete",
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"receiveAndDelete", "queue", "nosessions">;

      /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueAuth: QueueAuth,
    receiveMode: "peekLock",
    session: Session,
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"peekLock", "queue", "sessions">;

      /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueAuth Data needed to connect to a queue.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueAuths: QueueAuth,
    receiveMode: "receiveAndDelete",
    session: Session,
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"receiveAndDelete", "queue", "sessions">;

     /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "peekLock",
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"peekLock", "subscription", "nosessions">;

      /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "receiveAndDelete",
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"receiveAndDelete", "subscription", "nosessions">;

      /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "peekLock",
    session: Session,
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
  ): ClientTypeT<"peekLock", "subscription", "sessions">;

  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param subscriptionAuth Data needed to connect to a subscription.
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    subscriptionAuth: SubscriptionAuth,
    receiveMode: "receiveAndDelete",
    session: Session,
    // TODO: can I make receiveMode generic here and have that carry through to the constructor of the other classs?
    // I'm guessing 'no' because what would that look like!? Maybe I can? Do it at the class level?
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
    sessionOrOptions3?: Session| ServiceBusClientOptions,
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
    this._receiveMode = convertToInternalReceiveMode(receiveMode2);

    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      context,
      `${entityPath}/${generate_uuid()}`
    );

    // TODO: use the session connections object to "cache" the client entity context
    if (session != null) {
      this._receiver = new InternalSessionReceiver(clientEntityContext, this._receiveMode, {
        sessionId: session.id
      });
      this._sessionEnabled = true;
    } else {
      this._receiver = new InternalReceiver(clientEntityContext, this._receiveMode);
      this._sessionEnabled = false;
    }
  }

  /**
   * Streams messages to the passed in handlers.
   * @param handlers message handlers that receive events as well as errors.
   */
  streamMessages(handlers: MessageHandlers<ContextWithSettlement>): void;
  /**
   * Streams messages to the passed in handlers.
   * @param handlers message handlers that receive events as well as errors.
   */
  streamMessages(handlers: MessageHandlers<UselessEmptyContextThatMaybeShouldBeRemoved>): void;
  streamMessages(
    handlers:
      | MessageHandlers<UselessEmptyContextThatMaybeShouldBeRemoved>
      | MessageHandlers<ContextWithSettlement>
  ): void {
    // this is so goofy that I apologize in advance:
    if (this._receiveMode === ReceiveMode.peekLock) {
      const onMessage = async (sbMessage: ServiceBusMessage) => {
        await handlers.processMessage(sbMessage, settlementContext);
      };

      this._receiver.registerMessageHandler(onMessage, (err) => {
        // TODO: this isn't right - the receiver's onError  is not async and needs to be fixed.
        handlers.processError(err);
      });
    } else if (this._receiveMode === ReceiveMode.receiveAndDelete) {
      const actualHandlers = handlers as MessageHandlers<
        UselessEmptyContextThatMaybeShouldBeRemoved
      >;

      this._receiver.registerMessageHandler(
        (message) => {
          return actualHandlers.processMessage(message, {});
        },
        (err) => {
          // TODO: this isn't right - the receiver's onError  is not async and needs to be fixed.
          handlers.processError(err);
        }
      );
    } else {
      throw new Error("Invalid receive mode");
    }
  }

  /**
   * Gets an iterator of messages that also contains a context that can be used to
   * settle messages.
   */
  iterateMessages(): MessageIterator<ContextType<"peekLock">>;
  /**
   * Gets an iterator of messages
   */
  iterateMessages(): MessageIterator<ContextType<"receiveAndDelete">>;
  iterateMessages():
    | MessageIterator<ContextType<"peekLock">>
    | MessageIterator<ContextType<"receiveAndDelete">> {
    // TODO: this needs to be more configurable - at least with timeouts, etc...
    const messageIterator = this._receiver.getMessageIterator();

    if (this._receiveMode === ReceiveMode.peekLock) {
      const actualMessageIterator = (messageIterator as any) as MessageIterator<
        ContextType<"peekLock">
        >;
      
      const f = async function * (originalMessageIterator: AsyncIterableIterator<ServiceBusMessage>) : AsyncIterableIterator<MessageAndContext < ContextType < "peekLock" >>> {
        for await(const message of originalMessageIterator) {
        yield { message, context: settlementContext };
        }
      };

      // actualMessageIterator.context = settlementContext;
      return f(messageIterator);
      return actualMessageIterator;
    } else if (this._receiveMode === ReceiveMode.receiveAndDelete) {
        const f = async function * (originalMessageIterator: AsyncIterableIterator<ServiceBusMessage>) : AsyncIterableIterator<MessageAndContext < ContextType < "receiveAndDelete" >>> {
          for await(const message of originalMessageIterator) {
            yield { message, context: { } };
          }
        };  

      // actualMessageIterator.context = {};
      // return actualMessageIterator;
      return f(messageIterator);
    } else {
      throw new Error("Unknown receive mode");
    }
  }

  renewSessionLock(): Promise<Date> {
    if (!this.isSessionReceiver(this._receiver)) {
      throw new Error("Can't renew a session lock on a non-session based client");
    }

    return this._receiver.renewSessionLock();
  }

  private isSessionReceiver(receiver: InternalSessionReceiver | InternalReceiver): receiver is InternalSessionReceiver {
    return this._sessionEnabled;
  }

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

  private _receiver: InternalSessionReceiver | InternalReceiver;
  private _sessionEnabled: boolean;
  private _receiveMode: ReceiveMode;
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
