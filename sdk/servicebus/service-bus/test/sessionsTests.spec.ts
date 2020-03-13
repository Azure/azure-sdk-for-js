// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay, SendableMessageInfo, ReceivedMessage, ContextWithSettlement } from "../src";

import { TestMessage, TestClientType, checkWithTimeout } from "./utils/testUtils";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import {
  testPeekMsgsLength,
  ServiceBusClientForTests,
  createServiceBusClientForTests
} from "./utils/testutils2";

let unexpectedError: Error | undefined;

async function processError(err: Error): Promise<void> {
  if (err) {
    unexpectedError = err;
  }
}

describe("session tests", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: SessionReceiver<ContextWithSettlement>;

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType, sessionId: string): Promise<void> {
    serviceBusClient = createServiceBusClientForTests();
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    const { receiver: sessionReceiver } = await serviceBusClient.test.getSessionPeekLockReceiver(
      entityNames,
      sessionId ?? ""
    );

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );
    receiver = sessionReceiver;

    // Observation -
    // Peeking into an empty session-enabled queue would run into either of the following errors..
    // 1. OperationTimeoutError: Unable to create the amqp receiver 'unpartitioned-queue-sessions-794f89be-3282-8b48-8ae0-a8af43c3ce36'
    //    on amqp session 'local-1_remote-1_connection-2' due to operation timeout.
    // 2. MessagingError: Received an incorrect sessionId 'undefined' while creating the receiver 'unpartitioned-queue-sessions-86662b2b-acdc-1045-8ad4-fa3ab8807871'.

    // getSenderReceiverClients creates brand new queues/topic-subscriptions.
    // Hence, commenting the following code since there is no need to purge/peek into a freshly created entity

    // await purge(receiverClient);
    // const peekedMsgs = await receiverClient.diagnostics.peek();
    // const receiverEntityType = receiverClient.entityType;
    // if (peekedMsgs.length) {
    //   chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    // }
  }

  async function afterEachTest(): Promise<void> {
    await serviceBusClient.test.afterEach();
  }

  describe("SessionReceiver with invalid sessionId", function(): void {
    const nonExistentSessionId: string = "non" + TestMessage.sessionId;
    // beforeEach(() => {
    //   sessionId = ;
    // });

    afterEach(async () => {
      await afterEachTest();
    });

    async function test_batching(testClientType: TestClientType): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.send(testMessage);

      let batch = await receiver.receiveBatch(1, 10);
      let msgs = batch.messages;
      should.equal(msgs.length, 0, "Unexpected number of messages received");

      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      ({ receiver } = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, ""));

      batch = await receiver.receiveBatch(1);
      msgs = batch.messages;
      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      await batch.context.complete(msgs[0]);
      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, nonExistentSessionId);
      await test_batching(TestClientType.PartitionedQueueWithSessions);
    });

    it("Partitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        nonExistentSessionId
      );
      await test_batching(TestClientType.PartitionedSubscriptionWithSessions);
    });

    it("Unpartitioned Queue - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, nonExistentSessionId);
      await test_batching(TestClientType.UnpartitionedQueueWithSessions);
    });

    it("Unpartitioned Subscription - Batch Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        nonExistentSessionId
      );
      await test_batching(TestClientType.UnpartitionedSubscriptionWithSessions);
    });

    async function test_streaming(testClientType: TestClientType): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.send(testMessage);

      let receivedMsgs: ReceivedMessage[] = [];
      receiver.subscribe({
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          receivedMsgs.push(msg);
          return Promise.resolve();
        },
        processError
      });
      await delay(2000);
      should.equal(receivedMsgs.length, 0, `Expected 0, received ${receivedMsgs.length} messages`);
      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      ({ receiver } = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, ""));

      receivedMsgs = [];
      receiver.subscribe(
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

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, nonExistentSessionId);
      await test_streaming(TestClientType.PartitionedQueueWithSessions);
    });

    it("Partitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        nonExistentSessionId
      );
      await test_streaming(TestClientType.PartitionedSubscriptionWithSessions);
    });

    it("Unpartitioned Queue - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, nonExistentSessionId);
      await test_streaming(TestClientType.UnpartitionedQueueWithSessions);
    });

    it("Unpartitioned Subscription - Streaming Receiver: no messages received for invalid sessionId", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        nonExistentSessionId
      );
      await test_streaming(TestClientType.UnpartitionedSubscriptionWithSessions);
    });
  });

  // TODO: this one cares about a clean queue to pass.
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
      await sender.send(testMessagesWithDifferentSessionIds[0]);
      await sender.send(testMessagesWithDifferentSessionIds[1]);

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      ({ receiver } = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, ""));

      const batch = await receiver.receiveBatch(2);
      const msgs = batch.messages;

      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(receiver.sessionId, "", "Unexpected sessionId in receiver");
      should.equal(
        testMessagesWithDifferentSessionIds[1].body === msgs[0].body &&
          testMessagesWithDifferentSessionIds[1].messageId === msgs[0].messageId &&
          testMessagesWithDifferentSessionIds[1].sessionId === msgs[0].sessionId,
        true,
        "Received Message doesnt match expected test message"
      );
      await batch.context.complete(msgs[0]);

      const peekedMsgsInSession = await receiver.diagnostics.peek();
      should.equal(peekedMsgsInSession.length, 0, "Unexpected number of messages peeked");

      await receiver.close();
    }

    it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, sessionId);
      await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
    });

    it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions, sessionId);
      await testComplete_batching(TestClientType.PartitionedSubscriptionWithSessions);
    });

    it("Unpartitioned Queue: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, sessionId);
      await testComplete_batching(TestClientType.UnpartitionedQueueWithSessions);
    });

    it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, sessionId);
      await testComplete_batching(TestClientType.UnpartitionedSubscriptionWithSessions);
    });
  });

  describe("Session State", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testGetSetState(testClientType: TestClientType): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.send(testMessage);

      let batch = await receiver.receiveBatch(2);
      let msgs = batch.messages;

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(
        msgs[0].sessionId,
        testMessage.sessionId,
        "SessionId is different than expected"
      );

      let testState = await receiver.getState();
      should.equal(!!testState, false, "SessionState is different than expected");
      await receiver.setState("new_state");
      testState = await receiver.getState();
      should.equal(testState, "new_state", "SessionState is different than expected");

      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      ({ receiver } = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, ""));

      batch = await receiver.receiveBatch(2);
      msgs = batch.messages;

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(
        msgs[0].sessionId,
        testMessage.sessionId,
        "SessionId is different than expected"
      );

      testState = await receiver.getState();
      should.equal(testState, "new_state", "SessionState is different than expected");

      await receiver.setState(""); // clearing the session-state
      await batch.context.complete(msgs[0]);
      await testPeekMsgsLength(receiver, 0);
    }
    it("Partitioned Queue - Testing getState and setState", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, TestMessage.sessionId);
      await testGetSetState(TestClientType.PartitionedQueueWithSessions);
    });
    it("Partitioned Subscription - Testing getState and setState", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        TestMessage.sessionId
      );
      await testGetSetState(TestClientType.PartitionedSubscriptionWithSessions);
    });
    it("Unpartitioned Queue - Testing getState and setState #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, TestMessage.sessionId);
      await testGetSetState(TestClientType.UnpartitionedQueueWithSessions);
    });
    it("Unpartitioned Subscription - Testing getState and setState", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        TestMessage.sessionId
      );
      await testGetSetState(TestClientType.UnpartitionedSubscriptionWithSessions);
    });
  });
});
