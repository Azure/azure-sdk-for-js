// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions, RestError } from "@azure/core-http";
import { getTracer } from "@azure/core-tracing";
import { CanonicalCode, Span, SpanKind, SpanOptions as OTSpanOptions } from "@opentelemetry/api";

/**
 * @internal
 * @ignore
 * Creates a span using the global tracer.
 * @param name The name of the operation being performed.
 * @param operationOptions The options for the underlying http request.
 */
export function createSpan(
  operationName: string,
  operationOptions: OperationOptions = {}
): { span: Span; updatedOperationOptions: OperationOptions } {
  const tracer = getTracer();
  const spanOptions: OTSpanOptions = {
    ...operationOptions.tracingOptions?.spanOptions,
    kind: SpanKind.INTERNAL
  };

  const span = tracer.startSpan(`Azure.ServiceBus.${operationName}`, spanOptions);
  span.setAttribute("az.namespace", "Microsoft.ServiceBus");

  let newSpanOptions = operationOptions.tracingOptions?.spanOptions || {};
  if (span.isRecording()) {
    newSpanOptions = {
      ...operationOptions.tracingOptions?.spanOptions,
      parent: span.context(),
      attributes: {
        ...spanOptions.attributes,
        "az.namespace": "Microsoft.ServiceBus"
      }
    };
  }

  return {
    span,
    updatedOperationOptions: {
      ...operationOptions,
      tracingOptions: { ...operationOptions?.tracingOptions, spanOptions: newSpanOptions }
    }
  };
}

/**
 * @internal
 * @ignore
 */
export function getCanonicalCode(err: Error) {
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
