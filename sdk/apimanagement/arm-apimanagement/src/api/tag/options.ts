// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TagListByServiceOptionalParams extends OperationOptions {
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
export interface TagDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface TagGetEntityStateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagListByProductOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface TagDetachFromProductOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagAssignToProductOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetEntityStateByProductOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetByProductOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagListByOperationOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface TagDetachFromOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagAssignToOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetEntityStateByOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetByOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagListByApiOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface TagDetachFromApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagAssignToApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetEntityStateByApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TagGetByApiOptionalParams extends OperationOptions {}
