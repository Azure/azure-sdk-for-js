// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Column as GeneratedColumn,
  ErrorInfo as GeneratedErrorInfo,
  QueryTimeInterval,
} from "./models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Options for querying logs. */
export interface LogsQueryOptions extends OperationOptions {
  /**
   * A list of workspaces that are included in the query, except for the one set as the `workspaceId` parameter.
   * These may consist of the following identifier formats:
   * - Qualified workspace names
   * - Workspace IDs
   * - Azure resource IDs
   */
  additionalWorkspaces?: string[];
  /**
   * The maximum amount of time the server will spend processing the query.
   * Default: 180 seconds (3 minutes), maximum allowed is 600 seconds (10 minutes)
   */
  serverTimeoutInSeconds?: number;
  /**
   * Results will also include statistics about the query.
   */
  includeQueryStatistics?: boolean;
  /**
   * Results will also include visualization information, in JSON format.
   */
  includeVisualization?: boolean;
}

/** The status of a query. */
export enum LogsQueryResultStatus {
  /** The query was successful. */
  Success = "Success",
  /** The query was partially successful. */
  PartialFailure = "PartialFailure",
  /** The query failed. */
  Failure = "Failure",
}

/** A column in a table. */
export interface LogsColumn extends GeneratedColumn {}

/** Contains the columns and rows for one table in a query response. */
export interface LogsTable {
  /** The name of the table. */
  name: string;
  /** The list of columns in this table. */
  columnDescriptors: LogsColumn[];
  /** The resulting rows from this query. */
  rows: (string | number | boolean | Record<string, any> | Date)[][];
}

/** The code and message for an error. */
export interface LogsErrorInfo extends GeneratedErrorInfo {}

/** A successful query result. */
export interface LogsQuerySuccessfulResult {
  /** The status of the query. */
  status: LogsQueryResultStatus.Success;
  /** The results of the query in tabular format. */
  tables: LogsTable[];
  /** Statistics represented in JSON format. */
  statistics?: Record<string, any>;
  /** Visualization data in JSON format. */
  visualization?: Record<string, any>;
}

/** A partially successful query result. */
export interface LogsQueryPartialResult {
  /** The status of the query. */
  status: LogsQueryResultStatus.PartialFailure;
  /** The results of the query in tabular format. */
  partialTables: LogsTable[];
  /** The code and message for an error. */
  partialError: LogsErrorInfo;
  /** Statistics represented in JSON format. */
  statistics?: Record<string, any>;
  /** Visualization data in JSON format. */
  visualization?: Record<string, any>;
}

/** A failed query result. */
export interface LogsQueryError extends Error {
  /** A machine readable error code. */
  code: string;
  /** Indicates that the query failed */
  status: LogsQueryResultStatus.Failure;
}

/** The result of a query. */
export type LogsQueryResult = LogsQuerySuccessfulResult | LogsQueryPartialResult;

/** The result of a batch query operation. */
export type LogsQueryBatchResult = Array<
  LogsQueryPartialResult | LogsQuerySuccessfulResult | LogsQueryError
>;

/** A query to execute as part of a batch. */
export interface QueryBatch {
  /** A list of workspaces to query in addition to the primary workspace. */
  additionalWorkspaces?: string[];
  /** Whether to include query statistics in the response. */
  includeQueryStatistics?: boolean;
  /** Whether to include visualization data in the response. */
  includeVisualization?: boolean;
  /** The Analytics query to execute. */
  query: string;
  /** The server timeout in seconds. */
  serverTimeoutInSeconds?: number;
  /** The timespan for the query. */
  timespan: QueryTimeInterval;
  /** The workspace ID to query. */
  workspaceId: string;
}

/** Audiences for Azure Monitor Logs. */
export enum KnownMonitorLogsQueryAudience {
  /** The Azure public cloud. */
  AzurePublicCloud = "https://api.loganalytics.io",
  /** The Azure China cloud. */
  AzureChina = "https://api.loganalytics.azure.cn",
  /** The Azure US Government cloud. */
  AzureGovernment = "https://api.loganalytics.us",
}
