import { GatewaysDeleteOptionalParams } from "../models/index.js";
/** Interface representing a Gateways. */
export interface Gateways {
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