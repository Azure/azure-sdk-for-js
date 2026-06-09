// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductGroupLinkListByProductOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| groupId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ProductGroupLinkDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductGroupLinkCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductGroupLinkGetOptionalParams extends OperationOptions {}
