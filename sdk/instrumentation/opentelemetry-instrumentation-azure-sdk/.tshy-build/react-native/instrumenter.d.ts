import type { Instrumenter, InstrumenterSpanOptions, TracingContext, TracingSpan } from "@azure/core-tracing";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
export declare const propagator: W3CTraceContextPropagator;
export declare class OpenTelemetryInstrumenter implements Instrumenter {
    startSpan(name: string, spanOptions: InstrumenterSpanOptions): {
        span: TracingSpan;
        tracingContext: TracingContext;
    };
    withContext<CallbackArgs extends unknown[], Callback extends (...args: CallbackArgs) => ReturnType<Callback>>(tracingContext: TracingContext, callback: Callback, ...callbackArgs: CallbackArgs): ReturnType<Callback>;
    parseTraceparentHeader(traceparentHeader: string): TracingContext;
    createRequestHeaders(tracingContext?: TracingContext): Record<string, string>;
}
//# sourceMappingURL=instrumenter.d.ts.map