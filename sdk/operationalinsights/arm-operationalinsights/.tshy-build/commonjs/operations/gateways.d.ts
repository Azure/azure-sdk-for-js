import { Gateways } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { GatewaysDeleteOptionalParams } from "../models/index.js";
/** Class containing Gateways operations. */
export declare class GatewaysImpl implements Gateways {
    private readonly client;
    /**
     * Initialize a new instance of the class Gateways class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Delete a Log Analytics gateway.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param gatewayId The Log Analytics gateway Id.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, workspaceName: string, gatewayId: string, options?: GatewaysDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=gateways.d.ts.map