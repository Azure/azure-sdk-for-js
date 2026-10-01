// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClustersListAvailableClusterRegionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListNamespacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersGetOptionalParams extends OperationOptions {}
