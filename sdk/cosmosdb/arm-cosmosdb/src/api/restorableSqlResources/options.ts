// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableSqlResourcesListOptionalParams extends OperationOptions {
  /** The location where the restorable resources are located. */
  restoreLocation?: string;
  /** The timestamp when the restorable resources existed. */
  restoreTimestampInUtc?: string;
}
