// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  delay,
  QueueClient,
  ReceiveMode,
  SendableMessageInfo,
  ServiceBusClient,
  ServiceBusMessage,
  SubscriptionClient,
  TopicClient
} from "../src";
import { Receiver, SessionReceiver } from "../src/receiver";
import { Sender } from "../src/sender";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import {
  TestClientType,
  getSenderReceiverClients,
  purge,
  TestMessage,
  getServiceBusClient
} from "./utils/testUtils";
const should = chai.should();
chai.use(chaiAsPromised);

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

let sbClient: ServiceBusClient;

let errorWasThrown: boolean;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;
let deadLetterClient: QueueClient | SubscriptionClient;
let sender: Sender;
let receiver: Receiver | SessionReceiver;
const maxDeliveryCount = 10;

async function beforeEachTest(
  senderType: TestClientType,
  receiverType: TestClientType,
  useSessions?: boolean
): Promise<void> {
  sbClient = getServiceBusClient();
  const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;
  if (receiverClient instanceof QueueClient) {
    deadLetterClient = sbClient.createQueueClient(
      QueueClient.getDeadLetterQueuePath(receiverClient.entityPath)
    );
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = sbClient.createSubscriptionClient(
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
  await sbClient.close();
}
describe("Batch Receiver - Settle message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(testMessages: SendableMessageInfo): Promise<ServiceBusMessage> {
    await sender.send(testMessages);
    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");
    should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    return msgs[0];
  }

  async function testComplete(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);

    await msg.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testComplete();
  });

  it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testComplete();
  });

  it("Unpartitioned Queue: complete() removes message #RunInBrowser ", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testComplete();
  });

  it("Unpartitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testComplete();
  });

  it("Partitioned Queue with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testComplete(true);
  });

  it("Partitioned Subscription with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testComplete(true);
  });

  it("Unpartitioned Queue with Sessions: complete() removes message #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testComplete(true);
  });

  it("Unpartitioned Subscription with Sessions: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testComplete(true);
  });

  async function testAbandon(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);
    await msg.abandon();

    await testPeekMsgsLength(receiverClient, 1);

    const receivedMsgs = await receiver.receiveMessages(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Unpartitioned Queue: abandon() retains message with incremented deliveryCount #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testAbandon();
  });

  it("Partitioned Queue with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Partitioned Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Queue with Sessions: abandon() retains message with incremented deliveryCount #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAbandon(true);
  });

  it("Unpartitioned Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAbandon(true);
  });

  async function testAbandonMsgsTillMaxDeliveryCount(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    await sender.send(testMessages);
    let abandonMsgCount = 0;

    while (abandonMsgCount < maxDeliveryCount) {
      const receivedMsgs = await receiver.receiveMessages(1);

      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        receivedMsgs[0].messageId,
        testMessages.messageId,
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

    const deadLetterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);

    should.equal(
      Array.isArray(deadLetterMsgs),
      true,
      "`ReceivedMessages` from Deadletter is not an array"
    );
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Partitioned Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Unpartitioned Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testAbandonMsgsTillMaxDeliveryCount();
  });

  it("Partitioned Queue with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  it("Partitioned Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  it("Unpartitioned Queue with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  it("Unpartitioned Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testAbandonMsgsTillMaxDeliveryCount(true);
  });

  async function testDefer(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
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
    should.equal(deferredMsgs.body, testMessages.body, "MessageBody is different than expected");
    should.equal(
      deferredMsgs.messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );
    should.equal(deferredMsgs.deliveryCount, 1, "DeliveryCount is different than expected");

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Partitioned Queue with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Partitioned Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Queue: defer() moves message to deferred queue #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDefer();
  });

  it("Unpartitioned Queue with Sessions: defer() moves message to deferred queue #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDefer(true);
  });

  it("Unpartitioned Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
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
    const msg = await sendReceiveMsg(testMessages);
    await msg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);

    should.equal(
      Array.isArray(deadLetterMsgs),
      true,
      "`ReceivedMessages` from Deadletter is not an array"
    );
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Unpartitioned Queue: deadLetter() moves message to deadletter queue #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDeadletter();
  });

  it("Partitioned Queue with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Partitioned Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Queue with Sessions: deadLetter() moves message to deadletter queue #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testDeadletter(true);
  });

  it("Unpartitioned Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
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

describe("Batch Receiver - Settle deadlettered message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  let deadletterReceiver: Receiver;

  async function deadLetterMessage(testMessage: SendableMessageInfo): Promise<ServiceBusMessage> {
    await sender.send(testMessage);
    const receivedMsgs = await receiver.receiveMessages(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(receivedMsgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    deadletterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMsgs = await deadletterReceiver.receiveMessages(1);

    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].body,
      testMessage.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(deadLetterMsgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    return deadLetterMsgs[0];
  }

  async function completeDeadLetteredMessage(
    testMessage: SendableMessageInfo,
    deadletterClient: QueueClient | SubscriptionClient,
    expectedDeliverCount: number
  ): Promise<void> {
    const deadLetterMsgs = await deadletterReceiver.receiveMessages(1);

    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].body,
      testMessage.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].deliveryCount,
      expectedDeliverCount,
      "DeliveryCount is different than expected"
    );

    await deadLetterMsgs[0].complete();
    await testPeekMsgsLength(deadletterClient, 0);
  }

  async function testDeadletter(testMessage: SendableMessageInfo): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(testMessage);

    await deadLetterMsg.deadLetter().catch((err) => {
      should.equal(err.name, "InvalidOperationError", "ErrorName is different than expected");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true, "Error thrown flag must be true");

    await completeDeadLetteredMessage(testMessage, deadLetterClient, 0);
  }

  it("Partitioned Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDeadletter(TestMessage.getSample());
  });

  it("Partitioned Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDeadletter(TestMessage.getSample());
  });

  it("Unpartitioned Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDeadletter(TestMessage.getSample());
  });

  it("Unpartitioned Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDeadletter(TestMessage.getSample());
  });

  async function testAbandon(testMessage: SendableMessageInfo): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(testMessage);

    await deadLetterMsg.abandon();

    await completeDeadLetteredMessage(testMessage, deadLetterClient, 0);
  }

  it("Partitioned Queue: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testAbandon(TestMessage.getSample());
  });

  it("Partitioned Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testAbandon(TestMessage.getSample());
  });

  it("Unpartitioned Queue: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testAbandon(TestMessage.getSample());
  });

  it("Unpartitioned Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testAbandon(TestMessage.getSample());
  });

  async function testDefer(testMessage: SendableMessageInfo): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(testMessage);

    if (!deadLetterMsg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }

    const sequenceNumber = deadLetterMsg.sequenceNumber;
    await deadLetterMsg.defer();

    const deferredMsgs = await deadletterReceiver.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      deferredMsgs.messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDefer(TestMessage.getSample());
  });

  it("Partitioned Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDefer(TestMessage.getSample());
  });

  it("Unpartitioned Queue: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDefer(TestMessage.getSample());
  });

  it("Unpartitioned Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDefer(TestMessage.getSample());
  });
});

