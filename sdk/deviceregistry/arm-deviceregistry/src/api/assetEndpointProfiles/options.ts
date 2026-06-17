// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

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
