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
  SessionReceiver,
  ServiceBusMessage,
  SendableMessageInfo
} from "../lib";

import {
  testSimpleMessages,
  testMessagesWithSessions,
  testSessionId,
  getSenderClient,
  getReceiverClient,
  ClientType
} from "./testUtils";
import { Receiver } from "../lib/receiver";
import { Sender } from "../lib/sender";

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
let deadLetterClient: QueueClient | SubscriptionClient;
let sender: Sender;
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

  senderClient = getSenderClient(ns, senderType);
  receiverClient = getReceiverClient(ns, receiverType);

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = ns.createQueueClient(
      Namespace.getDeadLetterQueuePathForQueue(receiverClient.name)
    );
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      Namespace.getDeadLetterSubcriptionPathForSubcription(
        senderClient.name,
        receiverClient.subscriptionName
      ),
      receiverClient.subscriptionName
    );
  }

  sender = senderClient.getSender();
  receiver = useSessions
    ? await receiverClient.getSessionReceiver({
        sessionId: testSessionId
      })
    : receiverClient.getReceiver();

  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    throw new Error(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

async function deferMessage(testMessages: SendableMessageInfo[]): Promise<ServiceBusMessage> {
  await sender.send(testMessages[0]);
  const receivedMsgs = await receiver.receiveBatch(1);

  should.equal(receivedMsgs.length, 1);
  should.equal(receivedMsgs[0].body, testMessages[0].body);
  should.equal(receivedMsgs[0].deliveryCount, 0);
  should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

  if (!receivedMsgs[0].sequenceNumber) {
    throw "Sequence Number can not be null";
  }
  const sequenceNumber = receivedMsgs[0].sequenceNumber;
  await receivedMsgs[0].defer();

  const deferredMsgs = await receiver.receiveDeferredMessage(sequenceNumber);
  if (!deferredMsgs) {
    throw "No message received for sequence number";
  }
  should.equal(deferredMsgs.body, testMessages[0].body);
  should.equal(deferredMsgs.messageId, testMessages[0].messageId);
  should.equal(deferredMsgs.deliveryCount, 1);

  return deferredMsgs;
}

async function completeDeferredMessage(
  sequenceNumber: Long,
  expectedDeliverCount: number,
  testMessages: SendableMessageInfo[],
  useSessions?: boolean
): Promise<void> {
  await testPeekMsgsLength(receiverClient, 1);

  const deferredMsg = await receiver.receiveDeferredMessage(sequenceNumber);
  if (!deferredMsg) {
    throw "No message received for sequence number";
  }

  should.equal(deferredMsg.body, testMessages[0].body);
  should.equal(deferredMsg.deliveryCount, expectedDeliverCount);
  should.equal(deferredMsg.messageId, testMessages[0].messageId);

  await deferredMsg.complete();

  await testPeekMsgsLength(receiverClient, 0);
}

describe("Abandon/Defer/Deadletter deferred message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const deferredMsg = await deferMessage(testMessages);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.abandon();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queues: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Topics and Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Partitioned Queues with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Partitioned Topics and Subscription with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Queues: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Topics and Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAbandon();
  });

  it("Unpartitioned Queues with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Topics and Subscription with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });
});

describe("Deferring a deferred message puts it back to the deferred queue.", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const deferredMsg = await deferMessage(testMessages);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.defer();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queues: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Topics and Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Partitioned Queues with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Partitioned Topics and Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Queues: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Topics and Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDefer();
  });

  it("Unpartitioned Queues with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });
});

describe("Deadlettering a deferred message moves it to dead letter queue.", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const deferredMsg = await deferMessage(testMessages);

    await deferredMsg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].deliveryCount, 1);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queues: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Topics and Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Partitioned Queues with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Partitioned Topics and Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Queues: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Topics and Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDeadletter();
  });

  it("Unpartitioned Queues with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });
});
