// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
  SendableMessageInfo
} from "../lib";

import {
  testSimpleMessages,
  testMessagesWithSessions,
  testSessionId1,
  getSenderReceiverClients,
  ClientType,
  purge
} from "./testUtils";
import { Receiver, SessionReceiver } from "../lib/receiver";

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

let ns: Namespace;
let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

let receiver: Receiver | SessionReceiver;

async function beforeEachTest(
  senderType: ClientType,
  receiverType: ClientType,
  useSessions?: boolean
): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  await purge(receiverClient, useSessions ? testSessionId1 : undefined);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }

  receiver = useSessions
    ? await receiverClient.getSessionReceiver({
        sessionId: testSessionId1
      })
    : receiverClient.getReceiver();
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Send to Queue/Subscription", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testSimpleSend(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await senderClient.getSender().send(testMessages);
    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");
    should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    await msgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Simple send using Partitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSimpleSend();
  });

  it("Simple send using Partitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSimpleSend();
  });

  it("Simple send using Unpartitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSimpleSend();
  });

  it("Simple send using Unpartitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSimpleSend();
  });

  it("Simple send using Partitioned Queue with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSimpleSend(true);
  });

  it("Simple send using Partitioned Topic with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSimpleSend(true);
  });

  it("Simple send using Unpartitioned Queue with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSimpleSend(true);
  });

  it("Simple send using Unpartitioned Topic with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSimpleSend(true);
  });
});

describe("Schedule a single message to Queue/Subscription", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testScheduleMessage(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.getSender().scheduleMessage(scheduleTime, testMessages);

    const msgs = await receiver.receiveBatch(1);
    const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(
      msgEnqueueTime - scheduleTime.valueOf() >= 0,
      true,
      "Enqueued time must be greater than scheduled time"
    ); // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");

    await msgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Schedule single message using Partitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testScheduleMessage();
  });

  it("Schedule single message using Partitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testScheduleMessage();
  });

  it("Schedule single message using Unpartitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testScheduleMessage();
  });

  it("Schedule single message using Unpartitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testScheduleMessage();
  });

  it("Schedule single message using Partitioned Queue with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testScheduleMessage(true);
  });

  it("Schedule single message using Partitioned Topic with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessage(true);
  });

  it("Schedule single message using Unpartitioned Queue with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testScheduleMessage(true);
  });

  it("Schedule single message using Unpartitioned Topic with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessage(true);
  });
});

describe("Schedule multiple messages to Queue/Subscription", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  const messages: SendableMessageInfo[] = [
    {
      body: "hello1",
      messageId: `test message ${Math.random()}`,
      partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
    }
  ];
  const messageWithSessions: SendableMessageInfo[] = [
    {
      body: "hello1",
      messageId: `test message ${Math.random()}`,
      sessionId: testSessionId1
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      sessionId: testSessionId1
    }
  ];

  async function testScheduleMessages(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? messageWithSessions : messages;
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.getSender().scheduleMessages(scheduleTime, testMessages);

    const msgs = await receiver.receiveBatch(2);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 2, "Unexpected number of messages");

    const msgEnqueueTime1 = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;
    const msgEnqueueTime2 = msgs[1].enqueuedTimeUtc ? msgs[1].enqueuedTimeUtc.valueOf() : 0;

    // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(
      msgEnqueueTime1 - scheduleTime.valueOf() >= 0,
      true,
      "Enqueued time must be greater than scheduled time"
    );
    should.equal(
      msgEnqueueTime2 - scheduleTime.valueOf() >= 0,
      true,
      "Enqueued time must be greater than scheduled time"
    );
    should.equal(
      testMessages.some((x) => x.messageId === msgs[0].messageId),
      true,
      "MessageId is different than expected"
    );
    should.equal(
      testMessages.some((x) => x.messageId === msgs[1].messageId),
      true,
      "MessageId is different than expected"
    );

    await msgs[0].complete();
    await msgs[1].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Schedule messages using Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testScheduleMessages();
  });

  it("Schedule messages using Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testScheduleMessages();
  });

  it("Schedule messages using UnPartitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testScheduleMessages();
  });

  it("Schedule messages using UnPartitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testScheduleMessages();
  });

  it("Schedule messages using Partitioned Queue with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testScheduleMessages(true);
  });

  it("Schedule messages using Partitioned Topic with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessages(true);
  });

  it("Schedule messages using Unpartitioned Queue with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testScheduleMessages(true);
  });

  it("Schedule messages using Unpartitioned Topic with Sessions", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessages(true);
  });
});

describe("Cancel a single Scheduled message for sending to Queue/Subscription", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessage(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber = await senderClient
      .getSender()
      .scheduleMessage(scheduleTime, testMessages);

    await delay(2000);

    await senderClient.getSender().cancelScheduledMessage(sequenceNumber);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Cancel a single Scheduled message using Partitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testCancelScheduleMessage();
  });

  it("Cancel a single Scheduled message using Partitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testCancelScheduleMessage();
  });

  it("Cancel a single Scheduled message using Unpartitioned Queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testCancelScheduleMessage();
  });

  it("Cancel a single Scheduled message using Unpartitioned Topic", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testCancelScheduleMessage();
  });

  it("Cancel a single Scheduled message using Partitioned Queue with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });

  it("Cancel a single Scheduled message using Partitioned Topic with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });

  it("Cancel a single Scheduled message using Unpartitioned Queue with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });

  it("Cancel a single Scheduled message using Unpartitioned Topic with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });
});

describe("Cancel multiple Scheduled messages for sending to Queue/Subscription", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessages(
    usePartitions?: boolean,
    useSessions?: boolean
  ): Promise<void> {
    let testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    if (usePartitions) {
      testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    }
    const sender = senderClient.getSender();
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber1 = await sender.scheduleMessage(scheduleTime, testMessages);
    const sequenceNumber2 = await sender.scheduleMessage(scheduleTime, testMessages);

    await delay(2000);

    await sender.cancelScheduledMessages([sequenceNumber1, sequenceNumber2]);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Cancel Scheduled messages using Partitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testCancelScheduleMessages(true, false);
  });

  it("Cancel Scheduled messages using Partitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testCancelScheduleMessages(true, false);
  });

  it("Cancel Scheduled messages using Unpartitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testCancelScheduleMessages(false, false);
  });

  it("Cancel Scheduled messages using Unpartitioned Topic", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testCancelScheduleMessages(false, false);
  });

  it("Cancel Scheduled messages using Partitioned Queue with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessages(true, true);
  });

  it("Cancel Scheduled messages using Partitioned Topic with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessages(true, true);
  });

  it("Cancel Scheduled messages using Unpartitioned Queue with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessages(true, true);
  });

  it("Cancel Scheduled messages using Unpartitioned Topic with Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessages(true, true);
  });
});
