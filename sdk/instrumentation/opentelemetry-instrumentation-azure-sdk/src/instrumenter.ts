// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
} from "@azure/core-tracing";
import { W3CTraceContextPropagator, suppressTracing } from "@opentelemetry/core";
import { context, defaultTextMapGetter, defaultTextMapSetter, trace } from "@opentelemetry/api";
import { toBoolean, toSpanOptions } from "./transformations";

import { OpenTelemetrySpanWrapper } from "./spanWrapper";

// While default propagation is user-configurable, Azure services always use the W3C implementation.
export const propagator = new W3CTraceContextPropagator();

export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    name: string,
    spanOptions: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    let ctx = spanOptions?.tracingContext || context.active();
    if (isTracingDisabled(name)) {
      ctx = suppressTracing(ctx);
    }

    const span = trace
      .getTracer(spanOptions.packageName, spanOptions.packageVersion)
      .startSpan(name, toSpanOptions(spanOptions), ctx);

    // COMPAT: remove when core-rest-pipeline has upgraded to core-tracing 1.0
    // https://github.com/Azure/azure-sdk-for-js/issues/20567
    const newNamespaceKey = Symbol.for("@azure/core-tracing namespace");
    const oldNamespaceKey = Symbol.for("az.namespace");
    if (!ctx.getValue(oldNamespaceKey) && ctx.getValue(newNamespaceKey)) {
      ctx = ctx.setValue(oldNamespaceKey, ctx.getValue(newNamespaceKey));
    }

    return {
      span: new OpenTelemetrySpanWrapper(span),
      tracingContext: trace.setSpan(ctx, span),
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    tracingContext: TracingContext,
    callback: Callback,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return context.with(
      tracingContext,
      callback,
      /** Assume caller will bind `this` or use arrow functions */ undefined,
      ...callbackArgs
    );
  }

  parseTraceparentHeader(traceparentHeader: string): TracingContext {
    return propagator.extract(
      context.active(),
      { traceparent: traceparentHeader },
      defaultTextMapGetter
    );
  }

  createRequestHeaders(tracingContext?: TracingContext): Record<string, string> {
    const headers: Record<string, string> = {};
    propagator.inject(tracingContext || context.active(), headers, defaultTextMapSetter);
    return headers;
  }
}

/**
 * Checks whether tracing is disabled by checking the relevant environment variables.
 *
 * @returns - `true` if tracing is disabled, `false` otherwise.
 *
 * @internal
 */
export function isTracingDisabled(spanName?: string): boolean {
  if (typeof process === "undefined") {
    return false;
  }

  const tracingDisabledGlobally = toBoolean(process.env.AZURE_TRACING_DISABLED);
  const httpSpansDisabled = toBoolean(process.env.AZURE_HTTP_TRACING_DISABLED);

  const conditions = [
    tracingDisabledGlobally,
    spanName && spanName.startsWith("HTTP") && httpSpansDisabled,
  ];

  return conditions.some(Boolean);
}
