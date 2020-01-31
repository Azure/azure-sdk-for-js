// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { Span, SpanContext, SpanOptions } from "@opentelemetry/types";

/**
 * Options for configuring tracing.
 */
export interface TracingOptions {
  /**
   * Options for configuring tracing.
   */
  tracingOptions?: {
    /**
     * OpenTelemetry SpanOptions used to create a span when tracing is enabled.
     */
    spanOptions?: SpanOptions;
  };
}

/**
 * Options for configuring tracing and the abortSignal.
 */
// NOTE: This class is intended to mirror the relevant fields and structure from
// @azure/core-http OperationOptions
export interface OperationOptions extends TracingOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * @internal
 * @ignore
 */
export function getParentSpan(
  options?: Pick<OperationOptions, "tracingOptions">
): Span | SpanContext | undefined {
  return (
    options &&
    options.tracingOptions &&
    options.tracingOptions.spanOptions &&
    options.tracingOptions.spanOptions.parent
  );
}
