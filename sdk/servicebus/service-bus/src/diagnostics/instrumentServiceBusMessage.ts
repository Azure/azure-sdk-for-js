// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { extractSpanContextFromTraceParentHeader, getTraceParentHeader } from "@azure/core-tracing";
import { Span, SpanContext } from "@opentelemetry/api";
import { ServiceBusMessage } from "../serviceBusMessage";

/**
 * @ignore
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";

/**
 * Populates the `ServiceBusMessage` with `SpanContext` info to support trace propagation.
 * Creates and returns a copy of the passed in `ServiceBusMessage` unless the `ServiceBusMessage`
 * has already been instrumented.
 * @param message The `ServiceBusMessage` to instrument.
 * @param span The `Span` containing the context to propagate tracing information.
 * @ignore
 * @internal
 */
export function instrumentServiceBusMessage(
  message: ServiceBusMessage,
  span: Span
): ServiceBusMessage {
  if (message.properties && message.properties[TRACEPARENT_PROPERTY]) {
    return message;
  }

  // create a copy so the original isn't modified
  message = { ...message, properties: { ...message.properties } };

  const traceParent = getTraceParentHeader(span.context());
  if (traceParent) {
    message.properties![TRACEPARENT_PROPERTY] = traceParent;
  }

  return message;
}

/**
 * Extracts the `SpanContext` from an `ServiceBusMessage` if the context exists.
 * @param message An individual `ServiceBusMessage` object.
 * @internal
 * @ignore
 */
export function extractSpanContextFromServiceBusMessage(
  message: ServiceBusMessage
): SpanContext | undefined {
  if (!message.properties || !message.properties[TRACEPARENT_PROPERTY]) {
    return;
  }

  const diagnosticId = message.properties[TRACEPARENT_PROPERTY] as string;
  return extractSpanContextFromTraceParentHeader(diagnosticId);
}
