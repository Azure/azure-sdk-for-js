// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudAccountsLatestLinkedSaaSOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudAccountsLinkSaaSOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudAccountsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudAccountsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloudAccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudAccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudAccountsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudAccountsGetOptionalParams extends OperationOptions {}
