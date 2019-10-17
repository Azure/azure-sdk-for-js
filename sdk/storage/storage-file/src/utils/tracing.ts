// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTracer, Span, SpanOptions, SpanKind } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @param name The name of the operation being performed.
 * @param options The options for the underlying http request.
 */
export function createSpan(
  operationName: string,
  options: SpanOptions = {}
): { span: Span; spanOptions: SpanOptions } {
  const tracer = getTracer();
  const spanOptions: SpanOptions = {
    ...options,
    kind: SpanKind.CLIENT
  };

  const span = tracer.startSpan(`Azure.Storage.File.${operationName}`, spanOptions);
  span.setAttribute("component", "storage");

  let newOptions = options;
  if (span.isRecordingEvents()) {
    newOptions = {
      ...options,
      parent: span
    };
  }

  return {
    span,
    spanOptions: newOptions
  };
}
