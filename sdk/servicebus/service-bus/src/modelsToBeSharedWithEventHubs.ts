// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { Span, SpanContext } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-http";
import { OperationTracingOptions } from "@azure/core-tracing";

/**
 * NOTE: This type is intended to mirror the relevant fields and structure from @azure/core-http OperationOptions
 *
 * Options for configuring tracing and the abortSignal.
 */
export type OperationOptionsBase = Pick<OperationOptions, "abortSignal" | "tracingOptions">;

/**
 * @internal
 * @ignore
 */
export function getParentSpan(
  options?: OperationTracingOptions
): Span | SpanContext | null | undefined {
  return options?.spanOptions?.parent;
}

/**
 * The set of options to manually propagate `Span` context for distributed tracing.
 */
export interface TryAddOptions {
  /**
   * The `Span` or `SpanContext` to use as the `parent` of any spans created while calling operations that make a request to the service.
   */
  parentSpan?: Span | SpanContext | null;
}
