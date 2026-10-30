// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ParameterGroupsListConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ParameterGroupsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ParameterGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ParameterGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ParameterGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ParameterGroupsCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ParameterGroupsGetOptionalParams extends OperationOptions {}
