// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// NOTE: we've moved this code into core-tracing but these functions
// were a part of the GA'd library and can't be removed until the next major
// release. They currently get called always, even if tracing is not enabled.

import { Span, createSpanFunction as coreTracingCreateSpanFunction } from "@azure/core-tracing";
import { OperationOptions } from "./operationOptions";

/**
 * This function is only here for compatibility. Use createSpanFunction in core-tracing.
 *
 * @deprecated This function is only here for compatibility. Use core-tracing instead.
 * @hidden
 */
export interface SpanConfig {
  /**
   * Package name prefix
   */
  packagePrefix: string;
  /**
   * Service namespace
   */
  namespace: string;
}

/**
 * This function is only here for compatibility. Use createSpanFunction in core-tracing.
 *
 * @deprecated This function is only here for compatibility. Use createSpanFunction in core-tracing.
 * @hidden

 * @param spanConfig - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 */
export function createSpanFunction(
  args: SpanConfig
): <T extends OperationOptions>(
  operationName: string,
  operationOptions: T
) => { span: Span; updatedOptions: T } {
  return coreTracingCreateSpanFunction(args);
}
