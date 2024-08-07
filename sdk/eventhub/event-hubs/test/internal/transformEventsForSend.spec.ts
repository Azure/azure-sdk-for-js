// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Buffer } from "buffer";
import { EventData, EventDataBatch } from "../../src/index.js";
import { PartitionPublishingProperties } from "../../src/models/private.js";

import { transformEventsForSend } from "../../src/eventHubSender.js";
import { EventDataInternal } from "../../src/eventData.js";
import {
  idempotentProducerAmqpPropertyNames,
  PENDING_PUBLISH_SEQ_NUM_SYMBOL,
} from "../../src/util/constants.js";
import { message, Message } from "rhea-promise";
import { TRACEPARENT_PROPERTY } from "../../src/diagnostics/instrumentEventData.js";
import { describe, it, beforeEach } from "vitest";
import { should } from "../utils/chai.js";
import { createProducer } from "../utils/clients.js";

describe("transformEventsForSend", function () {
  function decodeEncodedMessage(encodedMessage: Buffer): Message[] {
    const batchMessage = message.decode(encodedMessage);
    return batchMessage.body.content.map(message.decode);
  }

  describe("with (not idempotent) EventDataBatch", function () {
    let batch: EventDataBatch;

    beforeEach(async function () {
      const producerClient = createProducer().producer;
      batch = await producerClient.createBatch();

      for (let i = 1; i <= 10; i++) {
        const event: EventData = { body: `bootstrapping event #${1}` };
        batch.tryAdd(event);
      }

      await producerClient.close();
    });

    it("doesn't annotate events in batch when isIdempotentPublishingEnabled is false", async function () {
      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: false,
        partitionId: "",
      };
      const encodedMessage = transformEventsForSend(batch, publishingProps);
      should.equal(
        encodedMessage.byteLength,
        batch.sizeInBytes,
        "Batch size and encodedMessage size should match.",
      );

      // Ensure that events in the encodedMessage don't have idempotent publishing message annotations.
      const rheaMessages = decodeEncodedMessage(encodedMessage);
      for (const rheaMessage of rheaMessages) {
        should.not.exist(
          rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.epoch],
          "Idempotent epoch annotation should not exist on event.",
        );
        should.not.exist(
          rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.producerId],
          "Idempotent producerId annotation should not exist on event.",
        );
        should.not.exist(
          rheaMessage.message_annotations?.[
            idempotentProducerAmqpPropertyNames.producerSequenceNumber
          ],
          "Idempotent producerSequenceNumber annotation should not exist on event.",
        );
      }
    });
  });

  describe("with idempotent EventDataBatch", function () {
    let batch: EventDataBatch;

    beforeEach(async function () {
      const producerClient = createProducer({ enableIdempotentRetries: true }).producer;
      batch = await producerClient.createBatch({ partitionId: "0" });

      for (let i = 1; i <= 10; i++) {
        const event: EventData = { body: `bootstrapping event #${1}` };
        batch.tryAdd(event);
      }

      await producerClient.close();
    });

    it("annotates events in batch when isIdempotentPublishingEnabled is true", async function () {
      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: true,
        partitionId: "0",
        lastPublishedSequenceNumber: 0,
        ownerLevel: 1,
        producerGroupId: 3,
      };
      const startingSequenceNumber = publishingProps.lastPublishedSequenceNumber! + 1;

      const encodedMessage = transformEventsForSend(batch, publishingProps);
      should.equal(
        encodedMessage.byteLength,
        batch.sizeInBytes,
        "Batch size and encodedMessage size should match.",
      );

      // Ensure that events in the encodedMessage have idempotent publishing message annotations.
      const rheaMessages = decodeEncodedMessage(encodedMessage);
      for (let i = 0; i < rheaMessages.length; i++) {
        const rheaMessage = rheaMessages[i];
        should.equal(
          rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.epoch],
          publishingProps.ownerLevel,
          "Idempotent epoch annotation should match publishingProps.epoch on event.",
        );
        should.equal(
          rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.producerId],
          publishingProps.producerGroupId,
          "Idempotent producerId annotation should match publishingProps.producerGroupId on event.",
        );
        should.equal(
          rheaMessage.message_annotations![
            idempotentProducerAmqpPropertyNames.producerSequenceNumber
          ],
          startingSequenceNumber + i,
          "Idempotent producerSequenceNumber annotation on event should be consecutive after lastPublishedSequenceNumber.",
        );
      }
    });
  });

  describe("with EventData[]", function () {
    let events: EventData[];

    beforeEach(async function () {
      events = [];
      for (let i = 1; i <= 10; i++) {
        const event: EventData = { body: `bootstrapping event #${1}` };
        events.push(event);
      }
    });

    it("doesn't annotate events when isIdempotentPublishingEnabled is false", async function () {
      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: false,
        partitionId: "",
      };
      should.equal(Boolean(events.length), true, "Expected there to be events to test with.");

      const encodedMessage = transformEventsForSend(events, publishingProps);

      should.equal(
        Buffer.isBuffer(encodedMessage),
        true,
        "Expected events to be encoded as a binary buffer.",
      );

      // Ensure that events aren't annotated.
      for (const event of events as EventDataInternal[]) {
        should.not.exist(
          event[PENDING_PUBLISH_SEQ_NUM_SYMBOL],
          "Expected event to lack a pending publish sequence number.",
        );
        should.not.exist(event.properties, "Expected event to lack properties.");
      }

      // Ensure that events in the encodedMessage don't have idempotent publishing message annotations.
      const rheaMessages = decodeEncodedMessage(encodedMessage);
      for (const rheaMessage of rheaMessages) {
        should.not.exist(
          rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.epoch],
          "Idempotent epoch annotation should not exist on event.",
        );
        should.not.exist(
          rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.producerId],
          "Idempotent producerId annotation should not exist on event.",
        );
        should.not.exist(
          rheaMessage.message_annotations?.[
            idempotentProducerAmqpPropertyNames.producerSequenceNumber
          ],
          "Idempotent producerSequenceNumber annotation should not exist on event.",
        );
      }
    });

    it("annotates events when isIdempotentPublishingEnabled is true", async function () {
      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: true,
        partitionId: "0",
        lastPublishedSequenceNumber: 0,
        ownerLevel: 1,
        producerGroupId: 3,
      };
      const startingSequenceNumber = publishingProps.lastPublishedSequenceNumber! + 1;

      should.equal(Boolean(events.length), true, "Expected there to be events to test with.");

      const encodedMessage = transformEventsForSend(events, publishingProps);

      should.equal(
        Buffer.isBuffer(encodedMessage),
        true,
        "Expected events to be encoded as a binary buffer.",
      );

      // Ensure that events aren't annotated.
      for (let i = 0; i < events.length; i++) {
        const event = events[i] as EventDataInternal;
        should.equal(
          event[PENDING_PUBLISH_SEQ_NUM_SYMBOL],
          startingSequenceNumber + i,
          "Expected event have a pending publish sequence number.",
        );
        should.not.exist(event.properties, "Expected event to lack properties.");
      }

      // Ensure that events in the encodedMessage have idempotent publishing message annotations.
      const rheaMessages = decodeEncodedMessage(encodedMessage);
      for (let i = 0; i < rheaMessages.length; i++) {
        const rheaMessage = rheaMessages[i];
        should.equal(
          rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.epoch],
          publishingProps.ownerLevel,
          "Idempotent epoch annotation should match publishingProps.epoch on event.",
        );
        should.equal(
          rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.producerId],
          publishingProps.producerGroupId,
          "Idempotent producerId annotation should match publishingProps.producerGroupId on event.",
        );
        should.equal(
          rheaMessage.message_annotations![
            idempotentProducerAmqpPropertyNames.producerSequenceNumber
          ],
          startingSequenceNumber + i,
          "Idempotent producerSequenceNumber annotation on event should be consecutive after lastPublishedSequenceNumber.",
        );
      }
    });

    it("adds trace property if tracingProperties are provided", async function () {
      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: false,
        partitionId: "",
      };
      const tracingProperties: Array<EventData["properties"]> = [];
      for (let i = 0; i < events.length; i++) {
        tracingProperties.push({
          [TRACEPARENT_PROPERTY]: `some-span-probably-#${i}`,
        });
      }

      should.equal(Boolean(events.length), true, "Expected there to be events to test with.");

      const encodedMessage = transformEventsForSend(events, publishingProps, {
        tracingProperties,
      });

      should.equal(
        Buffer.isBuffer(encodedMessage),
        true,
        "Expected events to be encoded as a binary buffer.",
      );

      // Ensure that events aren't annotated.
      for (let i = 0; i < events.length; i++) {
        const event = events[i] as EventDataInternal;
        should.not.exist(
          event[PENDING_PUBLISH_SEQ_NUM_SYMBOL],
          "Expected event to lack a pending publish sequence number.",
        );
        should.not.exist(event.properties, "Expected event to lack properties.");
      }

      // Ensure that events in the encodedMessage don't have idempotent publishing message annotations.
      const rheaMessages = decodeEncodedMessage(encodedMessage);
      for (let i = 0; i < rheaMessages.length; i++) {
        const rheaMessage = rheaMessages[i];
        should.equal(
          rheaMessage.application_properties![TRACEPARENT_PROPERTY],
          `some-span-probably-#${i}`,
          "Expected event to have TRACEPARENT_PROPERTY.",
        );
      }
    });
  });
});
