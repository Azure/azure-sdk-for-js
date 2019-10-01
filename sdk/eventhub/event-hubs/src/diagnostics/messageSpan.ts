// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SpanContext, Span, getTracer, SpanKind } from "@azure/core-tracing";

export function createMessageSpan(parentSpan?: Span | SpanContext): Span {
  const tracer = getTracer();
  const span = tracer.startSpan("Azure.EventHubs.message", {
    kind: SpanKind.INTERNAL,
    parent: parentSpan
  });

  return span;
}
