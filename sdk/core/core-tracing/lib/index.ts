// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export { getTracer, setTracer } from "./tracerProxy";

// Tracers and wrappers
export { NoOpSpan } from "./tracers/noop/noOpSpan";
export { NoOpTracer } from "./tracers/noop/noOpTracer";
export { OpenCensusSpanWrapper } from "./tracers/opencensus/openCensusSpanWrapper";
export { OpenCensusTracerWrapper } from "./tracers/opencensus/openCensusTracerWrapper";
export { TestTracer, SpanGraph, SpanGraphNode } from "./tracers/test/testTracer";
export { TestSpan } from "./tracers/test/testSpan";

// Interfaces
export {
  Attributes,
  BinaryFormat,
  Event,
  HttpTextFormat,
  Link,
  Sampler,
  SpanContext,
  SpanKind,
  Span,
  SpanOptions,
  HrTime,
  TimeInput,
  Status,
  CanonicalCode,
  TimedEvent,
  TraceFlags,
  TraceState,
  Tracer
} from "@opentelemetry/types";

// Utilities
export {
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader
} from "./utils/traceParentHeader";

// OpenCensus Interfaces
export { Tracer as OpenCensusTracer, Span as OpenCensusSpan } from "@opencensus/web-types";
