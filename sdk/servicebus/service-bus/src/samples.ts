import {
  SessionConnections,
  Message,
  ContextWithSettlement as ContextWithSettlementMethods,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "./modelsTrack2";
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

  // etc...
  // receiverClient.getRules();

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

export async function iterateMessageFromSubscription() {
  const log = (...args: any[]) => console.log(`iterateMessages using peekLock:`, ...args);
  log(`Listening, peeklock for subscription`);

  const receiverClient = new ServiceBusReceiverClient(
    {
      topicConnectionString: env[`topic.all.connectionString`]!,
      subscriptionName: env["subscription.withoutsessions.foriteration.name"]!
    },
    "peekLock"
  );

  // TODO: error handling? Does the iterate just terminate?
  for await (const { message, context } of receiverClient.iterateMessages()) {

    if (message == null) {
      // user has the option of handling "no messages arrived by the maximum wait time"
      console.log(`No message arrived within our max wait time`);
      continue;
    }

    try {
      log(`Message body: ${message.body}`);
      await context.complete(message);
    } catch (err) {
      log(`Error: ${err}. Will abandon message`);
      await context.abandon(message);
    }
  }
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
    receiveMessagesUsingReceiveAndDeleteAndSessions(),
    iterateMessageFromSubscription()
  ];

  await Promise.all(promises);
}

runAll();
