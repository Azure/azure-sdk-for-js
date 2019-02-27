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
  ServiceBusMessage,
  SendableMessageInfo
} from "../lib";

import {
  TestMessage,
  getSenderReceiverClients,
  ClientType,
  purge,
  checkWithTimeout
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

const testSessionId2 = "my-session2";

async function beforeEachTest(senderType: ClientType, sessionType: ClientType): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, senderType, sessionType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  await purge(receiverClient, TestMessage.sessionId);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("SessionReceiver with invalid sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function test_batching(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.getSender().send(testMessage);

    let receiver = await receiverClient.getSessionReceiver({
      sessionId: "non" + TestMessage.sessionId
    });
    let msgs = await receiver.receiveBatch(1, 10);
    should.equal(msgs.length, 0, "Unexpected number of messages");

    await receiver.close();
    receiver = await receiverClient.getSessionReceiver();
    msgs = await receiver.receiveBatch(1);
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Partitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  async function test_streaming(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.getSender().send(testMessage);

    let receiver = await receiverClient.getSessionReceiver({
      sessionId: "non" + TestMessage.sessionId
    });
    let receivedMsgs: ServiceBusMessage[] = [];
    receiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);
    await delay(2000);
    should.equal(receivedMsgs.length, 0, `Expected 0, received ${receivedMsgs.length} messages`);
    await receiver.close();

    receiver = await receiverClient.getSessionReceiver();
    receivedMsgs = [];
    receiver.receive(
      (msg: ServiceBusMessage) => {
        should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
        should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");
        return msg.complete().then(() => {
          receivedMsgs.push(msg);
        });
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Partitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Queue - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });
});

describe("SessionReceiver with no sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  const testMessagesWithDifferentSessionIds: SendableMessageInfo[] = [
    {
      body: "hello1",
      messageId: `test message ${Math.random()}`,
      sessionId: TestMessage.sessionId
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      sessionId: testSessionId2
    }
  ];

  async function testComplete_batching(): Promise<void> {
    const sender = senderClient.getSender();
    await sender.send(testMessagesWithDifferentSessionIds[0]);
    await sender.send(testMessagesWithDifferentSessionIds[1]);

    let receiver = await receiverClient.getSessionReceiver();
    let msgs = await receiver.receiveBatch(2);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");

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

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
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

  it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
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

describe("Session State", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testGetSetState(): Promise<void> {
    const sender = senderClient.getSender();
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    let receiver = await receiverClient.getSessionReceiver();
    let msgs = await receiver.receiveBatch(2);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    let testState = await receiver.getState();
    should.equal(!!testState, false, "SessionState is different than expected");
    await receiver.setState("new_state");
    testState = await receiver.getState();
    should.equal(testState, "new_state", "SessionState is different than expected");

    await receiver.close();

    receiver = await receiverClient.getSessionReceiver();
    msgs = await receiver.receiveBatch(2);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    testState = await receiver.getState();
    should.equal(testState, "new_state", "SessionState is different than expected");

    await receiver.setState(""); // clearing the session-state
    await msgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Partitioned Subscription - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Unpartitioned Queue - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Unpartitioned Subscription - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
});

describe("Second SessionReceiver for same sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testSecondSessionReceiverForSameSession(): Promise<void> {
    const sender = senderClient.getSender();
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    const firstReceiver = await receiverClient.getSessionReceiver();
    should.equal(
      firstReceiver.sessionId,
      testMessage.sessionId,
      "MessageId is different than expected"
    );

    let errorWasThrown = false;
    try {
      const secondReceiver = await receiverClient.getSessionReceiver({
        sessionId: testMessage.sessionId
      });
      if (secondReceiver) {
        chai.assert.fail("Second receiver for same session id should not have been created");
      }
    } catch (error) {
      errorWasThrown =
        error &&
        error.message ===
          `Close the current session receiver for sessionId ${
            testMessage.sessionId
          } before using "getSessionReceiver" to create a new one for the same sessionId`;
    }

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
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
