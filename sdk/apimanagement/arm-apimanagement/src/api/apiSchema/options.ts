// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiSchemaListByApiOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| contentType | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ApiSchemaDeleteOptionalParams extends OperationOptions {
  /** If true removes all references to the schema before deleting it. */
  force?: boolean;
}

/** Optional parameters. */
export interface ApiSchemaCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiSchemaGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiSchemaGetOptionalParams extends OperationOptions {}
