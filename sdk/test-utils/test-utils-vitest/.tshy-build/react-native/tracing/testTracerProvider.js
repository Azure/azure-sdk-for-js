// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { trace } from "@opentelemetry/api";
import { TestTracer } from "./testTracer.js";
// This must be the same as the default tracer name supplied from @azure/core-tracing.
const TRACER_NAME = "azure/core-tracing";
/**
 * Implementation for TracerProvider from opentelemetry/api package.
 * It is a registry for creating named tracers.
 * This is exported only so that we can support packages using \@azure/core-tracing \<= 1.0.0-preview.13
 * while transitioning to \@azure/core-tracing \>= 1.0.0-preview.14
 */
export class TestTracerProvider {
    constructor() {
        this.tracerCache = new Map();
    }
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
    getTracer(name, _version, _options) {
        if (!this.tracerCache.has(name)) {
            this.tracerCache.set(name, new TestTracer(name, name));
        }
        return this.tracerCache.get(name);
    }
    /**
     * Registers the current tracer provider
     */
    register() {
        trace.setGlobalTracerProvider(this);
    }
    /**
     * Removes global trace provider
     */
    disable() {
        trace.disable();
    }
    setTracer(tracer) {
        this.tracerCache.set(TRACER_NAME, tracer);
    }
}
let tracerProvider;
export function setTracer(tracer) {
    resetTracer();
    tracerProvider = new TestTracerProvider();
    tracerProvider.register();
    if (tracer) {
        tracerProvider.setTracer(tracer);
    }
    return tracerProvider.getTracer(TRACER_NAME);
}
export function resetTracer() {
    tracerProvider === null || tracerProvider === void 0 ? void 0 : tracerProvider.disable();
}
//# sourceMappingURL=testTracerProvider.js.map