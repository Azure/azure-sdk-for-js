// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer } from "@azure/core-tracing";
import { Span, SpanContext, SpanKind } from "@opentelemetry/api";
import { EventHubConnectionConfig } from "@azure/core-amqp";

/**
 * @internal
 * @ignore
 */
export function createMessageSpan(
  parentSpan?: Span | SpanContext | null,
  eventHubConfig?: Pick<EventHubConnectionConfig, "entityPath" | "host">
): Span {
  const tracer = getTracer();
  const span = tracer.startSpan("Azure.EventHubs.message", {
    kind: SpanKind.PRODUCER,
    parent: parentSpan
  });
  span.setAttribute("az.namespace", "Microsoft.EventHub");
  if (eventHubConfig) {
    span.setAttribute("message_bus.destination", eventHubConfig.entityPath);
    span.setAttribute("peer.address", eventHubConfig.host);
  }

  return span;
}