describe("Batch Receiver - Multiple Receiver Operations", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  // We use an empty queue/topic here so that the first receiveMessages call takes time to return
  async function testParallelReceiveCalls(useSessions?: boolean): Promise<void> {
    const firstBatchPromise = receiver.receiveMessages(1, 10);
    await delay(5000);

    let errorMessage;
    const expectedErrorMessage = getAlreadyReceivingErrorMsg(
      receiverClient.entityPath,
      useSessions ? TestMessage.sessionId : undefined
    );

    try {
      await receiver.receiveMessages(1);
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for receiveMessages"
    );

    let unexpectedError;
    try {
      receiver.registerMessageHandler(
        () => {
          return Promise.resolve();
        },
        (err) => {
          unexpectedError = err;
        }
      );
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for registerMessageHandler"
    );
    should.equal(
      unexpectedError,
      undefined,
      "Unexpected error found in errorHandler for registerMessageHandler"
    );

    await firstBatchPromise;
  }

  it("Unpartitioned Queue: Throws error when ReceiveBatch is called while the previous call is not done #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testParallelReceiveCalls();
  });

  it("Unpartitioned Queue with Sessions: Throws error when ReceiveBatch is called while the previous call is not done #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testParallelReceiveCalls(true);
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
      sessionId: TestMessage.sessionId
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      sessionId: TestMessage.sessionId
    }
  ];

  // We test for mutilple receiveMessages specifically to ensure that batchingRecevier on a client is reused
  // See https://github.com/Azure/azure-service-bus-node/issues/31
  async function testSequentialReceiveBatchCalls(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? messageWithSessions : messages;
    await sender.sendBatch(testMessages);
    const msgs1 = await receiver.receiveMessages(1);
    const msgs2 = await receiver.receiveMessages(1);

    // Results are checked after both receiveMessages are done to ensure that the second call doesnt
    // affect the result from the first one.
    should.equal(Array.isArray(msgs1), true, "`ReceivedMessages` is not an array");
    should.equal(msgs1.length, 1, "Unexpected number of messages");

    should.equal(Array.isArray(msgs2), true, "`ReceivedMessages` is not an array");
    should.equal(msgs2.length, 1, "Unexpected number of messages");

    should.equal(
      testMessages.some((x) => x.messageId === msgs1[0].messageId),
      true,
      "MessageId is different than expected"
    );
    should.equal(
      testMessages.some((x) => x.messageId === msgs2[0].messageId),
      true,
      "MessageId is different than expected"
    );

    await msgs1[0].complete();
    await msgs2[0].complete();
  }

  it("Unpartitioned Queue: Multiple sequential receiveMessages calls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testSequentialReceiveBatchCalls();
  });

  it("Unpartitioned Queue with Sessions: Multiple sequential receiveMessages calls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSequentialReceiveBatchCalls(true);
  });
});

describe("Batch Receiver - Others", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testNoSettlement(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    await sender.send(testMessages);

    let receivedMsgs = await receiver.receiveMessages(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await testPeekMsgsLength(receiverClient, 1);

    receivedMsgs = await receiver.receiveMessages(1);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await receivedMsgs[0].complete();
  }

  it("Partitioned Queue: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testNoSettlement();
  });

  it("Partitioned Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testNoSettlement();
  });

  it("Unpartitioned Queue: No settlement of the message is retained with incremented deliveryCount #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testNoSettlement();
  });

  it("Unpartitioned Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testNoSettlement();
  });

  async function testAskForMore(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    await sender.send(testMessages);
    const receivedMsgs = await receiver.receiveMessages(2);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);

    await testAskForMore();
  });

  it("Partitioned Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);

    await testAskForMore();
  });

  it("Unpartitioned Queue: Receive n messages but queue only has m messages, where m < n  #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);

    await testAskForMore();
  });

  it("Unpartitioned Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );

    await testAskForMore();
  });

  it("Partitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testAskForMore(true);
  });

  it("Partitioned Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testAskForMore(true);
  });

  it("Unpartitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testAskForMore(true);
  });

  it("Unpartitioned Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testAskForMore(true);
  });
});
