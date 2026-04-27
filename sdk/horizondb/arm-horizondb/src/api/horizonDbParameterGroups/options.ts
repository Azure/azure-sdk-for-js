// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HorizonDbParameterGroupsListVersionsOptionalParams extends OperationOptions {
  /** The version number to filter by. */
  version?: number;
}

/** Optional parameters. */
export interface HorizonDbParameterGroupsListConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HorizonDbParameterGroupsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HorizonDbParameterGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HorizonDbParameterGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HorizonDbParameterGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HorizonDbParameterGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HorizonDbParameterGroupsGetOptionalParams extends OperationOptions {}
