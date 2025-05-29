import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PrivateEndpointConnections } from "../operationsInterfaces/index.js";
import { StorageManagementClient } from "../storageManagementClient.js";
import { PrivateEndpointConnection, PrivateEndpointConnectionsListOptionalParams, PrivateEndpointConnectionsGetOptionalParams, PrivateEndpointConnectionsGetResponse, PrivateEndpointConnectionsPutOptionalParams, PrivateEndpointConnectionsPutResponse, PrivateEndpointConnectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing PrivateEndpointConnections operations. */
export declare class PrivateEndpointConnectionsImpl implements PrivateEndpointConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateEndpointConnections class.
     * @param client Reference to the service client
     */
    constructor(client: StorageManagementClient);
    /**
     * List all the private endpoint connections associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: PrivateEndpointConnectionsListOptionalParams): PagedAsyncIterableIterator<PrivateEndpointConnection>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List all the private endpoint connections associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified private endpoint connection associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: PrivateEndpointConnectionsGetOptionalParams): Promise<PrivateEndpointConnectionsGetResponse>;
    /**
     * Update the state of specified private endpoint connection associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource
     * @param properties The private endpoint connection properties.
     * @param options The options parameters.
     */
    put(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, properties: PrivateEndpointConnection, options?: PrivateEndpointConnectionsPutOptionalParams): Promise<PrivateEndpointConnectionsPutResponse>;
    /**
     * Deletes the specified private endpoint connection associated with the storage account.
     * @param resourceGroupName The name of the resource group within the user's subscription. The name is
     *                          case insensitive.
     * @param accountName The name of the storage account within the specified resource group. Storage
     *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
     *                    only.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Azure resource
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: PrivateEndpointConnectionsDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=privateEndpointConnections.d.ts.map