import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteCircuitConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRouteCircuitConnection, ExpressRouteCircuitConnectionsListOptionalParams, ExpressRouteCircuitConnectionsDeleteOptionalParams, ExpressRouteCircuitConnectionsGetOptionalParams, ExpressRouteCircuitConnectionsGetResponse, ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams, ExpressRouteCircuitConnectionsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing ExpressRouteCircuitConnections operations. */
export declare class ExpressRouteCircuitConnectionsImpl implements ExpressRouteCircuitConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteCircuitConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all global reach connections associated with a private peering in an express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param peeringName The name of the peering.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, circuitName: string, peeringName: string, options?: ExpressRouteCircuitConnectionsListOptionalParams): PagedAsyncIterableIterator<ExpressRouteCircuitConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified Express Route Circuit Connection from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param connectionName The name of the express route circuit connection.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, circuitName: string, peeringName: string, connectionName: string, options?: ExpressRouteCircuitConnectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified Express Route Circuit Connection from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param connectionName The name of the express route circuit connection.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, circuitName: string, peeringName: string, connectionName: string, options?: ExpressRouteCircuitConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Express Route Circuit Connection from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param connectionName The name of the express route circuit connection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, circuitName: string, peeringName: string, connectionName: string, options?: ExpressRouteCircuitConnectionsGetOptionalParams): Promise<ExpressRouteCircuitConnectionsGetResponse>;
    /**
     * Creates or updates a Express Route Circuit Connection in the specified express route circuits.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param connectionName The name of the express route circuit connection.
     * @param expressRouteCircuitConnectionParameters Parameters supplied to the create or update express
     *                                                route circuit connection operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, circuitName: string, peeringName: string, connectionName: string, expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection, options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCircuitConnectionsCreateOrUpdateResponse>, ExpressRouteCircuitConnectionsCreateOrUpdateResponse>>;
    /**
     * Creates or updates a Express Route Circuit Connection in the specified express route circuits.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param peeringName The name of the peering.
     * @param connectionName The name of the express route circuit connection.
     * @param expressRouteCircuitConnectionParameters Parameters supplied to the create or update express
     *                                                route circuit connection operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, circuitName: string, peeringName: string, connectionName: string, expressRouteCircuitConnectionParameters: ExpressRouteCircuitConnection, options?: ExpressRouteCircuitConnectionsCreateOrUpdateOptionalParams): Promise<ExpressRouteCircuitConnectionsCreateOrUpdateResponse>;
    /**
     * Gets all global reach connections associated with a private peering in an express route circuit.
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
//# sourceMappingURL=expressRouteCircuitConnections.d.ts.map