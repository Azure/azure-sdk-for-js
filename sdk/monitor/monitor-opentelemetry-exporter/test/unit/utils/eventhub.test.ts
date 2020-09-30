// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Attributes, HrTime, SpanContext, SpanKind } from "@opentelemetry/api";
import { NoopLogger, timeInputToHrTime } from "@opentelemetry/core";
import { BasicTracerProvider, Span } from "@opentelemetry/tracing";
import * as assert from "assert";
import { Envelope } from "../../../src/Declarations/Contracts";
import {
  ENQUEUED_TIME,
  TIME_SINCE_ENQUEUED
} from "../../../src/utils/constants/applicationinsights";
import {
  AzNamespace,
  MessageBusDestination,
  MicrosoftEventHub
} from "../../../src/utils/constants/span/azAttributes";
import { parseEventHubSpan } from "../../../src/utils/eventhub";

const tracer = new BasicTracerProvider({
  logger: new NoopLogger()
}).getTracer("default");

describe("#parseEventHubSpan(...)", () => {
  const peerAddress = "example.servicebus.windows.net";
  const destination = "test123";
  const attributes: Attributes = {
    [AzNamespace]: MicrosoftEventHub,
    ["peer.address"]: peerAddress,
    [MessageBusDestination]: destination
  };

  it("should not crash when provided an incomplete envelope", () => {
    const span = new Span(
      tracer,
      "parent span",
      { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
      SpanKind.CLIENT,
      "parentSpanId"
    );

    assert.doesNotThrow(() => parseEventHubSpan(span, ({ data: null } as unknown) as Envelope));
  });

  it("should correctly parse SpanKind.CLIENT", () => {
    const envelope = { data: { baseData: {} } } as Envelope;
    const span = new Span(
      tracer,
      "test span",
      { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
      SpanKind.CLIENT
    );
    span.setAttributes(attributes);

    parseEventHubSpan(span, envelope);
    assert.strictEqual(envelope.data?.baseData?.type, attributes[AzNamespace]);
    assert.strictEqual(envelope.data?.baseData?.target, `${peerAddress}/${destination}`);

    assert.strictEqual(envelope.data?.baseData?.source, undefined);
    assert.strictEqual(envelope.data?.baseData?.measurements, undefined);
  });

  it("should correctly parse SpanKind.PRODUCER", () => {
    const envelope = { data: { baseData: {} } } as Envelope;
    const span = new Span(
      tracer,
      "test span",
      { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
      SpanKind.PRODUCER
    );
    span.setAttributes(attributes);

    parseEventHubSpan(span, envelope);
    assert.strictEqual(envelope.data?.baseData?.type, `Queue Message | ${attributes[AzNamespace]}`);
    assert.strictEqual(envelope.data?.baseData?.target, `${peerAddress}/${destination}`);

    assert.strictEqual(envelope.data?.baseData?.source, undefined);
    assert.strictEqual(envelope.data?.baseData?.measurements, undefined);
  });

  it("should correctly parse SpanKind.CONSUMER", () => {
    const startTime = Date.now();
    const envelope = { data: { baseData: {} } } as Envelope;
    const span = new Span(
      tracer,
      "test span",
      { traceId: "traceid", spanId: "spanId", traceFlags: 0 },
      SpanKind.CONSUMER,
      undefined,
      [
        {
          context: (null as unknown) as SpanContext,
          attributes: { [ENQUEUED_TIME]: startTime - 111 }
        },
        {
          context: (null as unknown) as SpanContext,
          attributes: { [ENQUEUED_TIME]: startTime - 222 }
        },
        {
          context: (null as unknown) as SpanContext,
          attributes: { [ENQUEUED_TIME]: startTime - 111 }
        }
      ]
    );

    // cast since startTime is readonly
    (span as { startTime: HrTime }).startTime = timeInputToHrTime(startTime);
    span.setAttributes(attributes);

    parseEventHubSpan(span, envelope);
    assert.strictEqual(envelope.data?.baseData?.type, `Queue Message | ${attributes[AzNamespace]}`);
    assert.strictEqual(envelope.data?.baseData?.source, `${peerAddress}/${destination}`);
    assert.deepStrictEqual(envelope.data?.baseData?.measurements, {
      [TIME_SINCE_ENQUEUED]: 148
    });

    assert.strictEqual(envelope.data?.baseData?.target, undefined);
  });
});
