// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
    Column as GeneratedColumn,
    ErrorInfo as GeneratedErrorInfo,
} from "./models.js";

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
export interface LogsColumn extends GeneratedColumn { }

/** Contains the columns and rows for one table in a query response. */
export interface LogsTable {
    /** The name of the table. */
    name: string;
    /** The list of columns in this table. */
    columnDescriptors: LogsColumn[];
    /** The resulting rows from this query. */
    rows: (string | number | boolean | Record<string, unknown> | Date)[][];
}

/** The code and message for an error. */
export interface LogsErrorInfo extends GeneratedErrorInfo { }

/** A successful query result. */
export interface LogsQuerySuccessfulResult {
    /** The status of the query. */
    status: LogsQueryResultStatus.Success;
    /** The results of the query in tabular format. */
    tables: LogsTable[];
    /** Statistics represented in JSON format. */
    statistics?: Record<string, unknown>;
    /** Visualization data in JSON format. */
    visualization?: Record<string, unknown>;
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
    statistics?: Record<string, unknown>;
    /** Visualization data in JSON format. */
    visualization?: Record<string, unknown>;
}

/** The result of a query. */
export type LogsQueryResult = LogsQuerySuccessfulResult | LogsQueryPartialResult;

/** Audiences for Azure Monitor Logs. */
export enum KnownMonitorLogsQueryAudience {
    /** The Azure public cloud. */
    AzurePublicCloud = "https://api.loganalytics.io",
    /** The Azure China cloud. */
    AzureChina = "https://api.loganalytics.azure.cn",
    /** The Azure US Government cloud. */
    AzureGovernment = "https://api.loganalytics.us",
}
