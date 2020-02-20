import { ServiceBusMessage, ReceiveMode } from "./serviceBusMessage";
import { ServiceBusClientReceiverOptions } from "./receiverClient";
import { ClientEntityContext } from "./clientEntityContext";
import { createConnectionContextForConnectionString } from "./serviceBusClient";
import { generate_uuid } from "rhea-promise";
import { ClientType } from "./client";
import { SessionReceiver, Receiver } from "./receiver";

/**
 * An opaque class, used internally to manage AMQP connections for sessions.
 */
export class SessionConnections {}

// function isSession(possibleSession: Session | any): session is Session {
//   const session = possibleSession as Session;
//   return session.connections != null;
// }

export interface Session {
  id: string;
  connections: SessionConnections;
}

// the "action" methods here are on the context object instead.
export interface Message
  extends Omit<
    typeof ServiceBusMessage,
    | "complete"
    | "abandon"
    | "defer"
    | "deadletter"
    // Um..am I doing something odd here or is this a normal thing to exclude?
    | "prototype"
  > {}

export interface ContextWithSettlement {
  complete(m: Message): Promise<void>;
  abandon(m: Message): Promise<void>;
  defer(m: Message): Promise<void>;
  deadLetter(m: Message): Promise<void>;
}

export interface EmptyContext {}

export interface MessageHandlers<ContextT> {
  processMessage(message: Message, context: ContextT): Promise<void>;
  processError(err: Error): Promise<void>;
}

export interface Closeable {
  close(): Promise<void>;
}

export interface MessageIterator<ContextT> extends AsyncIterable<Message> {
  context: ContextT;
}

export type ContextType<LockModeT> = LockModeT extends "PeekLock"
  ? ContextWithSettlement
  : LockModeT extends "ReceiveAndDelete"
  ? EmptyContext
  : never;

// TODO: could extend NonSessionReceiverClient
export interface SessionReceiverClient<LockModeT extends "PeekLock" | "ReceiveAndDelete"> {
  streamMessages(handlers: MessageHandlers<ContextType<LockModeT>>): void;
  iterateMessages(): MessageIterator<ContextType<LockModeT>>;
  renewSessionLock(): Promise<Date>;
}

export interface NonSessionReceiverClient<LockModeT extends "PeekLock" | "ReceiveAndDelete"> {
  streamMessages(handlers: MessageHandlers<ContextType<LockModeT>>): void;
  iterateMessages(): MessageIterator<ContextType<LockModeT>>;
}

function getEntityPath(
  connectionString: string,
  optionalQueueOrSubscriptionOrTopicName?: string,
  optionalSubscriptionName?: string
): string {
  const entityPathMatch = connectionString.match(/^.+EntityPath=(.+?);{0,1}$/);
  let entityPath: string;

  if (entityPathMatch!.length !== 2) {
    if (optionalQueueOrSubscriptionOrTopicName == null) {
      throw new Error("No entity in conection string - queue/topic parameter is required");
    }

    let queueOrTopicName = optionalQueueOrSubscriptionOrTopicName;

    // servicebus connection string only (ie, no entity name)
    if (optionalSubscriptionName != null) {
      // topic + sub
      entityPath = `${queueOrTopicName}/Subscriptions/${optionalSubscriptionName}`;
    } else {
      // queue only
      entityPath = queueOrTopicName!;
    }
  } else {
    const baseEntityPath = entityPath![1]!;

    if (optionalQueueOrSubscriptionOrTopicName != null) {
      // topic (from connection string) + sub
      entityPath = `${baseEntityPath}/Subscriptions/${optionalQueueOrSubscriptionOrTopicName}`;
    } else {
      // queue
      entityPath = baseEntityPath;
    }
  }

  return entityPath;
}

export interface ReceiverClient {
  new (
    queueConnectionString: string,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"PeekLock">;
  new (
    queueConnectionString: string,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): NonSessionReceiverClient<"ReceiveAndDelete">;
  new (
    queueConnectionString: string,
    session: Session,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  ): SessionReceiverClient<"PeekLock">;
  new (
    queueConnectionString: string,
    session: Session,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  ): SessionReceiverClient<"ReceiveAndDelete">;
}

function isReceiveMode(
  possibleReceiveMode:
    | "PeekLock"
    | "ReceiveAndDelete"
    | Session
    | ServiceBusClientReceiverOptions
    | undefined
): possibleReceiveMode is "PeekLock" | "ReceiveAndDelete" {
  return (
    possibleReceiveMode != null &&
    typeof possibleReceiveMode === "string" &&
    (possibleReceiveMode === "PeekLock" || possibleReceiveMode === "ReceiveAndDelete")
  );
}

function convertToInternalReceiveMode(receiveMode: "PeekLock" | "ReceiveAndDelete"): ReceiveMode {
  switch (receiveMode) {
    case "PeekLock":
      return ReceiveMode.peekLock;
    case "ReceiveAndDelete":
      return ReceiveMode.receiveAndDelete;
    // TODO: this is just a compile error if someone adds another string enum value, right?
  }
}

export const ReceiverClient: ReceiverClient = class {
  // non sessions
  constructor(
    queueConnectionString: string,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  );
  constructor(
    queueConnectionString: string,
    receiveMode: "ReceiveAndDelete",
    options?: ServiceBusClientReceiverOptions
  );
  // sessions
  constructor(
    queueConnectionString: string,
    session: Session,
    receiveMode?: "PeekLock",
    options?: ServiceBusClientReceiverOptions
  );
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
      // no sessions
      this._receiveMode = convertToInternalReceiveMode(receiveModeOrSession2);
      clientOptions = optionsOrReceiveMode3 as ServiceBusClientReceiverOptions | undefined;
      session = undefined;
    } else if (isReceiveMode(optionsOrReceiveMode3)) {
      // sessions, yo
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

  streamMessages(handlers: MessageHandlers<ContextWithSettlement>): void;
  streamMessages(handlers: MessageHandlers<EmptyContext>): void;
  streamMessages(
    handlers: MessageHandlers<EmptyContext> | MessageHandlers<ContextWithSettlement>
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
      const actualHandlers = handlers as MessageHandlers<EmptyContext>;

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

  iterateMessages(): MessageIterator<ContextType<"PeekLock">>;
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
};

const settlementContext: ContextWithSettlement = {
  // TODO: need to move the settlement methods out of sb message -
  // we don't need to have this runtime dependency.
  abandon: (message) => ((message as unknown) as ServiceBusMessage).abandon(),
  complete: (message) => ((message as unknown) as ServiceBusMessage).complete(),
  defer: (message) => ((message as unknown) as ServiceBusMessage).defer(),
  deadLetter: (message) => ((message as unknown) as ServiceBusMessage).deadLetter()
};
