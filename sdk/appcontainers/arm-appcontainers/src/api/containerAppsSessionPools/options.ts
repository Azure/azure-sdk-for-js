// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams extends OperationOptions {}

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
