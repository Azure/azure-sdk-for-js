// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VaultsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsListBySubscriptionIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VaultsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VaultsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface VaultsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface VaultsGetOptionalParams extends OperationOptions {}
