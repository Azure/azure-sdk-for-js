"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockInstrumenter = void 0;
const mockContext_js_1 = require("./mockContext.js");
const mockTracingSpan_js_1 = require("./mockTracingSpan.js");
/**
 * Represents an implementation of {@link Instrumenter} interface that keeps track of the tracing contexts and spans
 */
class MockInstrumenter {
    constructor() {
        /**
         * Stack of immutable contexts, each of which is a bag of tracing values for the current operation
         */
        this.contextStack = [new mockContext_js_1.MockContext()];
        /**
         * List of started spans
         */
        this.startedSpans = [];
        this.traceIdCounter = 0;
        this.spanIdCounter = 0;
        this.isEnabled = true;
    }
    getNextTraceId() {
        this.traceIdCounter++;
        return this.traceIdCounter.toString().padStart(32, "0");
    }
    getNextSpanId() {
        this.spanIdCounter++;
        return this.spanIdCounter.toString().padStart(16, "0");
    }
    startSpan(name, spanOptions) {
        const tracingContext = (spanOptions === null || spanOptions === void 0 ? void 0 : spanOptions.tracingContext) || this.currentContext();
        const parentSpan = tracingContext.getValue(mockContext_js_1.spanKey);
        let traceId;
        if (parentSpan) {
            traceId = parentSpan.traceId;
        }
        else {
            traceId = this.getNextTraceId();
        }
        const spanContext = {
            spanId: this.getNextSpanId(),
            traceId: traceId,
            traceFlags: 0,
        };
        const span = new mockTracingSpan_js_1.MockTracingSpan(name, spanContext.traceId, spanContext.spanId, tracingContext, spanOptions, this.isEnabled);
        let context = new mockContext_js_1.MockContext(tracingContext);
        context = context.setValue(mockContext_js_1.spanKey, span);
        this.startedSpans.push(span);
        return { span, tracingContext: context };
    }
    withContext(context, callback, ...callbackArgs) {
        this.contextStack.push(context);
        return Promise.resolve(callback(...callbackArgs)).finally(() => {
            this.contextStack.pop();
        });
    }
    parseTraceparentHeader(_traceparentHeader) {
        return;
    }
    createRequestHeaders(_tracingContext) {
        return {};
    }
    /**
     * Gets the currently active context.
     *
     * @returns The current context.
     */
    currentContext() {
        return this.contextStack[this.contextStack.length - 1];
    }
    /**
     * Resets the state of the instrumenter to a clean slate.
     */
    reset() {
        this.contextStack = [new mockContext_js_1.MockContext()];
        this.startedSpans = [];
        this.traceIdCounter = 0;
        this.spanIdCounter = 0;
    }
    disable() {
        this.isEnabled = false;
    }
    enable() {
        this.isEnabled = true;
    }
}
exports.MockInstrumenter = MockInstrumenter;
//# sourceMappingURL=mockInstrumenter.js.map