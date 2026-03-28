// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CacheListByServiceOptionalParams extends OperationOptions {
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface CacheDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CacheUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CacheCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface CacheGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CacheGetOptionalParams extends OperationOptions {}
