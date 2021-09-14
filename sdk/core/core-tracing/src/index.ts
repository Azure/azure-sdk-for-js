// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Tracers and wrappers
export { createSpanFunction, CreateSpanFunctionArgs } from "./createSpan";

// Shared interfaces
export {
  context,
  Context,
  ContextAPI,
  getSpan,
  getSpanContext,
  getTracer,
  isSpanContextValid,
  Link,
  OperationTracingOptions,
  setSpan,
  setSpanContext,
  Span,
  SpanAttributes,
  SpanAttributeValue,
  SpanContext,
  SpanKind,
  SpanOptions,
  SpanStatus,
  SpanStatusCode,
  TraceFlags,
  Tracer,
  TraceState
} from "./interfaces";

// Utilities
export {
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader
} from "./utils/traceParentHeader";
