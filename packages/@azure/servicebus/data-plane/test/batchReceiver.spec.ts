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
  ServiceBusMessage,
  delay,
  SendableMessageInfo
} from "../lib";

import {
  testSimpleMessages,
  testMessagesWithSessions,
  testSessionId1,
  getSenderClient,
  getReceiverClient,
  ClientType,
  purge
} from "./testUtils";
import { Receiver, SessionReceiver } from "../lib/receiver";
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

let errorWasThrown: boolean;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;
let deadLetterClient: QueueClient | SubscriptionClient;
let sender: Sender;
let receiver: Receiver | SessionReceiver;
const maxDeliveryCount = 10;

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
    deadLetterClient = ns.createQueueClient(Namespace.getDeadLetterQueuePath(receiverClient.name));
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      Namespace.getDeadLetterTopicPath(senderClient.name, receiverClient.subscriptionName),
      receiverClient.subscriptionName
    );
  }

  await purge(receiverClient, useSessions ? testSessionId1 : undefined);
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

  sender = senderClient.getSender();
  receiver = useSessions
    ? await receiverClient.getSessionReceiver({
        sessionId: testSessionId1
      })
    : receiverClient.getReceiver();
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}
describe("Batch Receiver - Complete/Abandon/Defer/Deadletter normal message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(testMessages: SendableMessageInfo[]): Promise<ServiceBusMessage> {
    await sender.send(testMessages[0]);
    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessages[0].body, "MessageBody is different than expected");
    should.equal(
      msgs[0].messageId,
      testMessages[0].messageId,
      "MessageId is different than expected"
    );
    should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    return msgs[0];
  }

  async function testComplete(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(testMessages);

    await msg.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testComplete();
  });

  it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testComplete();
  });

  it("Unpartitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testComplete();
  });

  it("Unpartitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testComplete();
  });

  it("Partitioned Queue with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testComplete(true);
  });

  it("Partitioned Subscription with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testComplete(true);
  });

  it("Unpartitioned Queue with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testComplete(true);
  });

  it("Unpartitioned Subscription with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testComplete(true);
  });

  async function testAbandon(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(testMessages);
    await msg.abandon();

    await testPeekMsgsLength(receiverClient, 1);

    const receivedMsgs = await receiver.receiveBatch(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessages[0].messageId,
      "MessageId is different than expected"
    );

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Unpartitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAbandon();
  });

  it("Partitioned Queue with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Partitioned Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Queue with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  async function testAbandonMsgsTillMaxDeliveryCount(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await sender.send(testMessages[0]);
    let abandonMsgCount = 0;

    while (abandonMsgCount < maxDeliveryCount) {
      const receivedMsgs = await receiver.receiveBatch(1);

      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        receivedMsgs[0].messageId,
        testMessages[0].messageId,
        "MessageId is different than expected"
      );
      should.equal(
        receivedMsgs[0].deliveryCount,
        abandonMsgCount,
        "DeliveryCount is different than expected"
      );
      abandonMsgCount++;

      await receivedMsgs[0].abandon();
    }

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);

    should.equal(
      Array.isArray(deadLetterMsgs),
      true,
      "`ReceivedMessages` from Deadletter is not an array"
    );
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Partitioned Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Unpartitioned Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Partitioned Queue with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  it("Partitioned Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  it("Unpartitioned Queue with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  it("Unpartitioned Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  async function testDefer(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(testMessages);

    if (!msg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = msg.sequenceNumber;
    await msg.defer();

    const deferredMsgs = await receiver.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);
    should.equal(deferredMsgs.deliveryCount, 1);

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Partitioned Queue with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Partitioned Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Queue: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDefer();
  });

  it("Unpartitioned Queue with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
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
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(testMessages);
    await msg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);

    should.equal(
      Array.isArray(deadLetterMsgs),
      true,
      "`ReceivedMessages` from Deadletter is not an array"
    );
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Unpartitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDeadletter();
  });

  it("Partitioned Queue with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Partitioned Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Queue with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
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

describe("Batch Receiver - Abandon/Defer/Deadletter deadlettered message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function deadLetterMessage(): Promise<ServiceBusMessage> {
    await sender.send(testSimpleMessages[0]);
    const receivedMsgs = await receiver.receiveBatch(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].body, testSimpleMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testSimpleMessages[0].messageId);
    should.equal(receivedMsgs[0].deliveryCount, 0);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);

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
    const deadLetterMsgs = await deadletterClient.getReceiver().receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testSimpleMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testSimpleMessages[0].messageId);
    should.equal(deadLetterMsgs[0].deliveryCount, expectedDeliverCount);

    await deadLetterMsgs[0].complete();
    await testPeekMsgsLength(deadletterClient, 0);
  }

  async function testDeadletter(): Promise<void> {
    const deadLetterMsg = await deadLetterMessage();

    await deadLetterMsg.deadLetter().catch((err) => {
      should.equal(err.name, "InvalidOperationError");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true);

    await completeDeadLetteredMessage(deadLetterClient, 0);
  }

  it("Partitioned Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Unpartitioned Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDeadletter();
  });

  async function testAbandon(): Promise<void> {
    const deadLetterMsg = await deadLetterMessage();

    await deadLetterMsg.abandon();

    await completeDeadLetteredMessage(deadLetterClient, 0);
  }

  it("Partitioned Queue: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Unpartitioned Queue: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAbandon();
  });

  async function testDefer(): Promise<void> {
    const deadLetterMsg = await deadLetterMessage();

    if (!deadLetterMsg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }

    const sequenceNumber = deadLetterMsg.sequenceNumber;
    await deadLetterMsg.defer();

    const deferredMsgs = await deadLetterClient
      .getReceiver()
      .receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testSimpleMessages[0].body);
    should.equal(deferredMsgs.messageId, testSimpleMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Unpartitioned Queue: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDefer();
  });
});

