// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { Column as LogsColumn, ErrorInfo } from "../generated/logquery/src";

// https://dev.loganalytics.io/documentation/Using-the-API/RequestOptions
// https://dev.loganalytics.io/documentation/Using-the-API/Timeouts

/**
 * Options for querying logs.
 */
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

  /**
   * Results will also include visualization information, in JSON format.
   */
  includeVisualization?: boolean;
}

/**
 * @internal
 */
export interface QueryStatistics {
  query?: {
    executionTime?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Tables and statistic results from a logs query.
 */
export interface QueryLogsResult {
  /** The list of tables, columns and rows. */
  tables: LogsTable[];
  /** Statistics represented in JSON format. */
  statistics?: any;
  /** Visualization data in JSON format. */
  visualization?: any;
}

/** Options when query logs with a batch. */
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
  /** The timespan over which to query data. This is an ISO8601 time period value.  This timespan is applied in addition to any that are specified in the query expression. */
  timespan: string;
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
export interface QueryLogsBatchResult {
  /** An array of responses corresponding to each individual request in a batch. */
  results?: {
    id?: string;
    status?: number;
    /** The list of tables, columns and rows. */
    // (hoisted up from `LogQueryResult`)
    tables?: LogsTable[];
    error?: ErrorInfo;
  }[];

  // TODO: this is omitted from the Java models.
  /** Error response for a batch request */
  // error?: BatchResponseError;
}

/** Contains the columns and rows for one table in a query response. */
export interface LogsTable {
  /** The name of the table. */
  name: string;
  /** The list of columns in this table. */
  columns: LogsColumn[];
  /** The resulting rows from this query. */
  rows: (Date | string | number | Record<string, unknown> | boolean)[][];
}
