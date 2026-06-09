// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Thin wrapper around opentelemetry/api, used directly (like Python and C# SDKs)
 * instead of going through azure/core-tracing's abstraction layer.
 *
 * If opentelemetry/api is not installed, all operations are no-ops.
 * @internal
 */

import * as nodeModule from "node:module";
import { PACKAGE_NAME, SDK_VERSION } from "../constants.js";

// We use a lazy-init pattern: resolve OTel on first use (after customer has
// called provider.register()). This avoids import-order issues.
let _otel: typeof import("@opentelemetry/api") | null | undefined;

function getOTel(): typeof import("@opentelemetry/api") | null {
  if (_otel === undefined) {
    try {
      let _require: ((id: string) => unknown) | undefined;
      if (typeof require === "function") {
        // CJS — native require is available (esbuild CommonJS build)
        _require = require;
      } else if (typeof import.meta.url === "string") {
        // ESM — use createRequire to load the optional dependency
        _require = nodeModule.createRequire(import.meta.url);
      }
      if (!_require) {
        _otel = null;
        return null;
      }
      _otel = _require("@opentelemetry/api") as typeof import("@opentelemetry/api");
    } catch {
      _otel = null;
    }
  }
  return _otel;
}

/** OTel Span type (or a no-op compatible shape) */
export type OTelSpan = import("@opentelemetry/api").Span;

export interface StartSpanResult {
  span: OTelSpan;
  ctx: import("@opentelemetry/api").Context;
}

/**
 * Starts a new client span using the global OTel TracerProvider.
 * Returns a no-op span if OTel is not available.
 */
export function startSpan(name: string): StartSpanResult {
  const otel = getOTel();
  if (!otel) {
    // Return a no-op span
    return {
      span: createNoOpSpan(),
      ctx: {} as import("@opentelemetry/api").Context,
    };
  }
  const tracer = otel.trace.getTracer(PACKAGE_NAME, SDK_VERSION);
  const ctx = otel.context.active();
  const span = tracer.startSpan(name, { kind: otel.SpanKind.CLIENT }, ctx);
  const spanCtx = otel.trace.setSpan(ctx, span);
  return { span, ctx: spanCtx };
}

/**
 * Injects trace context headers (traceparent/tracestate) for the current active span.
 */
export function createRequestHeaders(): Record<string, string> {
  const otel = getOTel();
  if (!otel) return {};
  const headers: Record<string, string> = {};
  otel.propagation.inject(otel.context.active(), headers, otel.defaultTextMapSetter);
  return headers;
}

/**
 * Runs a callback with the given span context as the active context,
 * so that child operations (e.g. tracingFetch header injection) see this span
 * as their parent.
 */
export function runInSpanContext<T>(ctx: import("@opentelemetry/api").Context, fn: () => T): T {
  const otel = getOTel();
  if (!otel) return fn();
  return otel.context.with(ctx, fn);
}

function createNoOpSpan(): OTelSpan {
  return {
    spanContext: () => ({
      traceId: "00000000000000000000000000000000",
      spanId: "0000000000000000",
      traceFlags: 0,
    }),
    setAttribute: () => createNoOpSpan(),
    setAttributes: () => createNoOpSpan(),
    addEvent: () => createNoOpSpan(),
    addLink: () => createNoOpSpan(),
    setStatus: () => createNoOpSpan(),
    updateName: () => createNoOpSpan(),
    end: () => {},
    isRecording: () => false,
    recordException: () => {},
  } as unknown as OTelSpan;
}