describe("Batch Receiver - Multiple ReceiveBatch calls", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  // We use an empty queue/topic here so that the first receiveBatch call takes time to return
  async function testParallelReceiveBatchCalls(): Promise<void> {
    const firstBatchPromise = receiver.receiveBatch(1, 10);
    await delay(5000);
    const secondBatchPromise = receiver.receiveBatch(1, 10).catch((err) => {
      should.equal(err.name, "Error");
      errorWasThrown = true;
    });
    await Promise.all([firstBatchPromise, secondBatchPromise]);
    should.equal(errorWasThrown, true);
  }

  it("Partitioned Queue: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testParallelReceiveBatchCalls();
  });

  it("Partitioned Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testParallelReceiveBatchCalls();
  });

  it("Unpartitioned Queue: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testParallelReceiveBatchCalls();
  });

  it("Unpartitioned Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testParallelReceiveBatchCalls();
  });

  it("Partitioned Queue with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testParallelReceiveBatchCalls();
  });

  it("Partitioned Subscription with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testParallelReceiveBatchCalls();
  });

  it("Unpartitioned Queue with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testParallelReceiveBatchCalls();
  });

  it("Unpartitioned Subscription with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testParallelReceiveBatchCalls();
  });

  // We test for mutilple receiveBatch specifically to ensure that batchingRecevier on a client is reused
  // See https://github.com/Azure/azure-service-bus-node/issues/31
  async function testSequentialReceiveBatchCalls(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await sender.sendBatch(testMessages);
    const msgs1 = await receiver.receiveBatch(1);
    const msgs2 = await receiver.receiveBatch(1);

    // Results are checked after both receiveBatches are done to ensure that the second call doesnt
    // affect the result from the first one.
    should.equal(Array.isArray(msgs1), true);
    should.equal(msgs1.length, 1);

    should.equal(Array.isArray(msgs2), true);
    should.equal(msgs2.length, 1);

    should.equal(testMessages.some((x) => x.messageId === msgs1[0].messageId), true);
    should.equal(testMessages.some((x) => x.messageId === msgs2[0].messageId), true);

    await msgs1[0].complete();
    await msgs2[0].complete();
  }

  it("Partitioned Queue: Multiple sequential receiveBatch calls", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSequentialReceiveBatchCalls();
  });

  it("Partitioned Subscription: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSequentialReceiveBatchCalls();
  });

  it("Unpartitioned Queue: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSequentialReceiveBatchCalls();
  });

  it("Unpartitioned Subscription: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSequentialReceiveBatchCalls();
  });

  it("Partitioned Queue with Sessions: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSequentialReceiveBatchCalls(true);
  });

  it("Partitioned Subscription with Sessions: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSequentialReceiveBatchCalls(true);
  });

  it("Unpartitioned Queue with Sessions: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSequentialReceiveBatchCalls(true);
  });

  it("Unpartitioned Subscription with Sessions: Multiple sequential receiveBatch calls", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSequentialReceiveBatchCalls(true);
  });
});

