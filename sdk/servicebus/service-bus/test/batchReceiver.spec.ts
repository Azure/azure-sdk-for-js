// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { delay, SendableMessageInfo, ContextWithSettlement, ReceivedMessage } from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import { TestClientType, getSenderReceiverClients, purge, TestMessage } from "./utils/testUtils";
import {
  ReceiverClientTypeForUser,
  ReceiverClientTypeForUserT
} from "../src/serviceBusReceiverClient";
import { Sender } from "../src/sender";

const should = chai.should();
chai.use(chaiAsPromised);

async function testPeekMsgsLength(
  client: ReceiverClientTypeForUser,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.diagnostics.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let errorWasThrown: boolean;

let senderClient: Sender;
let receiverClient: ReceiverClientTypeForUserT<"peekLock">;
let deadLetterClient: ReceiverClientTypeForUserT<"peekLock">;
const maxDeliveryCount = 10;

async function beforeEachTest(entityType: TestClientType): Promise<void> {
  const clients = await getSenderReceiverClients(entityType, "peekLock");
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;
  deadLetterClient = clients.serviceBusClient.createReceiver(
    receiverClient.getDeadLetterPath(),
    "peekLock"
  );

  await purge(receiverClient);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.diagnostics.peek();
  const receiverEntityType = receiverClient.entityType;
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
  const peekedDeadMsgs = await deadLetterClient.diagnostics.peek();
  if (peekedDeadMsgs.length) {
    chai.assert.fail(
      `Please use an empty dead letter ${receiverEntityType} for integration testing`
    );
  }
}

async function afterEachTest(): Promise<void> {
  await senderClient.close();
  await receiverClient.close();
}

describe("Batch Receiver - Settle message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(
    testMessages: SendableMessageInfo
  ): Promise<{ message: ReceivedMessage; context: ContextWithSettlement }> {
    await senderClient.send(testMessages);
    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs.messages), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.messages.length, 1, "Unexpected number of messages");
    should.equal(
      msgs.messages[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(
      msgs.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );
    should.equal(msgs.messages[0].deliveryCount, 0, "DeliveryCount is different than expected");

    return { message: msgs.messages[0], context: msgs.context as ContextWithSettlement };
  }

  async function testComplete(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);

    await msg.context.complete(msg.message);

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
    await testComplete(true);
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
    await msg.context.abandon(msg.message);

    await testPeekMsgsLength(receiverClient, 1);

    const messageBatch = await receiverClient.receiveBatch(1);

    should.equal(messageBatch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      messageBatch.messages[0].deliveryCount,
      1,
      "DeliveryCount is different than expected"
    );
    should.equal(
      messageBatch.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await (messageBatch.context as ContextWithSettlement).complete(messageBatch.messages[0]);

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

      should.equal(batch.messages.length, 1, "Unexpected number of messages");
      should.equal(
        batch.messages[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(
        batch.messages[0].deliveryCount,
        abandonMsgCount,
        "DeliveryCount is different than expected"
      );
      abandonMsgCount++;

      await batch.context.abandon(batch.messages[0]);
    }

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

    should.equal(
      Array.isArray(deadLetterMsgsBatch.messages),
      true,
      "`ReceivedMessages` from Deadletter is not an array"
    );
    should.equal(deadLetterMsgsBatch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgsBatch.messages[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgsBatch.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgsBatch.context.complete(deadLetterMsgsBatch.messages[0]);

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

    if (!msg.message.sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = msg.message.sequenceNumber;
    await msg.context.defer(msg.message);

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

  it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<void> {
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
    await msg.context.deadLetter(msg.message);

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

    should.equal(
      Array.isArray(deadLetterMsgsBatch.messages),
      true,
      "`ReceivedMessages` from Deadletter is not an array"
    );
    should.equal(deadLetterMsgsBatch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgsBatch.messages[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgsBatch.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgsBatch.context.complete(deadLetterMsgsBatch.messages[0]);

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

describe("Batch Receiver - Settle deadlettered message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function deadLetterMessage(
    testMessage: SendableMessageInfo
  ): Promise<{ message: ReceivedMessage; context: ContextWithSettlement }> {
    await senderClient.send(testMessage);
    const batch = await receiverClient.receiveBatch(1);

    should.equal(batch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      batch.messages[0].body,
      testMessage.body,
      "MessageBody is different than expected"
    );
    should.equal(
      batch.messages[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(batch.messages[0].deliveryCount, 0, "DeliveryCount is different than expected");

    await batch.context.deadLetter(batch.messages[0]);

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

    should.equal(deadLetterMsgsBatch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgsBatch.messages[0].body,
      testMessage.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgsBatch.messages[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(
      deadLetterMsgsBatch.messages[0].deliveryCount,
      0,
      "DeliveryCount is different than expected"
    );

    return { message: deadLetterMsgsBatch.messages[0], context: deadLetterMsgsBatch.context };
  }

  async function completeDeadLetteredMessage(
    testMessage: SendableMessageInfo,
    deadletterClient: ReceiverClientTypeForUserT<"peekLock">,
    expectedDeliverCount: number
  ): Promise<void> {
    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);

    should.equal(deadLetterMsgsBatch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgsBatch.messages[0].body,
      testMessage.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deadLetterMsgsBatch.messages[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(
      deadLetterMsgsBatch.messages[0].deliveryCount,
      expectedDeliverCount,
      "DeliveryCount is different than expected"
    );

    await deadLetterMsgsBatch.context.complete(deadLetterMsgsBatch.messages[0]);
    await testPeekMsgsLength(deadletterClient, 0);
  }

  async function testDeadletter(testMessage: SendableMessageInfo): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(testMessage);

    await deadLetterMsg.context.deadLetter(deadLetterMsg.message).catch((err) => {
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

  async function testAbandon(testMessage: SendableMessageInfo): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(testMessage);

    await deadLetterMsg.context.abandon(deadLetterMsg.message);

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

  async function testDefer(testMessage: SendableMessageInfo): Promise<void> {
    const deadLetterMsg = await deadLetterMessage(testMessage);

    if (!deadLetterMsg.message.sequenceNumber) {
      throw "Sequence Number can not be null";
    }

    const sequenceNumber = deadLetterMsg.message.sequenceNumber;
    await deadLetterMsg.context.defer(deadLetterMsg.message);

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

    await testPeekMsgsLength(receiverClient, 0);

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
    const firstBatchPromise = receiverClient.receiveBatch(1, 10);
    await delay(5000);

    let errorMessage;
    const expectedErrorMessage = getAlreadyReceivingErrorMsg(
      receiverClient.entityPath,
      useSessions ? TestMessage.sessionId : undefined
    );

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

    let unexpectedError;
    try {
      receiverClient.subscribe({
        async processMessage(message: ReceivedMessage): Promise<void> {
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

  it("Unpartitioned Queue: Throws error when ReceiveBatch is called while the previous call is not done #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testParallelReceiveCalls();
  });

  it("Unpartitioned Queue with Sessions: Throws error when ReceiveBatch is called while the previous call is not done #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await testParallelReceiveCalls(true);
  });

  const messages: SendableMessageInfo[] = [
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
  const messageWithSessions: SendableMessageInfo[] = [
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
    await senderClient.sendBatch(testMessages);
    const msgs1 = await receiverClient.receiveBatch(1);
    const msgs2 = await receiverClient.receiveBatch(1);

    // Results are checked after both receiveMessages are done to ensure that the second call doesnt
    // affect the result from the first one.
    should.equal(Array.isArray(msgs1.messages), true, "`ReceivedMessages` is not an array");
    should.equal(msgs1.messages.length, 1, "Unexpected number of messages");

    should.equal(Array.isArray(msgs2.messages), true, "`ReceivedMessages` is not an array");
    should.equal(msgs2.messages.length, 1, "Unexpected number of messages");

    should.equal(
      testMessages.some((x) => x.messageId === msgs1.messages[0].messageId),
      true,
      "MessageId is different than expected"
    );
    should.equal(
      testMessages.some((x) => x.messageId === msgs2.messages[0].messageId),
      true,
      "MessageId is different than expected"
    );

    await msgs1.context.complete(msgs1.messages[0]);
    await msgs2.context.complete(msgs2.messages[0]);
  }

  it("Unpartitioned Queue: Multiple sequential receiveMessages calls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testSequentialReceiveBatchCalls();
  });

  it("Unpartitioned Queue with Sessions: Multiple sequential receiveMessages calls #RunInBrowser", async function(): Promise<
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

    let batch = await receiverClient.receiveBatch(1);

    should.equal(batch.messages.length, 1, "Unexpected number of messages");
    should.equal(batch.messages[0].deliveryCount, 0, "DeliveryCount is different than expected");
    should.equal(
      batch.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await testPeekMsgsLength(receiverClient, 1);

    batch = await receiverClient.receiveBatch(1);

    should.equal(batch.messages.length, 1, "Unexpected number of messages");
    should.equal(batch.messages[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      batch.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await batch.context.complete(batch.messages[0]);
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

  it("Unpartitioned Queue: No settlement of the message is retained with incremented deliveryCount #RunInBrowser", async function(): Promise<
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
    const batch = await receiverClient.receiveBatch(2);

    should.equal(batch.messages.length, 1, "Unexpected number of messages");
    should.equal(
      batch.messages[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(
      batch.messages[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await batch.context.complete(batch.messages[0]);

    await testPeekMsgsLength(receiverClient, 0);
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

  it("Unpartitioned Queue: Receive n messages but queue only has m messages, where m < n  #RunInBrowser", async function(): Promise<
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

  it("Unpartitioned Queue with Sessions: Receive n messages but queue only has m messages, where m < n #RunInBrowser", async function(): Promise<
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
