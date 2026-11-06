// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseTablesListBySchemaOptionalParams extends OperationOptions {
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface DatabaseTablesGetOptionalParams extends OperationOptions {}
