import { ResourceNavigationLinks } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { ResourceNavigationLinksListOptionalParams, ResourceNavigationLinksListResponse } from "../models/index.js";
/** Class containing ResourceNavigationLinks operations. */
export declare class ResourceNavigationLinksImpl implements ResourceNavigationLinks {
    private readonly client;
    /**
     * Initialize a new instance of the class ResourceNavigationLinks class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets a list of resource navigation links for a subnet.
     * @param resourceGroupName The name of the resource group.
     * @param virtualNetworkName The name of the virtual network.
     * @param subnetName The name of the subnet.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, virtualNetworkName: string, subnetName: string, options?: ResourceNavigationLinksListOptionalParams): Promise<ResourceNavigationLinksListResponse>;
}
//# sourceMappingURL=resourceNavigationLinks.d.ts.map