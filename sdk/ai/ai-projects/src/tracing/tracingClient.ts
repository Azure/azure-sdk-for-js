// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Thin wrapper around `\@opentelemetry/api` for tracing.
 * Uses direct imports since `\@opentelemetry/api` is an explicit dependency.
 * @internal
 */

import { trace, context, propagation, SpanKind, defaultTextMapSetter } from "@opentelemetry/api";
import type { Span, Context } from "@opentelemetry/api";
import { PACKAGE_NAME, SDK_VERSION } from "../constants.js";

export type { Span as OTelSpan } from "@opentelemetry/api";
export { SpanStatusCode } from "@opentelemetry/api";

export interface StartSpanResult {
  span: Span;
  ctx: Context;
}

/**
 * Starts a new client span using the global OTel TracerProvider.
 */
export function startSpan(name: string): StartSpanResult {
  const tracer = trace.getTracer(PACKAGE_NAME, SDK_VERSION);
  const ctx = context.active();
  const span = tracer.startSpan(name, { kind: SpanKind.CLIENT }, ctx);
  const spanCtx = trace.setSpan(ctx, span);
  return { span, ctx: spanCtx };
}

/**
 * Injects trace context headers (traceparent/tracestate) for the current active span.
 */
export function createRequestHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  propagation.inject(context.active(), headers, defaultTextMapSetter);
  return headers;
}

/**
 * Runs a callback with the given span context as the active context,
 * so that child operations (e.g. tracingFetch header injection) see this span
 * as their parent.
 */
export function runInSpanContext<T>(ctx: Context, fn: () => T): T {
  return context.with(ctx, fn);
}
