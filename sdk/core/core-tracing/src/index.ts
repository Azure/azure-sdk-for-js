// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  AddEventOptions,
  Instrumenter,
  InstrumenterSpanOptions,
  OperationTracingOptions,
  OptionsWithTracingContext,
  Resolved,
  SpanStatus,
  SpanStatusError,
  SpanStatusSuccess,
  TracingClient,
  TracingClientOptions,
  TracingContext,
  TracingSpan,
  TracingSpanKind,
  TracingSpanLink,
  TracingSpanOptions,
} from "./interfaces.js";
export { useInstrumenter } from "./instrumenter.js";
export { createTracingClient } from "./tracingClient.js";
export { traced, traceable, TracedDecoratorOptions } from "./decorators.js";
