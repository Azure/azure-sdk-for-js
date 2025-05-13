// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StoragePoolsRepairAvsConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsFinalizeAvsConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsDisableAvsConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsEnableAvsConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsGetAvsStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StoragePoolsGetAvsConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StoragePoolsGetHealthStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StoragePoolsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StoragePoolsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StoragePoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StoragePoolsGetOptionalParams extends OperationOptions {}
