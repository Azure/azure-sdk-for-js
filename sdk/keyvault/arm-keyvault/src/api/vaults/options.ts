// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VaultsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsListOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface VaultsListDeletedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsPurgeDeletedOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VaultsGetDeletedOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsUpdateAccessPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsListBySubscriptionOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface VaultsListByResourceGroupOptionalParams extends OperationOptions {
  /** Maximum number of results to return. */
  top?: number;
}

/** Optional parameters. */
export interface VaultsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VaultsGetOptionalParams extends OperationOptions {}
