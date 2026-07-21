// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageTargetsRestoreDefaultsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageTargetsDnsRefreshOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageTargetsListByCacheOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageTargetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Boolean value requesting the force delete operation for a storage target. Force delete discards unwritten-data in the cache instead of flushing it to back-end storage. */
  force?: string;
}

/** Optional parameters. */
export interface StorageTargetsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageTargetsGetOptionalParams extends OperationOptions {}
