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

import { TestMessage, getSenderReceiverClients, TestClientType, purge } from "./testUtils";
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
  senderType: TestClientType,
  receiverType: TestClientType,
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

/**
 * Sends, defers, receives and then returns a test message
 * @param testMessage Test message to send, defer, receive and then return
 * @param useReceiveDeferredMessages Boolean to indicate whether to use `receiveDeferredMessage` or
 * `receiveDeferredMessages` to ensure both get code coverage
 */
async function deferMessage(
  testMessage: SendableMessageInfo,
  useReceiveDeferredMessages: boolean
): Promise<ServiceBusMessage> {
  await sender.send(testMessage);
  const receivedMsgs = await receiver.receiveMessages(1);

  should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
  should.equal(receivedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
  should.equal(receivedMsgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
  should.equal(
    receivedMsgs[0].messageId,
    testMessage.messageId,
    "MessageId is different than expected"
  );

  if (!receivedMsgs[0].sequenceNumber) {
    throw "Sequence Number can not be null";
  }
  const sequenceNumber = receivedMsgs[0].sequenceNumber;
  await receivedMsgs[0].defer();

  let deferredMsg: ServiceBusMessage | undefined;

  // Randomly choose receiveDeferredMessage/receiveDeferredMessages as the latter is expected to
  // convert single input to array and then use it
  if (useReceiveDeferredMessages) {
    [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber as any);
  } else {
    deferredMsg = await receiver.receiveDeferredMessage(sequenceNumber);
  }

  if (!deferredMsg) {
    throw "No message received for sequence number";
  }
  should.equal(deferredMsg.body, testMessage.body, "MessageBody is different than expected");
  should.equal(
    deferredMsg.messageId,
    testMessage.messageId,
    "MessageId is different than expected"
  );
  should.equal(deferredMsg.deliveryCount, 1, "DeliveryCount is different than expected");

  return deferredMsg;
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

describe("Abandon/Defer/Deadletter deferred message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, true);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.abandon();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queue: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Partitioned Queue with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Partitioned Subscription with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Queue: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testAbandon();
  });

  it("Unpartitioned Queue with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Subscription with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  async function testDefer(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, false);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.defer();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queue: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Partitioned Queue with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Partitioned Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Queue: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDefer();
  });

  it("Unpartitioned Queue with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  async function testDeadletter(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, true);

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

  it("Partitioned Queue: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Partitioned Queue with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Partitioned Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Queue: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDeadletter();
  });

  it("Unpartitioned Queue with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });
});
