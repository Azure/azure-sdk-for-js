import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualNetworkPeerings } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualNetworkPeering, VirtualNetworkPeeringsListOptionalParams, VirtualNetworkPeeringsDeleteOptionalParams, VirtualNetworkPeeringsGetOptionalParams, VirtualNetworkPeeringsGetResponse, VirtualNetworkPeeringsCreateOrUpdateOptionalParams, VirtualNetworkPeeringsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing VirtualNetworkPeerings operations. */
export declare class VirtualNetworkPeeringsImpl implements VirtualNetworkPeerings {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualNetworkPeerings class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all virtual network peerings in a virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualNetworkName: string, options?: VirtualNetworkPeeringsListOptionalParams): PagedAsyncIterableIterator<VirtualNetworkPeering>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified virtual network peering.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param virtualNetworkPeeringName The name of the virtual network peering.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualNetworkName: string, virtualNetworkPeeringName: string, options?: VirtualNetworkPeeringsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified virtual network peering.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param virtualNetworkPeeringName The name of the virtual network peering.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualNetworkName: string, virtualNetworkPeeringName: string, options?: VirtualNetworkPeeringsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified virtual network peering.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param virtualNetworkPeeringName The name of the virtual network peering.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualNetworkName: string, virtualNetworkPeeringName: string, options?: VirtualNetworkPeeringsGetOptionalParams): Promise<VirtualNetworkPeeringsGetResponse>;
    /**
     * Creates or updates a peering in the specified virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param virtualNetworkPeeringName The name of the peering.
     * @param virtualNetworkPeeringParameters Parameters supplied to the create or update virtual network
     *                                        peering operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualNetworkName: string, virtualNetworkPeeringName: string, virtualNetworkPeeringParameters: VirtualNetworkPeering, options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualNetworkPeeringsCreateOrUpdateResponse>, VirtualNetworkPeeringsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a peering in the specified virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param virtualNetworkPeeringName The name of the peering.
     * @param virtualNetworkPeeringParameters Parameters supplied to the create or update virtual network
     *                                        peering operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualNetworkName: string, virtualNetworkPeeringName: string, virtualNetworkPeeringParameters: VirtualNetworkPeering, options?: VirtualNetworkPeeringsCreateOrUpdateOptionalParams): Promise<VirtualNetworkPeeringsCreateOrUpdateResponse>;
    /**
     * Gets all virtual network peerings in a virtual network.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualNetworkPeerings.d.ts.map