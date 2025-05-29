import { ServiceAssociationLinks } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ServiceAssociationLinksListOptionalParams, ServiceAssociationLinksListResponse } from "../models/index.js";
/** Class containing ServiceAssociationLinks operations. */
export declare class ServiceAssociationLinksImpl implements ServiceAssociationLinks {
    private readonly client;
    /**
     * Initialize a new instance of the class ServiceAssociationLinks class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets a list of service association links for a subnet.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: ServiceAssociationLinksListOptionalParams): Promise<ServiceAssociationLinksListResponse>;
}
//# sourceMappingURL=serviceAssociationLinks.d.ts.map