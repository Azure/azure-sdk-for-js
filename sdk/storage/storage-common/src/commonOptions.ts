// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationTracingOptions } from "@azure/core-tracing";

/**
 * An interface for options common to every remote operation.
 */
export interface CommonOptions {
  /**
   * Options to configure spans created when tracing is enabled.
   */
  tracingOptions?: OperationTracingOptions;
}
