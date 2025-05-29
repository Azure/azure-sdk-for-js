import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualNetworks } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualNetwork, VirtualNetworksListAllOptionalParams, VirtualNetworksListOptionalParams, VirtualNetworkUsage, VirtualNetworksListUsageOptionalParams, PublicIpDdosProtectionStatusResult, VirtualNetworksListDdosProtectionStatusOptionalParams, VirtualNetworksDeleteOptionalParams, VirtualNetworksGetOptionalParams, VirtualNetworksGetResponse, VirtualNetworksCreateOrUpdateOptionalParams, VirtualNetworksCreateOrUpdateResponse, TagsObject, VirtualNetworksUpdateTagsOptionalParams, VirtualNetworksUpdateTagsResponse, VirtualNetworksCheckIPAddressAvailabilityOptionalParams, VirtualNetworksCheckIPAddressAvailabilityResponse } from "../models/index.js";
/** Class containing VirtualNetworks operations. */
export declare class VirtualNetworksImpl implements VirtualNetworks {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualNetworks class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all virtual networks in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: VirtualNetworksListAllOptionalParams): PagedAsyncIterableIterator<VirtualNetwork>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all virtual networks in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: VirtualNetworksListOptionalParams): PagedAsyncIterableIterator<VirtualNetwork>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists usage stats.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    listUsage(resourceGroupName: string, virtualNetworkName: string, options?: VirtualNetworksListUsageOptionalParams): PagedAsyncIterableIterator<VirtualNetworkUsage>;
    private listUsagePagingPage;
    private listUsagePagingAll;
    /**
     * Gets the Ddos Protection Status of all IP Addresses under the Virtual Network
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    beginListDdosProtectionStatusAndWait(resourceGroupName: string, virtualNetworkName: string, options?: VirtualNetworksListDdosProtectionStatusOptionalParams): PagedAsyncIterableIterator<PublicIpDdosProtectionStatusResult>;
    private listDdosProtectionStatusPagingPage;
    private listDdosProtectionStatusPagingAll;
    /**
     * Deletes the specified virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualNetworkName: string, options?: VirtualNetworksDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualNetworkName: string, options?: VirtualNetworksDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified virtual network by resource group.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualNetworkName: string, options?: VirtualNetworksGetOptionalParams): Promise<VirtualNetworksGetResponse>;
    /**
     * Creates or updates a virtual network in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param parameters Parameters supplied to the create or update virtual network operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualNetworkName: string, parameters: VirtualNetwork, options?: VirtualNetworksCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualNetworksCreateOrUpdateResponse>, VirtualNetworksCreateOrUpdateResponse>>;
    /**
     * Creates or updates a virtual network in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param parameters Parameters supplied to the create or update virtual network operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualNetworkName: string, parameters: VirtualNetwork, options?: VirtualNetworksCreateOrUpdateOptionalParams): Promise<VirtualNetworksCreateOrUpdateResponse>;
    /**
     * Updates a virtual network tags.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param parameters Parameters supplied to update virtual network tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, virtualNetworkName: string, parameters: TagsObject, options?: VirtualNetworksUpdateTagsOptionalParams): Promise<VirtualNetworksUpdateTagsResponse>;
    /**
     * Gets all virtual networks in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * Gets all virtual networks in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Checks whether a private IP address is available for use.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param ipAddress The private IP address to be verified.
     * @param options The options parameters.
     */
    checkIPAddressAvailability(resourceGroupName: string, virtualNetworkName: string, ipAddress: string, options?: VirtualNetworksCheckIPAddressAvailabilityOptionalParams): Promise<VirtualNetworksCheckIPAddressAvailabilityResponse>;
    /**
     * Lists usage stats.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    private _listUsage;
    /**
     * Gets the Ddos Protection Status of all IP Addresses under the Virtual Network
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    private _listDdosProtectionStatus;
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
    /**
     * ListUsageNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param nextLink The nextLink from the previous successful call to the ListUsage method.
     * @param options The options parameters.
     */
    private _listUsageNext;
    /**
     * ListDdosProtectionStatusNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param nextLink The nextLink from the previous successful call to the ListDdosProtectionStatus
     *                 method.
     * @param options The options parameters.
     */
    private _listDdosProtectionStatusNext;
}
//# sourceMappingURL=virtualNetworks.d.ts.map