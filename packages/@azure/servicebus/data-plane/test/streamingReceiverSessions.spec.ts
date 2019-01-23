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
  MessageSession,
  ServiceBusMessage,
  TopicClient,
  SubscriptionClient,
  delay
} from "../lib";

import { DispositionType } from "../lib/serviceBusMessage";

import { testMessagesWithSessions, testSessionId } from "./testUtils";

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient | MessageSession,
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

// let partitionedQueueClient: QueueClient;
// let partitionedDeadletterQueueClient: QueueClient;

let partitionedQueueSessionClient: QueueClient;
let partitionedQueueMessageSession: MessageSession;
let partitionedDeadletterQueueSessionClient: QueueClient;

// let partitionedTopicClient: TopicClient;
// let partitionedSubscriptionClient: SubscriptionClient;
// let partitionedDeadletterSubscriptionClient: SubscriptionClient;

let partitionedTopicSessionClient: TopicClient;
let partitionedSubscriptionSessionClient: SubscriptionClient;
let partitionedSubscriptionMessageSession: MessageSession;
let partitionedDeadletterSubscriptionSessionClient: SubscriptionClient;
// let unpartitionedQueueClient: QueueClient;
// let unpartitionedDeadletterQueueClient: QueueClient;

let unpartitionedQueueSessionClient: QueueClient;
let unpartitionedQueueMessageSession: MessageSession;
let unpartitionedDeadletterQueueSessionClient: QueueClient;

// let unpartitionedTopicClient: TopicClient;
// let unpartitionedSubscriptionClient: SubscriptionClient;
// let unpartitionedDeadletterSubscriptionClient: SubscriptionClient;

let unpartitionedTopicSessionClient: TopicClient;
let unpartitionedSubscriptionSessionClient: SubscriptionClient;
let unpartitionedSubscriptionMessageSession: MessageSession;
let unpartitionedDeadletterSubscriptionSessionClient: SubscriptionClient;
let errorWasThrown: boolean;
let unexpectedError: Error | undefined;

function unExpectedErrorHandler(err: Error): void {
  if (err) {
    unexpectedError = err;
  }
}

