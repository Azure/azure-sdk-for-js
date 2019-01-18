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
  MessageSession,
  ServiceBusMessage,
  delay
} from "../lib";

import { testSimpleMessages, testMessagesWithSessions, testSessionId } from "./testUtils";

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

const maxDeliveryCount = 10;

let namespace: Namespace;

let partitionedQueueClient: QueueClient;
let partitionedDeadletterQueueClient: QueueClient;

let partitionedQueueSessionClient: QueueClient;
let partitionedQueueMessageSession: MessageSession;
let partitionedDeadletterQueueSessionClient: QueueClient;

let partitionedTopicClient: TopicClient;
let partitionedSubscriptionClient: SubscriptionClient;
let partitionedDeadletterSubscriptionClient: SubscriptionClient;

let partitionedTopicSessionClient: TopicClient;
let partitionedSubscriptionSessionClient: SubscriptionClient;
let partitionedSubscriptionMessageSession: MessageSession;
let partitionedDeadletterSubscriptionSessionClient: SubscriptionClient;

let unpartitionedQueueClient: QueueClient;
let unpartitionedDeadletterQueueClient: QueueClient;

let unpartitionedQueueSessionClient: QueueClient;
let unpartitionedQueueMessageSession: MessageSession;
let unpartitionedDeadletterQueueSessionClient: QueueClient;

let unpartitionedTopicClient: TopicClient;
let unpartitionedSubscriptionClient: SubscriptionClient;
let unpartitionedDeadletterSubscriptionClient: SubscriptionClient;

let unpartitionedTopicSessionClient: TopicClient;
let unpartitionedSubscriptionSessionClient: SubscriptionClient;
let unpartitionedSubscriptionMessageSession: MessageSession;
let unpartitionedDeadletterSubscriptionSessionClient: SubscriptionClient;

let unexpectedError: Error | undefined;
function unExpectedErrorHandler(err: Error): void {
  if (err) {
    unexpectedError = err;
  }
}

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
  partitionedDeadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(partitionedQueueClient.name)
  );

  partitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  partitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );
  partitionedDeadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      partitionedTopicClient.name,
      partitionedSubscriptionClient.subscriptionName
    ),
    partitionedSubscriptionClient.subscriptionName
  );

  // Unpartitioned Queues and Subscriptions
  unpartitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME_NO_PARTITION);
  unpartitionedDeadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(unpartitionedQueueClient.name)
  );
  unpartitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME_NO_PARTITION);
  unpartitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION
  );
  unpartitionedDeadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      unpartitionedTopicClient.name,
      unpartitionedSubscriptionClient.subscriptionName
    ),
    unpartitionedSubscriptionClient.subscriptionName
  );

  // Partitioned Queues and Subscriptions with Sessions
  partitionedQueueSessionClient = namespace.createQueueClient(process.env.QUEUE_NAME_SESSION);
  partitionedQueueMessageSession = await partitionedQueueSessionClient.acceptSession({
    sessionId: testSessionId
  });
  partitionedDeadletterQueueSessionClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(partitionedQueueSessionClient.name)
  );
  partitionedTopicSessionClient = namespace.createTopicClient(process.env.TOPIC_NAME_SESSION);
  partitionedSubscriptionSessionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_SESSION,
    process.env.SUBSCRIPTION_NAME_SESSION
  );
  partitionedSubscriptionMessageSession = await partitionedSubscriptionSessionClient.acceptSession({
    sessionId: testSessionId
  });
  partitionedDeadletterSubscriptionSessionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      partitionedTopicSessionClient.name,
      partitionedSubscriptionSessionClient.subscriptionName
    ),
    partitionedSubscriptionSessionClient.subscriptionName
  );
  // Unpartitioned Queues and Subscriptions with Sessions
  unpartitionedQueueSessionClient = namespace.createQueueClient(
    process.env.QUEUE_NAME_NO_PARTITION_SESSION
  );
  unpartitionedQueueMessageSession = await unpartitionedQueueSessionClient.acceptSession({
    sessionId: testSessionId
  });
  unpartitionedDeadletterQueueSessionClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(unpartitionedQueueSessionClient.name)
  );
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
  unpartitionedDeadletterSubscriptionSessionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      unpartitionedTopicSessionClient.name,
      unpartitionedSubscriptionSessionClient.subscriptionName
    ),
    unpartitionedSubscriptionSessionClient.subscriptionName
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

  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}

describe("Streaming Receiver: Message abandoned more than maxDeliveryCount goes to dead letter queue", () => {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleAbandons(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.sendBatch(testSimpleMessages);

    let checkDeliveryCount0 = 0;
    let checkDeliveryCount1 = 0;

    const receiveListener = await receiverClient.receive(
      (msg: ServiceBusMessage) => {
        if (msg.messageId === testSimpleMessages[0].messageId) {
          should.equal(msg.deliveryCount, checkDeliveryCount0, "Unexpected deliveryCount.");
          checkDeliveryCount0++;
        } else if (msg.messageId === testSimpleMessages[1].messageId) {
          should.equal(msg.deliveryCount, checkDeliveryCount1, "Unexpected deliveryCount.");
          checkDeliveryCount1++;
        }
        return msg.abandon();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    await delay(4000);

    await receiveListener.stop();
    chai.assert.fail(unexpectedError && unexpectedError.message);

    should.equal(checkDeliveryCount0, maxDeliveryCount);
    should.equal(checkDeliveryCount1, maxDeliveryCount);

    await testPeekMsgsLength(receiverClient, 0); // No messages in the queue

    const deadLetterMsgs = await deadletterClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, testSimpleMessages.length);
    should.equal(deadLetterMsgs[0].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[1].deliveryCount, maxDeliveryCount);
    should.equal(testSimpleMessages.some((x) => deadLetterMsgs[0].messageId === x.messageId), true);
    should.equal(testSimpleMessages.some((x) => deadLetterMsgs[1].messageId === x.messageId), true);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Partitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testMultipleAbandons(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testMultipleAbandons(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testMultipleAbandons(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testMultipleAbandons(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
  });
});

describe("Batching Receiver: Message abandoned more than maxDeliveryCount goes to dead letter queue", () => {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandonMsgsTillMaxDeliveryCount(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    deadLetterClient: QueueClient | SubscriptionClient,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await senderClient.send(testMessages[0]);
    let abandonMsgCount = 0;

    while (abandonMsgCount < maxDeliveryCount) {
      const receivedMsgs = await receiverClient.receiveBatch(1);

      should.equal(receivedMsgs.length, 1);
      should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
      should.equal(receivedMsgs[0].deliveryCount, abandonMsgCount);
      abandonMsgCount++;

      await receivedMsgs[0].abandon();
    }

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.receiveBatch(1);

    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queues: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
  });

  it("Partitioned Queues with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      partitionedDeadletterQueueSessionClient,
      true
    );
  });

  it("Partitioned Topics and Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      partitionedDeadletterSubscriptionSessionClient,
      true
    );
  });

  it("Unpartitioned Queues with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      unpartitionedDeadletterQueueSessionClient,
      true
    );
  });

  it("Unpartitioned Topics and Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      unpartitionedDeadletterSubscriptionSessionClient,
      true
    );
  });
});
