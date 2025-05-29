import { SharedKeysOperations } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { SharedKeysGetSharedKeysOptionalParams, SharedKeysGetSharedKeysResponse, SharedKeysRegenerateOptionalParams, SharedKeysRegenerateResponse } from "../models/index.js";
/** Class containing SharedKeysOperations operations. */
export declare class SharedKeysOperationsImpl implements SharedKeysOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class SharedKeysOperations class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets the shared keys for a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    getSharedKeys(resourceGroupName: string, workspaceName: string, options?: SharedKeysGetSharedKeysOptionalParams): Promise<SharedKeysGetSharedKeysResponse>;
    /**
     * Regenerates the shared keys for a Log Analytics Workspace. These keys are used to connect Microsoft
     * Operational Insights agents to the workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    regenerate(resourceGroupName: string, workspaceName: string, options?: SharedKeysRegenerateOptionalParams): Promise<SharedKeysRegenerateResponse>;
}
//# sourceMappingURL=sharedKeysOperations.d.ts.map