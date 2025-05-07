// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BillingContainersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingContainersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssetEndpointProfilesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssetEndpointProfilesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssetEndpointProfilesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssetEndpointProfilesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssetEndpointProfilesCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssetEndpointProfilesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssetsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssetsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssetsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssetsCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AssetsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationStatusGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}
