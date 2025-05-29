import { PrivateEndpointConnections } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { PrivateEndpointConnectionsListOptionalParams, PrivateEndpointConnectionsListResponse, PrivateEndpointConnectionsGetOptionalParams, PrivateEndpointConnectionsGetResponse, PrivateEndpointConnection, PrivateEndpointConnectionsCreateOrUpdateOptionalParams, PrivateEndpointConnectionsCreateOrUpdateResponse, PrivateEndpointConnectionsDeleteOptionalParams } from "../models/index.js";
/** Class containing PrivateEndpointConnections operations. */
export declare class PrivateEndpointConnectionsImpl implements PrivateEndpointConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateEndpointConnections class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the private endpoint connections associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: PrivateEndpointConnectionsListOptionalParams): Promise<PrivateEndpointConnectionsListResponse>;
    /**
     * Gets the specified private endpoint connection associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Cognitive Services Account
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: PrivateEndpointConnectionsGetOptionalParams): Promise<PrivateEndpointConnectionsGetResponse>;
    /**
     * Update the state of specified private endpoint connection associated with the Cognitive Services
     * account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Cognitive Services Account
     * @param properties The private endpoint connection properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, properties: PrivateEndpointConnection, options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<PrivateEndpointConnectionsCreateOrUpdateResponse>, PrivateEndpointConnectionsCreateOrUpdateResponse>>;
    /**
     * Update the state of specified private endpoint connection associated with the Cognitive Services
     * account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Cognitive Services Account
     * @param properties The private endpoint connection properties.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, properties: PrivateEndpointConnection, options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams): Promise<PrivateEndpointConnectionsCreateOrUpdateResponse>;
    /**
     * Deletes the specified private endpoint connection associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Cognitive Services Account
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: PrivateEndpointConnectionsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified private endpoint connection associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param privateEndpointConnectionName The name of the private endpoint connection associated with the
     *                                      Cognitive Services Account
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: PrivateEndpointConnectionsDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=privateEndpointConnections.d.ts.map