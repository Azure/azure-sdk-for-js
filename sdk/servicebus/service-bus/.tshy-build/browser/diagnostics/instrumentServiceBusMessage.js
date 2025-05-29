// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { toSpanOptions, tracingClient } from "./tracing.js";
/**
 * @internal
 */
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";
/**
 * Instruments an AMQP message with a proper `Diagnostic-Id` for tracing.
 *
 * @hidden
 */
export function instrumentMessage(message, options, entityPath, host, operation) {
    var _a, _b, _c;
    // check if the event has already been instrumented
    const previouslyInstrumented = Boolean((_a = message.applicationProperties) === null || _a === void 0 ? void 0 : _a[TRACEPARENT_PROPERTY]);
    if (previouslyInstrumented) {
        return {
            message,
            spanContext: undefined,
        };
    }
    const { span: messageSpan, updatedOptions } = tracingClient.startSpan("message", options, toSpanOptions({ entityPath, host }, operation, "producer"));
    try {
        if (!messageSpan.isRecording()) {
            return {
                message,
                spanContext: undefined,
            };
        }
        const traceParent = tracingClient.createRequestHeaders((_b = updatedOptions.tracingOptions) === null || _b === void 0 ? void 0 : _b.tracingContext)["traceparent"];
        if (traceParent) {
            // create a copy so the original isn't modified
            message = Object.assign(Object.assign({}, message), { applicationProperties: Object.assign(Object.assign({}, message.applicationProperties), { [TRACEPARENT_PROPERTY]: traceParent }) });
        }
        return {
            message,
            spanContext: (_c = updatedOptions.tracingOptions) === null || _c === void 0 ? void 0 : _c.tracingContext,
        };
    }
    finally {
        messageSpan.end();
    }
}
/**
 * Extracts the `SpanContext` from an `ServiceBusMessage` if the context exists.
 * @param message - An individual `ServiceBusMessage` object.
 * @internal
 */
export function extractSpanContextFromServiceBusMessage(message) {
    if (!message.applicationProperties || !message.applicationProperties[TRACEPARENT_PROPERTY]) {
        return;
    }
    const diagnosticId = message.applicationProperties[TRACEPARENT_PROPERTY];
    return tracingClient.parseTraceparentHeader(diagnosticId);
}
/**
 * Provides an iterable over messages, whether it is a single message or multiple
 * messages.
 *
 * @param receivedMessages - A single message or a set of messages
 * @internal
 */
function* getReceivedMessages(receivedMessages) {
    if (!Array.isArray(receivedMessages)) {
        yield receivedMessages;
    }
    else {
        for (const message of receivedMessages) {
            yield message;
        }
    }
}
/**
 * @internal
 */
export function toProcessingSpanOptions(receivedMessages, receiver, connectionConfig, operation) {
    var _a;
    const spanLinks = [];
    for (const receivedMessage of getReceivedMessages(receivedMessages)) {
        const tracingContext = extractSpanContextFromServiceBusMessage(receivedMessage);
        if (tracingContext) {
            spanLinks.push({
                tracingContext,
                attributes: {
                    enqueuedTime: (_a = receivedMessage.enqueuedTimeUtc) === null || _a === void 0 ? void 0 : _a.getTime(),
                },
            });
        }
    }
    return Object.assign({ spanLinks, spanKind: "consumer" }, toSpanOptions({ host: connectionConfig.host, entityPath: receiver.entityPath }, operation));
}
//# sourceMappingURL=instrumentServiceBusMessage.js.map