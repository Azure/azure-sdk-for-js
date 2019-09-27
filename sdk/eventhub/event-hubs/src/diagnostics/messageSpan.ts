// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SpanContext, Span, TracerProxy, SpanKind } from "@azure/core-tracing";

export function createMessageSpan(parentSpan?: Span | SpanContext): Span {
  const tracer = TracerProxy.getTracer();
  const span = tracer.startSpan("Azure.EventHubs.message", {
    kind: SpanKind.INTERNAL,
    parent: parentSpan
  });

  return span;
}
