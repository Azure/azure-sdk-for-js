import { ReceivedMessage, ContextWithSettlement as ContextWithSettlementMethods } from "./models";
import { env } from "process";
import * as dotenv from "dotenv";
import { ServiceBusClient } from "./serviceBusClient";
import { delay } from "@azure/core-amqp";

dotenv.config();

/**
 * @ignore
 * @internal
 */
export async function receiveMessagesUsingPeekLock() {
  const serviceBusClient = new ServiceBusClient(testParams.connectionString);
  const receiverClient = serviceBusClient.createReceiver(
    testParams.withoutSessions.queueName,
    "peekLock"
  );

  receiverClient.subscribe(
    {
      async processMessage(
        message: ReceivedMessage,
        context: ContextWithSettlementMethods
      ): Promise<void> {
        console.log(`Message received. Body: ${message.body}`);

        try {
          await insertIntoDatabase(message.body);

          await context.complete(message);
        } catch (err) {
          // if we fail to abandon it here (let's say we're having catastrophic issues)
          // then service bus will eventually abandon it on our behalf after a server
          // configured time out.
          await context.abandon(message);
          throw err;
        }
      },
      async processError(err: Error): Promise<void> {
        await sendToAppInsights(err);
      }
    },
    {
      autoComplete: false, // default is 'true'
      maxConcurrentCalls: 1, // default
      maxMessageAutoRenewLockDurationInSeconds: 300 // default
      // NOTE: can also set to '0' to say "don't do auto lock renewal"
    }
  );

  await delay(10 * 1000);

  await receiverClient.close();
  await serviceBusClient.close();
}

export async function receiveMessagesUsingPeekLockForSubscription() {
  const log = (...args: any[]) => console.log(`receiveMessagesUsingPeekLockSubscription:`, ...args);
  log(`Listening, peeklock for queue`);

  const serviceBusClient = new ServiceBusClient(testParams.connectionString);
  const receiver = serviceBusClient.createReceiver(
    testParams.withoutSessions.topicName,
    testParams.withoutSessions.subscriptionName,
    "peekLock"
  );

  // we know it's a subscription so we also offer the rule management methods
  // receiver.getRules();
  // receiver.addRule();
  // receiver.removeRule();

  const myMessageHandler = {
    async processMessage(
      message: ReceivedMessage,
      context: ContextWithSettlementMethods
    ): Promise<void> {
      const body = message.body;
      log(`Message body: ${body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  };

  receiver.subscribe(myMessageHandler, {
    // just to illustrate doing manual message settlement
    autoComplete: false
  });

  await receiver.close();
  await serviceBusClient.close();
}

export async function iterateMessageFromSubscription() {
  console.log(`Using an async iterable iterator to get messages from a subscription`);

  const serviceBusClient = new ServiceBusClient(testParams.connectionString);

  const receiverClient = serviceBusClient.createReceiver(
    testParams.withoutSessions.topicName,
    testParams.withoutSessions.subscriptionName,
    "peekLock"
  );

  let numIntervalsWithoutMessage = 0;

  for await (const { message, context } of receiverClient.getMessageIterator()) {
    if (message == null) {
      // (no message arrived in our maximum wait time)
      console.log(`No message arrived within our max wait time`);
      numIntervalsWithoutMessage++;

      if (numIntervalsWithoutMessage > 5) {
        // maybe we should just shut down rather than keep waiting
        break;
      }

      continue;
    }

    // we no longer get auto-completion so we need to handle it ourselves.
    try {
      console.log(`Message body: ${message.body}`);
      await context.complete(message);
    } catch (err) {
      console.log(`Error: ${err}. Will abandon message`);
      await context.abandon(message);
    }
  }
}

export async function receiveMessagesUsingReceiveAndDeleteAndSessions() {
  const log = (...args: any[]) =>
    console.log(`receiveMessagesUsingReceiveAndDeleteAndSessions:`, ...args);
  log(`Listening, receiveAndDelete for queue with session ID \`helloworld\``);
  const serviceBusClient = new ServiceBusClient(testParams.connectionString);

  // note we have a new method - "createSessionReceiver"
  const receiver = serviceBusClient.createSessionReceiver(
    testParams.withSessions.queueName,
    "receiveAndDelete",
    "helloworld"
  );

  // the user can also say "just give me the next session from the server"
  // const nextUnlockedSession  = serviceBusClient.createSessionReceiver(testParams.withSessions.queueName, "receiveAndDelete", "");

  // can be manually triggered by the user but we do this
  // in the background on their behalf.
  // await receiver.renewSessionLock();

  receiver.subscribe({
    processMessage: async (message, context) => {
      // process message here - it's basically a ServiceBusMessage minus any settlement related methods
      log(message.body);
    },
    processError: async (err: Error) => {
      log(`Error thrown: ${err}`);
    }
  });
}

async function runAll() {
  const promises = [
    receiveMessagesUsingPeekLock(),
    receiveMessagesUsingPeekLockForSubscription(),
    receiveMessagesUsingReceiveAndDeleteAndSessions(),
    iterateMessageFromSubscription()
  ];

  await Promise.all(promises);
}

runAll();

async function insertIntoDatabase(message: ReceivedMessage): Promise<void> {}

async function sendToAppInsights(err: Error): Promise<void> {}

const testParams = {
  connectionString: env["SERVICE_BUS_CONNECTION_STRING"]!,

  withSessions: {
    queueName: "unpartitioned-queue-sessions",
    topicName: "unpartitioned-topic-sessions",
    subscriptionName: "unpartitioned-topic-sessions-subscription"
  },
  withoutSessions: {
    queueName: "unpartitioned-queue",
    topicName: "unpartitioned-topic",
    subscriptionName: "unpartitioned-topic-subscription"
  }
};
