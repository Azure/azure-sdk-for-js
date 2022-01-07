// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
  TracingSpanContext,
} from "@azure/core-tracing";

import { trace, context, propagation } from "@opentelemetry/api";
import { OpenTelemetrySpanWrapper } from "./spanWrapper";

import { toSpanOptions } from "./transformations";

export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    name: string,
    spanOptions: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    const span = trace
      .getTracer(spanOptions.packageName, spanOptions.packageVersion)
      .startSpan(name, toSpanOptions(spanOptions));

    const ctx = spanOptions?.tracingContext || context.active();

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

  parseTraceparentHeader(traceparentHeader: string): TracingSpanContext | undefined {
    const newContext = propagation.extract(context.active(), { traceparent: traceparentHeader });
    return trace.getSpanContext(newContext);
  }

  createRequestHeaders(tracingContext?: TracingContext): Record<string, string> {
    const headers: Record<string, string> = {};
    propagation.inject(tracingContext || context.active(), headers);

    return headers;
  }
}
