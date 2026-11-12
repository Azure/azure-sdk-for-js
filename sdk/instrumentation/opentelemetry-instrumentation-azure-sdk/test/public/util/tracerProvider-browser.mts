// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context, propagation, trace } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import type { SpanProcessor } from "@opentelemetry/sdk-trace";
import { StackContextManager, TracerProvider } from "@opentelemetry/sdk-trace";

// Register the provider and synchronous context manager in browser environments.
export function createTracerProvider(spanProcessors: SpanProcessor[]): TracerProvider {
  const tracerProvider = new TracerProvider({
    spanProcessors: spanProcessors,
  });
  trace.setGlobalTracerProvider(tracerProvider);
  context.setGlobalContextManager(new StackContextManager().enable());
  propagation.setGlobalPropagator(new W3CTraceContextPropagator());
  return tracerProvider;
}
