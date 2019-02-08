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
  delay,
  ServiceBusMessage
} from "../lib";

import {
  testMessagesWithSessions,
  testMessagesWithDifferentSessionIds,
  getSenderClient,
  getReceiverClient,
  ClientType,
  testSessionId1,
  testSessionId2,
  purge
} from "./testUtils";

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

let ns: Namespace;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

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

  senderClient = await getSenderClient(ns, senderType);
  receiverClient = await getReceiverClient(ns, sessionType);

  await purge(receiverClient, testSessionId1);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("SessionTests - Accept a session by passing non-existing sessionId receives no messages", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function test_batching(): Promise<void> {
    await senderClient.getSender().send(testMessagesWithSessions[0]);

    let receiver = await receiverClient.getSessionReceiver({
      sessionId: "non" + testSessionId1
    });
    let msgs = await receiver.receiveBatch(1, 10);
    should.equal(msgs.length, 0);

    await receiver.close();
    receiver = await receiverClient.getSessionReceiver();
    msgs = await receiver.receiveBatch(1);
    should.equal(msgs.length, 1);
    should.equal(Array.isArray(msgs), true);
    should.equal(msgs[0].body, testMessagesWithSessions[0].body);
    should.equal(msgs[0].messageId, testMessagesWithSessions[0].messageId);
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Partitioned Subscription with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Queue with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Subscription with Sessions - Batch Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  async function test_streaming(): Promise<void> {
    await senderClient.getSender().send(testMessagesWithSessions[0]);

    let receiver = await receiverClient.getSessionReceiver({
      sessionId: "non" + testSessionId1
    });
    let receivedMsgs: ServiceBusMessage[] = [];
    receiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);
    await delay(2000);
    should.equal(receivedMsgs.length, 0);
    await receiver.close();

    receiver = await receiverClient.getSessionReceiver();
    receivedMsgs = [];
    receiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(msg.body, testMessagesWithSessions[0].body);
      should.equal(msg.messageId, testMessagesWithSessions[0].messageId);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(2000);
    should.equal(receivedMsgs.length, 1);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Partitioned Subscription with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Queue with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Subscription with Sessions - Streaming Receiver: no messages received", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });
});

describe("SessionTests - Accept a session without passing sessionId and receive messages from randomly selected sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete_batching(): Promise<void> {
    const sender = senderClient.getSender();
    await sender.send(testMessagesWithDifferentSessionIds[0]);
    await sender.send(testMessagesWithDifferentSessionIds[1]);

    let receiver = await receiverClient.getSessionReceiver();
    let msgs = await receiver.receiveBatch(2);

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
    await receiver.close();

    receiver = await receiverClient.getSessionReceiver();
    msgs = await receiver.receiveBatch(2);

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

  it("Partitioned Queue with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Partitioned Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Queue with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Subscription with Sessions - Batch Receiver: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });
});

describe("SessionTests - getState and setState in Session enabled Queues/Subscriptions", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testGetSetState(): Promise<void> {
    const sender = senderClient.getSender();
    await sender.send(testMessagesWithDifferentSessionIds[0]);

    let receiver = await receiverClient.getSessionReceiver();
    let msgs = await receiver.receiveBatch(2);
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

    let testState = await receiver.getState();
    should.equal(!!testState, false);
    await receiver.setState("new_state");
    testState = await receiver.getState();
    should.equal(testState, "new_state");

    await receiver.close();

    receiver = await receiverClient.getSessionReceiver();
    msgs = await receiver.receiveBatch(2);
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
    testState = await receiver.getState();
    should.equal(testState, "new_state");

    await receiver.setState(""); // clearing the session-state
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue with Sessions - Testing getState and setState", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Partitioned Subscription with Sessions - Testing getState and setState", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Unpartitioned Queue with Sessions - Testing getState and setState", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Unpartitioned Subscription with Sessions - Testing getState and setState", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
});

describe("SessionTests - Second Session Receiver for same session id", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testSecondSessionReceiverForSameSession(): Promise<void> {
    const sender = senderClient.getSender();
    await sender.send(testMessagesWithSessions[0]);

    const firstReceiver = await receiverClient.getSessionReceiver();
    should.equal(firstReceiver.sessionId, testMessagesWithSessions[0].sessionId);

    let errorWasThrown = false;
    try {
      const secondReceiver = await receiverClient.getSessionReceiver({
        sessionId: testMessagesWithSessions[0].sessionId
      });
      if (secondReceiver) {
        chai.assert.fail("Second receiver for same session id should not have been created");
      }
    } catch (error) {
      errorWasThrown =
        error &&
        error.message ===
          `Close the current session receiver for sessionId ${
            testMessagesWithSessions[0].sessionId
          } before using "getSessionReceiver" to create a new one for the same sessionId`;
    }

    should.equal(errorWasThrown, true);
  }

  it("Partitioned Queue - Second Session Receiver for same session id throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );

    await testSecondSessionReceiverForSameSession();
  });
  it("Partitioned Subscription - Second Session Receiver for same session id throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );

    await testSecondSessionReceiverForSameSession();
  });
  it("Unpartitioned Queue - Second Session Receiver for same session id throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );

    await testSecondSessionReceiverForSameSession();
  });
  it("Unpartitioned Subscription - Second Session Receiver for same session id throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );

    await testSecondSessionReceiverForSameSession();
  });
});
