import { AvailableServiceTiers } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { AvailableServiceTiersListByWorkspaceOptionalParams, AvailableServiceTiersListByWorkspaceResponse } from "../models/index.js";
/** Class containing AvailableServiceTiers operations. */
export declare class AvailableServiceTiersImpl implements AvailableServiceTiers {
    private readonly client;
    /**
     * Initialize a new instance of the class AvailableServiceTiers class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets the available service tiers for the workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, options?: AvailableServiceTiersListByWorkspaceOptionalParams): Promise<AvailableServiceTiersListByWorkspaceResponse>;
}
//# sourceMappingURL=availableServiceTiers.d.ts.map