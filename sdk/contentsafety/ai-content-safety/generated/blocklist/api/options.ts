// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RemoveBlocklistItemsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListTextBlocklistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListTextBlocklistItemsOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetTextBlocklistItemOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetTextBlocklistOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteTextBlocklistOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateTextBlocklistOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AddOrUpdateBlocklistItemsOptionalParams extends OperationOptions {}
