// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { AbortSignalLike } from "@azure/abort-controller";
import { Span, SpanContext } from "@opentelemetry/api";
import { OperationTracingOptions } from "@azure/core-tracing";

/**
 * Options for configuring tracing and the abortSignal.
 */
// NOTE: This class is intended to mirror the relevant fields and structure from
// @azure/core-http OperationOptions
export interface OperationOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Options for configuring tracing.
   */
  tracingOptions?: OperationTracingOptions;
}

/**
 * @internal
 * @ignore
 */
export function getParentSpan(
  options: Pick<OperationOptions, "tracingOptions">
): Span | SpanContext | null | undefined {
  return options.tracingOptions?.spanOptions?.parent;
}
