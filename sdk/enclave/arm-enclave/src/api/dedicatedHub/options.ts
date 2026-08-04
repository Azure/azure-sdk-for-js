// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DedicatedHubListBySubscriptionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface DedicatedHubListByCommunityResourceOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface DedicatedHubDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface DedicatedHubUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface DedicatedHubCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface DedicatedHubGetOptionalParams extends OperationOptions {}
