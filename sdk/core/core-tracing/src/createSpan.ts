// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationTracingOptions, TracingSpan } from "./interfaces";
import { NoOpSpan } from "./tracer";
import { createTracingContext } from "./tracingContext";
import { Span, trace, SpanStatusCode } from "@opentelemetry/api";

/**
 * Arguments for `createSpanFunction` that allow you to specify the
 * prefix for each created span as well as the `az.namespace` attribute.
 *
 * @hidden
 */
export interface CreateSpanFunctionArgs {
  /**
   * Package name prefix.
   *
   * NOTE: if this is empty no prefix will be applied to created Span names.
   */
  packagePrefix: string;
  /**
   * Service namespace
   *
   * NOTE: if this is empty no `az.namespace` attribute will be added to created Spans.
   */
  namespace: string;
}

/**
 * Checks whether tracing is disabled by checking the `AZURE_TRACING_DISABLED` environment variable.
 *
 * @returns - `true` if tracing is disabled, `false` otherwise.
 *
 * @internal
 */
export function isTracingDisabled(): boolean {
  if (typeof process === "undefined") {
    // not supported in browser for now without polyfills
    return false;
  }

  const azureTracingDisabledValue = process.env.AZURE_TRACING_DISABLED?.toLowerCase();

  if (azureTracingDisabledValue === "false" || azureTracingDisabledValue === "0") {
    return false;
  }

  return Boolean(azureTracingDisabledValue);
}

/**
 * Creates a function that can be used to create spans using the global tracer.
 *
 * @deprecated this will return a no-op span. Please use methods on `tracingClient` instead.
 */
export function createSpanFunction(_args: any) {
  /**
   * Creates a span using the global tracer provider.
   *
   * @param operationName - The name of the operation to create a span for.
   * @param operationOptions - The operation options containing the currently active tracing context when using manual span propagation.
   * @param startSpanOptions - The options to use when creating the span, and will be passed to the tracer.startSpan method.
   *
   * @returns - A span from the global tracer provider, and an updatedOptions bag containing the new tracing context.
   *
   * Example usage:
   * ```ts
   * const { span, updatedOptions } = createSpan("deleteConfigurationSetting", operationOptions, startSpanOptions);
   * ```
   */
  return function<T extends { tracingOptions?: OperationTracingOptions }>(
    _operationName: string,
    operationOptions?: T
  ): { span: TracingSpan; updatedOptions: T } {
    let tracingOptions = operationOptions?.tracingOptions || {};
    tracingOptions = {
      ...tracingOptions,
      tracingContext: tracingOptions.tracingContext || createTracingContext()
    };
    let span = new NoOpSpan();

    const newOperationOptions = {
      ...(operationOptions as T),
      tracingOptions
    };

    return {
      span,
      updatedOptions: newOperationOptions
    };
  };
}
