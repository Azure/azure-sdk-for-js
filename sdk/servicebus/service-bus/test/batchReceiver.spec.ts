// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusMessage, delay } from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { Receiver, ReceiverImpl } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  EntityName,
  getRandomReceiverTestClientType
} from "./utils/testutils2";
import { ReceivedMessage, ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { AbortController } from "@azure/abort-controller";
import { ReceiverEvents } from "rhea-promise";

const should = chai.should();
chai.use(chaiAsPromised);

const noSessionTestClientType = getRandomReceiverTestClientType(false);
const withSessionTestClientType = getRandomReceiverTestClientType(true);

[noSessionTestClientType, withSessionTestClientType].forEach((testClientType) => {
  describe(testClientType + ": Batch Receiver Settle Message", () => {
    let serviceBusClient: ServiceBusClientForTests;

    let sender: Sender;
    let receiver: Receiver<ReceivedMessageWithLock>;
    let deadLetterReceiver: Receiver<ReceivedMessageWithLock>;

    let entityNames: EntityName;
    let testMessage: ServiceBusMessage;
    const maxDeliveryCount = 10;

    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    beforeEach(async () => {
      entityNames = await serviceBusClient.test.createTestEntities(testClientType);
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
      );

      deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);
      testMessage = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
    });

    afterEach(async () => {
      await serviceBusClient.test.afterEach();
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

    it("complete() removes message", async function(): Promise<void> {
      const msg = await sendReceiveMsg(testMessage);

      await msg.complete();

      await testPeekMsgsLength(receiver, 0);
    });

    it("abandon() retains message with incremented deliveryCount", async function(): Promise<void> {
      const msg = await sendReceiveMsg(testMessage);
      await msg.abandon();

      await testPeekMsgsLength(receiver, 1);

      const messageBatch = await receiver.receiveMessages(1);

      should.equal(messageBatch.length, 1, "Unexpected number of messages");
      should.equal(messageBatch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        messageBatch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await messageBatch[0].complete();

      await testPeekMsgsLength(receiver, 0);
    });

    it("Multiple abandons until maxDeliveryCount", async function(): Promise<void> {
      await sender.sendMessages(testMessage);
      let abandonMsgCount = 0;

      while (abandonMsgCount < maxDeliveryCount) {
        const batch = await receiver.receiveMessages(1);

        should.equal(batch.length, 1, "Unexpected number of messages");
        should.equal(
          batch[0].messageId,
          testMessage.messageId,
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

      const deadLetterMsgsBatch = await deadLetterReceiver.receiveMessages(1);

      should.equal(
        Array.isArray(deadLetterMsgsBatch),
        true,
        "`ReceivedMessages` from Deadletter is not an array"
      );
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

      await deadLetterMsgsBatch[0].complete();

      await testPeekMsgsLength(deadLetterReceiver, 0);
    });

    it("defer() moves message to deferred queue", async function(): Promise<void> {
      const msg = await sendReceiveMsg(testMessage);

      if (!msg.sequenceNumber) {
        throw "Sequence Number can not be null";
      }
      const sequenceNumber = msg.sequenceNumber;
      await msg.defer();

      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
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

      await testPeekMsgsLength(receiver, 0);
    });

    it("deadLetter() moves message to deadletter queue", async function(): Promise<void> {
      const msg = await sendReceiveMsg(testMessage);
      await msg.deadLetter();

      await testPeekMsgsLength(receiver, 0);

      const deadLetterMsgsBatch = await deadLetterReceiver.receiveMessages(1);

      should.equal(
        Array.isArray(deadLetterMsgsBatch),
        true,
        "`ReceivedMessages` from Deadletter is not an array"
      );
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

      await deadLetterMsgsBatch[0].complete();

      await testPeekMsgsLength(deadLetterReceiver, 0);
    });
  });
});

describe(noSessionTestClientType + ": Batch Receiver Settle Deadlettered Message", () => {
  let serviceBusClient: ServiceBusClientForTests;

  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let deadLetterReceiver: Receiver<ReceivedMessageWithLock>;

  let entityNames: EntityName;
  let testMessage: ServiceBusMessage;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  beforeEach(async () => {
    entityNames = await serviceBusClient.test.createTestEntities(noSessionTestClientType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);
    testMessage = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  let errorWasThrown: boolean;
  let deadLetterMsg: ReceivedMessageWithLock;

  beforeEach(async () => {
    deadLetterMsg = await deadLetterMessage(testMessage);
  });

  async function deadLetterMessage(
    testMessage: ServiceBusMessage
  ): Promise<ReceivedMessageWithLock> {
    await sender.sendMessages(testMessage);
    const batch = await receiver.receiveMessages(1);

    should.equal(batch.length, 1, "Unexpected number of messages");
    should.equal(batch[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(batch[0].messageId, testMessage.messageId, "MessageId is different than expected");
    should.equal(batch[0].deliveryCount, 0, "DeliveryCount is different than expected");

    await batch[0].deadLetter();

    await testPeekMsgsLength(receiver, 0);

    const deadLetterMsgsBatch = await deadLetterReceiver.receiveMessages(1);

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

  async function completeDeadLetteredMessage(): Promise<void> {
    const deadLetterMsgsBatch = await deadLetterReceiver.receiveMessages(1);

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

    await deadLetterMsgsBatch[0].complete();
    await testPeekMsgsLength(deadLetterReceiver, 0);
  }

  it("Throws error when dead lettering a dead lettered message", async function(): Promise<void> {
    await deadLetterMsg.deadLetter().catch((err) => {
      should.equal(err.code, "InvalidOperationError", "Error code is different than expected");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true, "Error thrown flag must be true");

    await completeDeadLetteredMessage();
  });

  it("Abandon a message received from dead letter queue", async function(): Promise<void> {
    await deadLetterMsg.abandon();

    await completeDeadLetteredMessage();
  });

  it("Defer a message received from dead letter queue", async function(): Promise<void> {
    if (!deadLetterMsg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }

    const sequenceNumber = deadLetterMsg.sequenceNumber;
    await deadLetterMsg.defer();

    const [deferredMsg] = await deadLetterReceiver.receiveDeferredMessages(sequenceNumber);
    if (!deferredMsg) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsg.body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      deferredMsg.messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await deferredMsg.complete();

    await testPeekMsgsLength(receiver, 0);

    await testPeekMsgsLength(deadLetterReceiver, 0);
  });
});

[noSessionTestClientType, withSessionTestClientType].forEach((testClientType) => {
  describe(testClientType + ": Batch Receiver Misc", () => {
    let serviceBusClient: ServiceBusClientForTests;

    let sender: Sender;
    let receiver: Receiver<ReceivedMessageWithLock>;

    let entityNames: EntityName;
    let testMessage: ServiceBusMessage;

    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    beforeEach(async () => {
      entityNames = await serviceBusClient.test.createTestEntities(testClientType);
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
      );

      testMessage = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
    });

    afterEach(async () => {
      await serviceBusClient.test.afterEach();
    });

    it("maxMessageCount defaults to 1", async function(): Promise<void> {
      await sender.sendMessages(testMessage);

      // @ts-expect-error
      const peekedMsgs = await receiver.peekMessages();
      should.equal(peekedMsgs.length, 1, "Unexpected number of messages peeked.");
      should.equal(
        peekedMsgs[0].body,
        testMessage.body,
        "Peeked message body is different than expected"
      );

      // @ts-expect-error
      const msgs = await receiver.receiveMessages();
      should.equal(msgs.length, 1, "Unexpected number of messages received.");
      should.equal(
        msgs[0].body,
        testMessage.body,
        "Received message body is different than expected"
      );
      await msgs[0].complete();
    });

    it("Throws error when ReceiveBatch is called while the previous call is not done", async function(): Promise<
      void
    > {
      // We use an empty queue/topic here so that the first receiveMessages call takes time to return

      const firstBatchPromise = receiver.receiveMessages(1, { maxWaitTimeInMs: 10000 });
      await delay(5000);

      let errorMessage;
      const expectedErrorMessage = getAlreadyReceivingErrorMsg(
        receiver.entityPath,
        entityNames.usesSessions ? TestMessage.sessionId : undefined
      );

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
    });

    it("Multiple sequential receiveMessages calls", async function(): Promise<void> {
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
      const testMessages = entityNames.usesSessions ? messageWithSessions : messages;
      const batchMessageToSend = await sender.createBatch();
      for (const message of testMessages) {
        batchMessageToSend.tryAdd(message);
      }
      await sender.sendMessages(batchMessageToSend);
      const msgs1 = await receiver.receiveMessages(1);
      const msgs2 = await receiver.receiveMessages(1);

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
    });

    it("No settlement of the message is retained with incremented deliveryCount", async function(): Promise<
      void
    > {
      await sender.sendMessages(testMessage);

      // If using sessions, we need a receiver with lock renewal disabled so that
      // the message lands back in the queue/subscription to be picked up again.
      if (entityNames.usesSessions) {
        await receiver.close();
        receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
          sessionId: testMessage.sessionId,
          autoRenewLockDurationInMs: 0
        });
      }

      let batch = await receiver.receiveMessages(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].deliveryCount, 0, "DeliveryCount is different than expected");
      should.equal(
        batch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await testPeekMsgsLength(receiver, 1);

      // If using sessions wait to lose the lock, then use a new receiver to get the message
      // landed back in the queue/subscription.
      if (entityNames.usesSessions) {
        await delay(31000);
        receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
          sessionId: testMessage.sessionId,
          autoRenewLockDurationInMs: 0
        });
      }

      batch = await receiver.receiveMessages(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        batch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await batch[0].complete();
    });

    it("Receive n messages but queue only has m messages, where m < n", async function(): Promise<
      void
    > {
      await sender.sendMessages(testMessage);
      const batch = await receiver.receiveMessages(2);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        batch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await batch[0].complete();

      await testPeekMsgsLength(receiver, 0);
    });

    it("Abort receiveDeferredMessages request on the receiver", async function(): Promise<void> {
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
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock> | Receiver<ReceivedMessage>;

  async function beforeEachTest(
    entityType: TestClientType,
    receiveMode: "peekLock" | "receiveAndDelete" = "peekLock"
  ): Promise<void> {
    serviceBusClient = createServiceBusClientForTests();
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    if (receiveMode == "receiveAndDelete") {
      receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entityNames);
    } else {
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    }

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  afterEach(async () => {
    if (serviceBusClient) {
      await serviceBusClient.test.afterEach();
      await serviceBusClient.test.after();
    }
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue);

    // Send a message so we can be sure when the receiver is open and active.
    await sender.sendMessages(TestMessage.getSample());

    let settledMessageCount = 0;

    const messages1 = await (receiver as Receiver<ReceivedMessageWithLock>).receiveMessages(1, {
      maxWaitTimeInMs: 5000
    });
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
    (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"].namespace.connection[
      "_connection"
    ].idle();

    // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
    // Otherwise, it will get into a bad internal state with uncaught exceptions.
    await delay(2000);
    // send a second message to trigger the message handler again.
    await sender.sendMessages(TestMessage.getSample());

    // wait for the 2nd message to be received.
    const messages2 = await (receiver as Receiver<ReceivedMessageWithLock>).receiveMessages(1, {
      maxWaitTimeInMs: 5000
    });
    for (const message of messages2) {
      await message.complete();
      settledMessageCount++;
    }
    settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });

  it("returns messages if drain is in progress (receiveAndDelete)", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue, "receiveAndDelete");

    // The first time `receiveMessages` is called the receiver link is created.
    // The `receiver_drained` handler is only added after the link is created,
    // which is a non-blocking task.
    await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
    const receiverContext = (receiver as ReceiverImpl<ReceivedMessage>)["_context"];
    if (!receiverContext.batchingReceiver!.isOpen()) {
      throw new Error(`Unable to initialize receiver link.`);
    }

    // Send a message so we have something to receive.
    await sender.sendMessages(TestMessage.getSample());

    // Since the receiver has already been initialized,
    // the `receiver_drained` handler is attached as soon
    // as receiveMessages is invoked.
    // We remove the `receiver_drained` timeout after `receiveMessages`
    // does it's initial setup by wrapping it in a `setTimeout`.
    // This triggers the `receiver_drained` handler removal on the next
    // tick of the event loop; after the handler has been attached.
    setTimeout(() => {
      // remove `receiver_drained` event
      receiverContext.batchingReceiver!["_receiver"]!.removeAllListeners(
        ReceiverEvents.receiverDrained
      );
    }, 0);

    // We want to simulate a disconnect once the batching receiver is draining.
    // We can detect when the receiver enters a draining state when `addCredit` is
    // called while `drain` is set to true.
    let didRequestDrain = false;
    const addCredit = receiverContext.batchingReceiver!["_receiver"]!.addCredit;
    receiverContext.batchingReceiver!["_receiver"]!.addCredit = function(credits) {
      addCredit.call(this, credits);
      if (receiverContext.batchingReceiver!["_receiver"]!.drain) {
        didRequestDrain = true;
        // Simulate a disconnect being called with a non-retryable error.
        receiverContext.namespace.connection["_connection"].idle();
      }
    };

    // Purposefully request more messages than what's available
    // so that the receiver will have to drain.
    const messages1 = await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });

    didRequestDrain.should.equal(true, "Drain was not requested.");
    messages1.length.should.equal(1, "Unexpected number of messages received.");

    // Make sure that a 2nd receiveMessages call still works
    // by sending and receiving a single message again.
    await sender.sendMessages(TestMessage.getSample());

    // wait for the 2nd message to be received.
    const messages2 = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

    messages2.length.should.equal(1, "Unexpected number of messages received.");
  });

  it("throws an error if drain is in progress (peekLock)", async function(): Promise<void> {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue);

    // The first time `receiveMessages` is called the receiver link is created.
    // The `receiver_drained` handler is only added after the link is created,
    // which is a non-blocking task.
    await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
    const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];

    if (!receiverContext.batchingReceiver!.isOpen()) {
      throw new Error(`Unable to initialize receiver link.`);
    }

    // Send a message so we have something to receive.
    await sender.sendMessages(TestMessage.getSample());

    // Since the receiver has already been initialized,
    // the `receiver_drained` handler is attached as soon
    // as receiveMessages is invoked.
    // We remove the `receiver_drained` timeout after `receiveMessages`
    // does it's initial setup by wrapping it in a `setTimeout`.
    // This triggers the `receiver_drained` handler removal on the next
    // tick of the event loop; after the handler has been attached.
    setTimeout(() => {
      // remove `receiver_drained` event
      receiverContext.batchingReceiver!["_receiver"]!.removeAllListeners(
        ReceiverEvents.receiverDrained
      );
    }, 0);

    // We want to simulate a disconnect once the batching receiver is draining.
    // We can detect when the receiver enters a draining state when `addCredit` is
    // called while `drain` is set to true.
    let didRequestDrain = false;
    const addCredit = receiverContext.batchingReceiver!["_receiver"]!.addCredit;
    receiverContext.batchingReceiver!["_receiver"]!.addCredit = function(credits) {
      didRequestDrain = true;
      addCredit.call(this, credits);
      if (receiverContext.batchingReceiver!["_receiver"]!.drain) {
        // Simulate a disconnect being called with a non-retryable error.
        receiverContext.namespace.connection["_connection"].idle();
      }
    };

    // Purposefully request more messages than what's available
    // so that the receiver will have to drain.
    const testFailureMessage = "Test failure";
    try {
      await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });
      throw new Error(testFailureMessage);
    } catch (err) {
      err.message && err.message.should.not.equal(testFailureMessage);
    }

    didRequestDrain.should.equal(true, "Drain was not requested.");

    // Make sure that a 2nd receiveMessages call still works
    // by sending and receiving a single message again.
    await sender.sendMessages(TestMessage.getSample());

    // wait for the 2nd message to be received.
    const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

    messages.length.should.equal(1, "Unexpected number of messages received.");
  });

  it("returns messages if receive in progress (receiveAndDelete)", async function(): Promise<void> {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue, "receiveAndDelete");

    // The first time `receiveMessages` is called the receiver link is created.
    // The `receiver_drained` handler is only added after the link is created,
    // which is a non-blocking task.
    await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
    const receiverContext = (receiver as ReceiverImpl<ReceivedMessage>)["_context"];

    if (!receiverContext.batchingReceiver!.isOpen()) {
      throw new Error(`Unable to initialize receiver link.`);
    }

    // Send a message so we have something to receive.
    await sender.sendMessages(TestMessage.getSample());

    // Simulate a disconnect after a message has been received.
    receiverContext.batchingReceiver!["_receiver"]!.once("message", function() {
      setTimeout(() => {
        // Simulate a disconnect being called with a non-retryable error.
        receiverContext.namespace.connection["_connection"].idle();
      }, 0);
    });

    // Purposefully request more messages than what's available
    // so that the receiver will have to drain.
    const messages1 = await receiver.receiveMessages(10, { maxWaitTimeInMs: 10000 });

    messages1.length.should.equal(1, "Unexpected number of messages received.");

    // Make sure that a 2nd receiveMessages call still works
    // by sending and receiving a single message again.
    await sender.sendMessages(TestMessage.getSample());

    // wait for the 2nd message to be received.
    const messages2 = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

    messages2.length.should.equal(1, "Unexpected number of messages received.");
  });

  it("throws an error if receive is in progress (peekLock)", async function(): Promise<void> {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue);

    // The first time `receiveMessages` is called the receiver link is created.
    // The `receiver_drained` handler is only added after the link is created,
    // which is a non-blocking task.
    await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
    const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];

    if (!receiverContext.batchingReceiver!.isOpen()) {
      throw new Error(`Unable to initialize receiver link.`);
    }

    // Simulate a disconnect
    setTimeout(() => {
      // Simulate a disconnect being called with a non-retryable error.
      receiverContext.namespace.connection["_connection"].idle();
    }, 0);

    // Purposefully request more messages than what's available
    // so that the receiver will have to drain.
    const testFailureMessage = "Test failure";
    try {
      const msgs = await receiver.receiveMessages(10, { maxWaitTimeInMs: 10000 });
      console.log(msgs.length);
      throw new Error(testFailureMessage);
    } catch (err) {
      err.message && err.message.should.not.equal(testFailureMessage);
    }

    // Make sure that a 2nd receiveMessages call still works
    // by sending and receiving a single message again.
    await sender.sendMessages(TestMessage.getSample());

    // wait for the 2nd message to be received.
    const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

    messages.length.should.equal(1, "Unexpected number of messages received.");
  });
});
