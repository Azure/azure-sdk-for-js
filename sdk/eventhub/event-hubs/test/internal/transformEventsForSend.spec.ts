// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "buffer";
import type { EventData, EventDataBatch } from "../../src/index.js";
import type { PartitionPublishingProperties } from "../../src/models/private.js";

import { transformEventsForSend } from "../../src/eventHubSender.js";
import type { EventDataInternal } from "../../src/eventData.js";
import {
  idempotentProducerAmqpPropertyNames,
  PENDING_PUBLISH_SEQ_NUM_SYMBOL,
} from "../../src/util/constants.js";
import type { Message } from "rhea-promise";
import { message } from "rhea-promise";
import { TRACEPARENT_PROPERTY } from "../../src/diagnostics/instrumentEventData.js";
import { describe, it, beforeEach } from "vitest";
import { should } from "../utils/chai.js";
import { createProducer } from "../utils/clients.js";

describe("transformEventsForSend", () => {
  function decodeEncodedMessage(encodedMessage: Buffer): Message[] {
    const batchMessage = message.decode(encodedMessage);
    return batchMessage.body.content.map(message.decode);
  }

  function getEncodedStringBody(rheaMessage: Message): string {
    return rheaMessage.body.content.toString("utf8");
  }

  describe("with (not idempotent) EventDataBatch", () => {
    let batch: EventDataBatch;

    beforeEach(async () => {
      const producerClient = createProducer().producer;
      batch = await producerClient.createBatch();

      for (let i = 1; i <= 10; i++) {
        const event: EventData = { body: `bootstrapping event #${1}` };
        batch.tryAdd(event);
      }

      await producerClient.close();
    });

    it("doesn't annotate events in batch when isIdempotentPublishingEnabled is false", async () => {
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

  describe("with idempotent EventDataBatch", () => {
    let batch: EventDataBatch;

    beforeEach(async () => {
      const producerClient = createProducer({ enableIdempotentRetries: true }).producer;
      batch = await producerClient.createBatch({ partitionId: "0" });

      for (let i = 1; i <= 10; i++) {
        const event: EventData = { body: `bootstrapping event #${1}` };
        batch.tryAdd(event);
      }

      await producerClient.close();
    });

    it("annotates events in batch when isIdempotentPublishingEnabled is true", async () => {
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

  describe("with EventData[]", () => {
    let events: EventData[];

    beforeEach(async () => {
      events = [];
      for (let i = 1; i <= 10; i++) {
        const event: EventData = { body: `bootstrapping event #${1}` };
        events.push(event);
      }
    });

    it("doesn't annotate events when isIdempotentPublishingEnabled is false", async () => {
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

    it("annotates events when isIdempotentPublishingEnabled is true", async () => {
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

    it("adds trace property if tracingProperties are provided", async () => {
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

    it("reuses the original event when no tracing properties are provided", async () => {
      let extraFieldReads = 0;
      const event: EventData = { body: "bootstrapping event #1" };
      Object.defineProperty(event, "expensiveField", {
        enumerable: true,
        get() {
          extraFieldReads++;
          return "unused";
        },
      });

      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: false,
        partitionId: "",
      };

      transformEventsForSend([event], publishingProps);

      should.equal(extraFieldReads, 0, "Expected the no-tracing path to avoid cloning the event.");
    });
  });

  describe("idempotent batch preserves message body and annotations", () => {
    it("preserves event bodies and applies correct sequence numbers without decode+re-encode", async () => {
      const producerClient = createProducer({ enableIdempotentRetries: true }).producer;
      const batch = await producerClient.createBatch({ partitionId: "0" });

      const eventBodies = ["first-message", "second-message", "third-message"];
      for (const body of eventBodies) {
        batch.tryAdd({ body });
      }
      await producerClient.close();

      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: true,
        partitionId: "0",
        lastPublishedSequenceNumber: 41,
        ownerLevel: 2,
        producerGroupId: 7,
      };
      const startingSequenceNumber = publishingProps.lastPublishedSequenceNumber! + 1;

      const encodedMessage = transformEventsForSend(batch, publishingProps);
      const rheaMessages = decodeEncodedMessage(encodedMessage);

      should.equal(rheaMessages.length, eventBodies.length, "All events should be present.");

      for (let i = 0; i < rheaMessages.length; i++) {
        // Verify body content is preserved
        should.equal(
          getEncodedStringBody(rheaMessages[i]),
          JSON.stringify(eventBodies[i]),
          `Event body at index ${i} should be preserved.`,
        );

        // Verify idempotent annotations are correct
        should.equal(
          rheaMessages[i].message_annotations![
            idempotentProducerAmqpPropertyNames.producerSequenceNumber
          ],
          startingSequenceNumber + i,
          `Sequence number at index ${i} should be ${startingSequenceNumber + i}.`,
        );
        should.equal(
          rheaMessages[i].message_annotations![idempotentProducerAmqpPropertyNames.epoch],
          publishingProps.ownerLevel,
          `Epoch at index ${i} should match ownerLevel.`,
        );
        should.equal(
          rheaMessages[i].message_annotations![idempotentProducerAmqpPropertyNames.producerId],
          publishingProps.producerGroupId,
          `ProducerId at index ${i} should match producerGroupId.`,
        );
      }
    });

    it("produces same output for idempotent and non-idempotent batches when no annotations needed", async () => {
      const producerClient = createProducer().producer;
      const batch = await producerClient.createBatch();

      batch.tryAdd({ body: "test-event-1" });
      batch.tryAdd({ body: "test-event-2" });
      await producerClient.close();

      const publishingProps: PartitionPublishingProperties = {
        isIdempotentPublishingEnabled: false,
        partitionId: "",
      };

      const encodedMessage = transformEventsForSend(batch, publishingProps);
      const rheaMessages = decodeEncodedMessage(encodedMessage);

      should.equal(rheaMessages.length, 2, "Both events should be present.");
      should.equal(
        getEncodedStringBody(rheaMessages[0]),
        JSON.stringify("test-event-1"),
        "First event body should be preserved.",
      );
      should.equal(
        getEncodedStringBody(rheaMessages[1]),
        JSON.stringify("test-event-2"),
        "Second event body should be preserved.",
      );

      // Should not have idempotent annotations
      should.not.exist(
        rheaMessages[0].message_annotations?.[
          idempotentProducerAmqpPropertyNames.producerSequenceNumber
        ],
        "Non-idempotent events should not have sequence numbers.",
      );
    });
  });
});
