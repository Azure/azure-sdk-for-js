// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusMessage } from "../src";
import { TestMessage } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomSessionEnabledTestClientType,
  getRandomNoSessionEnabledTestClientType
} from "./utils/testutils2";
import { DispositionType, ReceivedMessageWithLock } from "../src/serviceBusMessage";

const should = chai.should();
chai.use(chaiAsPromised);

const noSessionTestClientType = getRandomNoSessionEnabledTestClientType();
const withSessionTestClientType = getRandomSessionEnabledTestClientType();

[noSessionTestClientType, withSessionTestClientType].forEach((testClientType) => {
  describe(testClientType + ": Backup message settlement - Through ManagementLink", () => {
    let serviceBusClient: ServiceBusClientForTests;

    let sender: Sender;
    let receiver: Receiver<ReceivedMessageWithLock>;
    let deadLetterReceiver: Receiver<ReceivedMessageWithLock>;
    let entityName: EntityName;
    let testMessage: ServiceBusMessage;

    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    beforeEach(async () => {
      entityName = await serviceBusClient.test.createTestEntities(testClientType);
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityName);

      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityName.queue ?? entityName.topic!)
      );

      deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityName);

      testMessage = entityName.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
    });

    afterEach(async () => {
      await serviceBusClient.test.afterEach();
    });

    async function sendReceiveMsg(): Promise<ReceivedMessageWithLock> {
      await sender.sendMessages(testMessage);
      const msgs = await receiver.receiveMessages(1);

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

      return msgs[0];
    }

    it("complete() removes message", async function(): Promise<void> {
      const msg = await sendReceiveMsg();
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

      receiver = await serviceBusClient.test.getPeekLockReceiver(entityName);
      if (entityName.usesSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
        const msgBatch = await receiver.receiveMessages(1);
        await msgBatch[0].complete();
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }
      await testPeekMsgsLength(receiver, 0);
    });

    it("abandon() retains message with incremented deliveryCount", async function(): Promise<void> {
      const msg = await sendReceiveMsg();
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

      if (entityName.usesSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityName);
      await testPeekMsgsLength(receiver, 1);

      const messageBatch = await receiver.receiveMessages(1);

      await messageBatch[0].complete();

      await testPeekMsgsLength(receiver, 0);
    });

    it("defer() moves message to deferred queue", async function(): Promise<void> {
      const msg = await sendReceiveMsg();

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

      if (entityName.usesSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityName);
      if (!entityName.usesSessions) {
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
    });

    it("deadLetter() moves message to deadletter queue", async function(): Promise<void> {
      const msg = await sendReceiveMsg();
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

      if (entityName.usesSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }

      receiver = await serviceBusClient.test.getPeekLockReceiver(entityName);

      if (!entityName.usesSessions) {
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
      } else {
        const messageBatch = await receiver.receiveMessages(1);
        await messageBatch[0].complete();

        await testPeekMsgsLength(receiver, 0);
      }
    });

    it("renew lock", async function(): Promise<void> {
      const msg = await sendReceiveMsg();
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

      receiver = await serviceBusClient.test.getPeekLockReceiver(entityName);
      if (entityName.usesSessions) {
        should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
        const msgBatch = await receiver.receiveMessages(1);
        await msgBatch[0].complete();
      } else {
        should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
      }
      await testPeekMsgsLength(receiver, 0);
    });
  });
});
