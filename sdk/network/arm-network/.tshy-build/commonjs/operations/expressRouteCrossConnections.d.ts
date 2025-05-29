import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ExpressRouteCrossConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { ExpressRouteCrossConnection, ExpressRouteCrossConnectionsListOptionalParams, ExpressRouteCrossConnectionsListByResourceGroupOptionalParams, ExpressRouteCrossConnectionsGetOptionalParams, ExpressRouteCrossConnectionsGetResponse, ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams, ExpressRouteCrossConnectionsCreateOrUpdateResponse, TagsObject, ExpressRouteCrossConnectionsUpdateTagsOptionalParams, ExpressRouteCrossConnectionsUpdateTagsResponse, ExpressRouteCrossConnectionsListArpTableOptionalParams, ExpressRouteCrossConnectionsListArpTableResponse, ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams, ExpressRouteCrossConnectionsListRoutesTableSummaryResponse, ExpressRouteCrossConnectionsListRoutesTableOptionalParams, ExpressRouteCrossConnectionsListRoutesTableResponse } from "../models/index.js";
/** Class containing ExpressRouteCrossConnections operations. */
export declare class ExpressRouteCrossConnectionsImpl implements ExpressRouteCrossConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class ExpressRouteCrossConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves all the ExpressRouteCrossConnections in a subscription.
     * @param options The options parameters.
     */
    list(options?: ExpressRouteCrossConnectionsListOptionalParams): PagedAsyncIterableIterator<ExpressRouteCrossConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves all the ExpressRouteCrossConnections in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: ExpressRouteCrossConnectionsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<ExpressRouteCrossConnection>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Retrieves all the ExpressRouteCrossConnections in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Retrieves all the ExpressRouteCrossConnections in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Gets details about the specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group (peering location of the circuit).
     * @param crossConnectionName The name of the ExpressRouteCrossConnection (service key of the circuit).
     * @param options The options parameters.
     */
    get(resourceGroupName: string, crossConnectionName: string, options?: ExpressRouteCrossConnectionsGetOptionalParams): Promise<ExpressRouteCrossConnectionsGetResponse>;
    /**
     * Update the specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param parameters Parameters supplied to the update express route crossConnection operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, crossConnectionName: string, parameters: ExpressRouteCrossConnection, options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCrossConnectionsCreateOrUpdateResponse>, ExpressRouteCrossConnectionsCreateOrUpdateResponse>>;
    /**
     * Update the specified ExpressRouteCrossConnection.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param parameters Parameters supplied to the update express route crossConnection operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, crossConnectionName: string, parameters: ExpressRouteCrossConnection, options?: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams): Promise<ExpressRouteCrossConnectionsCreateOrUpdateResponse>;
    /**
     * Updates an express route cross connection tags.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the cross connection.
     * @param crossConnectionParameters Parameters supplied to update express route cross connection tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, crossConnectionName: string, crossConnectionParameters: TagsObject, options?: ExpressRouteCrossConnectionsUpdateTagsOptionalParams): Promise<ExpressRouteCrossConnectionsUpdateTagsResponse>;
    /**
     * Gets the currently advertised ARP table associated with the express route cross connection in a
     * resource group.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param devicePath The path of the device.
     * @param options The options parameters.
     */
    beginListArpTable(resourceGroupName: string, crossConnectionName: string, peeringName: string, devicePath: string, options?: ExpressRouteCrossConnectionsListArpTableOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCrossConnectionsListArpTableResponse>, ExpressRouteCrossConnectionsListArpTableResponse>>;
    /**
     * Gets the currently advertised ARP table associated with the express route cross connection in a
     * resource group.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param devicePath The path of the device.
     * @param options The options parameters.
     */
    beginListArpTableAndWait(resourceGroupName: string, crossConnectionName: string, peeringName: string, devicePath: string, options?: ExpressRouteCrossConnectionsListArpTableOptionalParams): Promise<ExpressRouteCrossConnectionsListArpTableResponse>;
    /**
     * Gets the route table summary associated with the express route cross connection in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param devicePath The path of the device.
     * @param options The options parameters.
     */
    beginListRoutesTableSummary(resourceGroupName: string, crossConnectionName: string, peeringName: string, devicePath: string, options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCrossConnectionsListRoutesTableSummaryResponse>, ExpressRouteCrossConnectionsListRoutesTableSummaryResponse>>;
    /**
     * Gets the route table summary associated with the express route cross connection in a resource group.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param devicePath The path of the device.
     * @param options The options parameters.
     */
    beginListRoutesTableSummaryAndWait(resourceGroupName: string, crossConnectionName: string, peeringName: string, devicePath: string, options?: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams): Promise<ExpressRouteCrossConnectionsListRoutesTableSummaryResponse>;
    /**
     * Gets the currently advertised routes table associated with the express route cross connection in a
     * resource group.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param devicePath The path of the device.
     * @param options The options parameters.
     */
    beginListRoutesTable(resourceGroupName: string, crossConnectionName: string, peeringName: string, devicePath: string, options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams): Promise<SimplePollerLike<OperationState<ExpressRouteCrossConnectionsListRoutesTableResponse>, ExpressRouteCrossConnectionsListRoutesTableResponse>>;
    /**
     * Gets the currently advertised routes table associated with the express route cross connection in a
     * resource group.
     * @param resourceGroupName The name of the resource group.
     * @param crossConnectionName The name of the ExpressRouteCrossConnection.
     * @param peeringName The name of the peering.
     * @param devicePath The path of the device.
     * @param options The options parameters.
     */
    beginListRoutesTableAndWait(resourceGroupName: string, crossConnectionName: string, peeringName: string, devicePath: string, options?: ExpressRouteCrossConnectionsListRoutesTableOptionalParams): Promise<ExpressRouteCrossConnectionsListRoutesTableResponse>;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=expressRouteCrossConnections.d.ts.map