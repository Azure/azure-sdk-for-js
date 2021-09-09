// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { context as otContext, trace as otTrace } from "@opentelemetry/api";

/**
 * A Tracer.
 */
export interface Tracer {
  /**
   * Starts a new {@link Span}. Start the span without setting it on context.
   *
   * This method does NOT modify the current Context.
   *
   * @param name - The name of the span
   * @param options - SpanOptions used for span creation
   * @param context - Context to use to extract parent
   * @returns The newly created span
   * @example
   *     const span = tracer.startSpan('op');
   *     span.setAttribute('key', 'value');
   *     span.end();
   */
  startSpan(name: string, options?: SpanOptions, context?: Context): Span;
}

/**
 * TraceState.
 */
export interface TraceState {
  /**
   * Create a new TraceState which inherits from this TraceState and has the
   * given key set.
   * The new entry will always be added in the front of the list of states.
   *
   * @param key - key of the TraceState entry.
   * @param value - value of the TraceState entry.
   */
  set(key: string, value: string): TraceState;
  /**
   * Return a new TraceState which inherits from this TraceState but does not
   * contain the given key.
   *
   * @param key - the key for the TraceState entry to be removed.
   */
  unset(key: string): TraceState;
  /**
   * Returns the value to which the specified key is mapped, or `undefined` if
   * this map contains no mapping for the key.
   *
   * @param key - with which the specified value is to be associated.
   * @returns the value to which the specified key is mapped, or `undefined` if
   *     this map contains no mapping for the key.
   */
  get(key: string): string | undefined;
  /**
   * Serializes the TraceState to a `list` as defined below. The `list` is a
   * series of `list-members` separated by commas `,`, and a list-member is a
   * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
   * surrounding `list-members` are ignored. There can be a maximum of 32
   * `list-members` in a `list`.
   *
   * @returns the serialized string.
   */
  serialize(): string;
}

/**
 * Represents high resolution time.
 */
export declare type HrTime = [number, number];

/**
 * Used to represent a Time.
 */
export type TimeInput = HrTime | number | Date;

/**
 * The status for a span.
 */
export interface SpanStatus {
  /** The status code of this message. */
  code: SpanStatusCode;
  /** A developer-facing error message. */
  message?: string;
}

/**
 * The kind of span.
 */
export enum SpanKind {
  /** Default value. Indicates that the span is used internally. */
  INTERNAL = 0,
  /**
   * Indicates that the span covers server-side handling of an RPC or other
   * remote request.
   */
  SERVER = 1,
  /**
   * Indicates that the span covers the client-side wrapper around an RPC or
   * other remote request.
   */
  CLIENT = 2,
  /**
   * Indicates that the span describes producer sending a message to a
   * broker. Unlike client and server, there is no direct critical path latency
   * relationship between producer and consumer spans.
   */
  PRODUCER = 3,
  /**
   * Indicates that the span describes consumer receiving a message from a
   * broker. Unlike client and server, there is no direct critical path latency
   * relationship between producer and consumer spans.
   */
  CONSUMER = 4
}

/**
 * An Exception for a Span.
 */
export declare type Exception =
  | ExceptionWithCode
  | ExceptionWithMessage
  | ExceptionWithName
  | string;

/**
 * An Exception with a code.
 */
export interface ExceptionWithCode {
  /** The code. */
  code: string | number;
  /** The name. */
  name?: string;
  /** The message. */
  message?: string;
  /** The stack. */
  stack?: string;
}

/**
 * An Exception with a message.
 */
export interface ExceptionWithMessage {
  /** The code. */
  code?: string | number;
  /** The message. */
  message: string;
  /** The name. */
  name?: string;
  /** The stack. */
  stack?: string;
}

/**
 * An Exception with a name.
 */
export interface ExceptionWithName {
  /** The code. */
  code?: string | number;
  /** The message. */
  message?: string;
  /** The name. */
  name: string;
  /** The stack. */
  stack?: string;
}

/**
 * Return the span if one exists
 *
 * @param context - context to get span from
 */
export function getSpan(context: Context): Span | undefined {
  return otTrace.getSpan(context);
}

/**
 * Set the span on a context
 *
 * @param context - context to use as parent
 * @param span - span to set active
 */
