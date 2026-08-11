// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiToolListByApiOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ApiToolDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiToolUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiToolCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiToolGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiToolGetOptionalParams extends OperationOptions {}
