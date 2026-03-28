// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContentItemListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContentItemDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContentItemCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ContentItemGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContentItemGetOptionalParams extends OperationOptions {}
