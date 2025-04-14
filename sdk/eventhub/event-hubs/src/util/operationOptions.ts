// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationTracingOptions } from "@azure/core-tracing";

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
