// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  TracingContext,
  TracingSpan,
} from "./interfaces.js";

import { createTracingContext } from "./tracingContext.js";
import { state } from "./state.js";

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
    addEvent: () => {
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
      spanOptions: InstrumenterSpanOptions,
    ): { span: TracingSpan; tracingContext: TracingContext } => {
      return {
        span: createDefaultTracingSpan(),
        tracingContext: createTracingContext({ parentContext: spanOptions.tracingContext }),
      };
    },
    withContext<
      CallbackArgs extends unknown[],
      Callback extends (...args: CallbackArgs) => ReturnType<Callback>,
    >(
      _context: TracingContext,
      callback: Callback,
      ...callbackArgs: CallbackArgs
    ): ReturnType<Callback> {
      return callback(...callbackArgs);
    },
  };
}

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  state.instrumenterImplementation = instrumenter;
}

/**
 * Gets the currently set instrumenter, a No-Op instrumenter by default.
 *
 * @returns The currently set instrumenter
 */
export function getInstrumenter(): Instrumenter {
  if (!state.instrumenterImplementation) {
    state.instrumenterImplementation = createDefaultInstrumenter();
  }
  return state.instrumenterImplementation;
}
