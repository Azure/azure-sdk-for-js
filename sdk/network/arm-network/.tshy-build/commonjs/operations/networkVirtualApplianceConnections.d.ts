import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NetworkVirtualApplianceConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { NetworkVirtualApplianceConnection, NetworkVirtualApplianceConnectionsListOptionalParams, NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams, NetworkVirtualApplianceConnectionsCreateOrUpdateResponse, NetworkVirtualApplianceConnectionsGetOptionalParams, NetworkVirtualApplianceConnectionsGetResponse, NetworkVirtualApplianceConnectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing NetworkVirtualApplianceConnections operations. */
export declare class NetworkVirtualApplianceConnectionsImpl implements NetworkVirtualApplianceConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkVirtualApplianceConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists NetworkVirtualApplianceConnections under the NVA.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkVirtualApplianceName: string, options?: NetworkVirtualApplianceConnectionsListOptionalParams): PagedAsyncIterableIterator<NetworkVirtualApplianceConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Creates a connection to Network Virtual Appliance, if it doesn't exist else updates the existing NVA
     * connection'
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param connectionName The name of the NVA connection.
     * @param networkVirtualApplianceConnectionParameters Parameters supplied in an
     *                                                    NetworkVirtualApplianceConnection PUT operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkVirtualApplianceName: string, connectionName: string, networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection, options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<NetworkVirtualApplianceConnectionsCreateOrUpdateResponse>, NetworkVirtualApplianceConnectionsCreateOrUpdateResponse>>;
    /**
     * Creates a connection to Network Virtual Appliance, if it doesn't exist else updates the existing NVA
     * connection'
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param connectionName The name of the NVA connection.
     * @param networkVirtualApplianceConnectionParameters Parameters supplied in an
     *                                                    NetworkVirtualApplianceConnection PUT operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkVirtualApplianceName: string, connectionName: string, networkVirtualApplianceConnectionParameters: NetworkVirtualApplianceConnection, options?: NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams): Promise<NetworkVirtualApplianceConnectionsCreateOrUpdateResponse>;
    /**
     * Retrieves the details of specified NVA connection.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param connectionName The name of the NVA connection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkVirtualApplianceName: string, connectionName: string, options?: NetworkVirtualApplianceConnectionsGetOptionalParams): Promise<NetworkVirtualApplianceConnectionsGetResponse>;
    /**
     * Deletes a NVA connection.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param connectionName The name of the NVA connection.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkVirtualApplianceName: string, connectionName: string, options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a NVA connection.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param connectionName The name of the NVA connection.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkVirtualApplianceName: string, connectionName: string, options?: NetworkVirtualApplianceConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * Lists NetworkVirtualApplianceConnections under the NVA.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=networkVirtualApplianceConnections.d.ts.map