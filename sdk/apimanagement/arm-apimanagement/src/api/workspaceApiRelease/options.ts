// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceApiReleaseListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| notes | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface WorkspaceApiReleaseDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiReleaseUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiReleaseCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceApiReleaseGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiReleaseGetOptionalParams extends OperationOptions {}
