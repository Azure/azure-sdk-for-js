// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GetTokenOptions } from "@azure/core-http";
import { getTracer, Span, SpanOptions, SpanKind } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @param name The name of the operation being performed.
 * @param options The options for the underlying http request.
 */
export function createSpan(
  operationName: string,
  options: GetTokenOptions = {}
): { span: Span; options: GetTokenOptions } {
  const tracer = getTracer();

  const tracingOptions = {
    spanOptions: {},
    ...options.tracingOptions
  };

  tracingOptions.spanOptions = {
    ...tracingOptions.spanOptions,
    kind: SpanKind.CLIENT
  };

  const span = tracer.startSpan(`Azure.Identity.${operationName}`, tracingOptions.spanOptions);
  span.setAttribute("component", "identity");

  let newOptions = options;
  if (span.isRecordingEvents()) {
    newOptions = {
      ...options,
      tracingOptions: {
        ...tracingOptions,
        spanOptions: {
          ...tracingOptions.spanOptions,
          parent: span
        }
      }
    };
  }

  return {
    span,
    options: newOptions
  };
}
