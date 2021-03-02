// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction, SpanOptions } from "@azure/core-tracing";
import { Span, SpanKind } from "@opentelemetry/api";
import { EventHubConnectionConfig } from "../eventhubConnectionConfig";
import { OperationOptions } from "../util/operationOptions";

const _createSpan = createSpanFunction({
  namespace: "Microsoft.EventHub",
  packagePrefix: "Azure.EventHubs"
});

/**
 * Creates an EventHubs specific span, with peer.address and message_bus.destination filled out.
 * @internal
 */
export function createEventHubSpan(
  operationName: string,
  operationOptions: OperationOptions | undefined,
  connectionConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">,
  additionalSpanOptions?: SpanOptions
): { span: Span; updatedOptions: OperationOptions } {
  const { span, updatedOptions } = _createSpan(operationName, {
    ...operationOptions,
    tracingOptions: {
      ...operationOptions?.tracingOptions,
      spanOptions: {
        ...operationOptions?.tracingOptions?.spanOptions,
        ...additionalSpanOptions
      }
    }
  });

  span.setAttribute("message_bus.destination", connectionConfig.entityPath);
  span.setAttribute("peer.address", connectionConfig.host);

  return {
    span,
    updatedOptions
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
    kind: SpanKind.PRODUCER
  });
}
