// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createNoopMeter, metrics } from "@opentelemetry/api";
import type { Attributes, Meter } from "@opentelemetry/api";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EventHubBufferedProducerClient } from "../../src/index.js";
import { EventDataBatchImpl } from "../../src/eventDataBatch.js";
import { getPromiseParts } from "../../src/util/getPromiseParts.js";
import { EventHubSender } from "../../src/eventHubSender.js";
import type { EventHubBufferedProducerClientOptions } from "../../src/index.js";

function captureMetrics() {
  const points: { name: string; value: number; attributes?: Attributes }[] = [];
  const meter: Meter = Object.create(createNoopMeter());
  meter.createCounter = (name) => ({
    add: (value, attributes) => points.push({ name, value, attributes }),
  });
  meter.createHistogram = (name) => ({
    record: (value, attributes) => points.push({ name, value, attributes }),
  });
  metrics.setGlobalMeterProvider({ getMeter: () => meter });
  return (instrument: string, outcome?: string) =>
    points
      .filter(
        (point) =>
          point.name === `az.eventhubs.${instrument}` &&
          point.attributes?.operation === "send" &&
          (!outcome || point.attributes.outcome === outcome),
      )
      .map((point) => point.value);
}

function createClient(
  options: EventHubBufferedProducerClientOptions,
): EventHubBufferedProducerClient {
  const client = new EventHubBufferedProducerClient(
    "Endpoint=sb://unused.invalid/;SharedAccessKeyName=name;SharedAccessKey=key;EntityPath=test-hub",
    options,
  );
  vi.spyOn(client, "getPartitionIds").mockResolvedValue(["0"]);
  return client;
}

