// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueryLogsOptions extends OperationOptions {
  /**
   * Optional. The prefer header to set server timeout, query statistics and
   * visualization information.
   */
  prefer?: string;
}

/** Optional parameters. */
export interface ExecuteWithResourceIdOptionalParams extends QueryLogsOptions {}

/** Optional parameters. */
export interface ExecuteOptionalParams extends QueryLogsOptions {}
