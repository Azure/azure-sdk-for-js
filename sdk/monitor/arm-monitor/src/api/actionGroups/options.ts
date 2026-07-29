// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ActionGroupsReconcileNSPOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActionGroupsListNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsGetNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsEnableReceiverOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsGetTestNotificationsAtActionGroupResourceLevelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsCreateNotificationsAtActionGroupResourceLevelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActionGroupsListBySubscriptionIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActionGroupsGetOptionalParams extends OperationOptions {}
