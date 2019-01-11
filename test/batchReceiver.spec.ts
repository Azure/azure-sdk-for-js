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
  SubscriptionClient
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

describe("ReceiveBatch from Queue/Subscription", function(): void {
  let namespace: Namespace;
  let queueClient: QueueClient;
  let topicClient: TopicClient;
  let subscriptionClient: SubscriptionClient;
  let errorWasThrown: boolean;

  beforeEach(async () => {
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

    const peekedQueueMsg = await queueClient.peek();
    if (peekedQueueMsg.length) {
      throw new Error("Please use an empty queue for integration testing");
    }

    const peekedSubscriptionMsg = await subscriptionClient.peek();
    if (peekedSubscriptionMsg.length) {
      throw new Error("Please use an empty Subscription for integration testing");
    }
    errorWasThrown = false;
  });

  afterEach(async () => {
    return namespace.close();
  });

  async function getdeadletterQueueClient(): Promise<QueueClient> {
    const deadLetterQueuePath = Namespace.getDeadLetterQueuePathForQueue(queueClient.name);
    const deadletterQueueClient = namespace.createQueueClient(deadLetterQueuePath);
    return deadletterQueueClient;
  }

  async function getdeadletterSubscriptionClient(): Promise<SubscriptionClient> {
    const deadLetterSubscriptionPath = Namespace.getDeadLetterSubcriptionPathForSubcription(
      topicClient.name,
      subscriptionClient.subscriptionName
    );

    const deadletterSubscriptionClient = namespace.createSubscriptionClient(
      deadLetterSubscriptionPath ? deadLetterSubscriptionPath : "",
      subscriptionClient.subscriptionName
    );
    return deadletterSubscriptionClient;
  }

  it("PeekLock: complete() removes msg from Queue", async function(): Promise<void> {
    await queueClient.send(testMessages[0]);
    const msgs = await queueClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    await msgs[0].complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("PeekLock: complete() removes msg from Subscription", async function(): Promise<void> {
    await topicClient.send(testMessages[0]);
    const msgs = await subscriptionClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    await msgs[0].complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  // We test for mutilple receiveBatch specifically to ensure that batchingRecevier on a client is reused
  // See https://github.com/Azure/azure-service-bus-node/issues/31
  it("Multiple receiveBatch using Queues", async function(): Promise<void> {
    await queueClient.sendBatch(testMessages);
    const msgs1 = await queueClient.receiveBatch(1);
    const msgs2 = await queueClient.receiveBatch(1);

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

    await testPeekMsgsLength(queueClient, 0);
  });

  // We test for mutilple receiveBatch specifically to ensure that batchingRecevier on a client is reused
  // See https://github.com/Azure/azure-service-bus-node/issues/31
  it("Multiple receiveBatch using Topics and Subscriptions", async function(): Promise<void> {
    await topicClient.sendBatch(testMessages);
    const msgs1 = await subscriptionClient.receiveBatch(1);
    const msgs2 = await subscriptionClient.receiveBatch(1);

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

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Abandoned message is retained in the Queue with incremented deliveryCount", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);

    let receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    // TODO: This is taking 20 seconds. Why?
    await receivedMsgs[0].abandon();

    await testPeekMsgsLength(queueClient, 1);

    receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();
  });

  it("Abandoned message is retained in the Subscription with incremented deliveryCount", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);

    let receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    // TODO: This is taking 20 seconds. Why?
    await receivedMsgs[0].abandon();

    await testPeekMsgsLength(subscriptionClient, 1);

    receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();
  });

  it("Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);
    let abandonMsgCount = 0;

    while (abandonMsgCount < maxDeliveryCount) {
      const receivedMsgs = await queueClient.receiveBatch(1);

      should.equal(receivedMsgs.length, 1);
      should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
      should.equal(receivedMsgs[0].deliveryCount, abandonMsgCount);
      abandonMsgCount++;

      await receivedMsgs[0].abandon();
    }

    await testPeekMsgsLength(queueClient, 0);

    const deadletterQueueClient = await getdeadletterQueueClient();
    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Message abandoned more than maxDeliveryCount goes to dead letter subscriptions", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    let abandonMsgCount = 0;

    while (abandonMsgCount < maxDeliveryCount) {
      const receivedMsgs = await subscriptionClient.receiveBatch(1);

      should.equal(receivedMsgs.length, 1);
      should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
      should.equal(receivedMsgs[0].deliveryCount, abandonMsgCount);
      abandonMsgCount++;

      await receivedMsgs[0].abandon();
    }

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterSubscriptionClient = await getdeadletterSubscriptionClient();

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("Receive deferred message from queue", async function(): Promise<void> {
    await queueClient.sendBatch(testMessages);
    const msgs = await queueClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    if (!msgs[0].sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = msgs[0].sequenceNumber;
    await msgs[0].defer();

    const receivedMsgs = await queueClient.receiveBatch(1);
    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body === testMessages[0].body, false);
    should.equal(receivedMsgs[0].messageId === testMessages[0].messageId, false);
    await receivedMsgs[0].complete();

    const deferredMsgs = await queueClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("Receive deferred message from subscription", async function(): Promise<void> {
    await topicClient.sendBatch(testMessages);
    const msgs = await subscriptionClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);

    if (!msgs[0].sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = msgs[0].sequenceNumber;
    await msgs[0].defer();

    const receivedMsgs = await subscriptionClient.receiveBatch(1);
    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body === testMessages[0].body, false);
    should.equal(receivedMsgs[0].messageId === testMessages[0].messageId, false);
    await receivedMsgs[0].complete();

    const deferredMsgs = await subscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Receive dead letter message from queue", async function(): Promise<void> {
    await queueClient.send(testMessages[0]);

    const receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(queueClient, 0);

    const deadletterQueueClient = await getdeadletterQueueClient();
    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Receive dead letter message from subscription", async function(): Promise<void> {
    await topicClient.send(testMessages[0]);

    const receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(Array.isArray(receivedMsgs), true);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterSubscriptionClient = await getdeadletterSubscriptionClient();

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("No settlement of the message is retained in the Queue with incremented deliveryCount", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);

    let receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await testPeekMsgsLength(queueClient, 1);

    receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();
  });

  it("No settlement of the message is retained in the Subscriptions with incremented deliveryCount", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    let receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await testPeekMsgsLength(subscriptionClient, 1);

    receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].deliveryCount, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();
  });

  it("Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);
    const receivedMsgs = await queueClient.receiveBatch(2);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    const receivedMsgs = await subscriptionClient.receiveBatch(2);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  async function deferMsgAndGetSequenceNum(
    client: QueueClient | SubscriptionClient
  ): Promise<Long> {
    const receivedMsgs = await client.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    if (!receivedMsgs[0].sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = receivedMsgs[0].sequenceNumber;
    await receivedMsgs[0].defer();
    return sequenceNumber;
  }

  it("Abandoning a deferred message returns it to deferred queue.", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);
    const sequenceNumber = await deferMsgAndGetSequenceNum(queueClient);

    const deferredMsgs = await queueClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.deliveryCount, 1);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.abandon();

    await testPeekMsgsLength(queueClient, 1);

    const abandonedMsgs = await queueClient.receiveDeferredMessage(sequenceNumber);
    if (!abandonedMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(abandonedMsgs.body, testMessages[0].body);
    should.equal(abandonedMsgs.deliveryCount, 2);
    should.equal(abandonedMsgs.messageId, testMessages[0].messageId);

    await abandonedMsgs.complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("Abandoning a deferred message returns it to deferred subscription.", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    const sequenceNumber = await deferMsgAndGetSequenceNum(subscriptionClient);

    const deferredMsgs = await subscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.deliveryCount, 1);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.abandon();

    await testPeekMsgsLength(subscriptionClient, 1);

    const abandonedMsgs = await subscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!abandonedMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(abandonedMsgs.body, testMessages[0].body);
    should.equal(abandonedMsgs.deliveryCount, 2);
    should.equal(abandonedMsgs.messageId, testMessages[0].messageId);

    await abandonedMsgs.complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);
    const sequenceNumber = await deferMsgAndGetSequenceNum(queueClient);

    const deferredMsgs = await queueClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.deadLetter();

    await testPeekMsgsLength(queueClient, 0);

    const deadletterQueueClient = await getdeadletterQueueClient();
    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Deadlettering a deferred message moves it to dead letter subscription.", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    const sequenceNumber = await deferMsgAndGetSequenceNum(subscriptionClient);

    const deferredMsgs = await subscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.deadLetter();

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterSubscriptionClient = await getdeadletterSubscriptionClient();

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();
    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);
    const sequenceNumber = await deferMsgAndGetSequenceNum(queueClient);

    let deferredMsgs = await queueClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.deliveryCount, 1);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.defer();

    await testPeekMsgsLength(queueClient, 1);

    deferredMsgs = await queueClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.deliveryCount, 2);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("Deferring a deferred message puts it back to the deferred subscription.", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    const sequenceNumber = await deferMsgAndGetSequenceNum(subscriptionClient);

    let deferredMsgs = await subscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.deliveryCount, 1);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.defer();

    await testPeekMsgsLength(subscriptionClient, 1);

    deferredMsgs = await subscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.deliveryCount, 2);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Abandon a message received from dead letter queue", async function(): Promise<void> {
    await queueClient.send(testMessages[0]);
    const receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterQueueClient = await getdeadletterQueueClient();
    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].deliveryCount, 0);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].abandon();

    const abandonedMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(abandonedMsgs.length, 1);
    should.equal(abandonedMsgs[0].body, testMessages[0].body);
    should.equal(abandonedMsgs[0].deliveryCount, 0);
    should.equal(abandonedMsgs[0].messageId, testMessages[0].messageId);

    await abandonedMsgs[0].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Abandon a message received from dead letter subscription", async function(): Promise<void> {
    await topicClient.send(testMessages[0]);
    const receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].deliveryCount, 0);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterSubscriptionClient = await getdeadletterSubscriptionClient();
    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].deliveryCount, 0);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].abandon();

    const abandonedMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(abandonedMsgs.length, 1);
    should.equal(abandonedMsgs[0].body, testMessages[0].body);
    should.equal(abandonedMsgs[0].deliveryCount, 0);
    should.equal(abandonedMsgs[0].messageId, testMessages[0].messageId);

    await abandonedMsgs[0].complete();

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("Defer a message received from dead letter queue", async function(): Promise<void> {
    await queueClient.send(testMessages[0]);
    const receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(queueClient, 0);

    const deadletterQueueClient = await getdeadletterQueueClient();
    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    if (!deadLetterMsgs[0].sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = deadLetterMsgs[0].sequenceNumber;
    await deadLetterMsgs[0].defer();

    const deferredMsgs = await deadletterQueueClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(queueClient, 0);

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Defer a message received from dead letter subscription", async function(): Promise<void> {
    await topicClient.send(testMessages[0]);
    const receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterSubscriptionClient = await getdeadletterSubscriptionClient();

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    if (!deadLetterMsgs[0].sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = deadLetterMsgs[0].sequenceNumber;
    await deadLetterMsgs[0].defer();

    const deferredMsgs = await deadletterSubscriptionClient.receiveDeferredMessage(sequenceNumber);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsgs.body, testMessages[0].body);
    should.equal(deferredMsgs.messageId, testMessages[0].messageId);

    await deferredMsgs.complete();

    await testPeekMsgsLength(subscriptionClient, 0);

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  const testError = (err: Error) => {
    should.equal(err.name, "InvalidOperationError");
    errorWasThrown = true;
  };

  it("Dead letter a message received from dead letter queue", async function(): Promise<void> {
    await queueClient.send(testMessages[0]);
    const receivedMsgs = await queueClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(queueClient, 0);

    const deadletterQueueClient = await getdeadletterQueueClient();
    let deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].deadLetter().catch((err) => testError(err));

    should.equal(errorWasThrown, true);

    deadLetterMsgs = await deadletterQueueClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();
    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Dead letter a message received from dead letter subscription", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    const receivedMsgs = await subscriptionClient.receiveBatch(1);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receivedMsgs[0].deadLetter();

    await testPeekMsgsLength(subscriptionClient, 0);

    const deadletterSubscriptionClient = await getdeadletterSubscriptionClient();

    let deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].deadLetter().catch((err) => testError(err));

    should.equal(errorWasThrown, true);

    deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(1);

    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].body, testMessages[0].body);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);

    await deadLetterMsgs[0].complete();
  });
});
