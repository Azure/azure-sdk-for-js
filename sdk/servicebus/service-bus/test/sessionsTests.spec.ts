// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {
  delay,
  SendableMessageInfo,
  SessionReceiver,
  ReceivedMessage,
  ContextWithSettlement
} from "../src";

import {
  TestMessage,
  getSenderReceiverClients,
  TestClientType,
  purge,
  checkWithTimeout,
  purgeEntity
} from "./utils/testUtils";
import { ReceiverClientTypeForUser } from "../src/serviceBusReceiverClient";
import { Sender } from "../src/sender";

async function testPeekMsgsLength(
  client: ReceiverClientTypeForUser,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.diagnostics.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let senderClient: Sender;
let receiverClient: SessionReceiver<"peekLock">;

let unexpectedError: Error | undefined;

async function processError(err: Error): Promise<void> {
  if (err) {
    unexpectedError = err;
  }
}

const testSessionId2 = "my-session2";

async function beforeEachTest(
  testClientType: TestClientType,
  sessionId: string | undefined
): Promise<void> {
  const clients = await getSenderReceiverClients(testClientType, "peekLock", undefined, {
    id: sessionId
  });
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient as SessionReceiver<"peekLock">;

  await purge(receiverClient);
  const peekedMsgs = await receiverClient.diagnostics.peek();
  const receiverEntityType = receiverClient.entityType;
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {}

describe("SessionReceiver with invalid sessionId", function(): void {
  let sessionId: string;
  beforeEach(() => {
    sessionId = "non" + TestMessage.sessionId;
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function test_batching(testClientType: TestClientType): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.send(testMessage);

    let batch = await receiverClient.receiveBatch(1, 10);
    let msgs = batch.messages;
    should.equal(msgs.length, 0, "Unexpected number of messages received");

    await receiverClient.close();
    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;

    batch = await receiverClient.receiveBatch(1);
    msgs = batch.messages;
    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    await batch.context.complete(msgs[0]);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions, sessionId);
    await test_batching(TestClientType.PartitionedQueueWithSessions);
  });

  it("Partitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions, sessionId);
    await test_batching(TestClientType.PartitionedSubscriptionWithSessions);
  });

  it("Unpartitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, sessionId);
    await test_batching(TestClientType.UnpartitionedQueueWithSessions);
  });

  it("Unpartitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, sessionId);
    await test_batching(TestClientType.UnpartitionedSubscriptionWithSessions);
  });

  async function test_streaming(testClientType: TestClientType): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.send(testMessage);

    let receivedMsgs: ReceivedMessage[] = [];
    receiverClient.subscribe({
      async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      processError
    });
    await delay(2000);
    should.equal(receivedMsgs.length, 0, `Expected 0, received ${receivedMsgs.length} messages`);
    await receiverClient.close();

    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;
    receivedMsgs = [];
    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
          should.equal(
            msg.messageId,
            testMessage.messageId,
            "MessageId is different than expected"
          );
          await context.complete(msg);
          receivedMsgs.push(msg);
        },
        processError
      },
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
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions, sessionId);
    await test_streaming(TestClientType.PartitionedQueueWithSessions);
  });

  it("Partitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions, sessionId);
    await test_streaming(TestClientType.PartitionedSubscriptionWithSessions);
  });

  it("Unpartitioned Queue - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, sessionId);
    await test_streaming(TestClientType.UnpartitionedQueueWithSessions);
  });

  it("Unpartitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, sessionId);
    await test_streaming(TestClientType.UnpartitionedSubscriptionWithSessions);
  });
});

describe("SessionReceiver with no sessionId", function(): void {
  let sessionId: string | undefined;
  beforeEach(() => {
    sessionId = undefined;
  });
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

  async function testComplete_batching(testClientType: TestClientType): Promise<void> {
    await senderClient.send(testMessagesWithDifferentSessionIds[0]);
    await senderClient.send(testMessagesWithDifferentSessionIds[1]);

    let batch = await receiverClient.receiveBatch(2);
    let msgs = batch.messages;

    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(receiverClient.sessionId, msgs[0].sessionId, "Unexpected sessionId in receiver");
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
    await batch.context.complete(msgs[0]);
    await receiverClient.close();

    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;

    batch = await receiverClient.receiveBatch(2);
    msgs = batch.messages;

    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(receiverClient.sessionId, msgs[0].sessionId, "Unexpected sessionId in receiver");
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
    await batch.context.complete(msgs[0]);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions, sessionId);
    await purge(receiverClient);
    await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
  });

  it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions, sessionId);
    await purge(receiverClient);
    await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
  });

  it("Unpartitioned Queue: complete() removes message from random session #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, sessionId);
    await purge(receiverClient);
    await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
  });

  it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, sessionId);
    await purge(receiverClient);
    await testComplete_batching(TestClientType.UnpartitionedSubscriptionWithSessions);
  });
});

