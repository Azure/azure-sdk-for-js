// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { Span, SpanContext } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-http";

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
  options: Pick<OperationOptionsBase, "tracingOptions">
): Span | SpanContext | null | undefined {
  return options.tracingOptions?.spanOptions?.parent;
}
