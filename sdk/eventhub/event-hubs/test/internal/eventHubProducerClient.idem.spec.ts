// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { EventData, EventHubProducerClient } from "../../src/index.js";
import type { EventDataInternal } from "../../src/eventData.js";
import type { EventDataBatchImpl } from "../../src/eventDataBatch.js";
import { should, expect } from "../utils/chai.js";
import { describe, it, afterEach, beforeEach } from "vitest";
import { createProducer, isMock } from "../utils/clients.js";
import { StandardAbortMessage } from "@azure/core-amqp";

describe.runIf(!isMock())("EventHubProducerClient internal idempotent publishing", function () {
  let producerClient: EventHubProducerClient;

  afterEach(async function () {
    await producerClient?.close();
  });

  describe("getPartitionPublishingProperties", function () {
    describe("Idempotent Retries disabled", function () {
      beforeEach(async function () {
        producerClient = createProducer().producer;
      });

      it("retrieves partition publishing properties", async function () {
        const partitionIds = await producerClient.getPartitionIds();

        for (const partitionId of partitionIds) {
          const props = await producerClient["getPartitionPublishingProperties"](partitionId);
          should.equal(
            props.isIdempotentPublishingEnabled,
            false,
            "Unexpected value for isIdempotentPublishingEnabled",
          );
          should.equal(props.partitionId, partitionId, "Unexpected value for partitionId");
          should.not.exist(
            props.lastPublishedSequenceNumber,
            "Expected lastPublishedSequenceNumber to not exist",
          );
          should.not.exist(props.ownerLevel, "Expected ownerLevel to not exist");
          should.not.exist(props.producerGroupId, "Expected producerGroupId to not exist");
        }
      });
    });
    describe("Idempotent Retries enabled", function () {
      beforeEach(async function () {
        producerClient = createProducer({ enableIdempotentRetries: true }).producer;
      });
      it("retrieves partition publishing properties", async function () {
        const partitionIds = await producerClient.getPartitionIds();

        for (const partitionId of partitionIds) {
          const props = await producerClient["getPartitionPublishingProperties"](partitionId);
          should.equal(
            props.isIdempotentPublishingEnabled,
            true,
            "Unexpected value for isIdempotentPublishingEnabled",
          );
          should.equal(props.partitionId, partitionId, "Unexpected value for partitionId");
          should.exist(
            props.lastPublishedSequenceNumber,
            "Expected lastPublishedSequenceNumber to exist",
          );
          should.exist(props.ownerLevel, "Expected ownerLevel to exist");
          should.exist(props.producerGroupId, "Expected producerGroupId to exist");
        }
      });
    });
  });

  describe("idempotent producer", function () {
    beforeEach(async function () {
      producerClient = createProducer({ enableIdempotentRetries: true }).producer;
    });
    describe("does not allow partitionKey to be set", function () {
      it("createBatch", async function () {
        await expect(
          producerClient.createBatch({ partitionKey: "foo" }),
        ).to.eventually.be.rejectedWith(
          /The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true./,
        );
      });

      it("sendBatch", async function () {
        await expect(
          producerClient.sendBatch([{ body: "test" }], { partitionKey: "foo" }),
        ).to.eventually.be.rejectedWith(
          /The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true./,
        );
      });
    });

    describe("only allows sending directly to partitions", function () {
      it("supports partitionId set by createBatch", async function () {
        const batch = await producerClient.createBatch({ partitionId: "0" });
        batch.tryAdd({ body: "test" });

        // Don't need to set partitionId on the producerClient.
        await producerClient.sendBatch(batch);
      });

      it("supports partitionId set by sendBatch", async function () {
        await producerClient.sendBatch([{ body: "test" }], { partitionId: "0" });
      });

      it("throws an error if partitionId not set by createBatch", async function () {
        await expect(producerClient.createBatch()).to.eventually.be.rejectedWith(
          /The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true./,
        );
      });

      it("throws an error if partitionId not set by sendBatch when passing EventData[]", async function () {
        await expect(producerClient.sendBatch([{ body: "test" }])).to.eventually.be.rejectedWith(
          /The "partitionId" must be supplied and "partitionKey" must not be provided when the EventHubProducerClient has "enableIdempotentRetries" set to true./,
        );
      });
    });

    describe("concurrent sends", function () {
      it("are limited to one per partition", async function () {
        const batch1 = await producerClient.createBatch({ partitionId: "0" });
        batch1.tryAdd({
          body: "one",
        });

        await expect(
          Promise.all([
            producerClient.sendBatch(batch1),
            producerClient.sendBatch([{ body: "two" }], { partitionId: "0" }),
          ]),
        ).to.eventually.be.rejectedWith(
          /There can only be 1 "sendBatch" call in-flight per partition while "enableIdempotentRetries" is set to true./,
        );
      });

      it("has no impact on serial sends", async function () {
        const batch1 = await producerClient.createBatch({ partitionId: "0" });
        batch1.tryAdd({ body: "one" });

        await producerClient.sendBatch(batch1);
        await producerClient.sendBatch([{ body: "two" }], { partitionId: "0" });
      });

      it("are isolated per partition", async function () {
        await Promise.all([
          producerClient.sendBatch([{ body: "one" }], { partitionId: "0" }),
          producerClient.sendBatch([{ body: "two" }], { partitionId: "1" }),
        ]);
      });
    });

    describe("with user-provided partitionOptions", function () {
      it("can use state from previous producerClient", async function () {
        const producerClient1 = createProducer({ enableIdempotentRetries: true }).producer;

        // Send an item so we have some state to carry over to the next producerClient
        await producerClient1.sendBatch([{ body: "one" }], { partitionId: "0" });
        const partitionPublishingProps1 =
          await producerClient1["getPartitionPublishingProperties"]("0");

        const producerClient2 = createProducer({ enableIdempotentRetries: true }).producer;
        producerClient2["_partitionOptions"] = {
          "0": {
            ownerLevel: partitionPublishingProps1.ownerLevel! + 1,
            producerGroupId: partitionPublishingProps1.producerGroupId,
            startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber,
          },
        };

        await producerClient2.sendBatch([{ body: "two" }], { partitionId: "0" });
        const partitionPublishingProps2 =
          await producerClient2["getPartitionPublishingProperties"]("0");

        should.equal(
          partitionPublishingProps2.producerGroupId,
          partitionPublishingProps1.producerGroupId,
          "ProducerGroupId should match.",
        );
        should.equal(
          partitionPublishingProps2.ownerLevel! > partitionPublishingProps1.ownerLevel!,
          true,
          "producer2 ownerLevel should be higher than producer1 ownerLevel.",
        );
        should.equal(
          partitionPublishingProps2.lastPublishedSequenceNumber,
          partitionPublishingProps1.lastPublishedSequenceNumber! + 1,
          "producer2 lastPublishedSequenceNumber should be 1 higher than producer1 lastPublishedSequenceNumber.",
        );

        return Promise.all([producerClient1.close(), producerClient2.close()]);
      });

      it("can use partial state", async function () {
        producerClient["_partitionOptions"] = {
          "0": {
            ownerLevel: 1,
          },
        };

        const partitionPublishingProps =
          await producerClient["getPartitionPublishingProperties"]("0");

        should.exist(partitionPublishingProps.producerGroupId, "ProducerGroupId should exist.");
        should.equal(
          partitionPublishingProps.ownerLevel,
          1,
          "ownerLevel should match what the EventHubProducerClient was configured with.",
        );
        should.exist(
          partitionPublishingProps.lastPublishedSequenceNumber,
          "lastPublishedSequenceNumber should exist.",
        );
      });

      it("can use ownerLevel to kick off other producers", async function () {
        const producerClient1 = createProducer({ enableIdempotentRetries: true }).producer;

        // Send an item so we have some state to carry over to the next producerClient
        await producerClient1.sendBatch([{ body: "one" }], { partitionId: "0" });
        const partitionPublishingProps1 =
          await producerClient1["getPartitionPublishingProperties"]("0");

        const producerClient2 = createProducer({ enableIdempotentRetries: true }).producer;
        producerClient2["_partitionOptions"] = {
          "0": {
            ownerLevel: partitionPublishingProps1.ownerLevel! + 1,
            producerGroupId: partitionPublishingProps1.producerGroupId,
            startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber,
          },
        };

        await producerClient2.sendBatch([{ body: "two" }], { partitionId: "0" });

        await expect(producerClient1.sendBatch([{ body: "should fail" }], { partitionId: "0" }))
          .to.eventually.be.rejectedWith(/Received:0 Current:1/)
          .then((err) => {
            expect(err).to.have.property("code", "ProducerDisconnectedError");
            expect(err).to.have.property("name", "MessagingError");
            return err;
          });

        return Promise.all([producerClient1.close(), producerClient2.close()]);
      });

      it("fails with invalid state", async function () {
        producerClient["_partitionOptions"] = {
          "0": {
            ownerLevel: -1,
          },
        };

        await expect(producerClient.sendBatch([{ body: "one" }], { partitionId: "0" }))
          .to.eventually.be.rejectedWith(
            /Invalid range for idempotent producer state. Producer Id, Epoch, and Sequence Number must be zero or positive./,
          )
          .then((err) => {
            expect(err).to.have.property("code", "ArgumentOutOfRangeError");
            expect(err).to.have.property("name", "MessagingError");
            return err;
          });
      });

      it("fails with invalid sequence number", async function () {
        const producerClient1 = createProducer({ enableIdempotentRetries: true }).producer;

        // Send an item so we have some state to carry over to the next producerClient
        await producerClient1.sendBatch(
          [{ body: "one" }, { body: "two" }, { body: "three" }, { body: "four" }, { body: "five" }],
          {
            partitionId: "0",
          },
        );
        const partitionPublishingProps1 =
          await producerClient1["getPartitionPublishingProperties"]("0");

        should.equal(partitionPublishingProps1.lastPublishedSequenceNumber, 5);

        const producerClient2 = createProducer({ enableIdempotentRetries: true }).producer;
        producerClient2["_partitionOptions"] = {
          "0": {
            producerGroupId: partitionPublishingProps1.producerGroupId,
            startingSequenceNumber: partitionPublishingProps1.lastPublishedSequenceNumber! - 4,
          },
        };

        await expect(producerClient2.sendBatch([{ body: "six as two" }], { partitionId: "0" }))
          .to.eventually.be.rejectedWith(/old sequence/)
          .then((err) => {
            expect(err).to.have.property("code", "SequenceOutOfOrderError");
            expect(err).to.have.property("name", "MessagingError");
            return err;
          });

        return Promise.all([producerClient1.close(), producerClient2.close()]);
      });
    });

    it("recovers from disconnects", async function () {
      producerClient = createProducer({
        enableIdempotentRetries: true,
        options: {
          retryOptions: {
            timeoutInMs: 5000,
            retryDelayInMs: 100,
          },
        },
      }).producer;

      const beforePublishingProps = await producerClient["getPartitionPublishingProperties"]("0");
      const clientConnectionContext = producerClient["_context"];
      const originalConnectionId = clientConnectionContext.connectionId;

      // Using setTimeout so we can trigger the disconnect
      // right after sendBatch is called.
      setTimeout(() => {
        // Trigger a disconnect on the underlying connection.
        clientConnectionContext.connection["_connection"].idle();
      }, 0);

      await producerClient.sendBatch([{ body: "disconnect" }], { partitionId: "0" });
      const newConnectionId = clientConnectionContext.connectionId;
      should.not.equal(originalConnectionId, newConnectionId);

      const afterPublishingProps = await producerClient["getPartitionPublishingProperties"]("0");

      should.equal(
        afterPublishingProps.ownerLevel,
        beforePublishingProps.ownerLevel,
        "ownerLevel should match.",
      );
      should.equal(
        afterPublishingProps.producerGroupId,
        beforePublishingProps.producerGroupId,
        "producerGroupId should match.",
      );
      should.equal(
        afterPublishingProps.lastPublishedSequenceNumber,
        beforePublishingProps.lastPublishedSequenceNumber! + 1,
        "afterPublishingProps.lastPublishedSequenceNumber should be 1 higher than beforePublishingProps",
      );
    });

    describe("sendBatch", function () {
      it("commits published sequence number on sent EventDataBatch", async function () {
        const batch = await producerClient.createBatch({ partitionId: "0" });
        batch.tryAdd({ body: 1 });
        batch.tryAdd({ body: 2 });
        should.not.exist(
          (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
          "startingPublishedSequenceNumber should not exist before batch is successfully sent.",
        );

        const publishingProps = await producerClient["getPartitionPublishingProperties"]("0");

        await producerClient.sendBatch(batch);
        should.equal(
          (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
          publishingProps.lastPublishedSequenceNumber! + 1,
          "startingPublishedSequenceNumber should be 1 higher than the lastPublishedSequenceNumber.",
        );
      });

      it("does not commit published sequence number on failed EventDataBatch send", async function () {
        const batch = await producerClient.createBatch({
          partitionId: "0",
        });
        batch.tryAdd({
          body: 1,
        });
        batch.tryAdd({
          body: 2,
        });
        should.not.exist(
          (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
          "startingPublishedSequenceNumber should not exist before batch is successfully sent.",
        );

        const abortController = new AbortController();
        // Trigger abort while sendBatch is in progress
        setTimeout(() => {
          abortController.abort();
        }, 0);

        await expect(
          producerClient.sendBatch(batch, { abortSignal: abortController.signal }),
        ).to.eventually.be.rejectedWith(StandardAbortMessage);
        should.not.exist(
          (batch as EventDataBatchImpl).startingPublishedSequenceNumber,
          "startingPublishedSequenceNumber should not exist if batch failed to send.",
        );
      });

      it("commits published sequence number on sent EventData", async function () {
        const events: EventData[] = [{ body: 1 }, { body: 2 }];
        for (const event of events) {
          should.not.exist(
            (event as EventDataInternal)._publishedSequenceNumber,
            "publishedSequenceNumber should not exist before event is successfully sent.",
          );
        }

        const publishingProps = await producerClient["getPartitionPublishingProperties"]("0");

        await producerClient.sendBatch(events, { partitionId: "0" });

        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          should.exist(
            (event as EventDataInternal)._publishedSequenceNumber,
            "publishedSequenceNumber should exist after event is successfully sent.",
          );
          should.equal(
            (event as EventDataInternal)._publishedSequenceNumber,
            publishingProps.lastPublishedSequenceNumber! + (i + 1),
            "publishedSequenceNumber was not the expected result.",
          );
        }
      });

      it("does not commit published sequence number on failed EventData send", async function () {
        const events: EventData[] = [
          {
            body: 1,
          },
          {
            body: 2,
          },
        ];
        for (const event of events) {
          should.not.exist(
            (event as EventDataInternal)._publishedSequenceNumber,
            "publishedSequenceNumber should not exist before event is successfully sent.",
          );
        }

        const abortController = new AbortController();
        // Trigger abort while sendBatch is in progress
        setTimeout(() => {
          abortController.abort();
        }, 0);

        await expect(
          producerClient.sendBatch(events, {
            partitionId: "0",
            abortSignal: abortController.signal,
          }),
        ).to.eventually.be.rejectedWith(StandardAbortMessage);
        for (const event of events) {
          should.not.exist(
            (event as EventDataInternal)._publishedSequenceNumber,
            "publishedSequenceNumber should not exist before event is successfully sent.",
          );
        }
      });

      it("does not allow sending already published EventData", async function () {
        const events: EventData[] = [{ body: 1 }, { body: 2 }];
        // Send the events. Afterwards they should be considered 'published.'
        await producerClient.sendBatch(events, { partitionId: "0" });

        await expect(
          producerClient.sendBatch(events, { partitionId: "0" }),
        ).to.eventually.be.rejectedWith(
          /1 or more of these events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again./,
        );
      });

      it("does not allow sending already published EventDataBatch", async function () {
        const batch = await producerClient.createBatch({ partitionId: "0" });
        batch.tryAdd({ body: 1 });
        batch.tryAdd({ body: 2 });
        // Send the events. Afterwards they should be considered 'published.'
        await producerClient.sendBatch(batch);

        await expect(producerClient.sendBatch(batch)).to.eventually.be.rejectedWith(
          /These events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again./,
        );
      });
    });
  });
});
