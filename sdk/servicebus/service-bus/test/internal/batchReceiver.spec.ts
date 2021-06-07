// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusMessage, delay, ServiceBusSender, ServiceBusReceivedMessage } from "../../src";
import { InvalidOperationForPeekedMessage } from "../../src/util/errors";
import { TestClientType, TestMessage } from "../public/utils/testUtils";
import { ServiceBusReceiver, ServiceBusReceiverImpl } from "../../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithNoSessions,
  EntityName,
  getRandomTestClientType,
  getRandomTestClientTypeWithSessions
} from "../public/utils/testutils2";
import { AbortController } from "@azure/abort-controller";
import { Receiver, ReceiverEvents } from "rhea-promise";
import {
  ServiceBusSessionReceiver,
  ServiceBusSessionReceiverImpl
} from "../../src/receivers/sessionReceiver";
import { ConnectionContext } from "../../src/connectionContext";
import { LinkEntity } from "../../src/core/linkEntity";
import { StandardAbortMessage } from "@azure/core-amqp";

const should = chai.should();
chai.use(chaiAsPromised);
const assert = chai.assert;

const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
const withSessionTestClientType = getRandomTestClientTypeWithSessions();
const anyRandomTestClientType = getRandomTestClientType();

let serviceBusClient: ServiceBusClientForTests;
let entityNames: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;
let deadLetterReceiver: ServiceBusReceiver;

async function beforeEachTest(
  entityType: TestClientType,
  receiveMode: "peekLock" | "receiveAndDelete" = "peekLock"
): Promise<void> {
  entityNames = await serviceBusClient.test.createTestEntities(entityType);
  if (receiveMode === "receiveAndDelete") {
    receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);
  } else {
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
  }

  sender = serviceBusClient.test.addToCleanup(
    serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
  );

  deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);
}

function afterEachTest(): Promise<void> {
  return serviceBusClient.test.afterEach();
}

