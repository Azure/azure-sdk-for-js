// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MockTracingSpan } from "@azure-tools/test-utils-vitest";
import { createMockTracingContext, MockInstrumenter } from "@azure-tools/test-utils-vitest";
import { afterEach, beforeEach, describe, it, vi } from "vitest";
import type { EventData, EventHubConsumerClient, EventHubProducerClient } from "@azure/event-hubs";
import { createBufferedProducer, createConsumer, createProducer } from "../utils/clients.js";
import { toSpanOptions, tracingClient } from "$internal/diagnostics/tracing.js";
import {
  instrumentEventData,
  TRACEPARENT_PROPERTY,
} from "../../src/diagnostics/instrumentEventData.js";
import { assert, expect } from "../utils/chai.js";

type ClientCommonMethods = Pick<
  EventHubProducerClient,
  "close" | "getEventHubProperties" | "getPartitionIds" | "getPartitionProperties"
>;

describe("Tracing", () => {
  describe("EventHub Sender", () => {
    let producerClient: EventHubProducerClient;

    beforeEach(async () => {
      producerClient = createProducer().producer;
    });

    afterEach(async () => {
      await producerClient.close();
    });

    describe("Create batch", () => {
      it("can be manually traced", async () => {
        const list = [{ name: "Albert" }, { name: "Marie" }];

        await assert.supportsTracing(
          async (options) => {
            const eventDataBatch = await producerClient.createBatch({
              partitionId: "0",
              tracingOptions: options.tracingOptions,
            });

            for (let i = 0; i < 2; i++) {
              eventDataBatch.tryAdd({ body: `${list[i].name}` }, options);
            }
            return producerClient.sendBatch(eventDataBatch, options);
          },
          ["message", "EventHubProducerClient.sendBatch"],
        );
      });

      it("supports tracing", async () => {
        const list = [{ name: "Albert" }, { name: "Marie" }];
        const eventDataBatch = await producerClient.createBatch({
          partitionId: "0",
        });

        await assert.supportsTracing(
          (options) => {
            for (let i = 0; i < 2; i++) {
              eventDataBatch.tryAdd({ body: `${list[i].name}` }, options);
            }
            return producerClient.sendBatch(eventDataBatch, options);
          },
          ["message", "EventHubProducerClient.sendBatch"],
        );
      });

      it("supports tracing multiple events", async () => {
        const events: EventData[] = [];
        for (let i = 0; i < 5; i++) {
          events.push({ body: `multiple messages - manual trace propgation: ${i}` });
        }

        await assert.supportsTracing(
          (options) =>
            producerClient.sendBatch(events, {
              partitionId: "0",
              tracingOptions: options.tracingOptions,
            }),
          ["message", "EventHubProducerClient.sendBatch"],
        );
      });
    });
  });
  describe("RuntimeInformation", () => {
    const clientTypes = [
      "EventHubBufferedProducerClient",
      "EventHubConsumerClient",
      "EventHubProducerClient",
    ] as const;
    const clientMap = new Map<(typeof clientTypes)[number], ClientCommonMethods>();

    beforeEach(async () => {
      const bufferedProducer = createBufferedProducer();
      clientMap.set("EventHubBufferedProducerClient", bufferedProducer.producer);
      clientMap.set("EventHubConsumerClient", createConsumer().consumer);
      clientMap.set("EventHubProducerClient", createProducer().producer);
    });

    afterEach(async () => {
      for (const client of clientMap.values()) {
        await client.close();
      }
    });

    clientTypes.forEach((clientType) => {
      describe(`${clientType}.getPartitionIds`, () => {
        it("can be manually traced", async () => {
          const client = clientMap.get(clientType)!;
          await assert.supportsTracing(
            (options) => client.getPartitionIds(options),
            ["ManagementClient.getEventHubProperties"],
          );
        });
      });

      describe(`${clientType}.getEventHubProperties`, () => {
        it("can be manually traced", async () => {
          const client = clientMap.get(clientType)!;
          await assert.supportsTracing(
            (options) => client.getEventHubProperties(options),
            ["ManagementClient.getEventHubProperties"],
          );
        });
      });

      describe(`${clientType}.getPartitionProperties`, () => {
        it("can be manually traced", async () => {
          const client = clientMap.get(clientType)!;
          await assert.supportsTracing(
            (options) => client.getPartitionProperties("0", options),
            ["ManagementClient.getPartitionProperties"],
          );
        });
      });
    });
  });
  describe("#getAdditionalSpanOptions", () => {
    it("returns the initial set of attributes", async () => {
      assert.deepEqual(toSpanOptions({ entityPath: "testPath", host: "testHost" }, "receive"), {
        spanAttributes: {
          "messaging.operation": "receive",
          "messaging.source.name": "testPath",
          "messaging.system": "eventhubs",
          "net.peer.name": "testHost",
        },
      });
    });

    it("sets the spanKind if provided", async () => {
      const expectedSpanKind = "client";
      assert.equal(
        toSpanOptions({ entityPath: "", host: "" }, "receive", expectedSpanKind).spanKind,
        expectedSpanKind,
      );
    });
  });
  describe("#instrumentEventData", () => {
    afterEach(async () => {
      vi.restoreAllMocks();
    });

    it("is idempotent", async () => {
      const tracingClientSpy = vi.spyOn(tracingClient, "startSpan");
      const instrumentedEventData = {
        body: "test",
        properties: {
          [TRACEPARENT_PROPERTY]: "exists",
        },
      };
      const { event, spanContext } = instrumentEventData(
        instrumentedEventData,
        {},
        "testPath",
        "testHost",
        "receive",
      );
      assert.notExists(spanContext);
      assert.equal(event.properties?.[TRACEPARENT_PROPERTY], "exists");
      expect(tracingClientSpy).toBeCalledTimes(0);
    });

    it("returns early if the span is not recording", async () => {
      const instrumenter = new MockInstrumenter();
      const { span: nonRecordingSpan } = instrumenter.startSpan("test");
      (nonRecordingSpan as MockTracingSpan).setIsRecording(false);
      // Setup our tracingClient to ensure we reach the happy path.
      vi.spyOn(tracingClient, "startSpan").mockReturnValue({
        span: nonRecordingSpan,
        updatedOptions: { tracingOptions: { tracingContext: createMockTracingContext() } },
      });
      const { event, spanContext } = instrumentEventData(
        { body: "" },
        {},
        "testPath",
        "testHost",
        "receive",
      );
      assert.notExists(spanContext); // was not instrumented
      assert.notExists(event.properties?.[TRACEPARENT_PROPERTY]);
    });

    describe("when the span is valid", () => {
      it("sets the traceparent on eventData", async () => {
        const instrumenter = new MockInstrumenter();
        const { span: recordingSpan } = instrumenter.startSpan("test");
        (recordingSpan as MockTracingSpan).setIsRecording(true);

        // Setup our tracingClient to ensure we reach the happy path.
        vi.spyOn(tracingClient, "startSpan").mockReturnValue({
          span: recordingSpan,
          updatedOptions: { tracingOptions: { tracingContext: createMockTracingContext() } },
        });
        vi.spyOn(tracingClient, "createRequestHeaders").mockReturnValue({
          traceparent: "fake-traceparent-header",
        });

        const { event } = instrumentEventData(
          { body: "test" },
          {},
          "testPath",
          "testHost",
          "receive",
        );

        assert.equal(event.properties?.[TRACEPARENT_PROPERTY], "fake-traceparent-header");
      });
    });
  });
  describe("Consumer client span options", function (): void {
    let client: EventHubConsumerClient;

    afterEach(async () => {
      await client.close();
    });

    it("getEventHubProperties() creates a span with a peer.address attribute as the FQDN", async () => {
      const { consumer, fqdn, eventhubName } = createConsumer();
      client = consumer;
      assert.equal(client.fullyQualifiedNamespace, fqdn);
      assert.equal(client.eventHubName, eventhubName);

      const withSpanStub = vi.spyOn(tracingClient, "withSpan");

      // Ensure tracing is implemented correctly
      await assert.supportsTracing(
        (options) => client.getEventHubProperties(options),
        ["ManagementClient.getEventHubProperties"],
      );

      // Additional validation that we created the correct initial span options
      const expectedSpanOptions = {
        spanAttributes: {
          "messaging.destination.name": client.eventHubName,
          "messaging.system": "eventhubs",
          "net.peer.name": client.fullyQualifiedNamespace,
        },
      };

      expect(withSpanStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expectedSpanOptions,
      );
    });
  });
});
