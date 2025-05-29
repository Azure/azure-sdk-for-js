import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PublicIPPrefixes } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { PublicIPPrefix, PublicIPPrefixesListAllOptionalParams, PublicIPPrefixesListOptionalParams, PublicIPPrefixesDeleteOptionalParams, PublicIPPrefixesGetOptionalParams, PublicIPPrefixesGetResponse, PublicIPPrefixesCreateOrUpdateOptionalParams, PublicIPPrefixesCreateOrUpdateResponse, TagsObject, PublicIPPrefixesUpdateTagsOptionalParams, PublicIPPrefixesUpdateTagsResponse } from "../models/index.js";
/** Class containing PublicIPPrefixes operations. */
export declare class PublicIPPrefixesImpl implements PublicIPPrefixes {
    private readonly client;
    /**
     * Initialize a new instance of the class PublicIPPrefixes class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the public IP prefixes in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: PublicIPPrefixesListAllOptionalParams): PagedAsyncIterableIterator<PublicIPPrefix>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all public IP prefixes in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: PublicIPPrefixesListOptionalParams): PagedAsyncIterableIterator<PublicIPPrefix>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified public IP prefix.
     * @param resourceGroupName The name of the resource group.
     * @param publicIpPrefixName The name of the PublicIpPrefix.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, publicIpPrefixName: string, options?: PublicIPPrefixesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified public IP prefix.
     * @param resourceGroupName The name of the resource group.
     * @param publicIpPrefixName The name of the PublicIpPrefix.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, publicIpPrefixName: string, options?: PublicIPPrefixesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified public IP prefix in a specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param publicIpPrefixName The name of the public IP prefix.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, publicIpPrefixName: string, options?: PublicIPPrefixesGetOptionalParams): Promise<PublicIPPrefixesGetResponse>;
    /**
     * Creates or updates a static or dynamic public IP prefix.
     * @param resourceGroupName The name of the resource group.
     * @param publicIpPrefixName The name of the public IP prefix.
     * @param parameters Parameters supplied to the create or update public IP prefix operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, publicIpPrefixName: string, parameters: PublicIPPrefix, options?: PublicIPPrefixesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<PublicIPPrefixesCreateOrUpdateResponse>, PublicIPPrefixesCreateOrUpdateResponse>>;
    /**
     * Creates or updates a static or dynamic public IP prefix.
     * @param resourceGroupName The name of the resource group.
     * @param publicIpPrefixName The name of the public IP prefix.
     * @param parameters Parameters supplied to the create or update public IP prefix operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, publicIpPrefixName: string, parameters: PublicIPPrefix, options?: PublicIPPrefixesCreateOrUpdateOptionalParams): Promise<PublicIPPrefixesCreateOrUpdateResponse>;
    /**
     * Updates public IP prefix tags.
     * @param resourceGroupName The name of the resource group.
     * @param publicIpPrefixName The name of the public IP prefix.
     * @param parameters Parameters supplied to update public IP prefix tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, publicIpPrefixName: string, parameters: TagsObject, options?: PublicIPPrefixesUpdateTagsOptionalParams): Promise<PublicIPPrefixesUpdateTagsResponse>;
    /**
     * Gets all the public IP prefixes in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all public IP prefixes in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=publicIPPrefixes.d.ts.map