// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  ServiceBusMessage,
  QueueClient,
  SubscriptionClient,
  ServiceBusClient,
  TopicClient,
  SessionReceiver,
  Receiver
} from "../src";
import {
  TestClientType,
  TestMessage,
  purge,
  getServiceBusClient,
  getSenderReceiverClients
} from "./utils/testUtils";
import { Sender } from "../src/sender";
import { DispositionType, ReceiveMode, SendableMessageInfo } from "../src/serviceBusMessage";

const should = chai.should();
chai.use(chaiAsPromised);

describe.only("Backup message settlement - Through ManagementLink", () => {
  let sbClient: ServiceBusClient;

  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let deadLetterClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;

  async function testPeekMsgsLength(
    client: QueueClient | SubscriptionClient,
    expectedPeekLength: number
  ): Promise<void> {
    const peekedMsgs = await client.peek(expectedPeekLength + 1);
    should.equal(
      peekedMsgs.length,
      expectedPeekLength,
      "Unexpected number of msgs found when peeking"
    );
  }

  async function beforeEachTest(
    senderType: TestClientType,
    receiverType: TestClientType
  ): Promise<void> {
    const useSessions = receiverType > 5 && receiverType < 12 ? true : false;
    sbClient = getServiceBusClient();
    const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;
    if (receiverClient instanceof QueueClient) {
      deadLetterClient = sbClient.createQueueClient(
        QueueClient.getDeadLetterQueuePath(receiverClient.entityPath)
      );
    }

    if (receiverClient instanceof SubscriptionClient) {
      deadLetterClient = sbClient.createSubscriptionClient(
        TopicClient.getDeadLetterTopicPath(
          senderClient.entityPath,
          receiverClient.subscriptionName
        ),
        receiverClient.subscriptionName
      );
    }

    await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    await purge(deadLetterClient);
    const peekedMsgs = await receiverClient.peek();
    const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    if (peekedMsgs.length) {
      chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    }
    const peekedDeadMsgs = await deadLetterClient.peek();
    if (peekedDeadMsgs.length) {
      chai.assert.fail(
        `Please use an empty dead letter ${receiverEntityType} for integration testing`
      );
    }

    sender = senderClient.createSender();
    if (useSessions) {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
        sessionId: TestMessage.sessionId
      });
    } else {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    }
  }

  async function afterEachTest(): Promise<void> {
    await sbClient.close();
  }

  describe("Settle Messages After Receiver Is Closed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(testMessages: SendableMessageInfo): Promise<ServiceBusMessage> {
      await sender.send(testMessages);
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

    async function testComplete(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
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

      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
      if (useSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
        const msgBatch = await receiver.receiveMessages(1);
        await msgBatch[0].complete();
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }
      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
      await testComplete();
    });

    it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
      await testComplete();
    });

    it("Unpartitioned Queue: complete() removes message #RunInBrowser ", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await testComplete();
    });

    it("Unpartitioned Subscription: complete() removes message", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription
      );
      await testComplete();
    });

    it("Partitioned Queue with Sessions: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        TestClientType.PartitionedQueueWithSessions
      );
      await testComplete(true);
    });

    it("Partitioned Subscription with Sessions: complete() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedTopicWithSessions,
        TestClientType.PartitionedSubscriptionWithSessions
      );
      await testComplete(true);
    });

    it("Unpartitioned Queue with Sessions: complete() throws error #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions
      );
      await testComplete(true);
    });

    it("Unpartitioned Subscription with Sessions: complete() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopicWithSessions,
        TestClientType.UnpartitionedSubscriptionWithSessions
      );
      await testComplete(true);
    });

    async function testAbandon(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);
      await receiverClient.close();
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

      if (useSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }

      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
      await testPeekMsgsLength(receiverClient, 1);

      const messageBatch = await receiver.receiveMessages(1);

      await messageBatch[0].complete();

      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
      await testAbandon();
    });

    it("Partitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
      await testAbandon();
    });

    it("Unpartitioned Queue: abandon() retains message with incremented deliveryCount #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await testAbandon();
    });

    it("Unpartitioned Subscription: abandon() retains message with incremented deliveryCount", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription
      );
      await testAbandon();
    });

    it("Partitioned Queue with Sessions: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        TestClientType.PartitionedQueueWithSessions
      );
      await testAbandon();
    });

    it("Partitioned Subscription with Sessions: abandon() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedTopicWithSessions,
        TestClientType.PartitionedSubscriptionWithSessions
      );
      await testAbandon();
    });

    it("Unpartitioned Queue with Sessions: abandon() throws error #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions
      );
      await testAbandon();
    });

    it("Unpartitioned Subscription with Sessions: abandon() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopicWithSessions,
        TestClientType.UnpartitionedSubscriptionWithSessions
      );
      await testAbandon();
    });

    async function testDefer(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);

      if (!msg.sequenceNumber) {
        throw "Sequence Number can not be null";
      }
      const sequenceNumber = msg.sequenceNumber;
      await receiverClient.close();
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

      if (useSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
      if (!useSessions) {
        const deferredMsgs = await receiver.receiveDeferredMessage(sequenceNumber);
        if (!deferredMsgs) {
          throw "No message received for sequence number";
        }
        await deferredMsgs.complete();
      } else {
        const messageBatch = await receiver.receiveMessages(1);
        await messageBatch[0].complete();
      }
      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
      await testDefer();
    });

    it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
      await testDefer();
    });

    it("Unpartitioned Queue: defer() moves message to deferred queue #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await testDefer();
    });

    it("Unpartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription
      );
      await testDefer();
    });

    it("Partitioned Queue with Sessions: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        TestClientType.PartitionedQueueWithSessions
      );
      await testDefer();
    });

    it("Partitioned Subscription with Sessions: defer() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedTopicWithSessions,
        TestClientType.PartitionedSubscriptionWithSessions
      );
      await testDefer();
    });

    it("Unpartitioned Queue with Sessions: defer() throws error #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions
      );
      await testDefer();
    });

    it("Unpartitioned Subscription with Sessions: defer() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopicWithSessions,
        TestClientType.UnpartitionedSubscriptionWithSessions
      );
      await testDefer();
    });

    async function testDeadletter(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);
      await receiverClient.close();
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

      if (useSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }

      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);

      if (!useSessions) {
        const deadLetterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
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

        await testPeekMsgsLength(deadLetterClient, 0);
      } else {
        const messageBatch = await receiver.receiveMessages(1);
        await messageBatch[0].complete();

        await testPeekMsgsLength(receiverClient, 0);
      }
    }

    it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
      await testDeadletter();
    });

    it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
      await testDeadletter();
    });

    it("Unpartitioned Queue: deadLetter() moves message to deadletter queue #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await testDeadletter();
    });

    it("Unpartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription
      );
      await testDeadletter();
    });

    it("Partitioned Queue with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        TestClientType.PartitionedQueueWithSessions
      );
      await testDeadletter(true);
    });

    it("Partitioned Subscription with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedTopicWithSessions,
        TestClientType.PartitionedSubscriptionWithSessions
      );
      await testDeadletter(true);
    });

    it("Unpartitioned Queue with Sessions: deadLetter() throws error #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions
      );
      await testDeadletter(true);
    });

    it("Unpartitioned Subscription with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopicWithSessions,
        TestClientType.UnpartitionedSubscriptionWithSessions
      );
      await testDeadletter(true);
    });
  });
});