async function beforeEachTest(): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  if (
    !process.env.TOPIC_NAME ||
    !process.env.TOPIC_NAME_NO_PARTITION ||
    !process.env.TOPIC_NAME_NO_PARTITION_SESSION ||
    !process.env.TOPIC_NAME_SESSION
  ) {
    throw new Error(
      "Define TOPIC_NAME, TOPIC_NAME_NO_PARTITION, TOPIC_NAME_SESSION & TOPIC_NAME_NO_PARTITION_SESSION in your environment before running integration tests."
    );
  }
  if (
    !process.env.QUEUE_NAME ||
    !process.env.QUEUE_NAME_NO_PARTITION ||
    !process.env.QUEUE_NAME_NO_PARTITION_SESSION ||
    !process.env.QUEUE_NAME_SESSION
  ) {
    throw new Error(
      "Define QUEUE_NAME, QUEUE_NAME_NO_PARTITION, QUEUE_NAME_SESSION & QUEUE_NAME_NO_PARTITION_SESSION in your environment before running integration tests."
    );
  }
  if (
    !process.env.SUBSCRIPTION_NAME ||
    !process.env.SUBSCRIPTION_NAME_NO_PARTITION ||
    !process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION ||
    !process.env.SUBSCRIPTION_NAME_SESSION
  ) {
    throw new Error(
      "Define SUBSCRIPTION_NAME, SUBSCRIPTION_NAME_NO_PARTITION, SUBSCRIPTION_NAME_SESSION & SUBSCRIPTION_NAME_NO_PARTITION_SESSION in your environment before running integration tests."
    );
  }

  namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  // Partitioned Queues and Subscriptions
  // partitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
  /*partitionedDeadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(partitionedQueueClient.name)
  );*/

  // partitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
  /*partitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME,
    process.env.SUBSCRIPTION_NAME
  );*/
  /*partitionedDeadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      partitionedTopicClient.name,
      partitionedSubscriptionClient.subscriptionName
    ),
    partitionedSubscriptionClient.subscriptionName
  );*/

  // Unpartitioned Queues and Subscriptions
  // unpartitionedQueueClient = namespace.createQueueClient(process.env.QUEUE_NAME_NO_PARTITION);
  /*unpartitionedDeadletterQueueClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(unpartitionedQueueClient.name)
  );*/
  // unpartitionedTopicClient = namespace.createTopicClient(process.env.TOPIC_NAME_NO_PARTITION);
  /*unpartitionedSubscriptionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION
  );*/
  /*unpartitionedDeadletterSubscriptionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      unpartitionedTopicClient.name,
      unpartitionedSubscriptionClient.subscriptionName
    ),
    unpartitionedSubscriptionClient.subscriptionName
  );*/

  // Partitioned Queues and Subscriptions with Sessions
  partitionedQueueSessionClient = namespace.createQueueClient(process.env.QUEUE_NAME_SESSION);
  partitionedQueueMessageSession = await partitionedQueueSessionClient.acceptSession({
    sessionId: testSessionId
  });
  partitionedDeadletterQueueSessionClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(partitionedQueueSessionClient.name)
  );
  partitionedTopicSessionClient = namespace.createTopicClient(process.env.TOPIC_NAME_SESSION);
  partitionedSubscriptionSessionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_SESSION,
    process.env.SUBSCRIPTION_NAME_SESSION
  );
  partitionedSubscriptionMessageSession = await partitionedSubscriptionSessionClient.acceptSession({
    sessionId: testSessionId
  });
  partitionedDeadletterSubscriptionSessionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      partitionedTopicSessionClient.name,
      partitionedSubscriptionSessionClient.subscriptionName
    ),
    partitionedSubscriptionSessionClient.subscriptionName
  );
  // Unpartitioned Queues and Subscriptions with Sessions
  unpartitionedQueueSessionClient = namespace.createQueueClient(
    process.env.QUEUE_NAME_NO_PARTITION_SESSION
  );
  unpartitionedQueueMessageSession = await unpartitionedQueueSessionClient.acceptSession({
    sessionId: testSessionId
  });
  unpartitionedDeadletterQueueSessionClient = namespace.createQueueClient(
    Namespace.getDeadLetterQueuePathForQueue(unpartitionedQueueSessionClient.name)
  );
  unpartitionedTopicSessionClient = namespace.createTopicClient(
    process.env.TOPIC_NAME_NO_PARTITION_SESSION
  );
  unpartitionedSubscriptionSessionClient = namespace.createSubscriptionClient(
    process.env.TOPIC_NAME_NO_PARTITION_SESSION,
    process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION
  );
  unpartitionedSubscriptionMessageSession = await unpartitionedSubscriptionSessionClient.acceptSession(
    {
      sessionId: testSessionId
    }
  );
  unpartitionedDeadletterSubscriptionSessionClient = namespace.createSubscriptionClient(
    Namespace.getDeadLetterSubcriptionPathForSubcription(
      unpartitionedTopicSessionClient.name,
      unpartitionedSubscriptionSessionClient.subscriptionName
    ),
    unpartitionedSubscriptionSessionClient.subscriptionName
  );

  /*const peekedPartitionedQueueMsg = await partitionedQueueClient.peek();
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
  }*/

  const peekedPartitionedQueueSessionMsg = await partitionedQueueSessionClient.peek();
  if (peekedPartitionedQueueSessionMsg.length) {
    throw new Error("Please use an empty partitioned queue with sessions for integration testing");
  }

  const peekedPartitionedSubscriptionSessionMsg = await partitionedSubscriptionSessionClient.peek();
  if (peekedPartitionedSubscriptionSessionMsg.length) {
    throw new Error(
      "Please use an empty partitioned Subscription with sessions for integration testing"
    );
  }

  const peekedUnPartitionedQueueSessionMsg = await unpartitionedQueueSessionClient.peek();
  if (peekedUnPartitionedQueueSessionMsg.length) {
    throw new Error(
      "Please use an empty unpartitioned queue with sessions for integration testing"
    );
  }

  const peekedUnPartitionedSubscriptionSessionMsg = await unpartitionedSubscriptionSessionClient.peek();
  if (peekedUnPartitionedSubscriptionSessionMsg.length) {
    throw new Error(
      "Please use an empty unpartitioned Subscription with sessions for integration testing"
    );
  }
  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await namespace.close();
}

