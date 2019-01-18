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
  TopicClient,
  SubscriptionClient,
  delay,
  MessageSession
} from "../lib";

import {
  testSimpleMessages,
  testMessagesToSamePartitions,
  testMessagesWithSessions,
  testSessionId,
  testMessagesToSamePartitionsWithSessions
} from "./testUtils";

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient | MessageSession,
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

let partitionedQueueSessionClient: QueueClient;
let partitionedQueueMessageSession: MessageSession;
let partitionedTopicSessionClient: TopicClient;
let partitionedSubscriptionSessionClient: SubscriptionClient;
let partitionedSubscriptionMessageSession: MessageSession;

let unpartitionedQueueSessionClient: QueueClient;
let unpartitionedQueueMessageSession: MessageSession;
let unpartitionedTopicSessionClient: TopicClient;
let unpartitionedSubscriptionSessionClient: SubscriptionClient;
let unpartitionedSubscriptionMessageSession: MessageSession;

async function beforeEachTest(): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  if (
    !process.env.TOPIC_NAME ||
    !process.env.TOPIC_NAME_NO_PARTITION ||
    !process.env.TOPIC_NAME_NO_PARTITION_SESSION ||
    !process.env.TOPIC_NAME_SESSION
  ) {
    throw new Error(
      "Define TOPIC_NAME, TOPIC_NAME_NO_PARTITION, TOPIC_NAME_SESSION & TOPIC_NAME_NO_PARTITION_SESSION in your environment before running integration tests."
    );
  }
  if (
    !process.env.QUEUE_NAME ||
    !process.env.QUEUE_NAME_NO_PARTITION ||
    !process.env.QUEUE_NAME_NO_PARTITION_SESSION ||
    !process.env.QUEUE_NAME_SESSION
  ) {
    throw new Error(
      "Define QUEUE_NAME, QUEUE_NAME_NO_PARTITION, QUEUE_NAME_SESSION & QUEUE_NAME_NO_PARTITION_SESSION in your environment before running integration tests."
    );
  }
  if (
    !process.env.SUBSCRIPTION_NAME ||
    !process.env.SUBSCRIPTION_NAME_NO_PARTITION ||
    !process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION ||
    !process.env.SUBSCRIPTION_NAME_SESSION
  ) {
    throw new Error(
      "Define SUBSCRIPTION_NAME, SUBSCRIPTION_NAME_NO_PARTITION, SUBSCRIPTION_NAME_SESSION & SUBSCRIPTION_NAME_NO_PARTITION_SESSION in your environment before running integration tests."
    );
  }

  namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  // Partitioned Queues and Subscriptions
  partitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
  partitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  partitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );

  // Unpartitioned Queues and Subscriptions
  unpartitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME_NO_PARTITION);
  unpartitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME_NO_PARTITION);
  unpartitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION
  );

  // Partitioned Queues and Subscriptions with Sessions
  partitionedQueueSessionClient = namespace.createQueueClient(process.env.QUEUE_NAME_SESSION);
  partitionedQueueMessageSession = await partitionedQueueSessionClient.acceptSession({
    sessionId: testSessionId
  });
  partitionedTopicSessionClient = namespace.createTopicClient(process.env.TOPIC_NAME_SESSION);
  partitionedSubscriptionSessionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_SESSION,
    process.env.SUBSCRIPTION_NAME_SESSION
  );
  partitionedSubscriptionMessageSession = await partitionedSubscriptionSessionClient.acceptSession({
    sessionId: testSessionId
  });

  // Unpartitioned Queues and Subscriptions with Sessions
  unpartitionedQueueSessionClient = namespace.createQueueClient(
    process.env.QUEUE_NAME_NO_PARTITION_SESSION
  );
  unpartitionedQueueMessageSession = await unpartitionedQueueSessionClient.acceptSession({
    sessionId: testSessionId
  });
  unpartitionedTopicSessionClient = namespace.createTopicClient(
    process.env.TOPIC_NAME_NO_PARTITION_SESSION
  );
  unpartitionedSubscriptionSessionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION_SESSION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION
  );
  unpartitionedSubscriptionMessageSession = await unpartitionedSubscriptionSessionClient.acceptSession(
    {
      sessionId: testSessionId
    }
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

  const peekedPartitionedQueueSessionMsg = await partitionedQueueSessionClient.peek();
  if (peekedPartitionedQueueSessionMsg.length) {
    throw new Error("Please use an empty partitioned queue with sessions for integration testing");
  }

  const peekedPartitionedSubscriptionSessionMsg = await partitionedSubscriptionSessionClient.peek();
  if (peekedPartitionedSubscriptionSessionMsg.length) {
    throw new Error("Please use an empty partitioned queue with sessions for integration testing");
  }

  const peekedUnPartitionedQueueSessionMsg = await unpartitionedQueueSessionClient.peek();
  if (peekedUnPartitionedQueueSessionMsg.length) {
    throw new Error("Please use an empty partitioned queue with sessions for integration testing");
  }

  const peekedUnPartitionedSubscriptionSessionMsg = await unpartitionedSubscriptionSessionClient.peek();
  if (peekedUnPartitionedSubscriptionSessionMsg.length) {
    throw new Error("Please use an empty partitioned queue with sessions for integration testing");
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
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
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

  it("Simple send using Partitioned Topics and Subscriptions", async function(): Promise<void> {
    await testSimpleSend(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Simple send using Unpartitioned Queues", async function(): Promise<void> {
    await testSimpleSend(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Simple send using Unpartitioned Topics and Subscriptions", async function(): Promise<void> {
    await testSimpleSend(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Simple send using Partitioned Queues with Sessions", async function(): Promise<void> {
    await testSimpleSend(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Simple send using Partitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testSimpleSend(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Simple send using Unpartitioned Queues with Sessions", async function(): Promise<void> {
    await testSimpleSend(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("Simple send using Unpartitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testSimpleSend(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Schedule a single message to Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testScheduleMessage(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.scheduleMessage(scheduleTime, testMessages[0]);

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

  it("Schedule single message using Partitioned Queues", async function(): Promise<void> {
    await testScheduleMessage(partitionedQueueClient, partitionedQueueClient);
  });

  it("Schedule single message using Partitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testScheduleMessage(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Schedule single message using Unpartitioned Queues", async function(): Promise<void> {
    await testScheduleMessage(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Schedule single message using Unpartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testScheduleMessage(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Schedule single message using Partitioned Queues with Sessions", async function(): Promise<
    void
  > {
    await testScheduleMessage(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Schedule single message using Partitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testScheduleMessage(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Schedule single message using Unpartitioned Queues with Sessions", async function(): Promise<
    void
  > {
    await testScheduleMessage(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      true
    );
  });

  it("Schedule single message using Unpartitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testScheduleMessage(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Schedule multiple messages to Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testScheduleMessages(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.scheduleMessages(scheduleTime, testMessages);

    const msgs = await receiverClient.receiveBatch(2);
    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 2);

    const msgEnqueueTime1 = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;
    const msgEnqueueTime2 = msgs[1].enqueuedTimeUtc ? msgs[1].enqueuedTimeUtc.valueOf() : 0;

    // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgEnqueueTime1 - scheduleTime.valueOf() >= 0, true);
    should.equal(msgEnqueueTime2 - scheduleTime.valueOf() >= 0, true);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[1].messageId, testMessages[1].messageId);

    await msgs[0].complete();
    await msgs[1].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Schedule messages using Queues", async function(): Promise<void> {
    await testScheduleMessages(partitionedQueueClient, partitionedQueueClient);
  });

  it("Schedule messages using Topics and Subscriptions", async function(): Promise<void> {
    await testScheduleMessages(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Schedule messages using UnPartitioned Queues", async function(): Promise<void> {
    await testScheduleMessages(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Schedule messages using UnPartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testScheduleMessages(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Schedule messages using Partitioned Queues with Sessions", async function(): Promise<void> {
    await testScheduleMessages(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Schedule messages using Partitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testScheduleMessages(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Schedule messages using Unpartitioned Queues with Sessions", async function(): Promise<void> {
    await testScheduleMessages(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      true
    );
  });

  it("Schedule messages using Unpartitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testScheduleMessages(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Cancel a single Scheduled message for sending to Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessage(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber = await senderClient.scheduleMessage(scheduleTime, testMessages[0]);

    await delay(2000);

    await senderClient.cancelScheduledMessage(sequenceNumber);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Cancel a single Scheduled message using Partitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessage(partitionedQueueClient, partitionedQueueClient);
  });

  it("Cancel a single Scheduled message using Partitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Cancel a single Scheduled message using Unpartitioned Queues", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Cancel a single Scheduled message using Unpartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Cancel a single Scheduled message using Partitioned Queues with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      true
    );
  });

  it("Cancel a single Scheduled message using Partitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Cancel a single Scheduled message using Unpartitioned Queues with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      true
    );
  });

  it("Cancel a single Scheduled message using Unpartitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessage(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Cancel multiple Scheduled messages for sending to Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessages(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    usePartitions?: boolean,
    useSessions?: boolean
  ): Promise<void> {
    let testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    if (usePartitions) {
      testMessages = useSessions
        ? testMessagesToSamePartitionsWithSessions
        : testMessagesToSamePartitions;
    }
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber1 = await senderClient.scheduleMessage(scheduleTime, testMessages[0]);
    const sequenceNumber2 = await senderClient.scheduleMessage(scheduleTime, testMessages[1]);

    await delay(2000);

    await senderClient.cancelScheduledMessages([sequenceNumber1, sequenceNumber2]);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Cancel Scheduled messages using Partitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessages(partitionedQueueClient, partitionedQueueClient, true, false);
  });

  it("Cancel Scheduled messages using Partitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      true,
      false
    );
  });

  it("Cancel Scheduled messages using Unpartitioned Queues", async function(): Promise<void> {
    await testCancelScheduleMessages(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      false,
      false
    );
  });

  it("Cancel Scheduled messages using Unpartitioned Topics and Subscriptions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      false,
      false
    );
  });

  it("Cancel Scheduled messages using Partitioned Queues with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      true,
      true
    );
  });

  it("Cancel Scheduled messages using Partitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true,
      true
    );
  });

  it("Cancel Scheduled messages using Unpartitioned Queues with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      true,
      true
    );
  });

  it("Cancel Scheduled messages using Unpartitioned Topics and Subscriptions with Sessions", async function(): Promise<
    void
  > {
    await testCancelScheduleMessages(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true,
      true
    );
  });
});
