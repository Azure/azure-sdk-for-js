// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer } from "@azure/core-tracing";
import { Span, SpanOptions, SpanKind } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-http";

type OperationTracingOptions = OperationOptions["tracingOptions"];

/**
 * Creates a span using the global tracer.
 * @internal
 * @param name - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
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

  const span = tracer.startSpan(`Azure.Data.Tables.${operationName}`, spanOptions);

  span.setAttribute("az.namespace", "Microsoft.Data.Tables");

  let newSpanOptions = tracingOptions.spanOptions || {};
  if (span.isRecording()) {
    newSpanOptions = {
      ...tracingOptions.spanOptions,
      parent: span.context(),
      attributes: {
        ...spanOptions.attributes,
        "az.namespace": "Microsoft.Data.Tables"
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
