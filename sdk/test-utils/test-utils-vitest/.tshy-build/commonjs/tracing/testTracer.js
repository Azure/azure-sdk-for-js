"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTracer = void 0;
exports.getSpanContext = getSpanContext;
const testSpan_js_1 = require("./testSpan.js");
const api_1 = require("@opentelemetry/api");
/**
 * A mock tracer useful for testing
 */
class TestTracer {
    constructor(name, version) {
        this.name = name;
        this.version = version;
        this.traceIdCounter = 0;
        this.spanIdCounter = 0;
        this.rootSpans = [];
        this.knownSpans = [];
    }
    getNextTraceId() {
        this.traceIdCounter++;
        return this.traceIdCounter.toString().padStart(32, "0");
    }
    getNextSpanId() {
        this.spanIdCounter++;
        return this.spanIdCounter.toString().padStart(16, "0");
    }
    /**
     * Returns all Spans that were created without a parent
     */
    getRootSpans() {
        return this.rootSpans;
    }
    /**
     * Returns all Spans this Tracer knows about
     */
    getKnownSpans() {
        return this.knownSpans;
    }
    /**
     * Returns all Spans where end() has not been called
     */
    getActiveSpans() {
        return this.knownSpans.filter((span) => {
            return !span.endCalled;
        });
    }
    /**
     * Return all Spans for a particular trace, grouped by their
     * parent Span in a tree-like structure
     * @param traceId - The traceId to return the graph for
     */
    getSpanGraph(traceId) {
        const traceSpans = this.knownSpans.filter((span) => {
            return span.spanContext().traceId === traceId;
        });
        const roots = [];
        const nodeMap = new Map();
        for (const span of traceSpans) {
            const spanId = span.spanContext().spanId;
            const node = {
                name: span.name,
                children: [],
            };
            nodeMap.set(spanId, node);
            if (span.parentSpanId) {
                const parent = nodeMap.get(span.parentSpanId);
                if (!parent) {
                    throw new Error(`Span with name ${node.name} has an unknown parentSpan with id ${span.parentSpanId}`);
                }
                parent.children.push(node);
            }
            else {
                roots.push(node);
            }
        }
        return {
            roots,
        };
    }
    /**
     * Starts a new Span.
     * @param name - The name of the span.
     * @param options - The SpanOptions used during Span creation.
     */
    startSpan(name, options, context) {
        const parentContext = getSpanContext(context || api_1.context.active());
        let traceId;
        let isRootSpan = false;
        if (parentContext && parentContext.traceId) {
            traceId = parentContext.traceId;
        }
        else {
            traceId = this.getNextTraceId();
            isRootSpan = true;
        }
        const spanContext = {
            traceId,
            spanId: this.getNextSpanId(),
            traceFlags: api_1.TraceFlags.NONE,
        };
        const span = new testSpan_js_1.TestSpan(this, name, spanContext, (options === null || options === void 0 ? void 0 : options.kind) || api_1.SpanKind.INTERNAL, parentContext ? parentContext.spanId : undefined, options === null || options === void 0 ? void 0 : options.startTime, options === null || options === void 0 ? void 0 : options.attributes);
        this.knownSpans.push(span);
        if (isRootSpan) {
            this.rootSpans.push(span);
        }
        return span;
    }
    /**
     * Added to support testing. We do not support `startActiveSpan` in general because it uses async_hooks
     * which is experimental. Only added to support TestTracerProvider compatibility with OTel Tracers.
     */
    startActiveSpan() {
        throw new Error("Method not implemented.");
    }
}
exports.TestTracer = TestTracer;
/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
function getSpanContext(context) {
    return api_1.trace.getSpanContext(context);
}
//# sourceMappingURL=testTracer.js.map