// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getStartingPositionsForTests } from "../utils/testUtils.js";
import {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  ReceivedEventData,
  Subscription,
} from "../../src/index.js";
import { randomUUID } from "@azure/core-util";
import { should } from "../utils/chai.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createConsumer, createProducer } from "../utils/clients.js";

describe("EventData", function () {
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

  function getSampleEventData(): EventData {
    const randomTag = Math.random().toString();

    return {
      body: `message body ${randomTag}`,
      contentEncoding: "application/json; charset=utf-8",
      correlationId: randomTag,
      messageId: randomUUID(),
    } as EventData;
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

  describe("round-tripping AMQP encoding/decoding", function () {
    beforeEach(async function () {
      for (let i = 1; i < 100; i++) {
        const filer = { body: "b", messageId: randomUUID() };
        await producerClient.sendBatch([filer]);
      }
    });
    it(`props`, async function () {
      const startingPositions = await getStartingPositionsForTests(consumerClient);
      const testEvent = getSampleEventData();
      await producerClient.sendBatch([testEvent]);

      const event = await receiveEvent(startingPositions);
      should.equal(event.body, testEvent.body, "Unexpected body on the received event.");
      should.equal(
        event.contentType,
        testEvent.contentType,
        "Unexpected contentType on the received event.",
      );
      should.equal(
        event.correlationId,
        testEvent.correlationId,
        "Unexpected correlationId on the received event.",
      );
      should.equal(
        event.messageId,
        testEvent.messageId,
        "Unexpected messageId on the received event.",
      );
    });

    it(`null body`, async function () {
      const startingPositions = await getStartingPositionsForTests(consumerClient);
      const testEvent: EventData = { body: null };
      await producerClient.sendBatch([testEvent]);

      const event = await receiveEvent(startingPositions);
      should.equal(event.body, testEvent.body, "Unexpected body on the received event.");
    });
  });
});
