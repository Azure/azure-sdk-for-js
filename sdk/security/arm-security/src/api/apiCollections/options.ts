// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface APICollectionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface APICollectionsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface APICollectionsListByAzureApiManagementServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface APICollectionsOffboardAzureApiManagementApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface APICollectionsOnboardAzureApiManagementApiOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface APICollectionsGetByAzureApiManagementServiceOptionalParams extends OperationOptions {}
