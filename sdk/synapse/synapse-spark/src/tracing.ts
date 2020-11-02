// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer } from "@azure/core-tracing";
import { CanonicalCode, Span, SpanOptions, SpanKind } from "@opentelemetry/api";
import { OperationOptions, RestError } from "@azure/core-http";

type OperationTracingOptions = OperationOptions["tracingOptions"];

/**
 * Creates a span using the global tracer.
 * @ignore
 * @param name The name of the operation being performed.
 * @param tracingOptions The options for the underlying http request.
 */
export function createSpan<T extends OperationOptions>(
  operationName: string,
  operationOptions: T
): { span: Span; updatedOptions: T } {
  const tracer = getTracer();
  const tracingOptions = operationOptions.tracingOptions || {};
  const spanOptions: SpanOptions = {
    ...tracingOptions.spanOptions,
    kind: SpanKind.INTERNAL
  };

  const span = tracer.startSpan(`Azure.Synapse.${operationName}`, spanOptions);

  span.setAttribute("az.namespace", "Microsoft.Synapse");

  let newSpanOptions = tracingOptions.spanOptions || {};
  if (span.isRecording()) {
    newSpanOptions = {
      ...tracingOptions.spanOptions,
      parent: span.context(),
      attributes: {
        ...spanOptions.attributes,
        "az.namespace": "Microsoft.Synapse"
      }
    };
  }

  const newTracingOptions: OperationTracingOptions = {
    ...tracingOptions,
    spanOptions: newSpanOptions
  };

  const newOperationOptions: T = {
    ...operationOptions,
    tracingOptions: newTracingOptions
  };

  return {
    span,
    updatedOptions: newOperationOptions
  };
}

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
