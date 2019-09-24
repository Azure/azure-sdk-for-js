import { SpanContext } from '../interfaces/span_context';

/**
 * Generates a `SpanContext` given a `traceparent` header value.
 * @param traceParent Serialized span context data as a `traceparent` header value.
 * @returns The `SpanContext` generated from the `traceparent` value.
 */
export function extractSpanContextFromTraceParent(traceParent: string): SpanContext {
  const parts = traceParent.split("-");

  if (parts.length !== 4) {
    throw new Error(`Unable to extract span context from traceparent "${traceParent}".`);
  }

  const [_, traceId, spanId, traceOptions] = parts;

  const traceFlags = parseInt(traceOptions, 16);

  const spanContext: SpanContext = {
    spanId,
    traceId,
    traceFlags
  };

  return spanContext;
}