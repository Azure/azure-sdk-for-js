// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { getTracer, setTracer } from "./tracerProxy";

// Tracers and wrappers
export { NoOpSpan } from "./tracers/noop/noOpSpan";
export { NoOpTracer } from "./tracers/noop/noOpTracer";
export { TestTracer, SpanGraph, SpanGraphNode } from "./tracers/test/testTracer";
export { TestSpan } from "./tracers/test/testSpan";
export { createSpanFunction, CreateSpanFunctionArgs } from "./createSpan";

// Shared interfaces
export {
  context,
  Context,
  ContextAPI,
  Exception,
  ExceptionWithCode,
  ExceptionWithMessage,
  ExceptionWithName,
  getSpan,
  getSpanContext,
  HrTime,
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
  TimeInput,
  TraceFlags,
  Tracer,
  TraceState
} from "./interfaces";

// Utilities
export {
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader
} from "./utils/traceParentHeader";
