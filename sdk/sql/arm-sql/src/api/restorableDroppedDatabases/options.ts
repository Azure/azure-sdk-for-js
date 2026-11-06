// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableDroppedDatabasesListByServerOptionalParams extends OperationOptions {
  /** An opaque token that identifies a starting point in the collection. */
  skiptoken?: string;
  /** The number of elements to return from the collection. */
  top?: number;
}

/** Optional parameters. */
export interface RestorableDroppedDatabasesGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}
