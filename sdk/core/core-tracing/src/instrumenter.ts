// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
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
let instrumenterImplementation: Instrumenter = new NoOpInstrumenter();

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
