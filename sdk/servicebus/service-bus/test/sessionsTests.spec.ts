// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {
  ServiceBusClient,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  delay,
  ServiceBusMessage,
  SendableMessageInfo,
  ReceiveMode,
  SessionReceiver
} from "../src";

import {
  TestMessage,
  getSenderReceiverClients,
  TestClientType,
  purge,
  checkWithTimeout,
  getServiceBusClient
} from "./utils/testUtils";

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

let sbClient: ServiceBusClient;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

let unexpectedError: Error | undefined;

function unExpectedErrorHandler(err: Error): void {
  if (err) {
    unexpectedError = err;
  }
}

const testSessionId2 = "my-session2";

async function beforeEachTest(
  senderType: TestClientType,
  sessionType: TestClientType
): Promise<void> {
  sbClient = getServiceBusClient();
  const clients = await getSenderReceiverClients(sbClient, senderType, sessionType);
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
  await sbClient.close();
}

describe("SessionReceiver with invalid sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function test_batching(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.createSender().send(testMessage);

    let receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: "non" + TestMessage.sessionId
    });
    let msgs = await receiver.receiveMessages(1, 10);
    should.equal(msgs.length, 0, "Unexpected number of messages received");

    await receiver.close();
    receiver = receiverClient.createReceiver(ReceiveMode.peekLock, { sessionId: undefined });
    msgs = await receiver.receiveMessages(1);
    should.equal(msgs.length, 1, "Unexpected number of messages received");
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Partitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await test_batching();
  });

  it("Unpartitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await test_batching();
  });

  async function test_streaming(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.createSender().send(testMessage);

    let receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: "non" + TestMessage.sessionId
    });
    let receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);
    await delay(2000);
    should.equal(receivedMsgs.length, 0, `Expected 0, received ${receivedMsgs.length} messages`);
    await receiver.close();

    receiver = receiverClient.createReceiver(ReceiveMode.peekLock, { sessionId: undefined });
    receivedMsgs = [];
    receiver.registerMessageHandler(
      async (msg: ServiceBusMessage) => {
        should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
        should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");
        await msg.complete();
        receivedMsgs.push(msg);
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Partitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Queue - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await test_streaming();
  });

  it("Unpartitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
    const sender = senderClient.createSender();
    await sender.send(testMessagesWithDifferentSessionIds[0]);
    await sender.send(testMessagesWithDifferentSessionIds[1]);

    let receiver = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: undefined
    });
    let msgs = await receiver.receiveMessages(2);

    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(receiver.sessionId, msgs[0].sessionId, "Unexpected sessionId in receiver");
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

    receiver = <SessionReceiver>(
      receiverClient.createReceiver(ReceiveMode.peekLock, { sessionId: undefined })
    );
    msgs = await receiver.receiveMessages(2);

    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(receiver.sessionId, msgs[0].sessionId, "Unexpected sessionId in receiver");
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Queue: complete() removes message from random session #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });
});

describe("SessionReceiver with empty string as sessionId", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  // Sending messages with different session id, so that we know for sure we pick the right one
  // and that Service Bus is not choosing a random one for us
  const testMessagesWithDifferentSessionIds: SendableMessageInfo[] = [
    {
      body: "hello1",
      messageId: `test message ${Math.random()}`,
      sessionId: TestMessage.sessionId
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      sessionId: ""
    }
  ];

  async function testComplete_batching(): Promise<void> {
    const sender = senderClient.createSender();
    await sender.send(testMessagesWithDifferentSessionIds[0]);
    await sender.send(testMessagesWithDifferentSessionIds[1]);

    const receiver = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: ""
    });
    const msgs = await receiver.receiveMessages(2);

    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(receiver.sessionId, "", "Unexpected sessionId in receiver");
    should.equal(
      testMessagesWithDifferentSessionIds[1].body === msgs[0].body &&
        testMessagesWithDifferentSessionIds[1].messageId === msgs[0].messageId &&
        testMessagesWithDifferentSessionIds[1].sessionId === msgs[0].sessionId,
      true,
      "Received Message doesnt match expected test message"
    );
    await msgs[0].complete();

    const peekedMsgsInSession = await receiver.peek();
    should.equal(peekedMsgsInSession.length, 0, "Unexpected number of messages peeked");

    await receiver.close();
  }

  it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testComplete_batching();
  });

  it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
    const sender = senderClient.createSender();
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    let receiver = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: undefined
    });
    let msgs = await receiver.receiveMessages(2);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    let testState = await receiver.getState();
    should.equal(!!testState, false, "SessionState is different than expected");
    await receiver.setState("new_state");
    testState = await receiver.getState();
    should.equal(testState, "new_state", "SessionState is different than expected");

    await receiver.close();

    receiver = <SessionReceiver>(
      receiverClient.createReceiver(ReceiveMode.peekLock, { sessionId: undefined })
    );
    msgs = await receiver.receiveMessages(2);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages received");
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Partitioned Subscription - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Unpartitioned Queue - Testing getState and setState #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
  it("Unpartitioned Subscription - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await purge(receiverClient, testSessionId2);
    await testGetSetState();
  });
});

