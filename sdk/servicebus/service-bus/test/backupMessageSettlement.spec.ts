// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusMessage } from "../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { DispositionType, ReceivedMessageWithLock } from "../src/serviceBusMessage";

const should = chai.should();
chai.use(chaiAsPromised);

describe("Backup message settlement - Through ManagementLink", () => {
  let serviceBusClient: ServiceBusClientForTests;

  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let deadLetterReceiver: Receiver<ReceivedMessageWithLock>;
  let entityNames: EntityName;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);
  }

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }

  describe("Operations On Messages After Receiver Is Closed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(
      testMessages: ServiceBusMessage
    ): Promise<ReceivedMessageWithLock> {
      await sender.sendMessages(testMessages);
      const msgs = await receiver.receiveMessages(1);

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

    describe("Complete a message", function(): void {
      async function testComplete(): Promise<void> {
        const testMessages = entityNames.usesSessions
          ? TestMessage.getSessionSample()
          : TestMessage.getSample();
        const msg = await sendReceiveMsg(testMessages);
        await receiver.close();
        let errorWasThrown = false;
        try {
          await msg.complete();
        } catch (err) {
          should.equal(
            err.message,
            `Failed to ${DispositionType.complete} the message as the AMQP link with which the message was received is no longer alive.`,
            "Unexpected error thrown"
          );
          errorWasThrown = true;
        }

        receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
        if (entityNames.usesSessions) {
          should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
          const msgBatch = await receiver.receiveMessages(1);
          await msgBatch[0].complete();
        } else {
          should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
        }
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

      it("Partitioned Queue with Sessions: complete() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
        await testComplete();
      });

      it("Partitioned Subscription with Sessions: complete() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
        await testComplete();
      });

      it("Unpartitioned Queue with Sessions: complete() throws error #RunInBrowser", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
        await testComplete();
      });

      it("Unpartitioned Subscription with Sessions: complete() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
        await testComplete();
      });
    });

    describe("Abandon a message", function(): void {
      async function testAbandon(): Promise<void> {
        const testMessages = entityNames.usesSessions
          ? TestMessage.getSessionSample()
          : TestMessage.getSample();
        const msg = await sendReceiveMsg(testMessages);
        await receiver.close();
        let errorWasThrown = false;
        try {
          await msg.abandon();
        } catch (err) {
          should.equal(
            err.message,
            `Failed to ${DispositionType.abandon} the message as the AMQP link with which the message was received is no longer alive.`,
            "Unexpected error thrown"
          );
          errorWasThrown = true;
        }

        if (entityNames.usesSessions) {
          should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
        } else {
          should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
        }
        receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
        await testPeekMsgsLength(receiver, 1);

        const messageBatch = await receiver.receiveMessages(1);

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

      it("Partitioned Queue with Sessions: abandon() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
        await testAbandon();
      });

      it("Partitioned Subscription with Sessions: abandon() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
        await testAbandon();
      });

      it("Unpartitioned Queue with Sessions: abandon() throws error #RunInBrowser", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
        await testAbandon();
      });

      it("Unpartitioned Subscription with Sessions: abandon() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
        await testAbandon();
      });
    });

    describe("Defer a message", function(): void {
      async function testDefer(): Promise<void> {
        const testMessages = entityNames.usesSessions
          ? TestMessage.getSessionSample()
          : TestMessage.getSample();
        const msg = await sendReceiveMsg(testMessages);

        if (!msg.sequenceNumber) {
          throw "Sequence Number can not be null";
        }
        const sequenceNumber = msg.sequenceNumber;
        await receiver.close();
        let errorWasThrown = false;
        try {
          await msg.defer();
        } catch (err) {
          should.equal(
            err.message,
            `Failed to ${DispositionType.defer} the message as the AMQP link with which the message was received is no longer alive.`,
            "Unexpected error thrown"
          );
          errorWasThrown = true;
        }

        if (entityNames.usesSessions) {
          should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
        } else {
          should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
        }
        receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
        if (!entityNames.usesSessions) {
          const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
          if (!deferredMsg) {
            throw "No message received for sequence number";
          }
          await deferredMsg.complete();
        } else {
          const messageBatch = await receiver.receiveMessages(1);
          await messageBatch[0].complete();
        }
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

      it("Partitioned Queue with Sessions: defer() throws error", async function(): Promise<void> {
        await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
        await testDefer();
      });

      it("Partitioned Subscription with Sessions: defer() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
        await testDefer();
      });

      it("Unpartitioned Queue with Sessions: defer() throws error #RunInBrowser", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
        await testDefer();
      });

      it("Unpartitioned Subscription with Sessions: defer() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
        await testDefer();
      });
    });

    describe("Deadletter a message", function(): void {
      async function testDeadletter(useSessions?: boolean): Promise<void> {
        const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
        const msg = await sendReceiveMsg(testMessages);
        await receiver.close();
        let errorWasThrown = false;
        try {
          await msg.deadLetter();
        } catch (err) {
          should.equal(
            err.message,
            `Failed to ${DispositionType.deadletter} the message as the AMQP link with which the message was received is no longer alive.`,
            "Unexpected error thrown"
          );
          errorWasThrown = true;
        }

        if (entityNames.usesSessions) {
          should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
        } else {
          should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
        }

        receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

        if (!entityNames.usesSessions) {
          const deadLetterMsgsBatch = await deadLetterReceiver.receiveMessages(1);

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

          await testPeekMsgsLength(deadLetterReceiver, 0);
        } else {
          const messageBatch = await receiver.receiveMessages(1);
          await messageBatch[0].complete();

          await testPeekMsgsLength(receiver, 0);
        }
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

      it("Partitioned Queue with Sessions: deadLetter() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
        await testDeadletter(true);
      });

      it("Partitioned Subscription with Sessions: deadLetter() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
        await testDeadletter(true);
      });

      it("Unpartitioned Queue with Sessions: deadLetter() throws error #RunInBrowser", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
        await testDeadletter(true);
      });

      it("Unpartitioned Subscription with Sessions: deadLetter() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
        await testDeadletter(true);
      });
    });

    describe("Lock renewal for a message", function(): void {
      async function testRenewLock(): Promise<void> {
        const testMessages = entityNames.usesSessions
          ? TestMessage.getSessionSample()
          : TestMessage.getSample();
        const msg = await sendReceiveMsg(testMessages);
        await receiver.close();
        let errorWasThrown = false;
        try {
          const lockedUntilBeforeRenewlock = msg.lockedUntilUtc;
          const lockedUntilAfterRenewlock = await msg.renewLock();
          should.equal(
            lockedUntilAfterRenewlock > lockedUntilBeforeRenewlock!,
            true,
            "MessageLock did not get renewed!"
          );
          await msg.complete();
        } catch (err) {
          should.equal(
            err.message,
            `Invalid operation on the message, message lock doesn't exist when dealing with sessions`,
            "Unexpected error thrown"
          );
          errorWasThrown = true;
        }

        receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
        if (entityNames.usesSessions) {
          should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
          const msgBatch = await receiver.receiveMessages(1);
          await msgBatch[0].complete();
        } else {
          should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
        }
        await testPeekMsgsLength(receiver, 0);
      }

      it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
        await beforeEachTest(TestClientType.PartitionedQueue);
        await testRenewLock();
      });

      it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
        await beforeEachTest(TestClientType.PartitionedSubscription);
        await testRenewLock();
      });

      it("Unpartitioned Queue: complete() removes message #RunInBrowser ", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedQueue);
        await testRenewLock();
      });

      it("Unpartitioned Subscription: complete() removes message", async function(): Promise<void> {
        await beforeEachTest(TestClientType.UnpartitionedSubscription);
        await testRenewLock();
      });

      it("Partitioned Queue with Sessions: complete() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
        await testRenewLock();
      });

      it("Partitioned Subscription with Sessions: complete() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
        await testRenewLock();
      });

      it("Unpartitioned Queue with Sessions: complete() throws error #RunInBrowser", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
        await testRenewLock();
      });

      it("Unpartitioned Subscription with Sessions: complete() throws error", async function(): Promise<
        void
      > {
        await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
        await testRenewLock();
      });
    });
  });
});
