export {
  createSpanFunction,
  CreateSpanFunctionArgs,
  CreateSpanFunctionArgs as SpanConfig,
  Span
} from "@azure/core-tracing";

export const SpanStatusCode = {
  UNSET: 0,
  OK: 1,
  ERROR: 2
} as const;

export const SpanKind = {
  /** Default value. Indicates that the span is used internally. */
  INTERNAL: 0,
  /**
   * Indicates that the span covers server-side handling of an RPC or other
   * remote request.
   */
  SERVER: 1,
  /**
   * Indicates that the span covers the client-side wrapper around an RPC or
   * other remote request.
   */
  CLIENT: 2,
  /**
   * Indicates that the span describes producer sending a message to a
   * broker. Unlike client and server, there is no direct critical path latency
   * relationship between producer and consumer spans.
   */
  PRODUCER: 3,
  /**
   * Indicates that the span describes consumer receiving a message from a
   * broker. Unlike client and server, there is no direct critical path latency
   * relationship between producer and consumer spans.
   */
  CONSUMER: 4
} as const;
