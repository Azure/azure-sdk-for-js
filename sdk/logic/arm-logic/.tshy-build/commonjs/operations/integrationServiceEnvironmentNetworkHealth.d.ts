import { IntegrationServiceEnvironmentNetworkHealth } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationServiceEnvironmentNetworkHealthGetOptionalParams, IntegrationServiceEnvironmentNetworkHealthGetResponse } from "../models/index.js";
/** Class containing IntegrationServiceEnvironmentNetworkHealth operations. */
export declare class IntegrationServiceEnvironmentNetworkHealthImpl implements IntegrationServiceEnvironmentNetworkHealth {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationServiceEnvironmentNetworkHealth class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets the integration service environment network health.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    get(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentNetworkHealthGetOptionalParams): Promise<IntegrationServiceEnvironmentNetworkHealthGetResponse>;
}
//# sourceMappingURL=integrationServiceEnvironmentNetworkHealth.d.ts.map