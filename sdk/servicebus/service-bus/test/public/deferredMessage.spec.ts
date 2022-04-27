// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay, ServiceBusMessage } from "../../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import {
  createServiceBusClientForTests,
  testPeekMsgsLength,
  EntityName,
  getRandomTestClientTypeWithSessions,
  getRandomTestClientTypeWithNoSessions,
} from "./utils/testutils2";
import { ServiceBusReceiver } from "../../src";
import { ServiceBusSender } from "../../src";
import { ServiceBusReceivedMessage } from "../../src";
import Long from "long";

describe("Deferred Messages", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let sender: ServiceBusSender;
  let receiver: ServiceBusReceiver;
  let deadLetterReceiver: ServiceBusReceiver;

  let entityNames: EntityName;
  const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
  const withSessionTestClientType = getRandomTestClientTypeWithSessions();

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
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

  it(
    noSessionTestClientType + ": Empty array as input throws no error",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      const msgs = await receiver.receiveDeferredMessages([]);
      should.equal(msgs.length, 0);
    }
  );

  it(
    withSessionTestClientType + ": Empty array as input throws no error",
    async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      const msgs = await receiver.receiveDeferredMessages([]);
      should.equal(msgs.length, 0);
    }
  );

  /**
   * Sends, defers, receives and then returns a test message
   * @param testMessage - Test message to send, defer, receive and then return
   * @param passSequenceNumberInArray - Boolean to indicate whether to pass the sequence number
   * as is or in an array to ensure both get code coverage
   */
  async function deferMessage(
    testMessage: ServiceBusMessage,
    passSequenceNumberInArray: boolean
  ): Promise<ServiceBusReceivedMessage> {
    await sender.sendMessages(testMessage);
    const receivedMsgs = await receiver.receiveMessages(1);

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
    await receiver.deferMessage(receivedMsgs[0]);

    const [deferredMsg] = await receiver.receiveDeferredMessages(
      passSequenceNumberInArray ? [sequenceNumber] : sequenceNumber
    );
    if (!deferredMsg) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsg.state, "deferred");
    should.equal(
      !!(deferredMsg as any)["delivery"],
      true,
      "Deferred msg should have delivery! We use this assumption to differentiate between deferred msg and other messages when settling."
    );
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
    testMessages: ServiceBusMessage
  ): Promise<void> {
    await testPeekMsgsLength(receiver, 1);

    const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
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

    await receiver.completeMessage(deferredMsg);

    await testPeekMsgsLength(receiver, 0);
  }

  async function testAbandon(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, true);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await receiver.abandonMessage(deferredMsg);
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }

  it(
    noSessionTestClientType + ": Abandoning a deferred message puts it back to the deferred queue.",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testAbandon();
    }
  );

  it(
    withSessionTestClientType +
      ": Abandoning a deferred message puts it back to the deferred queue.",
    async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testAbandon();
    }
  );

  async function testDefer(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, false);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await receiver.deferMessage(deferredMsg);
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  }
  it(
    noSessionTestClientType + ": Deferring a deferred message puts it back to the deferred queue.",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testDefer();
    }
  );

  it(
    withSessionTestClientType +
      ": Deferring a deferred message puts it back to the deferred queue.",
    async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testDefer();
    }
  );

  async function testDeadletter(): Promise<void> {
    const testMessages = entityNames.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, true);

    await receiver.deadLetterMessage(deferredMsg);

    await testPeekMsgsLength(receiver, 0);

    const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);

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

    await receiver.completeMessage(deadLetterMsgs[0]);

    await testPeekMsgsLength(deadLetterReceiver, 0);
  }

  it(
    noSessionTestClientType + ": Deadlettering a deferred message moves it to dead letter queue.",
    async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testDeadletter();
    }
  );

  it(
    withSessionTestClientType + ": Deadlettering a deferred message moves it to dead letter queue.",
    async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testDeadletter();
    }
  );

  it(`${noSessionTestClientType}: renewLock on a deferred message`, async function (): Promise<void> {
    await beforeEachTest(noSessionTestClientType);
    const testMessages = TestMessage.getSample();
    const deferredMsg = await deferMessage(testMessages, false);
    const sequenceNumber = deferredMsg.sequenceNumber;
    if (!sequenceNumber) {
      throw "Sequence Number can not be null";
    }
    await delay(2000); // Add a delay after receiving the messages to make sure the msg.lockedUntil gets updated after the renewlock operation
    const lockedUntilBeforeRenewlock = deferredMsg.lockedUntilUtc;
    const lockedUntilAfterRenewlock = await receiver.renewMessageLock(deferredMsg);
    should.equal(
      lockedUntilAfterRenewlock > lockedUntilBeforeRenewlock!,
      true,
      "MessageLock did not get renewed!"
    );
    await receiver.deferMessage(deferredMsg);
    await completeDeferredMessage(sequenceNumber, 2, testMessages);
  });
});
