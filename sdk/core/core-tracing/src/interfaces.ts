// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanKind } from "@opentelemetry/api";

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
}

export type LinkContext = Pick<SpanContext, "traceId" | "spanId">;

export interface Link {
  /** The {@link LinkContext} of a linked span. */
  context: LinkContext;
}

/**
 * An interface that enables manual propagation of Spans
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
  attributes?: { [key: string]: unknown };

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
}
