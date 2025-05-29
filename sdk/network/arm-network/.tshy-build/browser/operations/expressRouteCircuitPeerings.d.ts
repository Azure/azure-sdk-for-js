import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteCircuitPeerings } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRouteCircuitPeering, ExpressRouteCircuitPeeringsListOptionalParams, ExpressRouteCircuitPeeringsDeleteOptionalParams, ExpressRouteCircuitPeeringsGetOptionalParams, ExpressRouteCircuitPeeringsGetResponse, ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams, ExpressRouteCircuitPeeringsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing ExpressRouteCircuitPeerings operations. */
export declare class ExpressRouteCircuitPeeringsImpl implements ExpressRouteCircuitPeerings {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteCircuitPeerings class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all peerings in a specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, circuitName: string, options?: ExpressRouteCircuitPeeringsListOptionalParams): PagedAsyncIterableIterator<ExpressRouteCircuitPeering>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified peering from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, circuitName: string, peeringName: string, options?: ExpressRouteCircuitPeeringsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified peering from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, circuitName: string, peeringName: string, options?: ExpressRouteCircuitPeeringsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified peering for the express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, circuitName: string, peeringName: string, options?: ExpressRouteCircuitPeeringsGetOptionalParams): Promise<ExpressRouteCircuitPeeringsGetResponse>;
    /**
     * Creates or updates a peering in the specified express route circuits.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param peeringParameters Parameters supplied to the create or update express route circuit peering
     *                          operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, circuitName: string, peeringName: string, peeringParameters: ExpressRouteCircuitPeering, options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCircuitPeeringsCreateOrUpdateResponse>, ExpressRouteCircuitPeeringsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a peering in the specified express route circuits.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param peeringParameters Parameters supplied to the create or update express route circuit peering
     *                          operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, circuitName: string, peeringName: string, peeringParameters: ExpressRouteCircuitPeering, options?: ExpressRouteCircuitPeeringsCreateOrUpdateOptionalParams): Promise<ExpressRouteCircuitPeeringsCreateOrUpdateResponse>;
    /**
     * Gets all peerings in a specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRouteCircuitPeerings.d.ts.map