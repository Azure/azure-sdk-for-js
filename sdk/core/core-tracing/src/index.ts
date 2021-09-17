// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Tracers and wrappers
export { createSpanFunction, CreateSpanFunctionArgs } from "./createSpan";

// Shared interfaces
export {
  context,
  Context,
  ContextAPI,
  getTracer,
  isSpanContextValid,
  Link,
  OperationTracingOptions,
  Span,
  SpanAttributes,
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
