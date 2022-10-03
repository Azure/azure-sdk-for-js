// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Buffer } from "buffer";
import chai from "chai";
import { EventData, EventDataBatch, EventHubProducerClient } from "../../src";
import { PartitionPublishingProperties } from "../../src/models/private";

import { transformEventsForSend } from "../../src/eventHubSender";
import { EventDataInternal } from "../../src/eventData";
import {
  idempotentProducerAmqpPropertyNames,
  PENDING_PUBLISH_SEQ_NUM_SYMBOL,
} from "../../src/util/constants";
import { message, Message } from "rhea-promise";
import { TRACEPARENT_PROPERTY } from "../../src/diagnostics/instrumentEventData";

const should = chai.should();

import { createMockServer } from "../public/utils/mockService";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }

  describe("transformEventsForSend", function () {
    function decodeEncodedMessage(encodedMessage: Buffer): Message[] {
      const batchMessage = message.decode(encodedMessage);
      return batchMessage.body.content.map(message.decode);
    }

    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME],
    };
    before("validate environment", function (): void {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    describe("with (not idempotent) EventDataBatch", function () {
      let batch: EventDataBatch;

      beforeEach("Populate EventDataBatch", async () => {
        const producerClient = new EventHubProducerClient(service.connectionString, service.path);
        batch = await producerClient.createBatch();

        for (let i = 1; i <= 10; i++) {
          const event: EventData = { body: `bootstrapping event #${1}` };
          batch.tryAdd(event);
        }

        return producerClient.close();
      });

      it("doesn't annotate events in batch when isIdempotentPublishingEnabled is false", function () {
        const publishingProps: PartitionPublishingProperties = {
          isIdempotentPublishingEnabled: false,
          partitionId: "",
        };
        const encodedMessage = transformEventsForSend(batch, publishingProps);
        should.equal(
          encodedMessage.byteLength,
          batch.sizeInBytes,
          "Batch size and encodedMessage size should match."
        );

        // Ensure that events in the encodedMessage don't have idempotent publishing message annotations.
        const rheaMessages = decodeEncodedMessage(encodedMessage);
        for (const rheaMessage of rheaMessages) {
          should.not.exist(
            rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.epoch],
            "Idempotent epoch annotation should not exist on event."
          );
          should.not.exist(
            rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.producerId],
            "Idempotent producerId annotation should not exist on event."
          );
          should.not.exist(
            rheaMessage.message_annotations?.[
              idempotentProducerAmqpPropertyNames.producerSequenceNumber
            ],
            "Idempotent producerSequenceNumber annotation should not exist on event."
          );
        }
      });
    });

    describe("with idempotent EventDataBatch", function () {
      let batch: EventDataBatch;

      beforeEach("Populate EventDataBatch", async () => {
        const producerClient = new EventHubProducerClient(service.connectionString, service.path);
        (producerClient as any)._enableIdempotentRetries = true;
        batch = await producerClient.createBatch({ partitionId: "0" });

        for (let i = 1; i <= 10; i++) {
          const event: EventData = { body: `bootstrapping event #${1}` };
          batch.tryAdd(event);
        }

        return producerClient.close();
      });

      it("annotates events in batch when isIdempotentPublishingEnabled is true", function () {
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
          "Batch size and encodedMessage size should match."
        );

        // Ensure that events in the encodedMessage have idempotent publishing message annotations.
        const rheaMessages = decodeEncodedMessage(encodedMessage);
        for (let i = 0; i < rheaMessages.length; i++) {
          const rheaMessage = rheaMessages[i];
          should.equal(
            rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.epoch],
            publishingProps.ownerLevel,
            "Idempotent epoch annotation should match publishingProps.epoch on event."
          );
          should.equal(
            rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.producerId],
            publishingProps.producerGroupId,
            "Idempotent producerId annotation should match publishingProps.producerGroupId on event."
          );
          should.equal(
            rheaMessage.message_annotations![
              idempotentProducerAmqpPropertyNames.producerSequenceNumber
            ],
            startingSequenceNumber + i,
            "Idempotent producerSequenceNumber annotation on event should be consecutive after lastPublishedSequenceNumber."
          );
        }
      });
    });

    describe("with EventData[]", function () {
      let events: EventData[];

      beforeEach("Populate EventData", () => {
        events = [];
        for (let i = 1; i <= 10; i++) {
          const event: EventData = { body: `bootstrapping event #${1}` };
          events.push(event);
        }
      });

      it("doesn't annotate events when isIdempotentPublishingEnabled is false", function () {
        const publishingProps: PartitionPublishingProperties = {
          isIdempotentPublishingEnabled: false,
          partitionId: "",
        };
        should.equal(Boolean(events.length), true, "Expected there to be events to test with.");

        const encodedMessage = transformEventsForSend(events, publishingProps);

        should.equal(
          Buffer.isBuffer(encodedMessage),
          true,
          "Expected events to be encoded as a binary buffer."
        );

        // Ensure that events aren't annotated.
        for (const event of events as EventDataInternal[]) {
          should.not.exist(
            event[PENDING_PUBLISH_SEQ_NUM_SYMBOL],
            "Expected event to lack a pending publish sequence number."
          );
          should.not.exist(event.properties, "Expected event to lack properties.");
        }

        // Ensure that events in the encodedMessage don't have idempotent publishing message annotations.
        const rheaMessages = decodeEncodedMessage(encodedMessage);
        for (const rheaMessage of rheaMessages) {
          should.not.exist(
            rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.epoch],
            "Idempotent epoch annotation should not exist on event."
          );
          should.not.exist(
            rheaMessage.message_annotations?.[idempotentProducerAmqpPropertyNames.producerId],
            "Idempotent producerId annotation should not exist on event."
          );
          should.not.exist(
            rheaMessage.message_annotations?.[
              idempotentProducerAmqpPropertyNames.producerSequenceNumber
            ],
            "Idempotent producerSequenceNumber annotation should not exist on event."
          );
        }
      });

      it("annotates events when isIdempotentPublishingEnabled is true", function () {
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
          "Expected events to be encoded as a binary buffer."
        );

        // Ensure that events aren't annotated.
        for (let i = 0; i < events.length; i++) {
          const event = events[i] as EventDataInternal;
          should.equal(
            event[PENDING_PUBLISH_SEQ_NUM_SYMBOL],
            startingSequenceNumber + i,
            "Expected event have a pending publish sequence number."
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
            "Idempotent epoch annotation should match publishingProps.epoch on event."
          );
          should.equal(
            rheaMessage.message_annotations![idempotentProducerAmqpPropertyNames.producerId],
            publishingProps.producerGroupId,
            "Idempotent producerId annotation should match publishingProps.producerGroupId on event."
          );
          should.equal(
            rheaMessage.message_annotations![
              idempotentProducerAmqpPropertyNames.producerSequenceNumber
            ],
            startingSequenceNumber + i,
            "Idempotent producerSequenceNumber annotation on event should be consecutive after lastPublishedSequenceNumber."
          );
        }
      });

      it("adds trace property if tracingProperties are provided", function () {
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
          "Expected events to be encoded as a binary buffer."
        );

        // Ensure that events aren't annotated.
        for (let i = 0; i < events.length; i++) {
          const event = events[i] as EventDataInternal;
          should.not.exist(
            event[PENDING_PUBLISH_SEQ_NUM_SYMBOL],
            "Expected event to lack a pending publish sequence number."
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
            "Expected event to have TRACEPARENT_PROPERTY."
          );
        }
      });
    });
  });
});
