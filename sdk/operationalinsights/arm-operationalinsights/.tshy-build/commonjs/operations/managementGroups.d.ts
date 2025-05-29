import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ManagementGroups } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { ManagementGroup, ManagementGroupsListOptionalParams } from "../models/index.js";
/** Class containing ManagementGroups operations. */
export declare class ManagementGroupsImpl implements ManagementGroups {
    private readonly client;
    /**
     * Initialize a new instance of the class ManagementGroups class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets a list of management groups connected to a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, workspaceName: string, options?: ManagementGroupsListOptionalParams): PagedAsyncIterableIterator<ManagementGroup>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of management groups connected to a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    private _list;
}
//# sourceMappingURL=managementGroups.d.ts.map