// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  SendableMessageInfo,
  generateUuid,
  TopicClient,
  SubscriptionClient
} from "../lib";

const testMessages: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid}`
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid}`
  }
];

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(peekedMsgs.length, expectedPeekLength);
}

describe("Simple send/receive to/from Queue/Topic/Subscription", function(): void {
  let namespace: Namespace;
  let queueClient: QueueClient;
  let topicClient: TopicClient;
  let subscriptionClient: SubscriptionClient;

  beforeEach(async () => {
    // The tests in this file expect the env variables to contain the connection string and
    // the names of empty queue/topic/subscription that are to be tested

    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw new Error(
        "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
    }
    if (!process.env.TOPIC_NAME) {
      throw new Error("Define TOPIC_NAME in your environment before running integration tests.");
    }
    if (!process.env.QUEUE_NAME) {
      throw new Error("Define QUEUE_NAME in your environment before running integration tests.");
    }
    if (!process.env.SUBSCRIPTION_NAME) {
      throw new Error(
        "Define SUBSCRIPTION_NAME in your environment before running integration tests."
      );
    }

    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
    queueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
    topicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
    subscriptionClient = namespace.createSubscriptionClient(
      process.env.TOPIC_NAME,
      process.env.SUBSCRIPTION_NAME
    );

    const peekedQueueMsg = await queueClient.peek();
    if (peekedQueueMsg.length) {
      throw new Error("Please use an empty queue for integration testing");
    }

    const peekedSubscriptionMsg = await subscriptionClient.peek();
    if (peekedSubscriptionMsg.length) {
      throw new Error("Please use an empty Subscription for integration testing");
    }
  });

  afterEach(async () => {
    return namespace.close();
  });

  it("Simple send using Queues", async function(): Promise<void> {
    await queueClient.send(testMessages[0]);
    const msgs = await queueClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);

    await msgs[0].complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("Simple send using Topics and Subscriptions", async function(): Promise<void> {
    await topicClient.send(testMessages[0]);
    const msgs = await subscriptionClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);

    await msgs[0].complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Schedule message using Queues", async function(): Promise<void> {
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await queueClient.scheduleMessage(testMessages[0], scheduleTime);

    const msgs = await queueClient.receiveBatch(1);
    const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgEnqueueTime - scheduleTime.valueOf() >= 0, true); // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    await msgs[0].complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("Schedule message using Topics and Subscriptions", async function(): Promise<void> {
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await topicClient.scheduleMessage(testMessages[0], scheduleTime);

    const msgs = await subscriptionClient.receiveBatch(1);
    const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgEnqueueTime - scheduleTime.valueOf() >= 0, true); // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    await msgs[0].complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });
});
