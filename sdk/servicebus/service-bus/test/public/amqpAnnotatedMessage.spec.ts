// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusSender } from "../../src";
import { ServiceBusReceiver } from "../../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  EntityName,
  getRandomTestClientType
} from "../public/utils/testutils2";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { generateUuid } from "@azure/core-http";

const should = chai.should();
chai.use(chaiAsPromised);
const assert = chai.assert;

const anyRandomTestClientType = getRandomTestClientType();

let serviceBusClient: ServiceBusClientForTests;
let entityNames: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;
const sessionId = "session-1";

function afterEachTest(): Promise<void> {
  return serviceBusClient.test.afterEach();
}

function getSampleAmqpAnnotatedMessage(randomTag?: string): AmqpAnnotatedMessage {
  if (randomTag == null) {
    randomTag = Math.random().toString();
  }

  return {
    body: `message body ${randomTag}`,
    bodyType: "data",
    header: {
      deliveryCount: 10, // TODO: Doesn't make sense to set on the message to be sent, should this be removed for sending?
      durable: false,
      firstAcquirer: false,
      priority: 20,
      timeToLive: 100000
    },
    applicationProperties: {
      propOne: 1,
      propTwo: "two",
      propThree: true,
      propFour: Date()
    },
    // deliveryAnnotations - TODO: should this be removed for sending?
    footer: {
      propFooter: "foot"
    },
    messageAnnotations: { propMsgAnnotate: "annotation" },
    properties: {
      contentEncoding: "application/json; charset=utf-8",
      correlationId: randomTag,
      messageId: generateUuid()
    }
  };
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

  async function receiveMsg(testMessage: AmqpAnnotatedMessage) {
    receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver({
      ...entityNames,
      sessionId
    });
    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "Unexpected body on the received message");
    should.equal(
      msgs[0]._rawAmqpMessage.messageAnnotations!["propMsgAnnotate"],
      testMessage.messageAnnotations!["propMsgAnnotate"],
      "Unexpected messageAnnotations on the received message"
    );
    assert.deepEqualExcluding(
      msgs[0]._rawAmqpMessage,
      testMessage,
      ["deliveryAnnotations", "body", "messageAnnotations", "header", "properties"],
      "Unexpected on the AmqpAnnotatedMessage"
    );
    assert.deepEqualExcluding(
      msgs[0]._rawAmqpMessage.header!,
      testMessage.header!,
      ["deliveryCount"],
      "Unexpected header on the AmqpAnnotatedMessage"
    );
    assert.deepEqualExcluding(
      msgs[0]._rawAmqpMessage.properties!,
      testMessage.properties!,
      ["creationTime", "absoluteExpiryTime", "groupId"],
      "Unexpected properties on the AmqpAnnotatedMessage"
    );
    assert.equal(
      msgs[0]._rawAmqpMessage.properties!.groupId,
      testMessage.properties!.groupId,
      "Unexpected session-id on the AmqpAnnotatedMessage"
    );
  }

  it(
    anyRandomTestClientType + ": send, receive, verify props, and complete()",
    async function(): Promise<void> {
      entityNames = await serviceBusClient.test.createTestEntities(anyRandomTestClientType);

      const testMessage: AmqpAnnotatedMessage = getSampleAmqpAnnotatedMessage();
      testMessage.properties = {
        ...testMessage.properties,
        groupId: entityNames.usesSessions ? sessionId : undefined
      };
      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
      );
      await sender.sendMessages(testMessage);
      await receiveMsg(testMessage);

      await testPeekMsgsLength(receiver, 0);
    }
  );
});
