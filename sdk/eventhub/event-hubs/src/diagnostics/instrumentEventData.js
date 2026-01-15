// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isAmqpAnnotatedMessage } from "../eventData.js";
import { toSpanOptions, tracingClient } from "./tracing.js";
/**
 * @internal
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";
/**
 * Populates the `EventData` with `SpanContext` info to support trace propagation.
 * Creates and returns a copy of the passed in `EventData` unless the `EventData`
 * has already been instrumented.
 * @param eventData - The `EventData` or `AmqpAnnotatedMessage` to instrument.
 * @param span - The `Span` containing the context to propagate tracing information.
 * @param operation - The type of the operation being performed.
 */
export function instrumentEventData(eventData, options, entityPath, host, operation) {
    const props = isAmqpAnnotatedMessage(eventData)
        ? eventData.applicationProperties
        : eventData.properties;
    // check if the event has already been instrumented
    const previouslyInstrumented = Boolean(props?.[TRACEPARENT_PROPERTY]);
    if (previouslyInstrumented) {
        return { event: eventData, spanContext: undefined };
    }
    const { span: messageSpan, updatedOptions } = tracingClient.startSpan("message", options, toSpanOptions({ entityPath, host }, operation, "producer"));
    try {
        if (!messageSpan.isRecording()) {
            return {
                event: eventData,
                spanContext: undefined,
            };
        }
        const traceParent = tracingClient.createRequestHeaders(updatedOptions.tracingOptions?.tracingContext)["traceparent"];
        if (traceParent) {
            const copiedProps = { ...props };
            // create a copy so the original isn't modified
            if (isAmqpAnnotatedMessage(eventData)) {
                eventData = { ...eventData, applicationProperties: copiedProps };
            }
            else {
                eventData = { ...eventData, properties: copiedProps };
            }
            copiedProps[TRACEPARENT_PROPERTY] = traceParent;
        }
        return {
            event: eventData,
            spanContext: updatedOptions.tracingOptions?.tracingContext,
        };
    }
    finally {
        messageSpan.end();
    }
}
/**
 * Extracts the `SpanContext` from an `EventData` if the context exists.
 * @param eventData - An individual `EventData` object.
 * @internal
 */
export function extractSpanContextFromEventData(eventData) {
    if (!eventData.properties || !eventData.properties[TRACEPARENT_PROPERTY]) {
        return;
    }
    const diagnosticId = eventData.properties[TRACEPARENT_PROPERTY];
    return tracingClient.parseTraceparentHeader(diagnosticId);
}
//# sourceMappingURL=instrumentEventData.js.map