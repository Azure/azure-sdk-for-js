
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getTracer, setTracer, ITracerProxy } from "./tracerProxy";
const TracerProxy: ITracerProxy = {
  getTracer,
  setTracer,
};
export { TracerProxy, ITracerProxy };

// Utils
export { SupportedPlugins } from "./utils/supportedPlugins";

// Wrappers
export { NoOpSpan } from "./wrappers/noop/noOpSpan";
export { NoOpTrace } from "./wrappers/noop/noOpTrace";
export { OpenCensusSpanWrapper } from "./wrappers/opencensus/openCensusSpanWrapper";
export { OpenCensusTraceWrapper } from "./wrappers/opencensus/openCensusTraceWrapper";

// Interfaces
export { Attributes } from "./interfaces/attributes";
export { BinaryFormat } from "./interfaces/BinaryFormat";
export { Event } from "./interfaces/Event";
export { HttpTextFormat } from "./interfaces/HttpTextFormat";
export { Link } from "./interfaces/link";
export { Plugin } from "./interfaces/plugin";
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
  TracerBase as OpenCensusTracerBase,
  Func as OpenCensusFunc,
  Link as OpenCensusLink,
  Annotation as OpenCensusAnnotation,
  Attributes as OpenCensusAttributes,
  CanonicalCode as OpenCensusCanonicalCode,
  MessageEvent as OpenCensusMessageEvent,
  SpanOptions as OpenCensusSpanOptions,
  SpanContext as OpenCensusSpanContext,
  TraceOptions as OpenCensusTraceOptions,
  LinkType as OpenCensusLinkType,
  MessageEventType as OpenCensusMessageEventType,
  SpanKind as OpenCensusSpanKind,
  Status as OpenCensusStatus,
  SpanEventListener as OpenCensusSpanEventListener,
  TraceState as OpenCensusTraceState
} from "./interfaces/OpenCensus/model";
export { Sampler as OpenCensusSampler } from "./interfaces/OpenCensus/sampler";
export {
  Propagation as OpenCensusPropagation,
  HeaderGetter as OpenCensusHeaderGetter,
  HeaderSetter as OpenCensusHeaderSetter
} from "./interfaces/OpenCensus/propagation";
export {
  TraceParams as OpenCensusTraceParams,
  TracerConfig as OpenCensusTracerConfig
} from "./interfaces/OpenCensus/config";
export {
  LogFunction as OpenCensusLogFunction,
  Logger as OpenCensusLogger
} from "./interfaces/OpenCensus/common";
