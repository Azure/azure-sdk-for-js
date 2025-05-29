import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualHubs } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualHub, VirtualHubsListByResourceGroupOptionalParams, VirtualHubsListOptionalParams, VirtualHubsGetOptionalParams, VirtualHubsGetResponse, VirtualHubsCreateOrUpdateOptionalParams, VirtualHubsCreateOrUpdateResponse, TagsObject, VirtualHubsUpdateTagsOptionalParams, VirtualHubsUpdateTagsResponse, VirtualHubsDeleteOptionalParams, VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams, VirtualHubsGetEffectiveVirtualHubRoutesResponse, GetInboundRoutesParameters, VirtualHubsGetInboundRoutesOptionalParams, VirtualHubsGetInboundRoutesResponse, GetOutboundRoutesParameters, VirtualHubsGetOutboundRoutesOptionalParams, VirtualHubsGetOutboundRoutesResponse } from "../models/index.js";
/** Class containing VirtualHubs operations. */
export declare class VirtualHubsImpl implements VirtualHubs {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualHubs class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the VirtualHubs in a resource group.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VirtualHubsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VirtualHub>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Lists all the VirtualHubs in a subscription.
     * @param options The options parameters.
     */
    list(options?: VirtualHubsListOptionalParams): PagedAsyncIterableIterator<VirtualHub>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualHubName: string, options?: VirtualHubsGetOptionalParams): Promise<VirtualHubsGetResponse>;
    /**
     * Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param virtualHubParameters Parameters supplied to create or update VirtualHub.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualHubName: string, virtualHubParameters: VirtualHub, options?: VirtualHubsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubsCreateOrUpdateResponse>, VirtualHubsCreateOrUpdateResponse>>;
    /**
     * Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param virtualHubParameters Parameters supplied to create or update VirtualHub.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualHubName: string, virtualHubParameters: VirtualHub, options?: VirtualHubsCreateOrUpdateOptionalParams): Promise<VirtualHubsCreateOrUpdateResponse>;
    /**
     * Updates VirtualHub tags.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param virtualHubParameters Parameters supplied to update VirtualHub tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, virtualHubName: string, virtualHubParameters: TagsObject, options?: VirtualHubsUpdateTagsOptionalParams): Promise<VirtualHubsUpdateTagsResponse>;
    /**
     * Deletes a VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualHubName: string, options?: VirtualHubsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualHubName: string, options?: VirtualHubsDeleteOptionalParams): Promise<void>;
    /**
     * Lists all the VirtualHubs in a resource group.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Lists all the VirtualHubs in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the effective routes configured for the Virtual Hub resource or the specified resource .
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    beginGetEffectiveVirtualHubRoutes(resourceGroupName: string, virtualHubName: string, options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubsGetEffectiveVirtualHubRoutesResponse>, VirtualHubsGetEffectiveVirtualHubRoutesResponse>>;
    /**
     * Gets the effective routes configured for the Virtual Hub resource or the specified resource .
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    beginGetEffectiveVirtualHubRoutesAndWait(resourceGroupName: string, virtualHubName: string, options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams): Promise<VirtualHubsGetEffectiveVirtualHubRoutesResponse>;
    /**
     * Gets the inbound routes configured for the Virtual Hub on a particular connection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param getInboundRoutesParameters Parameters supplied to get the inbound routes for a connection
     *                                   resource.
     * @param options The options parameters.
     */
    beginGetInboundRoutes(resourceGroupName: string, virtualHubName: string, getInboundRoutesParameters: GetInboundRoutesParameters, options?: VirtualHubsGetInboundRoutesOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubsGetInboundRoutesResponse>, VirtualHubsGetInboundRoutesResponse>>;
    /**
     * Gets the inbound routes configured for the Virtual Hub on a particular connection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param getInboundRoutesParameters Parameters supplied to get the inbound routes for a connection
     *                                   resource.
     * @param options The options parameters.
     */
    beginGetInboundRoutesAndWait(resourceGroupName: string, virtualHubName: string, getInboundRoutesParameters: GetInboundRoutesParameters, options?: VirtualHubsGetInboundRoutesOptionalParams): Promise<VirtualHubsGetInboundRoutesResponse>;
    /**
     * Gets the outbound routes configured for the Virtual Hub on a particular connection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param getOutboundRoutesParameters Parameters supplied to get the outbound routes for a connection
     *                                    resource.
     * @param options The options parameters.
     */
    beginGetOutboundRoutes(resourceGroupName: string, virtualHubName: string, getOutboundRoutesParameters: GetOutboundRoutesParameters, options?: VirtualHubsGetOutboundRoutesOptionalParams): Promise<SimplePollerLike<OperationState<VirtualHubsGetOutboundRoutesResponse>, VirtualHubsGetOutboundRoutesResponse>>;
    /**
     * Gets the outbound routes configured for the Virtual Hub on a particular connection.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param getOutboundRoutesParameters Parameters supplied to get the outbound routes for a connection
     *                                    resource.
     * @param options The options parameters.
     */
    beginGetOutboundRoutesAndWait(resourceGroupName: string, virtualHubName: string, getOutboundRoutesParameters: GetOutboundRoutesParameters, options?: VirtualHubsGetOutboundRoutesOptionalParams): Promise<VirtualHubsGetOutboundRoutesResponse>;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The resource group name of the VirtualHub.
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
//# sourceMappingURL=virtualHubs.d.ts.map