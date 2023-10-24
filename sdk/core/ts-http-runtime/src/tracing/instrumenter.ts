// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Instrumenter, InstrumenterSpanOptions, TracingContext, TracingSpan } from "./interfaces";
import { createTracingContext } from "./tracingContext";

export function createDefaultTracingSpan(): TracingSpan {
  return {
    end: () => {
      // noop
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
    createRequestHeaders: (): Record<string, string> => {
      return {};
    },
    parseTraceparentHeader: (): TracingContext | undefined => {
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
let instrumenterImplementation: Instrumenter | undefined;

/**
 * Extends the SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  instrumenterImplementation = instrumenter;
}

/**
 * Gets the currently set instrumenter, a No-Op instrumenter by default.
 *
 * @returns The currently set instrumenter
 */
export function getInstrumenter(): Instrumenter {
  if (!instrumenterImplementation) {
    instrumenterImplementation = createDefaultInstrumenter();
  }
  return instrumenterImplementation;
}
