// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
  TracingSpanContext,
} from "./interfaces";
import { createTracingContext } from "./tracingContext";

export function createDefaultTracingSpan(): TracingSpan {
  return {
    end: () => {
      // noop
    },
    spanContext() {
      return {
        spanId: "00000000-0000-0000-0000-000000000000",
        traceId: "00000000-0000-0000-0000-000000000000",
        traceFlags: 0x0,
      };
    },
    isRecording: () => false,
    recordException: () => {
      // noop
    },
    setAttribute: () => {
      // noop
    },
    setStatus: () => {
      // noop
    },
  };
}

export function createDefaultInstrumenter(): Instrumenter {
  return {
    createRequestHeaders: (_spanContext: TracingSpanContext): Record<string, string> => {
      return {};
    },
    parseTraceparentHeader: (_traceparentHeader: string): TracingSpanContext | undefined => {
      return undefined;
    },
    startSpan: (
      _name: string,
      spanOptions: InstrumenterSpanOptions
    ): { span: TracingSpan; tracingContext: TracingContext } => {
      return {
        span: createDefaultTracingSpan(),
        tracingContext: createTracingContext({ parentContext: spanOptions.tracingContext }),
      };
    },
    withContext<
      CallbackArgs extends unknown[],
      Callback extends (...args: CallbackArgs) => ReturnType<Callback>
    >(
      _context: TracingContext,
      callback: Callback,
      ...callbackArgs: CallbackArgs
    ): ReturnType<Callback> {
      return callback(...callbackArgs);
    },
  };
}

/** @internal */
let instrumenterImplementation: Instrumenter = createDefaultInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  instrumenterImplementation = instrumenter;
}

/**
 * Gets the currently set instrumenter, which is {@link NoOpInstrumenter} by default.
 *
 * @returns The currently set instrumenter
 */
export function getInstrumenter(): Instrumenter {
  return instrumenterImplementation;
}
