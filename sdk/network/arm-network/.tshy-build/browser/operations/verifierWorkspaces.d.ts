import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VerifierWorkspaces } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VerifierWorkspace, VerifierWorkspacesListOptionalParams, VerifierWorkspacesGetOptionalParams, VerifierWorkspacesGetResponse, VerifierWorkspacesCreateOptionalParams, VerifierWorkspacesCreateResponse, VerifierWorkspacesUpdateOptionalParams, VerifierWorkspacesUpdateResponse, VerifierWorkspacesDeleteOptionalParams, VerifierWorkspacesDeleteResponse } from "../models/index.js";
/** Class containing VerifierWorkspaces operations. */
export declare class VerifierWorkspacesImpl implements VerifierWorkspaces {
    private readonly client;
    /**
     * Initialize a new instance of the class VerifierWorkspaces class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets list of Verifier Workspaces.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkManagerName: string, options?: VerifierWorkspacesListOptionalParams): PagedAsyncIterableIterator<VerifierWorkspace>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets list of Verifier Workspaces.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets Verifier Workspace.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkManagerName: string, workspaceName: string, options?: VerifierWorkspacesGetOptionalParams): Promise<VerifierWorkspacesGetResponse>;
    /**
     * Creates Verifier Workspace.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param body Verifier Workspace object to create/update.
     * @param options The options parameters.
     */
    create(resourceGroupName: string, networkManagerName: string, workspaceName: string, body: VerifierWorkspace, options?: VerifierWorkspacesCreateOptionalParams): Promise<VerifierWorkspacesCreateResponse>;
    /**
     * Updates Verifier Workspace.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, networkManagerName: string, workspaceName: string, options?: VerifierWorkspacesUpdateOptionalParams): Promise<VerifierWorkspacesUpdateResponse>;
    /**
     * Deletes Verifier Workspace.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkManagerName: string, workspaceName: string, options?: VerifierWorkspacesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<VerifierWorkspacesDeleteResponse>, VerifierWorkspacesDeleteResponse>>;
    /**
     * Deletes Verifier Workspace.
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param workspaceName Workspace name.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkManagerName: string, workspaceName: string, options?: VerifierWorkspacesDeleteOptionalParams): Promise<VerifierWorkspacesDeleteResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkManagerName The name of the network manager.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=verifierWorkspaces.d.ts.map