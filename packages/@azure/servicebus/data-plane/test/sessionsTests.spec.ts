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
  MessageSession,
  delay,
  ServiceBusMessage
} from "../lib";

import {
  testMessagesWithSessions,
  testMessagesWithDifferentSessionIds,
  getSenderClient,
  getReceiverClient,
  ClientType,
  testSessionId
} from "./testUtils";

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

let ns: Namespace;

let partitionedQueueSessionClient: QueueClient;

let partitionedTopicSessionClient: TopicClient;
let partitionedSubscriptionSessionClient: SubscriptionClient;

let unpartitionedQueueSessionClient: QueueClient;

let unpartitionedTopicSessionClient: TopicClient;
let unpartitionedSubscriptionSessionClient: SubscriptionClient;
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

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  // Partitioned Queues and Subscriptions with Sessions
  partitionedQueueSessionClient = getSenderClient(
    ns,
    ClientType.PartitionedQueueWithSessions
  ) as QueueClient;

  partitionedTopicSessionClient = getSenderClient(
    ns,
    ClientType.PartitionedTopicWithSessions
  ) as TopicClient;
  partitionedSubscriptionSessionClient = getReceiverClient(
    ns,
    ClientType.PartitionedSubscriptionWithSessions
  ) as SubscriptionClient;
  // Unpartitioned Queues and Subscriptions with Sessions
  unpartitionedQueueSessionClient = getSenderClient(
    ns,
    ClientType.UnpartitionedQueueWithSessions
  ) as QueueClient;
  unpartitionedTopicSessionClient = getSenderClient(
    ns,
    ClientType.UnpartitionedTopicWithSessions
  ) as TopicClient;
  unpartitionedSubscriptionSessionClient = getReceiverClient(
    ns,
    ClientType.UnpartitionedSubscriptionWithSessions
  ) as SubscriptionClient;

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
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}
describe("Accept a session without passing sessionId and receive messages - Queue/Subscription has messages belonging to same sessionId", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete_batching(
    senderClient: QueueClient | TopicClient,
    sessionClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);

    const receiverClient = await sessionClient.acceptSession();
    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessagesWithSessions[0].body);
    should.equal(msgs[0].messageId, testMessagesWithSessions[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(partitionedQueueSessionClient, partitionedQueueSessionClient);
  });

  it("Partitioned Topics and Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(
      partitionedTopicSessionClient,
      partitionedSubscriptionSessionClient
    );
  });

  it("Unpartitioned Queues with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(unpartitionedQueueSessionClient, unpartitionedQueueSessionClient);
  });

  it("Unpartitioned Topics and Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionSessionClient
    );
  });

  async function testComplete_streaming(
    senderClient: QueueClient | TopicClient,
    sessionClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);

    const receiverClient = await sessionClient.acceptSession();
    const receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(msg.body, testMessagesWithSessions[0].body);
      should.equal(msg.messageId, testMessagesWithSessions[0].messageId);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(2000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(partitionedQueueSessionClient, partitionedQueueSessionClient);
  });

  it("Partitioned Topics and Subscription with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(
      partitionedTopicSessionClient,
      partitionedSubscriptionSessionClient
    );
  });

  it("Unpartitioned Queues with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(unpartitionedQueueSessionClient, unpartitionedQueueSessionClient);
  });

  it("Unpartitioned Topics and Subscription with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionSessionClient
    );
  });
});

