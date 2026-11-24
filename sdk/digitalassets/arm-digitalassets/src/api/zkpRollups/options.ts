// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ZkpRollupsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ZkpRollupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ZkpRollupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ZkpRollupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ZkpRollupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ZkpRollupsGetOptionalParams extends OperationOptions {}
