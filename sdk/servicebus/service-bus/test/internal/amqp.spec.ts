// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import { ServiceBusReceiver, ServiceBusSender } from "../../src";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests
} from "../public/utils/testutils2";
import { TestClientType } from "../public/utils/testUtils";
const assert = chai.assert;

describe("AMQP message encoding", () => {
  // Messaging format (describes the three types of encodable entities - 'data', 'sequence' or 'value')
  // http://docs.oasis-open.org/amqp/core/v1.0/csprd01/amqp-core-messaging-v1.0-csprd01.html#type-data

  // Primitive types
  // http://docs.oasis-open.org/amqp/core/v1.0/csprd01/amqp-core-types-v1.0-csprd01.html#toc

  describe("amqp encoding/decoding", () => {
    let client: ServiceBusClientForTests;
    let sender: ServiceBusSender;
    let receiver: ServiceBusReceiver;

    before(() => {
      client = createServiceBusClientForTests();
    });

    beforeEach(async () => {
      const testEntities = await client.test.createTestEntities(TestClientType.UnpartitionedQueue);
      sender = await client.test.createSender(testEntities);
      receiver = await client.test.createReceiveAndDeleteReceiver(testEntities);
    });

    afterEach(() => client.test.afterEach());
    after(() => client.test.after());

    it("values", async () => {
      const valueTypes = [[1, 2, 3], 1, 1.5, "hello", { hello: "world" }];

      for (const valueType of valueTypes) {
        await sender.sendMessages({
          body: valueType,
          bodyType: "value"
        });

        const messages = await receiver.receiveMessages(1);
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
        await sender.sendMessages({
          body: sequenceType,
          bodyType: "sequence"
        });

        const messages = await receiver.receiveMessages(1);
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
        await sender.sendMessages({
          body: dataType,
          bodyType: "data"
        });

        const messages = await receiver.receiveMessages(1);
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
  });
});
