// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-http";
import { getTracer, OperationTracingOptions } from "@azure/core-tracing";
import { Span, SpanKind, SpanOptions as OTSpanOptions } from "@opentelemetry/api";

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

  const tracingOptions: OperationTracingOptions = {
    spanOptions: {},
    ...options.tracingOptions
  };

  const spanOptions: OTSpanOptions = {
    ...tracingOptions.spanOptions,
    kind: SpanKind.INTERNAL
  };

  const span = tracer.startSpan(`Azure.Identity.${operationName}`, spanOptions);
  span.setAttribute("az.namespace", "Microsoft.AAD");

  let newOptions = options;
  if (span.isRecording()) {
    newOptions = {
      ...options,
      tracingOptions: {
        ...tracingOptions,
        spanOptions: {
          ...tracingOptions.spanOptions,
          parent: span.context(),
          attributes: {
            ...spanOptions.attributes,
            "az.namespace": "Microsoft.AAD"
          }
        }
      }
    };
  }

  return {
    span,
    options: newOptions
  };
}
