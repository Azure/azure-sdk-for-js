// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Span } from "@opentelemetry/api";
import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

export function spanToReadableSpan(span: Span): ReadableSpan {
  const s = span as any;
  return {
    name: s["name"],
    kind: s["kind"],
    spanContext: () => ({
      traceId: s["_spanContext"]?.traceId,
      spanId: s["_spanContext"]?.spanId,
      traceFlags: s["_spanContext"]?.traceFlags,
    }),
    parentSpanContext: {
      traceId: s["parentSpanContext"]?.traceId,
      spanId: s["parentSpanContext"]?.spanId,
      traceFlags: s["parentSpanContext"]?.traceFlags,
    },
    startTime: s["startTime"],
    endTime: s["endTime"],
    attributes: s["attributes"],
    status: s["status"],
    links: s["links"],
    events: s["events"],
    duration: s["duration"],
    ended: s["ended"],
    resource: s["resource"],
    instrumentationScope: s["instrumentationScope"],
    droppedAttributesCount: s["droppedAttributesCount"],
    droppedEventsCount: s["droppedEventsCount"],
    droppedLinksCount: s["droppedLinksCount"],
  };
}
