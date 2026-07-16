// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LaunchBulkInstancesOperationListVirtualMachinesOptionalParams extends OperationOptions {
  /** Filter expression to filter the virtual machines. */
  filter?: string;
  /** Skip token for pagination. Uses the token from a previous response to fetch the next page of results. */
  skiptoken?: string;
}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationListBySubscriptionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationListByResourceGroupOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** When true, deletes all virtual machines created by this BulkAction Operation. */
  deleteInstances?: boolean;
}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationGetOperationStatusOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface LaunchBulkInstancesOperationGetOptionalParams extends OperationOptions {}