describe("Accept a session by passing non-existing sessionId receives no messages", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function test_batching(
    senderClient: QueueClient | TopicClient,
    sessionClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);

    let receiverClient = await sessionClient.acceptSession({ sessionId: "non" + testSessionId });
    let msgs = await receiverClient.receiveBatch(1, 10);
    should.equal(msgs.length, 0);

    await receiverClient.close();
    receiverClient = await sessionClient.acceptSession({ sessionId: testSessionId });
    await testPeekMsgsLength(receiverClient, 1);
    msgs = await receiverClient.receiveBatch(1);
    should.equal(Array.isArray(msgs), true);
    should.equal(msgs[0].body, testMessagesWithSessions[0].body);
    should.equal(msgs[0].messageId, testMessagesWithSessions[0].messageId);
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_batching(partitionedQueueSessionClient, partitionedQueueSessionClient);
  });

  it("Partitioned Topics and Subscription with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_batching(partitionedTopicSessionClient, partitionedSubscriptionSessionClient);
  });

  it("Unpartitioned Queues with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_batching(unpartitionedQueueSessionClient, unpartitionedQueueSessionClient);
  });

  it("Unpartitioned Topics and Subscription with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_batching(unpartitionedTopicSessionClient, unpartitionedSubscriptionSessionClient);
  });

  async function test_streaming(
    senderClient: QueueClient | TopicClient,
    sessionClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);

    let receiverClient = await sessionClient.acceptSession({ sessionId: "non" + testSessionId });
    let receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);
    should.equal(receivedMsgs.length, 0);
    await receiverClient.close();

    receiverClient = await sessionClient.acceptSession({ sessionId: testSessionId });
    await testPeekMsgsLength(receiverClient, 1);
    receivedMsgs = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(msg.body, testMessagesWithSessions[0].body);
      should.equal(msg.messageId, testMessagesWithSessions[0].messageId);
      return Promise.resolve();
    }, unExpectedErrorHandler);
    await delay(2000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_streaming(partitionedQueueSessionClient, partitionedQueueSessionClient);
  });

  it("Partitioned Topics and Subscription with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_streaming(partitionedTopicSessionClient, partitionedSubscriptionSessionClient);
  });

  it("Unpartitioned Queues with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_streaming(unpartitionedQueueSessionClient, unpartitionedQueueSessionClient);
  });

  it("Unpartitioned Topics and Subscription with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await test_streaming(unpartitionedTopicSessionClient, unpartitionedSubscriptionSessionClient);
  });
});

describe("Accept a session without passing sessionId and receive messages from randomly selected sessionId", function(): void {
  beforeEach(async () => {
    await beforeEachTest();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete_batching(
    senderClient: QueueClient | TopicClient,
    sessionClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessagesWithDifferentSessionIds[0]);
    await senderClient.send(testMessagesWithDifferentSessionIds[1]);
    await delay(4000);

    let receiverClient = await sessionClient.acceptSession();
    let msgs = await receiverClient.receiveBatch(2);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);

    should.equal(
      testMessagesWithDifferentSessionIds.some(
        (x) =>
          msgs[0].body === x.body &&
          msgs[0].messageId === x.messageId &&
          msgs[0].sessionId === x.sessionId
      ),
      true,
      "Received Message doesnt match any of the test messages"
    );
    await msgs[0].complete();
    await receiverClient.close();

    receiverClient = await sessionClient.acceptSession();
    await testPeekMsgsLength(receiverClient, 1);
    msgs = await receiverClient.receiveBatch(2);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(
      testMessagesWithDifferentSessionIds.some(
        (x) =>
          msgs[0].body === x.body &&
          msgs[0].messageId === x.messageId &&
          msgs[0].sessionId === x.sessionId
      ),
      true,
      "Received Message doesnt match any of the test messages"
    );
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(partitionedQueueSessionClient, partitionedQueueSessionClient);
  });

  it("Partitioned Topics and Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(
      partitionedTopicSessionClient,
      partitionedSubscriptionSessionClient
    );
  });

  it("Unpartitioned Queues with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(unpartitionedQueueSessionClient, unpartitionedQueueSessionClient);
  });

  it("Unpartitioned Topics and Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_batching(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionSessionClient
    );
  });

  async function testComplete_streaming(
    senderClient: QueueClient | TopicClient,
    sessionClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessagesWithDifferentSessionIds[0]);
    await senderClient.send(testMessagesWithDifferentSessionIds[1]);
    await delay(4000);

    let receiverClient = await sessionClient.acceptSession();
    let receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(
        testMessagesWithDifferentSessionIds.some(
          (x) =>
            msg.body === x.body && msg.messageId === x.messageId && msg.sessionId === x.sessionId
        ),
        true,
        "Received Message doesnt match any of the test messages"
      );
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(4000);

    await receiverClient.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    receiverClient = await sessionClient.acceptSession();
    receivedMsgs = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(
        testMessagesWithDifferentSessionIds.some(
          (x) =>
            msg.body === x.body && msg.messageId === x.messageId && msg.sessionId === x.sessionId
        ),
        true,
        "Received Message doesnt match any of the test messages"
      );
      return Promise.resolve();
    }, unExpectedErrorHandler);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await delay(4000);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(partitionedQueueSessionClient, partitionedQueueSessionClient);
  });

  it("Partitioned Topics and Subscription with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(
      partitionedTopicSessionClient,
      partitionedSubscriptionSessionClient
    );
  });

  it("Unpartitioned Queues with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(unpartitionedQueueSessionClient, unpartitionedQueueSessionClient);
  });

  it("Unpartitioned Topics and Subscription with Sessions - Streaming Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await testComplete_streaming(
      unpartitionedTopicSessionClient,
      unpartitionedSubscriptionSessionClient
    );
  });
});
