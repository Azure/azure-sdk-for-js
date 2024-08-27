// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  MessagingError,
} from "../../src/index.js";
import { translate } from "@azure/core-amqp";
import "../utils/chai.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createConsumer, createProducer, createReceiver } from "../utils/clients.js";

describe("EventHubConsumerClient", function () {
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;
  let partitionIds: string[];

  beforeEach(async function () {
    producerClient = createProducer().producer;
    consumerClient = createConsumer().consumer;
    partitionIds = await producerClient.getPartitionIds({});
  });

  afterEach(async function () {
    await producerClient.close();
    await consumerClient.close();
  });

  describe("EventHubConsumer receiveBatch", function () {
    it("should not lose messages on error", async function () {
      const partitionId = partitionIds[0];
      const { lastEnqueuedSequenceNumber } =
        await producerClient.getPartitionProperties(partitionId);

      // Ensure the receiver only looks at new messages.
      const startPosition: EventPosition = {
        sequenceNumber: lastEnqueuedSequenceNumber,
        isInclusive: false,
      };

      // Send a message we expect to receive.
      const message: EventData = { body: "remember me!" };
      await producerClient.sendBatch([message], { partitionId });

      // Disable retries to make it easier to test scenario.
      const { receiver } = createReceiver({
        ctx: consumerClient["_context"],
        consumerId: "Consumer",
        partitionId,
        eventPosition: startPosition,
        options: {
          retryOptions: {
            maxRetries: 0,
          },
        },
      });

      // Periodically check that the receiver's checkpoint has been updated.
      const checkpointInterval = setInterval(() => {
        if (receiver.checkpoint > -1) {
          clearInterval(checkpointInterval);
          const error = translate(new Error("I break receivers for fun."));
          receiver["_onError"]!(error);
        }
      }, 10);

      try {
        // There is only 1 message.
        // We expect to see an error.
        await receiver.receiveBatch(2, 60);
        throw new Error(`Test failure`);
      } catch (err: any) {
        err.message.should.not.equal("Test failure");
        receiver.checkpoint.should.be.greaterThan(-1, "Did not see a message come through.");
      } finally {
        clearInterval(checkpointInterval);
      }

      const events = await receiver.receiveBatch(1);
      events.length.should.equal(1, "Unexpected number of events received.");
      events[0].body.should.equal(message.body, "Unexpected message received.");
    });

    it("should not lose messages between retries", async function () {
      const partitionId = partitionIds[0];
      const { lastEnqueuedSequenceNumber } =
        await producerClient.getPartitionProperties(partitionId);

      // Ensure the receiver only looks at new messages.
      const startPosition: EventPosition = {
        sequenceNumber: lastEnqueuedSequenceNumber,
        isInclusive: false,
      };

      // Send a message we expect to receive.
      const message: EventData = { body: "remember me!" };
      await producerClient.sendBatch([message], { partitionId });

      // Disable retries to make it easier to test scenario.
      const { receiver } = createReceiver({
        ctx: consumerClient["_context"],
        consumerId: "Consumer",
        partitionId,
        eventPosition: startPosition,
        options: {
          retryOptions: {
            maxRetries: 1,
          },
        },
      });

      // Periodically check that the receiver's checkpoint has been updated.
      const checkpointInterval = setInterval(() => {
        if (receiver.checkpoint > -1) {
          clearInterval(checkpointInterval);
          const error = translate(new Error("I break receivers for fun.")) as MessagingError;
          error.retryable = true;
          receiver["_onError"]!(error);
        }
      }, 10);

      // There is only 1 message.
      const events = await receiver.receiveBatch(2, 20);

      events.length.should.equal(1, "Unexpected number of events received.");
      events[0].body.should.equal(message.body, "Unexpected message received.");
    });
  });
});
