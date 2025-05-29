import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualNetworkTaps } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualNetworkTap, VirtualNetworkTapsListAllOptionalParams, VirtualNetworkTapsListByResourceGroupOptionalParams, VirtualNetworkTapsDeleteOptionalParams, VirtualNetworkTapsGetOptionalParams, VirtualNetworkTapsGetResponse, VirtualNetworkTapsCreateOrUpdateOptionalParams, VirtualNetworkTapsCreateOrUpdateResponse, TagsObject, VirtualNetworkTapsUpdateTagsOptionalParams, VirtualNetworkTapsUpdateTagsResponse } from "../models/index.js";
/** Class containing VirtualNetworkTaps operations. */
export declare class VirtualNetworkTapsImpl implements VirtualNetworkTaps {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualNetworkTaps class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the VirtualNetworkTaps in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: VirtualNetworkTapsListAllOptionalParams): PagedAsyncIterableIterator<VirtualNetworkTap>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all the VirtualNetworkTaps in a subscription.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VirtualNetworkTapsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VirtualNetworkTap>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Deletes the specified virtual network tap.
     * @param resourceGroupName The name of the resource group.
     * @param tapName The name of the virtual network tap.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, tapName: string, options?: VirtualNetworkTapsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified virtual network tap.
     * @param resourceGroupName The name of the resource group.
     * @param tapName The name of the virtual network tap.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, tapName: string, options?: VirtualNetworkTapsDeleteOptionalParams): Promise<void>;
    /**
     * Gets information about the specified virtual network tap.
     * @param resourceGroupName The name of the resource group.
     * @param tapName The name of virtual network tap.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, tapName: string, options?: VirtualNetworkTapsGetOptionalParams): Promise<VirtualNetworkTapsGetResponse>;
    /**
     * Creates or updates a Virtual Network Tap.
     * @param resourceGroupName The name of the resource group.
     * @param tapName The name of the virtual network tap.
     * @param parameters Parameters supplied to the create or update virtual network tap operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, tapName: string, parameters: VirtualNetworkTap, options?: VirtualNetworkTapsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualNetworkTapsCreateOrUpdateResponse>, VirtualNetworkTapsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a Virtual Network Tap.
     * @param resourceGroupName The name of the resource group.
     * @param tapName The name of the virtual network tap.
     * @param parameters Parameters supplied to the create or update virtual network tap operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, tapName: string, parameters: VirtualNetworkTap, options?: VirtualNetworkTapsCreateOrUpdateOptionalParams): Promise<VirtualNetworkTapsCreateOrUpdateResponse>;
    /**
     * Updates an VirtualNetworkTap tags.
     * @param resourceGroupName The name of the resource group.
     * @param tapName The name of the tap.
     * @param tapParameters Parameters supplied to update VirtualNetworkTap tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, tapName: string, tapParameters: TagsObject, options?: VirtualNetworkTapsUpdateTagsOptionalParams): Promise<VirtualNetworkTapsUpdateTagsResponse>;
    /**
     * Gets all the VirtualNetworkTaps in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all the VirtualNetworkTaps in a subscription.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=virtualNetworkTaps.d.ts.map