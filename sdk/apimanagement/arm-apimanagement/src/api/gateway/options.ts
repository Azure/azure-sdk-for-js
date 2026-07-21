// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GatewayListTraceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayListDebugCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayInvalidateDebugCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayGenerateTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| region | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface GatewayDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface GatewayGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GatewayGetOptionalParams extends OperationOptions {}
