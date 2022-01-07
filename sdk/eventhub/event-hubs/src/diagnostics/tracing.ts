// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingSpan, TracingSpanOptions } from "@azure/core-tracing";
import { EventHubConnectionConfig } from "../eventhubConnectionConfig";
import { OperationOptions } from "../util/operationOptions";

export const tracingClient = createTracingClient({
  namespace: "Azure.EventHubs",
  packageName: "@azure/event-hubs",
});

/**
 * Creates an EventHubs specific span, with peer.address and message_bus.destination filled out.
 * @internal
 */
export function createEventHubSpan(
  operationName: string,
  operationOptions: OperationOptions | undefined,
  connectionConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">,
  additionalSpanOptions?: TracingSpanOptions
): { span: TracingSpan; updatedOptions: OperationOptions } {
  const { span, updatedOptions } = tracingClient.startSpan(operationName, {
    ...operationOptions,
    tracingOptions: {
      ...operationOptions?.tracingOptions,
      spanOptions: {
        // By passing spanOptions if they exist at runtime, we're backwards compatible with @azure/core-tracing@preview.13 and earlier.
        ...(operationOptions?.tracingOptions as any)?.spanOptions,
        ...additionalSpanOptions,
      },
    },
  });

  span.setAttribute("message_bus.destination", connectionConfig.entityPath);
  span.setAttribute("peer.address", connectionConfig.host);

  return {
    span,
    updatedOptions,
  };
}

/**
 * @internal
 */
export function createMessageSpan(
  operationOptions: OperationOptions,
  eventHubConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">
): ReturnType<typeof createEventHubSpan> {
  return createEventHubSpan("message", operationOptions, eventHubConfig, {
    spanKind: "producer",
  });
}
