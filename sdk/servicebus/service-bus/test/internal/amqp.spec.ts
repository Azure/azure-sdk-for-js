// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import { ServiceBusSender } from "../../src";
import { TestClientType } from "../public/utils/testUtils";
import { ServiceBusSenderImpl } from "../../src/sender";
import { addServiceBusClientForLiveTesting } from "../public/utils/testutils2";
const assert = chai.assert;

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
