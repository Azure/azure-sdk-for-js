import { RestError } from "@azure/core-http";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTracer, OperationTracingOptions, SpanOptions } from "@azure/core-tracing";
import { Span, SpanOptions as OTSpanOptions, SpanKind, CanonicalCode } from "@opentelemetry/api";

/**
 * Creates a span using the global tracer.
 * @param name The name of the operation being performed.
 * @param tracingOptions The options for the underlying http request.
 */
export function createSpan(
  operationName: string,
  tracingOptions: OperationTracingOptions = {}
): { span: Span; spanOptions: SpanOptions } {
  const tracer = getTracer();
  const spanOptions: OTSpanOptions = {
    ...tracingOptions.spanOptions,
    kind: SpanKind.INTERNAL
  };

  const span = tracer.startSpan(`Azure.ServiceBus.${operationName}`, spanOptions);
  span.setAttribute("az.namespace", "Microsoft.ServiceBus");

  let newOptions = tracingOptions.spanOptions || {};
  if (span.isRecording()) {
    newOptions = {
      ...tracingOptions.spanOptions,
      parent: span.context(),
      attributes: {
        ...spanOptions.attributes,
        "az.namespace": "Microsoft.ServiceBus"
      }
    };
  }

  return {
    span,
    spanOptions: newOptions
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