describe("Streaming Receiver Misc Tests(with sessions)", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: MessageSession
  ): Promise<void> {
    await senderClient.sendBatch(testMessagesWithSessions);
    await testPeekMsgsLength(receiverClient, testMessagesWithSessions.length);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(
        testMessagesWithSessions.some((x) => msg.body === x.body && msg.messageId === x.messageId),
        true,
        "Received Message doesn't match any of the test messages"
      );
      return Promise.resolve();
    }, unExpectedErrorHandler);

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessagesWithSessions.length) {
        break;
      }
    }
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("AutoComplete removes the message from Partitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await testAutoComplete(partitionedQueueSessionClient, partitionedQueueMessageSession);
  });

  it("AutoComplete removes the message from Partitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await testAutoComplete(partitionedTopicSessionClient, partitionedSubscriptionMessageSession);
  });

  it("AutoComplete removes the message from UnPartitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await testAutoComplete(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession);
  });

  it("AutoComplete removes the message from UnPartitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await testAutoComplete(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession
    );
  });

  async function testManualComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: MessageSession
  ): Promise<void> {
    await senderClient.sendBatch(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive(
      (messageSession: MessageSession, msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessagesWithSessions.some(
            (x) => msg.body === x.body && msg.messageId === x.messageId
          ),
          true,
          "Received Message doesnt match any of the test messages"
        );
        return Promise.resolve();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessagesWithSessions.length) {
        break;
      }
    }

    await testPeekMsgsLength(receiverClient, 2);

    await receivedMsgs[0].complete();
    await receivedMsgs[1].complete();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
  }

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await testManualComplete(partitionedQueueSessionClient, partitionedQueueMessageSession);
  });

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await testManualComplete(partitionedTopicSessionClient, partitionedSubscriptionMessageSession);
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await testManualComplete(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession);
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await testManualComplete(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession
    );
  });
});

describe("Complete message(with sessions)", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(
    senderClient: QueueClient | TopicClient,
    receiverClient: MessageSession,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.sendBatch(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive(
      (messageSession: MessageSession, msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessagesWithSessions.some(
            (x) => msg.body === x.body && msg.messageId === x.messageId
          ),
          true,
          "Received Message doesnt match any of the test messages"
        );
        return msg.complete();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessagesWithSessions.length) {
        break;
      }
    }

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queues: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(partitionedQueueSessionClient, partitionedQueueMessageSession, false);
  });

  it("Partitioned Topics and Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, false);
  });

  it("UnPartitioned Queue: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, false);
  });

  it("UnPartitioned Topics and Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      false
    );
  });

  it("Partitioned Queues with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("UnPartitioned Topics and Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await testComplete(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Abandon message(with sessions)", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });


  async function testAbandon(
    senderClient: QueueClient | TopicClient,
    receiverClient: MessageSession,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);
    await receiverClient.receive(
      (messageSession: MessageSession, msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          return receiverClient.close();
        });
      },
      unExpectedErrorHandler,
      { maxAutoRenewDurationInSeconds: 0, autoComplete }
    );
    await delay(4000);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    const receivedMsgs = await receiverClient.receiveBatch(1);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].messageId, testMessagesWithSessions[0].messageId);
    // should.equal(receivedMsgs[0].deliveryCount, 1);
    await receivedMsgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queues: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueSessionClient, partitionedQueueMessageSession, false);
  });

  it("Partitioned Topics and Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, false);
  });

  it("UnPartitioned Queue: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, false);
  });

  it("UnPartitioned Topics and Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      false
    );
  });

  it("Partitioned Queues with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, true);
  });

  it("UnPartitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  });

  it("UnPartitioned Topics and Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await testAbandon(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      true
    );
  });
});

