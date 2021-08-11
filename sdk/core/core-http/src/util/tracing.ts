// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  createSpanFunction,
  CreateSpanFunctionArgs,
  CreateSpanFunctionArgs as SpanConfig, // for backwards compatibility
  Span
} from "@azure/core-tracing";

/** The values supported by {@link Span.setStatus} */
export const SpanStatusCode = {
  /**
   * The default status.
   */
  UNSET: 0,
  /**
   * The operation has been validated by an Application developer or
   * Operator to have completed successfully.
   */
  OK: 1,
  /**
   * The operation contains an error.
   */
  ERROR: 2
} as const;

/** The values supported by {@link Span.setTag} */
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
