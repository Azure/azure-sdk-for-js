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
  getRandomTestClientType,
  addServiceBusClientForLiveTesting
} from "../public/utils/testutils2";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { generateUuid } from "@azure/core-http";
import { TestClientType } from "./utils/testUtils";
import { ServiceBusSenderImpl } from "../../src/sender";

const should = chai.should();
chai.use(chaiAsPromised);
const assert = chai.assert;

const anyRandomTestClientType = getRandomTestClientType();

describe("AMQP (live testing)", () => {
  describe("AmqpAnnotatedMessage", function(): void {
    let serviceBusClient: ServiceBusClientForTests;
    let entityNames: EntityName;
    let sender: ServiceBusSender;
    let receiver: ServiceBusReceiver;
    const sessionId = "session-1";

    before(() => {
      serviceBusClient = createServiceBusClientForTests();
    });

    after(() => {
      return serviceBusClient.test.after();
    });

    afterEach(() => {
      return serviceBusClient.test.afterEach();
    });

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

  describe("AMQP message encoding", () => {
    // Messaging format (describes the three types of encodable entities - 'data', 'sequence' or 'value')
    // http://docs.oasis-open.org/amqp/core/v1.0/csprd01/amqp-core-messaging-v1.0-csprd01.html#type-data

    // Primitive types
    // http://docs.oasis-open.org/amqp/core/v1.0/csprd01/amqp-core-types-v1.0-csprd01.html#toc
    const { sender: _senderImpl, receiver } = addServiceBusClientForLiveTesting(
      TestClientType.UnpartitionedQueue
    );
    const sender: () => Omit<ServiceBusSender, "sendMessages"> &
      Pick<ServiceBusSenderImpl, "sendMessages"> = () => {
      return _senderImpl();
    };

    describe("amqp encoding/decoding", () => {
      it("values", async () => {
        const valueTypes = [[1, 2, 3], 1, 1.5, "hello", { hello: "world" }];

        for (const valueType of valueTypes) {
          await sender().sendMessages({
            body: valueType,
            bodyType: "value"
          });

          const messages = await receiver().receiveMessages(1);
          const message = messages[0];

          assert.deepEqual(
            message._rawAmqpMessage.bodyType,
            "value",
            `Should be identified as a value: ${valueType.toString()}`
          );
          assert.deepEqual(
            message.body,
            valueType,
            `Deserialized body should be equal: : ${valueType.toString()}`
          );
        }
      });

      it("sequences", async () => {
        const sequenceTypes = [
          [[1], [2], [3]],
          [1, 2, 3]
        ];

        for (const sequenceType of sequenceTypes) {
          await sender().sendMessages({
            body: sequenceType,
            bodyType: "sequence"
          });

          const messages = await receiver().receiveMessages(1);
          const message = messages[0];

          assert.deepEqual(
            message._rawAmqpMessage.bodyType,
            "sequence",
            `Should be identified as sequence: ${sequenceType.toString()}`
          );
          assert.deepEqual(
            message.body,
            sequenceType,
            `Deserialized body should be equal: : ${sequenceType.toString()}`
          );
        }
      });

      it("data", async () => {
        const buff = Buffer.from("hello", "utf8");

        const dataTypes = [1, 1.5, "hello", { hello: "world" }, buff, [1, 2, 3]];

        for (const dataType of dataTypes) {
          await sender().sendMessages({
            body: dataType,
            bodyType: "data"
          });

          const messages = await receiver().receiveMessages(1);
          const message = messages[0];

          assert.deepEqual(
            message._rawAmqpMessage.bodyType,
            "data",
            `Should be identified as data: ${dataType.toString()}`
          );
          assert.deepEqual(
            message.body,
            dataType,
            `Deserialized body should be equal: : ${dataType.toString()}`
          );
        }
      });

      ([
        ["sequence", [1, 2, 3]],
        ["value", "hello"],
        ["data", "hello"]
      ] as ["sequence" | "data" | "value", any][]).forEach(([expectedBodyType, expectedBody]) => {
        it("receive ServiceBusMessage and resend", async () => {
          // if we receive a message that was encoded to a non-data section
          // and then re-send it (again, as a ServiceBusMessage) we should
          // respect it.
          await sender().sendMessages({
            body: expectedBody,
            bodyType: expectedBodyType
          });

          const messages = await receiver().receiveMessages(1);
          const message = messages[0];

          assert.equal(message._rawAmqpMessage.bodyType, expectedBodyType);

          // now let's just resend it, unaltered
          await sender().sendMessages(message);

          const reencodedMessages = await receiver().receiveMessages(1);
          const reencodedMessage = reencodedMessages[0];

          assert.equal(reencodedMessage._rawAmqpMessage.bodyType, expectedBodyType);
          assert.deepEqual(reencodedMessage.body, expectedBody);
        });
      });
    });
  });
});
