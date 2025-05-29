import { AvailableServiceTiersListByWorkspaceOptionalParams, AvailableServiceTiersListByWorkspaceResponse } from "../models/index.js";
/** Interface representing a AvailableServiceTiers. */
export interface AvailableServiceTiers {
    /**
     * Gets the available service tiers for the workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, options?: AvailableServiceTiersListByWorkspaceOptionalParams): Promise<AvailableServiceTiersListByWorkspaceResponse>;
}
//# sourceMappingURL=availableServiceTiers.d.ts.map