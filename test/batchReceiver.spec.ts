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
  delay,
  SendableMessageInfo
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
let errorWasThrown: boolean;

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
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}
describe("Complete/Abandon/Defer/Deadletter normal message", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    testMessages: SendableMessageInfo[]
  ): Promise<ServiceBusMessage> {
    await senderClient.send(testMessages[0]);
    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);

    return msgs[0];
  }

  async function completeMessages(
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    expectedDeliverCount: number,
    testMessages: SendableMessageInfo[]
  ): Promise<void> {
    const receivedMsgs = await receiverClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, expectedDeliverCount);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  async function testComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(senderClient, receiverClient, testMessages);
    await msg.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues: complete() removes message", async function(): Promise<void> {
    await testComplete(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: complete() removes message", async function(): Promise<void> {
    await testComplete(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Partitioned Queues with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, true);
  });

  it("Unpartitioned Queues with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });

  async function testAbandon(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(senderClient, receiverClient, testMessages);
    await msg.abandon();

    await testPeekMsgsLength(receiverClient, 1);

    await completeMessages(receiverClient, 1, testMessages);
  }

  it("Partitioned Queues: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Partitioned Queues with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, true);
  });

  it("Unpartitioned Queues with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });

  async function testDefer(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(senderClient, receiverClient, testMessages);

    if (!msg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = msg.sequenceNumber;
    await msg.defer();

    const deferredMsgs = await receiverClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);
    should.equal(deferredMsgs.deliveryCount, 1);

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Partitioned Queues with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, true);
  });

  // it("Unpartitioned Queues: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueClient, unpartitionedQueueClient);
  // });

  // it("Unpartitioned Topics and Subscription: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  // });

  // it("Unpartitioned Queues with Sessions: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  // });

  // it("Unpartitioned Topics and Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicSessionClient, unpartitionedSubscriptionMessageSession, true);
  // });

  async function testDeadletter(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    deadLetterClient: QueueClient | SubscriptionClient,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(senderClient, receiverClient, testMessages);
    await msg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    await completeMessages(deadLetterClient, 0, testMessages);
  }

  it("Partitioned Queues: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
  });

  it("Partitioned Queues with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      partitionedDeadletterQueueSessionClient,
      true
    );
  });

  it("Partitioned Topics and Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      partitionedDeadletterSubscriptionSessionClient,
      true
    );
  });

  it("Unpartitioned Queues with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      unpartitionedDeadletterQueueSessionClient,
      true
    );
  });

  it("Unpartitioned Topics and Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      unpartitionedDeadletterSubscriptionSessionClient,
      true
    );
  });
});

