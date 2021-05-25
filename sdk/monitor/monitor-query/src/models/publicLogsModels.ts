// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { ErrorInfo, QueryResults as GeneratedQueryResults, Table } from "../generated/logquery/src";

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
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export type QueryLogsResult = GeneratedQueryResults & {
  statistics?: QueryStatistics;
};

export type QueryLogsBatchOptions = OperationOptions;

/** An array of queries to run as a batch. */
export interface QueryLogsBatch {
  /**
   * Queries that will be run for the batch.
   */
  queries: BatchQuery[];
}

/** The Analytics query. Learn more about the [Analytics query syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/) */
// NOTE: 'id' is added automatically by our LogsClient.
export interface BatchQuery {
  /** The workspace for this query. */
  workspace: string;

  // TODO: having both this and the workspaceId field co-exist on the same model seems really
  // confusing. However, this is similar to what we're offering in other languages as well.

  /** The query to execute. */
  query: string;
  /** Optional. The timespan over which to query data. This is an ISO8601 time period value.  This timespan is applied in addition to any that are specified in the query expression. */
  timespan?: string;
  /** A list of workspaces that are included in the query. */
  workspaces?: string[];
  /** A list of qualified workspace names that are included in the query. */
  qualifiedNames?: string[];
  /** A list of workspace IDs that are included in the query. */
  workspaceIds?: string[];
  /** A list of Azure resource IDs that are included in the query. */
  azureResourceIds?: string[];

  /**
   * The maximum amount of time the server will spend processing the query.
   * Default: 180 seconds (3 minutes), maximum allowed is 600 seconds (10 minutes)
   */
  serverTimeoutInSeconds?: number;

  /**
   * Results will also include statistics about the query.
   */
  includeQueryStatistics?: boolean; // TODO: this data is not modeled in the current response object.
}

/** Results for a batch query. */
export interface QueryLogsBatchResponse {
  /** An array of responses corresponding to each individual request in a batch. */
  results?: {
    id?: string;
    status?: number;
    /** The list of tables, columns and rows. */
    // (hoisted up from `LogQueryResult`)
    tables?: Table[];
    error?: ErrorInfo;
  }[];

  // TODO: this is omitted from the Java models.
  /** Error response for a batch request */
  // error?: BatchResponseError;
}
