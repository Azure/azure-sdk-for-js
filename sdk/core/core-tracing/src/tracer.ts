// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Tracer, TracingSpanOptions, TracingSpan, TracingContext } from "./interfaces";
import { createTracingContext } from "./tracingContext";

/** @internal */
export class NoOpTracer implements Tracer {
  startSpan(
    _name?: string,
    spanOptions?: TracingSpanOptions & { tracingContext?: TracingContext }
  ): { span: TracingSpan; tracingContext: TracingContext } {
    return {
      span: new NoOpSpan(),
      tracingContext: createTracingContext({ parentContext: spanOptions?.tracingContext })
    };
  }
  withTrace<
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
  serialize(): Record<string, string> {
    return {};
  }
}

/** @internal */
export let tracerImplementation: Tracer = new NoOpTracer();

export function useTracer(tracer: Tracer): void {
  tracerImplementation = tracer;
}
