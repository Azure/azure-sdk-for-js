// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RouteFiltersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteFiltersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteFiltersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RouteFiltersUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteFiltersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RouteFiltersGetOptionalParams extends OperationOptions {
  /** Expands referenced express route bgp peering resources. */
  expand?: string;
}
