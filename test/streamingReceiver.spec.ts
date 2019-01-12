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

function testReceivedMessages(receivedMsgs: ServiceBusMessage[]): void {
  should.equal(receivedMsgs.length, 2);
  should.equal(receivedMsgs[0].body, testMessages[0].body);
  should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
  should.equal(receivedMsgs[1].body, testMessages[1].body);
  should.equal(receivedMsgs[1].messageId, testMessages[1].messageId);
}

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(peekedMsgs.length, expectedPeekLength);
}

const maxDeliveryCount = 10;

describe("Streaming Receiver from Queue/Subscription", function(): void {
  let namespace: Namespace;
  let queueClient: QueueClient;
  let topicClient: TopicClient;
  let subscriptionClient: SubscriptionClient;

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
  });

  afterEach(async () => {
    return namespace.close();
  });

  it("AutoComplete removes the message from Queue", async function(): Promise<void> {
    await queueClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = queueClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    await delay(1000);

    testReceivedMessages(receivedMsgs);

    await receiveListener.stop();
    await testPeekMsgsLength(queueClient, 0);
  });

  it("AutoComplete removes the message from Subscription", async function(): Promise<void> {
    await topicClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    await delay(1000);

    testReceivedMessages(receivedMsgs);

    await receiveListener.stop();
    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("Disabled autoComplete, no manual complete retains the message in Queue", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = queueClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(1000);

    testReceivedMessages(receivedMsgs);

    await testPeekMsgsLength(queueClient, 2);

    await receivedMsgs[0].complete();
    await receivedMsgs[1].complete();
    await receiveListener.stop();
  });

  it("Disabled autoComplete, no manual complete retains the message in Subscription", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(1000);

    testReceivedMessages(receivedMsgs);

    await testPeekMsgsLength(subscriptionClient, 2);

    await receivedMsgs[0].complete();
    await receivedMsgs[1].complete();
    await receiveListener.stop();
  });

  it("Disabled autoComplete, manual complete removes the message from Queue", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = queueClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(1000);

    testReceivedMessages(receivedMsgs);

    await testPeekMsgsLength(queueClient, 0);

    await receiveListener.stop();
  });

  it("Disabled autoComplete, manual complete removes the message from Subscription", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(1000);

    testReceivedMessages(receivedMsgs);

    await testPeekMsgsLength(subscriptionClient, 0);

    await receiveListener.stop();
  });

  it("Abandoned message is retained in the Queue with incremented deliveryCount. After 10 times, you can only get it from the dead letter queue.", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);

    let checkDeliveryCount0 = 0;
    let checkDeliveryCount1 = 0;

    const receiveListener = await queueClient.receive(
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

    await testPeekMsgsLength(queueClient, 0); // No messages in the queue

    const deadLetterQueuePath = Namespace.getDeadLetterQueuePathForQueue(queueClient.name);
    const deadletterQueueClient = namespace.createQueueClient(deadLetterQueuePath);

    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 2);
    should.equal(deadLetterMsgs[0].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[1].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[1].messageId, testMessages[1].messageId);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("Abandoned message is retained in the Subsrciption with incremented deliveryCount. After 10 times, you can only get it from the dead letter.", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    let checkDeliveryCount0 = 0;
    let checkDeliveryCount1 = 0;
    const receiveListener = await subscriptionClient.receive(
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

    const peekedMsgs = await subscriptionClient.peek(2);
    should.equal(peekedMsgs.length, 0);

    const deadLetterSubscriptionPath = Namespace.getDeadLetterSubcriptionPathForSubcription(
      topicClient.name,
      subscriptionClient.subscriptionName
    );

    const deadletterSubscriptionClient = namespace.createSubscriptionClient(
      deadLetterSubscriptionPath ? deadLetterSubscriptionPath : "",
      subscriptionClient.subscriptionName
    );

    await testPeekMsgsLength(deadletterSubscriptionClient, 2); // Two messages in the DL

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 2);
    should.equal(deadLetterMsgs[0].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[1].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[1].messageId, testMessages[1].messageId);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("With auto-complete enabled, manual completion in the Queue by the user should not result in errors", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);
    await testPeekMsgsLength(queueClient, 2);
    const receiveListener = await queueClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    await delay(4000);
    await receiveListener.stop();

    await testPeekMsgsLength(queueClient, 0);
  });

  it("With auto-complete enabled, manual completion in the Subscription by the user should not result in errors", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    const receiveListener = await subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    await delay(4000);

    await receiveListener.stop();

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("With auto-complete enabled, manual abandon in the Queue by the user should not result in errors", async function(): Promise<
    void
  > {
    await queueClient.send(testMessages[0]);
    const receiveListener: ReceiveHandler = await queueClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          return receiveListener.stop();
        });
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { maxAutoRenewDurationInSeconds: 0 }
    );
    await delay(4000);

    const receivedMsgs = await queueClient.receiveBatch(1);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
    await receivedMsgs[0].complete();
    await testPeekMsgsLength(queueClient, 0);
  });

  it("With auto-complete enabled, manual abandon in the Subscription by the user should not result in errors", async function(): Promise<
    void
  > {
    await topicClient.send(testMessages[0]);
    const receiveListener: ReceiveHandler = await subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          return receiveListener.stop();
        });
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { maxAutoRenewDurationInSeconds: 0 }
    );

    await delay(4000);

    const receivedMsgs = await subscriptionClient.receiveBatch(1);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
    await receivedMsgs[0].complete();
    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("With auto-complete enabled, manual deadletter in the Queue by the user should not result in errors", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);
    await testPeekMsgsLength(queueClient, 2);
    const receiveListener = await queueClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    await delay(4000);
    await receiveListener.stop();

    await testPeekMsgsLength(queueClient, 0);

    const deadLetterQueuePath = Namespace.getDeadLetterQueuePathForQueue(queueClient.name);
    const deadletterQueueClient = namespace.createQueueClient(deadLetterQueuePath);

    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 2);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[1].messageId, testMessages[1].messageId);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("With auto-complete enabled, manual deadletter in the Subscription by the user should not result in errors", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    const receiveListener = await subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );

    await delay(4000);

    await receiveListener.stop();

    await testPeekMsgsLength(subscriptionClient, 0);
    const deadLetterSubscriptionPath = Namespace.getDeadLetterSubcriptionPathForSubcription(
      topicClient.name,
      subscriptionClient.subscriptionName
    );

    const deadletterSubscriptionClient = namespace.createSubscriptionClient(
      deadLetterSubscriptionPath ? deadLetterSubscriptionPath : "",
      subscriptionClient.subscriptionName
    );

    await testPeekMsgsLength(deadletterSubscriptionClient, 2); // Two messages in the DL

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 2);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[1].messageId, testMessages[1].messageId);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("With auto-complete enabled, manual defer in the Queue by the user should not result in errors", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);

    let seq0: any = 0;
    let seq1: any = 0;
    const receiveListener = await queueClient.receive(
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
      }
    );

    await delay(4000);

    await receiveListener.stop();
    const deferredMsg0 = await queueClient.receiveDeferredMessage(seq0);
    const deferredMsg1 = await queueClient.receiveDeferredMessage(seq1);
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

    await testPeekMsgsLength(queueClient, 0);
  });

  it("With auto-complete enabled, manual defer in the Subscription by the user should not result in errors", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    let seq0: any = 0;
    let seq1: any = 0;
    const receiveListener = await subscriptionClient.receive(
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
      }
    );

    await delay(4000);

    await receiveListener.stop();

    const deferredMsg0 = await subscriptionClient.receiveDeferredMessage(seq0);
    const deferredMsg1 = await subscriptionClient.receiveDeferredMessage(seq1);
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

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("With auto-complete disabled, deferring a message results in not getting the same message again from queue. The message is then gotten using receiveDefferedMessages", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);

    let seq0: any = 0;
    let seq1: any = 0;
    const receiveListener = await queueClient.receive(
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
      { autoComplete: false }
    );

    await delay(4000);

    await receiveListener.stop();
    const deferredMsg0 = await queueClient.receiveDeferredMessage(seq0);
    const deferredMsg1 = await queueClient.receiveDeferredMessage(seq1);
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

    await testPeekMsgsLength(queueClient, 0);
  });

  it("With auto-complete disabled, deferring a message results in not getting the same message again from subscription. The message is then gotten using receiveDefferedMessages", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    let seq0: any = 0;
    let seq1: any = 0;
    const receiveListener = await subscriptionClient.receive(
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
      { autoComplete: false }
    );

    await delay(4000);

    await receiveListener.stop();

    const deferredMsg0 = await subscriptionClient.receiveDeferredMessage(seq0);
    const deferredMsg1 = await subscriptionClient.receiveDeferredMessage(seq1);
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

    await testPeekMsgsLength(subscriptionClient, 0);
  });

  it("With auto-complete disabled, dead lettering the message results in not getting the same message again from queue. The message is then gotten only from the dead letter", async function(): Promise<
    void
  > {
    await queueClient.sendBatch(testMessages);
    await testPeekMsgsLength(queueClient, 2);
    const receiveListener = await queueClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(4000);
    await receiveListener.stop();

    await testPeekMsgsLength(queueClient, 0);

    const deadLetterQueuePath = Namespace.getDeadLetterQueuePathForQueue(queueClient.name);
    const deadletterQueueClient = namespace.createQueueClient(deadLetterQueuePath);

    const deadLetterMsgs = await deadletterQueueClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 2);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[1].messageId, testMessages[1].messageId);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterQueueClient, 0);
  });

  it("With auto-complete disabled, dead lettering the message results in not getting the same message again from subscription. The message is then gotten only from the dead letter", async function(): Promise<
    void
  > {
    await topicClient.sendBatch(testMessages);

    const receiveListener = await subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: false }
    );

    await delay(4000);

    await receiveListener.stop();

    await testPeekMsgsLength(subscriptionClient, 0);
    const deadLetterSubscriptionPath = Namespace.getDeadLetterSubcriptionPathForSubcription(
      topicClient.name,
      subscriptionClient.subscriptionName
    );

    const deadletterSubscriptionClient = namespace.createSubscriptionClient(
      deadLetterSubscriptionPath ? deadLetterSubscriptionPath : "",
      subscriptionClient.subscriptionName
    );

    await testPeekMsgsLength(deadletterSubscriptionClient, 2); // Two messages in the DL

    const deadLetterMsgs = await deadletterSubscriptionClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 2);
    should.equal(deadLetterMsgs[0].messageId, testMessages[0].messageId);
    should.equal(deadLetterMsgs[1].messageId, testMessages[1].messageId);

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterSubscriptionClient, 0);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Queues", async function(): Promise<
    void
  > {
    const receiveListener: ReceiveHandler = await queueClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );
    await delay(5000);
    try {
      const receiveListener2 = await queueClient.receive(
        (msg: ServiceBusMessage) => {
          return Promise.resolve();
        },
        (err: Error) => {
          should.exist(err);
        }
      );
      await receiveListener2.stop();
    } catch (err) {
      should.equal(!err.message.search("has already been created for the Subscription"), false);
    }

    await receiveListener.stop();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Subscriptions", async function(): Promise<
    void
  > {
    const receiveListener: ReceiveHandler = await subscriptionClient.receive(
      (msg: ServiceBusMessage) => {
        return msg.complete();
      },
      (err: Error) => {
        should.not.exist(err);
      }
    );
    await delay(5000);

    try {
      const receiveListener2 = await subscriptionClient.receive(
        (msg: ServiceBusMessage) => {
          return Promise.resolve();
        },
        (err: Error) => {
          should.exist(err);
        }
      );
      await receiveListener2.stop();
    } catch (err) {
      should.equal(!err.message.search("has already been created for the Subscription"), false);
    }

    await receiveListener.stop();
  });
});
