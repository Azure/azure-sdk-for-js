// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTracer } from "@azure/core-tracing";
import { Span, SpanOptions, SpanKind } from "@opentelemetry/types";
import { OperationTracingOptions } from "../StorageClient";

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
  const spanOptions: SpanOptions = {
    ...tracingOptions.spanOptions,
    kind: SpanKind.INTERNAL
  };

  const span = tracer.startSpan(`Azure.Storage.Blob.${operationName}`, spanOptions);
  span.setAttribute("az.namespace", "Microsoft.Storage");

  let newOptions = tracingOptions.spanOptions || {};
  if (span.isRecording()) {
    newOptions = {
      ...tracingOptions.spanOptions,
      parent: span,
      attributes: {
        ...spanOptions.attributes,
        "az.namespace": "Microsoft.Storage"
      }
    };
  }

  return {
    span,
    spanOptions: newOptions
  };
}
