import {
  SessionConnections,
  Message,
  ContextWithSettlement as ContextWithSettlementMethods,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "./models";
import { env } from "process";
import * as dotenv from "dotenv";
import { ServiceBusReceiverClient } from './serviceBusReceiverClient';

dotenv.config({
  // path: "..\\..\\..\\..\\..\\..\\..\\..\\dev\\temp\\.env"
  path: "/mnt/c/dev/temp/.env"
});

/**
 * @ignore
 * @internal
 */
export async function receiveMessagesUsingPeekLock() {
  const log = (...args: any[]) => console.log(`receiveMessagesUsingPeekLock:`, ...args);
  log(`Listening, peeklock for queue`);
  const receiverClient = new ServiceBusReceiverClient(
    { queueConnectionString: env[`queue.withoutSessions.connectionString`]! },
    "peekLock"
  );

  receiverClient.streamMessages({
    async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
      log(`Message body: ${message.body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });
}

export async function receiveMessagesUsingPeekLockSubscription() {
  const log = (...args: any[]) => console.log(`receiveMessagesUsingPeekLockSubscription:`, ...args);
  log(`Listening, peeklock for queue`);

  const receiverClient = new ServiceBusReceiverClient(
    {
      topicConnectionString: env[`topic.all.connectionString`]!,
      subscriptionName: env["subscription.withoutsessions.name"]!
    },
    "peekLock"
  );

  receiverClient.streamMessages({
    async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
      log(`Message body: ${message.body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });  
}

export async function receiveMessagesUsingReceiveAndDeleteAndSessions() {
  const log = (...args: any[]) =>
    console.log(`receiveMessagesUsingReceiveAndDeleteAndSessions:`, ...args);
  log(`Listening, receiveAndDelete for queue with session ID \`helloworld\``);
  const sessionConnections = new SessionConnections();

  const receiverClient = new ServiceBusReceiverClient(
    { queueConnectionString: env[`queue.withSessions.connectionString`]! },
    "receiveAndDelete",
    {
      id: "helloworld",
      // the thinking is that users will (unlike queues or topics) open up
      // lots of individual sessions, so keeping track of and sharing connections
      // is a way to prevent a possible port/connection explosion.
      connections: sessionConnections
    }    
  );

  // note that this method is now available - only shows up in auto-complete
  // if you construct this object with a session.
  await receiverClient.renewSessionLock();

  receiverClient.streamMessages({
    async processMessage(
      message: Message,
      context: UselessEmptyContextThatMaybeShouldBeRemoved
    ): Promise<void>  {
      // process message here - it's basically a ServiceBusMessage minus any settlement related methods
      log(message.body);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });
}

async function runAll() {
  const promises = [
    receiveMessagesUsingPeekLock(),
    receiveMessagesUsingPeekLockSubscription(),
    receiveMessagesUsingReceiveAndDeleteAndSessions()
  ];

  await Promise.all(promises);
}

runAll();
