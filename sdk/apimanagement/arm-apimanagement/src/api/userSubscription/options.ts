// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UserSubscriptionListOptionalParams extends OperationOptions {
  /** | Field     |     Usage     |     Supported operators    | Supported functions               |</br>|-------------|------------------------|-----------------------------------|</br>|name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>|displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>|stateComment | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>|ownerId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>|scope | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>|userId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>|productId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface UserSubscriptionGetOptionalParams extends OperationOptions {}
