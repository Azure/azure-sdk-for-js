// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedPrivateLinkResourcesListByWatcherOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TargetsListByWatcherOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TargetsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TargetsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TargetsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HealthValidationsStartValidationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HealthValidationsListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HealthValidationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertRuleResourcesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertRuleResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertRuleResourcesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertRuleResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatchersStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WatchersStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WatchersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatchersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatchersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WatchersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WatchersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WatchersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}