describe("Peek session", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function peekSession(useSessionId: boolean): Promise<void> {
    const sender = senderClient.createSender();
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    const receiver = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: useSessionId ? testMessage.sessionId : undefined
    });

    // At this point AMQP receiver link has not been established.
    // peek() will not establish the link if sessionId was provided
    const peekedMsgs = await receiver.peek(1);
    should.equal(peekedMsgs.length, 1, "Unexpected number of messages peeked");
    should.equal(peekedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      peekedMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(
      peekedMsgs[0].sessionId,
      testMessage.sessionId,
      "SessionId is different than expected"
    );

    const msgs = await receiver.receiveMessages(1);
    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    await msgs[0].complete();
  }

  it("Partitioned Queue - Peek Session with sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await peekSession(true);
  });
  it("Partitioned Subscription - Peek Session with sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await peekSession(true);
  });
  it("Unpartitioned Queue - Peek Session with sessionId #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await peekSession(true);
  });
  it("Unpartitioned Subscription - Peek Session with sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await peekSession(true);
  });

  it("Partitioned Queue - Peek Session without sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await peekSession(false);
  });
  it("Partitioned Subscription - Peek Session without sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await peekSession(false);
  });
  it("Unpartitioned Queue - Peek Session without sessionId #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await peekSession(false);
  });
  it("Unpartitioned Subscription - Peek Session without sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await peekSession(false);
  });
});

/**
 * SessionReceiver intentionally does not recover after a disconnect:
 * https://github.com/Azure/azure-sdk-for-js/pull/8447#issuecomment-618510245
 * If support for this is added in the future, we can stop skipping this test.
 */
describe.skip("SessionReceiver - disconnects", function(): void {
  afterEach(async () => {
    return afterEachTest();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    // Create the sender and receiver.
    sbClient = getServiceBusClient();
    const { receiverClient, senderClient } = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    const receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: testMessage.sessionId,
      maxSessionAutoRenewLockDurationInSeconds: 10 // Lower this value so that test can complete in time.
    }) as SessionReceiver;
    const sender = senderClient.createSender();
    // Send a message so we can be sure when the receiver is open and active.
    await sender.send(testMessage);
    const receivedErrors: any[] = [];
    let settledMessageCount = 0;

    let messageHandlerCount = 0;
    let receiverIsActiveResolver: Function;
    let receiverSecondMessageResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    const receiverSecondMessage = new Promise((resolve) => {
      receiverSecondMessageResolver = resolve;
    });

    // Start the receiver.
    receiver.registerMessageHandler(
      async (message) => {
        console.log(`Received a message`);
        messageHandlerCount++;
        try {
          await message.complete();
          settledMessageCount++;
        } catch (err) {
          receivedErrors.push(err);
        }
        if (messageHandlerCount === 1) {
          // Since we've received a message, mark the receiver as active.
          receiverIsActiveResolver();
        } else {
          // Mark the second message resolver!
          receiverSecondMessageResolver();
        }
      },
      (err) => {
        console.log(`Got an error`);
        console.error(err);
        receivedErrors.push(err);
      }
    );

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    settledMessageCount.should.equal(1, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");

    const connectionContext = receiver["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    receiver["_context"].namespace.connection["_connection"].idle();

    // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
    // Otherwise, it will get into a bad internal state with uncaught exceptions.
    await delay(2000);
    // send a second message to trigger the message handler again.
    await sender.send(TestMessage.getSessionSample());
    console.log("Waiting for 2nd message");
    // wait for the 2nd message to be received.
    await receiverSecondMessage;
    settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");
    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});
