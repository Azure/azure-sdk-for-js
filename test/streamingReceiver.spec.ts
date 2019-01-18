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
  ServiceBusMessage,
  TopicClient,
  SubscriptionClient,
  delay,
  ReceiveHandler
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
let partitionedQueueClient: QueueClient;
let partitionedTopicClient: TopicClient;
let partitionedSubscriptionClient: SubscriptionClient;
let unpartitionedQueueClient: QueueClient;
let unpartitionedTopicClient: TopicClient;
let unpartitionedSubscriptionClient: SubscriptionClient;

let partitionedDeadletterQueueClient: QueueClient;
let partitionedDeadletterSubscriptionClient: SubscriptionClient;
let unpartitionedDeadletterQueueClient: QueueClient;
let unpartitionedDeadletterSubscriptionClient: SubscriptionClient;
let errorWasThrown: boolean;

async function beforeEachTest(): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  if (!process.env.TOPIC_NAME || !process.env.TOPIC_NAME_NO_PARTITION) {
    throw new Error(
      "Define TOPIC_NAME & TOPIC_NAME_NO_PARTITIONin your environment before running integration tests."
    );
  }
  if (!process.env.QUEUE_NAME || !process.env.QUEUE_NAME_NO_PARTITION) {
    throw new Error(
      "Define QUEUE_NAME & QUEUE_NAME_NO_PARTITION in your environment before running integration tests."
    );
  }
  if (!process.env.SUBSCRIPTION_NAME || !process.env.SUBSCRIPTION_NAME_NO_PARTITION) {
    throw new Error(
      "Define SUBSCRIPTION_NAME & SUBSCRIPTION_NAME_NO_PARTITION in your environment before running integration tests."
    );
  }

  namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
  partitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
  partitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  partitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );

  unpartitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME_NO_PARTITION);
  unpartitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME_NO_PARTITION);
  unpartitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION
  );
  partitionedDeadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(partitionedQueueClient.name)
  );
  partitionedDeadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      partitionedTopicClient.name,
      partitionedSubscriptionClient.subscriptionName
    ),
    partitionedSubscriptionClient.subscriptionName
  );

  unpartitionedDeadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(unpartitionedQueueClient.name)
  );
  unpartitionedDeadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      unpartitionedTopicClient.name,
      unpartitionedSubscriptionClient.subscriptionName
    ),
    unpartitionedSubscriptionClient.subscriptionName
  );

  const peekedPartitionedQueueMsg = await partitionedQueueClient.peek();
  if (peekedPartitionedQueueMsg.length) {
    throw new Error("Please use an empty partitioned queue for integration testing");
  }

  const peekedPartitionedSubscriptionMsg = await partitionedSubscriptionClient.peek();
  if (peekedPartitionedSubscriptionMsg.length) {
    throw new Error("Please use an empty partitioned Subscription for integration testing");
  }

  const peekedUnPartitionedQueueMsg = await unpartitionedQueueClient.peek();
  if (peekedUnPartitionedQueueMsg.length) {
    throw new Error("Please use an empty unpartitioned queue for integration testing");
  }

  const peekedUnPartitionedSubscriptionMsg = await unpartitionedSubscriptionClient.peek();
  if (peekedUnPartitionedSubscriptionMsg.length) {
    throw new Error("Please use an empty unpartitioned Subscription for integration testing");
  }
  errorWasThrown = false;
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

  it("AutoComplete removes the message from Partitioned Queues", async function(): Promise<void> {
    await testAutoComplete(partitionedQueueClient, partitionedQueueClient);
  });

  it("AutoComplete removes the message from Partitioned Topics and Subscription", async function(): Promise<
    void
  > {
    await testAutoComplete(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("AutoComplete removes the message from UnPartitioned Queues", async function(): Promise<void> {
    await testAutoComplete(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("AutoComplete removes the message from UnPartitioned Topics and Subscription", async function(): Promise<
    void
  > {
    await testAutoComplete(unpartitionedTopicClient, unpartitionedSubscriptionClient);
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

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Queues", async function(): Promise<
    void
  > {
    await testManualComplete(partitionedQueueClient, partitionedQueueClient);
  });

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Topics and Subscription", async function(): Promise<
    void
  > {
    await testManualComplete(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Queues", async function(): Promise<
    void
  > {
    await testManualComplete(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Topics and Subscription", async function(): Promise<
    void
  > {
    await testManualComplete(unpartitionedTopicClient, unpartitionedSubscriptionClient);
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
  it("Partitioned Queues: complete() removes message", async function(): Promise<void> {
    await testComplete(partitionedQueueClient, partitionedQueueClient, false);
  });

  it("Partitioned Topics and Subscription: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicClient, partitionedSubscriptionClient, false);
  });

  it("UnPartitioned Queue: complete() removes message", async function(): Promise<void> {
    await testComplete(unpartitionedQueueClient, unpartitionedQueueClient, false);
  });

  it("UnPartitioned Topics and Subscription: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedTopicClient, unpartitionedSubscriptionClient, false);
  });

  it("Partitioned Queues with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedQueueClient, partitionedQueueClient, true);
  });

  it("Partitioned Topics and Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicClient, partitionedSubscriptionClient, true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedQueueClient, unpartitionedQueueClient, true);
  });

  it("UnPartitioned Topics and Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedTopicClient, unpartitionedSubscriptionClient, true);
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
  it("Partitioned Queues: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueClient, partitionedQueueClient, false);
  });

  it("Partitioned Topics and Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicClient, partitionedSubscriptionClient, false);
  });

  it("UnPartitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueClient, unpartitionedQueueClient, false);
  });

  it("UnPartitioned Topics and Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedTopicClient, unpartitionedSubscriptionClient, false);
  });

  it("Partitioned Queues with autoComplete: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueClient, partitionedQueueClient, true);
  });

  it("Partitioned Topics and Subscription with autoComplete: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicClient, partitionedSubscriptionClient, true);
  });

  it("UnPartitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueClient, unpartitionedQueueClient, true);
  });

  it("UnPartitioned Topics and Subscription with autoComplete: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedTopicClient, unpartitionedSubscriptionClient, true);
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
  it("Partitioned Queues: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueClient, partitionedQueueClient, false);
  });

  it("Partitioned Topics and Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicClient, partitionedSubscriptionClient, false);
  });

  // it("UnPartitioned Queue: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueClient, unpartitionedQueueClient, false);
  // });

  // it("UnPartitioned Topics and Subscription: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicClient, unpartitionedSubscriptionClient, false);
  // });

  it("Partitioned Queues with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueClient, partitionedQueueClient, true);
  });

  it("Partitioned Topics and Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicClient, partitionedSubscriptionClient, true);
  });

  // it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueClient, unpartitionedQueueClient, true);
  // });

  // it("UnPartitioned Topics and Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicClient, unpartitionedSubscriptionClient, true);
  // });
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

  it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient,
      false
    );
  });

  it("Partitioned Topics and Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient,
      false
    );
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient,
      false
    );
  });

  it("UnPartitioned Topics and Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient,
      false
    );
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient,
      true
    );
  });

  it("Partitioned Topics and Subscription with autoComplete: deadLetter() moves message to deadletter", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient,
      true
    );
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient,
      true
    );
  });

  it("UnPartitioned Topics and Subscription with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient,
      true
    );
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

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Queues", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(partitionedQueueClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Topics and Subscription", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(partitionedSubscriptionClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Queues", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(unpartitionedQueueClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Topics and Subscription", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(unpartitionedSubscriptionClient);
  });
});

