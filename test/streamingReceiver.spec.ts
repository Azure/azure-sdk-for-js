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
  ServiceBusMessage,
  TopicClient,
  SubscriptionClient,
  delay,
  ReceiveHandler
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
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

const maxDeliveryCount = 10;
let namespace: Namespace;
let queueClient: QueueClient;
let topicClient: TopicClient;
let subscriptionClient: SubscriptionClient;
let deadletterQueueClient: QueueClient;
let deadletterSubscriptionClient: SubscriptionClient;

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
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}

describe("Streaming Receiver Misc Tests", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.sendBatch(testMessages);
    await testPeekMsgsLength(receiverClient, testMessages.length);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = receiverClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessages.some((x) => msg.body === x.body && msg.messageId === x.messageId),
          true
        );
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessages.length) {
        break;
      }
    }

    await receiveListener.stop();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("AutoComplete removes the message from Queue", async function(): Promise<void> {
    await testAutoComplete(queueClient, queueClient);
  });

  it("AutoComplete removes the message from Subscription", async function(): Promise<void> {
    await testAutoComplete(topicClient, subscriptionClient);
  });

  async function testManualComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = receiverClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessages.some((x) => msg.body === x.body && msg.messageId === x.messageId),
          true
        );
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessages.length) {
        break;
      }
    }

    await testPeekMsgsLength(receiverClient, 2);

    await receivedMsgs[0].complete();
    await receivedMsgs[1].complete();
    await receiveListener.stop();
  }

  it("Disabled autoComplete, no manual complete retains the message in Queue", async function(): Promise<
    void
  > {
    await testManualComplete(queueClient, queueClient);
  });

  it("Disabled autoComplete, no manual complete retains the message in Subscription", async function(): Promise<
    void
  > {
    await testManualComplete(topicClient, subscriptionClient);
  });

  async function testMultipleAbandons(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.sendBatch(testMessages);

    let checkDeliveryCount0 = 0;
    let checkDeliveryCount1 = 0;

    const receiveListener = await receiverClient.receive(
      (msg: ServiceBusMessage) => {
        if (msg.messageId === testMessages[0].messageId) {
          should.equal(msg.deliveryCount, checkDeliveryCount0);
          checkDeliveryCount0++;
        } else if (msg.messageId === testMessages[1].messageId) {
          should.equal(msg.deliveryCount, checkDeliveryCount1);
          checkDeliveryCount1++;
        }
        return msg.abandon();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(4000);

    await receiveListener.stop();

    should.equal(checkDeliveryCount0, maxDeliveryCount);
    should.equal(checkDeliveryCount1, maxDeliveryCount);

    await testPeekMsgsLength(receiverClient, 0); // No messages in the queue

    const deadLetterMsgs = await deadletterClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, testMessages.length);
    should.equal(deadLetterMsgs[0].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[1].deliveryCount, maxDeliveryCount);
    should.equal(testMessages.some((x) => deadLetterMsgs[0].messageId === x.messageId), true);
    should.equal(testMessages.some((x) => deadLetterMsgs[1].messageId === x.messageId), true);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Abandoned message is retained in the Queue with incremented deliveryCount. After 10 times, you can only get it from the dead letter queue.", async function(): Promise<
    void
  > {
    await testMultipleAbandons(queueClient, queueClient, deadletterQueueClient);
  });

  it("Abandoned message is retained in the Subsrciption with incremented deliveryCount. After 10 times, you can only get it from the dead letter.", async function(): Promise<
    void
  > {
    await testMultipleAbandons(topicClient, subscriptionClient, deadletterSubscriptionClient);
  });
});

describe("Complete message", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = receiverClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessages.some((x) => msg.body === x.body && msg.messageId === x.messageId),
          true
        );
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessages.length) {
        break;
      }
    }

    await testPeekMsgsLength(receiverClient, 0);

    await receiveListener.stop();
  }
  it("Queue: complete() removes message", async function(): Promise<void> {
    await testComplete(queueClient, queueClient, false);
  });

  it("Subscription: complete() removes message", async function(): Promise<void> {
    await testComplete(topicClient, subscriptionClient, false);
  });

  it("Queue with autoComplete: complete() removes message", async function(): Promise<void> {
    await testComplete(queueClient, queueClient, true);
  });

  it("Subscription with autoComplete: complete() removes message", async function(): Promise<void> {
    await testComplete(topicClient, subscriptionClient, true);
  });
});

