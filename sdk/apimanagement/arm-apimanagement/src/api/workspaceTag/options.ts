// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceTagListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** Scope like 'apis', 'products' or 'apis/{apiId} */
  scope?: string;
}

/** Optional parameters. */
export interface WorkspaceTagDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceTagUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceTagCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceTagGetEntityStateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceTagGetOptionalParams extends OperationOptions {}
