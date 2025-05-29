// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { INVALID_SPAN_CONTEXT, context, defaultTextMapGetter, defaultTextMapSetter, trace, } from "@opentelemetry/api";
import { W3CTraceContextPropagator, suppressTracing } from "@opentelemetry/core";
import { OpenTelemetrySpanWrapper } from "./spanWrapper.js";
import { envVarToBoolean } from "./configuration.js";
import { toSpanOptions } from "./transformations.js";
// While default propagation is user-configurable, Azure services always use the W3C implementation.
export const propagator = new W3CTraceContextPropagator();
export class OpenTelemetryInstrumenter {
    startSpan(name, spanOptions) {
        let ctx = (spanOptions === null || spanOptions === void 0 ? void 0 : spanOptions.tracingContext) || context.active();
        let span;
        if (envVarToBoolean("AZURE_TRACING_DISABLED")) {
            // disable only our spans but not any downstream spans
            span = trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
        }
        else {
            // Create our span
            span = trace
                .getTracer(spanOptions.packageName, spanOptions.packageVersion)
                .startSpan(name, toSpanOptions(spanOptions), ctx);
            if (envVarToBoolean("AZURE_HTTP_TRACING_CHILDREN_DISABLED") &&
                name.toUpperCase().startsWith("HTTP")) {
                // disable downstream spans
                ctx = suppressTracing(ctx);
            }
        }
        return {
            span: new OpenTelemetrySpanWrapper(span),
            tracingContext: trace.setSpan(ctx, span),
        };
    }
    withContext(tracingContext, callback, ...callbackArgs) {
        return context.with(tracingContext, callback, 
        /** Assume caller will bind `this` or use arrow functions */ undefined, ...callbackArgs);
    }
    parseTraceparentHeader(traceparentHeader) {
        return propagator.extract(context.active(), { traceparent: traceparentHeader }, defaultTextMapGetter);
    }
    createRequestHeaders(tracingContext) {
        const headers = {};
        propagator.inject(tracingContext || context.active(), headers, defaultTextMapSetter);
        return headers;
    }
}
//# sourceMappingURL=instrumenter.js.map