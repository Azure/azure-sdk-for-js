// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiAgentsGroupsConnectOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AiAgentsGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface AiAgentsGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface AiAgentsGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface AiAgentsGroupsGetOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AiAgentsGroupsListByResourceGroupOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AiAgentsGroupsListBySubscriptionOptionalParams extends OperationOptions {}
