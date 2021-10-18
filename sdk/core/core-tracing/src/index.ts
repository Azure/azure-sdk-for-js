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

export const knownContextKeys = {
  Span: Symbol.for("@azure/core-tracing span"),
  Namespace: Symbol.for("@azure/core-tracing namespace")
};
export interface Tracer {
  startSpan(
    name: string,
    options: TracingSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext };
  withTrace<
    Callback extends (
      context: TracingContext,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    callback: Callback,
    options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>>;
  withContext<Callback extends (...args: unknown[]) => ReturnType<Callback>>(
    callback: Callback,
    options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: unknown[]
  ): ReturnType<Callback>;
}

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
  startSpan(): { span: TracingSpan; tracingContext: TracingContext } {
    return {
      span: new NoOpSpan(),
      tracingContext: new TracingContextImpl(new Map<symbol, unknown>())
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

// Using an object here allows us to hot-swap the implementation of the tracer
export let tracerImplementation: Tracer = new NoOpTracer();

export function useTracer(tracer: Tracer): void {
  tracerImplementation = tracer;
}

export interface TracingClient extends Tracer {}

export interface TracingClientOptions {
  namespace: string;
  tracer?: Tracer;
}

export class TracingClientImpl implements TracingClient {
  private _namespace: string;
  private _tracer: Tracer;

  constructor(options: TracingClientOptions) {
    this._namespace = options.namespace;
    this._tracer = options.tracer || tracerImplementation;
  }
  startSpan(
    name: string,
    options: TracingSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    let { span, tracingContext } = this._tracer.startSpan(name, options);
    tracingContext = tracingContext.setValue(knownContextKeys.Namespace, this._namespace);
    span.setAttribute("az.namespace", this._namespace);
    return { span, tracingContext };
  }
  withTrace<
    Callback extends (
      context: TracingContext,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    fn: Callback,
    options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    return this._tracer.withTrace(
      name,
      (context: TracingContext, span: Omit<TracingSpan, "end">) => {
        context = context.setValue(knownContextKeys.Namespace, this._namespace);
        span.setAttribute("az.namespace", this._namespace);
        return fn.call(callbackThis, context, span);
      },
      options,
      callbackThis
    );
  }
  withContext<Callback extends (...args: unknown[]) => ReturnType<Callback>>(
    callback: Callback,
    options: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: unknown[]
  ): ReturnType<Callback> {
    return this._tracer.withContext(callback, options, callbackThis, ...callbackArgs);
  }
}

export function createTracingClient(options: TracingClientOptions): TracingClient {
  return new TracingClientImpl(options);
}

export function createTracingContext(baseContext?: TracingContext): TracingContext {
  return new TracingContextImpl(new Map<symbol, unknown>());
}
