// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceProductListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| terms | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| state | filter | eq |     |</br>| groups | expand |     |     |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** When set to true, the response contains an array of groups that have visibility to the product. The default is false. */
  expandGroups?: boolean;
  /** Products which are part of a specific tag. */
  tags?: string;
}

/** Optional parameters. */
export interface WorkspaceProductDeleteOptionalParams extends OperationOptions {
  /** Delete existing subscriptions associated with the product or not. */
  deleteSubscriptions?: boolean;
}

/** Optional parameters. */
export interface WorkspaceProductUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceProductCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceProductGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceProductGetOptionalParams extends OperationOptions {}