describe("Settle an already Settled message throws error", () => {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error) => {
    should.equal(err.message, "This message has been already settled.");
    errorWasThrown = true;
  };

  async function testSettlement(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient,
    operation: DispositionType
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
      }
    );

    await delay(5000);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    await testPeekMsgsLength(receiverClient, 0);

    if (operation === DispositionType.complete) {
      await receivedMsgs[0].complete().catch((err) => testError(err));
    } else if (operation === DispositionType.abandon) {
      await receivedMsgs[0].abandon().catch((err) => testError(err));
    } else if (operation === DispositionType.deadletter) {
      await receivedMsgs[0].deadLetter().catch((err) => testError(err));
    } else if (operation === DispositionType.defer) {
      await receivedMsgs[0].defer().catch((err) => testError(err));
    }

    should.equal(errorWasThrown, true);

    await receiveListener.stop();
  }

  it("Partitioned Queues: complete() throws error", async function(): Promise<void> {
    await testSettlement(partitionedQueueClient, partitionedQueueClient, DispositionType.complete);
  });

  it("Partitioned Topics and Subscription: complete() throws error", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      DispositionType.complete
    );
  });

  it("UnPartitioned Queue: complete() throws error", async function(): Promise<void> {
    await testSettlement(partitionedQueueClient, partitionedQueueClient, DispositionType.complete);
  });

  it("UnPartitioned Topics and Subscription: complete() throws error", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      DispositionType.complete
    );
  });

  it("Partitioned Queues: abandon() throws error", async function(): Promise<void> {
    await testSettlement(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      DispositionType.abandon
    );
  });

  it("Partitioned Topics and Subscription: abandon() throws error", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      DispositionType.abandon
    );
  });

  it("UnPartitioned Queue: abandon() throws error", async function(): Promise<void> {
    await testSettlement(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      DispositionType.abandon
    );
  });

  it("UnPartitioned Topics and Subscription: abandon() throws error", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      DispositionType.abandon
    );
  });

  it("Partitioned Queues: defer() throws error", async function(): Promise<void> {
    await testSettlement(partitionedQueueClient, partitionedQueueClient, DispositionType.defer);
  });

  it("Partitioned Topics and Subscription: defer() throws error", async function(): Promise<void> {
    await testSettlement(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      DispositionType.defer
    );
  });

  it("UnPartitioned Queue: defer() throws error", async function(): Promise<void> {
    await testSettlement(partitionedQueueClient, partitionedQueueClient, DispositionType.defer);
  });

  it("UnPartitioned Topics and Subscription: defer() throws error", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      DispositionType.defer
    );
  });

  it("Partitioned Queues: deadLetter() throws error", async function(): Promise<void> {
    await testSettlement(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      DispositionType.deadletter
    );
  });

  it("Partitioned Topics and Subscription: deadLetter()", async function(): Promise<void> {
    await testSettlement(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      DispositionType.deadletter
    );
  });

  it("UnPartitioned Queue: deadLetter() throws error", async function(): Promise<void> {
    await testSettlement(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      DispositionType.deadletter
    );
  });

  it("UnPartitioned Topics and Subscription: deadLetter()", async function(): Promise<void> {
    await testSettlement(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      DispositionType.deadletter
    );
  });
});
