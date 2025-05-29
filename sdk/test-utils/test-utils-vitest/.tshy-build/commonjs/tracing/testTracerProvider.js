"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTracerProvider = void 0;
exports.setTracer = setTracer;
exports.resetTracer = resetTracer;
const api_1 = require("@opentelemetry/api");
const testTracer_js_1 = require("./testTracer.js");
// This must be the same as the default tracer name supplied from @azure/core-tracing.
const TRACER_NAME = "azure/core-tracing";
/**
 * Implementation for TracerProvider from opentelemetry/api package.
 * It is a registry for creating named tracers.
 * This is exported only so that we can support packages using \@azure/core-tracing \<= 1.0.0-preview.13
 * while transitioning to \@azure/core-tracing \>= 1.0.0-preview.14
 */
class TestTracerProvider {
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
            this.tracerCache.set(name, new testTracer_js_1.TestTracer(name, name));
        }
        return this.tracerCache.get(name);
    }
    /**
     * Registers the current tracer provider
     */
    register() {
        api_1.trace.setGlobalTracerProvider(this);
    }
    /**
     * Removes global trace provider
     */
    disable() {
        api_1.trace.disable();
    }
    setTracer(tracer) {
        this.tracerCache.set(TRACER_NAME, tracer);
    }
}
exports.TestTracerProvider = TestTracerProvider;
let tracerProvider;
function setTracer(tracer) {
    resetTracer();
    tracerProvider = new TestTracerProvider();
    tracerProvider.register();
    if (tracer) {
        tracerProvider.setTracer(tracer);
    }
    return tracerProvider.getTracer(TRACER_NAME);
}
function resetTracer() {
    tracerProvider === null || tracerProvider === void 0 ? void 0 : tracerProvider.disable();
}
//# sourceMappingURL=testTracerProvider.js.map