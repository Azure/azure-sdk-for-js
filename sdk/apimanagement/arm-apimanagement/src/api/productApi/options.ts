// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductApiDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductApiCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductApiCheckEntityExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductApiListByProductOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| serviceUrl | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| path | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}