describe("Batch Receiver - Batching Receiver Misc Tests", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testNoSettlement(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await sender.send(testMessages[0]);

    let receivedMsgs = await receiver.receiveBatch(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(
      receivedMsgs[0].messageId,
      testMessages[0].messageId,
      "MessageId is different than expected"
    );

    await testPeekMsgsLength(receiverClient, 1);

    receivedMsgs = await receiver.receiveBatch(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessages[0].messageId,
      "MessageId is different than expected"
    );

    await receivedMsgs[0].complete();
  }

  it("Partitioned Queue: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testNoSettlement();
  });

  it("Partitioned Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testNoSettlement();
  });

  it("Unpartitioned Queue: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement();
  });

  it("Unpartitioned Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement();
  });

  // it("Partitioned Queue with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
  //   void
  // > {
  //   await beforeEachTest(
  //     ClientType.PartitionedQueueWithSessions,
  //     ClientType.PartitionedQueueWithSessions,
  //     true
  //   );
  //   await testNoSettlement(true);
  // });

  // it("Partitioned Subscription with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
  //   void
  // > {
  //   await beforeEachTest(
  //     ClientType.PartitionedTopicWithSessions,
  //     ClientType.PartitionedSubscriptionWithSessions,
  //     true
  //   );
  //   await testNoSettlement(true);
  // });

  // it("Unpartitioned Queue with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
  //   void
  // > {
  //   await beforeEachTest(
  //     ClientType.UnpartitionedQueueWithSessions,
  //     ClientType.UnpartitionedQueueWithSessions,
  //     true
  //   );
  //   await testNoSettlement(true);
  // });

  // it("Unpartitioned Subscription with Sessions: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
  //   void
  // > {
  //   await beforeEachTest(
  //     ClientType.UnpartitionedTopicWithSessions,
  //     ClientType.UnpartitionedSubscriptionWithSessions,
  //     true
  //   );
  //   await testNoSettlement(true);
  // });

  async function testAskForMore(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await sender.send(testMessages[0]);
    const receivedMsgs = await receiver.receiveBatch(2);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      receivedMsgs[0].body,
      testMessages[0].body,
      "MessageBody is different than expected"
    );
    should.equal(
      receivedMsgs[0].messageId,
      testMessages[0].messageId,
      "MessageId is different than expected"
    );

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);

    await testAskForMore();
  });

  it("Partitioned Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);

    await testAskForMore();
  });

  it("Unpartitioned Queue: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);

    await testAskForMore();
  });

  it("Unpartitioned Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);

    await testAskForMore();
  });

  it("Partitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testAskForMore(true);
  });

  it("Partitioned Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAskForMore(true);
  });

  it("Unpartitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAskForMore(true);
  });

  it("Unpartitioned Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAskForMore(true);
  });
});
