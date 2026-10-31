// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseColumnsListByDatabaseOptionalParams extends OperationOptions {
  schema?: string[];
  table?: string[];
  column?: string[];
  orderBy?: string[];
  /** An opaque token that identifies a starting point in the collection. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface DatabaseColumnsListByTableOptionalParams extends OperationOptions {
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}

/** Optional parameters. */
export interface DatabaseColumnsGetOptionalParams extends OperationOptions {}
