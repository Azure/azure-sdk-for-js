// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExecuteWithResourceIdOptionalParams extends OperationOptions {
  /**
   * Optional. The prefer header to set server timeout, query statistics and
   * visualization information.
   */
  prefer?: string;
}

/** Optional parameters. */
export interface ExecuteOptionalParams extends OperationOptions {
  /** Optional. The prefer header to set server timeout, query statistics and visualization information. */
  prefer?: string;
}
