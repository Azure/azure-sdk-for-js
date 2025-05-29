import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SecurityPartnerProviders } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SecurityPartnerProvider, SecurityPartnerProvidersListByResourceGroupOptionalParams, SecurityPartnerProvidersListOptionalParams, SecurityPartnerProvidersDeleteOptionalParams, SecurityPartnerProvidersGetOptionalParams, SecurityPartnerProvidersGetResponse, SecurityPartnerProvidersCreateOrUpdateOptionalParams, SecurityPartnerProvidersCreateOrUpdateResponse, TagsObject, SecurityPartnerProvidersUpdateTagsOptionalParams, SecurityPartnerProvidersUpdateTagsResponse } from "../models/index.js";
/** Class containing SecurityPartnerProviders operations. */
export declare class SecurityPartnerProvidersImpl implements SecurityPartnerProviders {
    private readonly client;
    /**
     * Initialize a new instance of the class SecurityPartnerProviders class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Security Partner Providers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: SecurityPartnerProvidersListByResourceGroupOptionalParams): PagedAsyncIterableIterator<SecurityPartnerProvider>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets all the Security Partner Providers in a subscription.
     * @param options The options parameters.
     */
    list(options?: SecurityPartnerProvidersListOptionalParams): PagedAsyncIterableIterator<SecurityPartnerProvider>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified Security Partner Provider.
     * @param resourceGroupName The name of the resource group.
     * @param securityPartnerProviderName The name of the Security Partner Provider.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, securityPartnerProviderName: string, options?: SecurityPartnerProvidersDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified Security Partner Provider.
     * @param resourceGroupName The name of the resource group.
     * @param securityPartnerProviderName The name of the Security Partner Provider.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, securityPartnerProviderName: string, options?: SecurityPartnerProvidersDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Security Partner Provider.
     * @param resourceGroupName The name of the resource group.
     * @param securityPartnerProviderName The name of the Security Partner Provider.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, securityPartnerProviderName: string, options?: SecurityPartnerProvidersGetOptionalParams): Promise<SecurityPartnerProvidersGetResponse>;
    /**
     * Creates or updates the specified Security Partner Provider.
     * @param resourceGroupName The name of the resource group.
     * @param securityPartnerProviderName The name of the Security Partner Provider.
     * @param parameters Parameters supplied to the create or update Security Partner Provider operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, securityPartnerProviderName: string, parameters: SecurityPartnerProvider, options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<SecurityPartnerProvidersCreateOrUpdateResponse>, SecurityPartnerProvidersCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Security Partner Provider.
     * @param resourceGroupName The name of the resource group.
     * @param securityPartnerProviderName The name of the Security Partner Provider.
     * @param parameters Parameters supplied to the create or update Security Partner Provider operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, securityPartnerProviderName: string, parameters: SecurityPartnerProvider, options?: SecurityPartnerProvidersCreateOrUpdateOptionalParams): Promise<SecurityPartnerProvidersCreateOrUpdateResponse>;
    /**
     * Updates tags of a Security Partner Provider resource.
     * @param resourceGroupName The name of the resource group.
     * @param securityPartnerProviderName The name of the Security Partner Provider.
     * @param parameters Parameters supplied to update Security Partner Provider tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, securityPartnerProviderName: string, parameters: TagsObject, options?: SecurityPartnerProvidersUpdateTagsOptionalParams): Promise<SecurityPartnerProvidersUpdateTagsResponse>;
    /**
     * Lists all Security Partner Providers in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets all the Security Partner Providers in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=securityPartnerProviders.d.ts.map