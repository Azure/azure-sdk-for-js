// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a client that can integrate with the currently configured {@link Instrumenter}.
 *
 * Create an instance using {@link createTracingClient}.
 */
export interface TracingClient {
  /**
   * Wraps a callback in a tracing span, calls the callback, and closes the span.
   *
   * This is the primary interface for using Tracing and will handle error recording as well as setting the status on the span.
   *
   * Example:
   *
   * ```ts
   * const myOperationResult = await withSpan("myClassName.myOperationName", (updatedOptions) => myOperation(updatedOptions), options);
   * ```
   * @param name - The name of the span. By convention this should be `${className}.${methodName}`.
   * @param callback - The callback to be invoked with the updated options and newly created {@link TracingSpan}.
   * @param operationOptions - The original options passed to the method. The callback will receive these options with the newly created {@link TracingContext}.
   * @param callbackThis - An optional `this` parameter to bind the callback to.
   */
  withSpan<
    Options extends { tracingOptions?: OperationTracingOptions },
    Callback extends (
      updatedOptions: Options,
      span: Omit<TracingSpan, "end">
    ) => ReturnType<Callback>
  >(
    name: string,
    callback: Callback,
    operationOptions?: Options,
    spanOptions?: TracingSpanOptions,
    callbackThis?: ThisParameterType<Callback>
  ): Promise<ReturnType<Callback>>;
  /**
   * Start a given span but does not set it as the active span.
   *
   * You must end the span using {@link TracingSpan.end}.
   *
   * Most of the time you will want to use {@link withSpan} instead.
   *
   * @param name - The name of the span. By convention this should be `${className}.${methodName}`.
   * @param operationOptions - The original operation options.
   * @param spanOptions - The options to use when creating the span.
   *
   * @returns A {@link TracingSpan} that can be used to end the span, the newly updated tracingContext, and the updated operation options.
   */
  startSpan<Options extends { tracingOptions?: OperationTracingOptions }>(
    name: string,
    operationOptions?: Options,
    spanOptions?: TracingSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext; updatedOptions: Options };
  /**
   * Wraps a callback with an active context and calls the callback.
   * Depending on the implementation, this may set the globally available active context.
   *
   * Useful when you want to leave the boundaries of the SDK (make a request or callback to user code) and are unable to use the {@link withSpan} interface.
   *
   * @param context - The {@link TracingContext} to use as the active context in the scope of the callback.
   * @param callback - The callback to be invoked with the given context set as the globally active context.
   * @param callbackThis - An optional `this` parameter to bind the callback to.
   * @param callbackArgs - The callback arguments.
   */
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback>;

  /**
   * Parses a traceparent header value into a span identifier.
   *
   * @param traceparentHeader - The traceparent header to parse.
   * @returns An implementation-specific identifier for the span.
   */
  parseTraceparentHeader(traceparentHeader: string): TracingSpanIdentifier | undefined;

  /**
   * Creates a set of request headers to propagate tracing information to a backend.
   *
   * @param spanId - The span identifier to serialize.
   * @returns The set of headers to add to a request.
   */
  createRequestHeaders(spanId: TracingSpanIdentifier): Record<string, string>;
}

/**
 * Options that can be passed to {@link createTracingClient}.
 */
export interface TracingClientOptions {
  /** The value of the az.namespace tracing attribute on any given spans */
  namespace: string;
  /** Information about the package invoking this trace. Defaults to \@azure/core-tracing if omitted */
  packageInformation?: {
    /** The name of the package. */
    name: string;
    /** An optional package version. */
    version?: string;
  };
}

/**
 * Represents a set of items that can be set when creating a new {@link TracingContext}.
 */
export interface CreateTracingContextOptions {
  /** The {@link parentContext} - the newly created context will contain all the values of the parent context unless overriden. */
  parentContext?: TracingContext;
  /** The span to set on the context. */
  span?: TracingSpan;
  /** The tracing client used to create this context. */
  client?: TracingClient;
  /** The namespace to set on any child spans. */
  namespace?: string;
}

/** The kind of span. */
export type TracingSpanKind = "client" | "server" | "producer" | "consumer" | "internal";

/** Options used to configure the newly created span. */
export interface TracingSpanOptions {
  /** The kind of span. Implementations should default this to "client". */
  spanKind?: TracingSpanKind;
  /** A collection of span identifiers to link to this span. */
  spanLinks?: TracingSpanIdentifier[];
  /** Initial attributes to set on a span. */
  spanAttributes?: { [key: string]: unknown };
}

