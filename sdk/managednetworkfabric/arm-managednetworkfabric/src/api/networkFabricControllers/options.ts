// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkFabricControllersListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NetworkFabricControllersListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NetworkFabricControllersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkFabricControllersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkFabricControllersCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkFabricControllersGetOptionalParams extends OperationOptions {}
