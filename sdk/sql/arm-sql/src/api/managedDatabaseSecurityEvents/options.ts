// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedDatabaseSecurityEventsListByDatabaseOptionalParams extends OperationOptions {
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
  /** The number of elements in the collection to skip. */
  skip?: number;
  /** The number of elements to return from the collection. */
  top?: number;
  /** An opaque token that identifies a starting point in the collection. */
  skiptoken?: string;
}
