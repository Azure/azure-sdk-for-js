// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes, Meter } from "@opentelemetry/api";
import { createNoopMeter, metrics } from "@opentelemetry/api";
import { logs, type LogRecord } from "@opentelemetry/api-logs";
import { describe, expect, it, vi } from "vitest";
import { MockInstrumenter } from "@azure-tools/test-utils-vitest";
import { useInstrumenter } from "@azure/core-tracing";
import { AbortError } from "@azure/abort-controller";
import { MessagingError } from "@azure/core-amqp";
import { recordOperationFailure, traceAmqp } from "../../src/diagnostics/telemetry.js";
import { SubscriptionHandlerForTests } from "../utils/subscriptionHandlerForTests.js";
import { assert } from "../utils/chai.js";
import { createConsumer, createProducer, createReceiver } from "../utils/clients.js";

describe("Event Hubs OpenTelemetry", () => {
  it("preserves explicit parents during batch creation, subscription and CBS authentication", async () => {
    const instrumenter = new MockInstrumenter();
    const empty = instrumenter.currentContext();
    vi.spyOn(instrumenter, "currentContext").mockReturnValue(empty);
    useInstrumenter(instrumenter);
    const { producer } = createProducer();
    const { consumer } = createConsumer();
    try {
      const { span: caller, tracingContext } = instrumenter.startSpan("caller");
      const tracingOptions = { tracingContext };
      const batch = await producer.createBatch({ partitionId: "0", tracingOptions });
      const sender = instrumenter.startedSpans.find(
        (span) => span.name === "EventHubs.sender.attach",
      );
      expect(sender?.parentSpan()).toBe(caller);
      expect(
        instrumenter.startedSpans.find((span) => span.name === "EventHubs.cbs.open")?.parentSpan(),
      ).toBe(sender);

      const { subscriptionEventHandler, startPosition } =
        await SubscriptionHandlerForTests.startingFromHere(producer);
      const subscription = consumer.subscribe("0", subscriptionEventHandler, {
        tracingOptions,
        startPosition,
        maxBatchSize: 1,
      });
      try {
        batch.tryAdd({ body: "context" });
        await producer.sendBatch(batch);
        await subscriptionEventHandler.waitForEvents(["0"], 1);
      } finally {
        await subscription.close();
      }
      const receive = instrumenter.startedSpans.find((span) => span.name === "EventHubs.receive");
      const receiver = instrumenter.startedSpans.find(
        (span) => span.name === "EventHubs.receiver.attach",
      );
      expect(receive?.parentSpan()).toBe(caller);
      expect(receiver?.parentSpan()).toBe(receive);
      expect(
        instrumenter.startedSpans
          .filter((span) => span.name === "EventHubs.cbs.open")
          .map((span) => span.parentSpan()),
      ).toContain(receiver);
      caller.end();
    } finally {
      await Promise.all([consumer.close(), producer.close()]);
      useInstrumenter(undefined!);
    }
  });

  it("records the terminal retry outcome and safe error types for failure spans", async () => {
    const instrumenter = new MockInstrumenter();
    useInstrumenter(instrumenter);
    const records: LogRecord[] = [];
    logs.setGlobalLoggerProvider({ getLogger: () => ({ emit: (record) => records.push(record) }) });
    const destination = { host: "example", entityPath: "hub" };
    const failure = new MessagingError("private broker description");
    failure.code = "ServiceUnavailableError";
    const cancellation = new AggregateError([failure, new AbortError("private abort reason")]);
    try {
      const returned = await traceAmqp(
        "attach",
        destination,
        {},
        async () => {
          throw cancellation;
        },
        "sender",
      ).catch((error: unknown) => error);
      expect(returned).toBe(cancellation);
      expect(records[0].attributes?.outcome).toBe("cancelled");
      recordOperationFailure(destination, "send", failure, 1);
      expect(instrumenter.startedSpans.map((span) => span.attributes["error.type"])).toEqual([
        "AbortError",
        "ServiceUnavailableError",
      ]);
      for (const span of instrumenter.startedSpans) {
        expect(span.spanStatus).toEqual({ status: "error" });
        expect(span.exception).toBeUndefined();
      }
    } finally {
      logs.disable();
      useInstrumenter(undefined!);
    }
  });

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
        getLogger: () => ({
          enabled: (filter) => filter?.eventName === "az.eventhubs.amqp.lifecycle",
          emit: (record) => {
            if (record.eventName === "az.eventhubs.amqp.lifecycle") records.push(record);
          },
        }),
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
      await assert.supportsTracing(async (options) => {
        await assert.isRejected(
          producer.sendBatch([], {
            ...options,
            partitionId,
            partitionKey: "conflicting",
          }),
          "cannot both be specified",
        );
      }, []);

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
