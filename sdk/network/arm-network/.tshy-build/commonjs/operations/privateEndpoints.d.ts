import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PrivateEndpoints } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { PrivateEndpoint, PrivateEndpointsListOptionalParams, PrivateEndpointsListBySubscriptionOptionalParams, PrivateEndpointsDeleteOptionalParams, PrivateEndpointsGetOptionalParams, PrivateEndpointsGetResponse, PrivateEndpointsCreateOrUpdateOptionalParams, PrivateEndpointsCreateOrUpdateResponse } from "../models/index.js";
/** Class containing PrivateEndpoints operations. */
export declare class PrivateEndpointsImpl implements PrivateEndpoints {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateEndpoints class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all private endpoints in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, options?: PrivateEndpointsListOptionalParams): PagedAsyncIterableIterator<PrivateEndpoint>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all private endpoints in a subscription.
     * @param options The options parameters.
     */
    listBySubscription(options?: PrivateEndpointsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<PrivateEndpoint>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Deletes the specified private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, privateEndpointName: string, options?: PrivateEndpointsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified private endpoint.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, privateEndpointName: string, options?: PrivateEndpointsDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified private endpoint by resource group.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, privateEndpointName: string, options?: PrivateEndpointsGetOptionalParams): Promise<PrivateEndpointsGetResponse>;
    /**
     * Creates or updates an private endpoint in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param parameters Parameters supplied to the create or update private endpoint operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, privateEndpointName: string, parameters: PrivateEndpoint, options?: PrivateEndpointsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<PrivateEndpointsCreateOrUpdateResponse>, PrivateEndpointsCreateOrUpdateResponse>>;
    /**
     * Creates or updates an private endpoint in the specified resource group.
     * @param resourceGroupName The name of the resource group.
     * @param privateEndpointName The name of the private endpoint.
     * @param parameters Parameters supplied to the create or update private endpoint operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, privateEndpointName: string, parameters: PrivateEndpoint, options?: PrivateEndpointsCreateOrUpdateOptionalParams): Promise<PrivateEndpointsCreateOrUpdateResponse>;
    /**
     * Gets all private endpoints in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets all private endpoints in a subscription.
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
}
//# sourceMappingURL=privateEndpoints.d.ts.map