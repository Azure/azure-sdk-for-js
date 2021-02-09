// core-tracing (because of opentelemetry) requires some symbols to be
// exported.

export const openTelemetryNamedExports = {
  "@opentelemetry/api": ["CanonicalCode", "SpanKind", "TraceFlags", "getSpan", "StatusCode", "setSpan"]
};
