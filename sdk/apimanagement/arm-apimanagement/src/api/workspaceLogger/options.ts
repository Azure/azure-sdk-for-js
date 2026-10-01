// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceLoggerListByWorkspaceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| loggerType | filter | eq |     |</br>| resourceId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface WorkspaceLoggerDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceLoggerUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceLoggerCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceLoggerGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceLoggerGetOptionalParams extends OperationOptions {}
