// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableSqlContainersListOptionalParams extends OperationOptions {
  /** The resource ID of the SQL database. */
  restorableSqlDatabaseRid?: string;
  /** Restorable Sql containers event feed start time. */
  startTime?: string;
  /** Restorable Sql containers event feed end time. */
  endTime?: string;
}
