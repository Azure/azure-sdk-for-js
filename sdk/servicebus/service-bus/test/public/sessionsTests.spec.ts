// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai, { assert } from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {
  ServiceBusReceivedMessage,
  delay,
  ProcessErrorArgs,
  isServiceBusError,
  ServiceBusError,
} from "../../src";

import { TestClientType, TestMessage, checkWithTimeout } from "./utils/testUtils";
import { ServiceBusSender } from "../../src";
import { ServiceBusSessionReceiver } from "../../src";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithSessions,
} from "./utils/testutils2";
import { AbortController } from "@azure/abort-controller";
import sinon from "sinon";
import { ServiceBusSessionReceiverImpl } from "../../src/receivers/sessionReceiver";

let unexpectedError: Error | undefined;

async function processError(args: ProcessErrorArgs): Promise<void> {
  unexpectedError = args.error;
}

describe("session tests", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;
  let receiver: ServiceBusSessionReceiver;
  const testClientType = getRandomTestClientTypeWithSessions();

  async function beforeEachTest(sessionId?: string): Promise<void> {
    serviceBusClient = createServiceBusClientForTests();
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    if (sessionId != null) {
      receiver = await serviceBusClient.test.acceptSessionWithPeekLock(entityNames, sessionId);
    } else {
      receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);
    }

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

  afterEach(async () => {
    unexpectedError = undefined;
    await serviceBusClient.test.afterEach();
    await serviceBusClient.test.after();
  });

  describe(`${testClientType}: Session Receiver Tests`, function (): void {
    it("acceptNextSession() No sessionId on empty queue throws OperationTimeoutError", async function (): Promise<void> {
      let expectedErrorThrown = false;
      try {
        await beforeEachTest();
      } catch (error) {
        // TODO: https://github.com/Azure/azure-sdk-for-js/issues/9775 to figure out why we get two different errors.
        if (
          isServiceBusError(error) &&
          (error.code === "ServiceTimeout" || error.code === "SessionCannotBeLocked")
        ) {
          expectedErrorThrown = true;
        } else {
          unexpectedError = error;
        }
      }
      should.equal(
        expectedErrorThrown,
        true,
        `Instead of ServiceTimeout or SessionCannotBeLocked, found ${unexpectedError}`
      );
      await serviceBusClient.close();
    });

    it("acceptSession() An already locked session throws SessionCannotBeLockedError", async function (): Promise<void> {
      let expectedErrorThrown = false;
      await beforeEachTest("boo");
      try {
        await serviceBusClient.test.acceptSessionWithPeekLock(
          { queue: receiver.entityPath, usesSessions: true },
          "boo"
        );
      } catch (error) {
        if (isServiceBusError(error) && error.code === "SessionCannotBeLocked") {
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

    it("Batch Receiver: no messages received for invalid sessionId", async function (): Promise<void> {
      const nonExistentSessionId: string = "non" + TestMessage.sessionId;
      await beforeEachTest(nonExistentSessionId);
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      let msgs = await receiver.receiveMessages(1, { maxWaitTimeInMs: 10000 });
      should.equal(msgs.length, 0, "Unexpected number of messages received");

      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);

      msgs = await receiver.receiveMessages(1);
      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      await receiver.completeMessage(msgs[0]);
      await testPeekMsgsLength(receiver, 0);
    });

    it("Streaming Receiver: no messages received for invalid sessionId", async function (): Promise<void> {
      const nonExistentSessionId: string = "non" + TestMessage.sessionId;
      await beforeEachTest(nonExistentSessionId);
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      let receivedMsgs: ServiceBusReceivedMessage[] = [];
      receiver.subscribe({
        async processMessage(msg: ServiceBusReceivedMessage) {
          receivedMsgs.push(msg);
          return Promise.resolve();
        },
        processError,
      });
      await delay(2000);
      should.equal(receivedMsgs.length, 0, `Expected 0, received ${receivedMsgs.length} messages`);
      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);

      receivedMsgs = [];
      receiver.subscribe(
        {
          async processMessage(msg: ServiceBusReceivedMessage) {
            should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
            should.equal(
              msg.messageId,
              testMessage.messageId,
              "MessageId is different than expected"
            );
            await receiver.completeMessage(msg);
            receivedMsgs.push(msg);
          },
          processError,
        },
        { autoCompleteMessages: false }
      );

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
      should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);
      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      await testPeekMsgsLength(receiver, 0);
    });

    it("Testing getState and setState", async function (): Promise<void> {
      await beforeEachTest(TestMessage.sessionId);
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

      let testState = await receiver.getSessionState();
      should.equal(!!testState, false, "SessionState is different than expected");
      await receiver.setSessionState("new_state");
      testState = await receiver.getSessionState();
      should.equal(testState, "new_state", "SessionState is different than expected");

      await receiver.close();

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);

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

      testState = await receiver.getSessionState();
      should.equal(testState, "new_state", "SessionState is different than expected");

      await receiver.setSessionState(""); // clearing the session-state
      await receiver.completeMessage(msgs[0]);
      await testPeekMsgsLength(receiver, 0);
    });

    it("Abort getState request", async function (): Promise<void> {
      await beforeEachTest(TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.getSessionState({ abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The operation was aborted.");
        err.name.should.equal("AbortError");
      }
    });

    it("Abort setState request on the session receiver", async function (): Promise<void> {
      await beforeEachTest(TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.setSessionState("why", { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The operation was aborted.");
        err.name.should.equal("AbortError");
      }
    });

    it("Abort renewSessionLock request on the session receiver", async function (): Promise<void> {
      await beforeEachTest(TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.renewSessionLock({ abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The operation was aborted.");
        err.name.should.equal("AbortError");
      }
    });

    it("Abort receiveDeferredMessages request on the session receiver", async function (): Promise<void> {
      await beforeEachTest(TestMessage.sessionId);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.receiveDeferredMessages([Long.ZERO], { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The operation was aborted.");
        err.name.should.equal("AbortError");
      }
    });
  });
});

/**
 * SessionReceiver intentionally does not recover after a disconnect:
 * https://github.com/Azure/azure-sdk-for-js/pull/8447#issuecomment-618510245
 * If support for this is added in the future, we can stop skipping this test.
 */
describe.skip("SessionReceiver - disconnects - (if recovery is supported in future)", function (): void {
  let serviceBusClient: ServiceBusClientForTests;
  async function beforeEachTest(testClientType: TestClientType): Promise<EntityName> {
    serviceBusClient = createServiceBusClientForTests();
    return serviceBusClient.test.createTestEntities(testClientType);
  }

  after(() => {
    return serviceBusClient.test.after();
  });

  it("can receive and settle messages after a disconnect", async function (): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    // Create the sender and receiver.
    const entityName = await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    const receiver = await serviceBusClient.acceptSession(
      entityName.queue!,
      testMessage.sessionId,
      {
        maxAutoLockRenewalDurationInMs: 10000, // Lower this value so that test can complete in time.
      }
    );
    const sender = serviceBusClient.createSender(entityName.queue!);
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(testMessage);
    const receivedErrors: any[] = [];
    let settledMessageCount = 0;

    let messageHandlerCount = 0;
    let receiverIsActiveResolver: (value: unknown) => void;
    let receiverSecondMessageResolver: (value: unknown) => void;
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
          await receiver.completeMessage(message);
          settledMessageCount++;
        } catch (err) {
          receivedErrors.push(err);
        }
        if (messageHandlerCount === 1) {
          // Since we've received a message, mark the receiver as active.
          receiverIsActiveResolver(undefined);
        } else {
          // Mark the second message resolver!
          receiverSecondMessageResolver(undefined);
        }
      },
      async processError(err) {
        console.log(`Got an error`);
        console.error(err);
        receivedErrors.push(err);
      },
    });

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    settledMessageCount.should.equal(1, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");

    const connectionContext = (receiver as any)["_context"];
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function (...args: any) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    (receiver as any)["_context"].connection["_connection"].idle();

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

describe("SessionReceiver - disconnects", function (): void {
  let serviceBusClient: ServiceBusClientForTests;
  async function beforeEachTest(testClientType: TestClientType): Promise<EntityName> {
    serviceBusClient = createServiceBusClientForTests();
    return serviceBusClient.test.createTestEntities(testClientType);
  }

  after(() => {
    return serviceBusClient.test.after();
  });

  it("calls processError and closes the link", async function (): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    // Create the sender and receiver.
    const entityName = await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    const receiver = await serviceBusClient.acceptSession(
      entityName.queue!,
      testMessage.sessionId,
      {
        maxAutoLockRenewalDurationInMs: 10000, // Lower this value so that test can complete in time.
      }
    );

    let receiverSecondMessageResolver: (value: unknown) => void;
    let errorIsThrownResolver: (value: ProcessErrorArgs | PromiseLike<ProcessErrorArgs>) => void;
    const errorIsThrown = new Promise<ProcessErrorArgs>((resolve) => {
      errorIsThrownResolver = resolve;
    });
    const receiverSecondMessage = new Promise((resolve) => {
      receiverSecondMessageResolver = resolve;
    });

    const sender = serviceBusClient.createSender(entityName.queue!);
    should.equal(receiver.isClosed, false, "Receiver should not have been closed");
    const isCloseCalledSpy = sinon.spy(
      (receiver as ServiceBusSessionReceiverImpl)["_messageSession"],
      "close"
    );

    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(testMessage);
    receiver.subscribe(
      {
        async processMessage(_message: ServiceBusReceivedMessage) {
          // Simulate a disconnect being called with a non-retryable error.
          (receiver as any)["_context"].connection["_connection"].idle();
        },
        async processError(err) {
          errorIsThrownResolver(err);
        },
      },
      { autoCompleteMessages: false }
    );

    const err = await errorIsThrown;

    should.equal(
      (err.error as ServiceBusError).code,
      "SessionLockLost",
      "error code is not SessionLockLost"
    );

    // NOTE: this is a hokey workaround. It used to be that you'd only get the single error
    // from 'detach' but now it's possible to get _two_ errors: one from detach and one
    // from a failed credit add in subscribe() (both of which are valid and happen independently).
    //
    // This is only an issue for this test because we're trying to do some timing dependent checks of our
    // internal state.
    await checkWithTimeout(() => isCloseCalledSpy.called);
    assert.isTrue(isCloseCalledSpy.called, "Close should have been called on the message session");

    // send a second message to trigger the message handler again.
    await sender.sendMessages(TestMessage.getSessionSample());
    const receiver2 = await serviceBusClient.acceptSession(
      entityName.queue!,
      testMessage.sessionId,
      {
        maxAutoLockRenewalDurationInMs: 10000, // Lower this value so that test can complete in time.
      }
    );
    receiver2.subscribe({
      async processMessage(_message: ServiceBusReceivedMessage) {
        receiverSecondMessageResolver(undefined);
      },
      async processError(_err) {
        /* empty body */
      },
    });
    await receiverSecondMessage;
    await receiver2.close();
  });
});
