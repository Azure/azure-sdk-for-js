// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  ServiceBusClient,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  ServiceBusMessage,
  SendableMessageInfo,
  ReceiveMode
} from "../src";

import { TestMessage, getSenderReceiverClients, ClientType, purge } from "./testUtils";
import { Receiver, SessionReceiver } from "../src/receiver";
import { Sender } from "../src/sender";

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

let ns: ServiceBusClient;

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
  ns = ServiceBusClient.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = ns.createQueueClient(
      QueueClient.getDeadLetterQueuePath(receiverClient.entityPath)
    );
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      TopicClient.getDeadLetterTopicPath(senderClient.entityPath, receiverClient.subscriptionName),
      receiverClient.subscriptionName
    );
  }

  await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
  const peekedDeadMsgs = await deadLetterClient.peek();
  if (peekedDeadMsgs.length) {
    chai.assert.fail(
      `Please use an empty dead letter ${receiverEntityType} for integration testing`
    );
  }

  sender = senderClient.createSender();
  if (useSessions) {
    receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: TestMessage.sessionId
    });
  } else {
    receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

async function deferMessage(testMessages: SendableMessageInfo): Promise<ServiceBusMessage> {
  await sender.sendMessage(testMessages);
  const receivedMsgs = await receiver.receiveMessages(1);

  should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
  should.equal(receivedMsgs[0].body, testMessages.body, "MessageBody is different than expected");
  should.equal(receivedMsgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
  should.equal(
    receivedMsgs[0].messageId,
    testMessages.messageId,
    "MessageId is different than expected"
  );

  if (!receivedMsgs[0].sequenceNumber) {
    throw "Sequence Number can not be null";
  }
  const sequenceNumber = receivedMsgs[0].sequenceNumber;
  await receivedMsgs[0].defer();

  const deferredMsgs = await receiver.receiveDeferredMessage(sequenceNumber);
  if (!deferredMsgs) {
    throw "No message received for sequence number";
  }
  should.equal(deferredMsgs.body, testMessages.body, "MessageBody is different than expected");
  should.equal(
    deferredMsgs.messageId,
    testMessages.messageId,
    "MessageId is different than expected"
  );
  should.equal(deferredMsgs.deliveryCount, 1, "DeliveryCount is different than expected");

  return deferredMsgs;
}

async function completeDeferredMessage(
  sequenceNumber: Long,
  expectedDeliverCount: number,
  testMessages: SendableMessageInfo,
  useSessions?: boolean
): Promise<void> {
  await testPeekMsgsLength(receiverClient, 1);

  const deferredMsg = await receiver.receiveDeferredMessage(sequenceNumber);
  if (!deferredMsg) {
    throw "No message received for sequence number";
  }

  should.equal(deferredMsg.body, testMessages.body, "MessageBody is different than expected");
  should.equal(
    deferredMsg.deliveryCount,
    expectedDeliverCount,
    "DeliveryCount is different than expected"
  );
  should.equal(
    deferredMsg.messageId,
    testMessages.messageId,
    "MessageId is different than expected"
  );

  await deferredMsg.complete();

  await testPeekMsgsLength(receiverClient, 0);
}

describe("Abandon/Defer/Deadletter deferred message", function (): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.abandon();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queue: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Partitioned Queue with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Partitioned Subscription with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Queue: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAbandon();
  });

  it("Unpartitioned Queue with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Subscription with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  async function testDefer(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.defer();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queue: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Subscription: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Partitioned Queue with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Partitioned Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Queue: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Subscription: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDefer();
  });

  it("Unpartitioned Queue with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  async function testDeadletter(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages);

    await deferredMsg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);

    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(deadLetterMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Partitioned Queue with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Partitioned Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Queue: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDeadletter();
  });

  it("Unpartitioned Queue with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function (): Promise<
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
