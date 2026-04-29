// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GarnetClustersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GarnetClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GarnetClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GarnetClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GarnetClustersCreateUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GarnetClustersGetOptionalParams extends OperationOptions {}
