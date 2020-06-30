// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ReceivedMessage, delay } from "../src";

import { TestClientType, TestMessage, checkWithTimeout, isMessagingError } from "./utils/testUtils";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength
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

  async function beforeEachTest(testClientType: TestClientType, sessionId?: string): Promise<void> {
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

    // await purge(receiver);
    // const peekedMsgs = await receiver.peekMessages();
    // const receiverEntityType = receiver.entityType;
    // if (peekedMsgs.length) {
    //   chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    // }
  }

  async function afterEachTest(): Promise<void> {
    await serviceBusClient.test.afterEach();
    await serviceBusClient.test.after();
  }

  describe("createSessionReceiver error scenarios", function(): void {
    it("No sessionId on empty queue throws OperationTimeoutError", async function(): Promise<
      void
    > {
      let expectedErrorThrown = false;
      let unexpectedError;
      try {
        await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      } catch (error) {
        // TODO: https://github.com/Azure/azure-sdk-for-js/issues/9775 to figure out why we get two different errors.
        if (isMessagingError(error) && (error.code === "OperationTimeoutError" || error.code === "SessionCannotBeLockedError")) {
          expectedErrorThrown = true;
        } else {
          unexpectedError = error;
        }
      }
      should.equal(
        expectedErrorThrown,
        true,
        `Instead of OperationTimeoutError or SessionCannotBeLockedError, found ${unexpectedError}`
      );
      await serviceBusClient.close();
    });

    it("An already locked session throws SessionCannotBeLockedError", async function(): Promise<
      void
    > {
      let expectedErrorThrown = false;
      let unexpectedError;
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions, "boo");
      try {
        await serviceBusClient.test.getSessionPeekLockReceiver(
          { queue: receiver.entityPath, usesSessions: true },
          { sessionId: "boo" }
        );
      } catch (error) {
        if (isMessagingError(error) && error.code === "SessionCannotBeLockedError") {
          expectedErrorThrown = true;
        } else {
          unexpectedError = error;
        }
      }
      should.equal(
        expectedErrorThrown,
        true,
        `Instead of SessionCannotBeLockedError, found ${unexpectedError}`
      );
      await serviceBusClient.close();
    });
  });

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
      await sender.sendMessages(testMessage);

      let msgs = await receiver.receiveMessages(1, { maxWaitTimeInMs: 10000 });
      should.equal(msgs.length, 0, "Unexpected number of messages received");

      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

      msgs = await receiver.receiveMessages(1);
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
      await sender.sendMessages(testMessage);

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
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

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
      await sender.sendMessages(testMessage);

      let msgs = await receiver.receiveMessages(2);

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
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

      msgs = await receiver.receiveMessages(2);

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
    it("Unpartitioned Queue - Testing getState and setState", async function(): Promise<void> {
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
    afterEach(async () => {
      await afterEachTest();
    });

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

/**
 * SessionReceiver intentionally does not recover after a disconnect:
 * https://github.com/Azure/azure-sdk-for-js/pull/8447#issuecomment-618510245
 * If support for this is added in the future, we can stop skipping this test.
 */
describe.skip("SessionReceiver - disconnects", function(): void {
  let serviceBusClient: ServiceBusClientForTests;
  async function beforeEachTest(testClientType: TestClientType): Promise<EntityName> {
    serviceBusClient = createServiceBusClientForTests();
    return serviceBusClient.test.createTestEntities(testClientType);
  }

  after(() => {
    return serviceBusClient.test.after();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    // Create the sender and receiver.
    const entityName = await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    const receiver = await serviceBusClient.createSessionReceiver(entityName.queue!, "peekLock", {
      sessionId: testMessage.sessionId,
      autoRenewLockDurationInMs: 10000 // Lower this value so that test can complete in time.
    });
    const sender = serviceBusClient.createSender(entityName.queue!);
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(testMessage);
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
    receiver.subscribe({
      async processMessage(message) {
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
      async processError(err) {
        console.log(`Got an error`);
        console.error(err);
        receivedErrors.push(err);
      }
    });

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    settledMessageCount.should.equal(1, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");

    const connectionContext = (receiver as any)["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args: any) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    (receiver as any)["_context"].namespace.connection["_connection"].idle();

    // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
    // Otherwise, it will get into a bad internal state with uncaught exceptions.
    await delay(2000);
    // send a second message to trigger the message handler again.
    await sender.sendMessages(TestMessage.getSessionSample());
    console.log("Waiting for 2nd message");
    // wait for the 2nd message to be received.
    await receiverSecondMessage;
    settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");
    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});
