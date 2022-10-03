// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import {
  EventData,
  EventHubBufferedProducerClient,
  OnSendEventsErrorContext,
  OnSendEventsSuccessContext,
} from "../../src/index";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import chai from "chai";
import { createMockServer } from "./utils/mockService";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";

const assert = chai.assert;

type ResultError = { type: "error"; context: OnSendEventsErrorContext };
type ResultSuccess = { type: "success"; context: OnSendEventsSuccessContext };
type ResultEnqueue = { type: "enqueue"; event: EventData | AmqpAnnotatedMessage };
type ResultFlush = { type: "flush" };
type Result = ResultEnqueue | ResultError | ResultSuccess | ResultFlush;

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

  describe("EventHubBufferedProducerClient", () => {
    const connectionString = env[EnvVarKeys.EVENTHUB_CONNECTION_STRING];
    const eventHubName = env[EnvVarKeys.EVENTHUB_NAME];
    let client: EventHubBufferedProducerClient | undefined;

    before(() => {
      assert.exists(
        connectionString,
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      assert.exists(
        eventHubName,
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    afterEach("Ensure client is closed between tests.", async () => {
      if (client) {
        await client.close();
        client = undefined;
      }
    });

    describe("enqueueEvent", () => {
      afterEach("close EventHubBufferedProducerClient", () => {
        return client?.close({ flush: false });
      });

      it("batches events targetting the same partitionId together", async () => {
        const results: Result[] = [];
        const expectedEventCount = 10;
        const testEvents: EventData[] = [];
        for (let i = 0; i < expectedEventCount; i++) {
          testEvents.push({ body: `Test event ${i}` });
        }

        client = new EventHubBufferedProducerClient(connectionString, eventHubName, {
          async onSendEventsErrorHandler(context) {
            results.push({ type: "error", context });
          },
          async onSendEventsSuccessHandler(context) {
            results.push({ type: "success", context });
          },
          maxWaitTimeInMs: 1000,
        });

        for (let i = 0; i < expectedEventCount; i++) {
          const bufferedEventCount = await client.enqueueEvent(testEvents[i], { partitionId: "0" });
          assert.equal(bufferedEventCount, i + 1, "Unexpected number of events buffered.");
        }

        await client.flush();
        const resultSuccess = results
          .filter((r) => r.type === "success")
          .map((r) => (r as ResultSuccess).context.events)
          .reduce((prev, cur) => [...prev, ...cur], []);
        assert.deepEqual(resultSuccess, testEvents, "Expected sent events to match test events.");
      });

      it("batches events targetting the same partitionKey together", async () => {
        const results: Result[] = [];
        const expectedEventCount = 10;
        const testEvents: EventData[] = [];
        for (let i = 0; i < expectedEventCount; i++) {
          testEvents.push({ body: `Test event ${i}` });
        }

        client = new EventHubBufferedProducerClient(connectionString, eventHubName, {
          async onSendEventsErrorHandler(context) {
            results.push({ type: "error", context });
          },
          async onSendEventsSuccessHandler(context) {
            results.push({ type: "success", context });
          },
          maxWaitTimeInMs: 1000,
        });

        for (let i = 0; i < expectedEventCount; i++) {
          const bufferedEventCount = await client.enqueueEvent(testEvents[i], {
            partitionKey: "foo",
          });
          assert.equal(bufferedEventCount, i + 1, "Unexpected number of events buffered.");
        }

        await client.flush();
        const resultSuccess = results
          .filter((r) => r.type === "success")
          .map((r) => (r as ResultSuccess).context.events)
          .reduce((prev, cur) => [...prev, ...cur], []);
        assert.deepEqual(resultSuccess, testEvents, "Expected sent events to match test events.");
      });

      it("waits until buffer has space for the event before yielding", async () => {
        const results: Result[] = [];
        const expectedEventCount = 5;
        const testEvents: EventData[] = [];
        for (let i = 0; i < expectedEventCount; i++) {
          testEvents.push({
            body: `Test event ${i}`,
          });
        }

        client = new EventHubBufferedProducerClient(connectionString, eventHubName, {
          async onSendEventsErrorHandler(context) {
            results.push({ type: "error", context });
          },
          async onSendEventsSuccessHandler(context) {
            results.push({ type: "success", context });
          },
          maxEventBufferLengthPerPartition: 2,
        });

        for (const testEvent of testEvents) {
          await client.enqueueEvent(testEvent, {
            partitionKey: "foo",
          });
          results.push({
            type: "enqueue",
            event: testEvent,
          });
        }

        await client.flush();
        const resultTypes = results.map((r) => r.type);
        const resultEnqueued = results
          .filter((r) => r.type === "enqueue")
          .map((r) => (r as ResultEnqueue).event);
        const resultSuccess = results
          .filter((r) => r.type === "success")
          .map((r) => (r as ResultSuccess).context.events)
          .reduce((prev, cur) => [...prev, ...cur], []);
        assert.deepEqual(resultTypes, [
          "enqueue",
          "enqueue",
          "success",
          "enqueue",
          "enqueue",
          "success",
          "enqueue",
          "success",
        ]);
        assert.deepEqual(
          resultEnqueued,
          testEvents,
          "Expected enqueued events to match test events."
        );
        assert.deepEqual(resultSuccess, testEvents, "Expected sent events to match test events.");
      });

      it("waits until flush is complete to enqueue", async () => {
        const results: Result[] = [];

        client = new EventHubBufferedProducerClient(connectionString, eventHubName, {
          async onSendEventsErrorHandler(context) {
            results.push({ type: "error", context });
          },
          async onSendEventsSuccessHandler(context) {
            results.push({ type: "success", context });
          },
          maxEventBufferLengthPerPartition: 2,
        });

        /**
         * One way to test that `enqueueEvent` waits for an in-progress `flush`
         * to complete before yielding is to call `enqueueEvent` before `flush` yields.
         *
         * `flush` won't complete until any buffered events are either successfully sent
         * or they error out. That means we can track when the `success` handler is called
         * and when `flush` yields, and if there were buffered events we should see them
         * one after the other.
         *
         * We enqueue an event to start with to ensure there's something to flush.
         *
         * Next, we call `flush`, and then another `enqueueEvent` without waiting for
         * the `flush` to yield.
         *
         * Finally, we call `flush` after both methods complete to ensure there was still
         * an event to send to the service.
         *
         * If this works properly, we should see:
         * [ "success", "flush", "success", "flush" ] and each "success" should have a single event.
         *
         * This indicates that the 2nd `enqueueEvent` had to wait for the flush to complete before
         * the event was actually accepted.
         *
         * If the 2nd `enqueueEvent` had not waited for the `flush` to complete, we would have seen:
         * [ "success", "flush", "flush"] and the "success" would have had 2 events.
         */

        await client.enqueueEvent({ body: 1 }, { partitionId: "0" });
        await Promise.all([
          client.flush().then(() => results.push({ type: "flush" })),
          client.enqueueEvent({ body: 2 }, { partitionId: "0" }),
        ]);
        await client.flush();
        results.push({ type: "flush" });

        const resultTypes = results.map((r) => r.type);
        assert.deepEqual(resultTypes, ["success", "flush", "success", "flush"]);
      });

      it("passes idempotent publish options to internal producer", async () => {
        const results: Result[] = [];
        client = new EventHubBufferedProducerClient(connectionString, eventHubName, {
          async onSendEventsErrorHandler(context) {
            results.push({ type: "error", context });
          },
          enableIdempotentRetries: true,
        });

        const internalProducer = (client as any)._producer;
        assert.ok(internalProducer, "Expecting internal standard producer to be valid");
        assert.equal(internalProducer._enableIdempotentRetries, true);
      });
    });
  });
});
