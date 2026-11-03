// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductGroupDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductGroupCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductGroupCheckEntityExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductGroupListByProductOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt |     |</br>| displayName | filter | eq, ne |     |</br>| description | filter | eq, ne |     |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}
