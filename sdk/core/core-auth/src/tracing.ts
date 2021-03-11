// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// The interfaces in this file should be kept in sync with those
// found in the `@azure/core-tracing` package.

/**
 * Attributes for a Span.
 */
export interface SpanAttributes {
  /**
   * Span attributes.
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
 * An interface that enables manual propagation of Spans.
 */
export interface SpanOptions {
  /**
   * Attributes to set on the Span
   */
  attributes?: SpanAttributes;
}

/**
 * A light interface that tries to be structurally compatible with OpenTelemetry.
 */
export declare interface SpanContext {
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
}

/**
 * An interface structurally compatible with OpenTelemetry.
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
