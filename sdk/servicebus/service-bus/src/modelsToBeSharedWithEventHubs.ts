// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { Span, SpanContext } from "@opentelemetry/api";
import { OperationOptions } from "@azure/core-http";

/**
 * Options for configuring tracing and the abortSignal.
 */
// NOTE: This class is intended to mirror the relevant fields and structure from
// @azure/core-http OperationOptions
export type AMQPOperationOptions = Pick<OperationOptions, "abortSignal" | "tracingOptions">;
export { OperationOptions };

/**
 * @internal
 * @ignore
 */
export function getParentSpan(
  options: Pick<AMQPOperationOptions, "tracingOptions">
): Span | SpanContext | null | undefined {
  return options.tracingOptions?.spanOptions?.parent;
}
