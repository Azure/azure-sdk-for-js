// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, RestError } from "@azure/core-http";
import { CanonicalCode, Span, SpanKind } from "@opentelemetry/api";
import { createSpanFunction, SpanOptions } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.ServiceBus",
  namespace: "Microsoft.ServiceBus"
});

/**
 * @internal
 */
export function getCanonicalCode(err: Error): CanonicalCode {
  if (err instanceof RestError) {
    switch (err.statusCode) {
      case 401:
        return CanonicalCode.PERMISSION_DENIED;
      case 404:
        return CanonicalCode.NOT_FOUND;
      case 412:
        return CanonicalCode.FAILED_PRECONDITION;
    }
  }

  return CanonicalCode.UNKNOWN;
}

/**
 * @internal
 */
export function createMessageSpan(
  operationOptions: OperationOptions,
  entityPath: string,
  host: string
): ReturnType<typeof createServiceBusSpan> {
  return createServiceBusSpan("message", operationOptions, entityPath, host, {
    kind: SpanKind.PRODUCER
  });
}

/**
 * Creates an EventHubs specific span, with peer.address and message_bus.destination filled out.
 * @internal
 */
export function createServiceBusSpan(
  operationName: string,
  operationOptions: OperationOptions | undefined,
  entityPath: string,
  host: string,
  additionalSpanOptions?: SpanOptions
): { span: Span; updatedOptions: OperationOptions } {
  const { span, updatedOptions } = createSpan(operationName, {
    ...operationOptions,
    tracingOptions: {
      ...operationOptions?.tracingOptions,
      spanOptions: {
        ...operationOptions?.tracingOptions?.spanOptions,
        ...additionalSpanOptions
      }
    }
  });

  span.setAttribute("message_bus.destination", entityPath);
  span.setAttribute("peer.address", host);

  return {
    span,
    updatedOptions
  };
}
