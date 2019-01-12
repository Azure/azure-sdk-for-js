// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  SendableMessageInfo,
  generateUuid,
  TopicClient,
  SubscriptionClient,
  delay,
  ServiceBusMessage
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

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(peekedMsgs.length, expectedPeekLength);
}

const maxDeliveryCount = 10;
let namespace: Namespace;
let queueClient: QueueClient;
let topicClient: TopicClient;
let subscriptionClient: SubscriptionClient;
let deadletterQueueClient: QueueClient;
let deadletterSubscriptionClient: SubscriptionClient;
let errorWasThrown: boolean;

async function beforeEachTest(): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  if (!process.env.TOPIC_NAME) {
    throw new Error("Define TOPIC_NAME in your environment before running integration tests.");
  }
  if (!process.env.QUEUE_NAME) {
    throw new Error("Define QUEUE_NAME in your environment before running integration tests.");
  }
  if (!process.env.SUBSCRIPTION_NAME) {
    throw new Error(
      "Define SUBSCRIPTION_NAME in your environment before running integration tests."
    );
  }

  namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
  queueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
  topicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  subscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );
  deadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(queueClient.name)
  );
  deadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      topicClient.name,
      subscriptionClient.subscriptionName
    ),
    subscriptionClient.subscriptionName
  );

  const peekedQueueMsg = await queueClient.peek();
  if (peekedQueueMsg.length) {
    throw new Error("Please use an empty queue for integration testing");
  }

  const peekedSubscriptionMsg = await subscriptionClient.peek();
  if (peekedSubscriptionMsg.length) {
    throw new Error("Please use an empty Subscription for integration testing");
  }
  errorWasThrown = false;
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}

describe("Complete/Abandon/Defer/Deadletter normal message", () => {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
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
    receiverClient: QueueClient | SubscriptionClient,
    expectedDeliverCount: number
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
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const msg = await sendReceiveMsg(senderClient, receiverClient);
    await msg.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Queue: complete() removes message", async function(): Promise<void> {
    await testComplete(queueClient, queueClient);
  });

  it("Queue: complete() removes message", async function(): Promise<void> {
    await testComplete(topicClient, subscriptionClient);
  });

  async function testAbandon(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const msg = await sendReceiveMsg(senderClient, receiverClient);
    await msg.abandon();

    await testPeekMsgsLength(receiverClient, 1);

    await completeMessages(receiverClient, 1);
  }

  it("Queue: Abandoned message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(queueClient, queueClient);
  });

  it("Subscription: Abandoned message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(topicClient, subscriptionClient);
  });

  async function testDefer(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const msg = await sendReceiveMsg(senderClient, receiverClient);

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

  it("Queue: Receive deferred message from queue/subscription", async function(): Promise<void> {
    await testDefer(queueClient, queueClient);
  });

  it("Subscription: Receive deferred message from queue/subscription", async function(): Promise<
    void
  > {
    await testDefer(topicClient, subscriptionClient);
  });

  async function testDeadletter(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadLetterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const msg = await sendReceiveMsg(senderClient, receiverClient);
    await msg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    await completeMessages(deadLetterClient, 0);
  }

  it("Queue: Receive dead letter message from queue/subscription", async function(): Promise<void> {
    await testDeadletter(queueClient, queueClient, deadletterQueueClient);
  });

  it("Subscription: Receive dead letter message from queue/subscription", async function(): Promise<
    void
  > {
    await testDeadletter(topicClient, subscriptionClient, deadletterSubscriptionClient);
  });
});

