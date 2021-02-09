// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer } from "@azure/core-tracing";
import { Span, SpanContext, SpanKind, Context, setSpan, context as otContext, setSpanContext } from "@opentelemetry/api";
import { EventHubConnectionConfig } from "../eventhubConnectionConfig";

/**
 * @internal
 */
export function createMessageSpan(
  parentSpan?: Span | SpanContext | null,
  eventHubConfig?: Pick<EventHubConnectionConfig, "entityPath" | "host">
): Span {
  const tracer = getTracer();

  const context: Context = createContextForParentSpan(parentSpan);

  const span = tracer.startSpan("Azure.EventHubs.message", {
    kind: SpanKind.PRODUCER,
  }, context);

  span.setAttribute("az.namespace", "Microsoft.EventHub");
  if (eventHubConfig) {
    span.setAttribute("message_bus.destination", eventHubConfig.entityPath);
    span.setAttribute("peer.address", eventHubConfig.host);
  }

  return span;
}

/** @internal */
export function createContextForParentSpan(parentSpan: SpanContext | Span | null | undefined): Context {
  if (isSpan(parentSpan)) {
    return setSpan(otContext.active(), parentSpan);
  } else if (isSpanContext(parentSpan)) {
    return setSpanContext(otContext.active(), parentSpan);
  } else {
    return otContext.active();
  }
}

function isSpan(span: SpanContext | Span | undefined | null): span is Span {
  return span != null && typeof (span as Span).context === "function";
}

function isSpanContext(span: SpanContext | Span | undefined | null): span is SpanContext {
  return span != null && typeof (span as SpanContext).spanId === "string";
}
