import {
  SessionConnections,
  ContextWithSettlement as ContextWithSettlementMethods,
  ReceivedMessage
} from "./modelsTrack2";
import { env } from "process";
import * as dotenv from "dotenv";
import {
  ServiceBusReceiverClient,
  ClientTypeT,
  NonSessionReceiver,
  SubscriptionRuleManagement
} from "./serviceBusReceiverClient";
import { ServiceBusSenderClient } from "./senderClient";

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
    async processMessage(
      message: ReceivedMessage,
      context: ContextWithSettlementMethods
    ): Promise<void> {
      log(`Message body: ${message.body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });
}

export async function createReceiverWithReceiveMode(receiveMode: "peekLock" | "receiveAndDelete") {
  // 1. This doesn't work
  // return new ServiceBusReceiverClient(
  //   {
  //     connectionString: "conn-string",
  //     queueName: "queue-name"
  //   },
  //   receiveMode
  // );

  // 2. This works
  if (receiveMode === "peekLock") {
    return new ServiceBusReceiverClient(
      {
        connectionString: "conn-string",
        queueName: "queue-name"
      },
      receiveMode
    );
  } else {
    return new ServiceBusReceiverClient(
      {
        connectionString: "conn-string",
        queueName: "queue-name"
      },
      receiveMode
    );
  }
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
    async processMessage(
      message: ReceivedMessage,
      context: ContextWithSettlementMethods
    ): Promise<void> {
      log(`Message body: ${message.body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });
}

export function getSampleReceiverClient1(): NonSessionReceiver<"peekLock"> {
  return new ServiceBusReceiverClient({ queueConnectionString: "conn-string" }, "peekLock");
}

export function getSampleReceiverClient3(): ClientTypeT<
  "peekLock" | "receiveAndDelete",
  "queue" | "subscription",
  "sessions" | "nosessions"
> {
  return new ServiceBusReceiverClient(
    { topicConnectionString: "conn-string", subscriptionName: "name" },
    "peekLock"
  );
}

const sc: ServiceBusSenderClient = new ServiceBusSenderClient("conn-string");
sc.close();

// const rc = getSampleReceiverClient3();
const rc: NonSessionReceiver<"peekLock"> &
  SubscriptionRuleManagement = new ServiceBusReceiverClient(
  { topicConnectionString: "conn-string", subscriptionName: "name" },
  "peekLock"
);
rc.defaultRuleName;

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
    async processMessage(message: ReceivedMessage): Promise<void> {
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
