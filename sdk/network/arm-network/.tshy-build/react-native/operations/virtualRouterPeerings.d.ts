import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualRouterPeerings } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualRouterPeering, VirtualRouterPeeringsListOptionalParams, VirtualRouterPeeringsDeleteOptionalParams, VirtualRouterPeeringsGetOptionalParams, VirtualRouterPeeringsGetResponse, VirtualRouterPeeringsCreateOrUpdateOptionalParams, VirtualRouterPeeringsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing VirtualRouterPeerings operations. */
export declare class VirtualRouterPeeringsImpl implements VirtualRouterPeerings {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualRouterPeerings class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Virtual Router Peerings in a Virtual Router resource.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualRouterName: string, options?: VirtualRouterPeeringsListOptionalParams): PagedAsyncIterableIterator<VirtualRouterPeering>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified peering from a Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualRouterName: string, peeringName: string, options?: VirtualRouterPeeringsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified peering from a Virtual Router.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualRouterName: string, peeringName: string, options?: VirtualRouterPeeringsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Virtual Router Peering.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param peeringName The name of the Virtual Router Peering.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualRouterName: string, peeringName: string, options?: VirtualRouterPeeringsGetOptionalParams): Promise<VirtualRouterPeeringsGetResponse>;
    /**
     * Creates or updates the specified Virtual Router Peering.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param peeringName The name of the Virtual Router Peering.
     * @param parameters Parameters supplied to the create or update Virtual Router Peering operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualRouterName: string, peeringName: string, parameters: VirtualRouterPeering, options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualRouterPeeringsCreateOrUpdateResponse>, VirtualRouterPeeringsCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Virtual Router Peering.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param peeringName The name of the Virtual Router Peering.
     * @param parameters Parameters supplied to the create or update Virtual Router Peering operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualRouterName: string, peeringName: string, parameters: VirtualRouterPeering, options?: VirtualRouterPeeringsCreateOrUpdateOptionalParams): Promise<VirtualRouterPeeringsCreateOrUpdateResponse>;
    /**
     * Lists all Virtual Router Peerings in a Virtual Router resource.
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param virtualRouterName The name of the Virtual Router.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualRouterPeerings.d.ts.map