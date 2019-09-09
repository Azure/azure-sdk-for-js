// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracerProxy, Span, SupportedPlugins, GetTokenOptions } from "@azure/core-http";

/**
 * Creates a span with the given name and spanOptions.
 *
 * @param name Name of the span
 * @param spanOptions Span Options
 */
export function createSpan(name: string, options?: GetTokenOptions): Span {
  const spanOptions = options && options.spanOptions;
  const tracer = TracerProxy.getTracer();
  const span = tracer.startSpan(name, spanOptions);
  return span;
}

/**
 * Modify the span options of the options to the new parent span.
 *
 * @param span Span to be assigned as parent span
 * @param options options to be modified
 */

export function modifySpanOptions(span: Span, options?: GetTokenOptions): GetTokenOptions {
  if (!options) {
    options = {};
  }
  options.spanOptions = {
    ...options.spanOptions,
    parent: span
  };

  return options;
}
