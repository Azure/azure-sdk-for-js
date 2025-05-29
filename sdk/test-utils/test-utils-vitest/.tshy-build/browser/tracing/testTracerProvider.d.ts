import { TracerOptions, TracerProvider } from "@opentelemetry/api";
import { TestTracer } from "./testTracer.js";
/**
 * Implementation for TracerProvider from opentelemetry/api package.
 * It is a registry for creating named tracers.
 * This is exported only so that we can support packages using \@azure/core-tracing \<= 1.0.0-preview.13
 * while transitioning to \@azure/core-tracing \>= 1.0.0-preview.14
 */
export declare class TestTracerProvider implements TracerProvider {
    private tracerCache;
    /**
     * Returns a Tracer, creating one if one with the given name and version is
     * not already created.
     *
     * This function may return different Tracer types (e.g.
     * NoopTracerProvider vs. a functional tracer).
     *
     * @param name - The name of the tracer or instrumentation library.
     * @param version - The version of the tracer or instrumentation library.
     * @returns Tracer A Tracer with the given name and version
     */
    getTracer(name: string, _version?: string, _options?: TracerOptions): TestTracer;
    /**
     * Registers the current tracer provider
     */
    register(): void;
    /**
     * Removes global trace provider
     */
    disable(): void;
    setTracer(tracer: TestTracer): void;
}
export declare function setTracer(tracer?: TestTracer): TestTracer;
export declare function resetTracer(): void;
//# sourceMappingURL=testTracerProvider.d.ts.map