// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  context,
  Exception,
  getSpan,
  getSpanContext,
  setSpan,
  setSpanContext,
  SpanKind,
  SpanStatus,
  TimeInput,
  TraceState,
} from "@opentelemetry/api";

export {
  context,
  getSpan,
  getSpanContext,
  setSpan,
  setSpanContext,
  SpanKind,
  SpanStatus,
  TimeInput,
  TraceState,
  Exception
};
  
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
  context(): SpanContext;
  /**
   * Sets an attribute to the span.
   *
   * Sets a single Attribute with the key and value passed as arguments.
   *
   * @param key the key for this attribute.
   * @param value the value for this attribute. Setting a value null or
   *              undefined is invalid and will result in undefined behavior.
   */
  setAttribute(key: string, value: SpanAttributeValue): this;
  /**
   * Sets attributes to the span.
   *
   * @param attributes the attributes that will be added.
   *                   null or undefined attribute values
   *                   are invalid and will result in undefined behavior.
   */
  setAttributes(attributes: SpanAttributes): this;
  /**
   * Adds an event to the Span.
   *
   * @param name the name of the event.
   * @param [attributesOrStartTime] the attributes that will be added; these are
   *     associated with this event. Can be also a start time
   *     if type is {@type TimeInput} and 3rd param is undefined
   * @param [startTime] start time of the event.
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
   * @param status the SpanStatus to set.
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
   * @param [endTime] the time to set as Span's end time. If not provided,
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
   * @param exception the exception the only accepted values are string or Error
   * @param [time] the time to set as Span's event time. If not provided,
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
   * @param name the Span name.
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
 * Context for the linked span.
 */
export type LinkContext = {
  traceId: string;
  spanId: string;
};

/**
 * Used to specify a span that is linked to another.
 */
export interface Link {
  /** The {@link LinkContext} of a linked span. */
  context: LinkContext;

  /** A set of {@link SpanAttributes} on the link. */
  attributes?: SpanAttributes;
}

/**
 * Attributes for a Span.
 */
export interface SpanAttributes {
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
}

/**
 * Tracing options to set on an operation.
 */
export interface OperationTracingOptions {
  /**
   * OpenTelemetry SpanOptions used to create a span when tracing is enabled.
   */
  spanOptions?: SpanOptions;

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
   * @param key key which identifies a context value
   */
  getValue(key: symbol): unknown;
  /**
   * Create a new context which inherits from this context and has
   * the given key set to the given value.
   *
   * @param key context key for which to set the value
   * @param value value to set for the given key
   */
  setValue(key: symbol, value: unknown): Context;
  /**
   * Return a new context which inherits from this context but does
   * not contain a value for the given key.
   *
   * @param key context key for which to clear a value
   */
  deleteValue(key: symbol): Context;
}
