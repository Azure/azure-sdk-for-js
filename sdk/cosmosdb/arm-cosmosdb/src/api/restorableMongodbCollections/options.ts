// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RestorableMongodbCollectionsListOptionalParams extends OperationOptions {
  /** The resource ID of the MongoDB database. */
  restorableMongodbDatabaseRid?: string;
  /** Restorable MongoDB collections event feed start time. */
  startTime?: string;
  /** Restorable MongoDB collections event feed end time. */
  endTime?: string;
}
