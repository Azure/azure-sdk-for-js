// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusMessage } from "../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";

const should = chai.should();
chai.use(chaiAsPromised);

describe("Backup message settlement - Through ManagementLink", () => {
  let serviceBusClient: ServiceBusClientForTests;

  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock>;
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
    receiverClient = serviceBusClient.test.getPeekLockReceiver(entityNames);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterClient = serviceBusClient.test.createDeadLetterReceiver(entityNames);
  }

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }

  describe("Settle Messages After Receiver Is Closed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(
      testMessages: ServiceBusMessage
    ): Promise<ReceivedMessageWithLock> {
      await senderClient.send(testMessages);
      const msgs = await receiverClient.receiveBatch(1);

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
      console.log(msg.lockToken);
      // await receiverClient.close();
      await msg.complete();

      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testComplete();
    });

    it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testComplete();
    });

    it("Unpartitioned Queue: complete() removes message #RunInBrowser ", async function(): Promise<
      void
    > {
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
      // await testComplete(true);
      const testMessages = TestMessage.getSessionSample();
      await senderClient.send(testMessages);
      let msgs = await receiverClient.receiveBatch(1);

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
      await msgs[0].defer();
      msgs = await receiverClient.receiveDeferredMessages([msgs[0].sequenceNumber!]);
      await msgs[0].complete();
    });

    it("Partitioned Subscription with Sessions: complete() removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testComplete(true);
    });

    it("Unpartitioned Queue with Sessions: complete() removes message #RunInBrowser", async function(): Promise<
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

      await testPeekMsgsLength(receiverClient, 1);

      const messageBatch = await receiverClient.receiveBatch(1);

      should.equal(messageBatch.length, 1, "Unexpected number of messages");
      should.equal(messageBatch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        messageBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await messageBatch[0].complete();

      await testPeekMsgsLength(receiverClient, 0);
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

    it("Unpartitioned Queue: abandon() retains message with incremented deliveryCount #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Queue with Sessions: abandon() retains message with incremented deliveryCount #RunInBrowser", async function(): Promise<
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
        const batch = await receiverClient.receiveBatch(1);

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

      await testPeekMsgsLength(receiverClient, 0);

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

      const deferredMsgs = await receiverClient.receiveDeferredMessage(sequenceNumber);
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

      await testPeekMsgsLength(receiverClient, 0);
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

    it("Unpartitioned Queue: defer() moves message to deferred queue #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Queue with Sessions: defer() moves message to deferred queue #RunInBrowser", async function(): Promise<
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

      await testPeekMsgsLength(receiverClient, 0);

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

    it("Unpartitioned Queue: deadLetter() moves message to deadletter queue #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Queue with Sessions: deadLetter() moves message to deadletter queue #RunInBrowser", async function(): Promise<
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
});
