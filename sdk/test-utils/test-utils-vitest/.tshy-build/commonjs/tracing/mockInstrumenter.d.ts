import { Instrumenter, InstrumenterSpanOptions, TracingContext, TracingSpan } from "@azure/core-tracing";
import { MockTracingSpan } from "./mockTracingSpan.js";
/**
 * Represents an implementation of {@link Instrumenter} interface that keeps track of the tracing contexts and spans
 */
export declare class MockInstrumenter implements Instrumenter {
    private isEnabled;
    constructor();
    /**
     * Stack of immutable contexts, each of which is a bag of tracing values for the current operation
     */
    contextStack: TracingContext[];
    /**
     * List of started spans
     */
    startedSpans: MockTracingSpan[];
    private traceIdCounter;
    private getNextTraceId;
    private spanIdCounter;
    private getNextSpanId;
    startSpan(name: string, spanOptions?: InstrumenterSpanOptions): {
        span: TracingSpan;
        tracingContext: TracingContext;
    };
    withContext<CallbackArgs extends unknown[], Callback extends (...args: CallbackArgs) => ReturnType<Callback>>(context: TracingContext, callback: Callback, ...callbackArgs: CallbackArgs): ReturnType<Callback>;
    parseTraceparentHeader(_traceparentHeader: string): TracingContext | undefined;
    createRequestHeaders(_tracingContext: TracingContext): Record<string, string>;
    /**
     * Gets the currently active context.
     *
     * @returns The current context.
     */
    currentContext(): TracingContext;
    /**
     * Resets the state of the instrumenter to a clean slate.
     */
    reset(): void;
    disable(): void;
    enable(): void;
}
//# sourceMappingURL=mockInstrumenter.d.ts.map