describe("Abandon message", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.send(testMessages[0]);
    const receiveListener: ReceiveHandler = await receiverClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          return receiveListener.stop();
        });
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { maxAutoRenewDurationInSeconds: 0, autoComplete }
    );
    await delay(4000);

    const receivedMsgs = await receiverClient.receiveBatch(1);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
    // should.equal(receivedMsgs[0].deliveryCount, 1);
    await receivedMsgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(queueClient, queueClient, false);
  });

  it("Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(topicClient, subscriptionClient, false);
  });

  it("Queue with autoComplete: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(queueClient, queueClient, true);
  });

  it("Subscription with autoComplete:  abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(topicClient, subscriptionClient, true);
  });
});

describe("Defer message", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.sendBatch(testMessages);

    let seq0: any = 0;
    let seq1: any = 0;
    const receiveListener = await receiverClient.receive(
      (msg: ServiceBusMessage) => {
        if (msg.messageId === testMessages[0].messageId) {
          seq0 = msg.sequenceNumber;
        } else if (msg.messageId === testMessages[1].messageId) {
          seq1 = msg.sequenceNumber;
        }
        return msg.defer();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete }
    );

    await delay(4000);

    await receiveListener.stop();
    const deferredMsg0 = await receiverClient.receiveDeferredMessage(seq0);
    const deferredMsg1 = await receiverClient.receiveDeferredMessage(seq1);
    if (!deferredMsg0) {
      throw "No message received for sequence number";
    }
    if (!deferredMsg1) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsg0.body, testMessages[0].body);
    should.equal(deferredMsg0.messageId, testMessages[0].messageId);

    should.equal(deferredMsg1.body, testMessages[1].body);
    should.equal(deferredMsg1.messageId, testMessages[1].messageId);
    await deferredMsg0.complete();
    await deferredMsg1.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Queue: defer() moves message to deferred queue", async function(): Promise<void> {
    await testDefer(queueClient, queueClient, false);
  });

  it("Subscription: defer() moves message to deferred queue", async function(): Promise<void> {
    await testDefer(topicClient, subscriptionClient, false);
  });

  it("Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(queueClient, queueClient, true);
  });

  it("Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(topicClient, subscriptionClient, true);
  });
});

describe("Deadletter message", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    deadletterClient: QueueClient | SubscriptionClient,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.sendBatch(testMessages);
    await testPeekMsgsLength(receiverClient, 2);
    const receiveListener = await receiverClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete }
    );

    await delay(4000);
    await receiveListener.stop();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadletterClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, testMessages.length);
    should.equal(testMessages.some((x) => deadLetterMsgs[0].messageId === x.messageId), true);
    should.equal(testMessages.some((x) => deadLetterMsgs[1].messageId === x.messageId), true);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Queue: deadLetter() moves message to deadletter queue", async function(): Promise<void> {
    await testDeadletter(queueClient, queueClient, deadletterQueueClient, false);
  });

  it("Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(topicClient, subscriptionClient, deadletterSubscriptionClient, false);
  });

  it("Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(queueClient, queueClient, deadletterQueueClient, false);
  });

  it("Subscription with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(topicClient, subscriptionClient, deadletterSubscriptionClient, false);
  });
});

describe("Multiple Streaming Receivers", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const receiveListener: ReceiveHandler = await receiverClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );
    await delay(5000);
    let errorWasThrown = false;
    try {
      const receiveListener2 = await receiverClient.receive(
        (msg: ServiceBusMessage) => {
          return Promise.resolve();
        },
        (err: Error) => {
          should.exist(err);
        }
      );
      await receiveListener2.stop();
    } catch (err) {
      errorWasThrown = true;
      should.equal(!err.message.search("has already been created for the Subscription"), false);
    }
    should.equal(errorWasThrown, true);

    await receiveListener.stop();
  }

  it("Second Streaming Receiver call should fail if the first one is not stopped for Queues", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(queueClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Subscriptions", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(subscriptionClient);
  });
});
