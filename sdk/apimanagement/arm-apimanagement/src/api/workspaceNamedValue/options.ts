// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultRefreshState } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceNamedValueRefreshSecretOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspaceNamedValueListValueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceNamedValueListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| tags | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith, any, all |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
  /** Query parameter to fetch named value entities based on refresh status. */
  isKeyVaultRefreshFailed?: KeyVaultRefreshState;
}

/** Optional parameters. */
export interface WorkspaceNamedValueDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceNamedValueUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspaceNamedValueCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceNamedValueGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceNamedValueGetOptionalParams extends OperationOptions {}
