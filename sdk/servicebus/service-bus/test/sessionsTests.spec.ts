// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay, ReceivedMessage } from "../src";

import { TestMessage, TestClientType, checkWithTimeout } from "./utils/testUtils";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import {
  testPeekMsgsLength,
  ServiceBusClientForTests,
  createServiceBusClientForTests
} from "./utils/testutils2";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { AbortController } from "@azure/abort-controller";

let unexpectedError: Error | undefined;

async function processError(err: Error): Promise<void> {
  if (err) {
    unexpectedError = err;
  }
}

describe("session tests", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: SessionReceiver<ReceivedMessageWithLock>;

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType, sessionId: string): Promise<void> {
    serviceBusClient = createServiceBusClientForTests();
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
      sessionId
    });

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
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

      let msgs = await receiver.receiveBatch(1, { maxWaitTimeInMs: 10000 });
      should.equal(msgs.length, 0, "Unexpected number of messages received");

      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

      msgs = await receiver.receiveBatch(1);
      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      await msgs[0].complete();
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
        async processMessage(msg: ReceivedMessage) {
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
      receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

      receivedMsgs = [];
      receiver.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
            should.equal(
              msg.messageId,
              testMessage.messageId,
              "MessageId is different than expected"
            );
            await msg.complete();
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

  describe("Session State", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testGetSetState(testClientType: TestClientType): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.send(testMessage);

      let msgs = await receiver.receiveBatch(2);

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
      receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

      msgs = await receiver.receiveBatch(2);

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
      await msgs[0].complete();
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

  describe("Cancel operations on the session receiver", function(): void {
    it("Abort getState request", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.getState({ abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The getState operation has been cancelled by the user.");
      }
    });

    it("Abort setState request on the session receiver", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.setState("why", { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The setState operation has been cancelled by the user.");
      }
    });

    it("Abort renewSessionLock request on the session receiver", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.renewSessionLock({ abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The renewSessionLock operation has been cancelled by the user.");
      }
    });

    it("Abort receiveDeferredMessage request on the session receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.receiveDeferredMessage(Long.ZERO, { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal(
          "The receiveDeferredMessage operation has been cancelled by the user."
        );
      }
    });

    it("Abort receiveDeferredMessages request on the session receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.receiveDeferredMessages([Long.ZERO], { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal(
          "The receiveDeferredMessages operation has been cancelled by the user."
        );
      }
    });
  });
});