export function setSpan(context: Context, span: Span): Context {
  return otTrace.setSpan(context, span);
}

/**
 * Wrap span context in a NoopSpan and set as span in a new
 * context
 *
 * @param context - context to set active span on
 * @param spanContext - span context to be wrapped
 */
export function setSpanContext(context: Context, spanContext: SpanContext): Context {
  return otTrace.setSpanContext(context, spanContext);
}

/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
export function getSpanContext(context: Context): SpanContext | undefined {
  return otTrace.getSpanContext(context);
}

/**
 * Singleton object which represents the entry point to the OpenTelemetry Context API
 */
export interface ContextAPI {
  /**
   * Get the currently active context
   */
  active(): Context;
}

/**
 * Returns true of the given {@link SpanContext} is valid.
 * A valid {@link SpanContext} is one which has a valid trace ID and span ID as per the spec.
 *
 * @param context - the {@link SpanContext} to validate.
 *
 * @returns true if the {@link SpanContext} is valid, false otherwise.
 */
export function isSpanContextValid(context: SpanContext): boolean {
  return otTrace.isSpanContextValid(context);
}

/**
 * Retrieves a tracer from the global tracer provider.
 */
export function getTracer(): Tracer;
/**
 * Retrieves a tracer from the global tracer provider.
 */
export function getTracer(name: string, version?: string): Tracer;
export function getTracer(name?: string, version?: string): Tracer {
  return otTrace.getTracer(name || "azure/core-tracing", version);
}

/** Entrypoint for context API */
export const context: ContextAPI = otContext;

/** SpanStatusCode */
export enum SpanStatusCode {
  /**
   * The default status.
   */
  UNSET = 0,
  /**
   * The operation has been validated by an Application developer or
   * Operator to have completed successfully.
   */
  OK = 1,
  /**
   * The operation contains an error.
   */
  ERROR = 2
}

/**
 * An interface that represents a span. A span represents a single operation
 * within a trace. Examples of span might include remote procedure calls or a
 * in-process function calls to sub-components. A Trace has a single, top-level
 * "root" Span that in turn may have zero or more child Spans, which in turn
 * may have children.
 *
 * Spans are created by the {@link Tracer.startSpan} method.
 */
export interface Span {
  /**
   * Returns the {@link SpanContext} object associated with this Span.
   *
   * Get an immutable, serializable identifier for this span that can be used
   * to create new child spans. Returned SpanContext is usable even after the
   * span ends.
   *
   * @returns the SpanContext object associated with this Span.
   */
  spanContext(): SpanContext;
  /**
   * Sets an attribute to the span.
   *
   * Sets a single Attribute with the key and value passed as arguments.
   *
   * @param key - the key for this attribute.
   * @param value - the value for this attribute. Setting a value null or
   *              undefined is invalid and will result in undefined behavior.
   */
  setAttribute(key: string, value: SpanAttributeValue): this;
  /**
   * Sets attributes to the span.
   *
   * @param attributes - the attributes that will be added.
   *                   null or undefined attribute values
   *                   are invalid and will result in undefined behavior.
   */
  setAttributes(attributes: SpanAttributes): this;
  /**
   * Adds an event to the Span.
   *
   * @param name - the name of the event.
   * @param attributesOrStartTime -  the attributes that will be added; these are
   *     associated with this event. Can be also a start time
   *     if type is TimeInput and 3rd param is undefined
   * @param startTime - start time of the event.
   */
  addEvent(
    name: string,
    attributesOrStartTime?: SpanAttributes | TimeInput,
    startTime?: TimeInput
  ): this;
  /**
   * Sets a status to the span. If used, this will override the default Span
   * status. Default is {@link SpanStatusCode.UNSET}. SetStatus overrides the value
   * of previous calls to SetStatus on the Span.
   *
   * @param status - the SpanStatus to set.
   */
  setStatus(status: SpanStatus): this;
  /**
   * Marks the end of Span execution.
   *
   * Call to End of a Span MUST not have any effects on child spans. Those may
   * still be running and can be ended later.
   *
   * Do not return `this`. The Span generally should not be used after it
   * is ended so chaining is not desired in this context.
   *
   * @param endTime - the time to set as Span's end time. If not provided,
   *     use the current time as the span's end time.
   */
  end(endTime?: TimeInput): void;
  /**
   * Returns the flag whether this span will be recorded.
   *
   * @returns true if this Span is active and recording information like events
   *     with the `AddEvent` operation and attributes using `setAttributes`.
   */
  isRecording(): boolean;

