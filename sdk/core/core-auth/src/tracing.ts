// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// The interfaces in this file should be kept in sync with those
// found in the `@azure/core-tracing` package.

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
  attributes?: {
    [key: string]: unknown;
  };
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
