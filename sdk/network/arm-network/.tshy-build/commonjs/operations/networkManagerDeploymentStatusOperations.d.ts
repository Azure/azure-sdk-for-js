import { NetworkManagerDeploymentStatusOperations } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { NetworkManagerDeploymentStatusParameter, NetworkManagerDeploymentStatusListOptionalParams, NetworkManagerDeploymentStatusListResponse } from "../models/index.js";
/** Class containing NetworkManagerDeploymentStatusOperations operations. */
export declare class NetworkManagerDeploymentStatusOperationsImpl implements NetworkManagerDeploymentStatusOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class NetworkManagerDeploymentStatusOperations class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Post to List of Network Manager Deployment Status.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param parameters Parameters supplied to specify which Managed Network deployment status is.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, parameters: NetworkManagerDeploymentStatusParameter, options?: NetworkManagerDeploymentStatusListOptionalParams): Promise<NetworkManagerDeploymentStatusListResponse>;
}
//# sourceMappingURL=networkManagerDeploymentStatusOperations.d.ts.map