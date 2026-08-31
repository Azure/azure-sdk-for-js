// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductListByServiceOptionalParams extends OperationOptions {
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
export interface ProductDeleteOptionalParams extends OperationOptions {
  /** Delete existing subscriptions associated with the product or not. */
  deleteSubscriptions?: boolean;
}

/** Optional parameters. */
export interface ProductUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ProductGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductListByTagsOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| terms | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| state | filter | eq | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** Include not tagged Products. */
  includeNotTaggedProducts?: boolean;
}
