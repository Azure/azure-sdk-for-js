// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableDroppedDatabasesListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestorableDroppedDatabasesGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}
