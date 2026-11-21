// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes, Meter } from "@opentelemetry/api";
import { createNoopMeter, metrics } from "@opentelemetry/api";
import { logs, type LogRecord } from "@opentelemetry/api-logs";
import { describe, expect, it } from "vitest";
import { assert } from "../utils/chai.js";
import { createConsumer, createProducer, createReceiver } from "../utils/clients.js";

describe("Event Hubs OpenTelemetry", () => {
  it("records completed send and receive batches and link attachments", async () => {
    const points: { name: string; value: number; attributes?: Attributes }[] = [];
    const records: LogRecord[] = [];
    const meter: Meter = Object.create(createNoopMeter());
    meter.createCounter = (name) => ({
      add: (value, attributes) => points.push({ name, value, attributes }),
    });
    meter.createHistogram = (name) => ({
      record: (value, attributes) => points.push({ name, value, attributes }),
    });

    const { producer } = createProducer();
    const { consumer } = createConsumer();
    try {
      metrics.setGlobalMeterProvider({ getMeter: () => meter });
      logs.setGlobalLoggerProvider({
        getLogger: () => ({ enabled: () => true, emit: (record) => records.push(record) }),
      });
      const partitionId = "0";
      const { lastEnqueuedSequenceNumber } = await producer.getPartitionProperties(partitionId);
      const { receiver } = createReceiver({
        ctx: consumer["_context"],
        partitionId,
        eventPosition: { sequenceNumber: lastEnqueuedSequenceNumber },
      });
      const batch = await producer.createBatch({ partitionId });
      expect(batch.tryAdd({ body: "first" })).toBe(true);
      expect(batch.tryAdd({ body: "second" })).toBe(true);
      await producer.sendBatch(batch);
      const events = await receiver.receiveBatch(2, 5);
      expect(events.map((event) => event.body)).toEqual(["first", "second"]);
      await assert.supportsTracing(
        async (options) => {
          await assert.isRejected(
            producer.sendBatch([], {
              ...options,
              partitionId,
              partitionKey: "conflicting",
            }),
            "cannot both be specified",
          );
        },
        ["EventHubProducerClient.sendBatch"],
      );

      for (const operation of ["send", "receive"]) {
        const successful = points.filter(
          (point) =>
            point.attributes?.operation === operation && point.attributes.outcome === "success",
        );
        expect(
          successful
            .filter((point) => point.name === "az.eventhubs.operations")
            .map((point) => point.value),
        ).toEqual([1]);
        expect(
          successful
            .filter((point) => point.name === "az.eventhubs.events")
            .map((point) => point.value),
        ).toEqual([2]);
        expect(
          successful.find((point) => point.name === "az.eventhubs.operation.duration")?.value,
        ).toBeGreaterThan(0);
      }
      const failures = points.filter((point) => point.attributes?.outcome === "error");
      expect(
        failures.some(
          (point) =>
            point.name === "az.eventhubs.operations" && point.attributes?.operation === "send",
        ),
      ).toBe(true);
      expect(failures.some((point) => point.name === "az.eventhubs.events")).toBe(false);
      for (const component of ["sender", "receiver"]) {
        const attributes = { component, action: "attach", outcome: "success" };
        expect(points).toContainEqual(
          expect.objectContaining({
            name: "az.eventhubs.amqp.lifecycle",
            value: 1,
            attributes: expect.objectContaining(attributes),
          }),
        );
        expect(records).toContainEqual(
          expect.objectContaining({
            eventName: "az.eventhubs.amqp.lifecycle",
            attributes: expect.objectContaining(attributes),
          }),
        );
      }
    } finally {
      await Promise.all([consumer.close(), producer.close()]);
      metrics.disable();
      logs.disable();
    }
  });
});
