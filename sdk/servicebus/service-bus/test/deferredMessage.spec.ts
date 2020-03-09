// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ServiceBusMessage, SendableMessageInfo, ServiceBusSenderClient } from "../src";
import {
  TestMessage,
  getSenderReceiverClients,
  TestClientType,
  purge,
  isSessionfulEntity,
  ReceiverClientTypeForUserT,
  ReceiverClientTypeForUser
} from "./utils/testUtils";
import { ServiceBusReceiverClient } from "../src/serviceBusReceiverClient";
import { getEnvVars } from "./utils/envVarUtils";

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

let senderClient: ServiceBusSenderClient;
let receiverClient: ReceiverClientTypeForUserT<"peekLock">;
let deadLetterClient: ReceiverClientTypeForUserT<"peekLock">;

async function beforeEachTest(entityType: TestClientType): Promise<void> {
  let clients;
  if (isSessionfulEntity(entityType)) {
    clients = await getSenderReceiverClients(entityType, "peekLock", undefined, {
      id: TestMessage.sessionId
    });
  } else {
    clients = await getSenderReceiverClients(entityType, "peekLock");
  }

  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  deadLetterClient = new ServiceBusReceiverClient(
    {
      connectionString: getEnvVars().SERVICEBUS_CONNECTION_STRING,
      queueName: receiverClient.getDeadLetterPath()
    },
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

/**
 * Sends, defers, receives and then returns a test message
 * @param testMessage Test message to send, defer, receive and then return
 * @param useReceiveDeferredMessages Boolean to indicate whether to use `receiveDeferredMessage` or
 * `receiveDeferredMessages` to ensure both get code coverage
 */
async function deferMessage(
  testMessage: SendableMessageInfo,
  useReceiveDeferredMessages: boolean
): Promise<ServiceBusMessage> {
  await senderClient.send(testMessage);
  const batch = await receiverClient.receiveBatch(1);
  const receivedMsgs = batch.messages;

  should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
  should.equal(receivedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
  should.equal(receivedMsgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
  should.equal(
    receivedMsgs[0].messageId,
    testMessage.messageId,
    "MessageId is different than expected"
  );

  if (!receivedMsgs[0].sequenceNumber) {
    throw "Sequence Number can not be null";
  }
  const sequenceNumber = receivedMsgs[0].sequenceNumber;
  await batch.context.defer(receivedMsgs[0]);

  let deferredMsg: ServiceBusMessage | undefined;

  // Randomly choose receiveDeferredMessage/receiveDeferredMessages as the latter is expected to
  // convert single input to array and then use it
  if (useReceiveDeferredMessages) {
    [deferredMsg] = await receiverClient.receiveDeferredMessages(sequenceNumber as any);
  } else {
    deferredMsg = await receiverClient.receiveDeferredMessage(sequenceNumber);
  }

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

  return deferredMsg;
}

async function completeDeferredMessage(
  sequenceNumber: Long,
  expectedDeliverCount: number,
  testMessages: SendableMessageInfo
): Promise<void> {
  await testPeekMsgsLength(receiverClient, 1);

  const deferredMsg = await receiverClient.receiveDeferredMessage(sequenceNumber);
  if (!deferredMsg) {
    throw "No message received for sequence number";
  }

  should.equal(deferredMsg.body, testMessages.body, "MessageBody is different than expected");
  should.equal(
    deferredMsg.deliveryCount,
    expectedDeliverCount,
    "DeliveryCount is different than expected"
  );
  should.equal(
    deferredMsg.messageId,
    testMessages.messageId,
    "MessageId is different than expected"
  );

  await deferredMsg.complete();

  await testPeekMsgsLength(receiverClient, 0);
}

describe("Abandon/Defer/Deadletter deferred message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, true);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.abandon();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queue: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testAbandon();
  });

  it("Partitioned Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testAbandon();
  });

  it("Partitioned Queue with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
    await testAbandon(true);
  });

  it("Partitioned Subscription with Sessions: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
    await testAbandon(true);
  });

  it("Unpartitioned Queue: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testAbandon();
  });

  it("Unpartitioned Subscription: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testAbandon();
  });

  it("Unpartitioned Queue with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await testAbandon(true);
  });

  it("Unpartitioned Subscription with Sessions:: Abandoning a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
    await testAbandon(true);
  });

  async function testDefer(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, false);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await deferredMsg.defer();
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it("Partitioned Queue: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testDefer();
  });

  it("Partitioned Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testDefer();
  });

  it("Partitioned Queue with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
    await testDefer(true);
  });

  it("Partitioned Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
    await testDefer(true);
  });

  it("Unpartitioned Queue: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testDefer();
  });

  it("Unpartitioned Subscription: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testDefer();
  });

  it("Unpartitioned Queue with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await testDefer(true);
  });

  it("Unpartitioned Subscription with Sessions: Deferring a deferred message puts it back to the deferred queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
    await testDefer(true);
  });

  async function testDeadletter(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, true);

    await deferredMsg.deadLetter();

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);
    const deadLetterMsgs = deadLetterMsgsBatch.messages;

    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].body,
      testMessages.body,
      "MessageBody is different than expected"
    );
    should.equal(deadLetterMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessages.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgsBatch.context.complete(deadLetterMsgs[0]);

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testDeadletter();
  });

  it("Partitioned Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testDeadletter();
  });

  it("Partitioned Queue with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
    await testDeadletter(true);
  });

  it("Partitioned Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
    await testDeadletter(true);
  });

  it("Unpartitioned Queue: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testDeadletter();
  });

  it("Unpartitioned Subscription: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testDeadletter();
  });

  it("Unpartitioned Queue with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await testDeadletter(true);
  });

  it("Unpartitioned Subscription with Sessions: Deadlettering a deferred message moves it to dead letter queue.", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
    await testDeadletter(true);
  });
});
