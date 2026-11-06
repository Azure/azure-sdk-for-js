// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionsListPendingFlowsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionsLinkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionsGetOptionalParams extends OperationOptions {}
