import {
  SessionConnections,
  Message,
  ContextWithSettlement as ContextWithSettlementMethods,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "../src/track2/models";
import { env } from "process";
import { ServiceBusReceiverClient } from '../src/track2/serviceBusReceiverClient';
import { ServiceBusSenderClient, delay } from '../src';
import { EnvVarNames } from './utils/envVarUtils';
import { EntityNames } from './utils/testUtils';
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe.only("Samples scenarios for track 2", () => {
  // QUEUE_NAME_NO_PARTITION = "unpartitioned-queue",
  // QUEUE_NAME_NO_PARTITION_SESSION = "unpartitioned-queue-sessions",
  // SUBSCRIPTION_NAME_NO_PARTITION = "unpartitioned-topic-subscription",
  // SUBSCRIPTION_NAME_NO_PARTITION_SESSION = "unpartitioned-topic-sessions-subscription",

  let senderClient: ServiceBusSenderClient | undefined;
  const connectionString = env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]!;

  before(() => {
    assert.ok(connectionString, `${EnvVarNames.SERVICEBUS_CONNECTION_STRING} needs to be set in the environment`);
  });

  afterEach(async () => {
    if (senderClient != null) {
      await senderClient.close();
      senderClient = undefined;
    }
  })

  async function sendSampleMessage(body: string) {
    if (senderClient == null) {
      throw new Error("Can't send a sample message w/o a client");
    }

    await senderClient.send({
      body
    });
  }

  it.only("receive message using peek lock and a queue", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
      },
      "peekLock"
    );

    try {
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      senderClient = new ServiceBusSenderClient(connectionString, EntityNames.QUEUE_NAME_NO_PARTITION);
    
      await sendSampleMessage("hello from receive message using peek lock and a queue");

      receiverClient.streamMessages({
        async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
          await context.complete(message);
          receivedBodies.push(message.body);
          await receiverClient.close();
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
          await receiverClient.close();
        }
      });

      // wait for a message or an error (whichever comes first)
      while (receivedBodies.length === 0 && errors.length === 0) {
        await delay(500);
      }

      assert.isEmpty(errors);
      assert.deepEqual(["hello from receive message using peek lock and a queue"], receivedBodies);
    } finally {
      await receiverClient.close();
    }
  });

  it("receiveMessagesUsingPeekLockSubscription", async () => {
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
  });

  it("iterateMessageFromSubscription", async () => {
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
  });

  it("receiveMessagesUsingReceiveAndDeleteAndSessions", async () => {
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
    )

    // note that this method is now available - only shows up in auto-complete
    // if you construct this object with a session.
    await receiverClient.renewSessionLock();

    receiverClient.streamMessages({
      async processMessage(
        message: Message,
        context: UselessEmptyContextThatMaybeShouldBeRemoved
      ): Promise<void> {
        // process message here - it's basically a ServiceBusMessage minus any settlement related methods
        log(message.body);
      },
      async processError(err: Error): Promise<void> {
        log(`Error thrown: ${err}`);
      }
    });
  });
});