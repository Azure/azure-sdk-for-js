// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiVersionSetListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ApiVersionSetDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiVersionSetUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiVersionSetCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiVersionSetGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiVersionSetGetOptionalParams extends OperationOptions {}
