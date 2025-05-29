import { QueryGetOptionalParams, QueryGetResponse, QueryBody, QueryExecuteOptionalParams, QueryExecuteResponse, QueryResourceGetOptionalParams, QueryResourceGetResponse, QueryResourceExecuteOptionalParams, QueryResourceExecuteResponse, BatchRequest, QueryBatchOptionalParams, QueryBatchResponse, QueryResourceGetXmsOptionalParams, QueryResourceGetXmsResponse, QueryResourceExecuteXmsOptionalParams, QueryResourceExecuteXmsResponse } from "../models/index.js";
/** Interface representing a Query. */
export interface Query {
    /**
     * Executes an Analytics query for data
     * @param workspaceId Primary Workspace ID of the query. This is the Workspace ID from the Properties
     *                    blade in the Azure portal.
     * @param query The Analytics query. Learn more about the [Analytics query
     *              syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
     * @param options The options parameters.
     */
    get(workspaceId: string, query: string, options?: QueryGetOptionalParams): Promise<QueryGetResponse>;
    /**
     * Executes an Analytics query for data.
     * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/request-format) is an example for
     * using POST with an Analytics query.
     * @param workspaceId Primary Workspace ID of the query. This is the Workspace ID from the Properties
     *                    blade in the Azure portal.
     * @param body The Analytics query. Learn more about the [Analytics query
     *             syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
     * @param options The options parameters.
     */
    execute(workspaceId: string, body: QueryBody, options?: QueryExecuteOptionalParams): Promise<QueryExecuteResponse>;
    /**
     * Executes an Analytics query for data in the context of a resource.
     * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries) is an
     * example for using POST with an Analytics query.
     * @param resourceId The identifier of the resource.
     * @param query The Analytics query. Learn more about the [Analytics query
     *              syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
     * @param options The options parameters.
     */
    resourceGet(resourceId: string, query: string, options?: QueryResourceGetOptionalParams): Promise<QueryResourceGetResponse>;
    /**
     * Executes an Analytics query for data in the context of a resource.
     * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries) is an
     * example for using POST with an Analytics query.
     * @param resourceId The identifier of the resource.
     * @param body The Analytics query. Learn more about the [Analytics query
     *             syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
     * @param options The options parameters.
     */
    resourceExecute(resourceId: string, body: QueryBody, options?: QueryResourceExecuteOptionalParams): Promise<QueryResourceExecuteResponse>;
    /**
     * Executes a batch of Analytics queries for data.
     * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/batch-queries) is an example for
     * using POST with an Analytics query.
     * @param body The batch request body
     * @param options The options parameters.
     */
    batch(body: BatchRequest, options?: QueryBatchOptionalParams): Promise<QueryBatchResponse>;
    /**
     * Executes an Analytics query for data in the context of a resource.
     * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries) is an
     * example for using POST with an Analytics query.
     * @param resourceId The identifier of the resource.
     * @param query The Analytics query. Learn more about the [Analytics query
     *              syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
     * @param options The options parameters.
     */
    resourceGetXms(resourceId: string, query: string, options?: QueryResourceGetXmsOptionalParams): Promise<QueryResourceGetXmsResponse>;
    /**
     * Executes an Analytics query for data in the context of a resource.
     * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries) is an
     * example for using POST with an Analytics query.
     * @param resourceId The identifier of the resource.
     * @param body The Analytics query. Learn more about the [Analytics query
     *             syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)
     * @param options The options parameters.
     */
    resourceExecuteXms(resourceId: string, body: QueryBody, options?: QueryResourceExecuteXmsOptionalParams): Promise<QueryResourceExecuteXmsResponse>;
}
//# sourceMappingURL=query.d.ts.map