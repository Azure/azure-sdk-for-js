// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes, HrTime, SpanContext, SpanOptions } from "@opentelemetry/api";
import { SpanKind, ROOT_CONTEXT } from "@opentelemetry/api";
import { timeInputToHrTime } from "@opentelemetry/core";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import {
  ENQUEUED_TIME,
  TIME_SINCE_ENQUEUED,
} from "../../src/utils/constants/applicationinsights.js";
import {
  AzNamespace,
  MessageBusDestination,
  MicrosoftEventHub,
} from "../../src/utils/constants/span/azAttributes.js";
import { parseEventHubSpan } from "../../src/utils/eventhub.js";
import type { RemoteDependencyData, TelemetryItem as Envelope } from "../../src/generated/index.js";
import { describe, it, assert } from "vitest";
import { spanToReadableSpan } from "../utils/spanToReadableSpan.js";

const tracer = new BasicTracerProvider().getTracer("default");

describe("#parseEventHubSpan(...)", () => {
  const peerAddress = "example.servicebus.windows.net";
  const destination = "test123";
  const attributes: Attributes = {
    [AzNamespace]: MicrosoftEventHub,
    ["peer.address"]: peerAddress,
    [MessageBusDestination]: destination,
  };

  it("should correctly parse SpanKind.CLIENT", () => {
    const envelope = { data: { baseData: {} } } as Envelope;
    const spanOptions = {
      kind: SpanKind.CLIENT,
    };
    const span = tracer.startSpan("test span", spanOptions, ROOT_CONTEXT);
    span.setAttributes(attributes);

    const baseData = envelope.data?.baseData as RemoteDependencyData;
    parseEventHubSpan(spanToReadableSpan(span), baseData);

    assert.strictEqual(baseData.type, attributes[AzNamespace]);
    assert.strictEqual(baseData.target, `${peerAddress}/${destination}`);

    assert.strictEqual((baseData as any).source, undefined);
    assert.strictEqual(baseData.measurements, undefined);
  });

  it("should correctly parse SpanKind.PRODUCER", () => {
    const envelope = { data: { baseData: {} } } as Envelope;
    const spanOptions: SpanOptions = {
      kind: SpanKind.PRODUCER,
    };
    const span = tracer.startSpan("test span", spanOptions, ROOT_CONTEXT);
    span.setAttributes(attributes);

    const baseData = envelope.data?.baseData as RemoteDependencyData;
    parseEventHubSpan(spanToReadableSpan(span), baseData);

    assert.strictEqual(baseData.type, `Queue Message | ${attributes[AzNamespace]}`);
    assert.strictEqual(baseData.target, `${peerAddress}/${destination}`);

    assert.strictEqual((baseData as any).source, undefined);
    assert.strictEqual(baseData.measurements, undefined);
  });

  it("should correctly parse SpanKind.CONSUMER", () => {
    const startTime = Date.now();
    const envelope = { data: { baseData: {} } } as Envelope;
    const spanOptions: SpanOptions = {
      kind: SpanKind.CONSUMER,
      links: [
        {
          context: null as unknown as SpanContext,
          attributes: { [ENQUEUED_TIME]: startTime - 111 },
        },
        {
          context: null as unknown as SpanContext,
          attributes: { [ENQUEUED_TIME]: startTime - 222 },
        },
        {
          context: null as unknown as SpanContext,
          attributes: { [ENQUEUED_TIME]: startTime - 111 },
        },
      ],
    };

    const span = tracer.startSpan("test span", spanOptions, ROOT_CONTEXT);

    // cast since startTime is readonly
    (spanToReadableSpan(span) as { startTime: HrTime }).startTime = timeInputToHrTime(startTime);
    span.setAttributes(attributes);

    const baseData = envelope.data?.baseData as RemoteDependencyData;
    parseEventHubSpan(spanToReadableSpan(span), baseData);
    assert.strictEqual(baseData.type, `Queue Message | ${attributes[AzNamespace]}`);
    assert.strictEqual((baseData as any).source, `${peerAddress}/${destination}`);
    assert.isAtLeast(baseData.measurements?.[TIME_SINCE_ENQUEUED] as unknown as number, 148);

    assert.strictEqual(baseData.target, undefined);
  });
});
