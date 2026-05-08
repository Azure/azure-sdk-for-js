// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HorizonDbClustersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HorizonDbClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HorizonDbClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HorizonDbClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HorizonDbClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HorizonDbClustersGetOptionalParams extends OperationOptions {}
