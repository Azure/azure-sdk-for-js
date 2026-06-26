// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WatchlistItemsListOptionalParams extends OperationOptions {
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional. */
  skipToken?: string;
}

/** Optional parameters. */
export interface WatchlistItemsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatchlistItemsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WatchlistItemsGetOptionalParams extends OperationOptions {}
