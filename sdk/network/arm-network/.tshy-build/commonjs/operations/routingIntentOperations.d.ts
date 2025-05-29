import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RoutingIntentOperations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { RoutingIntent, RoutingIntentListOptionalParams, RoutingIntentCreateOrUpdateOptionalParams, RoutingIntentCreateOrUpdateResponse, RoutingIntentGetOptionalParams, RoutingIntentGetResponse, RoutingIntentDeleteOptionalParams } from "../models/index.js";
/** Class containing RoutingIntentOperations operations. */
export declare class RoutingIntentOperationsImpl implements RoutingIntentOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class RoutingIntentOperations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of all RoutingIntent child resources of the VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualHubName: string, options?: RoutingIntentListOptionalParams): PagedAsyncIterableIterator<RoutingIntent>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
     * @param resourceGroupName The resource group name of the RoutingIntent.
     * @param virtualHubName The name of the VirtualHub.
     * @param routingIntentName The name of the per VirtualHub singleton Routing Intent resource.
     * @param routingIntentParameters Parameters supplied to create or update RoutingIntent.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, virtualHubName: string, routingIntentName: string, routingIntentParameters: RoutingIntent, options?: RoutingIntentCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<RoutingIntentCreateOrUpdateResponse>, RoutingIntentCreateOrUpdateResponse>>;
    /**
     * Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.
     * @param resourceGroupName The resource group name of the RoutingIntent.
     * @param virtualHubName The name of the VirtualHub.
     * @param routingIntentName The name of the per VirtualHub singleton Routing Intent resource.
     * @param routingIntentParameters Parameters supplied to create or update RoutingIntent.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, virtualHubName: string, routingIntentName: string, routingIntentParameters: RoutingIntent, options?: RoutingIntentCreateOrUpdateOptionalParams): Promise<RoutingIntentCreateOrUpdateResponse>;
    /**
     * Retrieves the details of a RoutingIntent.
     * @param resourceGroupName The resource group name of the RoutingIntent.
     * @param virtualHubName The name of the VirtualHub.
     * @param routingIntentName The name of the RoutingIntent.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualHubName: string, routingIntentName: string, options?: RoutingIntentGetOptionalParams): Promise<RoutingIntentGetResponse>;
    /**
     * Deletes a RoutingIntent.
     * @param resourceGroupName The resource group name of the RoutingIntent.
     * @param virtualHubName The name of the VirtualHub.
     * @param routingIntentName The name of the RoutingIntent.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, virtualHubName: string, routingIntentName: string, options?: RoutingIntentDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a RoutingIntent.
     * @param resourceGroupName The resource group name of the RoutingIntent.
     * @param virtualHubName The name of the VirtualHub.
     * @param routingIntentName The name of the RoutingIntent.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, virtualHubName: string, routingIntentName: string, options?: RoutingIntentDeleteOptionalParams): Promise<void>;
    /**
     * Retrieves the details of all RoutingIntent child resources of the VirtualHub.
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The resource group name of the VirtualHub.
     * @param virtualHubName The name of the VirtualHub.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=routingIntentOperations.d.ts.map