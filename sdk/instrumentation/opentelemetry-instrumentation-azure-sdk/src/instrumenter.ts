// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Span } from "@opentelemetry/api";
import {
  INVALID_SPAN_CONTEXT,
  context,
  defaultTextMapGetter,
  defaultTextMapSetter,
  trace,
} from "@opentelemetry/api";
import type {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
} from "@azure/core-tracing";
import { W3CTraceContextPropagator, suppressTracing } from "@opentelemetry/core";

import { OpenTelemetrySpanWrapper } from "./spanWrapper.js";
import { envVarToBoolean } from "./configuration.js";
import { toSpanOptions } from "./transformations.js";

// While default propagation is user-configurable, Azure services always use the W3C implementation.
export const propagator = new W3CTraceContextPropagator();

/**
 * An {@link Instrumenter} implementation backed by OpenTelemetry.
 */
export class OpenTelemetryInstrumenter implements Instrumenter {
  /**
   * Starts a new span.
   * @param name - The span name.
   * @param spanOptions - Span creation options.
   * @returns The created span and its tracing context.
   */
  startSpan(
    name: string,
    spanOptions: InstrumenterSpanOptions,
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

      if (
        envVarToBoolean("AZURE_HTTP_TRACING_CHILDREN_DISABLED") &&
        name.toUpperCase().startsWith("HTTP")
      ) {
        // disable downstream spans
        ctx = suppressTracing(ctx);
      }
    }

    return {
      span: new OpenTelemetrySpanWrapper(span),
      tracingContext: trace.setSpan(ctx, span),
    };
  }
  /**
   * Executes a callback within the given tracing context, ensuring any spans created
   * within the callback are parented to the correct context.
   * @param tracingContext - The context to activate during callback execution.
   * @param callback - The function to execute within the context.
   * @param callbackArgs - Arguments to pass to the callback.
   * @returns The return value of the callback.
   */
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>,
  >(
    tracingContext: TracingContext,
    callback: Callback,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return context.with(
      tracingContext,
      callback,
      /** Assume caller will bind `this` or use arrow functions */ undefined,
      ...callbackArgs,
    );
  }

  /**
   * Parses a W3C traceparent header string and returns a {@link TracingContext} containing
   * the extracted span context.
   * @param traceparentHeader - The traceparent header value to parse.
   * @returns A tracing context populated with the remote span context.
   */
  parseTraceparentHeader(traceparentHeader: string): TracingContext {
    return propagator.extract(
      context.active(),
      { traceparent: traceparentHeader },
      defaultTextMapGetter,
    );
  }

  /**
   * Creates W3C trace context propagation headers from the given tracing context.
   * @param tracingContext - The tracing context to propagate. Defaults to the active context.
   * @returns A record of header name-value pairs for trace context propagation.
   */
  createRequestHeaders(tracingContext?: TracingContext): Record<string, string> {
    const headers: Record<string, string> = {};
    propagator.inject(tracingContext || context.active(), headers, defaultTextMapSetter);
    return headers;
  }
}
