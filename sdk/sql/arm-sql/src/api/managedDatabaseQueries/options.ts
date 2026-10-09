// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryTimeGrainType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedDatabaseQueriesListByQueryOptionalParams extends OperationOptions {
  /** Start time for observed period. */
  startTime?: string;
  /** End time for observed period. */
  endTime?: string;
  /** The time step to be used to summarize the metric values. */
  interval?: QueryTimeGrainType;
}

/** Optional parameters. */
export interface ManagedDatabaseQueriesGetOptionalParams extends OperationOptions {}
