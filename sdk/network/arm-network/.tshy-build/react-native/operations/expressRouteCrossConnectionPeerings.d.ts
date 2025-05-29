import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteCrossConnectionPeerings } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRouteCrossConnectionPeering, ExpressRouteCrossConnectionPeeringsListOptionalParams, ExpressRouteCrossConnectionPeeringsDeleteOptionalParams, ExpressRouteCrossConnectionPeeringsGetOptionalParams, ExpressRouteCrossConnectionPeeringsGetResponse, ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams, ExpressRouteCrossConnectionPeeringsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing ExpressRouteCrossConnectionPeerings operations. */
export declare class ExpressRouteCrossConnectionPeeringsImpl implements ExpressRouteCrossConnectionPeerings {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteCrossConnectionPeerings class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all peerings in a specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, crossConnectionName: string, options?: ExpressRouteCrossConnectionPeeringsListOptionalParams): PagedAsyncIterableIterator<ExpressRouteCrossConnectionPeering>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all peerings in a specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Deletes the specified peering from the ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, crossConnectionName: string, peeringName: string, options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified peering from the ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, crossConnectionName: string, peeringName: string, options?: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified peering for the ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, crossConnectionName: string, peeringName: string, options?: ExpressRouteCrossConnectionPeeringsGetOptionalParams): Promise<ExpressRouteCrossConnectionPeeringsGetResponse>;
    /**
     * Creates or updates a peering in the specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param peeringParameters Parameters supplied to the create or update ExpressRouteCrossConnection
     *                          peering operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, crossConnectionName: string, peeringName: string, peeringParameters: ExpressRouteCrossConnectionPeering, options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCrossConnectionPeeringsCreateOrUpdateResponse>, ExpressRouteCrossConnectionPeeringsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a peering in the specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param peeringParameters Parameters supplied to the create or update ExpressRouteCrossConnection
     *                          peering operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, crossConnectionName: string, peeringName: string, peeringParameters: ExpressRouteCrossConnectionPeering, options?: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams): Promise<ExpressRouteCrossConnectionPeeringsCreateOrUpdateResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRouteCrossConnectionPeerings.d.ts.map