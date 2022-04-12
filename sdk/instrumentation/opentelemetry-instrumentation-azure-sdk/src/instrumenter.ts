// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  INVALID_SPAN_CONTEXT,
  Span,
  context,
  defaultTextMapGetter,
  defaultTextMapSetter,
  trace,
} from "@opentelemetry/api";
import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
} from "@azure/core-tracing";
import { W3CTraceContextPropagator, suppressTracing } from "@opentelemetry/core";

import { OpenTelemetrySpanWrapper } from "./spanWrapper";
import { envVarToBoolean } from "./configuration";
import { toSpanOptions } from "./transformations";

// While default propagation is user-configurable, Azure services always use the W3C implementation.
export const propagator = new W3CTraceContextPropagator();

export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    name: string,
    spanOptions: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    let ctx = spanOptions?.tracingContext || context.active();
    let span: Span;

    if (envVarToBoolean("AZURE_TRACING_DISABLED")) {
      // disable only our spans but not any downstream spans
      span = trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
    } else {
      // Create our span
      span = trace
        .getTracer(spanOptions.packageName, spanOptions.packageVersion)
        .startSpan(name, toSpanOptions(spanOptions), ctx);

      if (envVarToBoolean("AZURE_HTTP_TRACING_DISABLED") && name.toUpperCase().startsWith("HTTP")) {
        // disable downstream spans
        ctx = suppressTracing(ctx);
      }
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
