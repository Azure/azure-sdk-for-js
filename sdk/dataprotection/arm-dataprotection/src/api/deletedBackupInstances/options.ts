// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeletedBackupInstancesUndeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeletedBackupInstancesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeletedBackupInstancesGetOptionalParams extends OperationOptions {}
