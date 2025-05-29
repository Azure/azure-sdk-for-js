// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TestSpan } from "./testSpan.js";
import { SpanKind, TraceFlags, context as otContext, trace as otTrace, } from "@opentelemetry/api";
/**
 * A mock tracer useful for testing
 */
export class TestTracer {
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
        const parentContext = getSpanContext(context || otContext.active());
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
            traceFlags: TraceFlags.NONE,
        };
        const span = new TestSpan(this, name, spanContext, (options === null || options === void 0 ? void 0 : options.kind) || SpanKind.INTERNAL, parentContext ? parentContext.spanId : undefined, options === null || options === void 0 ? void 0 : options.startTime, options === null || options === void 0 ? void 0 : options.attributes);
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
/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
export function getSpanContext(context) {
    return otTrace.getSpanContext(context);
}
//# sourceMappingURL=testTracer.js.map