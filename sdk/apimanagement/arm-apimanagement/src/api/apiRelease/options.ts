// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiReleaseListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| notes | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ApiReleaseDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiReleaseUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiReleaseCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiReleaseGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiReleaseGetOptionalParams extends OperationOptions {}
