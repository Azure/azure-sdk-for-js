import type { TokenCredential } from "@azure/core-auth";
import type { LogsQueryBatchOptions, LogsQueryBatchResult, LogsQueryOptions, LogsQueryResult, QueryBatch } from "./models/publicLogsModels.js";
import type { CommonClientOptions } from "@azure/core-client";
import type { QueryTimeInterval } from "./models/timeInterval.js";
/**
 * Options for the LogsQueryClient.
 */
export interface LogsQueryClientOptions extends CommonClientOptions {
    /**
     * The host to connect to.
     */
    endpoint?: string;
    /**
     * The Audience to use for authentication with Microsoft Entra ID. The
     * audience is not considered when using a shared key.
     */
    audience?: string;
}
/**
 * Client for Azure Log Analytics
 */
export declare class LogsQueryClient {
    private _logAnalytics;
    /**
     * Construct a LogsClient that can be used to query logs using the Log Analytics Query language.
     *
     * @param tokenCredential - A token credential.
     * @param options - Options for the LogsClient.
     */
    constructor(tokenCredential: TokenCredential, options?: LogsQueryClientOptions);
    /**
     * Queries logs in a Log Analytics Workspace.
     *
     * @param workspaceId - The 'Workspace Id' for the Log Analytics Workspace
     * @param query - A Kusto query.
     * @param timespan - The timespan over which to query data. This is an ISO8601 time period value. This timespan is applied in addition to any that are specified in the query expression.
     *  Some common durations can be found in the `Durations` object.
     * @param options - Options to adjust various aspects of the request.
     * @returns The result of the query.
     */
    queryWorkspace(workspaceId: string, query: string, timespan: QueryTimeInterval, options?: LogsQueryOptions): Promise<LogsQueryResult>;
    /**
     * Query Logs with multiple queries, in a batch.
     * @param batch - A batch of Kusto queries to execute. Each query can be configured to run against separate workspaces.
     * @param options - Options for querying logs in a batch.
     * @returns The Logs query results for all the queries.
     */
    queryBatch(batch: QueryBatch[], options?: LogsQueryBatchOptions): Promise<LogsQueryBatchResult>;
    /**
     * Executes a Kusto query on an Azure resource
     *
     * @param resourceId - The identifier of the resource. The expected format is
           '/subscriptions/<sid>/resourceGroups/<rg>/providers/<providerName>/<resourceType>/<resourceName>'.
     * @param query - A Kusto query. Learn more about the `Kusto query syntax <https://learn.microsoft.com/azure/data-explorer/kusto/query/>`.
     * @param timespan - The timespan over which to query data. This is an ISO8601 time period value. This timespan is applied in addition to any that are specified in the query expression.
     *  Some common durations can be found in the {@link Durations} object.
     * @param options - Options to adjust various aspects of the request.
     * @returns Returns all the Azure Monitor logs matching the given Kusto query for an Azure resource.
     */
    queryResource(resourceId: string, query: string, timespan: QueryTimeInterval, options?: LogsQueryOptions): Promise<LogsQueryResult>;
}
//# sourceMappingURL=logsQueryClient.d.ts.map