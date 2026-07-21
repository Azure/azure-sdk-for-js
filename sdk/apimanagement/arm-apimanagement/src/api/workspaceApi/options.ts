// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceApiListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| serviceUrl | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| path | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| isCurrent | filter | eq, ne |  |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** Include tags in the response. */
  tags?: string;
  /** Include full ApiVersionSet resource in response */
  expandApiVersionSet?: boolean;
}

/** Optional parameters. */
export interface WorkspaceApiDeleteOptionalParams extends OperationOptions {
  /** Delete all revisions of the Api. */
  deleteRevisions?: boolean;
}

/** Optional parameters. */
export interface WorkspaceApiUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceApiGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiGetOptionalParams extends OperationOptions {}
