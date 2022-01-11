// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { delay, ServiceBusMessage, ServiceBusSender } from "../../src";
import { TestClientType, TestMessage } from "../public/utils/testUtils";
import { ServiceBusReceiver, ServiceBusReceiverImpl } from "../../src/receivers/receiver";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  //   getRandomTestClientTypeWithSessions,
  getRandomTestClientTypeWithNoSessions,
} from "../public/utils/testutils2";
import {
  DispositionType,
  ServiceBusMessageImpl,
  ServiceBusReceivedMessage,
} from "../../src/serviceBusMessage";
import { testLogger } from "./utils/misc";

const should = chai.should();
chai.use(chaiAsPromised);

const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
// const withSessionTestClientType = getRandomTestClientTypeWithSessions();

describe("Message settlement After Receiver is Closed - Through ManagementLink", () => {
  let serviceBusClient: ServiceBusClientForTests;

  let sender: ServiceBusSender;
  let receiver: ServiceBusReceiver;
  let deadLetterReceiver: ServiceBusReceiver;
  let entityNames: EntityName;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    deadLetterReceiver = serviceBusClient.test.createDeadLetterReceiver(entityNames);
  }

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  async function sendReceiveMsg(
    testMessages: ServiceBusMessage
  ): Promise<ServiceBusReceivedMessage> {
    await sender.sendMessages(testMessages);
    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");
    should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    return msgs[0];
  }

  async function testComplete(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);
    const msgDeliveryLink = (msg as ServiceBusMessageImpl).delivery.link.name;

    if (entityNames.usesSessions) {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageSessions[
        msgDeliveryLink
      ].close();
    } else {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageReceivers[
        msgDeliveryLink
      ].close();
    }

    let errorWasThrown = false;
    try {
      await receiver.completeMessage(msg);
    } catch (err) {
      should.equal(
        err.message,
        `Failed to ${DispositionType.complete} the message as the AMQP link with which the message was received is no longer alive.`,
        "Unexpected error thrown"
      );
      errorWasThrown = true;
    }

    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
    if (entityNames.usesSessions) {
      should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
      const msgBatch = await receiver.receiveMessages(1);
      await receiver.completeMessage(msgBatch[0]);
    } else {
      should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
    }
    await testPeekMsgsLength(receiver, 0);
  }

  it(noSessionTestClientType + ": complete() removes message", async function (): Promise<void> {
    await beforeEachTest(noSessionTestClientType);
    await testComplete();
  });

  //   it(withSessionTestClientType + ": complete() removes message", async function(): Promise<void> {
  //     await beforeEachTest(withSessionTestClientType);
  //     await testComplete();
  //   });

  async function testAbandon(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);
    const msgDeliveryLink = (msg as ServiceBusMessageImpl).delivery.link.name;

    if (entityNames.usesSessions) {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageSessions[
        msgDeliveryLink
      ].close();
    } else {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageReceivers[
        msgDeliveryLink
      ].close();
    }

    let errorWasThrown = false;
    try {
      await receiver.abandonMessage(msg);
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
      should.equal(errorWasThrown, false, "Error was thrown for messages without session-id");
    }
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
    await testPeekMsgsLength(receiver, 1);

    const messageBatch = await receiver.receiveMessages(1);

    await receiver.completeMessage(messageBatch[0]);

    await testPeekMsgsLength(receiver, 0);
  }

  it(
    noSessionTestClientType + ": abandon() retains message with incremented deliveryCount",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testAbandon();
    }
  );

  //   it(
  //     withSessionTestClientType + ": abandon() retains message with incremented deliveryCount",
  //     async function(): Promise<void> {
  //       await beforeEachTest(withSessionTestClientType);
  //       await testAbandon();
  //     }
  //   );

  async function testDefer(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);

    if (!msg.sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    const sequenceNumber = msg.sequenceNumber;
    const msgDeliveryLink = (msg as ServiceBusMessageImpl).delivery.link.name;

    if (entityNames.usesSessions) {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageSessions[
        msgDeliveryLink
      ].close();
    } else {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageReceivers[
        msgDeliveryLink
      ].close();
    }

    let errorWasThrown = false;
    try {
      await receiver.deferMessage(msg);
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
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
    if (!entityNames.usesSessions) {
      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
      if (!deferredMsg) {
        throw "No message received for sequence number";
      }
      await receiver.completeMessage(deferredMsg);
    } else {
      const messageBatch = await receiver.receiveMessages(1);
      await receiver.completeMessage(messageBatch[0]);
    }
    await testPeekMsgsLength(receiver, 0);
  }

  it(
    noSessionTestClientType + ": defer() moves message to deferred queue",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testDefer();
    }
  );

  //   it(
  //     withSessionTestClientType + ": defer() moves message to deferred queue",
  //     async function(): Promise<void> {
  //       await beforeEachTest(withSessionTestClientType);
  //       await testDefer();
  //     }
  //   );

  async function testDeadletter(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();

    testLogger.info(`sending (and receiving) initial message`);

    const msg = await sendReceiveMsg(testMessages);

    testLogger.info(`Done sending initial messages`);

    const msgDeliveryLink = (msg as ServiceBusMessageImpl).delivery.link.name;

    testLogger.info(`About to close the underlying link.`);

    if (entityNames.usesSessions) {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageSessions[
        msgDeliveryLink
      ].close();
    } else {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageReceivers[
        msgDeliveryLink
      ].close();
    }

    testLogger.info(
      `Underlying link should be closed: ${receiver.isClosed}. This will force us to use the management link to settle. Will now attempt to dead letter.`
    );

    let errorWasThrown = false;
    try {
      await receiver.deadLetterMessage(msg);

      testLogger.info(`Message has been dead lettered`);
    } catch (err) {
      testLogger.error(`Exception thrown`, err);

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

    testLogger.info(
      `Creating a peek lock dead letter receiver and attempting to receive the dead lettered message`
    );
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);

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

      testLogger.info(`Attempting to complete the message: ${deadLetterMsgsBatch[0].messageId}`);
      await receiver.completeMessage(deadLetterMsgsBatch[0]);
      await testPeekMsgsLength(deadLetterReceiver, 0);
    } else {
      const messageBatch = await receiver.receiveMessages(1);

      testLogger.info(`Attempting to complete the message: ${messageBatch[0].messageId}`);
      await receiver.completeMessage(messageBatch[0]);
      await testPeekMsgsLength(receiver, 0);
    }

    testLogger.info(`Done testing dead letter`);
  }

  it(
    noSessionTestClientType + ": deadLetter() moves message to deadletter queue",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testDeadletter();
    }
  );

  //   it(
  //     withSessionTestClientType + ": deadLetter() moves message to deadletter queue",
  //     async function(): Promise<void> {
  //       await beforeEachTest(withSessionTestClientType);
  //       await testDeadletter();
  //     }
  //   );

  async function testRenewLock(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const msg = await sendReceiveMsg(testMessages);
    const msgDeliveryLink = (msg as ServiceBusMessageImpl).delivery.link.name;

    if (entityNames.usesSessions) {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageSessions[
        msgDeliveryLink
      ].close();
    } else {
      await (receiver as ServiceBusReceiverImpl)["_context"].messageReceivers[
        msgDeliveryLink
      ].close();
    }

    let errorWasThrown = false;
    try {
      await delay(2000); // Add a delay after receiving the messages to make sure the msg.lockedUntil gets updated after the renewlock operation
      const lockedUntilBeforeRenewlock = msg.lockedUntilUtc;
      const lockedUntilAfterRenewlock = await receiver.renewMessageLock(msg);
      should.equal(
        lockedUntilAfterRenewlock > lockedUntilBeforeRenewlock!,
        true,
        "MessageLock did not get renewed!"
      );
      await receiver.completeMessage(msg);
    } catch (err) {
      if (!entityNames.usesSessions) {
        throw err;
      } else {
        should.equal(
          err.message,
          `Invalid operation on the message, message lock doesn't exist when dealing with sessions`,
          "Unexpected error thrown"
        );
      }
      errorWasThrown = true;
    }

    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
    if (entityNames.usesSessions) {
      should.equal(errorWasThrown, true, "Error was not thrown for messages with session-id");
      const msgBatch = await receiver.receiveMessages(1);
      await receiver.completeMessage(msgBatch[0]);
    } else {
      should.equal(errorWasThrown, false, "Error was thrown for sessions without session-id");
    }
    await testPeekMsgsLength(receiver, 0);
  }

  it(noSessionTestClientType + ": Lock renewal for a message", async function (): Promise<void> {
    await beforeEachTest(noSessionTestClientType);
    await testRenewLock();
  });

  //   it(withSessionTestClientType + ": Lock renewal for session", async function(): Promise<void> {
  //     await beforeEachTest(withSessionTestClientType);
  //     await testRenewLock();
  //   });
});
