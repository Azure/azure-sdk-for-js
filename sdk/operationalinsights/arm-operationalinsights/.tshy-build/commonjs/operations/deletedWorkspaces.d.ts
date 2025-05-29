import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeletedWorkspaces } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { Workspace, DeletedWorkspacesListOptionalParams, DeletedWorkspacesListByResourceGroupOptionalParams } from "../models/index.js";
/** Class containing DeletedWorkspaces operations. */
export declare class DeletedWorkspacesImpl implements DeletedWorkspaces {
    private readonly client;
    /**
     * Initialize a new instance of the class DeletedWorkspaces class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets recently deleted workspaces in a subscription, available for recovery.
     * @param options The options parameters.
     */
    list(options?: DeletedWorkspacesListOptionalParams): PagedAsyncIterableIterator<Workspace>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets recently deleted workspaces in a resource group, available for recovery.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: DeletedWorkspacesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Workspace>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Gets recently deleted workspaces in a subscription, available for recovery.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets recently deleted workspaces in a resource group, available for recovery.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
}
//# sourceMappingURL=deletedWorkspaces.d.ts.map