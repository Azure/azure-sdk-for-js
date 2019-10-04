// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { SpanContext } from "../interfaces/span_context";
import { TraceFlags } from "../interfaces/trace_flags";
import * as log from "./log";

const VERSION = "00";

/**
 * Generates a `SpanContext` given a `traceparent` header value.
 * @param traceParent Serialized span context data as a `traceparent` header value.
 * @returns The `SpanContext` generated from the `traceparent` value.
 */
export function extractSpanContextFromTraceParentHeader(
  traceParentHeader: string
): SpanContext | undefined {
  const parts = traceParentHeader.split("-");

  if (parts.length !== 4) {
    log.warning(`Unable to extract span context from traceparent header "${traceParentHeader}".`);
    return;
  }

  const [version, traceId, spanId, traceOptions] = parts;

  if (version !== VERSION) {
    log.warning(`Unexpected traceparent header version "${version}" found, expected "${VERSION}".`);
    return;
  }

  const traceFlags = parseInt(traceOptions, 16);

  const spanContext: SpanContext = {
    spanId,
    traceId,
    traceFlags
  };

  return spanContext;
}

/**
 * Generates a `traceparent` value given a span context.
 * @param spanContext Contains context for a specific span.
 * @returns The `spanContext` represented as a `traceparent` value.
 */
export function getTraceParentHeader(spanContext: SpanContext): string | undefined {
  const missingFields: string[] = [];
  if (!spanContext.traceId) {
    missingFields.push("traceId");
  }
  if (!spanContext.spanId) {
    missingFields.push("spanId");
  }

  if (missingFields.length) {
    log.warning(`Missing required field(s) ${missingFields.join(", ")} from spanContext`);
    return;
  }

  const flags = spanContext.traceFlags || TraceFlags.UNSAMPLED;
  const hexFlags = flags.toString(16);
  const traceFlags = hexFlags.length === 1 ? `0${hexFlags}` : hexFlags;

  // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
  return `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-${traceFlags}`;
}
