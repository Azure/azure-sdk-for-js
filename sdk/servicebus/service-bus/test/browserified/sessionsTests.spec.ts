// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  ServiceBusClient,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  SendableMessageInfo,
  ReceiveMode,
  SessionReceiver
} from "../../src";

import { TestMessage, getSenderReceiverClients, TestClientType, purge } from "./testUtils";

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

let ns: ServiceBusClient;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

const testSessionId2 = "my-session2";

async function beforeEachTest(
  senderType: TestClientType,
  sessionType: TestClientType
): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  // @ts-ignore
  if (!window.__env__["SERVICEBUS_CONNECTION_STRING"]) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  // @ts-ignore
  ns = ServiceBusClient.createFromConnectionString(window.__env__["SERVICEBUS_CONNECTION_STRING"]);

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

    receiver = <SessionReceiver>(
      receiverClient.createReceiver(ReceiveMode.peekLock, { sessionId: undefined })
    );
    msgs = await receiver.receiveMessages(2);
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

  it("Unpartitioned Queue - Testing getState and setState", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
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
    should.equal(peekedMsgs.length, 1, "Unexpected number of messages");
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
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(msgs[0].sessionId, testMessage.sessionId, "SessionId is different than expected");

    await msgs[0].complete();
  }

  it("Unpartitioned Queue - Peek Session with sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await peekSession(true);
  });
  it("Unpartitioned Queue - Peek Session without sessionId", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await peekSession(false);
  });
});
