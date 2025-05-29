import type { OperationOptions } from "@azure/core-client";
import type { LogsColumnType } from "../generated/logquery/src/index.js";
import type { QueryTimeInterval } from "./timeInterval.js";
/**
 * Options for querying logs.
 */
export interface LogsQueryOptions extends OperationOptions {
    /**
     * A list of workspaces that are included in the query, except for the one set as the `workspaceId` parameter
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
/** The code and message for an error. */
export interface LogsErrorInfo extends Error {
    /** A machine readable error code. */
    code: string;
}
/**
 * Tables and statistic results from a logs query.
 */
export type LogsQueryResult = LogsQuerySuccessfulResult | LogsQueryPartialResult;
/** Indicates if a query succeeded or failed or partially failed.
 * Represented by PartialFailure" | "Success" | "Failure".
 */
export declare enum LogsQueryResultStatus {
    /** Represents Partial Failure scenario where partial data and errors of type {@link LogsQueryPartialResult} is returned for query */
    PartialFailure = "PartialFailure",
    /** Represents Failure scenario where only error of type {@link LogsQueryError} is returned for query */
    Failure = "Failure",
    /** Represents Success scenario where all data of type {@link LogsQuerySuccessfulResult} is returned for query */
    Success = "Success"
}
/** Result type for Success Scenario for logs query workspace and query batch operations. */
export interface LogsQuerySuccessfulResult {
    /** Populated results from the query. */
    tables: LogsTable[];
    /** Indicates that the query succeeded */
    status: LogsQueryResultStatus.Success;
    /** Statistics represented in JSON format. */
    statistics?: Record<string, unknown>;
    /** Visualization data in JSON format. */
    visualization?: Record<string, unknown>;
}
/** Result type for Partial Failure Scenario for logs queryWorkspace and queryBatch operations. */
export interface LogsQueryPartialResult {
    /** Populated results from the query. */
    partialTables: LogsTable[];
    /** error information for partial errors or failed queries */
    partialError: LogsErrorInfo;
    /** Indicates that the query partially failed.*/
    status: LogsQueryResultStatus.PartialFailure;
    /** Statistics represented in JSON format. */
    statistics?: Record<string, unknown>;
    /** Visualization data in JSON format. */
    visualization?: Record<string, unknown>;
}
/** Result type for Failure Scenario representing error for logs queryWorkspace and queryBatch operations. */
export interface LogsQueryError extends Error {
    /** A machine readable error code. */
    code: string;
    /** Indicates that the query failed */
    status: LogsQueryResultStatus.Failure;
}
/** Configurable HTTP request settings for the Logs query batch operation. */
export interface LogsQueryBatchOptions extends OperationOptions {
}
/** The Kusto query. For more information about Kusto, see [Kusto query overview](https://learn.microsoft.com/azure/data-explorer/kusto/query). */
export interface QueryBatch {
    /** The workspace for this query. */
    workspaceId: string;
    /** The query to execute. */
    query: string;
    /** The timespan over which to query data. This timespan is applied in addition to any that are specified in the query expression. */
    timespan: QueryTimeInterval;
    /**
     * A list of workspaces that are included in the query, except for the one set as the `workspaceId` parameter
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
/** Results for a batch query. Each result in the array is either of type
 *  {@link LogsQueryError} or {@link LogsQueryPartialResult} or {@link LogsQuerySuccessfulResult}
 */
export type LogsQueryBatchResult = Array<LogsQueryPartialResult | LogsQuerySuccessfulResult | LogsQueryError>;
/** Contains the columns and rows for one table in a query response. */
export interface LogsTable {
    /** The name of the table. */
    name: string;
    /** The list of columns in this table. */
    columnDescriptors: LogsColumn[];
    /** The two dimensional array of results from this query indexed by row and column. */
    rows: (Date | string | number | Record<string, unknown> | boolean)[][];
}
/** A column in a table. */
export interface LogsColumn {
    /** The name of this column. */
    name?: string;
    /** The data type of this column.
     * Defines values for LogsColumnType.
     * {@link KnownLogsColumnType} can be used interchangeably with LogsColumnType,
     *  this enum contains the known values that the service supports.
     * ### Known values supported by the service
     * **bool**
     * **datetime**
     * **dynamic**
     * **int**
     * **long**
     * **real**
     * **string**
     * **guid**
     * **decimal**
     * **timespan**
     */
    type?: LogsColumnType;
}
//# sourceMappingURL=publicLogsModels.d.ts.map