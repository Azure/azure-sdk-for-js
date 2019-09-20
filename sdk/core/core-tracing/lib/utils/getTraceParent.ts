import { SpanContext } from "../interfaces/span_context";
import { TraceOptions } from '../interfaces/trace_options';

const VERSION = "00";

/**
 * Generates a `traceparent` value given a span context. 
 * @param spanContext Contains context for a specific span.
 * @returns The `spanContext` represented as a `traceparent` value.
 */
export function getTraceParent(spanContext: SpanContext): string {
  if (!spanContext.traceId || !spanContext.spanId) {
    throw new Error(`Missing required fields "traceId" or "spanId" from spanContext.`);
  }

  const traceOptions = spanContext.traceOptions || TraceOptions.UNSAMPLED;
  const traceFlags = (traceOptions < 10) ? `0${traceOptions.toString(16)}` : traceOptions.toString(16);

  // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
  return `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-${traceFlags}`;
}