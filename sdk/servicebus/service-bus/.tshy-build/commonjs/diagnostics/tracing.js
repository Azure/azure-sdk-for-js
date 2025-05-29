"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracingClient = void 0;
exports.toSpanOptions = toSpanOptions;
const core_tracing_1 = require("@azure/core-tracing");
const constants_js_1 = require("../util/constants.js");
/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
exports.tracingClient = (0, core_tracing_1.createTracingClient)({
    namespace: "Microsoft.ServiceBus",
    packageName: constants_js_1.packageJsonInfo.name,
    packageVersion: constants_js_1.packageJsonInfo.version,
});
/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param serviceBusConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @param operation - The operation type.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
function toSpanOptions(serviceBusConfig, operation, spanKind) {
    const propertyName = operation === "process" || operation === "receive"
        ? "messaging.source.name"
        : "messaging.destination.name";
    const spanOptions = {
        spanAttributes: {
            "messaging.system": "servicebus",
            [propertyName]: serviceBusConfig.entityPath,
            "messaging.operation": operation,
            "net.peer.name": serviceBusConfig.host,
        },
    };
    if (spanKind) {
        spanOptions.spanKind = spanKind;
    }
    return spanOptions;
}
//# sourceMappingURL=tracing.js.map