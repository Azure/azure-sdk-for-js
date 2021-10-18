// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Tracers and wrappers

// Shared interfaces
// export {
//   context,
//   Context,
//   ContextAPI,
//   Exception,
//   ExceptionWithCode,
//   ExceptionWithMessage,
//   ExceptionWithName,
//   getSpan,
//   getSpanContext,
//   getTracer,
//   HrTime,
//   isSpanContextValid,
//   Link,
//   OperationTracingOptions,
//   setSpan,
//   setSpanContext,
//   Span,
//   SpanAttributes,
//   SpanAttributeValue,
//   SpanContext,
//   SpanKind,
//   SpanOptions,
//   SpanStatus,
//   SpanStatusCode,
//   TimeInput,
//   TraceFlags,
//   Tracer,
//   TraceState
// } from "./interfaces";

// Utilities
// export {
//   extractSpanContextFromTraceParentHeader,
//   getTraceParentHeader
// } from "./utils/traceParentHeader";

export interface Tracer {
  startSpan(
    operationName: string,
    options: TracingSpanOptions
  ): { span: TracingSpan; tracingContext: unknown };
  withTrace<
    Callback extends (context: unknown, span: Omit<TracingSpan, "end">) => ReturnType<Callback>
  >(
    operationName: string,
    fn: Callback,
    options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>>;
  withContext<Callback extends (args: Parameters<Callback>) => ReturnType<Callback>>(
    callback: Callback,
    options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: Parameters<Callback>
  ): ReturnType<Callback>;
}

/* eslint-disable  */
export type SpanStatus =
  | {
      status: "success";
    }
  | {
      status: "error";
      error: Error | string;
    };

export interface TracingSpan {
  setStatus(status: SpanStatus): void;
  setAttribute(name: string, value: unknown): void;
  end(): void;
  unwrap(): unknown;
}

export interface TracingSpanOptions {
  context?: TracingContext;
}

export class NoOpTracer implements Tracer {
  startSpan(): { span: TracingSpan; tracingContext: unknown } {
    return {
      span: new NoOpSpan(),
      tracingContext: new TracingContextImpl(new Map<symbol, unknown>())
    };
  }
  withTrace<
    Callback extends (context: unknown, span: Omit<TracingSpan, "end">) => ReturnType<Callback>
  >(
    _operationName: string,
    fn: Callback,
    _options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    return Promise.resolve(
      fn.call(callbackThis, new TracingContextImpl(new Map<symbol, unknown>()), new NoOpSpan())
    );
    throw new Error("Method not implemented.");
  }
  withContext<Callback extends (args: Parameters<Callback>) => ReturnType<Callback>>(
    callback: Callback,
    _options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: Parameters<Callback>
  ): ReturnType<Callback> {
    return callback.apply(callbackThis, callbackArgs);
  }
}
export class NoOpSpan implements TracingSpan {
  setStatus(): void {}
  setAttribute(): void {}
  end(): void {}
  unwrap(): unknown {
    return undefined;
  }
}

export interface TracingContext {
  setValue(key: symbol, value: unknown): TracingContext;
  getValue(key: symbol): unknown;
  deleteValue(key: symbol): TracingContext;
}

// UNTESTED
export class TracingContextImpl implements TracingContext {
  private _contextMap: Map<symbol, unknown>;
  constructor(initialContext: Map<symbol, unknown>) {
    this._contextMap = new Map<symbol, unknown>(initialContext);
  }

  setValue(key: symbol, value: unknown): TracingContext {
    const newContextMap = new Map<symbol, unknown>(this._contextMap);
    newContextMap.set(key, value);
    return new TracingContextImpl(newContextMap);
  }

  getValue(key: symbol): unknown {
    return this._contextMap.get(key);
  }

  deleteValue(key: symbol): TracingContext {
    const newContextMap = new Map<symbol, unknown>(this._contextMap);
    newContextMap.delete(key);
    return new TracingContextImpl(newContextMap);
  }
}
