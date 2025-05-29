import { TestSpan } from "./testSpan.js";
import { SpanContext, SpanOptions, Context as OTContext, Tracer } from "@opentelemetry/api";
import { SpanGraph } from "./spanGraphModel.js";
/**
 * A mock tracer useful for testing
 */
export declare class TestTracer implements Tracer {
    name?: string | undefined;
    version?: string | undefined;
    constructor(name?: string | undefined, version?: string | undefined);
    private traceIdCounter;
    private getNextTraceId;
    private spanIdCounter;
    private getNextSpanId;
    private rootSpans;
    private knownSpans;
    /**
     * Returns all Spans that were created without a parent
     */
    getRootSpans(): TestSpan[];
    /**
     * Returns all Spans this Tracer knows about
     */
    getKnownSpans(): TestSpan[];
    /**
     * Returns all Spans where end() has not been called
     */
    getActiveSpans(): TestSpan[];
    /**
     * Return all Spans for a particular trace, grouped by their
     * parent Span in a tree-like structure
     * @param traceId - The traceId to return the graph for
     */
    getSpanGraph(traceId: string): SpanGraph;
    /**
     * Starts a new Span.
     * @param name - The name of the span.
     * @param options - The SpanOptions used during Span creation.
     */
    startSpan(name: string, options?: SpanOptions, context?: OTContext): TestSpan;
    /**
     * Added to support testing. We do not support `startActiveSpan` in general because it uses async_hooks
     * which is experimental. Only added to support TestTracerProvider compatibility with OTel Tracers.
     */
    startActiveSpan(): never;
}
/**
 * Get the span context of the span if it exists.
 *
 * @param context - context to get values from
 */
export declare function getSpanContext(context: Context): SpanContext | undefined;
/**
 * OpenTelemetry compatible interface for Context
 */
export interface Context {
    /**
     * Get a value from the context.
     *
     * @param key - key which identifies a context value
     */
    getValue(key: symbol): unknown;
    /**
     * Create a new context which inherits from this context and has
     * the given key set to the given value.
     *
     * @param key - context key for which to set the value
     * @param value - value to set for the given key
     */
    setValue(key: symbol, value: unknown): Context;
    /**
     * Return a new context which inherits from this context but does
     * not contain a value for the given key.
     *
     * @param key - context key for which to clear a value
     */
    deleteValue(key: symbol): Context;
}
//# sourceMappingURL=testTracer.d.ts.map