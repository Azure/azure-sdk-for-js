// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceGroupUserDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceGroupUserCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceGroupUserCheckEntityExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceGroupUserListOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| firstName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| lastName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| email | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| registrationDate | filter | ge, le, eq, ne, gt, lt |     |</br>| note | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}
