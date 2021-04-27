// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { QueryResults } from "../generated/logquery/src";

// https://dev.loganalytics.io/documentation/Using-the-API/RequestOptions
// https://dev.loganalytics.io/documentation/Using-the-API/Timeouts

export interface QueryLogsOptions extends OperationOptions {
  /**
   * The maximum amount of time the server will spend processing the query.
   * Default: 180 seconds (3 minutes), maximum allowed is 600 seconds (10 minutes)
   */
  serverTimeoutInSeconds?: number;

  /**
   * Results will also include statistics about the query.
   */
  includeQueryStatistics?: boolean; // TODO: this data is not modeled in the current response object.

  /** Optional. The timespan over which to query data. This is an ISO8601 time period value.  This timespan is applied in addition to any that are specified in the query expression. */
  timespan?: string;
}

export interface QueryStatistics {
  query?: {
    executionTime?: number;
    // TODO: there are number of different models here.
  };
}

export type QueryLogsResult = QueryResults & {
  statistics?: QueryStatistics;
};

export type QueryLogsBatchOptions = OperationOptions;
