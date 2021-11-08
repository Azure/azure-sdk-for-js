// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Tracer,
  TracingSpanOptions,
  TracingSpan,
  TracingContext,
  TracingSpanIdentifier
} from "./interfaces";
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
  parseTraceparentHeader(_traceparentHeader: string): TracingSpanIdentifier | undefined {
    return undefined;
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
  toRequestHeaders(): Record<string, string> {
    return {};
  }
  get tracingSpanId(): TracingSpanIdentifier {
    return {};
  }
  isRecording(): boolean {
    return false;
  }
}

/** @internal */
// TODO: we should probably have it on the global object.
export let tracerImplementation: Tracer = new NoOpTracer();

/**
 * Extends the Azure SDK with support for a given tracer implementation.
 *
 * @param tracer - The tracer implementation to use.
 *
 * Example:
 *
 * ```ts
 * import { openTelemetryTracer } from "@azure/core-tracing-opentelemetry";
 * import { MyClient } from "@azure/package-name"
 * useTracer(openTelemetryTracer);
 *
 * const client = new MyClient(); // uses the OpenTelemetry tracer
 * ```
 */
export function useTracer(tracer: Tracer): void {
  tracerImplementation = tracer;
}

/**
 * Parses a traceparent header value into a span identifier.
 *
 * @param traceparentHeader - The traceparent header to parse.
 * @returns An implementation-specific identifier for the span.
 */
export function fromTraceparentHeader(
  traceparentHeader: string
): TracingSpanIdentifier | undefined {
  return tracerImplementation.parseTraceparentHeader(traceparentHeader);
}
