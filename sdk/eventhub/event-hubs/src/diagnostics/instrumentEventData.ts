// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { extractSpanContextFromTraceParentHeader, getTraceParentHeader } from "@azure/core-tracing";
import { Span, SpanContext } from "@azure/core-tracing";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { EventData, isAmqpAnnotatedMessage } from "../eventData";

/**
 * @hidden
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";

/**
 * Populates the `EventData` with `SpanContext` info to support trace propagation.
 * Creates and returns a copy of the passed in `EventData` unless the `EventData`
 * has already been instrumented.
 * @param eventData - The `EventData` or `AmqpAnnotatedMessage` to instrument.
 * @param span - The `Span` containing the context to propagate tracing information.
 */
export function instrumentEventData(
  eventData: EventData | AmqpAnnotatedMessage,
  span: Span
): EventData {
  const props = isAmqpAnnotatedMessage(eventData)
    ? eventData.applicationProperties
    : eventData.properties;

  if (props && props[TRACEPARENT_PROPERTY]) {
    return eventData;
  }

  const copiedProps = { ...props };

  // create a copy so the original isn't modified
  if (isAmqpAnnotatedMessage(eventData)) {
    eventData = { ...eventData, applicationProperties: copiedProps };
  } else {
    eventData = { ...eventData, properties: copiedProps };
  }

  const traceParent = getTraceParentHeader(span.spanContext());
  if (traceParent) {
    copiedProps[TRACEPARENT_PROPERTY] = traceParent;
  }

  return eventData;
}

/**
 * Extracts the `SpanContext` from an `EventData` if the context exists.
 * @param eventData - An individual `EventData` object.
 * @internal
 */
export function extractSpanContextFromEventData(eventData: EventData): SpanContext | undefined {
  if (!eventData.properties || !eventData.properties[TRACEPARENT_PROPERTY]) {
    return;
  }

  const diagnosticId = eventData.properties[TRACEPARENT_PROPERTY];
  return extractSpanContextFromTraceParentHeader(diagnosticId);
}
