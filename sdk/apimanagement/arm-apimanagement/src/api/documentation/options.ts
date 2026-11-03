// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DocumentationListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | eq |  contains |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface DocumentationDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DocumentationUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DocumentationCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface DocumentationGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DocumentationGetOptionalParams extends OperationOptions {}
