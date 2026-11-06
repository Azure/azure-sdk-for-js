// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorePointsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RestorePointsListByDatabaseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorePointsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorePointsGetOptionalParams extends OperationOptions {}
