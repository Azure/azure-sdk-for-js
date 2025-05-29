import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { QueryPacks } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { LogAnalyticsQueryPack, QueryPacksListOptionalParams, QueryPacksListByResourceGroupOptionalParams, QueryPacksCreateOrUpdateWithoutNameOptionalParams, QueryPacksCreateOrUpdateWithoutNameResponse, QueryPacksDeleteOptionalParams, QueryPacksGetOptionalParams, QueryPacksGetResponse, QueryPacksCreateOrUpdateOptionalParams, QueryPacksCreateOrUpdateResponse, TagsResource, QueryPacksUpdateTagsOptionalParams, QueryPacksUpdateTagsResponse } from "../models/index.js";
/** Class containing QueryPacks operations. */
export declare class QueryPacksImpl implements QueryPacks {
    private readonly client;
    /**
     * Initialize a new instance of the class QueryPacks class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets a list of all Log Analytics QueryPacks within a subscription.
     * @param options The options parameters.
     */
    list(options?: QueryPacksListOptionalParams): PagedAsyncIterableIterator<LogAnalyticsQueryPack>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of Log Analytics QueryPacks within a resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: QueryPacksListByResourceGroupOptionalParams): PagedAsyncIterableIterator<LogAnalyticsQueryPack>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets a list of all Log Analytics QueryPacks within a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets a list of Log Analytics QueryPacks within a resource group.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey
     * nor AppId in the Put operation.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param logAnalyticsQueryPackPayload Properties that need to be specified to create or update a Log
     *                                     Analytics QueryPack.
     * @param options The options parameters.
     */
    createOrUpdateWithoutName(resourceGroupName: string, logAnalyticsQueryPackPayload: LogAnalyticsQueryPack, options?: QueryPacksCreateOrUpdateWithoutNameOptionalParams): Promise<QueryPacksCreateOrUpdateWithoutNameResponse>;
    /**
     * Deletes a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, queryPackName: string, options?: QueryPacksDeleteOptionalParams): Promise<void>;
    /**
     * Returns a Log Analytics QueryPack.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, queryPackName: string, options?: QueryPacksGetOptionalParams): Promise<QueryPacksGetResponse>;
    /**
     * Creates (or updates) a Log Analytics QueryPack. Note: You cannot specify a different value for
     * InstrumentationKey nor AppId in the Put operation.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param logAnalyticsQueryPackPayload Properties that need to be specified to create or update a Log
     *                                     Analytics QueryPack.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, queryPackName: string, logAnalyticsQueryPackPayload: LogAnalyticsQueryPack, options?: QueryPacksCreateOrUpdateOptionalParams): Promise<QueryPacksCreateOrUpdateResponse>;
    /**
     * Updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param queryPackName The name of the Log Analytics QueryPack resource.
     * @param queryPackTags Updated tag information to set into the QueryPack instance.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, queryPackName: string, queryPackTags: TagsResource, options?: QueryPacksUpdateTagsOptionalParams): Promise<QueryPacksUpdateTagsResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=queryPacks.d.ts.map