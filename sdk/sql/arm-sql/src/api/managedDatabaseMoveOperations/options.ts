// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedDatabaseMoveOperationsListByLocationOptionalParams extends OperationOptions {
  /** Whether or not to only get the latest operation for each database. Has higher priority than $filter. */
  onlyLatestPerDatabase?: boolean;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface ManagedDatabaseMoveOperationsGetOptionalParams extends OperationOptions {}
