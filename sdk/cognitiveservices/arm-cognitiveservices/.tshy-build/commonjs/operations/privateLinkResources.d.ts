import { PrivateLinkResources } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { PrivateLinkResourcesListOptionalParams, PrivateLinkResourcesListResponse } from "../models/index.js";
/** Class containing PrivateLinkResources operations. */
export declare class PrivateLinkResourcesImpl implements PrivateLinkResources {
    private readonly client;
    /**
     * Initialize a new instance of the class PrivateLinkResources class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the private link resources that need to be created for a Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: PrivateLinkResourcesListOptionalParams): Promise<PrivateLinkResourcesListResponse>;
}
//# sourceMappingURL=privateLinkResources.d.ts.map