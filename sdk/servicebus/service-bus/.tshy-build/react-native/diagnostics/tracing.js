// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createTracingClient } from "@azure/core-tracing";
import { packageJsonInfo } from "../util/constants.js";
/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
export const tracingClient = createTracingClient({
    namespace: "Microsoft.ServiceBus",
    packageName: packageJsonInfo.name,
    packageVersion: packageJsonInfo.version,
});
/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param serviceBusConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @param operation - The operation type.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
export function toSpanOptions(serviceBusConfig, operation, spanKind) {
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