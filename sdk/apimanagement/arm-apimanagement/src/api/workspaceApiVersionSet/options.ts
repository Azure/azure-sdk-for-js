// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceApiVersionSetListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface WorkspaceApiVersionSetDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiVersionSetUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiVersionSetCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceApiVersionSetGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiVersionSetGetOptionalParams extends OperationOptions {}