describe("buffered send telemetry", () => {
  afterEach(() => {
    metrics.disable();
    vi.restoreAllMocks();
  });

  it("counts an oversized event, a transport failure and a successful send once each", async () => {
    const values = captureMetrics();
    const onError = vi.fn();
    const onSuccess = vi.fn();
    const client = createClient({
      maxEventBufferLengthPerPartition: 1,
      onSendEventsErrorHandler: onError,
      onSendEventsSuccessHandler: onSuccess,
    });
    const tooLarge = { body: "x".repeat(8192) };
    const sendError = new Error("send failed");
    const size = vi.spyOn(EventHubSender.prototype, "getMaxMessageSize").mockResolvedValue(2048);
    size.mockRejectedValueOnce(new Error("retry preparation with event still queued"));
    const send = vi
      .spyOn(EventHubSender.prototype, "send")
      .mockRejectedValueOnce(sendError)
      .mockResolvedValue(undefined);
    try {
      await client.enqueueEvent(tooLarge);
      await client.flush();
      expect(onError.mock.calls.map(([context]) => context.events)).toEqual([[], [tooLarge]]);
      expect(values("operations", "error")).toEqual([1]);

      const rejected = { body: "reject" };
      await client.enqueueEvent(rejected);
      await client.flush();
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({ events: [rejected], error: sendError }),
      );

      const accepted = { body: "accept" };
      // The channel eagerly creates its next batch, even with no work remaining.
      size.mockRejectedValueOnce(new Error("idle batch creation"));
      await client.enqueueEvent(accepted);
      await client.flush();
      await vi.waitFor(() => expect(onError).toHaveBeenCalledTimes(4));
      expect(onSuccess).toHaveBeenCalledWith(expect.objectContaining({ events: [accepted] }));
      expect(send).toHaveBeenCalledTimes(2);
      expect(values("operations", "success")).toEqual([1]);
      expect(values("operations", "error")).toEqual([1, 1]);
      expect(values("events")).toEqual([1]);
      expect(values("operation.duration")).toHaveLength(3);
    } finally {
      await client.close({ flush: false });
    }
  });

  it("reports terminal preparation failure for the held batch and retries the current event", async () => {
    const values = captureMetrics();
    const onError = vi.fn();
    const onSuccess = vi.fn();
    const client = createClient({
      maxWaitTimeInMs: 50,
      maxEventBufferLengthPerPartition: 2,
      onSendEventsErrorHandler: onError,
      onSendEventsSuccessHandler: onSuccess,
    });
    vi.spyOn(EventHubSender.prototype, "getMaxMessageSize").mockResolvedValue(2048);
    vi.spyOn(EventHubSender.prototype, "send").mockResolvedValue(undefined);
    const first = { body: "first" };
    const retained = { body: "retry" };
    const prepareError = new Error("encoding failed");
    const tryAdd = EventDataBatchImpl.prototype.tryAdd;
    let failOnce = true;
    vi.spyOn(EventDataBatchImpl.prototype, "tryAdd").mockImplementation(function (
      this: EventDataBatchImpl,
      event,
      options,
    ) {
      if (event === retained && failOnce) {
        failOnce = false;
        throw prepareError;
      }
      return tryAdd.call(this, event, options);
    });
    try {
      await client.enqueueEvents([first, retained]);
      await client.flush();
      expect(onError).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ events: [first], error: prepareError }),
      );
      expect(onSuccess).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ events: [retained] }),
      );
      expect(values("operations", "error")).toEqual([1]);
      expect(values("operations", "success")).toEqual([1]);
      expect(values("events")).toEqual([1]);
    } finally {
      await client.close({ flush: false });
    }
  });
  it("includes active preparation and transport and excludes time waiting for another event", async () => {
    const values = captureMetrics();
    const client = createClient({
      maxEventBufferLengthPerPartition: 2,
      maxWaitTimeInMs: 60_000,
      onSendEventsErrorHandler: vi.fn(),
    });
    let now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => now);
    vi.spyOn(EventHubSender.prototype, "getMaxMessageSize").mockImplementation(async () => {
      now += 200;
      return 2048;
    });
    const added = getPromiseParts<void>();
    const tryAdd = EventDataBatchImpl.prototype.tryAdd;
    vi.spyOn(EventDataBatchImpl.prototype, "tryAdd").mockImplementation(function (
      this: EventDataBatchImpl,
      event,
      options,
    ) {
      now += 100;
      added.resolve();
      return tryAdd.call(this, event, options);
    });
    vi.spyOn(EventHubSender.prototype, "send").mockImplementation(async () => {
      now += 600;
    });
    try {
      await client.enqueueEvent({ body: "first" });
      await added.promise;
      now += 20_000;
      await client.enqueueEvent({ body: "second" });
      await client.flush();
      expect(values("operation.duration", "success")).toEqual([1]);
      expect(values("events", "success")).toEqual([2]);
    } finally {
      await client.close({ flush: false });
    }
  });

  it("times the part of an in-flight batch creation after the first event arrives", async () => {
    const values = captureMetrics();
    const client = createClient({
      maxEventBufferLengthPerPartition: 1,
      onSendEventsErrorHandler: vi.fn(),
    });
    const creating = getPromiseParts<void>();
    const resume = getPromiseParts<void>();
    let now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => now);
    vi.spyOn(EventHubSender.prototype, "getMaxMessageSize")
      .mockResolvedValueOnce(2048)
      .mockImplementationOnce(async () => {
        creating.resolve();
        await resume.promise;
        return 2048;
      })
      .mockResolvedValue(2048);
    vi.spyOn(EventHubSender.prototype, "send").mockResolvedValue(undefined);
    try {
      await client.enqueueEvent({ body: "first" });
      await creating.promise;
      now = 20_000;
      await client.enqueueEvent({ body: "second" });
      now += 500;
      resume.resolve();
      await client.flush();
      expect(values("operation.duration", "success")).toEqual([0, 0.5]);
    } finally {
      resume.resolve();
      await client.close({ flush: false });
    }
  });

  it("counts a prepared batch abandoned on close without invoking a delivery callback", async () => {
    const values = captureMetrics();
    const callback = vi.fn();
    const client = createClient({
      maxWaitTimeInMs: 60_000,
      onSendEventsErrorHandler: callback,
      onSendEventsSuccessHandler: callback,
    });
    vi.spyOn(EventHubSender.prototype, "getMaxMessageSize").mockResolvedValue(2048);
    const added = getPromiseParts<void>();
    const tryAdd = EventDataBatchImpl.prototype.tryAdd;
    vi.spyOn(EventDataBatchImpl.prototype, "tryAdd").mockImplementation(function (
      this: EventDataBatchImpl,
      event,
      options,
    ) {
      added.resolve();
      return tryAdd.call(this, event, options);
    });
    try {
      await client.enqueueEvent({ body: "abandon" });
      await added.promise;
    } finally {
      await client.close({ flush: false });
    }
    expect(values("operations", "cancelled")).toEqual([1]);
    expect(values("events")).toEqual([]);
    expect(callback).not.toHaveBeenCalled();
  });
});
