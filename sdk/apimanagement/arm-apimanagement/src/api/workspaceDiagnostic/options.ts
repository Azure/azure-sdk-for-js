// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceDiagnosticListByWorkspaceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface WorkspaceDiagnosticDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceDiagnosticUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceDiagnosticCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceDiagnosticGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceDiagnosticGetOptionalParams extends OperationOptions {}
