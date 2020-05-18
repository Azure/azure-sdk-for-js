// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
import chaiAsPromised from "chai-as-promised";
import { delay, ServiceBusMessage } from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { AbortController } from "@azure/abort-controller";
import { isNode } from "@azure/core-amqp";

const should = chai.should();
chai.use(chaiAsPromised);

describe("batchReceiver", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let errorWasThrown: boolean;

  let senderClient: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let deadLetterClient: Receiver<ReceivedMessageWithLock>;
  const maxDeliveryCount = 10;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    senderClient = serviceBusClient.test.addToCleanup(
      await serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterClient = serviceBusClient.test.createDeadLetterReceiver(entityNames);
  }

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }

  describe("Batch Receiver - Settle message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(
      testMessages: ServiceBusMessage
    ): Promise<ReceivedMessageWithLock> {
      await senderClient.send(testMessages);
      const msgs = await receiver.receiveBatch(1);

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

      return msgs[0];
    }

    async function testComplete(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);

      await msg.complete();

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testComplete();
    });

    it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testComplete();
    });

    it("Unpartitioned Queue: complete() removes message ", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testComplete();
    });

    it("Unpartitioned Subscription: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testComplete();
    });

    it("Partitioned Queue with Sessions: complete() removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testComplete(true);
    });

    it("Partitioned Subscription with Sessions: complete() removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testComplete(true);
    });

    it("Unpartitioned Queue with Sessions: complete() removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testComplete(true);
    });

    it("Unpartitioned Subscription with Sessions: complete() removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testComplete(true);
    });

    async function testAbandon(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);
      await msg.abandon();

      await testPeekMsgsLength(receiver, 1);

      const messageBatch = await receiver.receiveBatch(1);

      should.equal(messageBatch.length, 1, "Unexpected number of messages");
      should.equal(messageBatch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        messageBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await messageBatch[0].complete();

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testAbandon();
    });

    it("Partitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testAbandon();
    });

    it("Unpartitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testAbandon();
    });

    it("Unpartitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testAbandon();
    });

    it("Partitioned Queue with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testAbandon(true);
    });

    it("Partitioned Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testAbandon(true);
    });

    it("Unpartitioned Queue with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testAbandon(true);
    });

    it("Unpartitioned Subscription with Sessions: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testAbandon(true);
    });

    async function testAbandonMsgsTillMaxDeliveryCount(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await senderClient.send(testMessages);
      let abandonMsgCount = 0;

      while (abandonMsgCount < maxDeliveryCount) {
        const batch = await receiver.receiveBatch(1);

        should.equal(batch.length, 1, "Unexpected number of messages");
        should.equal(
          batch[0].messageId,
          testMessages.messageId,
          "MessageId is different than expected"
        );
        should.equal(
          batch[0].deliveryCount,
          abandonMsgCount,
          "DeliveryCount is different than expected"
        );
        abandonMsgCount++;

        await batch[0].abandon();
      }

      await testPeekMsgsLength(receiver, 0);

      const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

      should.equal(
        Array.isArray(deadLetterMsgsBatch),
        true,
        "`ReceivedMessages` from Deadletter is not an array"
      );
      should.equal(deadLetterMsgsBatch.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgsBatch[0].body,
        testMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await deadLetterMsgsBatch[0].complete();

      await testPeekMsgsLength(deadLetterClient, 0);
    }

    it("Partitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testAbandonMsgsTillMaxDeliveryCount();
    });

    it("Partitioned Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testAbandonMsgsTillMaxDeliveryCount();
    });

    it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testAbandonMsgsTillMaxDeliveryCount();
    });

    it("Unpartitioned Subscription: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testAbandonMsgsTillMaxDeliveryCount();
    });

    it("Partitioned Queue with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testAbandonMsgsTillMaxDeliveryCount(true);
    });

    it("Partitioned Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testAbandonMsgsTillMaxDeliveryCount(true);
    });

    it("Unpartitioned Queue with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testAbandonMsgsTillMaxDeliveryCount(true);
    });

    it("Unpartitioned Subscription with Sessions: Multiple abandons until maxDeliveryCount.", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testAbandonMsgsTillMaxDeliveryCount(true);
    });

    async function testDefer(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);

      if (!msg.sequenceNumber) {
        throw "Sequence Number can not be null";
      }
      const sequenceNumber = msg.sequenceNumber;
      await msg.defer();

      const deferredMsgs = await receiver.receiveDeferredMessage(sequenceNumber);
      if (!deferredMsgs) {
        throw "No message received for sequence number";
      }
      should.equal(deferredMsgs.body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        deferredMsgs.messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(deferredMsgs.deliveryCount, 1, "DeliveryCount is different than expected");

      await deferredMsgs.complete();

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testDefer();
    });

    it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testDefer();
    });

    it("Partitioned Queue with Sessions: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testDefer(true);
    });

    it("Partitioned Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testDefer(true);
    });

    it("Unpartitioned Queue: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testDefer();
    });

    it("Unpartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testDefer();
    });

    it("Unpartitioned Queue with Sessions: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testDefer(true);
    });

    it("Unpartitioned Subscription with Sessions: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testDefer(true);
    });

    async function testDeadletter(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);
      await msg.deadLetter();

      await testPeekMsgsLength(receiver, 0);

      const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

      should.equal(
        Array.isArray(deadLetterMsgsBatch),
        true,
        "`ReceivedMessages` from Deadletter is not an array"
      );
      should.equal(deadLetterMsgsBatch.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgsBatch[0].body,
        testMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await deadLetterMsgsBatch[0].complete();

      await testPeekMsgsLength(deadLetterClient, 0);
    }

    it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testDeadletter();
    });

    it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testDeadletter();
    });

    it("Unpartitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testDeadletter();
    });

    it("Unpartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testDeadletter();
    });

    it("Partitioned Queue with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testDeadletter(true);
    });

    it("Partitioned Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testDeadletter(true);
    });

    it("Unpartitioned Queue with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testDeadletter(true);
    });

    it("Unpartitioned Subscription with Sessions: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testDeadletter(true);
    });
  });

  describe("Batch Receiver - Settle deadlettered message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function deadLetterMessage(
      testMessage: ServiceBusMessage
    ): Promise<ReceivedMessageWithLock> {
      await senderClient.send(testMessage);
      const batch = await receiver.receiveBatch(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        batch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(batch[0].deliveryCount, 0, "DeliveryCount is different than expected");

      await batch[0].deadLetter();

      await testPeekMsgsLength(receiver, 0);

      const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

      should.equal(deadLetterMsgsBatch.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgsBatch[0].body,
        testMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].deliveryCount,
        0,
        "DeliveryCount is different than expected"
      );

      return deadLetterMsgsBatch[0];
    }

    async function completeDeadLetteredMessage(
      testMessage: ServiceBusMessage,
      deadletterClient: Receiver<ReceivedMessageWithLock>,
      expectedDeliverCount: number
    ): Promise<void> {
      const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

      should.equal(deadLetterMsgsBatch.length, 1, "Unexpected number of messages");
      should.equal(
        deadLetterMsgsBatch[0].body,
        testMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].deliveryCount,
        expectedDeliverCount,
        "DeliveryCount is different than expected"
      );

      await deadLetterMsgsBatch[0].complete();
      await testPeekMsgsLength(deadletterClient, 0);
    }

    async function testDeadletter(testMessage: ServiceBusMessage): Promise<void> {
      const deadLetterMsg = await deadLetterMessage(testMessage);

      await deadLetterMsg.deadLetter().catch((err) => {
        should.equal(err.code, "InvalidOperationError", "Error code is different than expected");
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");

      await completeDeadLetteredMessage(testMessage, deadLetterClient, 0);
    }

    it("Partitioned Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testDeadletter(TestMessage.getSample());
    });

    it("Partitioned Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testDeadletter(TestMessage.getSample());
    });

    it("Unpartitioned Queue: Throws error when dead lettering a dead lettered message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testDeadletter(TestMessage.getSample());
    });

    it("Unpartitioned Subscription: Throws error when dead lettering a dead lettered message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testDeadletter(TestMessage.getSample());
    });

    async function testAbandon(testMessage: ServiceBusMessage): Promise<void> {
      const deadLetterMsg = await deadLetterMessage(testMessage);

      await deadLetterMsg.abandon();

      await completeDeadLetteredMessage(testMessage, deadLetterClient, 0);
    }

    it("Partitioned Queue: Abandon a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testAbandon(TestMessage.getSample());
    });

    it("Partitioned Subscription: Abandon a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testAbandon(TestMessage.getSample());
    });

    it("Unpartitioned Queue: Abandon a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testAbandon(TestMessage.getSample());
    });

    it("Unpartitioned Subscription: Abandon a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testAbandon(TestMessage.getSample());
    });

    async function testDefer(testMessage: ServiceBusMessage): Promise<void> {
      const deadLetterMsg = await deadLetterMessage(testMessage);

      if (!deadLetterMsg.sequenceNumber) {
        throw "Sequence Number can not be null";
      }

      const sequenceNumber = deadLetterMsg.sequenceNumber;
      await deadLetterMsg.defer();

      const deferredMsgs = await deadLetterClient.receiveDeferredMessage(sequenceNumber);
      if (!deferredMsgs) {
        throw "No message received for sequence number";
      }
      should.equal(deferredMsgs.body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        deferredMsgs.messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await deferredMsgs.complete();

      await testPeekMsgsLength(receiver, 0);

      await testPeekMsgsLength(deadLetterClient, 0);
    }

    it("Partitioned Queue: Defer a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testDefer(TestMessage.getSample());
    });

    it("Partitioned Subscription: Defer a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testDefer(TestMessage.getSample());
    });

    it("Unpartitioned Queue: Defer a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testDefer(TestMessage.getSample());
    });

    it("Unpartitioned Subscription: Defer a message received from dead letter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testDefer(TestMessage.getSample());
    });
  });

  describe("Batch Receiver - Multiple Receiver Operations", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    // We use an empty queue/topic here so that the first receiveMessages call takes time to return
    async function testParallelReceiveCalls(useSessions?: boolean): Promise<void> {
      const firstBatchPromise = receiver.receiveBatch(1, { maxWaitTimeInMs: 10000 });
      await delay(5000);

      let errorMessage;
      const expectedErrorMessage = getAlreadyReceivingErrorMsg(
        receiver.entityPath,
        useSessions ? TestMessage.sessionId : undefined
      );

      try {
        await receiver.receiveBatch(1);
      } catch (err) {
        errorMessage = err && err.message;
      }
      should.equal(
        errorMessage,
        expectedErrorMessage,
        "Unexpected error message for receiveMessages"
      );

      let unexpectedError;
      try {
        receiver.subscribe({
          async processMessage(): Promise<void> {
            // process message here - it's basically a ServiceBusMessage minus any settlement related methods
          },
          async processError(err: Error): Promise<void> {
            unexpectedError = err;
          }
        });
      } catch (err) {
        errorMessage = err && err.message;
      }
      should.equal(
        errorMessage,
        expectedErrorMessage,
        "Unexpected error message for registerMessageHandler"
      );
      should.equal(
        unexpectedError,
        undefined,
        "Unexpected error found in errorHandler for registerMessageHandler"
      );

      await firstBatchPromise;
    }

    it("Unpartitioned Queue: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testParallelReceiveCalls();
    });

    it("Unpartitioned Queue with Sessions: Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testParallelReceiveCalls(true);
    });

    const messages: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
      }
    ];
    const messageWithSessions: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId
      }
    ];

    // We test for mutilple receiveMessages specifically to ensure that batchingRecevier on a client is reused
    // See https://github.com/Azure/azure-service-bus-node/issues/31
    async function testSequentialReceiveBatchCalls(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? messageWithSessions : messages;
      const batchMessageToSend = await senderClient.createBatch();
      for (const message of testMessages) {
        batchMessageToSend.tryAdd(message);
      }
      await senderClient.send(batchMessageToSend);
      const msgs1 = await receiver.receiveBatch(1);
      const msgs2 = await receiver.receiveBatch(1);

      // Results are checked after both receiveMessages are done to ensure that the second call doesnt
      // affect the result from the first one.
      should.equal(Array.isArray(msgs1), true, "`ReceivedMessages` is not an array");
      should.equal(msgs1.length, 1, "Unexpected number of messages");

      should.equal(Array.isArray(msgs2), true, "`ReceivedMessages` is not an array");
      should.equal(msgs2.length, 1, "Unexpected number of messages");

      should.equal(
        testMessages.some((x) => x.messageId === msgs1[0].messageId),
        true,
        "MessageId is different than expected"
      );
      should.equal(
        testMessages.some((x) => x.messageId === msgs2[0].messageId),
        true,
        "MessageId is different than expected"
      );

      await msgs1[0].complete();
      await msgs2[0].complete();
    }

    it("Unpartitioned Queue: Multiple sequential receiveMessages calls", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSequentialReceiveBatchCalls();
    });

    it("Unpartitioned Queue with Sessions: Multiple sequential receiveMessages calls", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSequentialReceiveBatchCalls(true);
    });
  });

  describe("Batch Receiver - Others", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testNoSettlement(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await senderClient.send(testMessages);

      let batch = await receiver.receiveBatch(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].deliveryCount, 0, "DeliveryCount is different than expected");
      should.equal(
        batch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await testPeekMsgsLength(receiver, 1);

      batch = await receiver.receiveBatch(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        batch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await batch[0].complete();
    }

    it("Partitioned Queue: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testNoSettlement();
    });

    it("Partitioned Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testNoSettlement();
    });

    it("Unpartitioned Queue: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testNoSettlement();
    });

    it("Unpartitioned Subscription: No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testNoSettlement();
    });

    async function testAskForMore(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await senderClient.send(testMessages);
      const batch = await receiver.receiveBatch(2);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        batch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await batch[0].complete();

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);

      await testAskForMore();
    });

    it("Partitioned Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);

      await testAskForMore();
    });

    it("Unpartitioned Queue: Receive n messages but queue only has m messages, where m < n ", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);

      await testAskForMore();
    });

    it("Unpartitioned Subscription: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);

      await testAskForMore();
    });

    it("Partitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testAskForMore(true);
    });

    it("Partitioned Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testAskForMore(true);
    });

    it("Unpartitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testAskForMore(true);
    });

    it("Unpartitioned Subscription with Sessions: Receive n messages but subscription only has m messages, where m < n", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testAskForMore(true);
    });
  });

  describe("Cancel operations on the receiver", function(): void {
    it("Abort receiveDeferredMessage request on the receiver", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
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

    it("Abort receiveDeferredMessages request on the receiver", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await receiver.receiveDeferredMessages([Long.ZERO], {
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal(
          "The receiveDeferredMessages operation has been cancelled by the user."
        );
      }
    });
  });
});

describe("Batching - disconnects", function(): void {
  let serviceBusClient: ServiceBusClientForTests;
  let senderClient: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    senderClient = serviceBusClient.test.addToCleanup(
      await serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }
  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  beforeEach(function() {
    if (!isNode) {
      // Skipping the "disconnect" tests in the browser since they fail.
      // More info - https://github.com/Azure/azure-sdk-for-js/pull/8664#issuecomment-622651713
      this.skip();
    }
  });
  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }
  afterEach(async () => {
    await afterEachTest();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue);

    // Send a message so we can be sure when the receiver is open and active.
    await senderClient.send(TestMessage.getSample());

    let settledMessageCount = 0;

    const messages1 = await receiver.receiveBatch(1, { maxWaitTimeInMs: 5000 });
    for (const message of messages1) {
      await message.complete();
      settledMessageCount++;
    }

    settledMessageCount.should.equal(1, "Unexpected number of settled messages.");

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
    await senderClient.send(TestMessage.getSample());

    // wait for the 2nd message to be received.
    const messages2 = await receiver.receiveBatch(1, { maxWaitTimeInMs: 5000 });
    for (const message of messages2) {
      await message.complete();
      settledMessageCount++;
    }
    settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});
