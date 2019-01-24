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

let senderClient: QueueClient | TopicClient;
let sessionClient: QueueClient | SubscriptionClient;

let unexpectedError: Error | undefined;

function unExpectedErrorHandler(err: Error): void {
  if (err) {
    unexpectedError = err;
  }
}

async function beforeEachTest(senderType: ClientType, sessionType: ClientType): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  senderClient = getSenderClient(ns, senderType);
  sessionClient = getReceiverClient(ns, sessionType);
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Accept a session by passing non-existing sessionId receives no messages", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function test_batching(): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);

    let receiverClient = await sessionClient.acceptSession({ sessionId: "non" + testSessionId });
    let msgs = await receiverClient.receiveBatch(1, 10);
    should.equal(msgs.length, 0);

    await receiverClient.close();
    receiverClient = await sessionClient.acceptSession();
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
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Partitioned Topics and Subscription with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Queues with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Topics and Subscription with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  async function test_streaming(): Promise<void> {
    await senderClient.send(testMessagesWithSessions[0]);

    let receiverClient = await sessionClient.acceptSession({ sessionId: "non" + testSessionId });
    let receivedMsgs: ServiceBusMessage[] = [];
    receiverClient.receive((messageSession: MessageSession, msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);
    await delay(2000);
    should.equal(receivedMsgs.length, 0);
    await receiverClient.close();

    receiverClient = await sessionClient.acceptSession();
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
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Partitioned Topics and Subscription with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Queues with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Topics and Subscription with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });
});

describe("Accept a session without passing sessionId and receive messages from randomly selected sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete_batching(): Promise<void> {
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
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testComplete_batching();
  });

  it("Partitioned Topics and Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testComplete_batching();
  });

  it("Unpartitioned Queues with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testComplete_batching();
  });

  it("Unpartitioned Topics and Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testComplete_batching();
  });
});
