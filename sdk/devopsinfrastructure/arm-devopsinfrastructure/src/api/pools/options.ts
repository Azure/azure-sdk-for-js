// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PoolsDeleteResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoolsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoolsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoolsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoolsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoolsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PoolsGetOptionalParams extends OperationOptions {}
