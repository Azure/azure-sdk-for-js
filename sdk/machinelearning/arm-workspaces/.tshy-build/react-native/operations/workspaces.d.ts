import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Workspaces } from "../operationsInterfaces/index.js";
import { MachineLearningWorkspacesManagementClient } from "../machineLearningWorkspacesManagementClient.js";
import { Workspace, WorkspacesListByResourceGroupOptionalParams, WorkspacesListOptionalParams, WorkspacesGetOptionalParams, WorkspacesGetResponse, WorkspacesCreateOrUpdateOptionalParams, WorkspacesCreateOrUpdateResponse, WorkspacesDeleteOptionalParams, WorkspaceUpdateParameters, WorkspacesUpdateOptionalParams, WorkspacesUpdateResponse, WorkspacesResyncStorageKeysOptionalParams, WorkspacesListWorkspaceKeysOptionalParams, WorkspacesListWorkspaceKeysResponse } from "../models/index.js";
/** Class containing Workspaces operations. */
export declare class WorkspacesImpl implements Workspaces {
    private readonly client;
    /**
     * Initialize a new instance of the class Workspaces class.
     * @param client Reference to the service client
     */
    constructor(client: MachineLearningWorkspacesManagementClient);
    /**
     * Lists all the available machine learning workspaces under the specified resource group.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: WorkspacesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Workspace>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Lists all the available machine learning workspaces under the specified subscription.
     * @param options The options parameters.
     */
    list(options?: WorkspacesListOptionalParams): PagedAsyncIterableIterator<Workspace>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the properties of the specified machine learning workspace.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param workspaceName The name of the machine learning workspace.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, options?: WorkspacesGetOptionalParams): Promise<WorkspacesGetResponse>;
    /**
     * Creates or updates a workspace with the specified parameters.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param workspaceName The name of the machine learning workspace.
     * @param parameters The parameters for creating or updating a machine learning workspace.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, workspaceName: string, parameters: Workspace, options?: WorkspacesCreateOrUpdateOptionalParams): Promise<WorkspacesCreateOrUpdateResponse>;
    /**
     * Deletes a machine learning workspace.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param workspaceName The name of the machine learning workspace.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, workspaceName: string, options?: WorkspacesDeleteOptionalParams): Promise<void>;
    /**
     * Updates a machine learning workspace with the specified parameters.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param workspaceName The name of the machine learning workspace.
     * @param parameters The parameters for updating a machine learning workspace.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, workspaceName: string, parameters: WorkspaceUpdateParameters, options?: WorkspacesUpdateOptionalParams): Promise<WorkspacesUpdateResponse>;
    /**
     * Resync storage keys associated with this workspace.
     * @param workspaceName The name of the machine learning workspace.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param options The options parameters.
     */
    resyncStorageKeys(workspaceName: string, resourceGroupName: string, options?: WorkspacesResyncStorageKeysOptionalParams): Promise<void>;
    /**
     * List the authorization keys associated with this workspace.
     * @param workspaceName The name of the machine learning workspace.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param options The options parameters.
     */
    listWorkspaceKeys(workspaceName: string, resourceGroupName: string, options?: WorkspacesListWorkspaceKeysOptionalParams): Promise<WorkspacesListWorkspaceKeysResponse>;
    /**
     * Lists all the available machine learning workspaces under the specified resource group.
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Lists all the available machine learning workspaces under the specified subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group to which the machine learning workspace
     *                          belongs.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=workspaces.d.ts.map