describe("SessionReceiver with empty string as sessionId", function(): void {
  let sessionId: string;
  beforeEach(() => {
    sessionId = "";
  });
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

  async function testComplete_batching(testClientType: TestClientType): Promise<void> {
    await senderClient.send(testMessagesWithDifferentSessionIds[0]);
    await senderClient.send(testMessagesWithDifferentSessionIds[1]);

    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;
    const batch = await receiverClient.receiveBatch(2);
    const msgs = batch.messages;

    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(receiverClient.sessionId, "", "Unexpected sessionId in receiver");
    should.equal(
      testMessagesWithDifferentSessionIds[1].body === msgs[0].body &&
        testMessagesWithDifferentSessionIds[1].messageId === msgs[0].messageId &&
        testMessagesWithDifferentSessionIds[1].sessionId === msgs[0].sessionId,
      true,
      "Received Message doesnt match expected test message"
    );
    await batch.context.complete(msgs[0]);

    const peekedMsgsInSession = await receiverClient.diagnostics.peek();
    should.equal(peekedMsgsInSession.length, 0, "Unexpected number of messages peeked");

    await receiverClient.close();
  }

  it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions, sessionId);
    await purgeEntity(TestClientType.PartitionedQueueWithSessions, testSessionId2);
    await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
  });

  it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions, sessionId);
    await purgeEntity(TestClientType.PartitionedSubscriptionWithSessions, testSessionId2);
    await testComplete_batching(TestClientType.PartitionedSubscriptionWithSessions);
  });

  it("Unpartitioned Queue: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, sessionId);
    await purgeEntity(TestClientType.UnpartitionedQueueWithSessions, testSessionId2);
    await testComplete_batching(TestClientType.UnpartitionedQueueWithSessions);
  });

  it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, sessionId);
    await purgeEntity(TestClientType.UnpartitionedSubscriptionWithSessions, testSessionId2);
    await testComplete_batching(TestClientType.UnpartitionedQueueWithSessions);
  });
});

describe("Session State", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testGetSetState(testClientType: TestClientType): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.send(testMessage);

    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;

    let batch = await receiverClient.receiveBatch(2);
    let msgs = batch.messages;

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    let testState = await receiverClient.getState();
    should.equal(!!testState, false, "SessionState is different than expected");
    await receiverClient.setState("new_state");
    testState = await receiverClient.getState();
    should.equal(testState, "new_state", "SessionState is different than expected");

    await receiverClient.close();

    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;
    batch = await receiverClient.receiveBatch(2);
    msgs = batch.messages;

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    testState = await receiverClient.getState();
    should.equal(testState, "new_state", "SessionState is different than expected");

    await receiverClient.setState(""); // clearing the session-state
    await batch.context.complete(msgs[0]);
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions, undefined);
    await purgeEntity(TestClientType.PartitionedQueueWithSessions, undefined);
    await testGetSetState(TestClientType.PartitionedQueueWithSessions);
  });
  it("Partitioned Subscription - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions, undefined);
    await purgeEntity(TestClientType.PartitionedSubscriptionWithSessions, undefined);
    await testGetSetState(TestClientType.PartitionedSubscriptionWithSessions);
  });
  it("Unpartitioned Queue - Testing getState and setState #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, undefined);
    await purgeEntity(TestClientType.UnpartitionedQueueWithSessions, undefined);
    await testGetSetState(TestClientType.UnpartitionedQueueWithSessions);
  });
  it("Unpartitioned Subscription - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, undefined);
    await purgeEntity(TestClientType.UnpartitionedSubscriptionWithSessions, undefined);
    await testGetSetState(TestClientType.UnpartitionedSubscriptionWithSessions);
  });
});

describe("Peek session", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function eachTest(testClientType: TestClientType, useSessionId: boolean) {
    await beforeEachTest(testClientType, undefined);
    await peekSession(testClientType, useSessionId);
  }

  async function peekSession(testClientType: TestClientType, useSessionId: boolean): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await senderClient.send(testMessage);

    receiverClient = (
      await getSenderReceiverClients(
        testClientType,
        "peekLock",
        undefined,
        { id: useSessionId ? testMessage.sessionId : undefined },
        false
      )
    ).receiverClient as SessionReceiver<"peekLock">;

    // At this point AMQP receiver link has not been established.
    // peek() will not establish the link if sessionId was provided
    const peekedMsgs = await receiverClient.diagnostics.peek(1);
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

    const batch = await receiverClient.receiveBatch(1);
    const msgs = batch.messages;
    should.equal(msgs.length, 1, "Unexpected number of messages received");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    await batch.context.complete(msgs[0]);
  }

  it("Partitioned Queue - Peek Session with sessionId", async function(): Promise<void> {
    await eachTest(TestClientType.PartitionedQueueWithSessions, true);
  });
  it("Partitioned Subscription - Peek Session with sessionId", async function(): Promise<void> {
    await eachTest(TestClientType.PartitionedSubscriptionWithSessions, true);
  });
  it("Unpartitioned Queue - Peek Session with sessionId #RunInBrowser", async function(): Promise<
    void
  > {
    await eachTest(TestClientType.UnpartitionedQueueWithSessions, true);
  });
  it("Unpartitioned Subscription - Peek Session with sessionId", async function(): Promise<void> {
    await eachTest(TestClientType.UnpartitionedSubscriptionWithSessions, true);
  });
  it("Partitioned Queue - Peek Session without sessionId", async function(): Promise<void> {
    await eachTest(TestClientType.PartitionedQueueWithSessions, false);
  });
  it("Partitioned Subscription - Peek Session without sessionId", async function(): Promise<void> {
    await eachTest(TestClientType.PartitionedSubscriptionWithSessions, false);
  });
  it("Unpartitioned Queue - Peek Session without sessionId #RunInBrowser", async function(): Promise<
    void
  > {
    await eachTest(TestClientType.UnpartitionedQueueWithSessions, false);
  });
  it("Unpartitioned Subscription - Peek Session without sessionId", async function(): Promise<
    void
  > {
    await eachTest(TestClientType.UnpartitionedSubscriptionWithSessions, false);
  });
});
