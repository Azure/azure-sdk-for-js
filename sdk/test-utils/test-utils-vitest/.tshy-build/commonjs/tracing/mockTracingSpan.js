"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTracingSpan = void 0;
const mockContext_js_1 = require("./mockContext.js");
/**
 * Represents an implementation of a mock tracing span {@link TracingSpan} used for tests
 */
class MockTracingSpan {
    /**
     *
     * @param name - Name of the current span
     * @param spanContext - A unique, serializable identifier for a span
     * @param tracingContext - Existing or parent tracing context
     * @param spanOptions - Options to configure the newly created span {@link TracingSpanOptions}
     */
    constructor(name, traceId, spanId, tracingContext, spanOptions, enabled = true) {
        /**
         * All attributes recorded on the span.
         */
        this.attributes = {};
        /**
         * Value indictating wheher {@link TracingSpan.end} was called.
         */
        this.endCalled = false;
        this.name = name;
        this.spanKind = spanOptions === null || spanOptions === void 0 ? void 0 : spanOptions.spanKind;
        this.tracingContext = tracingContext;
        this.traceId = traceId;
        this.spanId = spanId;
        this._isRecording = enabled;
    }
    setStatus(status) {
        this.spanStatus = status;
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    end() {
        this.endCalled = true;
    }
    recordException(exception) {
        this.exception = exception;
    }
    setIsRecording(isRecording) {
        this._isRecording = isRecording;
    }
    isRecording() {
        return this._isRecording;
    }
    parentSpan() {
        var _a;
        return (_a = this.tracingContext) === null || _a === void 0 ? void 0 : _a.getValue(mockContext_js_1.spanKey);
    }
}
exports.MockTracingSpan = MockTracingSpan;
//# sourceMappingURL=mockTracingSpan.js.map