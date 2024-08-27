// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Subscription } from "../../../src/index.js";
import { should } from "../../utils/chai.js";
import { describe, it } from "vitest";
import { createConsumer, createProducer } from "../../utils/clients.js";
import { isMock } from "../../utils/vars.js";

describe("disconnected", function () {
  describe("EventHubConsumerClient", function () {
    it("runtimeInfo work after disconnect", async function () {
      const client = createConsumer().consumer;
      const clientConnectionContext = client["_context"];

      await client.getPartitionIds({});
      const originalConnectionId = clientConnectionContext.connectionId;

      // Trigger a disconnect on the underlying connection.
      clientConnectionContext.connection["_connection"].idle();

      const partitionIds = await client.getPartitionIds({});
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);
      partitionIds.length.should.greaterThan(0, "Invalid number of partition ids returned.");

      await client.close();
    });

    it("should receive after a disconnect", async function () {
      /**
       * This test validates that an `EventHubConsumerClient.subscribe()` call continues
       * receiving events after a `disconnected` event occurs on the underlying connection.
       *
       * https://github.com/Azure/azure-sdk-for-js/pull/12280 describes an issue where `processEvents`
       * would be invoked with 0 events and ignoring the `maxWaitTimeInSeconds` after a `disconnected` event.
       *
       * For a single `subscribe()` call, this test does the following:
       * 1. Ensure events can be received normally before the `disconnected` event.
       * 2. Ensure that the `maxWaitTimeInSeconds` is honoured after a `disconnected` event.
       * 3. Ensure that events can be received normally after the `disconnected` event.
       */
      const consumer = createConsumer().consumer;
      const producer = createProducer().producer;
      const eventSentBeforeDisconnect = { body: "the first event" };
      const eventSentAfterDisconnect = { body: "the second event" };

      const maxWaitTimeInSeconds = 10;
      const partitionId = "0";
      const partitionProperties = await consumer.getPartitionProperties(partitionId);
      const clientConnectionContext = consumer["_context"];

      // Send the first event after getting partition properties so that we can expect to receive it.
      await producer.sendBatch([eventSentBeforeDisconnect], { partitionId });

      let subscription: Subscription | undefined;
      let originalConnectionId: string;

      let processEventsInvocationCount = 0;
      let firstInvocationEndTime = 0;
      await new Promise<void>((resolve, reject) => {
        subscription = consumer.subscribe(
          partitionId,
          {
            processEvents: async (data) => {
              processEventsInvocationCount++;
              should.exist(data);
              if (processEventsInvocationCount === 1) {
                // 1. Ensure events can be received normally before the `disconnected` event.
                should.equal(
                  data.length,
                  1,
                  "Expected to receive 1 event in first processEvents invocation.",
                );
                should.equal(data[0].body, eventSentBeforeDisconnect.body);
                originalConnectionId = clientConnectionContext.connectionId;
                // Trigger a disconnect on the underlying connection.
                clientConnectionContext.connection["_connection"].idle();
                firstInvocationEndTime = Date.now();
              } else if (processEventsInvocationCount === 2) {
                // 2. Ensure that the `maxWaitTimeInSeconds` is honoured after a `disconnected` event.
                // No new events should have been received at this point since we received the last event in the previous invocation.
                should.equal(
                  data.length,
                  0,
                  "Expected to receive 0 events in second processEvents invocation.",
                );
                // The elapsed time since the last processEvents invocation should be >= maxWaitTimeInSeconds
                should.equal(
                  Date.now() - firstInvocationEndTime >= maxWaitTimeInSeconds,
                  true,
                  "Expected elapsed time between first and second processEvents invocations to be >= maxWaitTimeInSeconds.",
                );
                const newConnectionId = clientConnectionContext.connectionId;
                should.not.equal(originalConnectionId, newConnectionId);
                // Send a new event that will be immediately receivable.
                await producer.sendBatch([eventSentAfterDisconnect], { partitionId });
              } else if (processEventsInvocationCount === 3) {
                // 3. Ensure that events can be received normally after the `disconnected` event.
                should.equal(
                  data.length,
                  1,
                  "Expected to receive 1 event in third processEvents invocation.",
                );
                should.equal(data[0].body, eventSentAfterDisconnect.body);
                const newConnectionId = clientConnectionContext.connectionId;
                should.not.equal(originalConnectionId, newConnectionId);
                resolve();
              }
            },
            processError: async (err) => {
              reject(err);
            },
          },
          {
            startPosition: {
              sequenceNumber: partitionProperties.lastEnqueuedSequenceNumber,
            },
            maxWaitTimeInSeconds,
          },
        );
      });
      await subscription!.close();
      await consumer.close();
      await producer.close();
    });
  });

  describe("EventHubProducerClient", function () {
    it("runtimeInfo work after disconnect", async function () {
      const client = createProducer().producer;
      const clientConnectionContext = client["_context"];

      await client.getPartitionIds({});
      const originalConnectionId = clientConnectionContext.connectionId;

      // Trigger a disconnect on the underlying connection.
      clientConnectionContext.connection["_connection"].idle();

      const partitionIds = await client.getPartitionIds({});
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);
      partitionIds.length.should.greaterThan(0, "Invalid number of partition ids returned.");

      await client.close();
    });

    it("should send after a disconnect", async function () {
      const client = createProducer().producer;
      const clientConnectionContext = client["_context"];

      await client.sendBatch([{ body: "test" }]);
      const originalConnectionId = clientConnectionContext.connectionId;

      // Trigger a disconnect on the underlying connection.
      clientConnectionContext.connection["_connection"].idle();

      await client.sendBatch([{ body: "test2" }]);
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);

      await client.close();
    });

    it.skipIf(isMock())("should not throw an uncaught exception", async function () {
      const client = createProducer({
        options: {
          retryOptions: {
            timeoutInMs: 1000,
          },
        },
      }).producer;
      const clientConnectionContext = client["_context"];

      // Send an event to open the connection.
      await client.sendBatch([{ body: "test1" }]);
      const originalConnectionId = clientConnectionContext.connectionId;

      let thirdSend: Promise<void>;
      // Ensure that the connection will disconnect, and another sendBatch occurs while a sendBatch is in-flight.
      setTimeout(async () => {
        // Trigger a disconnect on the underlying connection while the `sendBatch` is in flight.
        clientConnectionContext.connection["_connection"].idle();
        // Triggering another sendBatch immediately after an idle
        // used to cause the rhea connection remote state to be cleared.
        // This caused the in-flight sendBatch to throw an uncaught error
        // if it timed out.
        thirdSend = client.sendBatch([{ body: "test3" }]);
      }, 0);

      await client.sendBatch([{ body: "test2" }]);
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);

      // ensure the sendBatch from the setTimeout succeeded.
      // Wait for the connectionContext to be ready for opening.
      await thirdSend!;

      await client.close();
    });
  });
});
