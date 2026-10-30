// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { context, propagation, trace } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import type { SpanProcessor } from "@opentelemetry/sdk-trace";
import { TracerProvider } from "@opentelemetry/sdk-trace";

// Register the provider and async context manager in Node.js environments.
export function createTracerProvider(spanProcessors: SpanProcessor[]): TracerProvider {
  const tracerProvider = new TracerProvider({
    spanProcessors: spanProcessors,
  });
  trace.setGlobalTracerProvider(tracerProvider);
  context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable());
  propagation.setGlobalPropagator(new W3CTraceContextPropagator());
  return tracerProvider;
}
