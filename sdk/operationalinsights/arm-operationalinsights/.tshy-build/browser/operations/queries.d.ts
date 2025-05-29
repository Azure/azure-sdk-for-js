import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Queries } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { LogAnalyticsQueryPackQuery, QueriesListOptionalParams, LogAnalyticsQueryPackQuerySearchProperties, QueriesSearchOptionalParams, QueriesGetOptionalParams, QueriesGetResponse, QueriesPutOptionalParams, QueriesPutResponse, QueriesUpdateOptionalParams, QueriesUpdateResponse, QueriesDeleteOptionalParams } from "../models/index.js";
/** Class containing Queries operations. */
export declare class QueriesImpl implements Queries {
    private readonly client;
    /**
     * Initialize a new instance of the class Queries class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets a list of Queries defined within a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, queryPackName: string, options?: QueriesListOptionalParams): PagedAsyncIterableIterator<LogAnalyticsQueryPackQuery>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Search a list of Queries defined within a Log Analytics QueryPack according to given search
     * properties.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param querySearchProperties Properties by which to search queries in the given Log Analytics
     *                              QueryPack.
     * @param options The options parameters.
     */
    listSearch(resourceGroupName: string, queryPackName: string, querySearchProperties: LogAnalyticsQueryPackQuerySearchProperties, options?: QueriesSearchOptionalParams): PagedAsyncIterableIterator<LogAnalyticsQueryPackQuery>;
    private searchPagingPage;
    private searchPagingAll;
    /**
     * Gets a list of Queries defined within a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Search a list of Queries defined within a Log Analytics QueryPack according to given search
     * properties.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param querySearchProperties Properties by which to search queries in the given Log Analytics
     *                              QueryPack.
     * @param options The options parameters.
     */
    private _search;
    /**
     * Gets a specific Log Analytics Query defined within a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param id The id of a specific query defined in the Log Analytics QueryPack
     * @param options The options parameters.
     */
    get(resourceGroupName: string, queryPackName: string, id: string, options?: QueriesGetOptionalParams): Promise<QueriesGetResponse>;
    /**
     * Adds or Updates a specific Query within a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param id The id of a specific query defined in the Log Analytics QueryPack
     * @param queryPayload Properties that need to be specified to create a new query and add it to a Log
     *                     Analytics QueryPack.
     * @param options The options parameters.
     */
    put(resourceGroupName: string, queryPackName: string, id: string, queryPayload: LogAnalyticsQueryPackQuery, options?: QueriesPutOptionalParams): Promise<QueriesPutResponse>;
    /**
     * Adds or Updates a specific Query within a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param id The id of a specific query defined in the Log Analytics QueryPack
     * @param queryPayload Properties that need to be specified to create a new query and add it to a Log
     *                     Analytics QueryPack.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, queryPackName: string, id: string, queryPayload: LogAnalyticsQueryPackQuery, options?: QueriesUpdateOptionalParams): Promise<QueriesUpdateResponse>;
    /**
     * Deletes a specific Query defined within an Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param id The id of a specific query defined in the Log Analytics QueryPack
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, queryPackName: string, id: string, options?: QueriesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * SearchNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param querySearchProperties Properties by which to search queries in the given Log Analytics
     *                              QueryPack.
     * @param nextLink The nextLink from the previous successful call to the Search method.
     * @param options The options parameters.
     */
    private _searchNext;
}
//# sourceMappingURL=queries.d.ts.map