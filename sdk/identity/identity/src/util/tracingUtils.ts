// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TracerProxy, Span, SupportedPlugins, GetTokenOptions } from "@azure/core-http";

/**
 * Creates a span with the given name and spanOptions.
 *
 * @param name Name of the span
 * @param spanOptions Span Options
 */
export function createSpan(name: string, spanOptions: any): Span {
  const tracer = TracerProxy.getTracer();
  const span = tracer.startSpan(name, spanOptions);
  if (tracer.pluginType !== SupportedPlugins.NOOP && (spanOptions && spanOptions.parent)) {
    spanOptions = { ...spanOptions, parent: span };
  }
  return span;
}

/**
 * Gets the Span Options from the Token options. If none exists, returns
 * an empty object.
 *
 * @param options Token options from which the span options must be extracted.
 */
export function getSpanOptions(options?: GetTokenOptions): any {
  if (!options) {
    options = {};
  }

  if (!options.spanOptions) {
    options.spanOptions = {};
  }

  return options.spanOptions;
}
