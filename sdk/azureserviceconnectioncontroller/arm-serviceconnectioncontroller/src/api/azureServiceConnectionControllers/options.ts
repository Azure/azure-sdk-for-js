// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AzureServiceConnectionControllersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureServiceConnectionControllersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureServiceConnectionControllersUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureServiceConnectionControllersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureServiceConnectionControllersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureServiceConnectionControllersGetOptionalParams extends OperationOptions {}
