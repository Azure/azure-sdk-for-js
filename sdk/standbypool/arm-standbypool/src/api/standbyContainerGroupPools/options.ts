// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StandbyContainerGroupPoolsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StandbyContainerGroupPoolsGetOptionalParams extends OperationOptions {}