describe("Batching Receiver", () => {
  describe("Batch Receiver - Settle message", function(): void {
    const maxDeliveryCount = 10;

    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(
      testMessages: ServiceBusMessage
    ): Promise<ServiceBusReceivedMessage> {
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

    async function testComplete(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);

      await receiver.completeMessage(msg);

      await testPeekMsgsLength(receiver, 0);
    }

    it(noSessionTestClientType + ": complete() removes message", async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testComplete();
    });

    it(withSessionTestClientType + ": complete() removes message", async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testComplete();
    });

    async function testAbandon(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);
      await receiver.abandonMessage(msg);

      await testPeekMsgsLength(receiver, 1);

      const messageBatch = await receiver.receiveMessages(1);

      should.equal(messageBatch.length, 1, "Unexpected number of messages");
      should.equal(messageBatch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        messageBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await receiver.completeMessage(messageBatch[0]);

      await testPeekMsgsLength(receiver, 0);
    }

    it(
      noSessionTestClientType + ": abandon() retains message with incremented deliveryCount",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testAbandon();
      }
    );

    it(
      withSessionTestClientType + ": abandon() retains message with incremented deliveryCount",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testAbandon();
      }
    );

    async function testAbandonMsgsTillMaxDeliveryCount(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessages);
      let abandonMsgCount = 0;

      while (abandonMsgCount < maxDeliveryCount) {
        const batch = await receiver.receiveMessages(1);

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

        await receiver.abandonMessage(batch[0]);
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
        testMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await receiver.completeMessage(deadLetterMsgsBatch[0]);

      await testPeekMsgsLength(deadLetterReceiver, 0);
    }

    it(
      noSessionTestClientType + ": Multiple abandons until maxDeliveryCount.",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testAbandonMsgsTillMaxDeliveryCount();
      }
    );

    it(
      withSessionTestClientType + ": Multiple abandons until maxDeliveryCount.",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testAbandonMsgsTillMaxDeliveryCount();
      }
    );

    async function testDefer(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);

      if (!msg.sequenceNumber) {
        throw "Sequence Number can not be null";
      }
      const sequenceNumber = msg.sequenceNumber;
      await receiver.deferMessage(msg);

      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
      if (!deferredMsg) {
        throw "No message received for sequence number";
      }
      should.equal(deferredMsg.body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        deferredMsg.messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(deferredMsg.deliveryCount, 1, "DeliveryCount is different than expected");

      await receiver.completeMessage(deferredMsg);

      await testPeekMsgsLength(receiver, 0);
    }

    it(
      noSessionTestClientType + ": defer() moves message to deferred queue",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testDefer();
      }
    );

    it(
      withSessionTestClientType + ": defer() moves message to deferred queue",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testDefer();
      }
    );

    async function testDeadletter(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);
      await receiver.deadLetterMessage(msg);

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
        testMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        deadLetterMsgsBatch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await receiver.completeMessage(deadLetterMsgsBatch[0]);

      await testPeekMsgsLength(deadLetterReceiver, 0);
    }

    it(
      noSessionTestClientType + ": deadLetter() moves message to deadletter queue",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testDeadletter();
      }
    );

    it(
      withSessionTestClientType + ": deadLetter() moves message to deadletter queue",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testDeadletter();
      }
    );

    async function testPeek(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessages);

      const [peekedMsg] = await receiver.peekMessages(1);
      if (!peekedMsg) {
        // Sometimes the peek call does not return any messages :(
        return;
      }

      should.equal(
        !peekedMsg.lockToken,
        true,
        "Peeked msg was not meant to have lockToken! We use this assumption to differentiate between peeked msg and other messages."
      );

      const expectedErrorMsg = InvalidOperationForPeekedMessage;
      try {
        await receiver.completeMessage(peekedMsg);
        assert.fail("completeMessage should have failed");
      } catch (error) {
        should.equal(error.message, expectedErrorMsg);
      }
      try {
        await receiver.abandonMessage(peekedMsg);
        assert.fail("abandonMessage should have failed");
      } catch (error) {
        should.equal(error.message, expectedErrorMsg);
      }
      try {
        await receiver.deferMessage(peekedMsg);
        assert.fail("deferMessage should have failed");
      } catch (error) {
        should.equal(error.message, expectedErrorMsg);
      }
      try {
        await receiver.deadLetterMessage(peekedMsg);
        assert.fail("deadLetterMessage should have failed");
      } catch (error) {
        should.equal(error.message, expectedErrorMsg);
      }

      await testPeekMsgsLength(receiver, 0);
    }

    it(noSessionTestClientType + ": cannot settle peeked message", async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testPeek();
    });

    it(withSessionTestClientType + ": cannot settle peeked message", async function(): Promise<
      void
    > {
      await beforeEachTest(withSessionTestClientType);
      await testPeek();
    });
  });

  describe("Batch Receiver - Settle deadlettered message", function(): void {
    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    afterEach(async () => {
      await afterEachTest();
    });

    async function deadLetterMessage(
      testMessage: ServiceBusMessage
    ): Promise<ServiceBusReceivedMessage> {
      await sender.sendMessages(testMessage);
      const batch = await receiver.receiveMessages(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        batch[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(batch[0].deliveryCount, 0, "DeliveryCount is different than expected");

      await receiver.deadLetterMessage(batch[0]);

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

    async function completeDeadLetteredMessage(
      testMessage: ServiceBusMessage,
      deadletterClient: ServiceBusReceiver,
      expectedDeliverCount: number
    ): Promise<void> {
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
        expectedDeliverCount,
        "DeliveryCount is different than expected"
      );

      await receiver.completeMessage(deadLetterMsgsBatch[0]);
      await testPeekMsgsLength(deadletterClient, 0);
    }

    async function testDeadletter(): Promise<void> {
      const testMessage = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSessionSample();
      const deadLetterMsg = await deadLetterMessage(testMessage);
      let errorWasThrown = false;

      await receiver.deadLetterMessage(deadLetterMsg).catch((err) => {
        should.equal(err.code, "GeneralError", "Error code is different than expected");
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");

      await completeDeadLetteredMessage(testMessage, deadLetterReceiver, 0);
    }

    it(
      anyRandomTestClientType + ": Throws error when dead lettering a dead lettered message",
      async function(): Promise<void> {
        await beforeEachTest(anyRandomTestClientType);
        await testDeadletter();
      }
    );

    async function testAbandon(): Promise<void> {
      const testMessage = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSessionSample();
      const deadLetterMsg = await deadLetterMessage(testMessage);

      await receiver.abandonMessage(deadLetterMsg);

      await completeDeadLetteredMessage(testMessage, deadLetterReceiver, 0);
    }

    it(
      anyRandomTestClientType + ": Abandon a message received from dead letter queue",
      async function(): Promise<void> {
        await beforeEachTest(anyRandomTestClientType);
        await testAbandon();
      }
    );

    async function testDefer(): Promise<void> {
      const testMessage = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSessionSample();
      const deadLetterMsg = await deadLetterMessage(testMessage);

      if (!deadLetterMsg.sequenceNumber) {
        throw "Sequence Number can not be null";
      }

      const sequenceNumber = deadLetterMsg.sequenceNumber;
      await receiver.deferMessage(deadLetterMsg);

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

      await deadLetterReceiver.completeMessage(deferredMsg);

      await testPeekMsgsLength(receiver, 0);

      await testPeekMsgsLength(deadLetterReceiver, 0);
    }

    // TODO: The below test for session enabled entity needs a higher timeout most of the time
    // The rest of the time, it fails with "The service was unable to process the request; please retry the operation.".
    // So, testing for non sessions at the moment, more investigation needed from service side.
    it(
      noSessionTestClientType + ": Defer a message received from dead letter queue",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testDefer();
      }
    );
  });

  describe("Batch Receiver - Multiple Receiver Operations", function(): void {
    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    afterEach(async () => {
      await afterEachTest();
    });

    const messages: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        partitionKey: "dummy" // partitionKey is only for partitioned queue/subscription, Unpartitioned queue/subscription do not care about partitionKey.
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        partitionKey: "dummy" // partitionKey is only for partitioned queue/subscription, Unpartitioned queue/subscription do not care about partitionKey.
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

    // We test for multiple receiveMessages specifically to ensure that batchingReceiver on a client is reused
    // See https://github.com/Azure/azure-service-bus-node/issues/31
    async function testSequentialReceiveBatchCalls(): Promise<void> {
      const testMessages = entityNames.usesSessions ? messageWithSessions : messages;
      const batchMessageToSend = await sender.createMessageBatch();
      for (const message of testMessages) {
        batchMessageToSend.tryAddMessage(message);
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

      await receiver.completeMessage(msgs1[0]);
      await receiver.completeMessage(msgs2[0]);
    }

    it(
      noSessionTestClientType + ": Multiple sequential receiveMessages calls",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testSequentialReceiveBatchCalls();
      }
    );

    it(
      withSessionTestClientType + ":  Multiple sequential receiveMessages calls",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testSequentialReceiveBatchCalls();
      }
    );
  });

  describe("Batch Receiver - Others", function(): void {
    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    afterEach(async () => {
      await afterEachTest();
    });

    async function testNoSettlement(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessages);

      // We need a receiver with lock renewal disabled so that
      // the message lands back in the queue/subscription to be picked up again.
      await receiver.close();
      if (entityNames.usesSessions) {
        receiver = await serviceBusClient.test.acceptSessionWithPeekLock(
          entityNames,
          testMessages.sessionId!,
          {
            maxAutoLockRenewalDurationInMs: 0
          }
        );
      } else {
        receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames, {
          maxAutoLockRenewalDurationInMs: 0
        });
      }

      let batch = await receiver.receiveMessages(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].deliveryCount, 0, "DeliveryCount is different than expected");
      should.equal(
        batch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await testPeekMsgsLength(receiver, 1);

      // If using sessions wait to lose the lock, then use a new receiver to get the message
      // landed back in the queue/subscription.
      if (entityNames.usesSessions) {
        await delay(31000);
        receiver = await serviceBusClient.test.acceptSessionWithPeekLock(
          entityNames,
          testMessages.sessionId!,
          {
            maxAutoLockRenewalDurationInMs: 0
          }
        );
      }

      batch = await receiver.receiveMessages(1);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].deliveryCount, 1, "DeliveryCount is different than expected");
      should.equal(
        batch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await receiver.completeMessage(batch[0]);
    }

    it(
      noSessionTestClientType +
        ": No settlement of the message is retained with incremented deliveryCount",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testNoSettlement();
      }
    );

    it(
      withSessionTestClientType +
        ": No settlement of the message is retained with incremented deliveryCount",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testNoSettlement();
      }
    );

    async function testAskForMore(): Promise<void> {
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessages);
      const batch = await receiver.receiveMessages(2);

      should.equal(batch.length, 1, "Unexpected number of messages");
      should.equal(batch[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        batch[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      await receiver.completeMessage(batch[0]);

      await testPeekMsgsLength(receiver, 0);
    }

    it(
      noSessionTestClientType + ": Receive n messages but queue only has m messages, where m < n",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);

        await testAskForMore();
      }
    );

    it(
      withSessionTestClientType +
        ": Receive n messages but subscription only has m messages, where m < n",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);

        await testAskForMore();
      }
    );

    it(
      noSessionTestClientType + ": Abort receiveDeferredMessages request on the receiver",
      async function(): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        try {
          await receiver.receiveDeferredMessages([Long.ZERO], {
            abortSignal: controller.signal
          });
          throw new Error(`Test failure`);
        } catch (err) {
          err.message.should.equal(StandardAbortMessage);
        }
      }
    );

    it(
      withSessionTestClientType + ": Abort receiveDeferredMessages request on the receiver",
      async function(): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 1);
        try {
          await receiver.receiveDeferredMessages([Long.ZERO], {
            abortSignal: controller.signal
          });
          throw new Error(`Test failure`);
        } catch (err) {
          err.message.should.equal(StandardAbortMessage);
        }
      }
    );
  });

  describe("Batch Receiver - disconnects", () => {
    function simulateDisconnectDuringDrain(
      receiverContext: ConnectionContext,
      batchingReceiver: LinkEntity<Receiver> | undefined,
      didRequestDrainResolver: Function
    ) {
      if (!batchingReceiver || !batchingReceiver.isOpen()) {
        throw new Error(`batchingReceiver is not open or passed undefined.`);
      }
      // We want to simulate a disconnect once the batching receiver is draining.
      // We can detect when the receiver enters a draining state when `addCredit` is
      // called while didRequestDrainResolver is called to resolve the promise.
      const addCredit = batchingReceiver["link"]!.addCredit;
      batchingReceiver["link"]!.addCredit = function(credits) {
        // This makes sure the receiveMessages doesn't end because of draining before the disconnect is triggered
        // Meaning.. the "resolving the messages" can only happen through the onDetached triggered by disconnect
        batchingReceiver["link"]!.removeAllListeners(ReceiverEvents.receiverDrained);
        addCredit.call(this, credits);
        if (batchingReceiver["link"]!.drain) {
          didRequestDrainResolver();
          // Simulate a disconnect being called with a non-retryable error.
          receiverContext.connection["_connection"].idle();
        }
      };
    }

    describe(noSessionTestClientType + ": Batch Receiver - disconnects", function(): void {
      before(() => {
        serviceBusClient = createServiceBusClientForTests();
      });

      after(() => {
        return serviceBusClient.test.after();
      });

      afterEach(async () => {
        await afterEachTest();
      });

      it("can receive and settle messages after a disconnect", async function(): Promise<void> {
        // Create the sender and receiver.
        await beforeEachTest(noSessionTestClientType);

        // Send a message so we can be sure when the receiver is open and active.
        await sender.sendMessages(TestMessage.getSample());

        let settledMessageCount = 0;

        const messages1 = await receiver.receiveMessages(1);
        for (const message of messages1) {
          await receiver.completeMessage(message);
          settledMessageCount++;
        }

        settledMessageCount.should.equal(1, "Unexpected number of settled messages.");

        const connectionContext = (receiver as any)["_context"];
        const refreshConnection = connectionContext.refreshConnection;
        let refreshConnectionCalled = 0;
        connectionContext.refreshConnection = function(...args: any) {
          refreshConnectionCalled++;
          refreshConnection.apply(this, args);
        };

        // Simulate a disconnect being called with a non-retryable error.
        (receiver as ServiceBusReceiverImpl)["_context"].connection["_connection"].idle();

        // send a second message to trigger the message handler again.
        await sender.sendMessages(TestMessage.getSample());

        // wait for the 2nd message to be received.
        const messages2 = await receiver.receiveMessages(1);
        for (const message of messages2) {
          await receiver.completeMessage(message);
          settledMessageCount++;
        }
        settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
        refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
      });

      it("returns messages if drain is in progress (receiveAndDelete)", async function(): Promise<
        void
      > {
        // Create the sender and receiver.
        await beforeEachTest(noSessionTestClientType, "receiveAndDelete");

        // The first time `receiveMessages` is called the receiver link is created.
        // The `receiver_drained` handler is only added after the link is created,
        // which is a non-blocking task.
        await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
        const receiverContext = (receiver as ServiceBusReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusReceiverImpl)["_batchingReceiver"];

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSample());

        const didRequestDrain = new Promise((resolve) => {
          simulateDisconnectDuringDrain(receiverContext, batchingReceiver, resolve);
        });

        // Purposefully request more messages than what's available
        // so that the receiver will have to drain.
        const messages1 = await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });

        await didRequestDrain;
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
        await beforeEachTest(noSessionTestClientType);

        // The first time `receiveMessages` is called the receiver link is created.
        // The `receiver_drained` handler is only added after the link is created,
        // which is a non-blocking task.
        await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
        const receiverContext = (receiver as ServiceBusReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusReceiverImpl)["_batchingReceiver"];

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSample());

        const didRequestDrain = new Promise((resolve) => {
          simulateDisconnectDuringDrain(receiverContext, batchingReceiver, resolve);
        });

        // Purposefully request more messages than what's available
        // so that the receiver will have to drain.
        const testFailureMessage = "Test failure";
        try {
          await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });
          throw new Error(testFailureMessage);
        } catch (err) {
          err.message && err.message.should.not.equal(testFailureMessage);
        }

        await didRequestDrain;

        // Make sure that a 2nd receiveMessages call still works
        // by sending and receiving a single message again.
        await sender.sendMessages(TestMessage.getSample());

        // wait for the 2nd message to be received.
        const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

        messages.length.should.equal(1, "Unexpected number of messages received.");
      });

      it("returns messages if receive in progress (receiveAndDelete)", async function(): Promise<
        void
      > {
        // Create the sender and receiver.
        await beforeEachTest(noSessionTestClientType, "receiveAndDelete");

        // The first time `receiveMessages` is called the receiver link is created.
        // The `receiver_drained` handler is only added after the link is created,
        // which is a non-blocking task.
        await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
        const receiverContext = (receiver as ServiceBusReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusReceiverImpl)["_batchingReceiver"];

        if (!batchingReceiver || !batchingReceiver.isOpen()) {
          throw new Error(`batchingReceiver is not open or undefined.`);
        }

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSample());

        // Simulate a disconnect after a message has been received.
        batchingReceiver["link"]!.once("message", function() {
          setTimeout(() => {
            // Simulate a disconnect being called with a non-retryable error.
            receiverContext.connection["_connection"].idle();
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
        await beforeEachTest(noSessionTestClientType);

        // The first time `receiveMessages` is called the receiver link is created.
        // The `receiver_drained` handler is only added after the link is created,
        // which is a non-blocking task.
        await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 });
        const receiverContext = (receiver as ServiceBusReceiverImpl)["_context"];

        // Simulate a disconnect
        setTimeout(() => {
          // Simulate a disconnect being called with a non-retryable error.
          receiverContext.connection["_connection"].idle();
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

    describe(withSessionTestClientType + ": Batch Receiver - disconnects", function(): void {
      let serviceBusClient: ServiceBusClientForTests;
      let sender: ServiceBusSender;
      let receiver: ServiceBusSessionReceiver;

      async function beforeEachTest(
        receiveMode: "peekLock" | "receiveAndDelete" = "peekLock"
      ): Promise<void> {
        serviceBusClient = createServiceBusClientForTests();
        entityNames = await serviceBusClient.test.createTestEntities(withSessionTestClientType);
        if (receiveMode == "receiveAndDelete") {
          receiver = (await serviceBusClient.test.createReceiveAndDeleteReceiver(
            entityNames
          )) as ServiceBusSessionReceiver;
        } else {
          receiver = (await serviceBusClient.test.createPeekLockReceiver(
            entityNames
          )) as ServiceBusSessionReceiver;
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

      it(`throws "session lock has expired" after a disconnect`, async function(): Promise<void> {
        // Create the sender and receiver.
        await beforeEachTest();

        // Send a message so we can be sure when the receiver is open and active.
        const message = TestMessage.getSessionSample();
        await sender.sendMessages(message);

        let settledMessageCount = 0;

        const messages1 = await receiver.receiveMessages(1);
        for (const message of messages1) {
          await receiver.completeMessage(message);
          settledMessageCount++;
        }

        settledMessageCount.should.equal(1, "Unexpected number of settled messages.");

        const connectionContext = (receiver as any)["_context"];
        const refreshConnection = connectionContext.refreshConnection;
        let refreshConnectionCalled = 0;
        connectionContext.refreshConnection = function(...args: any) {
          refreshConnectionCalled++;
          refreshConnection.apply(this, args);
        };

        // Simulate a disconnect being called with a non-retryable error.
        (receiver as ServiceBusSessionReceiverImpl)["_context"].connection["_connection"].idle();

        // send a second message to trigger the message handler again.
        await sender.sendMessages(TestMessage.getSessionSample());
        try {
          await receiver.receiveMessages(1);
          assert.fail("receiveMessages should have failed");
        } catch (error) {
          should.equal(
            error.message,
            `The session lock has expired on the session with id ${message.sessionId}`
          );
        }
        refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
      });

      it("returns messages if drain is in progress (receiveAndDelete)", async function(): Promise<
        void
      > {
        // Create the sender and receiver.
        await beforeEachTest("receiveAndDelete");

        // Send a message so we can be sure when the receiver is open and active.
        await sender.sendMessages(TestMessage.getSessionSample());

        const messages1 = await receiver.receiveMessages(1);
        should.equal(
          messages1.length,
          1,
          "Unexpected number of received messages(before disconnect)."
        );

        const receiverContext = (receiver as ServiceBusSessionReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusSessionReceiverImpl)["_messageSession"];

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSessionSample());

        const didRequestDrain = new Promise((resolve) => {
          simulateDisconnectDuringDrain(receiverContext, batchingReceiver, resolve);
        });

        // Purposefully request more messages than what's available
        // so that the receiver will have to drain.
        const messages2 = await receiver.receiveMessages(10);

        await didRequestDrain;
        messages2.length.should.equal(
          1,
          "Unexpected number of messages received(during disconnect)."
        );

        await sender.sendMessages(TestMessage.getSessionSample());

        try {
          // New receiveMessages should fail because the session lock would be lost due to the disconnection
          await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });
          assert.fail("Receive messages call should have failed since the lock was lost");
        } catch (error) {
          should.equal(
            error.message,
            `The session lock has expired on the session with id ${TestMessage.sessionId}`,
            "Unexpected error thrown"
          );
          await delay(2000); // Adding a delay of 2 sec to make sure the flaky ness goes away
          // wait for the 2nd message to be received.
          receiver = (await serviceBusClient.test.createReceiveAndDeleteReceiver(
            entityNames
          )) as ServiceBusSessionReceiver;
          const messages3 = await receiver.receiveMessages(1);

          messages3.length.should.equal(
            1,
            "Unexpected number of messages received(upon reconnecting)."
          );
        }
      });

      it("throws an error if drain is in progress (peekLock)", async function(): Promise<void> {
        // Create the sender and receiver.
        await beforeEachTest();

        // Send a message so we can be sure when the receiver is open and active.
        await sender.sendMessages(TestMessage.getSessionSample());

        const messages1 = await receiver.receiveMessages(1);
        should.equal(
          messages1.length,
          1,
          "Unexpected number of received messages(before disconnect)."
        );

        const receiverContext = (receiver as ServiceBusSessionReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusSessionReceiverImpl)["_messageSession"];

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSessionSample());

        const didRequestDrain = new Promise((resolve) => {
          simulateDisconnectDuringDrain(receiverContext, batchingReceiver, resolve);
        });

        // Purposefully request more messages than what's available
        // so that the receiver will have to drain.
        const testFailureMessage = "Test failure";
        try {
          await receiver.receiveMessages(10, { maxWaitTimeInMs: 5000 });
          throw new Error(testFailureMessage);
        } catch (err) {
          err.message &&
            err.code.should.equal("SessionLockLost") &&
            err.message.should.not.equal(testFailureMessage);
        }

        await didRequestDrain;
      });

      it("returns messages if receive in progress (receiveAndDelete)", async function(): Promise<
        void
      > {
        // Create the sender and receiver.
        await beforeEachTest("receiveAndDelete");

        // Send a message so we can be sure when the receiver is open and active.
        await sender.sendMessages(TestMessage.getSessionSample());

        const messages1 = await receiver.receiveMessages(1);
        should.equal(
          messages1.length,
          1,
          "Unexpected number of received messages(before disconnect)."
        );

        const receiverContext = (receiver as ServiceBusSessionReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusSessionReceiverImpl)["_messageSession"];

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSessionSample());

        // Simulate a disconnect after a message has been received.
        batchingReceiver["link"]!.once("message", function() {
          setTimeout(() => {
            // Simulate a disconnect being called with a non-retryable error.
            receiverContext.connection["_connection"].idle();
          }, 0);
        });

        // Purposefully request more messages than what's available
        // so that the receiver will have to drain.
        const messages2 = await receiver.receiveMessages(10);

        messages2.length.should.equal(
          1,
          "Unexpected number of messages received(during disconnect)."
        );

        await sender.sendMessages(TestMessage.getSessionSample());

        try {
          // New receiveMessages should fail because the session lock would be lost due to the disconnection
          await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });
          assert.fail("Receive messages call should have failed since the lock was lost");
        } catch (error) {
          should.equal(
            error.message,
            `The session lock has expired on the session with id ${TestMessage.sessionId}`,
            "Unexpected error thrown"
          );
          // wait for the 2nd message to be received.
          await receiver.close();
          receiver = (await serviceBusClient.test.createReceiveAndDeleteReceiver(
            entityNames
          )) as ServiceBusSessionReceiver;
          const messages3 = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });

          messages3.length.should.equal(
            1,
            "Unexpected number of messages received(upon reconnecting)."
          );
        }
      });

      it("throws an error if receive is in progress (peekLock)", async function(): Promise<void> {
        // Create the sender and receiver.
        await beforeEachTest();

        // Send a message so we can be sure when the receiver is open and active.
        await sender.sendMessages(TestMessage.getSessionSample());

        const messages1 = await receiver.receiveMessages(1);
        should.equal(
          messages1.length,
          1,
          "Unexpected number of received messages(before disconnect)."
        );

        const receiverContext = (receiver as ServiceBusSessionReceiverImpl)["_context"];
        const batchingReceiver = (receiver as ServiceBusSessionReceiverImpl)["_messageSession"];

        // Send a message so we have something to receive.
        await sender.sendMessages(TestMessage.getSessionSample());

        // Simulate a disconnect after a message has been received.
        batchingReceiver["link"]!.once("message", function() {
          setTimeout(() => {
            // Simulate a disconnect being called with a non-retryable error.
            receiverContext.connection["_connection"].idle();
          }, 0);
        });

        // Purposefully request more messages than what's available
        // so that the receiver will have to drain.
        const testFailureMessage = "Test failure";
        try {
          await receiver.receiveMessages(10, { maxWaitTimeInMs: 5000 });
          throw new Error(testFailureMessage);
        } catch (err) {
          err.message &&
            err.code.should.equal("SessionLockLost") &&
            err.message.should.not.equal(testFailureMessage);
        }
      });
    });
  });
});
