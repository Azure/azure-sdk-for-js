// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceivedMessage, delay } from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import { TestMessage, checkWithTimeout, TestClientType } from "./utils/testUtils";
import { StreamingReceiver } from "../src/core/streamingReceiver";

import {
  DispositionType,
  InternalReceiveMode,
  ReceivedMessageWithLock,
  ServiceBusMessageImpl
} from "../src/serviceBusMessage";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  drainReceiveAndDeleteReceiver,
  testPeekMsgsLength,
  getRandomTestClientTypeWithNoSessions
} from "./utils/testutils2";
import { getDeliveryProperty } from "./utils/misc";
import { MessagingError, translate } from "@azure/core-amqp";
import { verifyMessageCount } from "./utils/managementUtils";

const should = chai.should();
chai.use(chaiAsPromised);

let errorWasThrown: boolean;
let unexpectedError: Error | undefined;
const maxDeliveryCount = 10;
const testClientType = getRandomTestClientTypeWithNoSessions();

async function processError(err: Error): Promise<void> {
  if (err) {
    unexpectedError = err;
  }
}

describe("Streaming Receiver Tests", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock> | Receiver<ReceivedMessage>;
  let deadLetterReceiver: Receiver<ReceivedMessageWithLock>;
  let entityNames: EntityName;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(receiveMode?: "peekLock" | "receiveAndDelete"): Promise<void> {
    entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    if (receiveMode === "receiveAndDelete") {
      receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entityNames);
    } else {
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    }
    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);

    errorWasThrown = false;
    unexpectedError = undefined;
  }

  describe(testClientType + ": Streaming - Misc Tests", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    it("AutoComplete removes the message", async function(): Promise<void> {
      const testMessage = TestMessage.getSample();
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
        },
        processError
      });

      const msgsCheck = await checkWithTimeout(
        () =>
          receivedMsgs.length === 1 &&
          (receivedMsgs[0] as ServiceBusMessageImpl).delivery.remote_settled === true
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

    it("Disabled autoComplete, no manual complete retains the message", async function(): Promise<
      void
    > {
      const testMessage = TestMessage.getSample();
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
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

      await receivedMsgs[0].complete();

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      await testPeekMsgsLength(receiver, 0);
    });

    it("onDetached should forward error messages if it fails to retry", async function(): Promise<
      void
    > {
      let streamingReceiver: StreamingReceiver | undefined;
      try {
        let actualError: Error | undefined;
        streamingReceiver = await StreamingReceiver.create((receiver as any)._context, {
          receiveMode: InternalReceiveMode.peekLock
        });

        streamingReceiver.subscribe(
          async () => {},
          (err) => {
            actualError = err;
          }
        );

        // overwrite _init to throw a non-retryable error.
        // this will be called by onDetached
        (streamingReceiver as any).init = async () => {
          const error = new Error("Expected test error!");
          // prevent retry from translating error.
          (error as any).translated = true;
          throw error;
        };

        // call detached directly
        await streamingReceiver.onDetached();

        should.equal(
          actualError!.message,
          "Expected test error!",
          "Did not see the expected error in user-provided error handler."
        );
      } finally {
        if (streamingReceiver) {
          await streamingReceiver.close();
        }
      }
    });

    it("can stop and start a subscription", async () => {
      const entities = await serviceBusClient.test.createTestEntities(
        TestClientType.UnpartitionedQueue
      );

      const sender = await serviceBusClient.test.createSender(entities);
      const receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entities);

      await sender.sendMessages({
        body: "can stop and start a subscription message 1"
      });

      const { subscription, msg } = await new Promise<{
        subscription: { close(): Promise<void> };
        msg: string;
      }>((resolve, reject) => {
        const subscription = receiver.subscribe({
          processMessage: async (msg) => {
            resolve({ subscription, msg: msg.body });
          },
          processError: async (err) => {
            reject(err);
          }
        });
      });

      msg.should.equal("can stop and start a subscription message 1");
      await subscription.close();

      await sender.sendMessages({
        body: "can stop and start a subscription message 2"
      });

      const { subscription: subscription2, msg: msg2 } = await new Promise<{
        subscription: { close(): Promise<void> };
        msg: string;
      }>((resolve, reject) => {
        const subscription = receiver.subscribe({
          processMessage: async (msg) => {
            resolve({ subscription, msg: msg.body });
          },
          processError: async (err) => {
            reject(err);
          }
        });
      });

      msg2.should.equal("can stop and start a subscription message 2");
      await subscription2.close();
    });
  });

  describe(testClientType + ": Streaming - Complete message", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testComplete(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSample();
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
    it("complete() removes message", async function(): Promise<void> {
      await testComplete(false);
    });

    it("with autoComplete: complete() removes message", async function(): Promise<void> {
      await testComplete(true);
    });
  });

  describe(testClientType + ": Streaming - Abandon message", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    it("Multiple abandons until maxDeliveryCount", async function(): Promise<void> {
      const testMessage = TestMessage.getSample();
      await sender.sendMessages(testMessage);

      let checkDeliveryCount = 0;

      receiver.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            should.equal(
              msg.deliveryCount,
              checkDeliveryCount,
              "DeliveryCount is different than expected"
            );
            await msg.abandon();
            checkDeliveryCount++;
          },
          processError
        },
        { autoComplete: false }
      );

      const deliveryCountFlag = await checkWithTimeout(
        () => checkDeliveryCount === maxDeliveryCount
      );
      should.equal(deliveryCountFlag, true, "DeliveryCount is different than expected");

      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

      await testPeekMsgsLength(receiver, 0); // No messages in the queue

      const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);
      should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
      should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgs[0].deliveryCount,
        maxDeliveryCount,
        "DeliveryCount is different than expected"
      );
      should.equal(
        deadLetterMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await deadLetterMsgs[0].complete();

      await testPeekMsgsLength(deadLetterReceiver, 0);
    });
  });

  describe(testClientType + ": Streaming - Defer message", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testDefer(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSample();
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
      const deferredMsgs = await receiver.receiveDeferredMessages([sequenceNum]);
      if (!deferredMsgs) {
        throw "No message received for sequence number";
      }

      should.equal(
        deferredMsgs[0].body,
        testMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deferredMsgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(deferredMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");

      await (deferredMsgs[0] as ReceivedMessageWithLock).complete();
      await testPeekMsgsLength(receiver, 0);
    }

    it("defer() moves message to deferred queue", async function(): Promise<void> {
      await testDefer(false);
    });

    it("with autoComplete: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await testDefer(true);
    });
  });

  describe(testClientType + ": Streaming - Deadletter message", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testDeadletter(autoComplete: boolean): Promise<void> {
      const testMessage = TestMessage.getSample();
      await sender.sendMessages(testMessage);

      const receivedMsgs: ReceivedMessage[] = [];

      receiver.subscribe(
        {
          async processMessage(msg: ReceivedMessageWithLock) {
            await msg.deadLetter();
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

    it("deadLetter() moves message to deadletter queue", async function(): Promise<void> {
      await testDeadletter(false);
    });

    it("with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await testDeadletter(true);
    });
  });

  describe(testClientType + ": Streaming - Multiple Receiver Operations", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    async function testMultipleReceiveCalls(): Promise<void> {
      let errorMessage;
      const expectedErrorMessage = getAlreadyReceivingErrorMsg(receiver.entityPath);

      receiver.subscribe({
        async processMessage(msg: ReceivedMessageWithLock) {
          await msg.complete();
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

    it("Second receive operation should fail if the first streaming receiver is not stopped", async function(): Promise<
      void
    > {
      await beforeEachTest();
      await testMultipleReceiveCalls();
    });
  });

  describe(testClientType + ": Streaming - Settle an already Settled message throws error", () => {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
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
      const testMessage = TestMessage.getSample();
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

    it("complete() throws error", async function(): Promise<void> {
      await testSettlement(DispositionType.complete);
    });

    it("abandon() throws error", async function(): Promise<void> {
      await testSettlement(DispositionType.abandon);
    });

    it("defer() throws error", async function(): Promise<void> {
      await testSettlement(DispositionType.defer);
    });

    it("deadLetter() throws error", async function(): Promise<void> {
      await testSettlement(DispositionType.deadletter);
    });
  });

  describe("Streaming - User Error", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    async function testUserError(): Promise<void> {
      await sender.sendMessages(TestMessage.getSample());
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
      should.equal(
        !!(receiver as any)._context.streamingReceiver,
        true,
        "Expected streaming receiver not to be cached."
      );

      should.equal(
        unexpectedError && unexpectedError.message,
        errorMessage,
        "User error did not surface."
      );
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    }

    it(testClientType + ": onError handler is called for user error", async function(): Promise<
      void
    > {
      await beforeEachTest();
      await testUserError();
    });
  });

  // describe("Streaming - Failed init should not cache receiver", function(): void {
  //   afterEach(async () => {
  //     return serviceBusClient.test.afterEach();
  //   });

  // class TestTokenCredential extends EnvironmentCredential implements TokenCredential {
  //   private firstCall = true;
  //   static errorMessage = "This is a faulty token provider.";
  //   constructor() {
  //     super();
  //   }

  //   async getToken(audience: string): Promise<AccessToken | null> {
  //     if (this.firstCall) {
  //       this.firstCall = false;
  //       throw new Error(TestTokenCredential.errorMessage);
  //     }
  //     return super.getToken(audience);
  //   }
  // }

  // TODO: what is this test even actually testing?
  // it("UnPartitioned Queue: Receiver is not cached when not initialized", async function(): Promise<
  //   void
  // > {
  //   const env: any = getEnvVars();

  //   // Send a message using service bus client created with connection string
  //   let clients = await getSenderReceiverClients(TestClientType.UnpartitionedQueue, "peekLock");
  //   sender = clients.sender;
  //   receiver = clients.receiver;
  //   await sender.send(TestMessage.getSample());
  //   await sender.close();
  //   await receiver.close();

  //   // Receive using service bus client created with faulty token provider
  //   const connectionObject: {
  //     Endpoint: string;
  //     SharedAccessKeyName: string;
  //     SharedAccessKey: string;
  //   } = parseConnectionString(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
  //   const tokenProvider = new TestTokenCredential();
  //   receiver = new ServiceBusReceiverClient(
  //     {
  //       host: connectionObject.Endpoint.substr(5),
  //       tokenCredential: tokenProvider,
  //       queueName: EntityNames.QUEUE_NAME_NO_PARTITION
  //     },
  //     "peekLock"
  //   );

  //   let actualError: Error;
  //   receiver.subscribe({
  //     async processMessage(msg: ReceivedMessage) {
  //       throw new Error("No messages should have been received with faulty token provider");
  //     },
  //     async processError(err) {
  //       actualError = err;
  //     }
  //   });

  //   // Check for expected error and that receiver was not cached
  //   const errCheck = await checkWithTimeout(() => !!actualError === true);
  //   should.equal(errCheck, true, "Expected error to be thrown, but no error found.");
  //   should.equal(
  //     actualError!.message,
  //     TestTokenCredential.errorMessage,
  //     "Expected error from token provider, but unexpected error found."
  //   );
  //   should.equal(
  //     !!(clients.receiver as any)._context.streamingReceiver,
  //     false,
  //     "Expected Streaming receiver to not be cached"
  //   );
  // });
  // });

  describe(testClientType + ": Streaming - maxConcurrentCalls", function(): void {
    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    beforeEach(async () => {
      await beforeEachTest();
    });

    async function testConcurrency(maxConcurrentCalls?: number): Promise<void> {
      const testMessages = [TestMessage.getSample(), TestMessage.getSample()];
      const batchMessageToSend = await sender.createBatch();
      testMessages.forEach((message) => {
        batchMessageToSend.tryAdd(message);
      });
      await sender.sendMessages(batchMessageToSend);

      const settledMsgs: ReceivedMessage[] = [];
      const receivedMsgs: ReceivedMessage[] = [];

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
              if (maxConcurrentCalls && maxConcurrentCalls > 1 && settledMsgs.length !== 0) {
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
        maxConcurrentCalls ? { maxConcurrentCalls } : {}
      );

      await checkWithTimeout(() => settledMsgs.length === 2);
      should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
      should.equal(settledMsgs.length, 2, `Expected 2, received ${settledMsgs.length} messages.`);
    }

    it("no maxConcurrentCalls passed", async function(): Promise<void> {
      await testConcurrency();
    });

    it("pass 1 for maxConcurrentCalls", async function(): Promise<void> {
      await testConcurrency(1);
    });

    it("pass 2 for maxConcurrentCalls", async function(): Promise<void> {
      await testConcurrency(2);
    });
  });

  describe("Streaming - Not receive messages after receiver is closed", function(): void {
    async function testReceiveMessages(): Promise<void> {
      const totalNumOfMessages = 5;
      let num = 1;
      const messages = [];
      const batch = await sender.createBatch();
      while (num <= totalNumOfMessages) {
        const message = {
          messageId: num,
          body: "test",
          label: `${num}`,
          partitionKey: "dummy" // Ensures all messages go to same partition to make peek work reliably
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
      receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entityNames);
      await verifyMessageCount(
        totalNumOfMessages,
        entityNames.queue,
        entityNames.topic,
        entityNames.subscription
      );
      await drainReceiveAndDeleteReceiver(receiver);
      await verifyMessageCount(0, entityNames.queue, entityNames.topic, entityNames.subscription);
    }

    it(
      testClientType + ": Not receive messages after receiver is closed",
      async function(): Promise<void> {
        await beforeEachTest();
        await testReceiveMessages();
      }
    );

    it(
      testClientType + ": (Receive And Delete mode) Not receive messages after receiver is closed",
      async function(): Promise<void> {
        await beforeEachTest("receiveAndDelete");
        await testReceiveMessages();
      }
    );
  });

  it(
    testClientType + ": Streaming - stop a message subscription without closing the receiver",
    async () => {
      const entities = await serviceBusClient.test.createTestEntities(testClientType);

      const actualReceiver = await serviceBusClient.test.getPeekLockReceiver(entities);
      const receiver2 = await serviceBusClient.test.getReceiveAndDeleteReceiver(entities);
      const sender = await serviceBusClient.test.createSender(entities);

      await sender.sendMessages({ body: ".close() test - first message" });

      const { subscriber, messages } = await singleMessagePromise(actualReceiver);

      messages.map((m) => m.body).should.deep.equal([".close() test - first message"]);

      // now we're going to shut down the closeable (ie, subscription). This leaves
      // the receiver open but it does drain it (so any remaining messages are delivered
      // and will still be settleable).
      await subscriber.close();

      await messages[0].complete();
      messages.pop();

      await sender.sendMessages({
        body: ".close test - second message, after closing"
      });

      // the subscription is closed so no messages should be received here.
      await delay(2000);

      messages.map((m) => m.body).should.deep.equal([]);

      // clean out the remaining message that never arrived.
      const [finalMessage] = await receiver2.receiveMessages(1, { maxWaitTimeInMs: 5000 });
      finalMessage.body.should.equal(".close test - second message, after closing");

      await serviceBusClient.test.afterEach();
    }
  );
});

describe(testClientType + ": Streaming - onDetached", function(): void {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock> | Receiver<ReceivedMessage>;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(receiveMode?: "peekLock" | "receiveAndDelete"): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    if (receiveMode === "receiveAndDelete") {
      receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entityNames);
    } else {
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    }
    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    errorWasThrown = false;
    unexpectedError = undefined;
  }

  afterEach(async () => {
    return serviceBusClient.test.afterEach();
  });

  it("doesn't call user's error handler on non-retryable errors", async function(): Promise<void> {
    /**
     * If onDetached is called with a non-retryable error, it is assumed that
     * the onSessionError or onAmqpError has already called the user's
     * error handler.
     */
    // Create the sender and receiver.
    await beforeEachTest("receiveAndDelete");
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.subscribe({
      async processMessage() {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      async processError(err) {
        receivedErrors.push(err);
      }
    });

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called with a non-retryable error.
    const nonRetryableError = translate(new Error(`I break systems.`));
    (nonRetryableError as MessagingError).retryable = false;
    await (receiver as any)["_context"].streamingReceiver!.onDetached(nonRetryableError);

    receivedErrors.length.should.equal(0, "Unexpected number of errors received.");
  });

  it("does call user's error handler on non-retryable errors due to disconnect", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest("receiveAndDelete");
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.subscribe({
      async processMessage() {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      async processError(err) {
        receivedErrors.push(err);
      }
    });

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called with a non-retryable error.
    const nonRetryableError = new MessagingError(`I break systems.`);
    (nonRetryableError as MessagingError).retryable = false;
    await (receiver as any)["_context"].streamingReceiver!.onDetached(nonRetryableError, true);

    receivedErrors.length.should.equal(1, "Unexpected number of errors received.");
  });

  it("doesn't call user's error handler multiple times (disconnect)", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest("receiveAndDelete");
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.subscribe({
      async processMessage() {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      async processError(err) {
        receivedErrors.push(err);
      }
    });

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called multiple times with non-retryable errors.
    const nonRetryableError = new MessagingError(`I break systems.`);
    (nonRetryableError as MessagingError).retryable = false;
    await Promise.all([
      (receiver as any)["_context"].streamingReceiver!.onDetached(nonRetryableError, true),
      (receiver as any)["_context"].streamingReceiver!.onDetached(nonRetryableError, true)
    ]);

    receivedErrors.length.should.equal(1, "Unexpected number of errors received.");
  });

  it("doesn't call user's error handler multiple times (retryable)", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest("receiveAndDelete");
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.subscribe({
      async processMessage() {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      async processError(err) {
        receivedErrors.push(err);
      }
    });

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called multiple times with non-retryable and then retryable errors.
    const nonRetryableError = new MessagingError(`I break systems.`);
    (nonRetryableError as MessagingError).retryable = false;
    const retryableError = new Error("I temporarily break systems.");
    (retryableError as any).retryable = true;
    await Promise.all([
      (receiver as any)["_context"].streamingReceiver!.onDetached(nonRetryableError, true),
      (receiver as any)["_context"].streamingReceiver!.onDetached(retryableError)
    ]);

    receivedErrors.length.should.equal(1, "Unexpected number of errors received.");
  });
});

describe(testClientType + ": Streaming - disconnects", function(): void {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock> | Receiver<ReceivedMessage>;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    /**
     * If onDetached is called with a non-retryable error, it is assumed that
     * the onSessionError or onAmqpError has already called the user's
     * error handler.
     */
    // Create the sender and receiver.
    await beforeEachTest();
    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(TestMessage.getSample());
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
      async processMessage(message: ReceivedMessageWithLock) {
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

    // send a second message to trigger the message handler again.
    await sender.sendMessages(TestMessage.getSample());

    // wait for the 2nd message to be received.
    await receiverSecondMessage;
    settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");
    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});

export function singleMessagePromise(
  receiver: Receiver<ReceivedMessageWithLock>
): Promise<{
  subscriber: ReturnType<Receiver<unknown>["subscribe"]>;
  messages: ReceivedMessageWithLock[];
}> {
  const messages: ReceivedMessageWithLock[] = [];

  return new Promise<{
    subscriber: ReturnType<Receiver<unknown>["subscribe"]>;
    messages: ReceivedMessageWithLock[];
  }>((resolve, reject) => {
    const subscriber = receiver.subscribe(
      {
        processMessage: async (message) => {
          messages.push(message);
          resolve({ subscriber, messages });
        },
        processError: async (err) => {
          reject(err);
        }
      },
      {
        autoComplete: false
      }
    );
  });
}
