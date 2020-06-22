// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { Span, SpanContext } from "@opentelemetry/api";
import { OperationOptions as OperationOptionsForHTTP } from "@azure/core-http";

/**
 * Options for configuring tracing and the abortSignal.
 */
// NOTE: This class is intended to mirror the relevant fields and structure from
// @azure/core-http OperationOptions
export type OperationOptions = Exclude<OperationOptionsForHTTP, "requestOptions">;

/**
 * @internal
 * @ignore
 */
export function getParentSpan(
  options: Pick<OperationOptions, "tracingOptions">
): Span | SpanContext | null | undefined {
  return options.tracingOptions?.spanOptions?.parent;
}
