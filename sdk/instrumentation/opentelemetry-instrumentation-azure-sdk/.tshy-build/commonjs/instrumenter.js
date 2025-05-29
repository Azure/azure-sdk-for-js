"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryInstrumenter = exports.propagator = void 0;
const api_1 = require("@opentelemetry/api");
const core_1 = require("@opentelemetry/core");
const spanWrapper_js_1 = require("./spanWrapper.js");
const configuration_js_1 = require("./configuration.js");
const transformations_js_1 = require("./transformations.js");
// While default propagation is user-configurable, Azure services always use the W3C implementation.
exports.propagator = new core_1.W3CTraceContextPropagator();
class OpenTelemetryInstrumenter {
    startSpan(name, spanOptions) {
        let ctx = (spanOptions === null || spanOptions === void 0 ? void 0 : spanOptions.tracingContext) || api_1.context.active();
        let span;
        if ((0, configuration_js_1.envVarToBoolean)("AZURE_TRACING_DISABLED")) {
            // disable only our spans but not any downstream spans
            span = api_1.trace.wrapSpanContext(api_1.INVALID_SPAN_CONTEXT);
        }
        else {
            // Create our span
            span = api_1.trace
                .getTracer(spanOptions.packageName, spanOptions.packageVersion)
                .startSpan(name, (0, transformations_js_1.toSpanOptions)(spanOptions), ctx);
            if ((0, configuration_js_1.envVarToBoolean)("AZURE_HTTP_TRACING_CHILDREN_DISABLED") &&
                name.toUpperCase().startsWith("HTTP")) {
                // disable downstream spans
                ctx = (0, core_1.suppressTracing)(ctx);
            }
        }
        return {
            span: new spanWrapper_js_1.OpenTelemetrySpanWrapper(span),
            tracingContext: api_1.trace.setSpan(ctx, span),
        };
    }
    withContext(tracingContext, callback, ...callbackArgs) {
        return api_1.context.with(tracingContext, callback, 
        /** Assume caller will bind `this` or use arrow functions */ undefined, ...callbackArgs);
    }
    parseTraceparentHeader(traceparentHeader) {
        return exports.propagator.extract(api_1.context.active(), { traceparent: traceparentHeader }, api_1.defaultTextMapGetter);
    }
    createRequestHeaders(tracingContext) {
        const headers = {};
        exports.propagator.inject(tracingContext || api_1.context.active(), headers, api_1.defaultTextMapSetter);
        return headers;
    }
}
exports.OpenTelemetryInstrumenter = OpenTelemetryInstrumenter;
//# sourceMappingURL=instrumenter.js.map