// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceTagProductLinkListByProductOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| productId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface WorkspaceTagProductLinkDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceTagProductLinkCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceTagProductLinkGetOptionalParams extends OperationOptions {}
