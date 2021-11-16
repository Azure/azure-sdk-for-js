// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  TracingSpanOptions,
  TracingSpan,
  TracingContext,
  TracingSpanContext,
  InstrumenterSpanOptions
} from "./interfaces";
import { createTracingContext } from "./tracingContext";

/** @internal */
export class NoOpInstrumenter implements Instrumenter {
  startSpan(
    _name?: string,
    spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    return {
      span: new NoOpSpan(),
      tracingContext: createTracingContext({ parentContext: spanOptions?.tracingContext })
    };
  }
  withSpan<
    Callback extends (
      context: TracingContext,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    _name: string,
    fn: Callback,
    _options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    const { span, tracingContext } = this.startSpan();
    return Promise.resolve(fn.call(callbackThis, tracingContext, span));
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    _context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return callback.apply(callbackThis, callbackArgs);
  }
  parseTraceparentHeader(_traceparentHeader: string): TracingSpanContext | undefined {
    return undefined;
  }
  createRequestHeaders(_spanContext: TracingSpanContext): Record<string, string> {
    return {};
  }
}

/** @internal */
export class NoOpSpan implements TracingSpan {
  setStatus(): void {
    // noop
  }
  setAttribute(): void {
    // noop
  }
  end(): void {
    // noop
  }
  get spanContext(): TracingSpanContext {
    return {
      spanId: "00000000-0000-0000-0000-000000000000",
      traceId: "00000000-0000-0000-0000-000000000000",
      traceFlags: 0x0
    };
  }
  isRecording(): boolean {
    return false;
  }
  recordException(): void {
    // noop
  }
}

/** @internal */
export let instrumenterImplementation: Instrumenter = new NoOpInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 *
 * Example:
 *
 * ```ts
 * import { openTelemetryInstrumenter } from "@azure/core-tracing-opentelemetry";
 * import { MyClient } from "@azure/package-name"
 * useInstrumenter(openTelemetryInstrumenter);
 *
 * const client = new MyClient(); // uses the OpenTelemetry instrumenter
 * ```
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  instrumenterImplementation = instrumenter;
}
