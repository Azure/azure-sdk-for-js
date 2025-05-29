import { IntegrationServiceEnvironmentNetworkHealthGetOptionalParams, IntegrationServiceEnvironmentNetworkHealthGetResponse } from "../models/index.js";
/** Interface representing a IntegrationServiceEnvironmentNetworkHealth. */
export interface IntegrationServiceEnvironmentNetworkHealth {
    /**
     * Gets the integration service environment network health.
     * @param resourceGroup The resource group.
     * @param integrationServiceEnvironmentName The integration service environment name.
     * @param options The options parameters.
     */
    get(resourceGroup: string, integrationServiceEnvironmentName: string, options?: IntegrationServiceEnvironmentNetworkHealthGetOptionalParams): Promise<IntegrationServiceEnvironmentNetworkHealthGetResponse>;
}
//# sourceMappingURL=integrationServiceEnvironmentNetworkHealth.d.ts.map