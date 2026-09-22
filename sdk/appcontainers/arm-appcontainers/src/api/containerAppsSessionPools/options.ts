// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsSessionPoolsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsSessionPoolsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsSessionPoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsSessionPoolsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsSessionPoolsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ContainerAppsSessionPoolsGetOptionalParams extends OperationOptions {}
