// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TasksListOptionalParams extends OperationOptions {
  /** OData filter. Optional. */
  filter?: string;
}

/** Optional parameters. */
export interface TasksUpdateSubscriptionLevelTaskStateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksListByHomeRegionOptionalParams extends OperationOptions {
  /** OData filter. Optional. */
  filter?: string;
}

/** Optional parameters. */
export interface TasksGetSubscriptionLevelTaskOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksUpdateResourceGroupLevelTaskStateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TasksListByResourceGroupOptionalParams extends OperationOptions {
  /** OData filter. Optional. */
  filter?: string;
}

/** Optional parameters. */
export interface TasksGetResourceGroupLevelTaskOptionalParams extends OperationOptions {}
