"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRACEPARENT_PROPERTY = void 0;
exports.instrumentEventData = instrumentEventData;
exports.extractSpanContextFromEventData = extractSpanContextFromEventData;
const eventData_js_1 = require("../eventData.js");
const tracing_js_1 = require("./tracing.js");
/**
 * @internal
 */
exports.TRACEPARENT_PROPERTY = "Diagnostic-Id";
/**
 * Populates the `EventData` with `SpanContext` info to support trace propagation.
 * Creates and returns a copy of the passed in `EventData` unless the `EventData`
 * has already been instrumented.
 * @param eventData - The `EventData` or `AmqpAnnotatedMessage` to instrument.
 * @param span - The `Span` containing the context to propagate tracing information.
 * @param operation - The type of the operation being performed.
 */
function instrumentEventData(eventData, options, entityPath, host, operation) {
    var _a, _b;
    const props = (0, eventData_js_1.isAmqpAnnotatedMessage)(eventData)
        ? eventData.applicationProperties
        : eventData.properties;
    // check if the event has already been instrumented
    const previouslyInstrumented = Boolean(props === null || props === void 0 ? void 0 : props[exports.TRACEPARENT_PROPERTY]);
    if (previouslyInstrumented) {
        return { event: eventData, spanContext: undefined };
    }
    const { span: messageSpan, updatedOptions } = tracing_js_1.tracingClient.startSpan("message", options, (0, tracing_js_1.toSpanOptions)({ entityPath, host }, operation, "producer"));
    try {
        if (!messageSpan.isRecording()) {
            return {
                event: eventData,
                spanContext: undefined,
            };
        }
        const traceParent = tracing_js_1.tracingClient.createRequestHeaders((_a = updatedOptions.tracingOptions) === null || _a === void 0 ? void 0 : _a.tracingContext)["traceparent"];
        if (traceParent) {
            const copiedProps = Object.assign({}, props);
            // create a copy so the original isn't modified
            if ((0, eventData_js_1.isAmqpAnnotatedMessage)(eventData)) {
                eventData = Object.assign(Object.assign({}, eventData), { applicationProperties: copiedProps });
            }
            else {
                eventData = Object.assign(Object.assign({}, eventData), { properties: copiedProps });
            }
            copiedProps[exports.TRACEPARENT_PROPERTY] = traceParent;
        }
        return {
            event: eventData,
            spanContext: (_b = updatedOptions.tracingOptions) === null || _b === void 0 ? void 0 : _b.tracingContext,
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
function extractSpanContextFromEventData(eventData) {
    if (!eventData.properties || !eventData.properties[exports.TRACEPARENT_PROPERTY]) {
        return;
    }
    const diagnosticId = eventData.properties[exports.TRACEPARENT_PROPERTY];
    return tracing_js_1.tracingClient.parseTraceparentHeader(diagnosticId);
}
//# sourceMappingURL=instrumentEventData.js.map