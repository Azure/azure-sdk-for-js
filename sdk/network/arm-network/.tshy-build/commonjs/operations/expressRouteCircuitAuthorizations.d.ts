import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteCircuitAuthorizations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRouteCircuitAuthorization, ExpressRouteCircuitAuthorizationsListOptionalParams, ExpressRouteCircuitAuthorizationsDeleteOptionalParams, ExpressRouteCircuitAuthorizationsGetOptionalParams, ExpressRouteCircuitAuthorizationsGetResponse, ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams, ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing ExpressRouteCircuitAuthorizations operations. */
export declare class ExpressRouteCircuitAuthorizationsImpl implements ExpressRouteCircuitAuthorizations {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteCircuitAuthorizations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all authorizations in an express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, circuitName: string, options?: ExpressRouteCircuitAuthorizationsListOptionalParams): PagedAsyncIterableIterator<ExpressRouteCircuitAuthorization>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified authorization from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param authorizationName The name of the authorization.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, circuitName: string, authorizationName: string, options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified authorization from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param authorizationName The name of the authorization.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, circuitName: string, authorizationName: string, options?: ExpressRouteCircuitAuthorizationsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified authorization from the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param authorizationName The name of the authorization.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, circuitName: string, authorizationName: string, options?: ExpressRouteCircuitAuthorizationsGetOptionalParams): Promise<ExpressRouteCircuitAuthorizationsGetResponse>;
    /**
     * Creates or updates an authorization in the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param authorizationName The name of the authorization.
     * @param authorizationParameters Parameters supplied to the create or update express route circuit
     *                                authorization operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, circuitName: string, authorizationName: string, authorizationParameters: ExpressRouteCircuitAuthorization, options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse>, ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse>>;
    /**
     * Creates or updates an authorization in the specified express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the express route circuit.
     * @param authorizationName The name of the authorization.
     * @param authorizationParameters Parameters supplied to the create or update express route circuit
     *                                authorization operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, circuitName: string, authorizationName: string, authorizationParameters: ExpressRouteCircuitAuthorization, options?: ExpressRouteCircuitAuthorizationsCreateOrUpdateOptionalParams): Promise<ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse>;
    /**
     * Gets all authorizations in an express route circuit.
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param circuitName The name of the circuit.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRouteCircuitAuthorizations.d.ts.map