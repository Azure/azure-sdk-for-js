// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiskRestorePointRevokeAccessOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskRestorePointGrantAccessOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskRestorePointListByRestorePointOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskRestorePointGetOptionalParams extends OperationOptions {}
