
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getTracer, setTracer, ITracerProxy } from "./tracerProxy";
/**
 * A global registry for the active OpenTelemtry Tracer.
 * Clients inside the Azure SDK will use this Tracer for all trace logging.
 */
const TracerProxy: ITracerProxy = {
  getTracer,
  setTracer,
};
export { TracerProxy, ITracerProxy };

// Wrappers
export { NoOpSpan } from "./wrappers/noop/noOpSpan";
export { NoOpTracer } from "./wrappers/noop/noOpTracer";
export { OpenCensusSpanWrapper } from "./wrappers/opencensus/openCensusSpanWrapper";
export { OpenCensusTracerWrapper } from "./wrappers/opencensus/openCensusTracerWrapper";

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

// OpenCensus Interfaces
export {
  Tracer as OpenCensusTracer,
  Span as OpenCensusSpan,
} from "@opencensus/web-types";
