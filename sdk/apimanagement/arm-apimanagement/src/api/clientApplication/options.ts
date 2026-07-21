// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClientApplicationListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClientApplicationListByServiceOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| description | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> state | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface ClientApplicationDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClientApplicationCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClientApplicationGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClientApplicationGetOptionalParams extends OperationOptions {}