describe("Abandon/Defer/Deadletter deferred message", () => {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function deferMessage(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<ServiceBusMessage> {
    await senderClient.send(testMessages[0]);
    const receivedMsgs = await receiverClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    if (!receivedMsgs[0].sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = receivedMsgs[0].sequenceNumber;
    await receivedMsgs[0].defer();

    const deferredMsgs = await receiverClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);
    should.equal(deferredMsgs.deliveryCount, 1);

    return deferredMsgs;
  }

  async function completeDeferredMessage(
    receiverClient: QueueClient | SubscriptionClient,
    sequenceNumber: Long,
    expectedDeliverCount: number
  ): Promise<void> {
    await testPeekMsgsLength(receiverClient, 1);

    const deferredMsg = await receiverClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsg) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsg.body, testMessages[0].body);
    should.equal(deferredMsg.deliveryCount, expectedDeliverCount);
    should.equal(deferredMsg.messageId, testMessages[0].messageId);

    await deferredMsg.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  async function testDefer(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const deferredMsg = await deferMessage(senderClient, receiverClient);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.defer();
    await completeDeferredMessage(receiverClient, sequenceNumber, 2);
  }

  it("Queue: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testDefer(queueClient, queueClient);
  });

  it("Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testDefer(topicClient, subscriptionClient);
  });

  async function testDeadletter(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const deferredMsg = await deferMessage(senderClient, receiverClient);

    await deferredMsg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadletterClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].deliveryCount, 1);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Queue: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await testDeadletter(queueClient, queueClient, deadletterQueueClient);
  });

  it("Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await testDeadletter(topicClient, subscriptionClient, deadletterSubscriptionClient);
  });

  async function testAbandon(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const deferredMsg = await deferMessage(senderClient, receiverClient);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.abandon();
    await completeDeferredMessage(receiverClient, sequenceNumber, 2);
  }

  it("Queue: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testAbandon(queueClient, queueClient);
  });

  it("Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testAbandon(topicClient, subscriptionClient);
  });
});

describe("Abandon/Defer/Deadletter deadlettered message", () => {
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
    await senderClient.send(testMessages[0]);
    const receivedMsgs = await receiverClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
    should.equal(receivedMsgs[0].deliveryCount, 0);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadletterClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[0].deliveryCount, 0);

    return deadLetterMsgs[0];
  }

  async function completeDeadLetteredMessage(
    deadletterClient: QueueClient | SubscriptionClient,
    expectedDeliverCount: number
  ): Promise<void> {
    const deadLetterMsgs = await deadletterClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
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

  it("Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(queueClient, queueClient, deadletterQueueClient);
  });

  it("Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(topicClient, subscriptionClient, deadletterSubscriptionClient);
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

  it("Queue: Abandon a message received from dead letter queue", async function(): Promise<void> {
    await testAbandon(queueClient, queueClient, deadletterQueueClient);
  });

  it("Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(topicClient, subscriptionClient, deadletterSubscriptionClient);
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
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(receiverClient, 0);

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Queue: Defer a message received from dead letter queue", async function(): Promise<void> {
    await testDefer(queueClient, queueClient, deadletterQueueClient);
  });

  it("Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testDefer(topicClient, subscriptionClient, deadletterSubscriptionClient);
  });
});

describe("Multiple ReceiveBatch calls", () => {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  // We use an empty queue/topic here so that the first receiveBatch call takes time to return
  async function testParallelReceiveBatchCalls(
    receiverClient: QueueClient | SubscriptionClient
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

  it("Queue: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(queueClient);
  });

  it("Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(subscriptionClient);
  });

  // We test for mutilple receiveBatch specifically to ensure that batchingRecevier on a client is reused
  // See https://github.com/Azure/azure-service-bus-node/issues/31
  async function testSequentialReceiveBatchCalls(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
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

  it("Queue: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<void> {
    await testSequentialReceiveBatchCalls(queueClient, queueClient);
  });

  it("Subscription: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(topicClient, subscriptionClient);
  });
});

describe("Other ReceiveBatch Tests", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandonMsgsTillMaxDeliveryCount(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadLetterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
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

  it("Queue: Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(queueClient, queueClient, deadletterQueueClient);
  });

  it("Subscription: Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      topicClient,
      subscriptionClient,
      deadletterSubscriptionClient
    );
  });

  async function testNoSettlement(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
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

  it("Queue: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(queueClient, queueClient);
  });

  it("Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(topicClient, subscriptionClient);
  });

  async function testAskForMore(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessages[0]);
    const receivedMsgs = await receiverClient.receiveBatch(2);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Queue: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(queueClient, queueClient);
  });

  it("Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(topicClient, subscriptionClient);
  });

  it("Throws error when call the second ReceiveBatch while the first one is not done", async function(): Promise<
    void
  > {
    const firstBatchPromise = queueClient.receiveBatch(1, 10);
    await delay(5000);
    const secondBatchPromise = queueClient.receiveBatch(1, 10).catch((err) => {
      should.equal(err.name, "Error");
      errorWasThrown = true;
    });
    await Promise.all([firstBatchPromise, secondBatchPromise]);
    should.equal(errorWasThrown, true);
  });
});
