// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionConfig } from "@azure/core-amqp";
import { getTracer } from "@azure/core-tracing";
import { Span, SpanContext, SpanKind } from "@opentelemetry/api";

/**
 * @internal
 * @ignore
 */
export function createMessageSpan(
  parentSpan?: Span | SpanContext | null,
  config?: Pick<ConnectionConfig, "entityPath" | "host">
): Span {
  const tracer = getTracer();
  const span = tracer.startSpan("Azure.ServiceBus.message", {
    kind: SpanKind.PRODUCER,
    parent: parentSpan
  });
  span.setAttribute("az.namespace", "Microsoft.ServiceBus");
  if (config) {
    span.setAttribute("message_bus.destination", config.entityPath);
    span.setAttribute("peer.address", config.host);
  }
  return span;
}
