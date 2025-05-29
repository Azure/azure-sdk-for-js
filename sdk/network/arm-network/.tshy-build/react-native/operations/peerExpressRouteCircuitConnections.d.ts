import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PeerExpressRouteCircuitConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { PeerExpressRouteCircuitConnection, PeerExpressRouteCircuitConnectionsListOptionalParams, PeerExpressRouteCircuitConnectionsGetOptionalParams, PeerExpressRouteCircuitConnectionsGetResponse } from "../models/index.js";
/** Class containing PeerExpressRouteCircuitConnections operations. */
export declare class PeerExpressRouteCircuitConnectionsImpl implements PeerExpressRouteCircuitConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class PeerExpressRouteCircuitConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all global reach peer connections associated with a private peering in an express route
     * circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, circuitName: string, peeringName: string, options?: PeerExpressRouteCircuitConnectionsListOptionalParams): PagedAsyncIterableIterator<PeerExpressRouteCircuitConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param connectionName The name of the peer express route circuit connection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, circuitName: string, peeringName: string, connectionName: string, options?: PeerExpressRouteCircuitConnectionsGetOptionalParams): Promise<PeerExpressRouteCircuitConnectionsGetResponse>;
    /**
     * Gets all global reach peer connections associated with a private peering in an express route
     * circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param peeringName The name of the peering.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=peerExpressRouteCircuitConnections.d.ts.map