describe("Defer message(with sessions)", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(
    senderClient: QueueClient | TopicClient,
    receiverClient: MessageSession,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.sendBatch(testMessagesWithSessions);

    let seq0: any = 0;
    let seq1: any = 0;
    await receiverClient.receive(
      (messageSession: MessageSession, msg: ServiceBusMessage) => {
        if (msg.messageId === testMessagesWithSessions[0].messageId) {
          seq0 = msg.sequenceNumber;
        } else if (msg.messageId === testMessagesWithSessions[1].messageId) {
          seq1 = msg.sequenceNumber;
        }
        return msg.defer();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    await delay(4000);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    const deferredMsg0 = await receiverClient.receiveDeferredMessage(seq0);
    const deferredMsg1 = await receiverClient.receiveDeferredMessage(seq1);
    if (!deferredMsg0) {
      throw "No message received for sequence number";
    }
    if (!deferredMsg1) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsg0.body, testMessagesWithSessions[0].body);
    should.equal(deferredMsg0.messageId, testMessagesWithSessions[0].messageId);
    should.equal(deferredMsg0.deliveryCount, 1);

    should.equal(deferredMsg1.body, testMessagesWithSessions[1].body);
    should.equal(deferredMsg1.messageId, testMessagesWithSessions[1].messageId);
    should.equal(deferredMsg1.deliveryCount, 1);

    await deferredMsg0.complete();
    await deferredMsg1.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queues: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueSessionClient, partitionedQueueMessageSession, false);
  });

  it("Partitioned Topics and Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, false);
  });

  // it("UnPartitioned Queue: defer() moves message to deferred queue(with sessions)", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, false);
  // });

  // it("UnPartitioned Topics and Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicSessionClient, unpartitionedSubscriptionMessageSession, false);
  // });

  it("Partitioned Queues with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await testDefer(partitionedQueueSessionClient, partitionedQueueMessageSession, true);
  });

  it("Partitioned Topics and Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await testDefer(partitionedTopicSessionClient, partitionedSubscriptionMessageSession, true);
  });

  // it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedQueueSessionClient, unpartitionedQueueMessageSession, true);
  // });

  // it("UnPartitioned Topics and Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
  //   void
  // > {
  //   await testDefer(unpartitionedTopicSessionClient, unpartitionedSubscriptionMessageSession, true);
  // });
});

describe("Deadletter message(with sessions)", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(
    senderClient: QueueClient | TopicClient,
    receiverClient: MessageSession,
    deadletterClient: QueueClient | SubscriptionClient,
    autoComplete: boolean
  ): Promise<void> {
    await senderClient.sendBatch(testMessagesWithSessions);
    await testPeekMsgsLength(receiverClient, 2);
    await receiverClient.receive(
      (messageSession: MessageSession, msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    await delay(4000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadletterClient.receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, testMessagesWithSessions.length);
    should.equal(
      testMessagesWithSessions.some((x) => deadLetterMsgs[0].messageId === x.messageId),
      true
    );
    should.equal(
      testMessagesWithSessions.some((x) => deadLetterMsgs[1].messageId === x.messageId),
      true
    );

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

    await testPeekMsgsLength(deadletterClient, 0);
  }

  it("Partitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      partitionedDeadletterQueueSessionClient,
      false
    );
  });

  it("Partitioned Topics and Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      partitionedDeadletterSubscriptionSessionClient,
      false
    );
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      unpartitionedDeadletterQueueSessionClient,
      false
    );
  });

  it("UnPartitioned Topics and Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      unpartitionedDeadletterSubscriptionSessionClient,
      false
    );
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      partitionedDeadletterQueueSessionClient,
      true
    );
  });

  it("Partitioned Topics and Subscription with autoComplete: deadLetter() moves message to deadletter(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      partitionedDeadletterSubscriptionSessionClient,
      true
    );
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      unpartitionedDeadletterQueueSessionClient,
      true
    );
  });

  it("UnPartitioned Topics and Subscription with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await testDeadletter(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      unpartitionedDeadletterSubscriptionSessionClient,
      true
    );
  });
});

