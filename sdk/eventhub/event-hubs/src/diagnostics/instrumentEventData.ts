// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  extractSpanContextFromTraceParentHeader,
  getTraceParentHeader,
  isSpanContextValid
} from "@azure/core-tracing";
import { SpanContext } from "@azure/core-tracing";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { EventData, isAmqpAnnotatedMessage } from "../eventData";
import { OperationOptions } from "../util/operationOptions";
import { createMessageSpan } from "./tracing";

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
  options: OperationOptions,
  entityPath: string,
  host: string
): { event: EventData; spanContext: SpanContext | undefined } {
  const props = isAmqpAnnotatedMessage(eventData)
    ? eventData.applicationProperties
    : eventData.properties;

  // check if the event has already been instrumented
  const previouslyInstrumented = Boolean(props?.[TRACEPARENT_PROPERTY]);

  if (previouslyInstrumented) {
    return { event: eventData, spanContext: undefined };
  }

  const { span: messageSpan } = createMessageSpan(options, { entityPath, host });
  try {
    if (!messageSpan.isRecording()) {
      return {
        event: eventData,
        spanContext: undefined
      };
    }

    const traceParent = getTraceParentHeader(messageSpan.spanContext());
    if (traceParent && isSpanContextValid(messageSpan.spanContext())) {
      const copiedProps = { ...props };

      // create a copy so the original isn't modified
      if (isAmqpAnnotatedMessage(eventData)) {
        eventData = { ...eventData, applicationProperties: copiedProps };
      } else {
        eventData = { ...eventData, properties: copiedProps };
      }
      copiedProps[TRACEPARENT_PROPERTY] = traceParent;
    }

    return {
      event: eventData,
      spanContext: messageSpan.spanContext()
    };
  } finally {
    messageSpan.end();
  }
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
