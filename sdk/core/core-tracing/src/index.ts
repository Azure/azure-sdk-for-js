// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingSpan,
  Tracer,
  tracerImplementation,
  TracingContext,
  TracingContextImpl
} from "./tracer";

export interface OperationTracingOptions {
  context?: TracingContext;
}

// import { OperationTracingOptions } from "./interfaces";

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
export * from "./tracer";

export const knownContextKeys = {
  Span: Symbol.for("@azure/core-tracing span"),
  Namespace: Symbol.for("@azure/core-tracing namespace"),
  Client: Symbol.for("@azure/core-tracing client"),
  ProviderContext: Symbol.for("@azure/core-tracing provider context")
};
export interface TracingClient {
  withTrace<
    Options extends { tracingOptions?: OperationTracingOptions },
    Callback extends (
      updatedOptions: Options,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    fn: Callback,
    options?: Options,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>>;
  startSpan<Options extends { tracingOptions?: OperationTracingOptions }>(
    name: string,
    options?: Options
  ): { span: TracingSpan; updatedOptions: Options };
  withContext<Callback extends (...args: unknown[]) => ReturnType<Callback>>(
    callback: Callback,
    options: OperationTracingOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: unknown[]
  ): ReturnType<Callback>;
}

export interface TracingClientOptions {
  namespace: string;
  tracer?: Tracer;
}

export class TracingClientImpl implements TracingClient {
  private _namespace: string;
  private _tracer: Tracer;
  // make this optional and then check...
  constructor(options?: TracingClientOptions) {
    this._namespace = options?.namespace || "";
    this._tracer = options?.tracer || tracerImplementation;
  }
  startSpan<Options extends { tracingOptions?: OperationTracingOptions }>(
    name: string,
    options?: Options
  ): { span: TracingSpan; updatedOptions: Options } {
    let { span, tracingContext } = this._tracer.startSpan(name, {
      context: options?.tracingOptions?.context
    });
    tracingContext = tracingContext.setValue(knownContextKeys.Namespace, this._namespace);
    span.setAttribute("az.namespace", this._namespace);
    return {
      span,
      updatedOptions: {
        tracingOptions: {
          context: tracingContext
        }
      } as Options
    };
  }
  async withTrace<
    Options extends { tracingOptions?: { context?: TracingContext } },
    Callback extends (
      updatedOptions: Options,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    fn: Callback,
    options?: Options,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>> {
    let { span, updatedOptions } = this.startSpan(name, options);
    try {
      span.setStatus({ status: "success" });
      return await Promise.resolve(fn.call(callbackThis, updatedOptions, span));
    } catch (err) {
      span.setStatus({ status: "error", error: err });
      throw err;
    } finally {
      span.end();
    }
  }
  withContext<Callback extends (args: Parameters<Callback>) => ReturnType<Callback>>(
    callback: Callback,
    options: OperationTracingOptions,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: Parameters<Callback>
  ): ReturnType<Callback> {
    return this._tracer.withContext(callback, options, callbackThis, ...callbackArgs);
  }
}

export function createTracingClient(options?: TracingClientOptions): TracingClient {
  return new TracingClientImpl(options);
}

export interface CreateTracingContextOptions {
  span?: TracingSpan;
  client?: TracingClient;
  providerContext?: TracingContext;
  namespace?: string;
}
export function createTracingContext(options: CreateTracingContextOptions = {}): TracingContext {
  // TODO: untested
  if (options.providerContext) {
    let newContext = options.providerContext;
    newContext = newContext.setValue(knownContextKeys.ProviderContext, options.providerContext);
    if (options?.span) {
      newContext = newContext.setValue(knownContextKeys.Span, options.span);
    }

    if (options?.client) {
      newContext = newContext.setValue(knownContextKeys.Client, options.client);
    }

    if (options?.namespace) {
      newContext = newContext.setValue(knownContextKeys.Namespace, options.namespace);
    }
    return newContext;
  }

  const newContextMap = new Map<symbol, unknown>();
  if (options?.span) {
    newContextMap.set(knownContextKeys.Span, options.span);
  }

  if (options?.client) {
    newContextMap.set(knownContextKeys.Client, options.client);
  }

  if (options?.namespace) {
    newContextMap.set(knownContextKeys.Namespace, options.namespace);
  }

  return new TracingContextImpl(newContextMap);
}
