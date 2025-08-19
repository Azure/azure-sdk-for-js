// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageTasksPreviewActionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageTasksListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageTasksListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageTasksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageTasksUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageTasksCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageTasksGetOptionalParams extends OperationOptions {}
