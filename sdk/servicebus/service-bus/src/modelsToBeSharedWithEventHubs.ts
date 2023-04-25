// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: this code is a straight-copy from EventHubs. Need to merge.

import { OperationTracingOptions } from "@azure/core-tracing";
import { OperationOptions } from "@azure/core-client";

/**
 * NOTE: This type is intended to mirror the relevant fields and structure from `@azure/core-client` OperationOptions
 *
 * Options for configuring tracing and the abortSignal.
 */
export type OperationOptionsBase = Pick<OperationOptions, "abortSignal" | "tracingOptions">;

/**
 * The set of options to manually propagate `Span` context for distributed tracing.
 */
export interface TryAddOptions {
  /**
   * The options to use when creating Spans for tracing.
   */
  tracingOptions?: OperationTracingOptions;
}
