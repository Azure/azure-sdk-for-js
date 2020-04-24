// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getTracer } from "@azure/core-tracing";
import { Span, SpanContext, SpanKind } from "@opentelemetry/api";

/**
 * @internal
 * @ignore
 */
export function createMessageSpan(parentSpan?: Span | SpanContext | null): Span {
  const tracer = getTracer();
  const span = tracer.startSpan("Azure.EventHubs.message", {
    kind: SpanKind.PRODUCER,
    parent: parentSpan
  });
  span.setAttribute("az.namespace", "Microsoft.EventHub");

  return span;
}