  /**
   * Sets exception as a span event
   * @param exception - the exception the only accepted values are string or Error
   * @param time - the time to set as Span's event time. If not provided,
   *     use the current time.
   */
  recordException(exception: Exception, time?: TimeInput): void;

  /**
   * Updates the Span name.
   *
   * This will override the name provided via {@link Tracer.startSpan}.
   *
   * Upon this update, any sampling behavior based on Span name will depend on
   * the implementation.
   *
   * @param name - the Span name.
   */
  updateName(name: string): this;
}

/**
 * Shorthand enum for common traceFlags values inside SpanContext
 */
export const enum TraceFlags {
  /** No flag set. */
  NONE = 0x0,
  /** Caller is collecting trace information. */
  SAMPLED = 0x1
}

/**
 * A light interface that tries to be structurally compatible with OpenTelemetry
 */
export interface SpanContext {
  /**
   * UUID of a trace.
   */
  traceId: string;
  /**
   * UUID of a Span.
   */
  spanId: string;
  /**
   * https://www.w3.org/TR/trace-context/#trace-flags
   */
  traceFlags: number;
  /**
   * Tracing-system-specific info to propagate.
   *
   * The tracestate field value is a `list` as defined below. The `list` is a
   * series of `list-members` separated by commas `,`, and a list-member is a
   * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
   * surrounding `list-members` are ignored. There can be a maximum of 32
   * `list-members` in a `list`.
   * More Info: https://www.w3.org/TR/trace-context/#tracestate-field
   *
   * Examples:
   *     Single tracing system (generic format):
   *         tracestate: rojo=00f067aa0ba902b7
   *     Multiple tracing systems (with different formatting):
   *         tracestate: rojo=00f067aa0ba902b7,congo=t61rcWkgMzE
   */
  traceState?: TraceState;
}

/**
 * Used to specify a span that is linked to another.
 */
export interface Link {
  /** The {@link SpanContext} of a linked span. */
  context: SpanContext;

  /** A set of {@link SpanAttributes} on the link. */
  attributes?: SpanAttributes;
}

/**
 * Attributes for a Span.
 */
export interface SpanAttributes {
  /**
   * Attributes for a Span.
   */
  [attributeKey: string]: SpanAttributeValue | undefined;
}
/**
 * Attribute values may be any non-nullish primitive value except an object.
 *
 * null or undefined attribute values are invalid and will result in undefined behavior.
 */
export declare type SpanAttributeValue =
  | string
  | number
  | boolean
  | Array<null | undefined | string>
  | Array<null | undefined | number>
  | Array<null | undefined | boolean>;

/**
 * An interface that enables manual propagation of Spans
 */
export interface SpanOptions {
  /**
   * Attributes to set on the Span
   */
  attributes?: SpanAttributes;

  /** {@link Link}s span to other spans */
  links?: Link[];

  /**
   * The type of Span. Default to SpanKind.INTERNAL
   */
  kind?: SpanKind;

  /**
   * A manually specified start time for the created `Span` object.
   */
  startTime?: TimeInput;
}

/**
 * Tracing options to set on an operation.
 */
export interface OperationTracingOptions {
  /**
   * OpenTelemetry context to use for created Spans.
   */
  tracingContext?: Context;
}

/**
 * OpenTelemetry compatible interface for Context
 */
export interface Context {
  /**
   * Get a value from the context.
   *
   * @param key - key which identifies a context value
   */
  getValue(key: symbol): unknown;
  /**
   * Create a new context which inherits from this context and has
   * the given key set to the given value.
   *
   * @param key - context key for which to set the value
   * @param value - value to set for the given key
   */
  setValue(key: symbol, value: unknown): Context;
  /**
   * Return a new context which inherits from this context but does
   * not contain a value for the given key.
   *
   * @param key - context key for which to clear a value
   */
  deleteValue(key: symbol): Context;
}
