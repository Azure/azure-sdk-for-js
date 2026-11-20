// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AlertsSimulateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AlertsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateResourceGroupLevelStateToActivateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateResourceGroupLevelStateToDismissOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateResourceGroupLevelStateToResolveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsListResourceGroupLevelByRegionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetResourceGroupLevelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateSubscriptionLevelStateToActivateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateSubscriptionLevelStateToResolveOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsUpdateSubscriptionLevelStateToDismissOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsListSubscriptionLevelByRegionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsGetSubscriptionLevelOptionalParams extends OperationOptions {}