describe("Abandon/Defer/Deadletter deadlettered message", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function deadLetterMessage(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<ServiceBusMessage> {
    await senderClient.send(testSimpleMessages[0]);
    const receivedMsgs = await receiverClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testSimpleMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testSimpleMessages[0].messageId);
    should.equal(receivedMsgs[0].deliveryCount, 0);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadletterClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testSimpleMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testSimpleMessages[0].messageId);
    should.equal(deadLetterMsgs[0].deliveryCount, 0);

    return deadLetterMsgs[0];
  }

  async function completeDeadLetteredMessage(
    deadletterClient: QueueClient | SubscriptionClient,
    expectedDeliverCount: number
  ): Promise<void> {
    const deadLetterMsgs = await deadletterClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testSimpleMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testSimpleMessages[0].messageId);
    should.equal(deadLetterMsgs[0].deliveryCount, expectedDeliverCount);

    await deadLetterMsgs[0].complete();
    await testPeekMsgsLength(deadletterClient, 0);
  }

  async function testDeadLetter(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(senderClient, receiverClient, deadletterClient);

    await deadLetterMsg.deadLetter().catch((err) => {
      should.equal(err.name, "InvalidOperationError");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true);

    await completeDeadLetteredMessage(deadletterClient, 0);
  }

  it("Partitioned Queues: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
  });

  async function testAbandon(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(senderClient, receiverClient, deadletterClient);

    await deadLetterMsg.abandon();

    await completeDeadLetteredMessage(deadletterClient, 0);
  }

  it("Partitioned Queues: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
  });

  async function testDefer(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(senderClient, receiverClient, deadletterClient);

    if (!deadLetterMsg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }

    const sequenceNumber = deadLetterMsg.sequenceNumber;
    await deadLetterMsg.defer();

    const deferredMsgs = await deadletterClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testSimpleMessages[0].body);
    should.equal(deferredMsgs.messageId, testSimpleMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Partitioned Queues: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testDefer(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testDefer(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  // it("Unpartitioned Queues: Defer a message received from dead letter queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(
  //     unpartitionedQueueClient,
  //     unpartitionedQueueClient,
  //     unpartitionedDeadletterQueueClient
  //   );
  // });

  // it("Unpartitioned Topics and Subscription: Defer a message received from dead letter queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(
  //     unpartitionedTopicClient,
  //     unpartitionedSubscriptionClient,
  //     unpartitionedDeadletterSubscriptionClient
  //   );
  // });
});

describe("Multiple ReceiveBatch calls", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  // We use an empty queue/topic here so that the first receiveBatch call takes time to return
  async function testParallelReceiveBatchCalls(
    receiverClient: QueueClient | SubscriptionClient | MessageSession
  ): Promise<void> {
    const firstBatchPromise = receiverClient.receiveBatch(1, 10);
    await delay(5000);
    const secondBatchPromise = receiverClient.receiveBatch(1, 10).catch((err) => {
      should.equal(err.name, "Error");
      errorWasThrown = true;
    });
    await Promise.all([firstBatchPromise, secondBatchPromise]);
    should.equal(errorWasThrown, true);
  }

  it("Partitioned Queues: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(unpartitionedSubscriptionClient);
  });

  it("Partitioned Queues with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(partitionedQueueMessageSession);
  });

  it("Partitioned Topics and Subscription with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(partitionedSubscriptionMessageSession);
  });

  it("Unpartitioned Queues with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(unpartitionedQueueMessageSession);
  });

  it("Unpartitioned Topics and Subscription with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(unpartitionedSubscriptionMessageSession);
  });

  // We test for mutilple receiveBatch specifically to ensure that batchingRecevier on a client is reused
  // See https://github.com/Azure/azure-service-bus-node/issues/31
  async function testSequentialReceiveBatchCalls(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await senderClient.sendBatch(testMessages);
    const msgs1 = await receiverClient.receiveBatch(1);
    const msgs2 = await receiverClient.receiveBatch(1);

    // Results are checked after both receiveBatches are done to ensure that the second call doesnt
    // affect the result from the first one.
    should.equal(Array.isArray(msgs1), true);
    should.equal(msgs1.length, 1);
    should.equal(msgs1[0].body, testMessages[0].body);
    should.equal(msgs1[0].messageId, testMessages[0].messageId);

    should.equal(Array.isArray(msgs2), true);
    should.equal(msgs2.length, 1);
    should.equal(msgs2[0].body, testMessages[1].body);
    should.equal(msgs2[0].messageId, testMessages[1].messageId);

    await msgs1[0].complete();
    await msgs2[0].complete();
  }

  it("Partitioned Queues: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient
    );
  });

  it("Partitioned Queues with Sessions: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      true
    );
  });

  it("Partitioned Topics and Subscription with Sessions: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Unpartitioned Queues with Sessions: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      true
    );
  });

  it("Unpartitioned Topics and Subscription with Sessions: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Batching Receiver Misc Tests", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testNoSettlement(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await senderClient.send(testMessages[0]);

    let receivedMsgs = await receiverClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await testPeekMsgsLength(receiverClient, 1);

    receivedMsgs = await receiverClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();
  }

  it("Partitioned Queues: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Partitioned Queues with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Unpartitioned Queues with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });

  async function testAskForMore(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient | MessageSession,
    useSessions?: boolean
  ): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await senderClient.send(testMessages[0]);
    const receivedMsgs = await receiverClient.receiveBatch(2);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  it("Partitioned Queues with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      true
    );
  });

  it("Unpartitioned Queues with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});
