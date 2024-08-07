// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import { EventHubConnectionConfig } from "../eventhubConnectionConfig.js";
import { packageJsonInfo } from "../util/constants.js";

/**
 * The names of the operations that can be instrumented.
 */
export type MessagingOperationNames = "publish" | "receive" | "process";

/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.EventHub",
  packageName: packageJsonInfo.name,
  packageVersion: packageJsonInfo.version,
});

/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param eventHubConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @param operation - The operation type.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
export function toSpanOptions(
  eventHubConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">,
  operation?: MessagingOperationNames,
  spanKind?: TracingSpanKind,
): TracingSpanOptions {
  const propertyName =
    operation === "process" || operation === "receive"
      ? "messaging.source.name"
      : "messaging.destination.name";

  const spanAttributes = {
    "messaging.system": "eventhubs",
    [propertyName]: eventHubConfig.entityPath,
    "net.peer.name": eventHubConfig.host,
  };

  if (operation) {
    spanAttributes["messaging.operation"] = operation;
  }

  const spanOptions: TracingSpanOptions = {
    spanAttributes: spanAttributes,
  };
  if (spanKind) {
    spanOptions.spanKind = spanKind;
  }
  return spanOptions;
}
