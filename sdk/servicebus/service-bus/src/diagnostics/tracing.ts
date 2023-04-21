// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import { ConnectionConfig } from "@azure/core-amqp";
import { packageJsonInfo } from "../util/constants";

/**
 * The names of the operations that can be instrumented.
 */
export type MessagingOperationNames = "publish" | "receive" | "process" | "settle";

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
export function toSpanOptions(
  serviceBusConfig: Pick<ConnectionConfig, "host"> & { entityPath: string },
  operation: MessagingOperationNames,
  spanKind?: TracingSpanKind
): TracingSpanOptions {
  const propertyName =
    operation === "process" || operation === "receive"
      ? "messaging.source.name"
      : "messaging.destination.name";

  const spanOptions: TracingSpanOptions = {
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
