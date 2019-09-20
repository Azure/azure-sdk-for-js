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

  const [_, traceId, spanId, traceFlags] = parts;

  const traceOptions = parseInt(traceFlags, 16);

  const spanContext: SpanContext = {
    spanId,
    traceId,
    traceOptions
  };

  return spanContext;
}