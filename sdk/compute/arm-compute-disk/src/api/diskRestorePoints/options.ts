// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiskRestorePointsRevokeAccessOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskRestorePointsGrantAccessOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskRestorePointsListByRestorePointOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskRestorePointsGetOptionalParams extends OperationOptions {}
