import type { Span } from "@opentelemetry/api";
import type { SpanStatus, TracingSpan, AddEventOptions } from "@azure/core-tracing";
export declare class OpenTelemetrySpanWrapper implements TracingSpan {
    private _span;
    constructor(span: Span);
    setStatus(status: SpanStatus): void;
    setAttribute(name: string, value: unknown): void;
    end(): void;
    recordException(exception: string | Error): void;
    isRecording(): boolean;
    addEvent(name: string, options?: AddEventOptions): void;
    /**
     * Allows getting the wrapped span as needed.
     * @internal
     *
     * @returns The underlying span
     */
    unwrap(): Span;
}
//# sourceMappingURL=spanWrapper.d.ts.map