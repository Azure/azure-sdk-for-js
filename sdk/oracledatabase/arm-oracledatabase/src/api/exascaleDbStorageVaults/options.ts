// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExascaleDbStorageVaultsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExascaleDbStorageVaultsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ExascaleDbStorageVaultsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExascaleDbStorageVaultsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExascaleDbStorageVaultsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExascaleDbStorageVaultsGetOptionalParams extends OperationOptions {}
