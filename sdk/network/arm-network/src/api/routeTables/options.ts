// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RouteTablesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteTablesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteTablesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RouteTablesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RouteTablesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RouteTablesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