describe("Multiple Streaming Receivers(with sessions)", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(receiverClient: MessageSession): Promise<void> {
    await receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      return msg.complete();
    }, unExpectedErrorHandler);
    await delay(5000);
    try {
      await receiverClient.receive(
        (messageSession: MessageSession, msg: ServiceBusMessage) => {
          return Promise.resolve();
        },
        (err: Error) => {
          should.exist(err);
        }
      );
    } catch (err) {
      errorWasThrown = true;
      should.equal(!err.message.search("has already been created for the Subscription"), false);
    }
    should.equal(errorWasThrown, true);
  }

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(partitionedQueueMessageSession);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(partitionedSubscriptionMessageSession);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(unpartitionedQueueMessageSession);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await testMultipleReceiveCalls(unpartitionedSubscriptionMessageSession);
  });
});

describe("Settle an already Settled message throws error(with sessions)", () => {
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
    receiverClient: MessageSession,
    operation: DispositionType
  ): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);
    const receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(5000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessagesWithSessions[0].body);
    should.equal(receivedMsgs[0].messageId, testMessagesWithSessions[0].messageId);

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
  }

  it("Partitioned Queues: complete() throws error(with sessions)", async function(): Promise<void> {
    await testSettlement(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      DispositionType.complete
    );
  });

  it("Partitioned Topics and Subscription: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      DispositionType.complete
    );
  });

  it("UnPartitioned Queue: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      DispositionType.complete
    );
  });

  it("UnPartitioned Topics and Subscription: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      DispositionType.complete
    );
  });

  it("Partitioned Queues: abandon() throws error(with sessions)", async function(): Promise<void> {
    await testSettlement(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      DispositionType.abandon
    );
  });

  it("Partitioned Topics and Subscription: abandon() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      DispositionType.abandon
    );
  });

  it("UnPartitioned Queue: abandon() throws error(with sessions)", async function(): Promise<void> {
    await testSettlement(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      DispositionType.abandon
    );
  });

  it("UnPartitioned Topics and Subscription: abandon() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      DispositionType.abandon
    );
  });

  it("Partitioned Queues: defer() throws error(with sessions)", async function(): Promise<void> {
    await testSettlement(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      DispositionType.defer
    );
  });

  it("Partitioned Topics and Subscription: defer() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      DispositionType.defer
    );
  });

  it("UnPartitioned Queue: defer() throws error(with sessions)", async function(): Promise<void> {
    await testSettlement(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      DispositionType.defer
    );
  });

  it("UnPartitioned Topics and Subscription: defer() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      DispositionType.defer
    );
  });

  it("Partitioned Queues: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedQueueSessionClient,
      partitionedQueueMessageSession,
      DispositionType.deadletter
    );
  });

  it("Partitioned Topics and Subscription: deadLetter()(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      partitionedTopicSessionClient,
      partitionedSubscriptionMessageSession,
      DispositionType.deadletter
    );
  });

  it("UnPartitioned Queue: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedQueueSessionClient,
      unpartitionedQueueMessageSession,
      DispositionType.deadletter
    );
  });

  it("UnPartitioned Topics and Subscription: deadLetter()(with sessions)", async function(): Promise<
    void
  > {
    await testSettlement(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionMessageSession,
      DispositionType.deadletter
    );
  });
});
