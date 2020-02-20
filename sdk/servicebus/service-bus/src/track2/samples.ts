import {
  ReceiverClient,
  SessionConnections,
  Message,
  ContextWithSettlement as ContextWithSettlementMethods,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "../receiverClient2";
import { env } from "process";
import * as dotenv from "dotenv";

dotenv.config({
  path: "..\\..\\..\\..\\..\\..\\..\\..\\dev\\temp\\.env"
});

/**
 * @ignore
 * @internal
 */
export async function receiveMessagesUsingPeekLock() {
  console.log(`Listening, peeklock for queue ${env[`queue.withoutSessions.connectionString`]}`);
  const receiverClient = new ReceiverClient(
    env[`queue.withoutSessions.connectionString`]!,
    "PeekLock"
  );

  receiverClient.streamMessages({
    async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
      console.log(`Message body: ${message.body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      console.log(`Error thrown: ${err}`);
    }
  });
}

export async function receiveMessagesUsingReceiveAndDeleteAndSessions() {
  const sessionConnections = new SessionConnections();

  const receiverClient = new ReceiverClient(
    env[`queue.withSessions.connectionString`]!,
    {
      id: "helloworld",
      // the thinking is that users will (unlike queues or topics) open up
      // lots of individual sessions, so keeping track of and sharing connections
      // is a way to prevent a possible port/connection explosion.
      connections: sessionConnections
    },
    "ReceiveAndDelete"
  );

  // note that this method is now available - only shows up in auto-complete
  // if you construct this object with a session.
  receiverClient.renewSessionLock();

  receiverClient.streamMessages({
    async processMessage(
      message: Message,
      context: UselessEmptyContextThatMaybeShouldBeRemoved
    ): Promise<void> {
      // process message here - it's basically a ServiceBusMessage minus any settlement related methods
      console.log(message.body);
    },
    async processError(err: Error): Promise<void> {
      console.log(`Error thrown: ${err}`);
    }
  });
}

receiveMessagesUsingPeekLock();