/**
 * A unique, serializable identifier for a span.
 */
export interface TracingSpanIdentifier {
  /** The span UUID within the trace. */
  spanId: string;
  /** The trace UUID. */
  traceId: string;
  /**
   * https://www.w3.org/TR/trace-context/#trace-flags
   */
  traceFlags: number;
  /**
   * An implementation-specific value representing system-specific trace info to serialize.
   */
  traceState?: unknown;
}

/**
 * Represents an implementation agnostic instrumenter.
 */
export interface Instrumenter {
  /**
   * Creates a new {@link TracingSpan} with the given name and options and sets it on a new context.
   * @param name - The name of the span. By convention this should be `${className}.${methodName}`.
   * @param spanOptions - The options to use when creating the span.
   *
   * @returns A {@link TracingSpan} that can be used to end the span, and the context this span has been set on.
   */
  startSpan(
    name: string,
    spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext };
  /**
   * Wraps a callback with an active context and calls the callback.
   * Depending on the implementation, this may set the globally available active context.
   *
   * @param context - The {@link TracingContext} to use as the active context in the scope of the callback.
   * @param callback - The callback to be invoked with the given context set as the globally active context.
   * @param callbackThis - An optional `this` parameter to bind the callback to.
   * @param callbackArgs - The callback arguments.
   */
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback>;

  /**
   * Provides an implementation-specific method to parse a {@link https://www.w3.org/TR/trace-context/#traceparent-header}
   * into a {@link TracingSpanIdentifier} which can be used to link non-parented spans together.
   */
  parseTraceparentHeader(traceparentHeader: string): TracingSpanIdentifier | undefined;
  /**
   * Provides an implementation-specific method to serialize a {@link TracingSpan} to a set of headers.
   * @param span - The span to serialize.
   */
  createRequestHeaders(spanId: TracingSpanIdentifier): Record<string, string>;
}

/**
 * Options passed to {@link Instrumenter.startSpan} as a superset of {@link TracingSpanOptions}.
 */
export interface InstrumenterSpanOptions extends TracingSpanOptions {
  /** The current tracing context. Defaults to an implementation-specific "active" context. */
  tracingContext?: TracingContext;
  /** Information about the package invoking this trace. Defaults to \@azure/core-tracing if omitted */
  packageInformation?: {
    /** The name of the package. */
    name: string;
    /** An optional package version. */
    version?: string;
  };
}

/**
 * Represents the statuses that can be passed to {@link TracingSpan.setStatus}.
 *
 * Discriminated by the status field - note that only "success" and "error" are valid statuses.
 * The "otel" status is here for backwards compatibility only.
 */
export type SpanStatus =
  | {
      status: "success";
    }
  | {
      status: "error";
      error: Error | string;
    };

/**
 * Represents an implementation agnostic tracing span.
 */
export interface TracingSpan {
  /**
   * Sets the status of the span.
   *
   * @param status - The status to set on the span.
   */
  setStatus(status: SpanStatus): void;
  /**
   * Sets a given attribute on a span.
   *
   * @param name - The attribute's name.
   * @param value - The attribute's value to set. May be any non-nullish value.
   */
  setAttribute(name: string, value: unknown): void;
  /**
   * Ends the span.
   */
  end(): void;

  /**
   * Returns true if this {@link TracingSpan} is recording information.
   *
   * Depending on the span implementation, this may return false if the span is not being sampled.
   */
  isRecording(): boolean;

  /** A set of implementation-specific key-value pairs that can uniquely identify a given span. */
  readonly tracingSpanId: TracingSpanIdentifier;
}

/** An immutable context bag of tracing values for the current operation. */
export interface TracingContext {
  /**
   * Sets a given object on a context.
   * @param key - The key of the given context value.
   * @param value - The value to set on the context.
   *
   * @returns - A new context with the given value set.
   */
  setValue(key: symbol, value: unknown): TracingContext;
  /**
   * Gets an object from the context if it exists.
   * @param key - The key of the given context value.
   *
   * @returns - The value of the given context value if it exists, otherwise `undefined`.
   */
  getValue(key: symbol): unknown;
  /**
   * Deletes an object from the context if it exists.
   * @param key - The key of the given context value to delete.
   */
  deleteValue(key: symbol): TracingContext;
}

/**
 * Tracing options to set on an operation.
 */
export interface OperationTracingOptions {
  /** The context to use for created Tracing Spans. */
  tracingContext?: TracingContext;
}
