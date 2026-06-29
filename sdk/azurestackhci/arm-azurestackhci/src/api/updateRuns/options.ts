// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UpdateRunsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateRunsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UpdateRunsPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateRunsGetOptionalParams extends OperationOptions {}
