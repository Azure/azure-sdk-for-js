// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getTracer, Span, GetTokenOptions } from "@azure/core-http";

/**
 * Creates a span using the global tracer.
 * @param name The name of the span being created.
 * @param options The options for the underlying http request.
 */
export function createSpan(name: string, options: GetTokenOptions = {}): { span: Span, options: GetTokenOptions } {
  const tracer = getTracer();
  const span = tracer.startSpan(name, options.spanOptions);
  let newOptions = options;
  if (span.isRecordingEvents()) {
    newOptions = {
      ...options,
      spanOptions: {
        ...options.spanOptions,
        parent: span,
      }
    };
  }

  return {
    span,
    options: newOptions
  }
}
