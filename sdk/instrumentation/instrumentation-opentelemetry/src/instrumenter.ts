// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
  TracingSpanContext
} from "@azure/core-tracing";

import { SpanContext } from "@opentelemetry/api";
const VERSION = "00";
export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    _name: string,
    _spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    throw new Error("Method not implemented.");
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    _context: TracingContext,
    _callback: Callback,
    _callbackThis?: ThisParameterType<Callback>,
    ..._callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    throw new Error("Method not implemented.");
  }

  parseTraceparentHeader(traceparentHeader: string) {
    const parts = traceparentHeader.split("-");

    if (parts.length !== 4) {
      return;
    }

    const [version, traceId, spanId, traceOptions] = parts;

    if (version !== VERSION) {
      return;
    }

    const traceFlags = parseInt(traceOptions, 16);

    const spanContext: SpanContext = {
      spanId,
      traceId,
      traceFlags
    };

    return spanContext;
  }
  createRequestHeaders(_spanId: TracingSpanContext): Record<string, string> {
    throw new Error("Method not implemented.");
  }
}
