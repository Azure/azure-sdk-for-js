// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableTablesListOptionalParams extends OperationOptions {
  /** Restorable Tables event feed start time. */
  startTime?: string;
  /** Restorable Tables event feed end time. */
  endTime?: string;
}
