// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// The interfaces in this file should be kept in sync with those
// found in the `@azure/core-tracing` package.

// NOTE: these were taken directly from the @opentelemetry/api package as of v0.16

/**
 * Attributes for a span.
 */
export interface Attributes {
  [attributeKey: string]: AttributeValue | undefined;
}
/**
 * Attribute values may be any non-nullish primitive value except an object.
 *
 * null or undefined attribute values are invalid and will result in undefined behavior.
 */
export declare type AttributeValue =
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
   * The SpanContext that refers to a parent span, if any.
   * A null value indicates that this should be a new root span,
   * rather than potentially detecting a span via a context manager.
   */
  parent?: SpanContext | null;
  /**
   * Attributes to set on the Span
   */
  attributes?: Attributes;
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
