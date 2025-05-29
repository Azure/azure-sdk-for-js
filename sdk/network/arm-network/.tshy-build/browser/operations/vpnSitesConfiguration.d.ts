import { VpnSitesConfiguration } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { GetVpnSitesConfigurationRequest, VpnSitesConfigurationDownloadOptionalParams } from "../models/index.js";
/** Class containing VpnSitesConfiguration operations. */
export declare class VpnSitesConfigurationImpl implements VpnSitesConfiguration {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnSitesConfiguration class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gives the sas-url to download the configurations for vpn-sites in a resource group.
     * @param resourceGroupName The resource group name.
     * @param virtualWANName The name of the VirtualWAN for which configuration of all vpn-sites is needed.
     * @param request Parameters supplied to download vpn-sites configuration.
     * @param options The options parameters.
     */
    beginDownload(resourceGroupName: string, virtualWANName: string, request: GetVpnSitesConfigurationRequest, options?: VpnSitesConfigurationDownloadOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Gives the sas-url to download the configurations for vpn-sites in a resource group.
     * @param resourceGroupName The resource group name.
     * @param virtualWANName The name of the VirtualWAN for which configuration of all vpn-sites is needed.
     * @param request Parameters supplied to download vpn-sites configuration.
     * @param options The options parameters.
     */
    beginDownloadAndWait(resourceGroupName: string, virtualWANName: string, request: GetVpnSitesConfigurationRequest, options?: VpnSitesConfigurationDownloadOptionalParams): Promise<void>;
}
//# sourceMappingURL=vpnSitesConfiguration.d.ts.map