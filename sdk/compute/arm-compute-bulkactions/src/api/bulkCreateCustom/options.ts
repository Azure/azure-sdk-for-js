// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BulkCreateCustomListBySubscriptionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface BulkCreateCustomListByResourceGroupOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface BulkCreateCustomCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface BulkCreateCustomDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** When true, deletes all virtual machines created by this BulkAction Operation. */
  deleteInstances?: boolean;
}
/** Optional parameters. */
export interface BulkCreateCustomCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface BulkCreateCustomGetAsyncOperationStatusOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface BulkCreateCustomGetOptionalParams extends OperationOptions {}
