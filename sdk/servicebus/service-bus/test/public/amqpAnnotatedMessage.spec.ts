// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusSender, ServiceBusReceivedMessage } from "../../src";
import { TestClientType, TestMessage } from "../public/utils/testUtils";
import { ServiceBusReceiver } from "../../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  EntityName,
  getRandomTestClientTypeWithNoSessions
} from "../public/utils/testutils2";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";

const should = chai.should();
chai.use(chaiAsPromised);
const assert = chai.assert;

const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
// const anyRandomTestClientType = getRandomTestClientType();

let serviceBusClient: ServiceBusClientForTests;
let entityNames: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;

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
}

function afterEachTest(): Promise<void> {
  return serviceBusClient.test.afterEach();
}

describe("AmqpAnnotatedMessage", function(): void {
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
    testMessage: AmqpAnnotatedMessage
  ): Promise<ServiceBusReceivedMessage> {
    await sender.sendMessages(testMessage);
    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "Unecpected body on the received message");
    should.equal(
      msgs[0]._rawAmqpMessage.messageAnnotations!["propMsgAnnotate"],
      testMessage.messageAnnotations!["propMsgAnnotate"],
      "Unexpected messageAnnotations on the received message"
    );
    assert.deepEqualExcluding(
      msgs[0]._rawAmqpMessage,
      testMessage,
      ["deliveryAnnotations", "body", "messageAnnotations", "header"],
      "Unexpected AmqpAnnotatedMessage"
    );
    assert.deepEqualExcluding(
      msgs[0]._rawAmqpMessage.header!,
      testMessage.header!,
      ["deliveryCount"],
      "Unexpected header for AmqpAnnotatedMessage"
    );

    return msgs[0];
  }

  async function testComplete(): Promise<void> {
    const testMessages: AmqpAnnotatedMessage = {
      ...TestMessage.getSampleForAmqpAnnotatedMessage(),
      properties: { groupId: entityNames.usesSessions ? "session-1" : undefined }
    };
    const msg = await sendReceiveMsg(testMessages);

    await receiver.completeMessage(msg);

    await testPeekMsgsLength(receiver, 0);
  }
  // TODO: Make it anyTestClientType
  it(
    noSessionTestClientType + ": send, receive, verify props, and complete()",
    async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testComplete();
    }
  );
});
