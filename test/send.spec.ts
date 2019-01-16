// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  SendableMessageInfo,
  generateUuid,
  TopicClient,
  SubscriptionClient,
  delay
} from "../lib";

const testMessages: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`
  }
];

const testMessagesToSamePartitions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy"
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy"
  }
];

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let namespace: Namespace;
let partitionedQueueClient: QueueClient;
let partitionedTopicClient: TopicClient;
let partitionedSubscriptionClient: SubscriptionClient;
let unpartitionedQueueClient: QueueClient;
let unpartitionedTopicClient: TopicClient;
let unpartitionedSubscriptionClient: SubscriptionClient;

async function beforeEachTest(): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  if (!process.env.TOPIC_NAME || !process.env.TOPIC_NAME_NO_PARTITION) {
    throw new Error(
      "Define TOPIC_NAME & TOPIC_NAME_NO_PARTITIONin your environment before running integration tests."
    );
  }
  if (!process.env.QUEUE_NAME || !process.env.QUEUE_NAME_NO_PARTITION) {
    throw new Error(
      "Define QUEUE_NAME & QUEUE_NAME_NO_PARTITION in your environment before running integration tests."
    );
  }
  if (!process.env.SUBSCRIPTION_NAME || !process.env.SUBSCRIPTION_NAME_NO_PARTITION) {
    throw new Error(
      "Define SUBSCRIPTION_NAME & SUBSCRIPTION_NAME_NO_PARTITION in your environment before running integration tests."
    );
  }

  namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
  partitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
  partitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  partitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );

  unpartitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME_NO_PARTITION);
  unpartitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME_NO_PARTITION);
  unpartitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION
  );

  const peekedPartitionedQueueMsg = await partitionedQueueClient.peek();
  if (peekedPartitionedQueueMsg.length) {
    throw new Error("Please use an empty partitioned queue for integration testing");
  }

  const peekedPartitionedSubscriptionMsg = await partitionedSubscriptionClient.peek();
  if (peekedPartitionedSubscriptionMsg.length) {
    throw new Error("Please use an empty partitioned Subscription for integration testing");
  }

  const peekedUnPartitionedQueueMsg = await unpartitionedQueueClient.peek();
  if (peekedUnPartitionedQueueMsg.length) {
    throw new Error("Please use an empty unpartitioned queue for integration testing");
  }

  const peekedUnPartitionedSubscriptionMsg = await unpartitionedSubscriptionClient.peek();
  if (peekedUnPartitionedSubscriptionMsg.length) {
    throw new Error("Please use an empty unpartitioned Subscription for integration testing");
  }
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}

describe("Send to Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testSimpleSend(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessages[0]);
    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);

    await msgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Simple send using Partitioned Queues", async function(): Promise<void> {
    await testSimpleSend(partitionedQueueClient, partitionedQueueClient);
  });

  it("Simple send using Topics and Subscriptions", async function(): Promise<void> {
    await testSimpleSend(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Simple send using UnPartitioned Queues", async function(): Promise<void> {
    await testSimpleSend(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Simple send using UnPartitioned Topics and Subscriptions", async function(): Promise<void> {
    await testSimpleSend(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  async function testScheduleMessage(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.scheduleMessage(testMessages[0], scheduleTime);

    const msgs = await receiverClient.receiveBatch(1);
    const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgEnqueueTime - scheduleTime.valueOf() >= 0, true); // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    await msgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Schedule message using Queues", async function(): Promise<void> {
    await testScheduleMessage(partitionedQueueClient, partitionedQueueClient);
  });

  it("Schedule message using Topics and Subscriptions", async function(): Promise<void> {
    await testScheduleMessage(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Schedule message using UnPartitioned Queues", async function(): Promise<void> {
    await testScheduleMessage(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Schedule message using UnPartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testScheduleMessage(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });
});

describe("Cancel Scheduled messages for sending to Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessage(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber = await senderClient.scheduleMessage(testMessages[0], scheduleTime);

    await delay(2000);

    await senderClient.cancelScheduledMessage(sequenceNumber);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Cancel Scheduled message using Partitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessage(partitionedQueueClient, partitionedQueueClient);
  });

  it("Cancel Scheduled message using Partitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Cancel Scheduled message using unPartitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessage(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Cancel Scheduled message using unPartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  async function testCancelScheduleMessages(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    msgs: SendableMessageInfo[]
  ): Promise<void> {
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber1 = await senderClient.scheduleMessage(msgs[0], scheduleTime);
    const sequenceNumber2 = await senderClient.scheduleMessage(msgs[1], scheduleTime);

    await delay(2000);

    await senderClient.cancelScheduledMessages([sequenceNumber1, sequenceNumber2]);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Cancel Scheduled messages using Partitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessages(
      partitionedQueueClient,
      partitionedQueueClient,
      testMessagesToSamePartitions
    );
  });

  it("Cancel Scheduled messages using Partitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      testMessagesToSamePartitions
    );
  });

  it("Cancel Scheduled messages using unPartitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessages(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      testMessages
    );
  });

  it("Cancel Scheduled messages using unPartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      testMessages
    );
  });
});
