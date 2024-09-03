// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getStartingPositionsForTests } from "../utils/testUtils.js";
import {
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  ReceivedEventData,
  Subscription,
} from "../../src/index.js";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { BodyTypes } from "../../src/dataTransformer.js";
import { Buffer } from "buffer";
import { randomUUID } from "@azure/core-util";
import { should, assert } from "../utils/chai.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createConsumer, createProducer } from "../utils/clients.js";

describe("AmqpAnnotatedMessage", function () {
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;

  beforeEach(async function () {
    producerClient = createProducer().producer;
    consumerClient = createConsumer().consumer;
  });

  afterEach(async function () {
    await producerClient.close();
    await consumerClient.close();
  });

  function getSampleAmqpAnnotatedMessage(): AmqpAnnotatedMessage {
    const randomTag = Math.random().toString();

    return {
      body: `message body ${randomTag}`,
      bodyType: "data",
      applicationProperties: {
        propOne: 1,
        propTwo: "two",
        propThree: true,
        propFour: Date(),
      },
      footer: {
        propFooter: "foot",
      },
      messageAnnotations: { propMsgAnnotate: "annotation" },
      properties: {
        contentEncoding: "application/json; charset=utf-8",
        correlationId: randomTag,
        messageId: randomUUID(),
      },
    } as AmqpAnnotatedMessage;
  }

  /**
   * Helper function that will receive a single event that comes after the starting positions.
   *
   * Note: Call this after sending a single event to Event Hubs to validate
   * @internal
   */
  async function receiveEvent(startingPositions: {
    [partitionId: string]: EventPosition;
  }): Promise<ReceivedEventData> {
    return new Promise<ReceivedEventData>((resolve, reject) => {
      const subscription: Subscription = consumerClient.subscribe(
        {
          async processError(err) {
            reject(err);
            return subscription.close();
          },
          async processEvents(events) {
            if (events.length) {
              resolve(events[0]);
              return subscription.close();
            }
          },
        },
        {
          startPosition: startingPositions,
        },
      );
    });
  }

  async function sendEvents(
    messages: AmqpAnnotatedMessage[],
    { useBatch }: { useBatch: boolean },
  ): Promise<void> {
    if (!useBatch) {
      return producerClient.sendBatch(messages);
    }

    const batch = await producerClient.createBatch();
    for (const message of messages) {
      assert.isTrue(batch.tryAdd(message));
    }

    return producerClient.sendBatch(batch);
  }

  describe("round-tripping AMQP encoding/decoding", function () {
    [{ useBatch: true }, { useBatch: false }].forEach(({ useBatch }) => {
      it(`props (useBatch: ${useBatch})`, async function () {
        const startingPositions = await getStartingPositionsForTests(consumerClient);
        const testMessage = getSampleAmqpAnnotatedMessage();
        await sendEvents([testMessage], { useBatch });

        const event = await receiveEvent(startingPositions);
        should.equal(event.body, testMessage.body, "Unexpected body on the received event.");
        should.equal(
          event.getRawAmqpMessage().messageAnnotations!["propMsgAnnotate"],
          testMessage.messageAnnotations!["propMsgAnnotate"],
          "Unexpected messageAnnotations on the received event.",
        );
        assert.deepEqualExcluding(
          event.getRawAmqpMessage(),
          testMessage,
          ["deliveryAnnotations", "body", "messageAnnotations", "header", "properties"],
          "Unexpected on the AmqpAnnotatedMessage",
        );
        assert.deepEqualExcluding(
          event.getRawAmqpMessage().footer!,
          testMessage.footer!,
          ["deliveryCount"],
          "Unexpected header on the AmqpAnnotatedMessage",
        );
        assert.deepEqualExcluding(
          event.getRawAmqpMessage().properties!,
          testMessage.properties!,
          ["creationTime", "absoluteExpiryTime", "groupId"],
          "Unexpected properties on the AmqpAnnotatedMessage",
        );
        assert.equal(
          event.getRawAmqpMessage().properties!.groupId,
          testMessage.properties!.groupId,
          "Unexpected session-id on the AmqpAnnotatedMessage",
        );
      });

      it(`values (useBatch: ${useBatch})`, async function () {
        const valueTypes = [[1, 2, 3], 1, 1.5, "hello", { hello: "world" }];
        for (const valueType of valueTypes) {
          const startingPositions = await getStartingPositionsForTests(consumerClient);
          await sendEvents(
            [
              {
                body: valueType,
                bodyType: "value",
              },
            ],
            { useBatch },
          );

          const event = await receiveEvent(startingPositions);
          assert.deepEqual(
            event.getRawAmqpMessage().bodyType,
            "value",
            `Should be identified as a value: ${valueType.toString()}`,
          );

          assert.deepEqual(
            event.body,
            valueType,
            `Deserialized body should be equal: ${valueType.toString()}`,
          );
        }
      });

      it(`sequences (useBatch: ${useBatch})`, async function () {
        const sequenceTypes = [
          [[1], [2], [3]],
          [1, 2, 3],
        ];

        for (const sequenceType of sequenceTypes) {
          const startingPositions = await getStartingPositionsForTests(consumerClient);
          await sendEvents(
            [
              {
                body: sequenceType,
                bodyType: "sequence",
              },
            ],
            { useBatch },
          );

          const event = await receiveEvent(startingPositions);
          assert.deepEqual(
            event.getRawAmqpMessage().bodyType,
            "sequence",
            `Should be identified as a value: ${sequenceType.toString()}`,
          );

          assert.deepEqual(
            event.body,
            sequenceType,
            `Deserialized body should be equal: ${sequenceType.toString()}`,
          );
        }
      });

      it(`data (useBatch: ${useBatch})`, async function () {
        const buff = Buffer.from("hello", "utf8");

        const dataTypes = [1, 1.5, "hello", { hello: "world" }, buff, [1, 2, 3]];

        for (const dataType of dataTypes) {
          const startingPositions = await getStartingPositionsForTests(consumerClient);
          await sendEvents(
            [
              {
                body: dataType,
                bodyType: "data",
              },
            ],
            { useBatch },
          );

          const event = await receiveEvent(startingPositions);

          assert.deepEqual(
            event.getRawAmqpMessage().bodyType,
            "data",
            `Should be identified as data: ${dataType.toString()}`,
          );
          assert.deepEqual(
            event.body,
            dataType,
            `Deserialized body should be equal: : ${dataType.toString()}`,
          );
        }
      });

      (
        [
          ["sequence", [1, 2, 3]],
          ["value", "hello"],
          ["data", "hello"],
        ] as [BodyTypes, any][]
      ).forEach(([expectedBodyType, expectedBody]) => {
        it(`receive ${expectedBodyType} EventData and resend (useBatch: ${useBatch})`, async function () {
          let startingPositions = await getStartingPositionsForTests(consumerClient);
          // if we receive an event that was encoded to a non-data section
          // and then re-send it (again, as an EventData) we should
          // respect it.
          await sendEvents(
            [
              {
                body: expectedBody,
                bodyType: expectedBodyType,
              },
            ],
            { useBatch },
          );

          const event = await receiveEvent(startingPositions);

          assert.equal(event.getRawAmqpMessage().bodyType, expectedBodyType);

          startingPositions = await getStartingPositionsForTests(consumerClient);
          // now let's just resend it, unaltered
          await sendEvents([event], { useBatch });

          const reencodedEvent = await receiveEvent(startingPositions);

          assert.equal(reencodedEvent.getRawAmqpMessage().bodyType, expectedBodyType);
          assert.deepEqual(reencodedEvent.body, expectedBody);
        });
      });
    });
  });
});
