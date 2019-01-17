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
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

const maxDeliveryCount = 10;

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

describe("Complete/Abandon/Defer/Deadletter normal message", function(): void {
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

  it("Partitioned Queues: complete() removes message", async function(): Promise<void> {
    await testComplete(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: complete() removes message", async function(): Promise<void> {
    await testComplete(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedTopicClient, unpartitionedSubscriptionClient);
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

  it("Partitioned Queues: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedTopicClient, unpartitionedSubscriptionClient);
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

  it("Partitioned Queues: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicClient, partitionedSubscriptionClient);
  });

  // it("Unpartitioned Queues: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueClient, unpartitionedQueueClient);
  // });

  // it("Unpartitioned Topics and Subscription: defer() moves message to deferred queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  // });

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

  it("Partitioned Queues: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
  });
});

describe("Abandon/Defer/Deadletter deferred message", function(): void {
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

  it("Partitioned Queues: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicClient, partitionedSubscriptionClient);
  });

  // it("Unpartitioned Queues: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueClient, unpartitionedQueueClient);
  // });

  // it("Unpartitioned Topics and Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  // });

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

  it("Partitioned Queues: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  // it("Unpartitioned Queues: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
  //   void
  // > {
  //   await testDeadletter(
  //     unpartitionedQueueClient,
  //     unpartitionedQueueClient,
  //     unpartitionedDeadletterQueueClient
  //   );
  // });

  // it("Unpartitioned Topics and Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
  //   void
  // > {
  //   await testDeadletter(
  //     unpartitionedTopicClient,
  //     unpartitionedSubscriptionClient,
  //     unpartitionedDeadletterSubscriptionClient
  //   );
  // });

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

  it("Partitioned Queues: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicClient, partitionedSubscriptionClient);
  });

  // it("Unpartitioned Queues: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
  //   void
  // > {
  //   await testAbandon(unpartitionedQueueClient, unpartitionedQueueClient);
  // });

  // it("Unpartitioned Topics and Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
  //   void
  // > {
  //   await testAbandon(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  // });
});

describe("Abandon/Defer/Deadletter deadlettered message", function(): void {
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

  it("Partitioned Queues: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
    void
  > {
    await testDeadLetter(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
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

  it("Partitioned Queues: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Abandon a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
    );
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

  it("Partitioned Queues: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testDefer(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Defer a message received from dead letter queue", async function(): Promise<
    void
  > {
    await testDefer(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  // it("Unpartitioned Queues: Defer a message received from dead letter queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(
  //     unpartitionedQueueClient,
  //     unpartitionedQueueClient,
  //     unpartitionedDeadletterQueueClient
  //   );
  // });

  // it("Unpartitioned Topics and Subscription: Defer a message received from dead letter queue", async function(): Promise<
  //   void
  // > {
  //   await testDefer(
  //     unpartitionedTopicClient,
  //     unpartitionedSubscriptionClient,
  //     unpartitionedDeadletterSubscriptionClient
  //   );
  // });
});

describe("Multiple ReceiveBatch calls", function(): void {
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

  it("Partitioned Queues: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
    void
  > {
    await testParallelReceiveBatchCalls(unpartitionedSubscriptionClient);
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

  it("Partitioned Queues: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Multiple receiveBatch using Queues/Subscriptions", async function(): Promise<
    void
  > {
    await testSequentialReceiveBatchCalls(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient
    );
  });
});

describe("Batching Receiver Misc Tests", function(): void {
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

  it("Partitioned Queues: Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      partitionedQueueClient,
      partitionedQueueClient,
      partitionedDeadletterQueueClient
    );
  });

  it("Partitioned Topics and Subscription: Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      partitionedTopicClient,
      partitionedSubscriptionClient,
      partitionedDeadletterSubscriptionClient
    );
  });

  it("Unpartitioned Queues: Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      unpartitionedQueueClient,
      unpartitionedQueueClient,
      unpartitionedDeadletterQueueClient
    );
  });

  it("Unpartitioned Topics and Subscription: Message abandoned more than maxDeliveryCount goes to dead letter queue", async function(): Promise<
    void
  > {
    await testAbandonMsgsTillMaxDeliveryCount(
      unpartitionedTopicClient,
      unpartitionedSubscriptionClient,
      unpartitionedDeadletterSubscriptionClient
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

  it("Partitioned Queues: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
    void
  > {
    await testNoSettlement(unpartitionedTopicClient, unpartitionedSubscriptionClient);
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

  it("Partitioned Queues: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(partitionedQueueClient, partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(partitionedTopicClient, partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(unpartitionedQueueClient, unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
    void
  > {
    await testAskForMore(unpartitionedTopicClient, unpartitionedSubscriptionClient);
  });

  async function simulatenousReceiveBatch(
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

  it("Partitioned Queues: Throws error when call the second ReceiveBatch while the first one is not done", async function(): Promise<
    void
  > {
    await simulatenousReceiveBatch(partitionedQueueClient);
  });

  it("Partitioned Topics and Subscription: Throws error when call the second ReceiveBatch while the first one is not done", async function(): Promise<
    void
  > {
    await simulatenousReceiveBatch(partitionedSubscriptionClient);
  });

  it("Unpartitioned Queues: Throws error when call the second ReceiveBatch while the first one is not done", async function(): Promise<
    void
  > {
    await simulatenousReceiveBatch(unpartitionedQueueClient);
  });

  it("Unpartitioned Topics and Subscription: Throws error when call the second ReceiveBatch while the first one is not done", async function(): Promise<
    void
  > {
    await simulatenousReceiveBatch(unpartitionedSubscriptionClient);
  });
});
