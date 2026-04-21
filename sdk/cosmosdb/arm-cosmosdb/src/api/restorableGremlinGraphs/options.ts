// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableGremlinGraphsListOptionalParams extends OperationOptions {
  /** The resource ID of the Gremlin database. */
  restorableGremlinDatabaseRid?: string;
  /** Restorable Gremlin graphs event feed start time. */
  startTime?: string;
  /** Restorable Gremlin graphs event feed end time. */
  endTime?: string;
}
