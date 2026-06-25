// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupUsageSummariesListOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
  /** skipToken Filter. */
  skipToken?: string;
}
