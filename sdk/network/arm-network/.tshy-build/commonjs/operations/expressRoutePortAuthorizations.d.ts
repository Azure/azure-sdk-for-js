import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRoutePortAuthorizations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRoutePortAuthorization, ExpressRoutePortAuthorizationsListOptionalParams, ExpressRoutePortAuthorizationsDeleteOptionalParams, ExpressRoutePortAuthorizationsGetOptionalParams, ExpressRoutePortAuthorizationsGetResponse, ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams, ExpressRoutePortAuthorizationsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing ExpressRoutePortAuthorizations operations. */
export declare class ExpressRoutePortAuthorizationsImpl implements ExpressRoutePortAuthorizations {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRoutePortAuthorizations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all authorizations in an express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, expressRoutePortName: string, options?: ExpressRoutePortAuthorizationsListOptionalParams): PagedAsyncIterableIterator<ExpressRoutePortAuthorization>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified authorization from the specified express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param authorizationName The name of the authorization.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, expressRoutePortName: string, authorizationName: string, options?: ExpressRoutePortAuthorizationsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified authorization from the specified express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param authorizationName The name of the authorization.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, expressRoutePortName: string, authorizationName: string, options?: ExpressRoutePortAuthorizationsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified authorization from the specified express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param authorizationName The name of the authorization.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, expressRoutePortName: string, authorizationName: string, options?: ExpressRoutePortAuthorizationsGetOptionalParams): Promise<ExpressRoutePortAuthorizationsGetResponse>;
    /**
     * Creates or updates an authorization in the specified express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param authorizationName The name of the authorization.
     * @param authorizationParameters Parameters supplied to the create or update express route port
     *                                authorization operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, expressRoutePortName: string, authorizationName: string, authorizationParameters: ExpressRoutePortAuthorization, options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRoutePortAuthorizationsCreateOrUpdateResponse>, ExpressRoutePortAuthorizationsCreateOrUpdateResponse>>;
    /**
     * Creates or updates an authorization in the specified express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param authorizationName The name of the authorization.
     * @param authorizationParameters Parameters supplied to the create or update express route port
     *                                authorization operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, expressRoutePortName: string, authorizationName: string, authorizationParameters: ExpressRoutePortAuthorization, options?: ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams): Promise<ExpressRoutePortAuthorizationsCreateOrUpdateResponse>;
    /**
     * Gets all authorizations in an express route port.
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param expressRoutePortName The name of the express route port.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=expressRoutePortAuthorizations.d.ts.map