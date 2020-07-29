// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceivedMessage, delay } from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import { TestClientType, TestMessage, checkWithTimeout } from "./utils/testUtils";
import { DispositionType, ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { SessionReceiver, SessionReceiverImpl } from "../src/receivers/sessionReceiver";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithSessions
} from "./utils/testutils2";
import { getDeliveryProperty } from "./utils/misc";
import { singleMessagePromise } from "./streamingReceiver.spec";
const should = chai.should();
chai.use(chaiAsPromised);

describe("Streaming with sessions", () => {
  let sender: Sender;
  let receiver: SessionReceiver<ReceivedMessageWithLock> | SessionReceiver<ReceivedMessage>;
  let deadLetterReceiver: Receiver<ReceivedMessageWithLock>;
  let errorWasThrown: boolean;
  let unexpectedError: Error | undefined;
  let serviceBusClient: ServiceBusClientForTests;
  let testClientType = getRandomTestClientTypeWithSessions();

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
  async function beforeEachTest(
    receiveMode?: "peekLock" | "receiveAndDelete"
  ): Promise<EntityName> {
    const entityNames = await createReceiverForTests(testClientType, receiveMode);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);

    errorWasThrown = false;
    unexpectedError = undefined;
    return entityNames;
  }

  async function createReceiverForTests(
    testClientType: TestClientType,
    receiveMode?: "peekLock" | "receiveAndDelete"
  ) {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);
    receiver = serviceBusClient.test.addToCleanup(
      receiveMode === "receiveAndDelete"
        ? entityNames.queue
          ? await serviceBusClient.createSessionReceiver(entityNames.queue, "receiveAndDelete", {
              sessionId: TestMessage.sessionId
            })
          : await serviceBusClient.createSessionReceiver(
              entityNames.topic!,
              entityNames.subscription!,
              "receiveAndDelete",
              {
                // TODO: we should just be able to randomly generate this. Change _soon_.
                sessionId: TestMessage.sessionId
              }
            )
        : entityNames.queue
        ? await serviceBusClient.createSessionReceiver(entityNames.queue, "peekLock", {
            sessionId: TestMessage.sessionId
          })
        : await serviceBusClient.createSessionReceiver(
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

  it(
    testClientType + ": Streaming - stop a message subscription without closing the receiver",
    async () => {
      const entities = await serviceBusClient.test.createTestEntities(testClientType);

      const sender = await serviceBusClient.test.createSender(entities);
      await sender.sendMessages({
        body: ".close() test - first message",
        sessionId: TestMessage.sessionId
      });

      const actualReceiver = await serviceBusClient.test.getSessionPeekLockReceiver(entities, {
        sessionId: TestMessage.sessionId
      });
      const { subscriber, messages } = await singleMessagePromise(actualReceiver);

      messages.map((m) => m.body).should.deep.equal([".close() test - first message"]);

      // now we're going to shut down the closeable (ie, subscription). This leaves
      // the receiver open but it does drain it (so any remaining messages are delivered
      // and will still be settleable).
      await subscriber.close();

      await messages[0].complete();
      messages.pop();

      await sender.sendMessages({
        body: ".close test - second message, after closing",
        sessionId: TestMessage.sessionId
      });

      // the subscription is closed so no messages should be received here.
      await delay(2000);

      messages.map((m) => m.body).should.deep.equal([]);

      await actualReceiver.close(); // release the session lock

      const receiver2 = await serviceBusClient.test.getReceiveAndDeleteReceiver(entities);

      // clean out the remaining message that never arrived.
      const [finalMessage] = await receiver2.receiveMessages(1, { maxWaitTimeInMs: 5000 });
      finalMessage.body.should.equal(".close test - second message, after closing");

      await serviceBusClient.test.afterEach();
    }
  );

  describe(testClientType + ": Sessions Streaming - Misc Tests", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    it("AutoComplete removes the message(with sessions)", async function(): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      const receivedMsgs: ReceivedMessage[] = [];
      receiver.subscribe({
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
      await testPeekMsgsLength(receiver, 0);
    });

    it("Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
      void
    > {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);
      const receivedMsgs: ReceivedMessageWithLock[] = [];
      receiver.subscribe(
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

      await testPeekMsgsLength(receiver, 1);

      await receivedMsgs[0].complete();

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      await testPeekMsgsLength(receiver, 0);
    });
  });

  describe(testClientType + ": Sessions Streaming - Complete message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testComplete(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      const receivedMsgs: ReceivedMessageWithLock[] = [];
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
        { autoComplete }
      );

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
      should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

      await testPeekMsgsLength(receiver, 0);
    }
    it("complete() removes message(with sessions)", async function(): Promise<void> {
      await testComplete(false);
    });

    it("with autoComplete: complete() removes message(with sessions)", async function(): Promise<
      void
    > {
      await testComplete(true);
    });
  });

  describe(testClientType + ": Sessions Streaming - Abandon message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });
    async function eachTest(autoComplete: boolean) {
      await beforeEachTest();
      await testAbandon(testClientType, autoComplete);
    }
    async function testAbandon(
      testClientType: TestClientType,
      autoComplete: boolean
    ): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);
      let abandonFlag = 0;

      receiver.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            return msg.abandon().then(() => {
              abandonFlag = 1;
              if (
                (receiver as SessionReceiverImpl<ReceivedMessageWithLock>)["_isReceivingMessages"]()
              ) {
                return receiver.close();
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

      if ((receiver as SessionReceiverImpl<ReceivedMessageWithLock>)["_isReceivingMessages"]()) {
        await receiver.close();
      }

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      await createReceiverForTests(testClientType);

      const receivedMsgs = await receiver.receiveMessages(1);
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        receivedMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
      await (receivedMsgs[0] as ReceivedMessageWithLock).complete();
      await testPeekMsgsLength(receiver, 0);
    }
    it("abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(false);
    });

    it("with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
      void
    > {
      await eachTest(true);
    });
  });

  describe(testClientType + ": Sessions Streaming - Defer message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testDefer(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      let sequenceNum: any = 0;
      receiver.subscribe(
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

      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNum);
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

      await (deferredMsg as ReceivedMessageWithLock).complete();
      await testPeekMsgsLength(receiver, 0);
    }
    it("defer() moves message to deferred queue(with sessions)", async function(): Promise<void> {
      await testDefer(false);
    });

    it("with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
      void
    > {
      await testDefer(true);
    });
  });

  describe(testClientType + ": Sessions Streaming - Deadletter message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testDeadletter(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      let msgCount = 0;
      receiver.subscribe(
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
      await testPeekMsgsLength(receiver, 0);

      const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);
      should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
      should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await deadLetterMsgs[0].complete();
      await testPeekMsgsLength(deadLetterReceiver, 0);
    }

    it("deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
      await testDeadletter(false);
    });

    it("with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
      void
    > {
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
        receiver.entityPath,
        TestMessage.sessionId
      );
      receiver.subscribe({
        async processMessage(msg: ReceivedMessageWithLock) {
          return msg.complete();
        },
        processError
      });
      await delay(5000);
      try {
        receiver.subscribe({
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
        await receiver.receiveMessages(1);
      } catch (err) {
        errorMessage = err && err.message;
      }
      should.equal(
        errorMessage,
        expectedErrorMessage,
        "Unexpected error message for receiveMessages"
      );
    }

    it(
      testClientType +
        ": Second receive operation should fail if the first streaming receiver is not stopped(with sessions)",
      async function(): Promise<void> {
        await beforeEachTest();
        await testMultipleReceiveCalls();
      }
    );
  });

  describe(
    testClientType + ": Sessions Streaming - Settle an already Settled message throws error",
    () => {
      afterEach(async () => {
        await afterEachTest();
      });

      beforeEach(async () => {
        await beforeEachTest();
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
        await sender.sendMessages(testMessage);

        const receivedMsgs: ReceivedMessageWithLock[] = [];
        receiver.subscribe({
          async processMessage(msg: ReceivedMessageWithLock) {
            receivedMsgs.push(msg);
            return Promise.resolve();
          },
          processError
        });

        const msgsCheck = await checkWithTimeout(
          () =>
            receivedMsgs.length === 1 &&
            getDeliveryProperty(receivedMsgs[0]).remote_settled === true
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

        await testPeekMsgsLength(receiver, 0);

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

      it("complete() throws error(with sessions)", async function(): Promise<void> {
        await testSettlement(DispositionType.complete);
      });

      it("abandon() throws error(with sessions)", async function(): Promise<void> {
        await testSettlement(DispositionType.abandon);
      });

      it("defer() throws error(with sessions)", async function(): Promise<void> {
        await testSettlement(DispositionType.defer);
      });

      it("deadLetter() throws error(with sessions)", async function(): Promise<void> {
        await testSettlement(DispositionType.deadletter);
      });
    }
  );

  describe("Sessions Streaming - User Error", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testUserError(): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);
      const errorMessage = "Will we see this error message?";

      const receivedMsgs: ReceivedMessageWithLock[] = [];
      receiver.subscribe({
        async processMessage(msg: ReceivedMessageWithLock) {
          await msg.complete();
          receivedMsgs.push(msg);
          throw new Error(errorMessage);
        },
        processError
      });

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);

      should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages.`);
      await receiver.close();

      should.equal(
        unexpectedError && unexpectedError.message,
        errorMessage,
        "User error did not surface."
      );
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    }

    it(
      testClientType + ": onError handler is called for user error(with sessions)",
      async function(): Promise<void> {
        await beforeEachTest();
        await testUserError();
      }
    );
  });

  describe(testClientType + ": Sessions Streaming - maxConcurrentCalls", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    beforeEach(async () => {
      await beforeEachTest();
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
      const batchMessageToSend = await sender.createBatch();
      for (const message of testMessages) {
        batchMessageToSend.tryAdd(message);
      }
      await sender.sendMessages(batchMessageToSend);

      const settledMsgs: ReceivedMessageWithLock[] = [];
      const receivedMsgs: ReceivedMessageWithLock[] = [];

      receiver.subscribe(
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
      await receiver.close();

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(settledMsgs.length, 2, `Expected 2, received ${settledMsgs.length} messages.`);
    }

    it("no maxConcurrentCalls passed(with sessions)", async function(): Promise<void> {
      await testConcurrency();
    });

    it("pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<void> {
      await testConcurrency(1);
    });

    it("pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<void> {
      await testConcurrency(2);
    });
  });

  describe("Sessions Streaming - Not receive messages after receiver is closed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testReceiveMessages(entityNames: EntityName): Promise<void> {
      const totalNumOfMessages = 5;
      let num = 1;
      const messages = [];
      const batch = await sender.createBatch();
      while (num <= totalNumOfMessages) {
        const message = {
          messageId: num,
          body: "test",
          label: `${num}`,
          sessionId: TestMessage.sessionId,
          partitionKey: TestMessage.sessionId // Ensures all messages go to same partition to make peek work reliably
        };
        num++;
        messages.push(message);
        batch.tryAdd(message);
      }
      await sender.sendMessages(batch);

      const receivedMsgs: ReceivedMessageWithLock[] = [];

      receiver.subscribe(
        {
          async processMessage(brokeredMessage: ReceivedMessageWithLock) {
            receivedMsgs.push(brokeredMessage);
            await brokeredMessage.complete();
          },
          processError
        },
        {
          autoComplete: false
        }
      );
      await receiver.close();

      await delay(5000);
      should.equal(
        receivedMsgs.length,
        0,
        `Expected 0 messages, but received ${receivedMsgs.length}`
      );
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);
      await testPeekMsgsLength(receiver, totalNumOfMessages);
    }

    it(
      testClientType + ": Not receive messages after receiver is closed",
      async function(): Promise<void> {
        const entityNames = await beforeEachTest();
        await testReceiveMessages(entityNames);
      }
    );

    it(
      testClientType + ": (Receive And Delete mode) Not receive messages after receiver is closed",
      async function(): Promise<void> {
        const entityNames = await beforeEachTest("receiveAndDelete");
        await testReceiveMessages(entityNames);
      }
    );
  });
});
