// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createNoopMeter, metrics } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import type { Attributes, Counter, Histogram, Meter } from "@opentelemetry/api";
import { packageJsonInfo } from "../util/constants.js";
import type { EventHubConnectionConfig } from "../eventhubConnectionConfig.js";
import type { OperationOptions } from "../util/operationOptions.js";
import { tracingClient } from "./tracing.js";

type Destination = Pick<EventHubConnectionConfig, "host" | "entityPath">;
type Operation = "send" | "receive";
type Outcome = "success" | "error" | "cancelled";

interface Instruments {
  operations: Counter;
  events: Counter;
  duration: Histogram;
  lifecycle: Counter;
}

function createInstruments(meter: Meter): Instruments {
  return {
    operations: meter.createCounter("az.eventhubs.operations", { unit: "{operation}" }),
    events: meter.createCounter("az.eventhubs.events", { unit: "{event}" }),
    duration: meter.createHistogram("az.eventhubs.operation.duration", {
      unit: "s",
      advice: { explicitBucketBoundaries: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10] },
    }),
    lifecycle: meter.createCounter("az.eventhubs.amqp.lifecycle", { unit: "{transition}" }),
  };
}

const meters = new WeakMap<Meter, Instruments>();
function getInstruments(): Instruments | undefined {
  const meter = metrics.getMeter(packageJsonInfo.name, packageJsonInfo.version);
  if (meter === createNoopMeter()) return undefined;
  let instruments = meters.get(meter);
  if (!instruments) {
    instruments = createInstruments(meter);
    meters.set(meter, instruments);
  }
  return instruments;
}

function destinationAttributes(config: Destination): Attributes {
  return {
    "messaging.system": "eventhubs",
    "messaging.destination.name": config.entityPath,
    "server.address": config.host,
  };
}

function failureOutcome(error: unknown): Outcome {
  return error instanceof Error && error.name === "AbortError" ? "cancelled" : "error";
}

/** Counts logical operations once across AMQP retries, including empty receives. */
export async function measureOperation<T>(
  config: Destination,
  operation: Operation,
  run: () => Promise<T>,
  eventCount: (result: T) => number,
  preparationDurationInMs = 0,
): Promise<T> {
  const instruments = getInstruments();
  if (!instruments) return run();
  const start = performance.now();
  let count = 0;
  let outcome: Outcome = "success";
  try {
    const result = await run();
    count = eventCount(result);
    return result;
  } catch (error) {
    outcome = failureOutcome(error);
    throw error;
  } finally {
    recordOperation(
      instruments,
      config,
      operation,
      outcome,
      performance.now() - start + preparationDurationInMs,
      count,
    );
  }
}

function recordOperation(
  instruments: Instruments,
  config: Destination,
  operation: Operation,
  outcome: Outcome,
  durationInMs: number,
  count: number,
): void {
  const attributes = { ...destinationAttributes(config), operation, outcome };
  instruments.duration.record(durationInMs / 1000, attributes);
  instruments.operations.add(1, attributes);
  if (count > 0) instruments.events.add(count, attributes);
}

/** Records a failed buffered preparation that could not enter the send path. */
export function recordOperationFailure(
  config: Destination,
  operation: Operation,
  error: unknown,
  durationInMs: number,
): void {
  const instruments = getInstruments();
  const outcome = failureOutcome(error);
  if (instruments) recordOperation(instruments, config, operation, outcome, durationInMs, 0);
  const { span } = tracingClient.startSpan(
    "EventHubs.buffered.prepare",
    {},
    {
      spanKind: "client",
      spanAttributes: { ...destinationAttributes(config), operation },
    },
  );
  span.setStatus({ status: "error", error: outcome });
  span.end();
}

/** Records lifecycle transitions without exposing broker errors or message bodies. */
export function recordLifecycle(
  config: Destination,
  component: "connection" | "cbs" | "sender" | "receiver",
  action: "open" | "disconnect" | "attach",
  outcome: Outcome,
): void {
  const attributes = {
    ...destinationAttributes(config),
    component,
    action,
    outcome,
  };
  getInstruments()?.lifecycle.add(1, attributes);
  const logger = logs.getLogger(packageJsonInfo.name, packageJsonInfo.version);
  const severityNumber = outcome === "error" ? SeverityNumber.WARN : SeverityNumber.INFO;
  if (logger.enabled?.({ severityNumber }) !== false) {
    logger.emit({
      eventName: "az.eventhubs.amqp.lifecycle",
      body: `AMQP ${component} ${action}`,
      severityNumber,
      attributes,
    });
  }
}

/** Creates a transport span while preserving the original error for the caller. */
export async function traceAmqp<T>(
  name: string,
  config: Destination,
  options: OperationOptions,
  run: (parent: OperationOptions) => Promise<T>,
  component?: "cbs" | "sender" | "receiver",
): Promise<T> {
  const { span, updatedOptions } = tracingClient.startSpan(name, options, {
    spanKind: "client",
    spanAttributes: destinationAttributes(config),
  });
  let outcome: Outcome = "success";
  try {
    const result = await tracingClient.withContext(
      updatedOptions.tracingOptions.tracingContext,
      run,
      updatedOptions,
    );
    span.setStatus({ status: "success" });
    return result;
  } catch (error) {
    outcome = failureOutcome(error);
    span.setStatus({ status: "error", error: outcome });
    throw error;
  } finally {
    if (component) {
      tracingClient.withContext(updatedOptions.tracingOptions.tracingContext, () =>
        recordLifecycle(config, component, component === "cbs" ? "open" : "attach", outcome),
      );
    }
    span.end();
  }
}
