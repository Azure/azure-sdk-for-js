// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusMessage, ReceiveMode } from "../serviceBusMessage";
import { ServiceBusClientReceiverOptions } from "../receiverClient";
import { ClientEntityContext } from "../clientEntityContext";
import { createConnectionContextForConnectionString } from "../serviceBusClient";
import { generate_uuid } from "rhea-promise";
import { ClientType } from "../client";
import { SessionReceiver, Receiver } from "../receiver";
import {
  MessageHandlers,
  MessageIterator,
  Session,
  ContextType,
  ContextWithSettlement,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "./models";
import { getEntityPath, isReceiveMode, convertToInternalReceiveMode } from "./constructorHelpers";
import { RuleDescription, CorrelationFilter } from "../core/managementClient";

/**
 *A receiver client that handles sessions, including renewing the session lock.
 */
// TODO: could extend NonSessionReceiverClient...?
export interface SessionReceiverClient<LockModeT extends "PeekLock" | "ReceiveAndDelete"> {
  streamMessages(handlers: MessageHandlers<ContextType<LockModeT>>): void;
  iterateMessages(): MessageIterator<ContextType<LockModeT>>;
  renewSessionLock(): Promise<Date>;
}

/**
 * A receiver client that does not handle sessions.
 */
export interface NonSessionReceiverClient<LockModeT extends "PeekLock" | "ReceiveAndDelete"> {
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

interface ReceiverClient {
    /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueConnectionString: string,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"PeekLock">;
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param receiveMode The receiveMode to use (defaults to ReceiveAndDelete).
   * @param options Options for the client itself.
   */
  new(
    queueConnectionString: string,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"ReceiveAndDelete">;
  /**
   * Creates a client for an Azure Service Bus queue using a session.
   *
   * You can read more about Azure Service Bus sessions here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param session Information about the session - the id and the shared connections instance.
   * @param receiveMode The receiveMode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueConnectionString: string,
    session: Session,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  ): SessionReceiverClient<"PeekLock">;
  /**
   * Creates a client for an Azure Service Bus queue using a session.
   *
   * You can read more about Azure Service Bus sessions here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param session Information about the session - the id and the shared connections instance.
   * @param receiveMode The receiveMode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  new(
    queueConnectionString: string,
    session: Session,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): SessionReceiverClient<"ReceiveAndDelete">;
}

/**
 * Implementation class for receivers.
 */
export class ReceiverClientImplementation {
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param receiveMode The receive mode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  constructor(
    queueConnectionString: string,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  );
  /**
   * Creates a client for an Azure Service Bus queue.
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param receiveMode The receiveMode to use (defaults to ReceiveAndDelete).
   * @param options Options for the client itself.
   */
  constructor(
    queueConnectionString: string,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  );
  /**
   * Creates a client for an Azure Service Bus queue using a session.
   *
   * You can read more about Azure Service Bus sessions here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param session Information about the session - the id and the shared connections instance.
   * @param receiveMode The receiveMode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  constructor(
    queueConnectionString: string,
    session: Session,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  );
  /**
   * Creates a client for an Azure Service Bus queue using a session.
   *
   * You can read more about Azure Service Bus sessions here:
   * https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions
   *
   * @param queueConnectionString A connection string that points to a queue (contains EntityName=<queue-name>).
   * @param session Information about the session - the id and the shared connections instance.
   * @param receiveMode The receiveMode to use (defaults to PeekLock)
   * @param options Options for the client itself.
   */
  constructor(
    queueConnectionString: string,
    session: Session,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ); // connect directly to queue, with sessions
  constructor(
    queueConnectionString1: string,
    receiveModeOrSession2?: "PeekLock" | "ReceiveAndDelete" | Session,
    optionsOrReceiveMode3?: "PeekLock" | "ReceiveAndDelete" | ServiceBusClientReceiverOptions,
    options4?: ServiceBusClientReceiverOptions
  ) {
    // TODO: handle the other types of connection strings + other combinations
    const entityPath = getEntityPath(queueConnectionString1);
    let clientOptions: ServiceBusClientReceiverOptions | undefined;
    let session: Session | undefined;

    if (isReceiveMode(receiveModeOrSession2)) {
      this._receiveMode = convertToInternalReceiveMode(receiveModeOrSession2);
      clientOptions = optionsOrReceiveMode3 as ServiceBusClientReceiverOptions | undefined;
      session = undefined;
    } else if (isReceiveMode(optionsOrReceiveMode3)) {
      this._receiveMode = convertToInternalReceiveMode(optionsOrReceiveMode3);
      clientOptions = options4;
      session = receiveModeOrSession2;
    } else {
      // unknown?
      throw new Error("No receive mode specified (or it's in the wrong argument)");
    }

    const context = createConnectionContextForConnectionString(
      queueConnectionString1,
      clientOptions
    );
    const clientEntityContext = ClientEntityContext.create(
      entityPath,
      ClientType.ServiceBusReceiverClient,
      context,
      `${entityPath}/${generate_uuid()}`
    );

    // TODO: use the session connections object to "cache" the client entity context
    if (session != null) {
      this._receiver = new SessionReceiver(clientEntityContext, this._receiveMode, {
        sessionId: session.id
      });
      this._sessionEnabled = true;
    } else {
      this._receiver = new Receiver(clientEntityContext, this._receiveMode);
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
  iterateMessages(): MessageIterator<ContextType<"PeekLock">>;
  /**
   * Gets an iterator of messages
   */
  iterateMessages(): MessageIterator<ContextType<"ReceiveAndDelete">>;
  iterateMessages():
    | MessageIterator<ContextType<"PeekLock">>
    | MessageIterator<ContextType<"ReceiveAndDelete">> {
    // TODO: this needs to be more configurable - at least with timeouts, etc...
    const messageIterator = this._receiver.getMessageIterator();

    if (this._receiveMode === ReceiveMode.peekLock) {
      const actualMessageIterator = (messageIterator as any) as MessageIterator<
        ContextType<"PeekLock">
      >;

      actualMessageIterator.context = settlementContext;
      return actualMessageIterator;
    } else if (this._receiveMode === ReceiveMode.receiveAndDelete) {
      const actualMessageIterator = (messageIterator as any) as MessageIterator<
        ContextType<"ReceiveAndDelete">
      >;

      actualMessageIterator.context = {};
      return actualMessageIterator;
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

  private isSessionReceiver(receiver: SessionReceiver | Receiver): receiver is SessionReceiver {
    return this._sessionEnabled;
  }

  private _receiver: SessionReceiver | Receiver;
  private _sessionEnabled: boolean;
  private _receiveMode: ReceiveMode;
}

/**
 * A client that can receive messages from Service Bus Queues or Service Bus Subscriptions.
 */
export const ReceiverClient: ReceiverClient = ReceiverClientImplementation;

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
