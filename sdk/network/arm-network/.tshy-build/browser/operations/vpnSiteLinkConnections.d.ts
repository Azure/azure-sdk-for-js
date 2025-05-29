import { VpnSiteLinkConnections } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { VpnSiteLinkConnectionsGetOptionalParams, VpnSiteLinkConnectionsGetResponse } from "../models/index.js";
/** Class containing VpnSiteLinkConnections operations. */
export declare class VpnSiteLinkConnectionsImpl implements VpnSiteLinkConnections {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnSiteLinkConnections class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Retrieves the details of a vpn site link connection.
     * @param resourceGroupName The resource group name of the VpnGateway.
     * @param gatewayName The name of the gateway.
     * @param connectionName The name of the vpn connection.
     * @param linkConnectionName The name of the vpn connection.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, gatewayName: string, connectionName: string, linkConnectionName: string, options?: VpnSiteLinkConnectionsGetOptionalParams): Promise<VpnSiteLinkConnectionsGetResponse>;
}
//# sourceMappingURL=vpnSiteLinkConnections.d.ts.map