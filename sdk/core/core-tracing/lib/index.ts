
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
export { Attributes } from "./interfaces/attributes";
export { BinaryFormat } from "./interfaces/BinaryFormat";
export { Event } from "./interfaces/Event";
export { HttpTextFormat } from "./interfaces/HttpTextFormat";
export { Link } from "./interfaces/link";
export { Sampler } from "./interfaces/Sampler";
export { SpanContext } from "./interfaces/span_context";
export { SpanKind } from "./interfaces/span_kind";
export { Span } from "./interfaces/span";
export { SpanOptions } from "./interfaces/SpanOptions";
export { HrTime, TimeInput } from "./interfaces/Time";
export { Status, CanonicalCode } from "./interfaces/status";
export { TimedEvent } from "./interfaces/TimedEvent";
export { TraceFlags } from "./interfaces/trace_flags";
export { TraceState } from "./interfaces/trace_state";
export { Tracer } from "./interfaces/tracer";

// Utilities
export {
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader
} from "./utils/traceParentHeader";

// OpenCensus Interfaces
export {
  Tracer as OpenCensusTracer,
  Span as OpenCensusSpan,
} from "@opencensus/web-types";
