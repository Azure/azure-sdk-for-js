// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { Sender } from "../src/sender";
import { SessionReceiver, ServiceBusMessage } from "../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
const should = chai.should();

// NOTE: these tests should be reworked, if possible. Since they need to be deterministic
// and only grab the "expected" next session you need to ensure the entity (queue, sub)
// is completely empty.
//
// I've moved these tests in here and re-create entites after each test - it'e expensive
// but it'll allow them to be reliable.
describe("sessions tests -  requires completely clean entity for each test", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: SessionReceiver<ReceivedMessageWithLock>;

  async function beforeEachNoSessionTest(
    testClientType: TestClientType,
    sessionId?: string
  ): Promise<void> {
    serviceBusClient = createServiceBusClientForTests();
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
      sessionId
    });

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );

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
    // special circumstance since we're destroying everything after each of these tests.
    await serviceBusClient.test.after();
  }

  describe("Peek session", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function eachTest(testClientType: TestClientType, useSessionId: boolean) {
      await beforeEachNoSessionTest(testClientType);
      await peekSession(testClientType, useSessionId);
    }

    async function peekSession(
      testClientType: TestClientType,
      useSessionId: boolean
    ): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.send(testMessage);

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
        sessionId: useSessionId ? testMessage.sessionId! : undefined
      });

      // At this point AMQP receiver link has not been established.
      // peek() will not establish the link if sessionId was provided
      const peekedMsgs = await receiver.diagnostics.peek(1);
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

      const msgs = await receiver.receiveBatch(1);
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

      await msgs[0].complete();
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
    it("Partitioned Subscription - Peek Session without sessionId", async function(): Promise<
      void
    > {
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

  describe("SessionReceiver with no sessionId", function(): void {
    const testSessionId2 = "my-session2";

    afterEach(async () => {
      await afterEachTest();
    });

    const testMessagesWithDifferentSessionIds: ServiceBusMessage[] = [
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
      await sender.send(testMessagesWithDifferentSessionIds[0]);
      await sender.send(testMessagesWithDifferentSessionIds[1]);

      let msgs = await receiver.receiveBatch(2);

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

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

      msgs = await receiver.receiveBatch(2);

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
      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.PartitionedQueueWithSessions);
      await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
    });

    it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testComplete_batching(TestClientType.PartitionedSubscriptionWithSessions);
    });

    it("Unpartitioned Queue: complete() removes message from random session #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.UnpartitionedQueueWithSessions);
      await testComplete_batching(TestClientType.UnpartitionedQueueWithSessions);
    });

    it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testComplete_batching(TestClientType.UnpartitionedSubscriptionWithSessions);
    });
  });

  describe("SessionReceiver with empty string as sessionId", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    // Sending messages with different session id, so that we know for sure we pick the right one
    // and that Service Bus is not choosing a random one for us
    const testMessagesWithDifferentSessionIds: ServiceBusMessage[] = [
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
      receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames, { sessionId: "" });

      const msgs = await receiver.receiveBatch(2);

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

      const peekedMsgsInSession = await receiver.diagnostics.peek();
      should.equal(peekedMsgsInSession.length, 0, "Unexpected number of messages peeked");

      await receiver.close();
    }

    it("Partitioned Queue: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.PartitionedQueueWithSessions, "");
      await testComplete_batching(TestClientType.PartitionedQueueWithSessions);
    });

    it("Partitioned Subscription: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.PartitionedSubscriptionWithSessions, "");
      await testComplete_batching(TestClientType.PartitionedSubscriptionWithSessions);
    });

    it("Unpartitioned Queue: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.UnpartitionedQueueWithSessions, "");
      await testComplete_batching(TestClientType.UnpartitionedQueueWithSessions);
    });

    it("Unpartitioned Subscription: complete() removes message from random session", async function(): Promise<
      void
    > {
      await beforeEachNoSessionTest(TestClientType.UnpartitionedSubscriptionWithSessions, "");
      await testComplete_batching(TestClientType.UnpartitionedSubscriptionWithSessions);
    });
  });
});
