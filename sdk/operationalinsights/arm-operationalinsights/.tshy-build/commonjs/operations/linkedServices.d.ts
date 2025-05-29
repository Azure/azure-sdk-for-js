import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LinkedServices } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { LinkedService, LinkedServicesListByWorkspaceOptionalParams, LinkedServicesCreateOrUpdateOptionalParams, LinkedServicesCreateOrUpdateResponse, LinkedServicesDeleteOptionalParams, LinkedServicesDeleteResponse, LinkedServicesGetOptionalParams, LinkedServicesGetResponse } from "../models/index.js";
/** Class containing LinkedServices operations. */
export declare class LinkedServicesImpl implements LinkedServices {
    private readonly client;
    /**
     * Initialize a new instance of the class LinkedServices class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets the linked services instances in a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    listByWorkspace(resourceGroupName: string, workspaceName: string, options?: LinkedServicesListByWorkspaceOptionalParams): PagedAsyncIterableIterator<LinkedService>;
    private listByWorkspacePagingPage;
    private listByWorkspacePagingAll;
    /**
     * Create or update a linked service.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param linkedServiceName Name of the linkedServices resource
     * @param parameters The parameters required to create or update a linked service.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, workspaceName: string, linkedServiceName: string, parameters: LinkedService, options?: LinkedServicesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<LinkedServicesCreateOrUpdateResponse>, LinkedServicesCreateOrUpdateResponse>>;
    /**
     * Create or update a linked service.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param linkedServiceName Name of the linkedServices resource
     * @param parameters The parameters required to create or update a linked service.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, workspaceName: string, linkedServiceName: string, parameters: LinkedService, options?: LinkedServicesCreateOrUpdateOptionalParams): Promise<LinkedServicesCreateOrUpdateResponse>;
    /**
     * Deletes a linked service instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param linkedServiceName Name of the linked service.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, workspaceName: string, linkedServiceName: string, options?: LinkedServicesDeleteOptionalParams): Promise<PollerLike<PollOperationState<LinkedServicesDeleteResponse>, LinkedServicesDeleteResponse>>;
    /**
     * Deletes a linked service instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param linkedServiceName Name of the linked service.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, workspaceName: string, linkedServiceName: string, options?: LinkedServicesDeleteOptionalParams): Promise<LinkedServicesDeleteResponse>;
    /**
     * Gets a linked service instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param linkedServiceName Name of the linked service.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, linkedServiceName: string, options?: LinkedServicesGetOptionalParams): Promise<LinkedServicesGetResponse>;
    /**
     * Gets the linked services instances in a workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    private _listByWorkspace;
}
//# sourceMappingURL=linkedServices.d.ts.map