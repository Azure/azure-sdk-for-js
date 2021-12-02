// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
  TracingSpanContext,
  PackageInformation
} from "@azure/core-tracing";

import { trace, context } from "@opentelemetry/api";
import { OpenTelemetrySpanWrapper } from "./spanWrapper";

import {
  toTracestateHeader,
  toTraceparentHeader,
  toSpanOptions,
  fromTraceparentHeader
} from "./transformations";

export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    name: string,
    packageInformation: PackageInformation,
    spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    const span = trace
      .getTracer(packageInformation.name, packageInformation.version)
      .startSpan(name, toSpanOptions(spanOptions));

    const ctx = spanOptions?.tracingContext || context.active();

    return {
      span: new OpenTelemetrySpanWrapper(span),
      tracingContext: trace.setSpan(ctx, span)
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    tracingContext: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return context.with(tracingContext, callback, callbackThis, ...callbackArgs);
  }

  parseTraceparentHeader(traceparentHeader: string): TracingSpanContext | undefined {
    return fromTraceparentHeader(traceparentHeader);
  }

  createRequestHeaders(spanContext: TracingSpanContext): Record<string, string> {
    const headers: Record<string, string> = {};
    const traceparentHeader = toTraceparentHeader(spanContext);
    if (traceparentHeader) {
      headers["traceparent"] = traceparentHeader;

      // if tracestate is set, traceparent MUST be set, so only set tracestate after traceparent
      const tracestateHeader = toTracestateHeader(spanContext);
      if (tracestateHeader) {
        headers["tracestate"] = tracestateHeader;
      }
    }

    return headers;
  }
}
