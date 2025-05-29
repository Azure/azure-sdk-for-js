import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ManagementGroupNetworkManagerConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { NetworkManagerConnection, ManagementGroupNetworkManagerConnectionsListOptionalParams, ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams, ManagementGroupNetworkManagerConnectionsCreateOrUpdateResponse, ManagementGroupNetworkManagerConnectionsGetOptionalParams, ManagementGroupNetworkManagerConnectionsGetResponse, ManagementGroupNetworkManagerConnectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing ManagementGroupNetworkManagerConnections operations. */
export declare class ManagementGroupNetworkManagerConnectionsImpl implements ManagementGroupNetworkManagerConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class ManagementGroupNetworkManagerConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * List all network manager connections created by this management group.
     * @param managementGroupId The management group Id which uniquely identify the Microsoft Azure
     *                          management group.
     * @param options The options parameters.
     */
    list(managementGroupId: string, options?: ManagementGroupNetworkManagerConnectionsListOptionalParams): PagedAsyncIterableIterator<NetworkManagerConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Create a network manager connection on this management group.
     * @param managementGroupId The management group Id which uniquely identify the Microsoft Azure
     *                          management group.
     * @param networkManagerConnectionName Name for the network manager connection.
     * @param parameters Network manager connection to be created/updated.
     * @param options The options parameters.
     */
    createOrUpdate(managementGroupId: string, networkManagerConnectionName: string, parameters: NetworkManagerConnection, options?: ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams): Promise<ManagementGroupNetworkManagerConnectionsCreateOrUpdateResponse>;
    /**
     * Get a specified connection created by this management group.
     * @param managementGroupId The management group Id which uniquely identify the Microsoft Azure
     *                          management group.
     * @param networkManagerConnectionName Name for the network manager connection.
     * @param options The options parameters.
     */
    get(managementGroupId: string, networkManagerConnectionName: string, options?: ManagementGroupNetworkManagerConnectionsGetOptionalParams): Promise<ManagementGroupNetworkManagerConnectionsGetResponse>;
    /**
     * Delete specified pending connection created by this management group.
     * @param managementGroupId The management group Id which uniquely identify the Microsoft Azure
     *                          management group.
     * @param networkManagerConnectionName Name for the network manager connection.
     * @param options The options parameters.
     */
    delete(managementGroupId: string, networkManagerConnectionName: string, options?: ManagementGroupNetworkManagerConnectionsDeleteOptionalParams): Promise<void>;
    /**
     * List all network manager connections created by this management group.
     * @param managementGroupId The management group Id which uniquely identify the Microsoft Azure
     *                          management group.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param managementGroupId The management group Id which uniquely identify the Microsoft Azure
     *                          management group.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=managementGroupNetworkManagerConnections.d.ts.map