// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationTracingOptions, TracingSpan } from "./interfaces";
import { NoOpSpan } from "./tracer";
import { createTracingContext } from "./tracingContext";

/**
 * Creates a function that can be used to create spans using the global tracer.
 *
 * @deprecated this will return a no-op span. Please use methods on `tracingClient` instead.
 */
export function createSpanFunction(..._args: unknown[]) {
  return function<T extends { tracingOptions?: OperationTracingOptions }>(
    _operationName: string,
    operationOptions?: T
  ): { span: TracingSpan; updatedOptions: T } {
    let tracingOptions = operationOptions?.tracingOptions || {};
    tracingOptions = {
      ...tracingOptions,
      tracingContext: tracingOptions.tracingContext || createTracingContext()
    };
    const span = new NoOpSpan();

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
