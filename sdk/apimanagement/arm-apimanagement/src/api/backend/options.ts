// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BackendReconnectContract } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackendReconnectOptionalParams extends OperationOptions {
  /** Reconnect request parameters. */
  parameters?: BackendReconnectContract;
}

/** Optional parameters. */
export interface BackendListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| title | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| url | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface BackendDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackendUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackendCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface BackendGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackendGetOptionalParams extends OperationOptions {}
