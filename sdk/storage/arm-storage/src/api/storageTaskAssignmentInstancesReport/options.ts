// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageTaskAssignmentInstancesReportListOptionalParams extends OperationOptions {
  /** Optional, specifies the maximum number of storage task assignment instances to be included in the list response. */
  maxpagesize?: number;
  /** Optional. When specified, it can be used to query using reporting properties. See [Constructing Filter Strings](https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#constructing-filter-strings) for details. */
  filter?: string;
}
