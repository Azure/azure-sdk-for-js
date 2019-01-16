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
  SendableMessageInfo,
  generateUuid,
  TopicClient,
  SubscriptionClient,
  delay,
  ServiceBusMessage,
  ReceiveMode
} from "../lib";

import { DispositionType } from "../lib/serviceBusMessage";

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

let namespace: Namespace;
let queueClient: QueueClient;
let topicClient: TopicClient;
let subscriptionClient: SubscriptionClient;

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
  queueClient = namespace.createQueueClient(process.env.QUEUE_NAME, {
    receiveMode: ReceiveMode.receiveAndDelete
  });
  topicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  subscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME,
    {
      receiveMode: ReceiveMode.receiveAndDelete
    }
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

describe("ReceiveBatch from Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testNosettlment(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessages[0]);
    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Queue: No settlement of the message removes message", async function(): Promise<void> {
    await testNosettlment(queueClient, queueClient);
  });

  it("Subscription: No settlement of the message removes message", async function(): Promise<void> {
    await testNosettlment(topicClient, subscriptionClient);
  });
});

describe("Streaming Receiver from Queue/Subscription", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testNoSettlement(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    autoCompleteFlag: boolean
  ): Promise<void> {
    await senderClient.send(testMessages[0]);
    const receivedMsgs: ServiceBusMessage[] = [];
    const receiveListener = receiverClient.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      (err: Error) => {
        should.not.exist(err);
      },
      { autoComplete: autoCompleteFlag }
    );

    await delay(2000);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await receiveListener.stop();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Queue: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await testNoSettlement(queueClient, queueClient, true);
  });

  it("Subscription: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await testNoSettlement(topicClient, subscriptionClient, true);
  });

  it("Queue: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await testNoSettlement(queueClient, queueClient, false);
  });

  it("Subscription: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await testNoSettlement(topicClient, subscriptionClient, false);
  });
});

describe("Throws error when Complete/Abandon/Defer/Deadletter/RenewLock of message", function(): void {
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

  const testError = (err: Error) => {
    should.equal(err.message, "The operation is only supported in 'PeekLock' receive mode.");
    errorWasThrown = true;
  };

  async function testSettlement(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    operation: DispositionType
  ): Promise<void> {
    const msg = await sendReceiveMsg(senderClient, receiverClient);

    if (operation === DispositionType.complete) {
      await msg.complete().catch((err) => testError(err));
    } else if (operation === DispositionType.abandon) {
      await msg.abandon().catch((err) => testError(err));
    } else if (operation === DispositionType.deadletter) {
      await msg.deadLetter().catch((err) => testError(err));
    } else if (operation === DispositionType.defer) {
      await msg.defer().catch((err) => testError(err));
    }

    should.equal(errorWasThrown, true);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Queue: complete() throws error", async function(): Promise<void> {
    await testSettlement(queueClient, queueClient, DispositionType.complete);
  });

  it("Subscription: complete() throws error", async function(): Promise<void> {
    await testSettlement(topicClient, subscriptionClient, DispositionType.complete);
  });

  it("Queue: abandon() throws error", async function(): Promise<void> {
    await testSettlement(queueClient, queueClient, DispositionType.abandon);
  });

  it("Subscription: abandon() throws error", async function(): Promise<void> {
    await testSettlement(topicClient, subscriptionClient, DispositionType.abandon);
  });

  it("Queue: defer() throws error", async function(): Promise<void> {
    await testSettlement(queueClient, queueClient, DispositionType.defer);
  });

  it("Subscription: defer() throws error", async function(): Promise<void> {
    await testSettlement(topicClient, subscriptionClient, DispositionType.defer);
  });

  it("Queue: deadLetter() throws error", async function(): Promise<void> {
    await testSettlement(queueClient, queueClient, DispositionType.deadletter);
  });

  it("Subscription: deadLetter()", async function(): Promise<void> {
    await testSettlement(topicClient, subscriptionClient, DispositionType.deadletter);
  });

  async function testRenewLock(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    const msg = await sendReceiveMsg(senderClient, receiverClient);

    await receiverClient.renewLock(msg).catch((err) => testError(err));

    should.equal(errorWasThrown, true);
  }

  it("Queue: Renew message lock throws error", async function(): Promise<void> {
    await testRenewLock(queueClient, queueClient);
  });

  it("Subscription: Renew message lock throws error", async function(): Promise<void> {
    await testRenewLock(topicClient, subscriptionClient);
  });
});
