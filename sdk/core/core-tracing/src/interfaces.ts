// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  ): { span: TracingSpan; tracingContext: TracingContext; updatedOptions: Options };
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback>;
}

export interface TracingClientOptions {
  namespace: string;
  tracer?: Tracer;
}

export interface CreateTracingContextOptions {
  span?: TracingSpan;
  client?: TracingClient;
  providerContext?: TracingContext;
  namespace?: string;
}

export interface TracerCreateSpanOptions {
  tracingContext?: TracingContext;
}
export interface Tracer {
  startSpan(
    name: string,
    options?: TracerCreateSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext };
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback>;
}

export type SpanStatus =
  | {
      status: "success";
    }
  | {
      status: "error";
      error: Error | string;
    }
  | {
      // backwards compatibility and ignored
      // Todo: is this needed?
      code: 0 | 1 | 2;
      message?: string;
      status?: "otel";
    };

export interface TracingSpan {
  setStatus(status: SpanStatus): void;
  setAttribute(name: string, value: unknown): void;
  end(): void;
  /** Serializes a span to a set of headers */
  serialize(): Record<string, string>;
  // TODO: deserialize
  // deserialize(traceParentHeader: string): TracingSpan;
}
export interface TracingContext {
  setValue(key: symbol, value: unknown): TracingContext;
  getValue(key: symbol): unknown;
  deleteValue(key: symbol): TracingContext;
}

export interface OperationTracingOptions {
  tracingContext?: TracingContext;
}
