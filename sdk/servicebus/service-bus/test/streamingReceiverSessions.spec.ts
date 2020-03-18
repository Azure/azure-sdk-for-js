// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { delay, ReceivedMessage } from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import { checkWithTimeout, TestClientType, TestMessage } from "./utils/testUtils";
import { DispositionType, ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { getDeliveryProperty } from "./utils/misc";
const should = chai.should();
chai.use(chaiAsPromised);

describe("Streaming with sessions", () => {
  let senderClient: Sender;
  let receiverClient: SessionReceiver<ReceivedMessageWithLock>;
  let deadLetterClient: Receiver<ReceivedMessageWithLock>;
  let errorWasThrown: boolean;
  let unexpectedError: Error | undefined;
  let serviceBusClient: ServiceBusClientForTests;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function processError(err: Error): Promise<void> {
    if (err) {
      unexpectedError = err;
    }
  }

  async function afterEachTest(): Promise<void> {
    await serviceBusClient.test.afterEach();
  }
  async function beforeEachTest(testClientType: TestClientType): Promise<void> {
    const entityNames = await createReceiverForTests(testClientType);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getReceiver(receiverClient.getDeadLetterPath(), "peekLock")
    );

    errorWasThrown = false;
    unexpectedError = undefined;
  }

  async function createReceiverForTests(testClientType: TestClientType) {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);
    receiverClient = serviceBusClient.test.addToCleanup(
      entityNames.queue
        ? serviceBusClient.getSessionReceiver(entityNames.queue, "peekLock", {
            sessionId: TestMessage.sessionId
          })
        : serviceBusClient.getSessionReceiver(
            entityNames.topic!,
            entityNames.subscription!,
            "peekLock",
            {
              // TODO: we should just be able to randomly generate this. Change _soon_.
              sessionId: TestMessage.sessionId
            }
          )
    );
    return entityNames;
  }

  describe("Sessions Streaming - Misc Tests", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testAutoComplete(): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);

      const receivedMsgs: ReceivedMessage[] = [];
      receiverClient.subscribe({
        async processMessage(msg: ReceivedMessage) {
          receivedMsgs.push(msg);
          should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
          should.equal(
            msg.messageId,
            testMessage.messageId,
            "MessageId is different than expected"
          );
          return Promise.resolve();
          ``;
        },
        processError
      });

      const msgsCheck = await checkWithTimeout(
        () =>
          receivedMsgs.length === 1 && getDeliveryProperty(receivedMsgs[0]).remote_settled === true
      );
      should.equal(
        msgsCheck,
        true,
        receivedMsgs.length !== 1
          ? `Expected 1, received ${receivedMsgs.length} messages`
          : "Message didnt get auto-completed in time"
      );
      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: AutoComplete removes the message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testAutoComplete();
    });

    it("Partitioned Subscription: AutoComplete removes the message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testAutoComplete();
    });

    it("UnPartitioned Queue: AutoComplete removes the message(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testAutoComplete();
    });

    it("UnPartitioned Subscription: AutoComplete removes the message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testAutoComplete();
    });

    async function testManualComplete(): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);
      const receivedMsgs: ReceivedMessageWithLock[] = [];
      receiverClient.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            receivedMsgs.push(msg);
            should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
            should.equal(
              msg.messageId,
              testMessage.messageId,
              "MessageId is different than expected"
            );
            return Promise.resolve();
          },
          processError
        },
        { autoComplete: false }
      );

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
      should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

      await testPeekMsgsLength(receiverClient, 1);

      await receivedMsgs[0].complete();

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testManualComplete();
    });

    it("Partitioned Subscription: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testManualComplete();
    });

    it("UnPartitioned Queue: Disabled autoComplete, no manual complete retains the message(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testManualComplete();
    });

    it("UnPartitioned Subscription: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testManualComplete();
    });
  });

  describe("Sessions Streaming - Complete message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testComplete(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);

      const receivedMsgs: ReceivedMessageWithLock[] = [];
      receiverClient.subscribe(
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
        { autoComplete }
      );

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
      should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

      await testPeekMsgsLength(receiverClient, 0);
    }
    it("Partitioned Queue: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testComplete(false);
    });

    it("Partitioned Subscription: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testComplete(false);
    });

    it("UnPartitioned Queue: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testComplete(false);
    });

    it("UnPartitioned Subscription: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testComplete(false);
    });

    it("Partitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testComplete(true);
    });

    it("Partitioned Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testComplete(true);
    });

    it("UnPartitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testComplete(true);
    });

    it("UnPartitioned Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testComplete(true);
    });
  });

  // TODO: TEMPORARY
  describe("Sessions Streaming - Abandon message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });
    async function eachTest(testClientType: TestClientType, autoComplete: boolean) {
      await beforeEachTest(testClientType);
      await testAbandon(testClientType, autoComplete);
    }
    async function testAbandon(
      testClientType: TestClientType,
      autoComplete: boolean
    ): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);
      let abandonFlag = 0;

      receiverClient.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            return msg.abandon().then(() => {
              abandonFlag = 1;
              if (receiverClient.isReceivingMessages()) {
                return receiverClient.close();
              }
              return Promise.resolve();
            });
          },
          processError
        },
        { autoComplete }
      );

      const msgAbandonCheck = await checkWithTimeout(() => abandonFlag === 1);
      should.equal(msgAbandonCheck, true, "Abandoning the message results in a failure");

      if (receiverClient.isReceivingMessages()) {
        await receiverClient.close();
      }

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      await createReceiverForTests(testClientType);

      const receivedMsgs = await receiverClient.receiveBatch(1);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        receivedMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
      await receivedMsgs[0].complete();
      await testPeekMsgsLength(receiverClient, 0);
    }
    it("Partitioned Queue: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.PartitionedQueueWithSessions, false);
    });

    it("Partitioned Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.PartitionedSubscriptionWithSessions, false);
    });

    it("UnPartitioned Queue: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.UnpartitionedQueueWithSessions, false);
    });

    it("UnPartitioned Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.UnpartitionedSubscriptionWithSessions, false);
    });

    it("Partitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.PartitionedQueueWithSessions, true);
    });

    it("Partitioned Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.PartitionedSubscriptionWithSessions, true);
    });

    it("UnPartitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.UnpartitionedQueueWithSessions, true);
    });

    it("UnPartitioned Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(TestClientType.UnpartitionedSubscriptionWithSessions, true);
    });
  });

  describe("Sessions Streaming - Defer message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testDefer(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);

      let sequenceNum: any = 0;
      receiverClient.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            await msg.defer();
            sequenceNum = msg.sequenceNumber;
          },
          processError
        },
        { autoComplete }
      );

      const sequenceNumCheck = await checkWithTimeout(() => sequenceNum !== 0);
      should.equal(
        sequenceNumCheck,
        true,
        "Either the message is not received or observed an unexpected SequenceNumber."
      );

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      const deferredMsg = await receiverClient.receiveDeferredMessage(sequenceNum);
      if (!deferredMsg) {
        throw "No message received for sequence number";
      }

      should.equal(deferredMsg.body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        deferredMsg.messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(deferredMsg.deliveryCount, 1, "DeliveryCount is different than expected");

      await deferredMsg.complete();
      await testPeekMsgsLength(receiverClient, 0);
    }
    it("Partitioned Queue: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testDefer(false);
    });

    it("Partitioned Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testDefer(false);
    });

    it("UnPartitioned Queue: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testDefer(false);
    });

    it("UnPartitioned Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testDefer(false);
    });

    it("Partitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testDefer(true);
    });

    it("Partitioned Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testDefer(true);
    });

    it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testDefer(true);
    });

    it("UnPartitioned Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testDefer(true);
    });
  });

  describe("Sessions Streaming - Deadletter message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testDeadletter(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);

      let msgCount = 0;
      receiverClient.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            await msg.deadLetter();
            msgCount++;
          },
          processError
        },
        { autoComplete }
      );

      const msgsCheck = await checkWithTimeout(() => msgCount === 1);
      should.equal(msgsCheck, true, `Expected 1, received ${msgCount} messages`);

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(msgCount, 1, "Unexpected number of messages");
      await testPeekMsgsLength(receiverClient, 0);

      const deadLetterMsgs = await deadLetterClient.receiveBatch(1);
      should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
      should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await deadLetterMsgs[0].complete();
      await testPeekMsgsLength(deadLetterClient, 0);
    }

    it("Partitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testDeadletter(false);
    });

    it("Partitioned Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testDeadletter(false);
    });

    it("UnPartitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testDeadletter(false);
    });

    it("UnPartitioned Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testDeadletter(false);
    });

    it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testDeadletter(true);
    });

    it("Partitioned Subscription with autoComplete: deadLetter() moves message to deadletter(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testDeadletter(true);
    });

    it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testDeadletter(true);
    });

    it("UnPartitioned Subscription with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testDeadletter(true);
    });
  });

  describe("Sessions Streaming - Multiple Receive Operations", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testMultipleReceiveCalls(): Promise<void> {
      let errorMessage;
      const expectedErrorMessage = getAlreadyReceivingErrorMsg(
        receiverClient.entityPath,
        TestMessage.sessionId
      );
      receiverClient.subscribe({
        async processMessage(msg: ReceivedMessageWithLock) {
          return msg.complete();
        },
        processError
      });
      await delay(5000);
      try {
        receiverClient.subscribe({
          async processMessage() {
            return Promise.resolve();
          },
          processError
        });
      } catch (err) {
        errorMessage = err && err.message;
      }
      should.equal(
        errorMessage,
        expectedErrorMessage,
        "Unexpected error message for registerMessageHandler"
      );
      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      errorMessage = "";
      try {
        await receiverClient.receiveBatch(1);
      } catch (err) {
        errorMessage = err && err.message;
      }
      should.equal(
        errorMessage,
        expectedErrorMessage,
        "Unexpected error message for receiveMessages"
      );
    }

    it("UnPartitioned Queue: Second receive operation should fail if the first streaming receiver is not stopped(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testMultipleReceiveCalls();
    });
  });

  describe("Sessions Streaming - Settle an already Settled message throws error", () => {
    afterEach(async () => {
      await afterEachTest();
    });

    const testError = (err: Error, operation: DispositionType): void => {
      should.equal(
        err.message,
        `Failed to ${operation} the message as this message is already settled.`,
        "ErrorMessage is different than expected"
      );
      errorWasThrown = true;
    };

    async function testSettlement(operation: DispositionType): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);

      const receivedMsgs: ReceivedMessageWithLock[] = [];
      receiverClient.subscribe({
        async processMessage(msg: ReceivedMessageWithLock) {
          receivedMsgs.push(msg);
          return Promise.resolve();
        },
        processError
      });

      const msgsCheck = await checkWithTimeout(
        () =>
          receivedMsgs.length === 1 && getDeliveryProperty(receivedMsgs[0]).remote_settled === true
      );
      should.equal(
        msgsCheck,
        true,
        receivedMsgs.length !== 1
          ? `Expected 1, received ${receivedMsgs.length} messages`
          : "Message didnt get auto-completed in time"
      );
      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        receivedMsgs[0].body,
        testMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        receivedMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await testPeekMsgsLength(receiverClient, 0);

      if (operation === DispositionType.complete) {
        await receivedMsgs[0].complete().catch((err) => testError(err, operation));
      } else if (operation === DispositionType.abandon) {
        await receivedMsgs[0].abandon().catch((err) => testError(err, operation));
      } else if (operation === DispositionType.deadletter) {
        await receivedMsgs[0].deadLetter().catch((err) => testError(err, operation));
      } else if (operation === DispositionType.defer) {
        await receivedMsgs[0].defer().catch((err) => testError(err, operation));
      }

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }

    it("UnPartitioned Queue: complete() throws error(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSettlement(DispositionType.complete);
    });

    it("UnPartitioned Subscription: complete() throws error(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.complete);
    });

    it("UnPartitioned Queue: abandon() throws error(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSettlement(DispositionType.abandon);
    });

    it("UnPartitioned Subscription: abandon() throws error(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.abandon);
    });

    it("UnPartitioned Queue: defer() throws error(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSettlement(DispositionType.defer);
    });

    it("UnPartitioned Subscription: defer() throws error(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.defer);
    });

    it("UnPartitioned Queue: deadLetter() throws error(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSettlement(DispositionType.deadletter);
    });

    it("UnPartitioned Subscription: deadLetter() throws error(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.deadletter);
    });
  });

  describe("Sessions Streaming - User Error", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testUserError(): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await senderClient.send(testMessage);
      const errorMessage = "Will we see this error message?";

      const receivedMsgs: ReceivedMessageWithLock[] = [];
      receiverClient.subscribe({
        async processMessage(msg: ReceivedMessageWithLock) {
          await msg.complete();
          receivedMsgs.push(msg);
          throw new Error(errorMessage);
        },
        processError
      });

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);

      should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages.`);
      await receiverClient.close();

      should.equal(
        unexpectedError && unexpectedError.message,
        errorMessage,
        "User error did not surface."
      );
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    }

    it("UnPartitioned Queue: onError handler is called for user error(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testUserError();
    });
  });

  describe("Sessions Streaming - maxConcurrentCalls", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testConcurrency(maxConcurrentCalls?: number): Promise<void> {
      if (
        typeof maxConcurrentCalls === "number" &&
        (maxConcurrentCalls < 1 || maxConcurrentCalls > 2)
      ) {
        chai.assert.fail(
          "Sorry, the tests here only support cases when maxConcurrentCalls is set to 1 or 2"
        );
      }

      const testMessages = [TestMessage.getSessionSample(), TestMessage.getSessionSample()];
      const batchMessageToSend = await senderClient.createBatch();
      for (const message of testMessages) {
        batchMessageToSend.tryAdd(message);
      }
      await senderClient.sendBatch(batchMessageToSend);

      const settledMsgs: ReceivedMessageWithLock[] = [];
      const receivedMsgs: ReceivedMessageWithLock[] = [];

      receiverClient.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            if (receivedMsgs.length === 1) {
              if ((!maxConcurrentCalls || maxConcurrentCalls === 1) && settledMsgs.length === 0) {
                throw new Error(
                  "onMessage for the second message should not have been called before the first message got settled"
                );
              }
            } else {
              if (maxConcurrentCalls === 2 && settledMsgs.length !== 0) {
                throw new Error(
                  "onMessage for the second message should have been called before the first message got settled"
                );
              }
            }

            receivedMsgs.push(msg);
            await delay(2000);
            await msg.complete();
            settledMsgs.push(msg);
          },
          processError
        },
        maxConcurrentCalls
          ? {
              maxConcurrentCalls
            }
          : {}
      );

      await checkWithTimeout(() => settledMsgs.length === 2);
      await receiverClient.close();

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(settledMsgs.length, 2, `Expected 2, received ${settledMsgs.length} messages.`);
    }

    it("Partitioned Queue: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testConcurrency();
    });

    it("Partitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testConcurrency();
    });

    it("Partitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testConcurrency();
    });

    it("Unpartitioned Queue: no maxConcurrentCalls passed(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testConcurrency();
    });

    it("Unpartitioned Queue: pass 1 for maxConcurrentCalls(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testConcurrency();
    });

    it("Unpartitioned Queue: pass 2 for maxConcurrentCalls(with sessions) #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testConcurrency();
    });

    it("Partitioned Subscription: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testConcurrency();
    });

    it("Partitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testConcurrency(1);
    });

    it("Partitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testConcurrency(2);
    });

    it("Unpartitioned Subscription: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testConcurrency();
    });

    it("Unpartitioned Subscription: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testConcurrency(1);
    });

    it("Unpartitioned Subscription: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testConcurrency(2);
    });
  });
  // #RevisitCommentedTestsAfterTheSingleClientAPI
  // Cannot close the receiver manually with the current 2-client API
  // Re-visit after the top level client is implemented
  // describe("Sessions Streaming - Not receive messages after receiver is closed", function(): void {
  //   afterEach(async () => {
  //     await afterEachTest();
  //   });

  //   async function testReceiveMessages(): Promise<void> {
  //     const totalNumOfMessages = 5;
  //     let num = 1;
  //     const messages = [];
  //     while (num <= totalNumOfMessages) {
  //       const message = {
  //         messageId: num,
  //         body: "test",
  //         label: `${num}`,
  //         sessionId: TestMessage.sessionId,
  //         partitionKey: "dummy" // Ensures all messages go to same parition to make peek work reliably
  //       };
  //       num++;
  //       messages.push(message);
  //     }
  //     await senderClient.sendBatch(messages);

  //     const receivedMsgs: ReceivedMessage[] = [];

  //     receiverClient.subscribe(
  //       {
  //         async processMessage(brokeredMessage: ReceivedMessage, context: ReceivedSettleableMessage) {
  //           receivedMsgs.push(brokeredMessage);
  //           await context.complete(brokeredMessage);
  //         },
  //         processError
  //       },
  //       {
  //         autoComplete: false
  //       }
  //     );
  //     await receiverClient.close();

  //     await delay(5000);
  //     should.equal(
  //       receivedMsgs.length,
  //       0,
  //       `Expected 0 messages, but received ${receivedMsgs.length}`
  //     );
  //     await testPeekMsgsLength(receiverClient, totalNumOfMessages);
  //   }

  //   it("UnPartitioned Queue: Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
  //     void
  //   > {
  //     await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
  //     await testReceiveMessages();
  //   });

  //   it("UnPartitioned Queue: (Receive And Delete mode) Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
  //     void
  //   > {
  //     await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, "receiveAndDelete");
  //     await testReceiveMessages();
  //   });
  // });
});
